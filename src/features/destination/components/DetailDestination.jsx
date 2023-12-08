import { useEffect, useState } from 'react';
import { Clock5Icon, DotIcon } from 'lucide-react';

import { APIDestination } from '@/apis';
import LogoGoogleMaps from '@/assets/images/logo-google-maps.png';
import { Spinner } from '@/components/Elements';
import { DetailIcon } from '@/components/Icons';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { CarouselDetailDestination } from './CarouselDetailDestination';

const renderListFasilitas = (fas) => {
  return Array.isArray(fas)
    ? fas.map((fasilitasItem) => (
        <li key={fasilitasItem} className="flex font-sans text-sm font-normal text-black">
          <DotIcon />
          {fasilitasItem}
        </li>
      ))
    : null;
};

export const DetailDestination = ({ id }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [detailDestination, setDetailDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fasilitasParse = detailDestination?.fasilitas
    ? JSON.parse(detailDestination?.fasilitas)
    : null;

  useEffect(() => {
    async function fetchDestination() {
      setIsLoading(true);
      setDetailDestination(await APIDestination.getDestinationById(id));
      setIsLoading(false);
    }

    if (isDialogOpen) {
      fetchDestination();
    }
  }, [id, isDialogOpen]);
  return (
    <Dialog>
      <DialogTrigger onClick={() => setIsDialogOpen(!isDialogOpen)}>
        <DetailIcon className="h-5 w-5 stroke-2 text-black hover:cursor-pointer hover:opacity-60" />
      </DialogTrigger>
      <DialogContent
        onClick={() => setIsDialogOpen(!isDialogOpen)}
        className="h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary-20 scrollbar-thumb-rounded-full sm:max-w-[815px]"
      >
        <DialogHeader>
          <DialogTitle className="mb-4 text-primary-100">Data Destinasi</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <Spinner size="base" className="mx-auto mb-5" />
        ) : (
          <div className="flex flex-col gap-5 sm:gap-10 md:flex-row">
            <div className="flex w-full flex-col gap-3 md:w-2/4">
              <div className="h-[300px] w-full md:h-[242px] md:max-w-[363px]">
                <CarouselDetailDestination detailDestination={detailDestination} />
              </div>

              <div className="flex items-center gap-3">
                <img
                  className="max-w-7 max-h-7 object-contain"
                  src={LogoGoogleMaps}
                  alt="logo-google-maps"
                />
                <div className="flex w-full flex-col gap-3 md:max-w-[300px]">
                  <p className="font-sans text-sm font-normal text-black">
                    {detailDestination?.location || '-'}
                  </p>
                  <p className="font-sans text-sm font-normal text-black">
                    <span>{detailDestination?.lat || '-'}</span>,
                    <span> {detailDestination?.long || '-'}</span>
                  </p>
                  <a
                    className="flex font-sans text-xs font-normal text-primary-40 sm:text-sm"
                    href={detailDestination?.maps_link || '-'}
                  >
                    {detailDestination?.maps_link || '-'}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock5Icon />
                <div className="flex items-center gap-2 font-sans text-sm font-bold">
                  {detailDestination?.is_open ? (
                    <Badge variant="success">Buka</Badge>
                  ) : (
                    <Badge variant="destructive">Tutup</Badge>
                  )}
                  <h1> {detailDestination?.description_is_open || '-'}</h1>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 md:w-2/4">
              <div>
                <h1 className="font-sans font-bold text-black">Kategori Destinasi</h1>
                <Badge variant="pending">{detailDestination?.category.category_name || '-'}</Badge>
              </div>
              <div>
                <h1 className="font-sans font-bold text-black">Highlight</h1>
                <p className="font-sans text-sm font-normal text-black">
                  {detailDestination?.description || '-'}
                </p>
              </div>
              <div>
                <h1 className="font-sans font-bold text-black">Fasilitas</h1>
                <ul>{renderListFasilitas(fasilitasParse)}</ul>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
