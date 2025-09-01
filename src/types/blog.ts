export interface BlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}