import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { Upload } from 'antd';
import * as y from 'yup';

import { APIPromo } from '@/apis/APIPromo';
import NoPicture from '@/assets/images/no-picture.png';
import { Spinner } from '@/components/Elements';
import { DropdownField, InputField, TextAreaField, TextEditorField } from '@/components/Forms';
import { FieldWrapper } from '@/components/Forms/FieldWrapper';
import { TrashIcon } from '@/components/Icons';
import { UploadIcon } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { convertToPositive, formatDate } from '@/utils/format';

const { Dragger } = Upload;

const schema = y.object({
  title: y.string().required('Judul promo tidak boleh kosong'),
  nama_promo: y.string().required('Nama promo tidak boleh kosong'),
  kode_voucher: y.string().required('Kode promo tidak boleh kosong'),
  jumlah_potongan_persen: y
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(1, 'Minimum 1%')
    .max(100, 'Maximum 100%')
    .required('Diskon promo tidak boleh kosong'),
  status_aktif: y.string().required('Status promo harus diisi'),
  deskripsi: y.string().required('Deskripsi promo tidak boleh kosong'),
  peraturan: y.string().required('Peraturan promo tidak boleh kosong'),
  image_voucher: y
    .mixed()
    .required('Gambar tidak boleh kosong')
    .test(
      'fileFormat',
      'Format file tidak sesuai. Hanya diperbolehkan format JPG, JPEG, PNG, atau GIF.',
      (value) => {
        if (!value) return true;

        const allowedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

        if (typeof value === 'string') {
          // Get the file extension from the file name
          const sliceUrl = 'image/' + value?.split('.')[3];
          return allowedFormats.includes(sliceUrl);
        }

        return allowedFormats.includes(value.type);
      }
    )
    .test('fileSize', 'Ukuran file terlalu besar. Maksimal 5MB.', (value) => {
      if (!value) return true;

      const allowedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

      if (typeof value === 'string') {
        // Get the file extension from the file name
        const sliceUrl = 'image/' + value?.split('.')[3];
        return allowedFormats.includes(sliceUrl);
      }

      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

      return value.size <= MAX_FILE_SIZE;
    }),
});

const statusOptions = [
  { value: false, label: 'tidak aktif' },
  { value: true, label: 'aktif' },
];

