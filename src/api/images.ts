import { api } from 'api';

/**
 * 아바타 이미지 업로드
 */
interface IUploadImageRes {
  url: string;
}
export const uploadImageForUser = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post<IUploadImageRes>('/images/user', formData);
  return data;
};
