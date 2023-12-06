export const ImageDestinationField = ({ photo_wisata1, photo_wisata2, photo_wisata3, children }) => {
    const isAnyImageSelected = photo_wisata1 || photo_wisata2 || photo_wisata3;
    return (
      <div className="my-3 flex flex-col flex-wrap items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary-20 py-5 md:my-2 md:flex-row">
        <div className="flex flex-col p-5 sm:p-2">
          {isAnyImageSelected ? null : (
            <p className="mb-2 text-center font-medium text-black">Tidak ada file yang dipilih</p>
          )}
  
          <div className="flex flex-col flex-wrap items-center justify-center gap-2  md:my-2 md:flex-row">
            {children}
          </div>
  
          <div className="text-center font-medium text-greyDestimate-100">
            {isAnyImageSelected ? null : (
              <>
                <p className="leading-none">Maksimal ukuran file : 5MB</p>
                <p>Format pendukung : JPG, JPEG, PNG</p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };