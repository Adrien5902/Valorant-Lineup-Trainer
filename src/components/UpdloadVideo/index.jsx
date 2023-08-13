import React from 'react';
import FileDropzone from '../FileDropZone';

function UpdloadVideo({ }) {
    return (
        <div>
            <FileDropzone
                acceptedFileTypes={{
                    'image/*': [], 'video/*': []
                }}
                onFileDrop={(file)=>{
                    console.log(file)
                }}
            ></FileDropzone>
        </div>
    );
}

export default UpdloadVideo;
