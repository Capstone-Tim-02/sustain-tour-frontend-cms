import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { Upload } from 'antd';
import * as y from 'yup';

import { APIPromo } from "@/apis/APIPromo";
import NoPicture from '@/assets/images/no-picture.png';
import { Spinner } from '@/components/Elements';
import { DropdownField, InputField, TextAreaField, TextEditorField } from "@/components/Forms";
import { FieldWrapper } from "@/components/Forms/FieldWrapper";
import { TrashIcon } from '@/components/Icons';
import { UploadIcon } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/format";

const { Dragger } = Upload;

const schema = y.object({
    title: y.string().required('Judul promo tidak boleh kosong!'),
    nama_promo: y.string().required('Nama promo tidak boleh kosong!'),
    kode_voucher: y.string().required('Kode promo tidak boleh kosong!'),
    jumlah_potongan_persen: y.string().required('Diskon promo tidak boleh kosong!')
        .test('is-number', 'Diskon promo harus berupa angka', (value) => {
            return !isNaN(value);
        }),
    status_aktif: y.string().required('Status promo harus diisi!'),
    deskripsi: y.string().required("Deskripsi promo tidak boleh kosong!"),
    peraturan: y.string().required('Peraturan promo tidak boleh kosong!'),
    image_voucher: y
        .mixed()
        .required('Gambar tidak boleh kosong!')
        .test('fileFormat',
        'Format file tidak sesuai. Hanya diperbolehkan format JPEG, PNG, atau GIF.',
        (value) => {
            if (!value) return true;
    
            const allowedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
            return allowedFormats.includes(value.type);
        }),
});

const statusOptions = [
    { value: false, label:'tidak aktif'},
    { value: true, label:'aktif'},
];

export const EditPromo = ({id}) => {
    const [ promo, setPromo ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ selectedImage, setSelectedImage ] = useState(null);
    const [ errorImage, setErrorImage ] = useState(false);

    const formData = new FormData();
    const navigate = useNavigate();

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
    } = useForm({ resolver: yupResolver(schema)});

    const imageValue = getValues().image_voucher;

    useEffect(() => {
        async function fetchPromo() {
            setPromo(await APIPromo.getPromoById(id));
        }
        fetchPromo();
    }, [id]);

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
            await APIPromo.editPromo(id, formData);
            navigate('/promo');
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
            }
            reader.readAsDataURL(info.file.originFileObj);
        }
    };

    const imageCustomRequest = async ({file, onSuccess, onError} ) => {
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
                    type:'manual',
                    message: errorMessage
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
    }

    const handleCancel = () => {
        navigate('/promo')
    }

    return (
        <div className="mt-8 overflow-hidden rounded-lg bg-white shadow p-10">
            <form onSubmit={handleSubmit(onSubmit)} id='editPromo' className="space-y-5">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col md:max-w-[50%] md:flex-grow gap-4">
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
                            placeholder="Masukkan diskon promo"
                            label="Diskon (Masukkan Angka)"
                            autoComplete="off"
                            registration={register('jumlah_potongan_persen')}
                            error={errors.jumlah_potongan_persen}
                        />

                        {/* Status */}
                        <DropdownField
                            label='Status'
                            options={statusOptions}
                            registration={register('status_aktif')}
                            error={errors.status_aktif}
                        />

                        {/* Deskripsi */}
                        <TextAreaField
                            label='Deskripsi'
                            placeholder='Masukkan deskripsi promo'
                            autoComplete="off"
                            registration={register('deskripsi')}
                            error={errors.deskripsi}
                            className='row-span-2'
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
                            label={"Gambar Promo"}
                            id={'image_voucher'}
                            error={errors.image_voucher}
                        >
                            <Dragger
                                listType="picture"
                                name="image_voucher"
                                registration={register('image_voucher')}
                                multiple={false}
                                showUploadList={false}
                                onChange={(info) => { imageOnChange(info) }}
                                customRequest={(file, onSuccess, onError) => { imageCustomRequest(file, onSuccess, onError)}}
                            >
                                {!errorImage && selectedImage && (
                                    <img src={selectedImage} alt="preview"/>
                                )}

                                {errorImage && (
                                    <>
                                        <p className="ant-upload-text">Format file tidak sesuai</p>
                                        <p className="grid ant-upload-drag-icon justify-items-center">
                                            <img src={NoPicture} alt="No Picture"/>
                                        </p>
                                        <p className="ant-upload-hint">
                                            Maksimal ukuran file: 2GB <br/>
                                            Format pendukung: JPEG, PNG, GIF
                                        </p>
                                    </>
                                )}

                                {!errorImage && !selectedImage && (
                                    <>
                                        <p className="ant-upload-text">Tidak ada file yang dipilih</p>
                                        <p className="grid ant-upload-drag-icon justify-items-center">
                                            <UploadIcon />
                                        </p>
                                        <p className="ant-upload-hint">
                                            Format pendukung: JPEG, PNG, GIF
                                        </p>
                                    </>
                                )}
                            </Dragger>
                        </FieldWrapper>
                        {imageValue?.name && (
                            <>
                                <div className="flex justify-between">
                                    <div className={`text-sm ${errorImage ? 'text-redDestimate-100':''}`}>
                                        {imageValue.name}
                                    </div>
                                    <div onClick={() => {removeImage()}}>
                                        <TrashIcon className="h-5 w-5 stroke-2 text-redDestimate-100 hover:cursor-pointer hover:text-redDestimate-100/70" />
                                    </div>

                                </div>
                            </>
                        )}

                    </div>

                    <div className="flex flex-col md:flex-grow gap-4">
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
                <div className="grid grid-rows-1 md:justify-items-end justify-items-center">
                    <div>
                        <Button 
                            type='button'
                            className="mr-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 ring-offset-white transition-colors hover:bg-slate-100 hover:text-slate-900"
                            onClick = {() => handleCancel()}
                            >
                            Batal
                        </Button>
                        <Button form='editPromo' type='submit' disabled={isLoading}>
                            {isLoading && <Spinner size="sm" className="mr-3" />} Simpan
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
