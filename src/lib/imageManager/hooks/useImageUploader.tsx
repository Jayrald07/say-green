import { ImageManager } from "@app/lib/imageManager";
import { useEffect, useRef, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { Image } from "@app/types/declarations";

export const useImageUploader = () => {
  const imageManager = useRef<ImageManager>();
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<Image[]>([]);

  const updateImageUploadProgress = (imageId: string, progress: number) => {
    setImages((prevImages) => {
      return prevImages.map((image) => {
        if (image.id != imageId) return image;

        image.progress = progress;

        return image;
      });
    });
  };

  const startUploading = async () => {
    if (!imageManager.current) {
      return;
    }

    setUploading(true);

    for (const { id, blob } of images) {
      const uploadStream = await imageManager.current.uploadDataUrl(new Blob([blob]));

      uploadStream.on("httpUploadProgress", ({ loaded, total }) => {
        updateImageUploadProgress(id, parseFloat(((loaded / total) * 100).toFixed(2)));
      });

      uploadStream.send((err) => {
        if (err) {
          console.error(err);
        }

        removeImage(id);
      });
    }
  };

  const initializeImageManager = async () => {
    const authSession = await fetchAuthSession();

    if (!authSession) {
      return;
    }

    const { credentials } = authSession;

    if (!credentials) {
      return;
    }
    imageManager.current = new ImageManager(credentials);
  };

  const removeImage = (imageId: string) => {
    setImages((prevImages) => {
      return prevImages.filter((image) => image.id != imageId);
    });
  };

  const addImage = (image: Image) => {
    setImages((prevImages) => [...prevImages, image]);
  };

  const clearImages = () => {
    setImages([]);
  };

  useEffect(() => {
    initializeImageManager();
  }, []);

  useEffect(() => {
    if (!images.length) {
      setUploading(false);
    }
  }, [images]);

  return {
    images,
    startUploading,
    addImage,
    removeImage,
    clearImages,
    uploading,
  };
};
