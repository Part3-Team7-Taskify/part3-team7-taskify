import { useState } from 'react';
import { apiClient } from '@/api/auth/apiClient';

export const useImageUpload = (columnId: number) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await apiClient.post<{ url: string }>('/columns/${columnId}/card-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.url;
  };

  const handleFileChange = async (file: File | null) => {
    if (!file) return;
    try {
      const url = await uploadImage(file);
      setImageUrl(url);
    } catch (err) {
      console.error('이미지 업로드 실패:', err);
      setImageUrl(null);
    }
  };
  return { imageUrl, handleFileChange };
};
