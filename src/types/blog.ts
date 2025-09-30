export interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: 'blog' | 'event';
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export const BLOG_CATEGORIES = ['blog', 'event'] as const;

export type BlogCategory = 'blog' | 'event';

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
  blog: 'பதிவுகள்',
  event: 'நிகழ்வுகள்'
};