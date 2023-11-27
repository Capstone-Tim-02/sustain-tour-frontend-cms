import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';

import { APIPromo } from '@/apis/APIPromo';
import { DropdownField, FieldImagePromo, InputField, TextAreaField, TextEditorField } from '@/components/Forms';
import { Button } from '@/components/ui/button';
import { convertToPositive } from '@/utils/format';

const schema = y.object({
  title: y
    .string()
    .required('Judul promo tidak boleh kosong')
    .min(5, 'Judul promo minimal 5 karakter')
    .max(100, 'Judul promo maksimal 100 karakter'),
  nama_promo: y
    .string()
    .required('Nama promo tidak boleh kosong')
    .min(5, 'Nama promo minimal 5 karakter')
    .max(100, 'Nama promo maksimal 100 karakter'),
  kode_voucher: y
    .string()
    .required('Kode promo tidak boleh kosong')
    .min(5, 'Kode promo minimal 5 karakter')
    .max(40, 'Kode promo maksimal 40 karakter'),
  jumlah_potongan_persen: y
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('Diskon promo tidak boleh kosong')
    .min(1, 'Diskon promo minimal 1%')
    .max(100, 'Diskon promo maximal 100%'),
  status_aktif: y.string().required('Status promo harus diisi'),
  deskripsi: y
    .string()
    .required('Deskripsi promo tidak boleh kosong')
    .min(10, 'Deskripsi promo minimal 10 karakter')
    .max(2000, 'Deskripsi promo maksimal 2000 karakter'),
  peraturan: y
    .string()
    .required('Peraturan promo tidak boleh kosong')
    .min(10, 'Peraturan promo minimal 10 karakter')
    .max(2000, 'Peraturan promo maksimal 2000 karakter'),
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

export const AddPromo = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorImage, setErrorImage] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const formData = new FormData();

  const onSubmit = async (data) => {
    try {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, key === 'status_aktif' ? value === 'true' : value);
      });

      setIsLoading(true);
      await APIPromo.addPromo(formData);
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
    <div className="mt-8 overflow-hidden rounded-lg bg-white p-10 shadow">
      <form onSubmit={handleSubmit(onSubmit)} id="addPromo" className="space-y-5">
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
          <FieldImagePromo
              id='image_voucher'
              label='Gambar Promo'
              name='image_voucher'
              register={register}
              setValue={setValue}
              getValues={getValues}
              error={errors.image_voucher}
              customRequest={(file, onSuccess, onError) => 
                imageCustomRequest(file, onSuccess, onError)
              }
              isImageError={errorImage}
              setIsImageError={setErrorImage}
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
          <Link to="/promo" replace>
            <Button variant="outline">Kembali</Button>
          </Link>
          <Button form="addPromo" type="submit" isloading={isLoading}>
            Tambah Promo
          </Button>
        </div>
      </form>
    </div>
  );
};
