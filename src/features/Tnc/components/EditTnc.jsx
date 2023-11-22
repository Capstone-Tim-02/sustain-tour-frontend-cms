import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';

import { APITnc } from '@/apis/APITnc';
import { Spinner } from '@/components/Elements';
import { InputField, TextEditorField } from '@/components/Forms';
import { Button } from '@/components/ui/button';

const schema = y.object({
  tnc_name: y.string().required('Judul tidak boleh kosong'),
  description: y
    .string()
    .max(100000, 'Deskripsi tidak boleh lebih dari 100000 karakter')
    .required('Deskripsi tidak boleh kosong'),
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
          <Button variant="outline">Batal</Button>
        </Link>
        <Button disabled={isLoading} form="editTnc" type="submit">
          {isLoading && <Spinner size="sm" className="mr-3" />} Simpan
        </Button>
      </div>
    </>
  );
};
