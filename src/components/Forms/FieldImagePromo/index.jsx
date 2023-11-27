import { useEffect, useState } from "react"
import { Upload } from 'antd';

import { ListFile, ValidationImagePreview } from "@/features/promo/components/ImagePreview";

import { FieldWrapper } from "..";
const { Dragger } = Upload;
 

export const FieldImagePromo = ({ 
  isHorizontal, 
  id, 
  label, 
  name, 
  promo, 
  register, 
  setValue, 
  getValues, 
  error, 
  customRequest, 
  isImageError,
  setIsImageError
}) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const imageValue = getValues().image_voucher;
    useEffect(() => {        
        const imageValue = promo?.[name];
        
        setSelectedImage(imageValue);
    }, [promo, name]);

    const imageOnChange = (info) => {
        const reader = new FileReader();
    
        if (info.file.status === 'removed') {
          setValue('image_voucher', null);
          setSelectedImage(null);
        } else {
          reader.onload = (e) => {
            setValue('image_voucher', info.file.originFileObj);
            setSelectedImage(e.target.result);
          };
          reader.readAsDataURL(info.file.originFileObj);
        }
    }; 

    const removeImage = () => {
        setValue('image_voucher', null);
        setSelectedImage(null);
        setIsImageError(false);
    };
    
    return (
        <>
            <FieldWrapper
              isHorizontal={isHorizontal}
              label={label}
              id={id}
              error={error}
            >
              <Dragger
                listType="picture"
                name={name}
                registration={register(name)}
                multiple={false}
                showUploadList={false}
                onChange={(info) => {
                  imageOnChange(info);
                }}
                customRequest={(file, onSuccess, onError) => {
                  customRequest(file, onSuccess, onError);
                }}
              >
                {/* Validation Image Preview */}
                <ValidationImagePreview isImageError={isImageError} selectedImage={selectedImage} />
              </Dragger>
            </FieldWrapper>
            <ListFile imageValue={imageValue} isImageError={isImageError} removeImage={removeImage} />
        </>
    )
}