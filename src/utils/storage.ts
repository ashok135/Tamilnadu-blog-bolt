import { supabase } from '../lib/supabase';
import { BlogPost, BlogCategory } from '../types/blog';

const USER_KEY = 'tngovt_user';

// Blog functions using Supabase
export const getBlogs = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      category: post.category,
      imageUrl: post.image_url,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
    }));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

export const getBlogsByCategory = async (category: BlogCategory): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      category: post.category,
      imageUrl: post.image_url,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
    }));
  } catch (error) {
    console.error('Error fetching blogs by category:', error);
    return [];
  }
};

export const addBlog = async (blog: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title: blog.title,
        content: blog.content,
        category: blog.category,
        image_url: blog.imageUrl,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      content: data.content,
      category: data.category,
      imageUrl: data.image_url,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('Error adding blog:', error);
    return null;
  }
};

export const updateBlog = async (id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        ...(updates.title && { title: updates.title }),
        ...(updates.content && { content: updates.content }),
        ...(updates.category && { category: updates.category }),
        ...(updates.imageUrl !== undefined && { image_url: updates.imageUrl }),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      content: data.content,
      category: data.category,
      imageUrl: data.image_url,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('Error updating blog:', error);
    return null;
  }
};

export const deleteBlog = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting blog:', error);
    return false;
  }
};

// Authentication functions (keeping localStorage for simplicity)
export const isAuthenticated = (): boolean => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user).isAuthenticated : false;
};

export const login = (username: string, password: string): boolean => {
  if (username === 'admin' && password === 'admin123') {
    localStorage.setItem(USER_KEY, JSON.stringify({
      username,
      isAuthenticated: true,
    }));
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem(USER_KEY);
};

// Initialize with sample blogs if none exist
export const initializeSampleBlogs = async (): Promise<void> => {
  try {
    const existingBlogs = await getBlogs();
    if (existingBlogs.length === 0) {
      const sampleBlogs: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>[] = [
        {
          title: 'மாநில மாநாடு 2025 - சென்னையில் நடைபெறும்',
          content: 'தமிழ்நாடு அரசு கிராம உதவியாளர்கள் மாநில சங்கத்தின் வருடாந்திர மாநில மாநாடு 2025 டிசம்பர் 15ம் தேதி சென்னையில் நடைபெறவுள்ளது. இந்த மாநாட்டில் அனைத்து மாவட்ட சங்க பிரதிநிதிகளும் கலந்து கொள்வார்கள்.',
          category: 'events',
          imageUrl: 'https://images.pexels.com/photos/8815016/pexels-photo-8815016.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          title: 'மாவட்ட சங்க தேர்தல் அறிவிப்பு - ஆகஸ்ட் 30, 2025',
          content: 'அனைத்து மாவட்ட சங்கங்களுக்கும் தேர்தல் ஆகஸ்ட் 30, 2025 அன்று நடைபெறும். தேர்தலில் போட்டியிட விரும்பும் உறுப்பினர்கள் ஆகஸ்ட் 15க்குள் நாமினேஷன் பேப்பர் சமர்ப்பிக்க வேண்டும்.',
          category: 'elections',
          imageUrl: 'https://images.pexels.com/photos/6177607/pexels-photo-6177607.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          title: 'புதிய சம்பள கட்டமைப்பு அமலாக்கம்',
          content: 'தமிழ்நாடு அரசு கிராம உதவியாளர்களுக்கான புதிய சம்பள கட்டமைப்பு ஜனவரி 2025 முதல் அமலுக்கு வந்துள்ளது. இதன் மூலம் கிராம உதவியாளர்களின் அடிப்படை சம்பளம் 15% உயர்த்தப்பட்டுள்ளது.',
          category: 'government-orders',
          imageUrl: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          title: 'கிராம உதவியாளர்களுக்கான பயிற்சி திட்டம்',
          content: 'மாநில அரசின் சார்பில் கிராம உதவியாளர்களுக்கான சிறப்பு பயிற்சி திட்டம் ஏற்பாடு செய்யப்பட்டுள்ளது. இந்த பயிற்சியில் நவீன தொழில்நுட்பம், கணினி பயன்பாடு, ஆன்லைன் சேவைகள் போன்றவை கற்றுக் கொடுக்கப்படும்.',
          category: 'training',
          imageUrl: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          title: 'உறுப்பினர் நலன் திட்டம் அறிமுகம்',
          content: 'கிராம உதவியாளர்கள் மற்றும் அவர்களது குடும்பத்தினருக்கான சிறப்பு நலன் திட்டம் அறிமுகப்படுத்தப்பட்டுள்ளது. இந்த திட்டத்தின் கீழ் மருத்துவ உதவி, கல்வி உதவி, திருமண உதவி போன்றவை வழங்கப்படும்.',
          category: 'welfare',
          imageUrl: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          title: 'டிஜிட்டல் இந்தியா திட்டத்தில் பங்கேற்பு',
          content: 'மத்திய அரசின் டிஜிட்டல் இந்தியா திட்டத்தில் கிராம உதவியாளர்கள் முக்கிய பங்கு வகிக்கின்றனர். கிராமப்புற மக்களுக்கு ஆன்லைன் சேவைகளை வழங்குவதில் கிராம உதவியாளர்கள் முன்னணியில் உள்ளனர்.',
          category: 'news',
          imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800'
        }
      ];

      for (const blog of sampleBlogs) {
        await addBlog(blog);
      }
    }
  } catch (error) {
    console.error('Error initializing sample blogs:', error);
  }
};