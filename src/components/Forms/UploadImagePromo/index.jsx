import { Controller } from "react-hook-form";
import { Upload } from 'antd';

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
                        showUploadList={false}
                        onChange={(info) => {
                            onChange(info)
                        }}
                        customRequest={(file, onSuccess, onError)=>{customRequest(file,onSuccess,onError)}}
                        {...props}
                    >
                        {!error && field.value && typeof field.value === 'string'  && (
                            <img src={field.value} alt="Preview" style={{ marginTop: '10px' }} />
                        )}

                        {!error && !field.value && (
                                <>
                                    <p className="grid ant-upload-drag-icon justify-items-center">
                                        <UploadIcon />
                                    </p>
                                    <p className="ant-upload-text">Tidak ada file yang dipilih</p>
                                    <p className="ant-upload-hint">
                                        Format pendukung: JPEG, PNG, GIF
                                    </p>
                                </>
                        )}

                        {error && (
                            <>
                                <p className="grid ant-upload-drag-icon justify-items-center">
                                <UploadIcon />
                                </p>
                                <p className="ant-upload-text">Format file tidak sesuai</p>
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