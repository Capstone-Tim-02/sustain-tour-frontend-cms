import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';

import { APITnc } from '@/apis/APITnc';
import { InputField, TextEditorField } from '@/components/Forms';
import { Button } from '@/components/ui/button';

const schema = y.object({
  tnc_name: y
    .string()
    .required('Judul tidak boleh kosong')
    .min(5, 'Judul minimal 5 karakter')
    .max(100, 'Judul tidak boleh lebih dari 100 karakter'),
  description: y
    .string()
    .required('Deskripsi tidak boleh kosong')
    .min(10, 'Deskripsi minimal 10 karakter')
    .max(2000, 'Deskripsi tidak boleh lebih dari 2000 karakter'),
});

export const EditTnc = ({ onSuccess }) => {
  const { tncId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [detailTnc, setDetailTnc] = useState(null);

  useEffect(() => {
    async function fetchTnc() {
      setDetailTnc(await APITnc.getTncById(tncId));
    }

    fetchTnc();
  }, [tncId]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await APITnc.updateTnc(tncId, data);
      onSuccess();
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reset({
      ...detailTnc,
    });
  }, [reset, detailTnc]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id="editTnc" className="space-y-4">
        <InputField
          placeholder="Masukkan judul"
          label="Judul"
          autoComplete="off"
          registration={register('tnc_name')}
          error={errors.tnc_name}
        />

        <TextEditorField
          textareaName="description"
          placeholder="Masukkan Deskripsi"
          label="Deskripsi"
          control={control}
          registration={register('description')}
          error={errors.description}
        />
      </form>

      <div className="flex justify-end gap-x-2 pt-5">
        <Link to="/syarat_dan_ketentuan" replace>
          <Button variant="outline">Kembali</Button>
        </Link>
        <Button isloading={isLoading} form="editTnc" type="submit">
          Simpan
        </Button>
      </div>
    </>
  );
};
