import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { FaArrowRight, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem;
  direction: rtl;
  min-height: 80vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #8B0000;
`;

const Title = styled.h1`
  color: #8B0000;
  font-size: 2rem;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #666;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.3s;

  &:hover {
    background: #555;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #8B0000;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;

  &:hover {
    background: #3f0101;
  }
`;

const NewsList = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const NewsItem = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 150px 1fr auto;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NewsImage = styled.img`
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const NewsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NewsTitle = styled.h3`
  color: #333;
  font-size: 1.2rem;
`;

const NewsDate = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const NewsDescription = styled.p`
  color: #555;
  line-height: 1.6;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ActionButton = styled.button<{ variant?: 'edit' | 'delete' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: opacity 0.3s;

  ${({ variant }) => variant === 'edit' ? `
    background: #4CAF50;
    color: white;
    &:hover { opacity: 0.8; }
  ` : `
    background: #f44336;
    color: white;
    &:hover { opacity: 0.8; }
  `}
`;

const Modal = styled.div<{ show: boolean }>`
  display: ${({ show }) => show ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalTitle = styled.h2`
  color: #8B0000;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #333;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #8B0000;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #8B0000;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: opacity 0.3s;

  ${({ variant }) => variant === 'secondary' ? `
    background: #666;
    color: white;
    &:hover { opacity: 0.8; }
  ` : `
    background: #8B0000;
    color: white;
    &:hover { opacity: 0.8; }
  `}
`;

interface NewsItemType {
    id: string;
    title: string;
    date: string;
    description: string;
    image: string;
}

const ManageNews: React.FC = () => {
    const [news, setNews] = useState<NewsItemType[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingNews, setEditingNews] = useState<NewsItemType | null>(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        description: '',
        image: ''
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'news'));
            const newsData: NewsItemType[] = [];
            querySnapshot.forEach((doc) => {
                newsData.push({ id: doc.id, ...doc.data() } as NewsItemType);
            });
            setNews(newsData);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = formData.image;

            // Upload image if a new file is selected
            if (imageFile) {
                const imageRef = ref(storage, `news/${Date.now()}_${imageFile.name}`);
                await uploadBytes(imageRef, imageFile);
                imageUrl = await getDownloadURL(imageRef);
            }

            const newsData = {
                ...formData,
                image: imageUrl,
                updatedAt: Timestamp.now()
            };

            if (editingNews) {
                // Update existing news
                await updateDoc(doc(db, 'news', editingNews.id), newsData);
            } else {
                // Add new news
                await addDoc(collection(db, 'news'), {
                    ...newsData,
                    createdAt: Timestamp.now()
                });
            }

            setShowModal(false);
            setEditingNews(null);
            setFormData({ title: '', date: '', description: '', image: '' });
            setImageFile(null);
            fetchNews();
        } catch (error) {
            console.error('Error saving news:', error);
            alert('حدث خطأ أثناء حفظ الخبر');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (newsItem: NewsItemType) => {
        setEditingNews(newsItem);
        setFormData({
            title: newsItem.title,
            date: newsItem.date,
            description: newsItem.description,
            image: newsItem.image
        });
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذا الخبر؟')) {
            try {
                await deleteDoc(doc(db, 'news', id));
                fetchNews();
            } catch (error) {
                console.error('Error deleting news:', error);
                alert('حدث خطأ أثناء حذف الخبر');
            }
        }
    };

    const handleAddNew = () => {
        setEditingNews(null);
        setFormData({ title: '', date: '', description: '', image: '' });
        setImageFile(null);
        setShowModal(true);
    };

    return (
        <Container>
            <Header>
                <Title>إدارة الأخبار</Title>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <AddButton onClick={handleAddNew}>
                        <FaPlus />
                        إضافة خبر جديد
                    </AddButton>
                    <BackButton to="/admin/dashboard">
                        <FaArrowRight />
                        العودة
                    </BackButton>
                </div>
            </Header>

            <NewsList>
                {news.map((item) => (
                    <NewsItem key={item.id}>
                        <NewsImage src={item.image} alt={item.title} />
                        <NewsInfo>
                            <NewsTitle>{item.title}</NewsTitle>
                            <NewsDate>{item.date}</NewsDate>
                            <NewsDescription>{item.description}</NewsDescription>
                        </NewsInfo>
                        <Actions>
                            <ActionButton variant="edit" onClick={() => handleEdit(item)}>
                                <FaEdit />
                                تعديل
                            </ActionButton>
                            <ActionButton variant="delete" onClick={() => handleDelete(item.id)}>
                                <FaTrash />
                                حذف
                            </ActionButton>
                        </Actions>
                    </NewsItem>
                ))}
            </NewsList>

            <Modal show={showModal}>
                <ModalContent>
                    <ModalTitle>{editingNews ? 'تعديل الخبر' : 'إضافة خبر جديد'}</ModalTitle>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label>العنوان</Label>
                            <Input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>التاريخ</Label>
                            <Input
                                type="text"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                required
                                placeholder="مثال: ٢٦ يناير ٢٠٢٥"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>الوصف</Label>
                            <TextArea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>الصورة</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                            />
                            {formData.image && !imageFile && (
                                <img src={formData.image} alt="Preview" style={{ width: '100px', marginTop: '0.5rem' }} />
                            )}
                        </FormGroup>
                        <ButtonGroup>
                            <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                                إلغاء
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? 'جاري الحفظ...' : 'حفظ'}
                            </Button>
                        </ButtonGroup>
                    </Form>
                </ModalContent>
            </Modal>
        </Container>
    );
};

export default ManageNews;
