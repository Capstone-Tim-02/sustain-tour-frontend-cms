import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';

import { APIPromo } from "@/apis/APIPromo";
import { Spinner } from '@/components/Elements';
import { DropdownField, InputField, TextAreaField, TextEditorField, UploadImagePromo } from "@/components/Forms";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/format";

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
    image_voucher: y.mixed().required('Gambar tidak boleh kosong!'),
});

const statusOptions = [
    { value: false, label:'tidak aktif'},
    { value: true, label:'aktif'},
];

export const EditPromo = ({id}) => {
    const [ promo, setPromo ] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const formData = new FormData();

    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema)});

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
    }, [reset, promo]);

    const onSubmit = async (data) => {
        try {
            if(Object.keys(errors).length === 0) {
                if (selectedImage) {
                    formData.append('image_voucher', selectedImage);
                }
    
                Object.entries(data).forEach(([key, value]) => {
                    if (key !== 'image_voucher') {
                        formData.append(key, key === 'status_aktif' ? value === 'true' : value);
                    }
                });
    
                setIsLoading(true);
                await APIPromo.editPromo(id, formData);
                // back to promo page
            } else {
                toast.error('Terdapat field yang tidak valid!');
            }
            
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (info) => {
        if (info.file.status === 'done') {
            const reader = new FileReader();
            reader.onload = (e) => {
                setValue('image_voucher', e.target.result);
                setSelectedImage(info.file.originFileObj);
            };
            reader.readAsDataURL(info.file.originFileObj);
        } 
    }

    const handleCustomRequest = async ({ file, onSuccess, onError }) => {
        const isValid = file.type.startsWith('image/');
        if (isValid) {
            try {
                const imageVoucherSchema = y.object({
                    image_voucher: schema.fields.image_voucher,
                });

                await imageVoucherSchema.validate({ image_voucher: file });
                setValue('image_voucher', file.originFileObj);
                setSelectedImage(file.originFileObj);

                clearErrors('image_voucher');
                onSuccess();
            } catch (validationError) {
                const errorMessage = validationError.errors[0];

                setError('image_voucher', {
                    type:'manual',
                    message: errorMessage
                });
                onError();
            }
        } else {
            setError('image_voucher', {
                type:'manual',
                message: 'Format file tidak sesuai.'
            })
            onError();
        }
    }

    const handleCancel = () => {
        console.log('back to promo page');
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
                        <UploadImagePromo
                            uploadName='image_voucher'
                            label='Gambar Promo (1920 x 1080)'
                            control={control}
                            customRequest={handleCustomRequest}
                            onChange={handleImageChange}
                            registration={register('image_voucher')}
                            error={errors.image_voucher}
                        />
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
