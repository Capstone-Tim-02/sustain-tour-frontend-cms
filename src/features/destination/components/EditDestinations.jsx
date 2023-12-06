import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { Upload } from 'antd';
import * as y from 'yup';

import { APICategories } from '@/apis/APICategories'
import { APIDestinations } from '@/apis/APIDestinations';
import { Spinner } from '@/components/Elements';
import { DropdownField, FieldWrapper,InputField, TextAreaField} from '@/components/Forms';
import { RadioButton } from '@/components/Forms/RadioButton';
import { RadioGroup } from '@/components/Forms/RadioGroup';
import { Button } from '@/components/ui/button';
import {ImageDestinationField} from '@/features/destination/components/DestinationField'
import { ImagePreview, ListFile} from '@/features/destination/components/ImageDestinationPreview'
import { convertToPositive } from '@/utils/format';



const schema = y.object({
  kode: y
    .string()
    .required('Destinasi kode tidak boleh kosong')
    .min(3, 'Minimal 3 karakter')
    .max(5, 'Maksimal 5 karakter'),
  kota: y
    .string()
    .required('Lokasi kota tidak boleh kosong')
    .min(4, 'Minimal 4 karakter')
    .max(30, 'Maksimal 30 karakter'),
  location: y
    .string()
    .required('Alamat tidak boleh kosong')
    .min(8, 'Minimal 8 karakter')
    .max(200, 'Maksimal 200 karakter'),
  is_open: y.boolean().required('Opsi buka/tutup tidak boleh kosong'),
  description_is_open: y
    .string()
    .required('Deskripsi tidak boleh kosong')
    .min(5, 'Minimal 5 karakter')
    .max(40, 'Maksimal 40 karakter'),
  category_name: y.string().required('Kategory tidak boleh kosong'),
  fasilitas: y
    .string()
    .required('Fasilitas lokal tidak boleh kosong')
    .min(5, 'Minimal 5 karakter')
    .max(100, 'Maksimal 100 karakter'),
  description: y
    .string()
    .required('Highlight tidak boleh kosong')
    .min(10, 'Minimal 10 karakter')
    .max(2000, 'Maksimal 2000 karakter'),
  available_tickets: y
    .number()
    .required('Jumlah stok tiket tidak boleh kosong')
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(1, 'Jumlah tiket harus lebih dari 0')
    .typeError('Longitude Peta harus berupa angka'),
  price: y
    .number()
    .required('Harga tiket tidak boleh kosong')
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(1, 'Harga harus lebih dari 0')
    .typeError('Longitude Peta harus berupa angka'),
  photo_wisata1: y
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
  title: y
    .string()
    .required('Nama Destinasi tidak boleh kosong')
    .min(8, 'Minimal 8 karakter')
    .max(100, 'Maksimal 100 karakter'),
  maps_link: y
    .string()
    .required('Alamat peta tidak boleh kosong')
    .min(5, 'Minimal 5 karakter')
    .max(200, 'Maksimal 200 karakter'),
  lat: y
    .string()
    .required('Latitude Peta tidak boleh kosong'),
  long: y
    .string()
    .typeError('Longitude Peta harus berupa angka')
    .required('Longitude Peta tidak boleh kosong')
});


