import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getAllTicker, createTicker, updateTicker, deleteTicker, TickerItem } from '../../services/api';
import { FaArrowRight, FaEdit, FaTrash, FaPlus, FaToggleOn, FaToggleOff } from 'react-icons/fa';

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
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ItemCard = styled.div<{ active: boolean }>`
  background: white;
  padding: 1.25rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  gap: 1rem;
  border-right: 4px solid ${p => p.active ? '#4CAF50' : '#ccc'};
`;

const ItemOrder = styled.span`
  color: #999;
  font-size: 0.9rem;
  min-width: 24px;
`;

const ItemText = styled.p`
  flex: 1;
  color: #333;
  font-size: 1rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const ActionButton = styled.button<{ color?: string }>`
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
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

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #333;
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

const ManageTicker: React.FC = () => {
  const [items, setItems] = useState<TickerItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<TickerItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ content: '', displayOrder: 1, active: true });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = () =>
    getAllTicker().then(res => setItems(res.data)).catch(() => {});

  const openAdd = () => {
    setEditing(null);
    setForm({ content: '', displayOrder: items.length + 1, active: true });
    setShowModal(true);
  };

  const openEdit = (item: TickerItem) => {
    setEditing(item);
    setForm({ content: item.content, displayOrder: item.displayOrder, active: item.active });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await updateTicker(editing.id, form);
      } else {
        await createTicker(form);
      }
      setShowModal(false);
      fetchItems();
    } catch {
      alert('حدث خطأ أثناء الحفظ');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (item: TickerItem) => {
    try {
      await updateTicker(item.id, { ...item, active: !item.active });
      fetchItems();
    } catch {
      alert('حدث خطأ');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
    try {
      await deleteTicker(id);
      fetchItems();
    } catch {
      alert('حدث خطأ أثناء الحذف');
    }
  };

  return (
    <Container>
      <Header>
        <Title>إدارة شريط الأخبار</Title>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <AddButton onClick={openAdd}><FaPlus /> إضافة عنصر</AddButton>
          <BackButton to="/admin/dashboard"><FaArrowRight /> العودة</BackButton>
        </div>
      </Header>

      <ItemList>
        {items.map(item => (
          <ItemCard key={item.id} active={item.active}>
            <ItemOrder>#{item.displayOrder}</ItemOrder>
            <ItemText>{item.content}</ItemText>
            <Actions>
              <ActionButton color={item.active ? '#4CAF50' : '#999'} onClick={() => handleToggle(item)}>
                {item.active ? <FaToggleOn /> : <FaToggleOff />}
                {item.active ? 'نشط' : 'مخفي'}
              </ActionButton>
              <ActionButton color="#4CAF50" onClick={() => openEdit(item)}><FaEdit /> تعديل</ActionButton>
              <ActionButton color="#f44336" onClick={() => handleDelete(item.id)}><FaTrash /> حذف</ActionButton>
            </Actions>
          </ItemCard>
        ))}
      </ItemList>

      <Modal $show={showModal}>
        <ModalContent>
          <ModalTitle>{editing ? 'تعديل العنصر' : 'إضافة عنصر جديد'}</ModalTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>النص</Label>
              <Input value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
            </FormGroup>
            <FormGroup>
              <Label>ترتيب العرض</Label>
              <Input type="number" value={form.displayOrder} onChange={e => setForm({ ...form, displayOrder: +e.target.value })} required />
            </FormGroup>
            <FormGroup>
              <CheckboxLabel>
                <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
                نشط (يظهر في الشريط)
              </CheckboxLabel>
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

export default ManageTicker;
