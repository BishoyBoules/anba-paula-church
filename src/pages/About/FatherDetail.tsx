import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';
import ftAnton from '../../img/ft-anton.jpeg';
import ftPhilo from '../../img/ft-philo.jpeg';
import ftIbrahim from '../../img/ft-Ibrahim.jpeg';
import ftArmia from '../../img/ft-Armia.jpeg';

const PageContainer = styled.div`
  padding: 2rem;
  direction: rtl;
  min-height: 80vh;
  overflow-x: hidden;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #8B0000;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.3s;
  margin-bottom: 2rem;

  &:hover {
    background: #3f0101;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
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

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    margin: 1rem auto;
    border: 3px solid #8B0000;
  }
`;

const TablesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const FatherName = styled.h1`
  color: #8B0000;
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const TableCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  border-top: 4px solid #8B0000;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    border-radius: 8px;
  }
`;

const TableTitle = styled.h3`
  color: #8B0000;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 0;
  padding: 0;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #8B0000;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #660000;
  }

  @media (max-width: 768px) {
    &::-webkit-scrollbar {
      height: 6px;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
  
  @media (max-width: 768px) {
    min-width: 500px;
  }
`;

const TableHeader = styled.th`
  background: #8B0000;
  color: white;
  padding: 1rem;
  text-align: right;
  font-size: 1.1rem;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0.75rem 0.5rem;
    font-size: 0.95rem;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
  
  &:hover {
    background: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  text-align: right;
  color: #333;
  font-size: 1rem;

  @media (max-width: 768px) {
    padding: 0.75rem 0.5rem;
    font-size: 0.9rem;
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
  padding: 4rem;
  font-size: 1.3rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 4rem;
  font-size: 1.3rem;
  color: #f44336;
`;

interface MeetingTime {
    day: string;
    time: string;
    location?: string;
    type?: string;
}

interface FatherType {
    id: string;
    name: string;
    image: string;
    confessionTimes?: MeetingTime[];
    meetings?: MeetingTime[];
    availability?: string[];
}

const localFathersData: FatherType[] = [
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
            'اعداد خدام',
            'درس كتاب',
            'مناطق عشوائية',
            'مدرسة شمامسة'
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
            'اعداد خدام',
            'درس كتاب',
            'مناطق عشوائية',
            'مدرسة شمامسة'
        ]
    },
    {
        id: '3',
        name: 'القس فيلوباتير رمزي',
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
            'اعداد خدام',
            'درس كتاب',
            'مناطق عشوائية',
            'مدرسة شمامسة'
        ]
    },
    {
        id: '4',
        name: 'القس إرميا حلمي',
        image: ftArmia,
        confessionTimes: [
            { day: 'الاحد', time: 'صباحا بعد القداس', location: 'مكتب ابونا بالدور الثالث' },
            { day: 'الجمعة', time: 'صباحا بعد القداس', location: 'مكتب ابونا بالدور الثالث' },
            { day: 'كل الايام', time: '10:00 - 12:00 ص', location: 'مكتب ابونا بالدور الثالث' }
        ],
        meetings: [
            { day: 'السبت', time: '6:00 م - 7:00 م', location: 'كنيسة البابا كيرلس', type: 'عشية' },
            { day: 'السبت', time: '7:00 م - 8:00 م', location: 'كنيسة البابا كيرلس', type: 'درس كتاب' },
            { day: 'السبت التالت من كل شهر', time: '9:30 صباحًا - 1:00 ظهرًا', location: 'كنيسة البابا كيرلس', type: 'خدمة مناطق عشوائية' },
            { day: 'الاربع التالت من كل شهر', time: '6:00 م - 8:00 م', location: 'كنيسة البابا كيرلس', type: 'اجتماع خدمة مناطق عشوائية' }
        ],
        availability: [
            'اعداد خدام',
            'درس كتاب',
            'مناطق عشوائية',
            'مدرسة شمامسة'
        ]
    }
];

const FatherDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [father, setFather] = useState<FatherType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchFatherDetails();
    }, [id]);

    const fetchFatherDetails = () => {
        if (!id) {
            setError(true);
            setLoading(false);
            return;
        }

        const foundFather = localFathersData.find(f => f.id === id);

        if (foundFather) {
            setFather(foundFather);
        } else {
            setError(true);
        }

        setLoading(false);
    };

    if (loading) {
        return (
            <PageContainer>
                <BackButton to="/about/fathers">
                    <FaArrowRight />
                    العودة إلى أباء الكنيسة
                </BackButton>
                <LoadingMessage>جاري التحميل...</LoadingMessage>
            </PageContainer>
        );
    }

    if (error || !father) {
        return (
            <PageContainer>
                <BackButton to="/about/fathers">
                    <FaArrowRight />
                    العودة إلى أباء الكنيسة
                </BackButton>
                <ErrorMessage>عذراً، لم يتم العثور على البيانات</ErrorMessage>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <BackButton to="/about/fathers">
                <FaArrowRight />
                العودة إلى أباء الكنيسة
            </BackButton>

            <ContentWrapper>
                <HeaderSection>
                    <FatherName>{father.name}</FatherName>
                    <FatherImage src={father.image} alt={father.name} />
                </HeaderSection>

                <TablesSection>
                    <TableCard>
                        <TableTitle>الخدمات</TableTitle>
                        {father.availability && father.availability.length > 0 ? (
                            <TableWrapper>
                                <Table>
                                    <thead>
                                        <tr>
                                            <TableHeader>الخدمة</TableHeader>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {father.availability.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item}</TableCell>
                                            </TableRow>
                                        ))}
                                    </tbody>
                                </Table>
                            </TableWrapper>
                        ) : (
                            <EmptyMessage>لا توجد أوقات محددة</EmptyMessage>
                        )}
                    </TableCard>

                    <TableCard>
                        <TableTitle>الاجتماعات</TableTitle>
                        {father.meetings && father.meetings.length > 0 ? (
                            <TableWrapper>
                                <Table>
                                    <thead>
                                        <tr>
                                            <TableHeader>اجتماع</TableHeader>
                                            <TableHeader>اليوم</TableHeader>
                                            <TableHeader>الوقت</TableHeader>
                                            <TableHeader>المكان</TableHeader>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {father.meetings.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.type || '-'}</TableCell>
                                                <TableCell>{item.day}</TableCell>
                                                <TableCell>{item.time}</TableCell>
                                                <TableCell>{item.location || '-'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </tbody>
                                </Table>
                            </TableWrapper>
                        ) : (
                            <EmptyMessage>لا توجد اجتماعات محددة</EmptyMessage>
                        )}
                    </TableCard>

                    <TableCard>
                        <TableTitle>مواعيد الاعتراف</TableTitle>
                        {father.confessionTimes && father.confessionTimes.length > 0 ? (
                            <TableWrapper>
                                <Table>
                                    <thead>
                                        <tr>
                                            <TableHeader>اليوم</TableHeader>
                                            <TableHeader>الوقت</TableHeader>
                                            <TableHeader>المكان</TableHeader>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {father.confessionTimes.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.day}</TableCell>
                                                <TableCell>{item.time}</TableCell>
                                                <TableCell>{item.location || '-'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </tbody>
                                </Table>
                            </TableWrapper>
                        ) : (
                            <EmptyMessage>لا توجد مواعيد محددة</EmptyMessage>
                        )}
                    </TableCard>

                </TablesSection>
            </ContentWrapper>
        </PageContainer>
    );
};

export default FatherDetail;