export const EditDestination = ({ onSuccess }) => {
  const { destinasiId } = useParams();
  const [wisata, setWisata] = useState(null);
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorImage, setErrorImage] = useState(false);
  const [previewImage, setPreviewImage] = useState({
    photo_wisata1: null,
    photo_wisata2: null,
    photo_wisata3: null,
  });

  const formData = new FormData();

  const {
    register,
    handleSubmit,
    reset,
    // control,
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
      setWisata(await APIDestinations.getDestinationById(destinasiId));
    }
    fetchDestination();
  }, [destinasiId]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(await APICategories.getCategories());
    };
    fetchCategories();
  }, []);


  useEffect(() => {
    reset({
      ...wisata,
      is_open: wisata?.is_open?.toString(),
    });
    setPreviewImage({
      photo_wisata1: wisata?.photo_wisata1 || null,
      photo_wisata2: wisata?.photo_wisata2 || null,
      photo_wisata3: wisata?.photo_wisata3 || null,
    });
  }, [reset, wisata]);

  const [kategoriOptions, setKategoriOptions] = useState([]);
  useEffect(() => {
    if (categories){
    const options = categories.map((dataCategory) => ({
      value: dataCategory.category_name,
      label: dataCategory.category_name,
    }));
    setKategoriOptions(options);
    if (wisata?.category) {
      document.getElementById("cate").value = wisata.category.category_name;
    }
  }
  }, [categories]);  

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
    try {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (imageValue1) {
        formData.append('image1', imageValue1);
      }
  
      if (imageValue2) {
        formData.append('image2', imageValue2);
      }
  
      if (imageValue3) {
        formData.append('image3', imageValue3);
      }
      setIsLoading(true);
      await APIDestinations.editDestination(destinasiId, formData);
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
      setValue('photo_wisata1', null);
      setPreviewImage((prevState) => ({
        ...prevState,
        photo_wisata1: null,
      }));
    } else {
      reader.onload = (e) => {
        setValue('photo_wisata1', info.file.originFileObj);
        setPreviewImage((prevState) => ({
          ...prevState,
          photo_wisata1: e.target.result,
        }));
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  
  
  const imageOnChange2 = (info) => {
    const reader = new FileReader();

    if (info.file.status === 'removed') {
      setValue('photo_wisata2', null);
      setPreviewImage((prevState) => ({
        ...prevState,
        photo_wisata2: null,
      }));
    } else {
      reader.onload = (e) => {
        setValue('photo_wisata2', info.file.originFileObj);
        setPreviewImage((prevState) => ({
          ...prevState,
          photo_wisata2: e.target.result,
        }));
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  
  const imageOnChange3 = (info) => {
    const reader = new FileReader();

    if (info.file.status === 'removed') {
      setValue('photo_wisata3', null);
      setPreviewImage((prevState) => ({
        ...prevState,
        photo_wisata3: null,
      }));
    } else {
      reader.onload = (e) => {
        setValue('photo_wisata3', info.file.originFileObj);
        setPreviewImage((prevState) => ({
          ...prevState,
          photo_wisata3: e.target.result,
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
          photo_wisata1: schema.fields.photo_wisata1,
        });

        await imageDestinationSchema.validate({ photo_wisata1: file });

        clearErrors('photo_wisata1');
        setErrorImage(false);
        onSuccess();
      } catch (error) {
        const errorMessage = error.errors[0];

        setError('photo_wisata1', {
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
          photo_wisata2: schema.fields.photo_wisata2,
        });

        await imageDestinationSchema.validate({ photo_wisata2: file });

        clearErrors('photo_wisata2');
        setErrorImage(false);
        onSuccess();
      } catch (error) {
        const errorMessage = error.errors[0];

        setError('photo_wisata2', {
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
          photo_wisata3: schema.fields.photo_wisata3,
        });

        await imageDestinationSchema.validate({ photo_wisata3: file });

        clearErrors('photo_wisata3');
        setErrorImage(false);
        onSuccess();
      } catch (error) {
        const errorMessage = error.errors[0];

        setError('photo_wisata3', {
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
      <form onSubmit={handleSubmit(onSubmit)} id="editDestinations" className="space-y-5">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex flex-col gap-4 md:max-w-[50%] md:flex-grow">
            {/* Destinasi Kode*/}
            <InputField
              placeholder="Masukkan kode"
              label="Destinasi Kode"
              autoComplete="off"
              registration={register('kode')}
              error={errors.kode}
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
              placeholder="Masukkan alamat"
              autoComplete="off"
              registration={register('location')}
              error={errors.location}
              className="row-span-2"
            />

            {/* buka tutup  */}
            <div className="isOpen">
              <RadioGroup isHorizontal label="Buka/Tutup" isRequired error={errors.is_open}>
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
            </div>

            {/* Kategori */}
            <DropdownField
              label="Kategori"
              placeholder="Pilih Kategori"
              options={kategoriOptions}
              registration={register('category_name')}
              error={errors.category_name}
              id= 'cate'
            />

            {/* Fasilitas lokal */}
            <InputField
              placeholder="Masukkan fasilitas(contoh: Parkiran, Kantin, Mushola, dll)"
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

            {/* Jumlah Stok Tiket */}
            <InputField
              type="number"
              placeholder="Masukkan jumlah stok tiket"
              label="Jumlah Stok Tiket"
              autoComplete="off"
              registration={register('available_tickets')}
              error={errors.available_tickets}
              onChange={handleConvertToPositive}
            />

            {/* Harga Tiket */}
            <InputField
              type="number"
              placeholder="Masukkan harga tiket"
              label="Harga Tiket"
              autoComplete="off"
              registration={register('price')}
              error={errors.price}
              onChange={handleConvertToPositive}
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
                    registration={register('image1')}
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
                    registration={register('image2')}
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
                    registration={register('image3')}
                  >
                    <ImagePreview imageSource={previewImage.photo_wisata3} />
                  </Upload>
                </div>
              </ImageDestinationField>
            </FieldWrapper>
            <ListFile imageValue={imageValue1} errorImage={errorImage} removeImage={imageOnChange1} />
            <ListFile imageValue={imageValue2} errorImage={errorImage} removeImage={imageOnChange2} />
            <ListFile imageValue={imageValue3} errorImage={errorImage} removeImage={imageOnChange3} />
            
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
            />

            {/* Longitude Peta */}
            <InputField
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
            <Button variant="outline">Batal</Button>
          </Link>
          <Button form="editDestinations" type="submit" disabled={isLoading}>
            {isLoading && <Spinner size="sm" className="mr-3" />} Simpan
          </Button>
        </div>
      </form>
    </div>
  );
};
