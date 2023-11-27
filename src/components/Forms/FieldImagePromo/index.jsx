import { useEffect, useState } from "react"
import { Upload } from 'antd';

import { FieldWrapper } from "..";

import { ListFile, ValidationImagePreview } from "./ImagePreview";
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

    const imageValue = getValues()[name];
    useEffect(() => {        
        const imageValue = promo?.[name];
        
        setSelectedImage(imageValue);
    }, [promo, name]);

    const imageOnChange = (info) => {
        const reader = new FileReader();
    
        if (info.file.status === 'removed') {
          setValue(name, null);
          setSelectedImage(null);
        } else {
          reader.onload = (e) => {
            setValue(name, info.file.originFileObj);
            setSelectedImage(e.target.result);
          };
          reader.readAsDataURL(info.file.originFileObj);
        }
    }; 

    const removeImage = () => {
        setValue(name, null);
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