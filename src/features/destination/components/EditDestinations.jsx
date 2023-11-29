import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { Upload } from 'antd';
import * as y from 'yup';

import { APICategories } from '@/apis/APICategories'
import { APIDestinations } from '@/apis/APIDestinations';
import NoPicture from '@/assets/images/no-picture.png';
import { Spinner } from '@/components/Elements';
import { DropdownField, InputField, TextAreaField, TextEditorField } from '@/components/Forms';
import { FieldWrapper } from '@/components/Forms/FieldWrapper';
import { RadioButton } from '@/components/Forms/RadioButton';
import { RadioGroup } from '@/components/Forms/RadioGroup';
import { TrashIcon } from '@/components/Icons';
import { UploadIcon } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { convertToPositive } from '@/utils/format';

const { Dragger } = Upload;

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
  is_open: y.boolean().required('Buka tutup tidak boleh kosong'),
  category_name: y.string().required('Category tidak boleh kosong'),
  description_is_open: y
    .string()
    .required('Deskripsi Buka/Tutup tidak boleh kosong')
    .min(5, 'Minimal 5 karakter')
    .max(40, 'Maksimal 40 karakter'),
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
    .min(1, 'Jumlah tiket harus lebih dari 0'),
  price: y
    .number()
    .required('Harga tiket tidak boleh kosong')
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(1, 'Harga harus lebih dari 0'),
  photo_wisata1: y
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
    .number('Latitude harus berupa angka')
    .required('Latitude Peta tidak boleh kosong')
    .transform((value) => (isNaN(value) ? undefined : value)),//ini string apa number yah
  long: y
    .number('Longitude harus berupa angka')
    .required('Longitude Peta tidak boleh kosong')
    .transform((value) => (isNaN(value) ? undefined : value)), //ini string apa number yah
});


export const EditDestination = ({ onSuccess }) => {
  // const { categoryData } = useParams();
  const { destinasiId } = useParams();
  const [wisata, setWisata] = useState(null);
  const [categories, setCategories] = useState(null);
  // const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState([null, null, null]);
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

  const imageValue = getValues().photo_wisata1;

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
    setSelectedImage(wisata?.photo_wisata1);
    setSelectedImage(wisata?.photo_wisata2);
    setSelectedImage(wisata?.photo_wisata3);
  
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

  const onSubmit = async (data) => {
    try {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
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

//revisi ke 3
  const imageOnChange = (info, photoIndex) => {
    const reader = new FileReader();
  
    if (info.file.status === 'removed') {
      setValue(`photo_wisata${photoIndex}`, null);
      setSelectedImage((prevSelectedImage) => {
        const updatedImages = [...prevSelectedImage];
        updatedImages[photoIndex] = null;
        return updatedImages;
      });
    } else {
      reader.onload = (e) => {
        setValue(`photo_wisata${photoIndex}`, info.file.originFileObj);
        setSelectedImage((prevSelectedImage) => {
          const updatedImages = [...prevSelectedImage];
          updatedImages[photoIndex] = e.target.result;
          return updatedImages;
        });
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };
  
  const imageCustomRequest = async ({ file, onSuccess, onError }) => {
    const isValid = file.type.startsWith('image/');

    if (isValid) {
      try {
        const photoWisata1Schema = y.object({
          photo_wisata1: schema.fields.photo_wisata1,
        });

        await photoWisata1Schema.validate({ photo_wisata1: file });

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

  const removeImage = () => {
    setValue('photo_wisata1', null);
    setSelectedImage('');
  };

  const handleConvertToPositive = (e) => {
    const { value } = e.target;
    e.target.value = convertToPositive(value);
  };

  //revisi ke 2
const [fileList, setFileList] = useState([
  {
    name: 'image.png',
    status: 'done',
    url: 'https://cdn.icon-icons.com/icons2/834/PNG/512/plus_icon-icons.com_66718.png',
  },
  {
    name: 'image.png',
    status: 'done',
    url: 'https://cdn.icon-icons.com/icons2/834/PNG/512/plus_icon-icons.com_66718.png',
  },
  
]);

const onChange = ({ fileList: newFileList }) => {
  setFileList(newFileList);
};
const onPreview = async (file) => {
  let src = file.url;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
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

            {/* Gambar destinasi belum */}

            {/* Gambar Destinasi */}
            <FieldWrapper
              isHorizontal={false}
              label="Gambar Destinasi (1920 x 1080)"
              id={'photo_wisata1'}
              error={errors.photo_wisata1}
            >
              <Dragger
                listType="picture-card"
                name="photo_wisata1"
                registration={register('photo_wisata1')}
                multiple={false}
                showUploadList={false}
                onChange={(info) => imageOnChange(info)}
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
                    <p className="ant-upload-hint">Maksimal ukuran file : 5 MB</p>
                    <p className="ant-upload-hint">Format pendukung: JPG, JPEG, PNG, GIF</p>
                  </>
                )}
              </Dragger>
             
              {/* <ImgCrop rotationSlider> */}
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList}
                  name="photo_wisata1"
                  registration={register('photo_wisata1')}
                  onChange={onChange}
                  onPreview={onPreview}
                  customRequest={(file, onSuccess, onError) => {
                    imageCustomRequest(file, onSuccess, onError);
                  }}
                >
                  {fileList.length < 3 && 
                  <UploadIcon/>
                  }
                </Upload>
              {/* </ImgCrop> */}
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
