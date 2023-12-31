import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { Upload } from 'antd';
import * as y from 'yup';

import { APICategory, APIDestination } from '@/apis';
import { Spinner } from '@/components/Elements';
import {
  FieldWrapper,
  InputField,
  RadioButton,
  RadioGroup,
  ReactSelect,
  TextAreaField,
} from '@/components/Forms';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce';
import { clearQuery } from '@/stores/ui-slice';
import { convertToPositive, formatCurrency, replaceFormatCurrency } from '@/utils/format';

import { ImageDestinationField } from './ImageDestinationField';
import { ImagePreview, ListFile } from './ImageDestinationPreview';

const schema = y.object({
  kode: y
    .string()
    .required('Destinasi Kode tidak boleh kosong')
    .max(5, 'Destinasi Kode maksimal 5 karakter')
    .min(3, 'Destinasi Kode minimal 3 karakter'),
  title: y
    .string()
    .required('Nama Destinasi tidak boleh kosong')
    .max(100, 'Nama Destinasi maksimal 100 karakter')
    .min(8, 'Nama Destinasi minimal 8 karakter'),
  kota: y
    .string()
    .required('Lokasi Kota tidak boleh kosong')
    .max(100, 'Lokasi Kota maksimal 100 karakter')
    .min(4, 'Lokasi Kota minimal 4 karakter'),
  location: y
    .string()
    .required('Alamat tidak boleh kosong')
    .max(200, 'Alamat maksimal 200 karakter')
    .min(8, 'Alamat minimal 8 karakter'),
  category_name: y.object().required('Kategori tidak boleh kosong'),
  description: y
    .string()
    .required('Highlight tidak boleh kosong')
    .max(2000, 'Highlight maksimal 2000 karakter')
    .min(10, 'Highlight minimal 10 karakter'),
  fasilitas: y
    .string()
    .required('Fasilitas lokal tidak boleh kosong')
    .max(100, 'Fasilitas lokal maksimal 100 karakter')
    .min(5, 'Fasilitas lokal minimal 5 karakter'),
  available_tickets: y
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(1, 'Minimal Jumlah Stock Tiket 1')
    .required(' Jumlah Stok Tiket tidak boleh kosong'),
  price: y
    .string()
    .required('Harga Tiket tidak boleh kosong')
    .test('is-zero', 'price min Rp. 1', (value) => {
      return value !== '0';
    }),
  lat: y
    .string()
    .required('Latitude Peta tidak boleh kosong')
    .matches(/^[0-9.-]+$/, 'Latitude Peta hanya boleh angka, titik, dan minus'),
  long: y
    .string()
    .required('Longitude Peta tidak boleh kosong')
    .matches(/^[0-9.-]+$/, 'Longitude Peta hanya boleh angka, titik, dan minus'),
  maps_link: y
    .string()
    .required('URL Peta tidak boleh kosong')
    .max(200, 'URL Peta maksimal 200 karakter'),
  description_is_open: y
    .string()
    .required('Deskripsi tidak boleh kosong')
    .max(40, 'Deskripsi maksimal 40 karakter'),
  video_link: y.string(),
  is_open: y.string().required('Status tidak boleh kosong'),
  photo_wisata1: y
    .mixed()
    .required('Gambar Destinasi tidak boleh kosong')
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
  photo_wisata2: y
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
  photo_wisata3: y
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

export const EditDestination = ({ onSuccess }) => {
  const { destinationId } = useParams();

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState({
    photo_wisata1: null,
    photo_wisata2: null,
    photo_wisata3: null,
  });
  const [errorImage, setErrorImage] = useState(false);

  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 500);

  const [wisata, setWisata] = useState({});
  const [currentCategoryOptions, setCurrentCategoryOptions] = useState([]);

  const handleConvertToPositive = (e) => (e.target.value = convertToPositive(e.target.value));
  const handleFormatCurrency = (e) => (e.target.value = formatCurrency(e.target.value));
  const handleUpperCase = (e) => (e.target.value = e.target.value.toUpperCase());
  const handleInputChange = (value) => setSearchText(value);

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

  const imageValue1 = getValues().photo_wisata1;
  const imageValue2 = getValues().photo_wisata2;
  const imageValue3 = getValues().photo_wisata3;

  useEffect(() => {
    async function fetchDestination() {
      setIsLoading(true);
      setWisata(await APIDestination.getDestinationById(destinationId));
      setIsLoading(false);
    }
    fetchDestination();
  }, [destinationId]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await APICategory.getAllCategoryWithoutPagination({
        search: debouncedSearchText,
      });
      setCurrentCategoryOptions(
        categories.map((option) => ({
          value: option.id,
          label: option.category_name,
        }))
      );
    };
    fetchCategories();
  }, [debouncedSearchText]);

  useEffect(() => {
    reset({
      ...wisata,
      category_name: currentCategoryOptions?.find((option) => option.value === wisata?.category_id),
      is_open: wisata?.is_open?.toString(),
      price: formatCurrency(wisata?.price),
      fasilitas: wisata?.fasilitas ? JSON.parse(wisata?.fasilitas).join(',') : '',
    });

    setPreviewImage({
      photo_wisata1: wisata?.photo_wisata1 || null,
      photo_wisata2: wisata?.photo_wisata2 || null,
      photo_wisata3: wisata?.photo_wisata3 || null,
    });
  }, [reset, wisata, currentCategoryOptions]);

  const handlePreview = (file, imageKey) => {
    if (!file.url && !file.preview) {
      file.preview = file.originFileObj;
    }
    setPreviewImage((prevState) => ({
      ...prevState,
      [imageKey]: file.url || file.preview,
    }));
  };

  const onSubmit = async (data) => {
    const price = replaceFormatCurrency(data?.price);
    const category_name = data?.category_name?.label;

    try {
      Object.entries({ ...data, category_name, price }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      setIsLoading(true);
      await APIDestination.editDestination(destinationId, formData);
      dispatch(clearQuery());
      onSuccess();
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  const imageHandlers = (index) => ({
    onChange: (info) => {
      const reader = new FileReader();

      if (info.file.status === 'removed') {
        setValue(`photo_wisata${index}`, null);
        setPreviewImage((prevState) => ({
          ...prevState,
          [`photo_wisata${index}`]: null,
        }));
      } else {
        reader.onload = (e) => {
          setValue(`photo_wisata${index}`, info.file.originFileObj);
          setPreviewImage((prevState) => ({
            ...prevState,
            [`photo_wisata${index}`]: e.target.result,
          }));
        };
        reader.readAsDataURL(info.file.originFileObj);
      }
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      const isValid = file.type.startsWith('image/');

      if (isValid) {
        try {
          const fieldName = `photo_wisata${index}`;
          const imageDestinationSchema = y.object({
            [fieldName]: schema.fields[fieldName],
          });

          await imageDestinationSchema.validate({ [fieldName]: file });

          clearErrors(fieldName);
          setErrorImage(false);
          onSuccess();
        } catch (error) {
          const fieldName = `photo_wisata${index}`;
          const errorMessage = error.errors[0];

          setError(fieldName, {
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
    },
  });

  const { onChange: imageOnChange1, customRequest: imageCustomRequest1 } = imageHandlers(1); // photo_wisata1
  const { onChange: imageOnChange2, customRequest: imageCustomRequest2 } = imageHandlers(2); // photo_wisata2
  const { onChange: imageOnChange3, customRequest: imageCustomRequest3 } = imageHandlers(3); // photo_wisata3

  return (
    <>
      {isLoading ? (
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" className="mx-auto mt-10" />
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-lg bg-white p-10 shadow">
          <form onSubmit={handleSubmit(onSubmit)} id="editDestination" className="space-y-5">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex flex-col gap-4 md:max-w-[50%] md:flex-grow">
                {/* Destinasi Kode*/}
                <InputField
                  placeholder="Masukkan kode"
                  label="Destinasi Kode"
                  autoComplete="off"
                  registration={register('kode')}
                  error={errors.kode}
                  onInput={handleUpperCase}
                />

                {/* Lokasi Kota */}
                <InputField
                  placeholder="Masukkan nama kota"
                  label="Lokasi Kota"
                  autoComplete="off"
                  registration={register('kota')}
                  error={errors.kota}
                />

                {/* Alamat */}
                <TextAreaField
                  label="Alamat"
                  placeholder="Masukkan alamat, contoh: Jl. Kebangsaan"
                  autoComplete="off"
                  registration={register('location')}
                  error={errors.location}
                  className="row-span-2"
                />

                {/* buka tutup  */}
                <RadioGroup label="Status" isRequired error={errors.is_open}>
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
                  placeholder="Masukan deskripsi"
                  autoComplete="off"
                  registration={register('description_is_open')}
                  error={errors.description_is_open}
                />

                {/* Kategori */}
                <ReactSelect
                  name="category_name"
                  label="Kategori"
                  placeholder="Pilih Kategori"
                  options={currentCategoryOptions}
                  control={control}
                  registration={register('category_name')}
                  error={errors.category_name}
                  onInputChange={handleInputChange}
                />

                {/* Fasilitas lokal */}
                <InputField
                  placeholder="Masukkan fasilitas contoh: Musholla, WC, Parkiran"
                  label="Fasilitas Lokal"
                  autoComplete="off"
                  registration={register('fasilitas')}
                  error={errors.fasilitas}
                />

                {/* Highlight */}
                <TextAreaField
                  rows={6}
                  label="Highlight"
                  placeholder="Masukkan highlight"
                  autoComplete="off"
                  registration={register('description')}
                  error={errors.description}
                />

                {/* Jumlah Stok Tiket */}
                <InputField
                  type="number"
                  placeholder="Masukkan jumlah stok tiket"
                  label="Jumlah Stok Tiket"
                  autoComplete="off"
                  registration={register('available_tickets')}
                  error={errors.available_tickets}
                  onInput={handleConvertToPositive}
                />

                {/* Harga Tiket */}
                <InputField
                  placeholder="Masukkan harga tiket"
                  label="Harga Tiket"
                  autoComplete="off"
                  registration={register('price')}
                  error={errors.price}
                  onInput={handleFormatCurrency}
                />

                {/* Gambar destinasi */}
                <FieldWrapper
                  isHorizontal={false}
                  label="Gambar Destinasi (1920 x 1080)"
                  id={'photo_wisata1'}
                  error={errors.photo_wisata1}
                >
                  <ImageDestinationField
                    photo_wisata1={previewImage.photo_wisata1}
                    photo_wisata2={previewImage.photo_wisata2}
                    photo_wisata3={previewImage.photo_wisata3}
                  >
                    <div>
                      <Upload
                        name="photo_wisata1"
                        listType="picture-card"
                        showUploadList={false}
                        onPreview={(file) => handlePreview(file, 'photo_wisata1')}
                        onChange={(info) => {
                          imageOnChange1(info);
                        }}
                        customRequest={(file, onSuccess, onError) => {
                          imageCustomRequest1(file, onSuccess, onError);
                        }}
                        registration={register('photo_wisata1')}
                      >
                        <ImagePreview imageSource={previewImage.photo_wisata1} />
                      </Upload>
                    </div>
                    <div>
                      <Upload
                        name="photo_wisata2"
                        listType="picture-card"
                        showUploadList={false}
                        onPreview={(file) => handlePreview(file, 'photo_wisata2')}
                        onChange={(info) => {
                          imageOnChange2(info);
                        }}
                        customRequest={(file, onSuccess, onError) => {
                          imageCustomRequest2(file, onSuccess, onError);
                        }}
                        registration={register('photo_wisata2')}
                      >
                        <ImagePreview imageSource={previewImage.photo_wisata2} />
                      </Upload>
                    </div>
                    <div>
                      <Upload
                        name="photo_wisata3"
                        listType="picture-card"
                        showUploadList={false}
                        onPreview={(file) => handlePreview(file, 'photo_wisata3')}
                        onChange={(info) => {
                          imageOnChange3(info);
                        }}
                        customRequest={(file, onSuccess, onError) => {
                          imageCustomRequest3(file, onSuccess, onError);
                        }}
                        registration={register('photo_wisata3')}
                      >
                        <ImagePreview imageSource={previewImage.photo_wisata3} />
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

                {/* Alamat Peta */}
                <InputField
                  placeholder="Masukkan alamat peta"
                  label="Alamat Peta"
                  autoComplete="off"
                  registration={register('maps_link')}
                  error={errors.maps_link}
                />

                {/* Latitude Peta */}
                <InputField
                  placeholder="Masukkan latitude peta"
                  label="Latitude Peta"
                  autoComplete="off"
                  registration={register('lat')}
                  error={errors.lat}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9.-]/g, '');
                  }}
                />

                {/* Longitude Peta */}
                <InputField
                  placeholder="Masukkan longitude peta"
                  label="Longitude Peta"
                  autoComplete="off"
                  registration={register('long')}
                  error={errors.long}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9.-]/g, '');
                  }}
                />

                <InputField
                  placeholder="Masukkan url video"
                  label="URL Video (Opsional)"
                  autoComplete="off"
                  registration={register('video_link')}
                  error={errors.video_link}
                />
              </div>
            </div>

            <div className="flex justify-end gap-x-2 pt-5">
              <Link to="/destinasi">
                <Button variant="outline" onClick={() => dispatch(clearQuery())}>
                  Batal
                </Button>
              </Link>
              <Button form="editDestination" type="submit" isloading={isLoading}>
                Simpan
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
