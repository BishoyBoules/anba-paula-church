import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowRight, FaPlus, FaTrash, FaSave } from 'react-icons/fa';
import ftAnton from '../../img/ft-anton.jpeg';
import ftPhilo from '../../img/ft-philo.jpeg';
import ftIbrahim from '../../img/ft-Ibrahim.jpeg';
import ftArmia from '../../img/ft-Armia.jpeg';

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

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #45a049;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const FatherImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  margin: 2rem auto;
  display: block;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border: 5px solid #8B0000;
`;

const FatherName = styled.h1`
  color: #8B0000;
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const TablesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TableCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  border-top: 4px solid #8B0000;
`;

const TableTitle = styled.h3`
  color: #8B0000;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
`;

const TableHeader = styled.th`
  background: #8B0000;
  color: white;
  padding: 0.75rem;
  text-align: right;
  font-size: 1rem;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
`;

const TableCell = styled.td`
  padding: 0.5rem;
  text-align: right;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #8B0000;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #8B0000;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  margin: 0 auto;

  &:hover {
    background: #3f0101;
  }
`;

const DeleteButton = styled.button`
  padding: 0.5rem;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #d32f2f;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #999;
  font-style: italic;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
`;

interface MeetingTime {
    day: string;
    time: string;
    location?: string;
}

interface FatherType {
    id: string;
    name: string;
    image: string;
    confessionTimes?: MeetingTime[];
    meetings?: MeetingTime[];
    availability?: MeetingTime[];
}

const initialFathersData: FatherType[] = [
    {
        id: '1',
        name: 'القمص إبراهيم توفيق',
        image: ftIbrahim,
        confessionTimes: [
            { day: 'الجمعة', time: '6:00 - 8:00 م', location: 'الكنيسة' },
            { day: 'السبت', time: '5:00 - 7:00 م', location: 'الكنيسة' }
        ],
        meetings: [
            { day: 'الأحد', time: '5:00 م', location: 'قاعة الاجتماعات' },
            { day: 'الأربعاء', time: '7:00 م', location: 'قاعة الاجتماعات' }
        ],
        availability: [
            { day: 'السبت', time: '10:00 ص - 2:00 م', location: 'المكتب' },
            { day: 'الأحد', time: '12:00 - 3:00 م', location: 'المكتب' }
        ]
    },
    {
        id: '2',
        name: 'القمص أنطونيوس منير',
        image: ftAnton,
        confessionTimes: [
            { day: 'الخميس', time: '6:00 - 8:00 م', location: 'الكنيسة' },
            { day: 'الجمعة', time: '5:00 - 7:00 م', location: 'الكنيسة' }
        ],
        meetings: [
            { day: 'الثلاثاء', time: '6:00 م', location: 'قاعة الاجتماعات' },
            { day: 'الجمعة', time: '7:00 م', location: 'قاعة الاجتماعات' }
        ],
        availability: [
            { day: 'الأحد', time: '11:00 ص - 2:00 م', location: 'المكتب' },
            { day: 'الثلاثاء', time: '4:00 - 7:00 م', location: 'المكتب' }
        ]
    },
    {
        id: '3',
        name: 'القمص فيلوباتير رمزي',
        image: ftPhilo,
        confessionTimes: [
            { day: 'الأربعاء', time: '6:00 - 8:00 م', location: 'الكنيسة' },
            { day: 'السبت', time: '4:00 - 6:00 م', location: 'الكنيسة' }
        ],
        meetings: [
            { day: 'الأحد', time: '4:00 م', location: 'قاعة الاجتماعات' },
            { day: 'الخميس', time: '6:30 م', location: 'قاعة الاجتماعات' }
        ],
        availability: [
            { day: 'الاثنين', time: '3:00 - 6:00 م', location: 'المكتب' },
            { day: 'الخميس', time: '10:00 ص - 1:00 م', location: 'المكتب' }
        ]
    },
    {
        id: '4',
        name: 'القس إرميا حلمي',
        image: ftArmia,
        confessionTimes: [
            { day: 'الثلاثاء', time: '6:00 - 8:00 م', location: 'الكنيسة' },
            { day: 'الجمعة', time: '5:30 - 7:30 م', location: 'الكنيسة' }
        ],
        meetings: [
            { day: 'الأحد', time: '3:30 م', location: 'قاعة الاجتماعات' },
            { day: 'الاثنين', time: '7:00 م', location: 'قاعة الاجتماعات' }
        ],
        availability: [
            { day: 'الأربعاء', time: '2:00 - 5:00 م', location: 'المكتب' },
            { day: 'السبت', time: '9:00 ص - 12:00 م', location: 'المكتب' }
        ]
    }
];

const getLocalFathersData = (): FatherType[] => {
    const stored = localStorage.getItem('fathersScheduleData');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return initialFathersData;
        }
    }
    return initialFathersData;
};

const saveLocalFathersData = (data: FatherType[]) => {
    localStorage.setItem('fathersScheduleData', JSON.stringify(data));
};

const AdminFatherDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [father, setFather] = useState<FatherType | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [confessionTimes, setConfessionTimes] = useState<MeetingTime[]>([]);
    const [meetings, setMeetings] = useState<MeetingTime[]>([]);
    const [availability, setAvailability] = useState<MeetingTime[]>([]);

    useEffect(() => {
        fetchFatherDetails();
    }, [id]);

    const fetchFatherDetails = () => {
        if (!id) {
            setLoading(false);
            return;
        }

        const allFathers = getLocalFathersData();
        const foundFather = allFathers.find(f => f.id === id);

        if (foundFather) {
            setFather(foundFather);
            setConfessionTimes(foundFather.confessionTimes || []);
            setMeetings(foundFather.meetings || []);
            setAvailability(foundFather.availability || []);
        }

        setLoading(false);
    };

    const handleSave = () => {
        if (!id) return;

        setSaving(true);
        try {
            const allFathers = getLocalFathersData();
            const updatedFathers = allFathers.map(f =>
                f.id === id
                    ? { ...f, confessionTimes, meetings, availability }
                    : f
            );
            saveLocalFathersData(updatedFathers);
            alert('تم الحفظ بنجاح');
        } catch (error) {
            console.error('Error saving:', error);
            alert('حدث خطأ أثناء الحفظ');
        } finally {
            setSaving(false);
        }
    };

    const addRow = (type: 'confession' | 'meetings' | 'availability') => {
        const newRow: MeetingTime = { day: '', time: '', location: '' };
        if (type === 'confession') {
            setConfessionTimes([...confessionTimes, newRow]);
        } else if (type === 'meetings') {
            setMeetings([...meetings, newRow]);
        } else {
            setAvailability([...availability, newRow]);
        }
    };

    const deleteRow = (type: 'confession' | 'meetings' | 'availability', index: number) => {
        if (type === 'confession') {
            setConfessionTimes(confessionTimes.filter((_, i) => i !== index));
        } else if (type === 'meetings') {
            setMeetings(meetings.filter((_, i) => i !== index));
        } else {
            setAvailability(availability.filter((_, i) => i !== index));
        }
    };

    const updateRow = (
        type: 'confession' | 'meetings' | 'availability',
        index: number,
        field: keyof MeetingTime,
        value: string
    ) => {
        if (type === 'confession') {
            const updated = [...confessionTimes];
            updated[index] = { ...updated[index], [field]: value };
            setConfessionTimes(updated);
        } else if (type === 'meetings') {
            const updated = [...meetings];
            updated[index] = { ...updated[index], [field]: value };
            setMeetings(updated);
        } else {
            const updated = [...availability];
            updated[index] = { ...updated[index], [field]: value };
            setAvailability(updated);
        }
    };

    if (loading) {
        return (
            <Container>
                <Header>
                    <Title>تفاصيل الأب</Title>
                    <BackButton to="/admin/fathers">
                        <FaArrowRight />
                        العودة
                    </BackButton>
                </Header>
                <LoadingMessage>جاري التحميل...</LoadingMessage>
            </Container>
        );
    }

    if (!father) {
        return (
            <Container>
                <Header>
                    <Title>تفاصيل الأب</Title>
                    <BackButton to="/admin/fathers">
                        <FaArrowRight />
                        العودة
                    </BackButton>
                </Header>
                <LoadingMessage>لم يتم العثور على البيانات</LoadingMessage>
            </Container>
        );
    }

    return (
        <Container>
            <Header>
                <Title>تفاصيل الأب</Title>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <SaveButton onClick={handleSave} disabled={saving}>
                        <FaSave />
                        {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                    </SaveButton>
                    <BackButton to="/admin/fathers">
                        <FaArrowRight />
                        العودة
                    </BackButton>
                </div>
            </Header>

            <ContentWrapper>
                <HeaderSection>
                    <FatherName>{father.name}</FatherName>
                    <FatherImage src={father.image} alt={father.name} />
                </HeaderSection>

                <TablesSection>
                    <TableCard>
                        <TableTitle>مواعيد الاعتراف</TableTitle>
                        {confessionTimes.length > 0 ? (
                            <Table>
                                <thead>
                                    <tr>
                                        <TableHeader>اليوم</TableHeader>
                                        <TableHeader>الوقت</TableHeader>
                                        <TableHeader>المكان</TableHeader>
                                        <TableHeader style={{ width: '50px' }}></TableHeader>
                                    </tr>
                                </thead>
                                <tbody>
                                    {confessionTimes.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Input
                                                    value={item.day}
                                                    onChange={(e) => updateRow('confession', index, 'day', e.target.value)}
                                                    placeholder="مثال: الجمعة"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    value={item.time}
                                                    onChange={(e) => updateRow('confession', index, 'time', e.target.value)}
                                                    placeholder="مثال: 6:00 - 8:00 م"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    value={item.location || ''}
                                                    onChange={(e) => updateRow('confession', index, 'location', e.target.value)}
                                                    placeholder="مثال: الكنيسة"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <DeleteButton onClick={() => deleteRow('confession', index)}>
                                                    <FaTrash />
                                                </DeleteButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <EmptyMessage>لا توجد مواعيد</EmptyMessage>
                        )}
                        <AddButton onClick={() => addRow('confession')}>
                            <FaPlus />
                            إضافة موعد
                        </AddButton>
                    </TableCard>

                    <TableCard>
                        <TableTitle>الاجتماعات</TableTitle>
                        {meetings.length > 0 ? (
                            <Table>
                                <thead>
                                    <tr>
                                        <TableHeader>اليوم</TableHeader>
                                        <TableHeader>الوقت</TableHeader>
                                        <TableHeader>المكان</TableHeader>
                                        <TableHeader style={{ width: '50px' }}></TableHeader>
                                    </tr>
                                </thead>
                                <tbody>
                                    {meetings.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Input
                                                    value={item.day}
                                                    onChange={(e) => updateRow('meetings', index, 'day', e.target.value)}
                                                    placeholder="مثال: الأحد"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    value={item.time}
                                                    onChange={(e) => updateRow('meetings', index, 'time', e.target.value)}
                                                    placeholder="مثال: 5:00 م"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    value={item.location || ''}
                                                    onChange={(e) => updateRow('meetings', index, 'location', e.target.value)}
                                                    placeholder="مثال: قاعة الاجتماعات"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <DeleteButton onClick={() => deleteRow('meetings', index)}>
                                                    <FaTrash />
                                                </DeleteButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <EmptyMessage>لا توجد اجتماعات</EmptyMessage>
                        )}
                        <AddButton onClick={() => addRow('meetings')}>
                            <FaPlus />
                            إضافة اجتماع
                        </AddButton>
                    </TableCard>

                    <TableCard>
                        <TableTitle>أوقات التواجد</TableTitle>
                        {availability.length > 0 ? (
                            <Table>
                                <thead>
                                    <tr>
                                        <TableHeader>اليوم</TableHeader>
                                        <TableHeader>الوقت</TableHeader>
                                        <TableHeader>المكان</TableHeader>
                                        <TableHeader style={{ width: '50px' }}></TableHeader>
                                    </tr>
                                </thead>
                                <tbody>
                                    {availability.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Input
                                                    value={item.day}
                                                    onChange={(e) => updateRow('availability', index, 'day', e.target.value)}
                                                    placeholder="مثال: السبت"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    value={item.time}
                                                    onChange={(e) => updateRow('availability', index, 'time', e.target.value)}
                                                    placeholder="مثال: 10:00 ص - 2:00 م"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    value={item.location || ''}
                                                    onChange={(e) => updateRow('availability', index, 'location', e.target.value)}
                                                    placeholder="مثال: المكتب"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <DeleteButton onClick={() => deleteRow('availability', index)}>
                                                    <FaTrash />
                                                </DeleteButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <EmptyMessage>لا توجد أوقات محددة</EmptyMessage>
                        )}
                        <AddButton onClick={() => addRow('availability')}>
                            <FaPlus />
                            إضافة وقت
                        </AddButton>
                    </TableCard>
                </TablesSection>
            </ContentWrapper>
        </Container>
    );
};

export default AdminFatherDetail;
