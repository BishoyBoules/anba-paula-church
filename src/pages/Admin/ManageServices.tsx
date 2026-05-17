import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  getChurchServices, createChurchService, updateChurchService, deleteChurchService,
  uploadImage, ChurchService
} from '../../services/api';
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

const ItemList = styled.div`
  display: grid;
  gap: 1.25rem;
  margin-top: 1.5rem;
`;

const ItemCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: start;
`;

const ItemName = styled.h3`
  color: #8B0000;
  margin-bottom: 0.3rem;
`;

const ItemSlug = styled.code`
  font-size: 0.85rem;
  color: #999;
  background: #f5f5f5;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
`;

const ItemMeta = styled.p`
  color: #555;
  font-size: 0.9rem;
  margin-top: 0.3rem;
`;

const Actions = styled.div`
  display: flex;
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
  max-width: 640px;
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
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

type FormData = Omit<ChurchService, 'id'>;
const empty: FormData = { slug: '', name: '', description: '', bannerImage: '', schedule: '', supervisor: '', extraContent: '', displayOrder: 1, active: true };

const ManageServices: React.FC = () => {
  const [services, setServices] = useState<ChurchService[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<ChurchService | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState<FormData>(empty);

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = () =>
    getChurchServices().then(res => setServices(res.data)).catch(() => {});

  const openAdd = () => {
    setEditing(null);
    setForm({ ...empty, displayOrder: services.length + 1 });
    setImageFile(null);
    setShowModal(true);
  };

  const openEdit = (s: ChurchService) => {
    setEditing(s);
    setForm({ slug: s.slug, name: s.name, description: s.description, bannerImage: s.bannerImage, schedule: s.schedule, supervisor: s.supervisor, extraContent: s.extraContent, displayOrder: s.displayOrder, active: s.active });
    setImageFile(null);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let bannerImage = form.bannerImage;
      if (imageFile) bannerImage = await uploadImage(imageFile);
      const payload = { ...form, bannerImage };
      if (editing) {
        await updateChurchService(editing.id, payload);
      } else {
        await createChurchService(payload);
      }
      setShowModal(false);
      fetchServices();
    } catch {
      alert('حدث خطأ أثناء الحفظ');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
    try {
      await deleteChurchService(id);
      fetchServices();
    } catch {
      alert('حدث خطأ أثناء الحذف');
    }
  };

  return (
    <Container>
      <Header>
        <Title>إدارة الخدمات</Title>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <AddButton onClick={openAdd}><FaPlus /> إضافة خدمة</AddButton>
          <BackButton to="/admin/dashboard"><FaArrowRight /> العودة</BackButton>
        </div>
      </Header>

      <ItemList>
        {services.map(s => (
          <ItemCard key={s.id}>
            <div>
              <ItemName>{s.name} <ItemSlug>{s.slug}</ItemSlug></ItemName>
              {s.schedule && <ItemMeta>الموعد: {s.schedule}</ItemMeta>}
              {s.supervisor && <ItemMeta>الإشراف: {s.supervisor}</ItemMeta>}
            </div>
            <Actions>
              <ActionButton color="#4CAF50" onClick={() => openEdit(s)}><FaEdit /> تعديل</ActionButton>
              <ActionButton color="#f44336" onClick={() => handleDelete(s.id)}><FaTrash /> حذف</ActionButton>
            </Actions>
          </ItemCard>
        ))}
      </ItemList>

      <Modal $show={showModal}>
        <ModalContent>
          <ModalTitle>{editing ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}</ModalTitle>
          <Form onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <Label>الاسم</Label>
                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </FormGroup>
              <FormGroup>
                <Label>المعرف (slug)</Label>
                <Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="youth" required />
              </FormGroup>
            </FormRow>
            <FormGroup>
              <Label>الموعد</Label>
              <Input value={form.schedule} onChange={e => setForm({ ...form, schedule: e.target.value })} />
            </FormGroup>
            <FormGroup>
              <Label>الإشراف</Label>
              <Input value={form.supervisor} onChange={e => setForm({ ...form, supervisor: e.target.value })} />
            </FormGroup>
            <FormGroup>
              <Label>الوصف</Label>
              <TextArea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </FormGroup>
            <FormGroup>
              <Label>محتوى إضافي</Label>
              <TextArea value={form.extraContent} onChange={e => setForm({ ...form, extraContent: e.target.value })} />
            </FormGroup>
            <FormRow>
              <FormGroup>
                <Label>ترتيب العرض</Label>
                <Input type="number" value={form.displayOrder} onChange={e => setForm({ ...form, displayOrder: +e.target.value })} />
              </FormGroup>
              <FormGroup style={{ justifyContent: 'flex-end', paddingBottom: '0.25rem' }}>
                <CheckboxLabel>
                  <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
                  نشط
                </CheckboxLabel>
              </FormGroup>
            </FormRow>
            <FormGroup>
              <Label>صورة البانر</Label>
              <Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
              {form.bannerImage && !imageFile && <img src={form.bannerImage} alt="preview" style={{ width: '100px', marginTop: '0.5rem' }} />}
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

export default ManageServices;
