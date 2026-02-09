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

const FathersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FatherCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FatherImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const FatherInfo = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const FatherName = styled.h3`
  color: #8B0000;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 1rem;
  border-top: 1px solid #eee;
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

interface FatherType {
    id: string;
    name: string;
    image: string;
}

const ManageFathers: React.FC = () => {
    const [fathers, setFathers] = useState<FatherType[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingFather, setEditingFather] = useState<FatherType | null>(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        image: ''
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        fetchFathers();
    }, []);

    const fetchFathers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'fathers'));
            const fathersData: FatherType[] = [];
            querySnapshot.forEach((doc) => {
                fathersData.push({ id: doc.id, ...doc.data() } as FatherType);
            });
            setFathers(fathersData);
        } catch (error) {
            console.error('Error fetching fathers:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = formData.image;

            // Upload image if a new file is selected
            if (imageFile) {
                const imageRef = ref(storage, `fathers/${Date.now()}_${imageFile.name}`);
                await uploadBytes(imageRef, imageFile);
                imageUrl = await getDownloadURL(imageRef);
            }

            const fatherData = {
                ...formData,
                image: imageUrl,
                updatedAt: Timestamp.now()
            };

            if (editingFather) {
                // Update existing father
                await updateDoc(doc(db, 'fathers', editingFather.id), fatherData);
            } else {
                // Add new father
                await addDoc(collection(db, 'fathers'), {
                    ...fatherData,
                    createdAt: Timestamp.now()
                });
            }

            setShowModal(false);
            setEditingFather(null);
            setFormData({ name: '', image: '' });
            setImageFile(null);
            fetchFathers();
        } catch (error) {
            console.error('Error saving father:', error);
            alert('حدث خطأ أثناء حفظ البيانات');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (father: FatherType) => {
        setEditingFather(father);
        setFormData({
            name: father.name,
            image: father.image
        });
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذا الأب؟')) {
            try {
                await deleteDoc(doc(db, 'fathers', id));
                fetchFathers();
            } catch (error) {
                console.error('Error deleting father:', error);
                alert('حدث خطأ أثناء حذف البيانات');
            }
        }
    };

    const handleAddNew = () => {
        setEditingFather(null);
        setFormData({ name: '', image: '' });
        setImageFile(null);
        setShowModal(true);
    };

    return (
        <Container>
            <Header>
                <Title>إدارة أباء الكنيسة</Title>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <AddButton onClick={handleAddNew}>
                        <FaPlus />
                        إضافة أب جديد
                    </AddButton>
                    <BackButton to="/admin/dashboard">
                        <FaArrowRight />
                        العودة
                    </BackButton>
                </div>
            </Header>

            <FathersGrid>
                {fathers.map((father) => (
                    <FatherCard key={father.id}>
                        <FatherImage src={father.image} alt={father.name} />
                        <FatherInfo>
                            <FatherName>{father.name}</FatherName>
                        </FatherInfo>
                        <Actions>
                            <ActionButton variant="edit" onClick={() => handleEdit(father)}>
                                <FaEdit />
                                تعديل
                            </ActionButton>
                            <ActionButton variant="delete" onClick={() => handleDelete(father.id)}>
                                <FaTrash />
                                حذف
                            </ActionButton>
                        </Actions>
                    </FatherCard>
                ))}
            </FathersGrid>

            <Modal show={showModal}>
                <ModalContent>
                    <ModalTitle>{editingFather ? 'تعديل الأب' : 'إضافة أب جديد'}</ModalTitle>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label>الاسم</Label>
                            <Input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                placeholder="مثال: القمص إبراهيم توفيق"
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
                                <img src={formData.image} alt="Preview" style={{ width: '150px', marginTop: '0.5rem', borderRadius: '8px' }} />
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

export default ManageFathers;
