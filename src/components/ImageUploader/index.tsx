import React, { PropsWithChildren } from "react";
import { v4 } from "uuid";
import { Modal } from "../Modal";
import { ProgressBar } from "../ProgressBar";
import { InputFile } from "../InputFile";
import Button from "../Button";
import { useImageUploader } from "@/lib/imageManager/hooks/useImageUploader";

export default function ImageUploader(props: Readonly<PropsWithChildren & { open: boolean; onClose: () => void }>) {
  const { open, onClose } = props;
  const { addImage, removeImage, clearImages, images, uploading, startUploading } = useImageUploader();

  const handleCameraChange = async (files: FileList) => {
    if (!files.length) return;

    for (const file of files) {
      const fileBuffer = await file.arrayBuffer();

      if (!fileBuffer) return;

      addImage({
        id: v4(),
        blob: fileBuffer,
        progress: 0,
        uploading: false,
      });
    }
  };

  const handleCloseImageUpload = () => {
    clearImages();
    onClose();
  };

  const handleStartUploading = () => {
    onClose();
    startUploading();
  };

  return (
    <>
      <Modal
        title="Upload Images"
        open={open}
        size="MEDIUM"
        onClose={handleCloseImageUpload}
        footers={[
          <InputFile key="upload-images" onChange={handleCameraChange} />,
          <Button key="upload-now" disabled={!images.length} onClick={handleStartUploading}>
            Upload Now
          </Button>,
        ]}
      >
        <ul className="grid grid-cols-3 overflow-y-auto gap-2 p-5 content-start">
          {images.map((image) => (
            <li key={image.id} className="h-28 relative">
              <img
                draggable={false}
                key={image.id}
                src={URL.createObjectURL(new Blob([image.blob]))}
                alt="none-"
                className="object-cover h-full w-full rounded-md"
                aria-hidden
                onDoubleClick={() => removeImage(image.id)}
              />
              {image.uploading && <small className="block z-50 absolute top-0">{image.progress}%</small>}
            </li>
          ))}
        </ul>
      </Modal>
      {uploading && (
        <div className="absolute bottom-9 bg-white z-10 sm:right-2 w-full text-sm sm:w-60 shadow-md">
          <h1 className="p-3 border-b bg-slate-100 text-slate-700 select-none">Uploading Image/s</h1>
          <ul className="overflow-y-auto max-h-44">
            {images.map((image) => (
              <li key={image.id} className="px-3 py-2 border-b">
                <ProgressBar label={image.id} progress={image.progress} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
