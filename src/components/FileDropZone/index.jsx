import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './style.css'

const FileDropzone = ({ onFileDrop, acceptedFileTypes, lang }) => {
    const [selectedFile, setSelectedFile] = useState(null)

    const onDrop = (acceptedFiles) => {
        if (onFileDrop && acceptedFiles.length > 0) {
          onFileDrop(acceptedFiles[0]);
        }
        setSelectedFile(acceptedFiles[0]?.name)
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: acceptedFileTypes
    });

    return (
        <div {...getRootProps()} className="file-dropzone">
            <input {...getInputProps()} />
            <p>{selectedFile ? selectedFile : lang("fileDropzone")}</p>
        </div>
    );
};

export default FileDropzone;
