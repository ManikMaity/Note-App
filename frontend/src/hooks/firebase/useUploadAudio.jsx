
import { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '@/config/firebase.config';

const useUploadAudio = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const uploadAudio = async (blob) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const storage = getStorage(app);
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).slice(2);
      const fileExtension = blob.type.split('/')[1] || 'webm';
      const storageRef = ref(storage, `audios/audio_${timestamp}_${randomString}.${fileExtension}`);

      await uploadBytes(storageRef, blob);
      
      const downloadURL = await getDownloadURL(storageRef);
      
      setIsSuccess(true);
      return downloadURL;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload audio';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadAudio,
    isLoading,
    error,
    isSuccess,
    isError: !!error,
  };
};

export default useUploadAudio;
