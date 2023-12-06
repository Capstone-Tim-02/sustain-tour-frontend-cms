import { PlusOutlined } from '@ant-design/icons';

import { TrashIcon } from '@/components/Icons';

export const ListFile = ({ imageValue, errorImage, removeImage }) => {
  return (
    <>
      {imageValue?.name && (
        <div className="flex justify-between">
          <div className={`text-sm ${errorImage ? 'text-redDestimate-100' : ''}`}>
            {imageValue.name}
          </div>
          <div
            onClick={() => {
              removeImage({ file: { status: 'removed' } });
            }}
          >
            <TrashIcon className="h-5 w-5 stroke-2 text-redDestimate-100 hover:cursor-pointer hover:text-redDestimate-100/70" />
          </div>
        </div>
      )}
    </>
  );
};

export const ImagePreview = ({ imageSource }) => {
  return (
    <>
      {imageSource ? (
        <img src={imageSource} alt="Preview" className="w-full object-cover" />
      ) : (
        <div>
          <PlusOutlined />
        </div>
      )}
    </>
  );
};
