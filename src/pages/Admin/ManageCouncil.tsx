import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCouncilMembers, createCouncilMember, updateCouncilMember, deleteCouncilMember, uploadImage, CouncilMember } from '../../services/api';
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const MemberCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
  text-align: center;
`;

const MemberImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const MemberInfo = styled.div`
  padding: 1rem;
`;

const MemberName = styled.h3`
  color: #8B0000;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
`;

const MemberRole = styled.p`
  color: #666;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  padding-bottom: 0.75rem;
`;

const ActionButton = styled.button<{ color?: string }>`
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
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
  max-width: 500px;
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

type FormData = { name: string; role: string; image: string; displayOrder: number };

const ManageCouncil: React.FC = () => {
  const [members, setMembers] = useState<CouncilMember[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<CouncilMember | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState<FormData>({ name: '', role: '', image: '', displayOrder: 1 });

  useEffect(() => { fetchMembers(); }, []);

  const fetchMembers = () =>
    getCouncilMembers().then(res => setMembers(res.data)).catch(() => {});

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', role: '', image: '', displayOrder: members.length + 1 });
    setImageFile(null);
    setShowModal(true);
  };

  const openEdit = (m: CouncilMember) => {
    setEditing(m);
    setForm({ name: m.name, role: m.role, image: m.image, displayOrder: m.displayOrder });
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
        await updateCouncilMember(editing.id, payload);
      } else {
        await createCouncilMember(payload);
      }
      setShowModal(false);
      fetchMembers();
    } catch {
      alert('حدث خطأ أثناء الحفظ');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
    try {
      await deleteCouncilMember(id);
      fetchMembers();
    } catch {
      alert('حدث خطأ أثناء الحذف');
    }
  };

  return (
    <Container>
      <Header>
        <Title>إدارة مجلس الكنيسة</Title>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <AddButton onClick={openAdd}><FaPlus /> إضافة عضو</AddButton>
          <BackButton to="/admin/dashboard"><FaArrowRight /> العودة</BackButton>
        </div>
      </Header>

      <Grid>
        {members.map(m => (
          <MemberCard key={m.id}>
            {m.image && <MemberImage src={m.image} alt={m.name} />}
            <MemberInfo>
              <MemberName>{m.name}</MemberName>
              <MemberRole>{m.role}</MemberRole>
            </MemberInfo>
            <Actions>
              <ActionButton color="#4CAF50" onClick={() => openEdit(m)}><FaEdit /> تعديل</ActionButton>
              <ActionButton color="#f44336" onClick={() => handleDelete(m.id)}><FaTrash /> حذف</ActionButton>
            </Actions>
          </MemberCard>
        ))}
      </Grid>

      <Modal $show={showModal}>
        <ModalContent>
          <ModalTitle>{editing ? 'تعديل العضو' : 'إضافة عضو جديد'}</ModalTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>الاسم</Label>
              <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </FormGroup>
            <FormGroup>
              <Label>الدور / المنصب</Label>
              <Input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required />
            </FormGroup>
            <FormGroup>
              <Label>ترتيب العرض</Label>
              <Input type="number" value={form.displayOrder} onChange={e => setForm({ ...form, displayOrder: +e.target.value })} />
            </FormGroup>
            <FormGroup>
              <Label>الصورة</Label>
              <Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
              {form.image && !imageFile && <img src={form.image} alt="preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', marginTop: '0.5rem' }} />}
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

export default ManageCouncil;
