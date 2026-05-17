import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- Auth ---
export const login = (email: string, password: string) =>
  api.post<{ token: string; email: string }>('/api/auth/login', { email, password });

// --- News ---
export interface NewsItem {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
}
export const getNews = () => api.get<NewsItem[]>('/api/news');
export const createNews = (data: Omit<NewsItem, 'id'>) => api.post<NewsItem>('/api/news', data);
export const updateNews = (id: number, data: Omit<NewsItem, 'id'>) => api.put<NewsItem>(`/api/news/${id}`, data);
export const deleteNews = (id: number) => api.delete(`/api/news/${id}`);

// --- Fathers ---
export interface ScheduleItem {
  day: string;
  time: string;
  location?: string;
  meetingType?: string;
  service?: string;
}
export interface Father {
  id: number;
  name: string;
  image: string;
  confessionTimes?: ScheduleItem[];
  meetings?: ScheduleItem[];
  availability?: ScheduleItem[];
}
export const getFathers = () => api.get<Father[]>('/api/fathers');
export const getFatherById = (id: string | number) => api.get<Father>(`/api/fathers/${id}`);
export const createFather = (data: { name: string; image: string }) => api.post<Father>('/api/fathers', data);
export const updateFather = (id: number, data: { name: string; image?: string }) => api.put<Father>(`/api/fathers/${id}`, data);
export const deleteFather = (id: number) => api.delete(`/api/fathers/${id}`);
export const updateFatherSchedules = (
  id: number,
  schedules: { confessionTimes: ScheduleItem[]; meetings: ScheduleItem[]; availability: ScheduleItem[] }
) => api.put<Father>(`/api/fathers/${id}/schedules`, schedules);

// --- Site Settings ---
export const getSettings = () => api.get<Record<string, string>>('/api/settings');
export const saveSettings = (data: Record<string, string>) => api.put<Record<string, string>>('/api/settings', data);

// --- Ticker ---
export interface TickerItem {
  id: number;
  content: string;
  displayOrder: number;
  active: boolean;
}
export const getTicker = () => api.get<TickerItem[]>('/api/ticker');
export const getAllTicker = () => api.get<TickerItem[]>('/api/ticker/all');
export const createTicker = (data: Omit<TickerItem, 'id'>) => api.post<TickerItem>('/api/ticker', data);
export const updateTicker = (id: number, data: Omit<TickerItem, 'id'>) => api.put<TickerItem>(`/api/ticker/${id}`, data);
export const deleteTicker = (id: number) => api.delete(`/api/ticker/${id}`);

// --- Church Services ---
export interface ChurchService {
  id: number;
  slug: string;
  name: string;
  description: string;
  bannerImage: string;
  schedule: string;
  supervisor: string;
  extraContent: string;
  displayOrder: number;
  active: boolean;
}
export const getChurchServices = () => api.get<ChurchService[]>('/api/services');
export const getChurchServiceBySlug = (slug: string) => api.get<ChurchService>(`/api/services/${slug}`);
export const createChurchService = (data: Omit<ChurchService, 'id'>) => api.post<ChurchService>('/api/services', data);
export const updateChurchService = (id: number, data: Omit<ChurchService, 'id'>) => api.put<ChurchService>(`/api/services/${id}`, data);
export const deleteChurchService = (id: number) => api.delete(`/api/services/${id}`);

// --- Mass Schedules ---
export interface MassSchedule {
  id: number;
  day: string;
  time: string;
  displayOrder: number;
  active: boolean;
}
export const getMassSchedules = () => api.get<MassSchedule[]>('/api/mass-schedules');
export const getAllMassSchedules = () => api.get<MassSchedule[]>('/api/mass-schedules/all');
export const createMassSchedule = (data: Omit<MassSchedule, 'id'>) => api.post<MassSchedule>('/api/mass-schedules', data);
export const updateMassSchedule = (id: number, data: Omit<MassSchedule, 'id'>) => api.put<MassSchedule>(`/api/mass-schedules/${id}`, data);
export const deleteMassSchedule = (id: number) => api.delete(`/api/mass-schedules/${id}`);

// --- Council Members ---
export interface CouncilMember {
  id: number;
  name: string;
  role: string;
  image: string;
  displayOrder: number;
}
export const getCouncilMembers = () => api.get<CouncilMember[]>('/api/council');
export const createCouncilMember = (data: Omit<CouncilMember, 'id'>) => api.post<CouncilMember>('/api/council', data);
export const updateCouncilMember = (id: number, data: Omit<CouncilMember, 'id'>) => api.put<CouncilMember>(`/api/council/${id}`, data);
export const deleteCouncilMember = (id: number) => api.delete(`/api/council/${id}`);

// --- Events ---
export interface ChurchEvent {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  eventType: string;
}
export const getEvents = (type?: string) =>
  api.get<ChurchEvent[]>('/api/events', { params: type ? { type } : {} });
export const createEvent = (data: Omit<ChurchEvent, 'id'>) => api.post<ChurchEvent>('/api/events', data);
export const updateEvent = (id: number, data: Omit<ChurchEvent, 'id'>) => api.put<ChurchEvent>(`/api/events/${id}`, data);
export const deleteEvent = (id: number) => api.delete(`/api/events/${id}`);

// --- Album ---
export interface AlbumPhoto {
  id: number;
  image: string;
  title: string;
  category: string;
  displayOrder: number;
}
export const getAlbumPhotos = (category?: string) =>
  api.get<AlbumPhoto[]>('/api/album', { params: category ? { category } : {} });
export const createAlbumPhoto = (data: Omit<AlbumPhoto, 'id'>) => api.post<AlbumPhoto>('/api/album', data);
export const updateAlbumPhoto = (id: number, data: Omit<AlbumPhoto, 'id'>) => api.put<AlbumPhoto>(`/api/album/${id}`, data);
export const deleteAlbumPhoto = (id: number) => api.delete(`/api/album/${id}`);

// --- Upload ---
export const uploadImage = async (file: File): Promise<string> => {
  const form = new FormData();
  form.append('file', file);
  const res = await api.post<{ url: string }>('/api/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return BASE_URL + res.data.url;
};

export default api;
