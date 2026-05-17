import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getAllMassSchedules, createMassSchedule, updateMassSchedule, deleteMassSchedule, MassSchedule } from '../../services/api';
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  margin-top: 1.5rem;
`;

const Thead = styled.thead`
  background: #8B0000;
  color: white;
`;

const Th = styled.th`
  padding: 1rem 1.25rem;
  text-align: right;
`;

const Td = styled.td`
  padding: 0.9rem 1.25rem;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
`;

const Tr = styled.tr`
  &:last-child td { border-bottom: none; }
  &:hover td { background: #faf5f5; }
`;

const ActionButton = styled.button<{ color?: string }>`
  padding: 0.35rem 0.7rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  background: ${p => p.color || '#8B0000'};
  color: white;
  margin-left: 0.4rem;
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

type FormData = { day: string; time: string; displayOrder: number; active: boolean };

const ManageMassSchedule: React.FC = () => {
  const [schedules, setSchedules] = useState<MassSchedule[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<MassSchedule | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({ day: '', time: '', displayOrder: 1, active: true });

  useEffect(() => { fetchSchedules(); }, []);

  const fetchSchedules = () =>
    getAllMassSchedules().then(res => setSchedules(res.data)).catch(() => {});

  const openAdd = () => {
    setEditing(null);
    setForm({ day: '', time: '', displayOrder: schedules.length + 1, active: true });
    setShowModal(true);
  };

  const openEdit = (s: MassSchedule) => {
    setEditing(s);
    setForm({ day: s.day, time: s.time, displayOrder: s.displayOrder, active: s.active });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await updateMassSchedule(editing.id, form);
      } else {
        await createMassSchedule(form);
      }
      setShowModal(false);
      fetchSchedules();
    } catch {
      alert('حدث خطأ أثناء الحفظ');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (s: MassSchedule) => {
    try {
      await updateMassSchedule(s.id, { ...s, active: !s.active });
      fetchSchedules();
    } catch {
      alert('حدث خطأ');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
    try {
      await deleteMassSchedule(id);
      fetchSchedules();
    } catch {
      alert('حدث خطأ أثناء الحذف');
    }
  };

  return (
    <Container>
      <Header>
        <Title>إدارة مواعيد القداسات</Title>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <AddButton onClick={openAdd}><FaPlus /> إضافة موعد</AddButton>
          <BackButton to="/admin/dashboard"><FaArrowRight /> العودة</BackButton>
        </div>
      </Header>

      <Table>
        <Thead>
          <tr>
            <Th>#</Th>
            <Th>اليوم</Th>
            <Th>الوقت</Th>
            <Th>الحالة</Th>
            <Th>إجراءات</Th>
          </tr>
        </Thead>
        <tbody>
          {schedules.map(s => (
            <Tr key={s.id}>
              <Td>{s.displayOrder}</Td>
              <Td style={{ color: '#8B0000', fontWeight: 'bold' }}>{s.day}</Td>
              <Td>{s.time}</Td>
              <Td>
                <ActionButton color={s.active ? '#4CAF50' : '#999'} onClick={() => handleToggle(s)}>
                  {s.active ? <FaToggleOn /> : <FaToggleOff />}
                  {s.active ? 'نشط' : 'مخفي'}
                </ActionButton>
              </Td>
              <Td>
                <ActionButton color="#4CAF50" onClick={() => openEdit(s)}><FaEdit /> تعديل</ActionButton>
                <ActionButton color="#f44336" onClick={() => handleDelete(s.id)}><FaTrash /> حذف</ActionButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <Modal $show={showModal}>
        <ModalContent>
          <ModalTitle>{editing ? 'تعديل الموعد' : 'إضافة موعد جديد'}</ModalTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>اليوم</Label>
              <Input value={form.day} onChange={e => setForm({ ...form, day: e.target.value })} placeholder="مثال: الجمعة" required />
            </FormGroup>
            <FormGroup>
              <Label>الوقت</Label>
              <Input value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} placeholder="مثال: ٦:٠٠ - ٨:٠٠ صباحاً" required />
            </FormGroup>
            <FormGroup>
              <Label>ترتيب العرض</Label>
              <Input type="number" value={form.displayOrder} onChange={e => setForm({ ...form, displayOrder: +e.target.value })} />
            </FormGroup>
            <FormGroup>
              <CheckboxLabel>
                <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
                نشط (يظهر في الجدول)
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

export default ManageMassSchedule;
