import createDOMPurify from 'dompurify';
import { marked } from 'marked';

const DOMPurify = createDOMPurify(window);

export const MarkdownPreview = ({ value = '' }) => {
  return (
    <div
      className=""
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(marked(value)),
      }}
    />
  );
};
