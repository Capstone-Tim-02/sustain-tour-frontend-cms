import noPicture2 from '@/assets/images/no-picture-2.png';
import { TrashIcon, UploadIcon } from '@/components/Icons';

export const ValidationImagePreview = ({ isImageError, selectedImage }) => {
  return (
    <>
      {!isImageError && selectedImage && <img src={selectedImage} alt="preview" />}

      {isImageError && (
        <>
          <p className="ant-upload-text">Format file tidak sesuai</p>
          <p className="ant-upload-drag-icon grid justify-items-center">
            <img src={noPicture2} alt="No Picture" />
          </p>
          <p className="ant-upload-hint">
            Maksimal ukuran file: 5MB <br />
            Format pendukung: JPG, JPEG, PNG
          </p>
        </>
      )}

      {!isImageError && !selectedImage && (
        <>
          <p className="ant-upload-text">Tidak ada file yang dipilih</p>
          <p className="ant-upload-drag-icon grid justify-items-center">
            <UploadIcon />
          </p>
          <p className="ant-upload-hint">Format pendukung: JPG, JPEG, PNG</p>
        </>
      )}
    </>
  );
};

export const ListFile = ({ imageValue, isImageError, removeImage }) => {
  return (
    <>
      {imageValue?.name && (
        <div className="flex justify-between">
          <div className={`text-sm ${isImageError ? 'text-redDestimate-100' : ''}`}>
            {imageValue.name}
          </div>
          <div
            onClick={() => {
              removeImage();
            }}
          >
            <TrashIcon className="h-5 w-5 stroke-2 text-redDestimate-100 hover:cursor-pointer hover:text-redDestimate-100/70" />
          </div>
        </div>
      )}
    </>
  );
};
