import { useEffect } from "react";
import { useState } from "react";
import { getCurrentUser } from "src/firebase/auth";
import { uploadFile } from "src/firebase/storage";

export default function usePhotos(onPhotosUploaded) {
  const [photos, setPhotos] = useState([]);
  const [uploadStatuses, setUploadStatuses] = useState({});

  useEffect(() => {
    const urls = [];
    for (let i = 0; i < photos.length; i++) {
      const url = uploadStatuses[i]?.url;

      if (typeof url === "string") {
        urls.push(url);
        continue;
      }
      break;
    }

    if (
      urls.length > 0 &&
      urls.length === photos.length &&
      typeof onPhotosUploaded === "function"
    ) {
      onPhotosUploaded(uploadStatuses[0].postId, urls);
    }
  }, [uploadStatuses, photos, onPhotosUploaded]);

  const getNewPhotos = (files) => {
    const newPhotos = [];

    for (const file of files) {
      let skip = false;
      for (const j of photos) {
        if (file.name === j.name && file.type === j.type) {
          skip = true;
          break;
        }
      }
      if (skip) continue;
      newPhotos.push(file);
    }
    return newPhotos;
  };

  const addPhotos = (e) => {
    const files = e.target.files;
    const newPhotos = getNewPhotos(files);
    if (newPhotos.length > 0) {
      setPhotos((prev) => [...prev, ...newPhotos]);
    }
  };

  const removePhoto = (index) => {
    setPhotos((prev) => {
      return prev.filter((_, i) => i !== index);
    });
  };

  const getPhotoURL = (photo) => URL.createObjectURL(photo);

  const uploadPhoto = (userId, postId, file, index) => {
    const uploadTask = uploadFile(
      file,
      `feed/${userId}/${postId}/${file.name}`
    );

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setUploadStatuses((prev) => ({
          ...prev,
          [index]: {
            postId: postId,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            status: snapshot.state,
          },
        }));
      },
      (error) => {
        setUploadStatuses((prev) => ({
          ...prev,
          [index]: {
            ...prev[index],
            error: error,
          },
        }));
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
          setUploadStatuses((prev) => ({
            ...prev,
            [index]: {
              ...prev[index],
              url,
            },
          }));
        });
      }
    );
  };

  const retryUploadPhoto = (index) => {
    const userId = getCurrentUser().uid;
    setUploadStatuses((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        error: null,
      },
    }));
    uploadPhoto(userId, uploadStatuses[index].postId, photos[index], index);
  };

  const retryUploadPhotos = () => {
    if (Object.keys(uploadStatuses).length < 1) return;

    for (const key in uploadStatuses) {
      const item = uploadStatuses[key];
      if (item.error?.code) {
        retryUploadPhoto(key);
      }
    }
  };

  const uploadPhotos = (postId) => {
    const userId = getCurrentUser().uid;
    photos.forEach((file, index) => {
      uploadPhoto(userId, postId, file, index);
    });
  };

  const checkUploadError = () => {
    if (Object.keys(uploadStatuses).length > 0) {
      for (const key in uploadStatuses) {
        const item = uploadStatuses[key];
        if (item.error?.code) {
          return true;
        }
      }
    }

    return false;
  };

  const isLoading = () => {
    if (Object.keys(uploadStatuses).length > 0) {
      for (const key in uploadStatuses) {
        const item = uploadStatuses[key];
        if (typeof item.url !== "string") {
          return true;
        }
      }
    }

    return false;
  };

  return {
    addPhotos,
    removePhoto,
    photos,
    getPhotoURL,
    uploadPhotos,
    uploadStatuses,
    retryUploadPhoto,
    retryUploadPhotos,
    checkUploadError,
    loading: isLoading(),
  };
}
