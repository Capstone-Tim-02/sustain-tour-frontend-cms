import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';

import { APIPromo } from "@/apis/APIPromo";
import { DropdownField, InputField, TextareaField } from "@/components/Forms";
import { Button } from "@/components/ui/button";
import { Spinner } from '@/components/Elements';
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
});

const statusOptions = [
    { value: false, label:'tidak aktif'},
    { value: true, label:'aktif'},
]

export const EditPromo = ({id}) => {
    const [ promo, setPromo ] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        async function fetchPromo() {
            setPromo(await APIPromo.getPromo(id));
        }
        fetchPromo();
    }, [id]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema)});

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            await APIPromo.editPromo(id, data);
            // back to promo page
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const formattedDate = formatDate(promo?.tanggal_kadaluarsa, 'YYYY-MM-DD');
    
        reset({
          ...promo,
          tanggal_kadaluarsa: formattedDate,
        });
    }, [reset, promo]);

    const handleCancel = () => {
        console.log('back to promo page');
    }


    return (
        <div className="mt-8 overflow-hidden rounded-lg bg-white shadow p-10">
            <form onSubmit={handleSubmit(onSubmit)} id='editPromo' 
            className="space-y-5"
            >
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col md:flex-grow gap-4">
                        {/* Judul Promo */}
                        <InputField
                            isRequired
                            placeholder="Masukkan judul promo"
                            label="Judul Promo"
                            autoComplete="off"
                            registration={register('title')}
                            error={errors.title}
                        />

                        {/* Kode Promo */}
                        <InputField
                            isRequired
                            placeholder="Masukkan kode promo"
                            label="Kode Promo"
                            autoComplete="off"
                            registration={register('kode_voucher')}
                            error={errors.kode_voucher}
                        />

                        {/* Diskon Promo */}
                        <InputField
                            isRequired
                            placeholder="Masukkan diskon promo"
                            label="Diskon (Masukkan Angka)"
                            autoComplete="off"
                            registration={register('jumlah_potongan_persen')}
                            error={errors.jumlah_potongan_persen}
                        />

                        {/* Status */}
                        <DropdownField
                            isRequired
                            label='Status'
                            options={statusOptions}
                            registration={register('status_aktif')}
                            error={errors.status_aktif}
                        />

                        {/* Deskripsi */}
                        <TextareaField
                            isRequired
                            label='Deskripsi'
                            placeholder='Masukkan deskripsi promo'
                            autoComplete="off"
                            registration={register('deskripsi')}
                            error={errors.deskripsi}
                            className='row-span-2'
                        />

                        {/* Peraturan */}

                        {/* Gambar Promo */}

                    </div>

                    <div className="flex flex-col md:flex-grow gap-4">
                        {/* Nama Promo */}
                        <InputField
                            isRequired
                            placeholder="Masukkan nama promo"
                            label="Nama Promo"
                            autoComplete="off"
                            registration={register('nama_promo')}
                            error={errors.nama_promo}
                        />

                        {/* Tanggal Kadaluarsa */}
                        <InputField
                            type="date"
                            isRequired
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