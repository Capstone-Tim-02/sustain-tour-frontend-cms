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
} from '@/components/Forms';
import { FieldWrapper } from '@/components/Forms/FieldWrapper';
import { Button } from '@/components/ui/button';
import { toggleFetchLatestDestinations } from '@/stores/features/DestinationSlice';

import { ImageDestinationField } from './ImageDestinationField';
import { ImagePreview, ListFile } from './ImageDestinationPreview';

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
  image2: y
    .mixed()
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
  image3: y
    .mixed()
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
  const [previewImage, setPreviewImage] = useState({
    image1: null,
    image2: null,
    image3: null,
  });
  const [errorImage, setErrorImage] = useState(false);
  const [categories, setCategories] = useState([]);
  const [kategoriOptions, setKategoriOptions] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();

  const formData = new FormData();

  const imageValue1 = getValues().image1;
  const imageValue2 = getValues().image2;
  const imageValue3 = getValues().image3;

  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(await APICategories.getCategories());
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const options = categories.map((dataCategory) => ({
      value: dataCategory.category_name,
      label: dataCategory.category_name,
    }));
    setKategoriOptions(options);
  }, [categories]);

  const onSubmit = async (data) => {
    try {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      setIsLoading(true);
      await APIDestinations.addDestination(formData);
      dispatch(toggleFetchLatestDestinations());
      onSuccess();
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const imageOnChange1 = (info) => {
    const reader = new FileReader();

    if (info.file.status === 'removed') {
      setValue('image1', null);
      setPreviewImage((prevState) => ({
        ...prevState,
        image1: null,
      }));
    } else {
      reader.onload = (e) => {
        setValue('image1', info.file.originFileObj);
        setPreviewImage((prevState) => ({
          ...prevState,
          image1: e.target.result,
        }));
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const imageOnChange2 = (info) => {
    const reader = new FileReader();

    if (info.file.status === 'removed') {
      setValue('image2', null);
      setPreviewImage((prevState) => ({
        ...prevState,
        image2: null,
      }));
    } else {
      reader.onload = (e) => {
        setValue('image2', info.file.originFileObj);
        setPreviewImage((prevState) => ({
          ...prevState,
          image2: e.target.result,
        }));
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const imageOnChange3 = (info) => {
    const reader = new FileReader();

    if (info.file.status === 'removed') {
      setValue('image3', null);
      setPreviewImage((prevState) => ({
        ...prevState,
        image3: null,
      }));
    } else {
      reader.onload = (e) => {
        setValue('image3', info.file.originFileObj);
        setPreviewImage((prevState) => ({
          ...prevState,
          image3: e.target.result,
        }));
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const imageCustomRequest1 = async ({ file, onSuccess, onError }) => {
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
  const imageCustomRequest2 = async ({ file, onSuccess, onError }) => {
    const isValid = file.type.startsWith('image/');

    if (isValid) {
      try {
        const imageDestinationSchema = y.object({
          image2: schema.fields.image2,
        });

        await imageDestinationSchema.validate({ image2: file });

        clearErrors('image2');
        setErrorImage(false);
        onSuccess();
      } catch (error) {
        const errorMessage = error.errors[0];

        setError('image2', {
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
  const imageCustomRequest3 = async ({ file, onSuccess, onError }) => {
    const isValid = file.type.startsWith('image/');

    if (isValid) {
      try {
        const imageDestinationSchema = y.object({
          image3: schema.fields.image3,
        });

        await imageDestinationSchema.validate({ image3: file });

        clearErrors('image3');
        setErrorImage(false);
        onSuccess();
      } catch (error) {
        const errorMessage = error.errors[0];

        setError('image3', {
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

  const handlePreview = (file, imageKey) => {
    if (!file.url && !file.preview) {
      file.preview = file.originFileObj;
    }
    setPreviewImage((prevState) => ({
      ...prevState,
      [imageKey]: file.url || file.preview,
    }));
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
            <InputField
              placeholder="Musholla, WC, Parkiran"
              label="Fasilitas Lokal"
              autoComplete="off"
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

            {/* Gambar Destinasi*/}
            <FieldWrapper
              isHorizontal={false}
              label="Gambar Destinasi"
              id={'image1'}
              error={errors.image1}
            >
              <ImageDestinationField
                image1={previewImage.image1}
                image2={previewImage.image2}
                image3={previewImage.image3}
              >
                <div>
                  <Upload
                    name="image1"
                    listType="picture-card"
                    showUploadList={false}
                    onPreview={(file) => handlePreview(file, 'image1')}
                    onChange={(info) => {
                      imageOnChange1(info);
                    }}
                    customRequest={(file, onSuccess, onError) => {
                      imageCustomRequest1(file, onSuccess, onError);
                    }}
                    registration={register('image1')}
                  >
                    <ImagePreview imageSource={previewImage.image1} />
                  </Upload>
                </div>
                <div>
                  <Upload
                    name="image2"
                    listType="picture-card"
                    showUploadList={false}
                    onPreview={(file) => handlePreview(file, 'image2')}
                    onChange={(info) => {
                      imageOnChange2(info);
                    }}
                    customRequest={(file, onSuccess, onError) => {
                      imageCustomRequest2(file, onSuccess, onError);
                    }}
                    registration={register('image2')}
                  >
                    <ImagePreview imageSource={previewImage.image2} />
                  </Upload>
                </div>
                <div>
                  <Upload
                    name="image3"
                    listType="picture-card"
                    showUploadList={false}
                    onPreview={(file) => handlePreview(file, 'image3')}
                    onChange={(info) => {
                      imageOnChange3(info);
                    }}
                    customRequest={(file, onSuccess, onError) => {
                      imageCustomRequest3(file, onSuccess, onError);
                    }}
                    registration={register('image3')}
                  >
                    <ImagePreview imageSource={previewImage.image3} />
                  </Upload>
                </div>
              </ImageDestinationField>
            </FieldWrapper>

            <ListFile
              imageValue={imageValue1}
              errorImage={errorImage}
              removeImage={imageOnChange1}
            />
            <ListFile
              imageValue={imageValue2}
              errorImage={errorImage}
              removeImage={imageOnChange2}
            />
            <ListFile
              imageValue={imageValue3}
              errorImage={errorImage}
              removeImage={imageOnChange3}
            />
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