export const EditPromo = ({ onSuccess }) => {
  const { promoId } = useParams();
  const [promo, setPromo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorImage, setErrorImage] = useState(false);

  const formData = new FormData();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const imageValue = getValues().image_voucher;

  useEffect(() => {
    async function fetchPromo() {
      setPromo(await APIPromo.getPromoById(promoId));
    }
    fetchPromo();
  }, [promoId]);

  useEffect(() => {
    const formattedDate = formatDate(promo?.tanggal_kadaluarsa, 'YYYY-MM-DD');

    reset({
      ...promo,
      tanggal_kadaluarsa: formattedDate,
    });
    setSelectedImage(promo?.image_voucher);
  }, [reset, promo]);

  const onSubmit = async (data) => {
    try {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, key === 'status_aktif' ? value === 'true' : value);
      });

      setIsLoading(true);
      await APIPromo.editPromo(promoId, formData);
      onSuccess();
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const imageOnChange = (info) => {
    const reader = new FileReader();

    if (info.file.status === 'removed') {
      setValue('image_voucher', null);
      setSelectedImage(null);
    } else {
      reader.onload = (e) => {
        setValue('image_voucher', info.file.originFileObj);
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const imageCustomRequest = async ({ file, onSuccess, onError }) => {
    const isValid = file.type.startsWith('image/');

    if (isValid) {
      try {
        const imageVoucherSchema = y.object({
          image_voucher: schema.fields.image_voucher,
        });

        await imageVoucherSchema.validate({ image_voucher: file });

        clearErrors('image_voucher');
        setErrorImage(false);
        onSuccess();
      } catch (error) {
        const errorMessage = error.errors[0];

        setError('image_voucher', {
          type: 'manual',
          message: errorMessage,
        });
        onError();
        setErrorImage(true);
      }
    } else {
      onError();
      setErrorImage(true);
    }
  };

  const removeImage = () => {
    setValue('image_voucher', null);
    setSelectedImage('');
  };

  const handleConvertToPositive = (e) => {
    const { value } = e.target;
    e.target.value = convertToPositive(value);
  };

  return (
    <div className="mt-8 overflow-hidden rounded-lg bg-white p-10 shadow">
      <form onSubmit={handleSubmit(onSubmit)} id="editPromo" className="space-y-5">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex flex-col gap-4 md:max-w-[50%] md:flex-grow">
            {/* Judul Promo */}
            <InputField
              placeholder="Masukkan judul promo"
              label="Judul Promo"
              autoComplete="off"
              registration={register('title')}
              error={errors.title}
            />

            {/* Kode Promo */}
            <InputField
              placeholder="Masukkan kode promo"
              label="Kode Promo"
              autoComplete="off"
              registration={register('kode_voucher')}
              error={errors.kode_voucher}
            />

            {/* Diskon Promo */}
            <InputField
              type="number"
              placeholder="Masukkan diskon promo"
              label="Diskon (Masukkan Angka)"
              autoComplete="off"
              registration={register('jumlah_potongan_persen')}
              error={errors.jumlah_potongan_persen}
              onChange={handleConvertToPositive}
            />

            {/* Status */}
            <DropdownField
              label="Status"
              options={statusOptions}
              registration={register('status_aktif')}
              error={errors.status_aktif}
            />

            {/* Deskripsi */}
            <TextAreaField
              label="Deskripsi"
              placeholder="Masukkan deskripsi promo"
              autoComplete="off"
              registration={register('deskripsi')}
              error={errors.deskripsi}
              className="row-span-2"
            />

            {/* Peraturan */}
            <TextEditorField
              textareaName="peraturan"
              label="Peraturan"
              control={control}
              registration={register('peraturan')}
              error={errors.peraturan}
            />

            {/* Gambar Promo */}
            <FieldWrapper
              isHorizontal={false}
              label="Gambar Promo"
              id={'image_voucher'}
              error={errors.image_voucher}
            >
              <Dragger
                listType="picture"
                name="image_voucher"
                registration={register('image_voucher')}
                multiple={false}
                showUploadList={false}
                onChange={(info) => {
                  imageOnChange(info);
                }}
                customRequest={(file, onSuccess, onError) => {
                  imageCustomRequest(file, onSuccess, onError);
                }}
              >
                {!errorImage && selectedImage && <img src={selectedImage} alt="preview" />}

                {errorImage && (
                  <>
                    <p className="ant-upload-text">Format file tidak sesuai</p>
                    <p className="ant-upload-drag-icon grid justify-items-center">
                      <img src={NoPicture} alt="No Picture" />
                    </p>
                    <p className="ant-upload-hint">
                      Maksimal ukuran file: 5MB <br />
                      Format pendukung: JPG, JPEG, PNG, GIF
                    </p>
                  </>
                )}

                {!errorImage && !selectedImage && (
                  <>
                    <p className="ant-upload-text">Tidak ada file yang dipilih</p>
                    <p className="ant-upload-drag-icon grid justify-items-center">
                      <UploadIcon />
                    </p>
                    <p className="ant-upload-hint">Format pendukung: JPG, JPEG, PNG, GIF</p>
                  </>
                )}
              </Dragger>
            </FieldWrapper>
            {imageValue?.name && (
              <>
                <div className="flex justify-between">
                  <div className={`text-sm ${errorImage ? 'text-redDestimate-100' : ''}`}>
                    {imageValue.name}
                  </div>
                  <div
                    onClick={() => {
                      removeImage();
                    }}
                  >
                    <TrashIcon className="h-5 w-5 stroke-2 text-redDestimate-100 hover:cursor-pointer hover:text-redDestimate-100/70" />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col gap-4 md:flex-grow">
            {/* Nama Promo */}
            <InputField
              placeholder="Masukkan nama promo"
              label="Nama Promo"
              autoComplete="off"
              registration={register('nama_promo')}
              error={errors.nama_promo}
            />

            {/* Tanggal Kadaluarsa */}
            <InputField
              type="date"
              placeholder="Pilih tanggal"
              label="Tanggal Kadaluarsa"
              autoComplete="off"
              registration={register('tanggal_kadaluarsa')}
              error={errors.tanggal_kadaluarsa}
            />
          </div>
        </div>

        <div className="flex justify-end gap-x-2 pt-5">
          <Link to="/promo" replace>
            <Button variant="outline">Batal</Button>
          </Link>
          <Button form="editPromo" type="submit" disabled={isLoading}>
            {isLoading && <Spinner size="sm" className="mr-3" />} Simpan
          </Button>
        </div>
      </form>
    </div>
  );
};
