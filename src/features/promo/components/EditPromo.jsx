import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';

import { APIPromo } from "@/apis/APIPromo";
import { InputField } from "@/components/Forms";

const schema = y.object({
    title: y.string().required('Judul promo tidak boleh kosong!'),
    nama_promo: y.string().required('Nama promo tidak boleh kosong!'),
});

const inputFieldStyle = {
    width: '100%',
    backgroundColor: '#fff',
}

export const EditPromo = ({id}) => {
    const [ promo, setPromo ] = useState(null);


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
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        reset({...promo})
    }, [reset, promo]);

    return (
        <div className="mt-8 overflow-hidden rounded-lg bg-white shadow p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
                    <div className="lg:w-1/2">
                        <InputField
                            isRequired
                            style={inputFieldStyle}
                            placeholder="Masukkan judul promo"
                            label="Judul Promo"
                            autoComplete="off"
                            registration={register('title')}
                            error={errors.title}
                        />
                    </div>

                    <div className="lg:w-1/2">
                        <InputField
                            isRequired
                            placeholder="Masukkan nama promo"
                            label="Nama Promo"
                            autoComplete="off"
                            registration={register('nama_promo')}
                            error={errors.nama_promo}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}