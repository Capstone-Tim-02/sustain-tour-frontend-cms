import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';

import { APITnc } from '@/apis';
import { Spinner } from '@/components/Elements';
import { InputField, TextEditorField } from '@/components/Forms';
import { Button } from '@/components/ui/button';
import { clearQuery } from '@/stores/ui-slice';

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

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchTnc() {
      setIsLoading(true);
      setDetailTnc(await APITnc.getTncById(tncId));
      setIsLoading(false);
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
      dispatch(clearQuery());
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
      {isLoading ? (
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" className="mx-auto mt-10" />
        </div>
      ) : (
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

          <div className="flex justify-end gap-x-2 pt-5">
            <Link to="/syarat_dan_ketentuan">
              <Button variant="outline" onClick={() => dispatch(clearQuery())}>
                Kembali
              </Button>
            </Link>
            <Button isloading={isLoading} form="editTnc" type="submit">
              Simpan
            </Button>
          </div>
        </form>
      )}
    </>
  );
};
