import { BlogPost } from '../types/blog';

const BLOGS_KEY = 'tngovt_blogs';
const USER_KEY = 'tngovt_user';

export const getBlogs = (): BlogPost[] => {
  const blogs = localStorage.getItem(BLOGS_KEY);
  return blogs ? JSON.parse(blogs) : [];
};

export const saveBlogs = (blogs: BlogPost[]): void => {
  localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
};

export const addBlog = (blog: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): BlogPost => {
  const blogs = getBlogs();
  const newBlog: BlogPost = {
    ...blog,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  blogs.unshift(newBlog);
  saveBlogs(blogs);
  return newBlog;
};

export const updateBlog = (id: string, updates: Partial<BlogPost>): BlogPost | null => {
  const blogs = getBlogs();
  const index = blogs.findIndex(blog => blog.id === id);
  if (index === -1) return null;
  
  blogs[index] = {
    ...blogs[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveBlogs(blogs);
  return blogs[index];
};

export const deleteBlog = (id: string): boolean => {
  const blogs = getBlogs();
  const filteredBlogs = blogs.filter(blog => blog.id !== id);
  if (filteredBlogs.length === blogs.length) return false;
  saveBlogs(filteredBlogs);
  return true;
};

export const isAuthenticated = (): boolean => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user).isAuthenticated : false;
};

export const login = (username: string, password: string): boolean => {
  // Simple hardcoded credentials for demo
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
export const initializeSampleBlogs = (): void => {
  const existingBlogs = getBlogs();
  if (existingBlogs.length === 0) {
    const sampleBlogs: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        title: 'மாநில மாநாடு 2025 - சென்னையில் நடைபெறும்',
        content: 'தமிழ்நாடு அரசு கிராம உதவியாளர்கள் மாநில சங்கத்தின் வருடாந்திர மாநில மாநாடு 2025 டிசம்பர் 15ம் தேதி சென்னையில் நடைபெறவுள்ளது. இந்த மாநாட்டில் அனைத்து மாவட்ட சங்க பிரதிநிதிகளும் கலந்து கொள்வார்கள். மாநாட்டில் கிராம உதவியாளர்களின் சம்பள உயர்வு, பணி நிலைமைகள் மேம்பாடு, ஓய்வூதிய திட்டம் போன்ற முக்கிய விஷயங்கள் விவாதிக்கப்படும். மாநாட்டில் கலந்து கொள்ள விரும்பும் உறுப்பினர்கள் தங்கள் மாவட்ட சங்க செயலாளரை தொடர்பு கொள்ளவும்.',
        imageUrl: 'https://images.pexels.com/photos/8815016/pexels-photo-8815016.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        title: 'மாவட்ட சங்க தேர்தல் அறிவிப்பு - ஆகஸ்ட் 30, 2025',
        content: 'அனைத்து மாவட்ட சங்கங்களுக்கும் தேர்தல் ஆகஸ்ட் 30, 2025 அன்று நடைபெறும். தேர்தலில் போட்டியிட விரும்பும் உறுப்பினர்கள் ஆகஸ்ட் 15க்குள் நாமினேஷன் பேப்பர் சமர்ப்பிக்க வேண்டும். தேர்தல் நடைமுறைகள் மற்றும் விதிமுறைகள் குறித்த விரிவான தகவல்களுக்கு மாநில சங்க அலுவலகத்தை தொடர்பு கொள்ளவும். அனைத்து உறுப்பினர்களும் தேர்தலில் கட்டாயம் பங்கேற்க வேண்டுகிறோம்.',
        imageUrl: 'https://images.pexels.com/photos/6177607/pexels-photo-6177607.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        title: 'புதிய சம்பள கட்டமைப்பு அமலாக்கம்',
        content: 'தமிழ்நாடு அரசு கிராம உதவியாளர்களுக்கான புதிய சம்பள கட்டமைப்பு ஜனவரி 2025 முதல் அமலுக்கு வந்துள்ளது. இதன் மூலம் கிராம உதவியாளர்களின் அடிப்படை சம்பளம் 15% உயர்த்தப்பட்டுள்ளது. மேலும் DA, HRA போன்ற படிகளிலும் கணிசமான உயர்வு வழங்கப்பட்டுள்ளது. புதிய சம்பள கட்டமைப்பின் முழு விவரங்களையும் அறிய மாவட்ட சங்க அலுவலகத்தை தொடர்பு கொள்ளவும்.',
        imageUrl: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        title: 'கிராம உதவியாளர்களுக்கான பயிற்சி திட்டம்',
        content: 'மாநில அரசின் சார்பில் கிராம உதவியாளர்களுக்கான சிறப்பு பயிற்சி திட்டம் ஏற்பாடு செய்யப்பட்டுள்ளது. இந்த பயிற்சியில் நவீன தொழில்நுட்பம், கணினி பயன்பாடு, ஆன்லைன் சேவைகள் போன்றவை கற்றுக் கொடுக்கப்படும். பயிற்சியில் கலந்து கொள்ள விரும்பும் உறுப்பினர்கள் தங்கள் விண்ணப்பத்தை சமர்ப்பிக்கவும். பயிற்சி முடிவில் சான்றிதழ் வழங்கப்படும்.',
        imageUrl: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        title: 'உறுப்பினர் நலன் திட்டம் அறிமுகம்',
        content: 'கிராம உதவியாளர்கள் மற்றும் அவர்களது குடும்பத்தினருக்கான சிறப்பு நலன் திட்டம் அறிமுகப்படுத்தப்பட்டுள்ளது. இந்த திட்டத்தின் கீழ் மருத்துவ உதவி, கல்வி உதவி, திருமண உதவி போன்றவை வழங்கப்படும். திட்டத்தில் சேர விரும்பும் உறுப்பினர்கள் மாதம் ரூ.100 பங்களிப்பு செலுத்த வேண்டும். மேலும் விவரங்களுக்கு சங்க அலுவலகத்தை தொடர்பு கொள்ளவும்.',
        imageUrl: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        title: 'டிஜிட்டல் இந்தியா திட்டத்தில் பங்கேற்பு',
        content: 'மத்திய அரசின் டிஜிட்டல் இந்தியா திட்டத்தில் கிராம உதவியாளர்கள் முக்கிய பங்கு வகிக்கின்றனர். கிராமப்புற மக்களுக்கு ஆன்லைன் சேவைகளை வழங்குவதில் கிராம உதவியாளர்கள் முன்னணியில் உள்ளனர். இதற்காக சிறப்பு பயிற்சி வகுப்புகள் ஏற்பாடு செய்யப்பட்டுள்ளன. டிஜிட்டல் சேவைகள் குறித்த விழிப்புணர்வு நிகழ்ச்சிகளும் நடத்தப்படும்.',
        imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ];

    sampleBlogs.forEach(blog => addBlog(blog));
  }
};