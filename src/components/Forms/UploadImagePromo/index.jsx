import { useState } from "react";
import { Controller } from "react-hook-form";
import { Upload } from 'antd';

import NoPicture from '@/assets/images/no-picture.png'
import { UploadIcon } from "@/components/Icons";

import { FieldWrapper } from "../FieldWrapper";

const { Dragger } = Upload;

export const UploadImagePromo = ({
    id,
    control,
    uploadName,
    label,
    error,
    isHorizontal,
    customRequest,
    onChange,
    ...props
}) => {
    const [ isError, setIsError ] = useState(false);

    return (
        <Controller
            name={uploadName}
            control={control}
            render={({ field }) => (
                <FieldWrapper
                    isHorizontal={isHorizontal}
                    label={label}
                    id={id}
                    error={error}
                >
                    <Dragger
                        {...field}
                        name={uploadName}
                        multiple={false}
                        showUploadList={{
                            showRemoveIcon: true,
                        }}
                        onChange={(info) => {
                            onChange(info);
                            console.log(info.file.status);
                            if(info.file.status === 'done') {
                                setIsError(false);
                            } else if(info.file.status === 'error'){
                                console.log(error);
                                setIsError(true);
                            }
                        }}
                        customRequest={(file, onSuccess, onError)=>{
                            customRequest(file, onSuccess, onError);
                        }}
                        {...props}
                    >
                        {!isError && field.value && typeof field.value === 'string'  && (
                            <img src={field.value} alt="Preview"/>
                        )}

                        {!isError && !field.value && (
                            <>
                                <p className="ant-upload-text">Tidak ada file yang dipilih</p>
                                <p className="grid ant-upload-drag-icon justify-items-center">
                                    <UploadIcon />
                                </p>
                                <p className="ant-upload-hint">
                                    Format pendukung: JPEG, PNG, GIF
                                </p>
                            </>
                        )}

                        {isError && (
                            <>
                                <p className="ant-upload-text">Format file tidak sesuai</p>
                                <p className="grid ant-upload-drag-icon justify-items-center">
                                    <img src={NoPicture} alt="No Picture"/>
                                </p>
                                <p className="ant-upload-hint">
                                    Maksimal ukuran file: 2GB <br/>
                                    Format pendukung: JPEG, PNG, GIF
                                </p>
                            </>
                        )}
                    </Dragger>
                </FieldWrapper>
            )}
        />

    )
}