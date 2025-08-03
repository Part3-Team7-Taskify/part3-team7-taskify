import { useState, useCallback } from 'react';
import { apiClient } from '@/api/auth/apiClient';

export const useImageUpload = (columnId: number) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await apiClient.post<{ imageUrl: string }>(
      `/columns/${columnId}/card-image`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return res.data.imageUrl;
  };

  const handleFileChange = useCallback(
    async (file: File | null) => {
      if (!file) {
        setImageUrl(null);
        return;
      }

      try {
        setIsUploading(true);
        console.log('🔄 이미지 업로드 시작...');

        const url = await uploadImage(file);

        // 업로드 완료 후 상태 업데이트
        setImageUrl(url);
        console.log('✅ 이미지 업로드 완료:', url);
      } catch (err) {
        console.error('❌ 이미지 업로드 실패:', err);
        setImageUrl(null);
        // 사용자에게 피드백 제공
        alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      } finally {
        // 성공/실패 관계없이 업로드 상태 해제
        setIsUploading(false);
        console.log('📝 업로드 상태 초기화');
      }
    },
    [columnId],
  );

  // 이미지 제거 함수 추가
  const removeImage = useCallback(() => {
    setImageUrl(null);
  }, []);

  // 업로드 상태 체크 함수 추가
  const isUploadComplete = useCallback(() => {
    return !isUploading && imageUrl !== null;
  }, [isUploading, imageUrl]);

  return {
    imageUrl,
    handleFileChange,
    isUploading,
    removeImage,
    isUploadComplete,
  };
};
