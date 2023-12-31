import { Carousel } from '@material-tailwind/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import noPicture2 from '@/assets/images/no-picture-2.png';

export function CarouselDetailDestination({ detailDestination }) {
  return (
    <Carousel
      className="rounded-xl"
      loop
      transition={{
        type: 'tween',
        duration: 1,
      }}
      prevArrow={({ handlePrev }) => (
        <>
          {detailDestination?.photo_wisata2 || detailDestination?.photo_wisata3 ? (
            <ArrowLeft
              onClick={handlePrev}
              className="!absolute left-4 top-2/4 -translate-y-2/4 rounded-md bg-primary-80 text-white"
            />
          ) : null}
        </>
      )}
      nextArrow={({ handleNext }) => (
        <>
          {detailDestination?.photo_wisata2 || detailDestination?.photo_wisata3 ? (
            <ArrowRight
              onClick={handleNext}
              className="!absolute !right-4 top-2/4 -translate-y-2/4 rounded-md  bg-primary-80 text-white"
            />
          ) : null}
        </>
      )}
      autoplay // Enable autoplay
      autoplayDelay={8000} // Set the autoplay speed (in milliseconds)
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill('').map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {detailDestination?.photo_wisata1 ? (
        <div className="relative h-full w-full">
          <img
            src={detailDestination?.photo_wisata1 ? detailDestination?.photo_wisata1 : noPicture2}
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-8 left-5 right-auto rounded-lg bg-primary-80">
            <div className="flex w-auto flex-col justify-start p-2 text-white">
              <h1 className="font-sans font-bold">{detailDestination?.title}</h1>
              <h1 className="font-sans text-sm font-normal">{detailDestination?.kode}</h1>
            </div>
          </div>
        </div>
      ) : null}

      {detailDestination?.photo_wisata2 ? (
        <div className="relative h-full w-full">
          <img
            src={detailDestination?.photo_wisata2 || noPicture2}
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-8 left-5 right-auto rounded-lg bg-primary-80">
            <div className="flex w-auto flex-col justify-start p-2 text-white">
              <h1 className="font-sans font-bold">{detailDestination?.title}</h1>
              <h1 className="font-sans text-sm font-normal">{detailDestination?.kode}</h1>
            </div>
          </div>
        </div>
      ) : null}

      {detailDestination?.photo_wisata3 ? (
        <div className="relative h-full w-full">
          <img
            src={detailDestination?.photo_wisata3 || noPicture2}
            alt="image 3"
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-8 left-5 right-auto rounded-lg bg-primary-80">
            <div className="flex w-auto flex-col justify-start p-2 text-white">
              <h1 className="font-sans font-semibold">{detailDestination?.title}</h1>
              <h1 className="font-sans text-sm font-normal">{detailDestination?.kode}</h1>
            </div>
          </div>
        </div>
      ) : null}
    </Carousel>
  );
}
