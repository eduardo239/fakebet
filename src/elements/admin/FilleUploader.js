import { FileCard, FileUploader, Pane } from 'evergreen-ui';
import React from 'react';

function FileUploaderSingleUpload({ setFiles, files }) {
  const [fileRejections, setFileRejections] = React.useState([]);
  const handleChange = React.useCallback((files) => setFiles([files[0]]), []);
  const handleRejected = React.useCallback(
    (fileRejections) => setFileRejections([fileRejections[0]]),
    []
  );
  const handleRemove = React.useCallback(() => {
    setFiles([]);
    setFileRejections([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Pane>
      <FileUploader
        label='Enviar arquivo'
        description='You can upload 1 file. File can be up to 50 MB.'
        maxSizeInBytes={50 * 1024 ** 2}
        maxFiles={1}
        onChange={handleChange}
        onRejected={handleRejected}
        renderFile={(file) => {
          const { name, size, type } = file;
          const fileRejection = fileRejections.find(
            (fileRejection) => fileRejection.file === file
          );
          const { message } = fileRejection || {};
          return (
            <FileCard
              key={name}
              isInvalid={fileRejection != null}
              name={name}
              onRemove={handleRemove}
              sizeInBytes={size}
              type={type}
              validationMessage={message}
            />
          );
        }}
        values={files}
      />
    </Pane>
  );
}

export default FileUploaderSingleUpload;
