import { useEffect, useState } from 'react';
import { Clock5Icon, DotIcon } from 'lucide-react';

import { APIDestinations } from '@/apis/APIDestinations';
import LogoGoogleMaps from '@/assets/images/logo-google-maps.png';
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

export const DetailDestination = ({ id }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [detailDestination, setDetailDestination] = useState(null);
  const fasilitas = detailDestination?.fasilitas;
  const fasilitasParse = fasilitas ? JSON.parse(fasilitas) : null;
  console.log(fasilitasParse);
  const renderListFasilitas = (fas) => {
    console.log('fasilitas', fas);
    return Array.isArray(fas)
      ? fas.map((fasilitasItem) => (
          <li key={fasilitasItem} className="font-sans text-sm font-normal text-black flex">
            <DotIcon/>{fasilitasItem}
          </li>
        ))
      : null;
  };

  useEffect(() => {
    async function fetchDestination() {
      setDetailDestination(await APIDestinations.getDestination(id));
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
      <DialogContent onClick={() => setIsDialogOpen(!isDialogOpen)} className="sm:max-w-[815px]">
        <DialogHeader>
          <DialogTitle className="mb-4 text-primary-100">Data Destinasi</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
          <div className="flex w-full flex-col gap-3 sm:w-[50%]">
            <CarouselDetailDestination detailDestination={detailDestination} />
            <div className="flex items-center gap-3">
              <img className="h-10 w-10" src={LogoGoogleMaps} alt="logo-google-maps" />
              <div className="flex flex-col gap-3">
                <p className="font-sans text-xs font-normal text-black">
                  {detailDestination?.location}
                </p>
                <p className="font-sans text-sm font-normal text-black">
                  <span>{detailDestination?.lat}</span>,<span> {detailDestination?.long}</span>
                </p>
                <a
                  className="font-sans text-xs font-normal text-primary-40"
                  href={detailDestination?.maps_link}
                >
                  {detailDestination?.maps_link}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock5Icon />
              <div className="flex items-center gap-2 font-sans text-sm font-bold">
                {detailDestination?.is_open ? <Badge variant="success">Buka</Badge> : <Badge variant="destructive">Tutup</Badge>}
                <h1> {detailDestination?.description_is_open}</h1>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-[50%]">
            <div>
              <h1 className="font-sans font-bold text-black">Kategori Destinasi</h1>
              <Badge variant="pending">{detailDestination?.category.category_name}</Badge>
            </div>
            <div>
              <h1 className="font-sans font-bold text-black">Highlight</h1>
              <p className="font-sans text-sm font-normal text-black">
                {detailDestination?.description}
              </p>
            </div>
            <div>
              <h1 className="font-sans font-bold text-black">Fasilitas</h1>
              <ul>{renderListFasilitas(fasilitasParse)}</ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
