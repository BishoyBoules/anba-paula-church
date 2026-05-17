import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getAlbumPhotos, createAlbumPhoto, updateAlbumPhoto, deleteAlbumPhoto, uploadImage, AlbumPhoto } from '../../services/api';
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
  &:hover { background: #555; }
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
  &:hover { background: #3f0101; }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const FilterBtn = styled.button<{ active: boolean }>`
  padding: 0.4rem 1rem;
  border: 2px solid #8B0000;
  border-radius: 20px;
  background: ${p => p.active ? '#8B0000' : 'white'};
  color: ${p => p.active ? 'white' : '#8B0000'};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
  &:hover { background: #8B0000; color: white; }
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.25rem;
`;

const PhotoCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
`;

const PhotoImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const PhotoInfo = styled.div`
  padding: 0.75rem;
`;

const PhotoTitle = styled.p`
  color: #333;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const PhotoCategory = styled.span`
  font-size: 0.8rem;
  color: #8B0000;
  background: #fff0f0;
  padding: 0.1rem 0.4rem;
  border-radius: 10px;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0 0.75rem 0.75rem;
`;

const ActionButton = styled.button<{ color?: string }>`
  flex: 1;
  padding: 0.35rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  background: ${p => p.color || '#8B0000'};
  color: white;
  transition: opacity 0.3s;
  &:hover { opacity: 0.8; }
`;

const Modal = styled.div<{ $show: boolean }>`
  display: ${p => p.$show ? 'flex' : 'none'};
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  max-width: 480px;
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
  gap: 1.25rem;
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
  font-family: inherit;
  &:focus { outline: none; border-color: #8B0000; }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Button = styled.button<{ variant?: 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: opacity 0.3s;
  background: ${p => p.variant === 'secondary' ? '#666' : '#8B0000'};
  color: white;
  &:hover { opacity: 0.8; }
`;

const Empty = styled.p`
  text-align: center;
  color: #999;
  padding: 3rem;
`;

type FormData = { image: string; title: string; category: string; displayOrder: number };

const ManageAlbum: React.FC = () => {
  const [photos, setPhotos] = useState<AlbumPhoto[]>([]);
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [categories, setCategories] = useState<string[]>(['الكل']);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<AlbumPhoto | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState<FormData>({ image: '', title: '', category: '', displayOrder: 1 });

  useEffect(() => { fetchPhotos(); }, []);

  const fetchPhotos = () =>
    getAlbumPhotos()
      .then(res => {
        setPhotos(res.data);
        const cats = Array.from(new Set(res.data.map(p => p.category).filter(Boolean)));
        setCategories(['الكل', ...cats]);
      })
      .catch(() => {});

  const displayed = activeFilter === 'الكل' ? photos : photos.filter(p => p.category === activeFilter);

  const openAdd = () => {
    setEditing(null);
    setForm({ image: '', title: '', category: '', displayOrder: photos.length + 1 });
    setImageFile(null);
    setShowModal(true);
  };

  const openEdit = (p: AlbumPhoto) => {
    setEditing(p);
    setForm({ image: p.image, title: p.title, category: p.category, displayOrder: p.displayOrder });
    setImageFile(null);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let image = form.image;
      if (imageFile) image = await uploadImage(imageFile);
      const payload = { ...form, image };
      if (editing) {
        await updateAlbumPhoto(editing.id, payload);
      } else {
        await createAlbumPhoto(payload);
      }
      setShowModal(false);
      fetchPhotos();
    } catch {
      alert('حدث خطأ أثناء الحفظ');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه الصورة؟')) return;
    try {
      await deleteAlbumPhoto(id);
      fetchPhotos();
    } catch {
      alert('حدث خطأ أثناء الحذف');
    }
  };

  return (
    <Container>
      <Header>
        <Title>إدارة ألبوم الصور</Title>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <AddButton onClick={openAdd}><FaPlus /> إضافة صورة</AddButton>
          <BackButton to="/admin/dashboard"><FaArrowRight /> العودة</BackButton>
        </div>
      </Header>

      {categories.length > 1 && (
        <FilterRow>
          {categories.map(cat => (
            <FilterBtn key={cat} active={activeFilter === cat} onClick={() => setActiveFilter(cat)}>{cat}</FilterBtn>
          ))}
        </FilterRow>
      )}

      {displayed.length === 0 ? <Empty>لا توجد صور</Empty> : (
        <PhotoGrid>
          {displayed.map(photo => (
            <PhotoCard key={photo.id}>
              <PhotoImage src={photo.image} alt={photo.title} />
              <PhotoInfo>
                {photo.title && <PhotoTitle>{photo.title}</PhotoTitle>}
                {photo.category && <PhotoCategory>{photo.category}</PhotoCategory>}
              </PhotoInfo>
              <Actions>
                <ActionButton color="#4CAF50" onClick={() => openEdit(photo)}><FaEdit /> تعديل</ActionButton>
                <ActionButton color="#f44336" onClick={() => handleDelete(photo.id)}><FaTrash /> حذف</ActionButton>
              </Actions>
            </PhotoCard>
          ))}
        </PhotoGrid>
      )}

      <Modal $show={showModal}>
        <ModalContent>
          <ModalTitle>{editing ? 'تعديل الصورة' : 'إضافة صورة جديدة'}</ModalTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>الصورة</Label>
              <Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
              {form.image && !imageFile && <img src={form.image} alt="preview" style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '6px', marginTop: '0.5rem' }} />}
            </FormGroup>
            <FormGroup>
              <Label>العنوان (اختياري)</Label>
              <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </FormGroup>
            <FormGroup>
              <Label>التصنيف</Label>
              <Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="مثال: مناسبات، أعياد، بناء الكنيسة" />
            </FormGroup>
            <FormGroup>
              <Label>ترتيب العرض</Label>
              <Input type="number" value={form.displayOrder} onChange={e => setForm({ ...form, displayOrder: +e.target.value })} />
            </FormGroup>
            <ButtonGroup>
              <Button variant="secondary" type="button" onClick={() => setShowModal(false)}>إلغاء</Button>
              <Button type="submit" disabled={loading}>{loading ? 'جاري الرفع...' : 'حفظ'}</Button>
            </ButtonGroup>
          </Form>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ManageAlbum;
