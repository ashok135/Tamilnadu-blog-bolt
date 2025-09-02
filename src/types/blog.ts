export interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export const BLOG_CATEGORIES = [
  'general',
  'announcements',
  'elections',
  'training',
  'welfare',
  'government-orders',
  'events',
  'news'
] as const;

export type BlogCategory = typeof BLOG_CATEGORIES[number];

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
  general: 'பொதுவானது',
  announcements: 'அறிவிப்புகள்',
  elections: 'தேர்தல்கள்',
  training: 'பயிற்சிகள்',
  welfare: 'நலன்புரி',
  'government-orders': 'அரசாணைகள்',
  events: 'நிகழ்வுகள்',
  news: 'செய்திகள்'
};