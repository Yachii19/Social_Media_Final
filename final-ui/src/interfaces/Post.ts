export interface Post {
  id: number;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostData {
  content: string;
  imageFile?: File;
  videoFile?: File;
  imageUrl?: string;
  videoUrl?: string;
}

export interface UpdatePostData {
  content: string;
  imageFile?: File;
  videoFile?: File;
  imageUrl?: string;
  videoUrl?: string;
  removeImage?: boolean;
  removeVideo?: boolean;
}