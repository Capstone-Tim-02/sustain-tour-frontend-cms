import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';

import { APIPromo } from '@/apis';
import { Spinner } from '@/components/Elements';
import {
  FieldImage,
  InputField,
  ReactSelect,
  TextAreaField,
  TextEditorField,
} from '@/components/Forms';
import { Button } from '@/components/ui/button';
import { clearQuery } from '@/stores/ui-slice';
import { convertToPositive, formatDate } from '@/utils/format';

const schema = y.object({
  title: y
    .string()
    .required('Judul promo tidak boleh kosong')
    .min(5, 'Judul promo minimal 5 karakter')
    .max(100, 'Judul promo tidak boleh lebih dari 100 karakter'),
  nama_promo: y
    .string()
    .required('Nama promo tidak boleh kosong')
    .min(5, 'Nama promo minimal 5 karakter')
    .max(100, 'Nama promo tidak boleh lebih dari 100 karakter'),
  kode_voucher: y
    .string()
    .uppercase()
    .required('Kode promo tidak boleh kosong')
    .min(5, 'Kode promo minimal 5 karakter')
    .max(40, 'Kode promo tidak boleh lebih dari 40 karakter'),
  jumlah_potongan_persen: y
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(1, 'Minimum 1%')
    .max(100, 'Maximum 100%')
    .required('Diskon promo tidak boleh kosong'),
  status_aktif: y
    .object()
    .required('Status promo harus diisi'),
  deskripsi: y
    .string()
    .required('Deskripsi promo tidak boleh kosong')
    .min(10, 'Deskripsi promo minimal 10 karakter')
    .max(2000, 'Deskripsi promo tidak boleh lebih dari 2000 karakter'),
  peraturan: y
    .string()
    .required('Peraturan promo tidak boleh kosong')
    .min(10, 'Peraturan promo minimal 10 karakter')
    .max(2000, 'Peraturan promo tidak boleh lebih dari 2000 karakter'),
  tanggal_kadaluarsa: y.string().required('Tanggal kadaluarsa tidak boleh kosong'),
  image_voucher: y
    .mixed()
    .required('Gambar tidak boleh kosong')
    .test(
      'fileFormat',
      'Format file tidak sesuai. Hanya diperbolehkan format JPG, JPEG, PNG.',
      (value) => {
        if (!value || typeof value === 'string') return true;

        const allowedFormats = ['image/jpg', 'image/jpeg', 'image/png'];
        return allowedFormats.includes(value.type);
      }
    )
    .test('fileSize', 'Ukuran file terlalu besar. Maksimal 5MB.', (value) => {
      if (!value || typeof value == 'string') return true;

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
  const [errorImage, setErrorImage] = useState(false);

  const dispatch = useDispatch();

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

  useEffect(() => {
    async function fetchPromo() {
      setIsLoading(true);
      setPromo(await APIPromo.getPromoById(promoId));
      setIsLoading(false);
    }
    fetchPromo();
  }, [promoId]);

  useEffect(() => {
    const formattedDate = formatDate(promo?.tanggal_kadaluarsa, 'YYYY-MM-DD');

    reset({
      ...promo,
      tanggal_kadaluarsa: formattedDate,
      status_aktif: statusOptions?.find((option) => option.value === promo?.status_aktif),
    });
  }, [reset, promo]);

  const formData = new FormData();

  const onSubmit = async (data) => {
    const status_aktif = data?.status_aktif?.value;
    try {
      Object.entries({ ...data, status_aktif }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      setIsLoading(true);
      await APIPromo.editPromo(promoId, formData);
      dispatch(clearQuery());
      onSuccess();
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
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

  const handleConvertToPositive = (e) => {
    const { value } = e.target;
    e.target.value = convertToPositive(value);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" className="mx-auto mt-10" />
        </div>
      ) : (
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
                  onInput={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                  }}
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
                <ReactSelect
                  name='status_aktif'
                  label='Status'
                  options={statusOptions}
                  control={control}
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
                <FieldImage
                  id="image_voucher"
                  label="Gambar Promo"
                  name="image_voucher"
                  register={register}
                  setValue={setValue}
                  getValues={getValues}
                  error={errors.image_voucher}
                  customRequest={(file, onSuccess, onError) =>
                    imageCustomRequest(file, onSuccess, onError)
                  }
                  isImageError={errorImage}
                  setIsImageError={setErrorImage}
                  promo={promo}
                />
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
              <Link to="/promo">
                <Button variant="outline" onClick={() => dispatch(clearQuery())}>
                  Kembali
                </Button>
              </Link>
              <Button form="editPromo" type="submit" isloading={isLoading}>
                Simpan
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
