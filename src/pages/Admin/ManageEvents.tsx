import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getEvents, createEvent, updateEvent, deleteEvent, uploadImage, ChurchEvent } from '../../services/api';
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

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.5rem 1.5rem;
  border: 2px solid #8B0000;
  border-radius: 20px;
  background: ${p => p.active ? '#8B0000' : 'white'};
  color: ${p => p.active ? 'white' : '#8B0000'};
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
  &:hover { background: #8B0000; color: white; }
`;

const ItemList = styled.div`
  display: grid;
  gap: 1.25rem;
`;

const ItemCard = styled.div`
  background: white;
  padding: 1.25rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 1rem;
  align-items: center;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ItemImage = styled.img`
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemInfo = styled.div``;

const ItemTitle = styled.h3`
  color: #333;
  margin-bottom: 0.25rem;
`;

const ItemDate = styled.p`
  color: #D4AF37;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const ItemDesc = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const Badge = styled.span<{ type: string }>`
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  background: ${p => p.type === 'NEWS' ? '#E3F2FD' : '#E8F5E9'};
  color: ${p => p.type === 'NEWS' ? '#1565C0' : '#2E7D32'};
  margin-bottom: 0.4rem;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ActionButton = styled.button<{ color?: string }>`
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
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

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  background: white;
  &:focus { outline: none; border-color: #8B0000; }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
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

type FormData = { title: string; date: string; description: string; image: string; eventType: string };

const ManageEvents: React.FC = () => {
  const [items, setItems] = useState<ChurchEvent[]>([]);
  const [tab, setTab] = useState<'ALL' | 'NEWS' | 'EVENT'>('ALL');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<ChurchEvent | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState<FormData>({ title: '', date: '', description: '', image: '', eventType: 'NEWS' });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = () =>
    getEvents().then(res => setItems(res.data)).catch(() => {});

  const displayed = tab === 'ALL' ? items : items.filter(i => i.eventType === tab);

  const openAdd = () => {
    setEditing(null);
    setForm({ title: '', date: '', description: '', image: '', eventType: 'NEWS' });
    setImageFile(null);
    setShowModal(true);
  };

  const openEdit = (item: ChurchEvent) => {
    setEditing(item);
    setForm({ title: item.title, date: item.date, description: item.description, image: item.image, eventType: item.eventType });
    setImageFile(null);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = form.image;
      if (imageFile) imageUrl = await uploadImage(imageFile);
      const payload = { ...form, image: imageUrl };
      if (editing) {
        await updateEvent(editing.id, payload);
      } else {
        await createEvent(payload);
      }
      setShowModal(false);
      fetchItems();
    } catch {
      alert('حدث خطأ أثناء الحفظ');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
    try {
      await deleteEvent(id);
      fetchItems();
    } catch {
      alert('حدث خطأ أثناء الحذف');
    }
  };

  return (
    <Container>
      <Header>
        <Title>إدارة الأخبار والفعاليات</Title>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <AddButton onClick={openAdd}><FaPlus /> إضافة جديد</AddButton>
          <BackButton to="/admin/dashboard"><FaArrowRight /> العودة</BackButton>
        </div>
      </Header>

      <Tabs>
        <Tab active={tab === 'ALL'} onClick={() => setTab('ALL')}>الكل ({items.length})</Tab>
        <Tab active={tab === 'NEWS'} onClick={() => setTab('NEWS')}>أخبار ({items.filter(i => i.eventType === 'NEWS').length})</Tab>
        <Tab active={tab === 'EVENT'} onClick={() => setTab('EVENT')}>فعاليات ({items.filter(i => i.eventType === 'EVENT').length})</Tab>
      </Tabs>

      {displayed.length === 0 ? <Empty>لا توجد عناصر</Empty> : (
        <ItemList>
          {displayed.map(item => (
            <ItemCard key={item.id}>
              {item.image && <ItemImage src={item.image} alt={item.title} />}
              <ItemInfo>
                <Badge type={item.eventType}>{item.eventType === 'NEWS' ? 'خبر' : 'فعالية'}</Badge>
                <ItemTitle>{item.title}</ItemTitle>
                {item.date && <ItemDate>{item.date}</ItemDate>}
                <ItemDesc>{item.description}</ItemDesc>
              </ItemInfo>
              <Actions>
                <ActionButton color="#4CAF50" onClick={() => openEdit(item)}><FaEdit /> تعديل</ActionButton>
                <ActionButton color="#f44336" onClick={() => handleDelete(item.id)}><FaTrash /> حذف</ActionButton>
              </Actions>
            </ItemCard>
          ))}
        </ItemList>
      )}

      <Modal $show={showModal}>
        <ModalContent>
          <ModalTitle>{editing ? 'تعديل العنصر' : 'إضافة جديد'}</ModalTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>النوع</Label>
              <Select value={form.eventType} onChange={e => setForm({ ...form, eventType: e.target.value })}>
                <option value="NEWS">خبر</option>
                <option value="EVENT">فعالية</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>العنوان</Label>
              <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            </FormGroup>
            <FormGroup>
              <Label>التاريخ</Label>
              <Input value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="مثال: ١٠ مايو ٢٠٢٥" />
            </FormGroup>
            <FormGroup>
              <Label>الوصف</Label>
              <TextArea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
            </FormGroup>
            <FormGroup>
              <Label>الصورة</Label>
              <Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
              {form.image && !imageFile && <img src={form.image} alt="preview" style={{ width: '100px', marginTop: '0.5rem' }} />}
            </FormGroup>
            <ButtonGroup>
              <Button variant="secondary" type="button" onClick={() => setShowModal(false)}>إلغاء</Button>
              <Button type="submit" disabled={loading}>{loading ? 'جاري الحفظ...' : 'حفظ'}</Button>
            </ButtonGroup>
          </Form>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ManageEvents;
