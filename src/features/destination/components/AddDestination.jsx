import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { Upload } from 'antd';
import * as y from 'yup';

import { APICategories } from '@/apis/APICategories';
import { APIDestinations } from '@/apis/APIDestinations';
import {
  DropdownField,
  InputField,
  RadioButton,
  RadioGroup,
  TextAreaField,
  TextEditorField,
} from '@/components/Forms';
import { FieldWrapper } from '@/components/Forms/FieldWrapper';
import { Button } from '@/components/ui/button';
import { toggleFetchLatestDestinations } from '@/stores/features/DestinationSlice';

// import { convertToPositive } from '@/utils/format';
import { ListFile, ValidationImagePreview } from './ImageDestinationPreview';

const { Dragger } = Upload;

const schema = y.object({
  kode: y
    .string()
    .required('Kode Destinasi tidak boleh kosong')
    .max(5, 'Kode Destinasi maksimal 5 karakter'),
  title: y
    .string()
    .required('Nama Destinasi tidak boleh kosong')
    .max(100, 'Nama Destinasi maksimal 100 karakter'),
  kota: y
    .string()
    .required('Lokasi Kota tidak boleh kosong')
    .max(100, 'Lokasi Kota maksimal 100 karakter'),
  location: y
    .string()
    .required('Nama Lokasi tidak boleh kosong')
    .max(200, 'Nama Lokasi maksimal 200 karakter'),
  category_name: y.string().required('Category tidak boleh kosong'),
  description: y
    .string()
    .required('Highlight tidak boleh kosong')
    .max(2000, 'Highlight maksimal 2000 karakter'),
  fasilitas: y
    .string()
    .required('Fasilitas tidak boleh kosong')
    .max(100, 'Fasilitas maksimal 100 karakter'),
  available_tickets: y
    .number()
    .required('Stok Tiket tidak boleh kosong')
    .transform((value) => (isNaN(value) ? undefined : value)),
  price: y
    .number()
    .required('Stok Tiket tidak boleh kosong')
    .transform((value) => (isNaN(value) ? undefined : value)),
  lat: y
    .number()
    .required('Latitude Peta tidak boleh kosong')
    .transform((value) => (isNaN(value) ? undefined : value)),
  long: y
    .number()
    .required('Longitude Peta tidak boleh kosong')
    .transform((value) => (isNaN(value) ? undefined : value)),
  maps_link: y
    .string()
    .required('Alamat Peta tidak boleh kosong')
    .max(200, 'Alamat Peta maksimal 200 karakter'),
  description_is_open: y
    .string()
    .required('Deskripsi tidak boleh kosong')
    .max(40, 'Deskripsi maksimal 40 karakter'),
  is_open: y.bool().required(''),
  image1: y
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

export const AddDestination = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorImage, setErrorImage] = useState(false);
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(await APICategories.getCategories());
    };
    fetchCategories();
  }, []);

  const [kategoriOptions, setKategoriOptions] = useState([]);
  useEffect(() => {
    const options = categories.map((dataCategory) => ({
      value: dataCategory.category_name,
      label: dataCategory.category_name,
    }));
    setKategoriOptions(options);
  }, [categories]);

  const imageValue = getValues().image1;

  const dispatch = useDispatch();

  const formData = new FormData();

  const onSubmit = async (data) => {
    // console.log(data);
    console.log(data.title.length);
    try {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      setIsLoading(true);
      await APIDestinations.addDestination(data);
      dispatch(toggleFetchLatestDestinations());
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
      setValue('image1', null);
      setSelectedImage(null);
    } else {
      reader.onload = (e) => {
        setValue('image1', info.file.originFileObj);
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const imageCustomRequest = async ({ file, onSuccess, onError }) => {
    const isValid = file.type.startsWith('image/');

    if (isValid) {
      try {
        const imageDestinationSchema = y.object({
          image1: schema.fields.image1,
        });

        await imageDestinationSchema.validate({ image1: file });

        clearErrors('image1');
        setErrorImage(false);
        onSuccess();
      } catch (error) {
        const errorMessage = error.errors[0];

        setError('image1', {
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
    setValue('image1', null);
    setSelectedImage('');
  };

  return (
    <div className="mt-8 overflow-hidden rounded-lg bg-white p-10 shadow">
      <form onSubmit={handleSubmit(onSubmit)} id="addDestination" className="space-y-5">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex flex-col gap-4 md:max-w-[50%] md:flex-grow">
            {/* Kode Wisata */}
            <InputField
              placeholder="Masukkan kode"
              label="Destinasi Kode"
              autoComplete="off"
              registration={register('kode')}
              error={errors.kode}
            />

            {/* Lokasi Kota */}
            <InputField
              placeholder="Masukkan lokasi kota"
              label="Lokasi Kota"
              autoComplete="off"
              registration={register('kota')}
              error={errors.kota}
            />

            {/* Alamat */}
            <TextAreaField
              label="Alamat"
              placeholder="Masukkan alamat"
              autoComplete="off"
              registration={register('location')}
              error={errors.location}
              className="row-span-2"
            />

            <div>
              {/* Buka/Tutup */}
              <RadioGroup label="Buka/Tutup" isRequired error={errors.is_open}>
                <RadioButton
                  id="buka"
                  label="Buka"
                  value={true}
                  registration={register('is_open')}
                />
                <RadioButton
                  id="tutup"
                  label="Tutup"
                  value={false}
                  registration={register('is_open')}
                />
              </RadioGroup>
              <InputField
                type="text"
                placeholder="Masukkan deskripsi"
                autoComplete="off"
                registration={register('description_is_open')}
                error={errors.description_is_open}
              />
            </div>

            {/* Kategori */}
            <DropdownField
              label="Kategori"
              placeholder="Pilih Kategori"
              options={kategoriOptions}
              registration={register('category_name')}
              error={errors.category_name}
            />

            {/* Fasilitas Lokal */}
            <TextEditorField
              textareaName="fasilitas"
              label="Fasilitas Lokal"
              control={control}
              registration={register('fasilitas')}
              error={errors.fasilitas}
            />

            {/* Highlight */}
            <TextAreaField
              label="Highlight"
              placeholder="Masukkan highlight"
              autoComplete="off"
              registration={register('description')}
              error={errors.description}
              className="row-span-2"
            />

            {/*Stok Tiket*/}
            <InputField
              type="number"
              placeholder="Masukkan jumlah stok tiket"
              label="Jumlah Stok Tiket"
              autoComplete="off"
              registration={register('available_tickets')}
              error={errors.available_tickets}
            />

            {/* Harga Tiket */}
            <InputField
              type="number"
              placeholder="Masukkan harga tiket"
              label="Harga Tiket"
              autoComplete="off"
              registration={register('price')}
              error={errors.price}
            />

            {/* Gambar Promo */}
            <FieldWrapper
              isHorizontal={false}
              label="Gambar Destinasi"
              id={'image1'}
              error={errors.image1}
            >
              <Dragger
                listType="picture"
                name="image1"
                registration={register('image1')}
                multiple={false}
                showUploadList={false}
                onChange={(info) => {
                  imageOnChange(info);
                }}
                customRequest={(file, onSuccess, onError) => {
                  imageCustomRequest(file, onSuccess, onError);
                }}
              >
                {/* ValidationImagePreview */}
                <ValidationImagePreview errorImage={errorImage} selectedImage={selectedImage} />
              </Dragger>
            </FieldWrapper>
            {/* List File */}
            <ListFile imageValue={imageValue} errorImage={errorImage} removeImage={removeImage} />
          </div>

          <div className="flex flex-col gap-4 md:flex-grow">
            {/* Nama Destinasi */}
            <InputField
              placeholder="Masukkan nama destinasi"
              label="Nama Destinasi"
              autoComplete="off"
              registration={register('title')}
              error={errors.title}
            />

            <InputField
              placeholder="Masukkan alamat peta"
              label="Alamat Peta"
              autoComplete="off"
              registration={register('maps_link')}
              error={errors.maps_link}
            />

            <InputField
              type="number"
              placeholder="Masukkan latitude peta"
              label="Latitude Peta"
              autoComplete="off"
              registration={register('lat')}
              error={errors.lat}
            />

            <InputField
              type="number"
              placeholder="Masukkan longitude peta"
              label="Longitude Peta"
              autoComplete="off"
              registration={register('long')}
              error={errors.long}
            />
          </div>
        </div>

        <div className="flex justify-end gap-x-2 pt-5">
          <Link to="/destinasi" replace>
            <Button variant="outline">Kembali</Button>
          </Link>
          <Button id="addDestination" type="submit" isloading={isLoading}>
            Tambah Destinasi
          </Button>
        </div>
      </form>
    </div>
  );
};
