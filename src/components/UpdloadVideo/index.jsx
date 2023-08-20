import React from 'react';
import FileDropzone from '../FileDropZone';

function UpdloadVideo({ lang }) {
    return (
        <div>
            <FileDropzone
                acceptedFileTypes={{
                    'image/*': [], 'video/*': []
                }}
                onFileDrop={(file)=>{
                    console.log(file)
                }}
                lang={lang}
            ></FileDropzone>
        </div>
    );
}

export default UpdloadVideo;
