/* eslint-disable no-undef */
import { Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';

import { FieldWrapper } from '../FieldWrapper';

export const TextEditorField = ({
  label,
  id,
  error,
  isHorizontal,
  isHorizontalStart,
  initialValue,
  textareaName,
  control,
  placeholder,
  registration,
  ...props
}) => {
  return (
    <Controller
      name={textareaName}
      control={control}
      render={({ field }) => (
        <FieldWrapper
          isHorizontal={isHorizontal}
          isHorizontalStart={isHorizontalStart}
          label={label}
          id={id}
          error={error}
        >
          <Editor
            {...field}
            tinymceScriptSrc={'/plugins/tinymce/tinymce.min.js'}
            textareaName={textareaName}
            id={id}
            initialValue={initialValue}
            init={{
              width: '100%',
              height: 260,
              menubar: false,
              selector: 'textarea',
              placeholder,
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'preview',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; z-index: 9999; }',
            }}
            onEditorChange={field.onChange}
            {...registration}
            {...props}
          />
        </FieldWrapper>
      )}
    />
  );
};
