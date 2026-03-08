import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { FaArrowRight } from 'react-icons/fa';

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

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const FatherImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: cover;
`;

const InfoSection = styled.div`
  padding: 2rem;
`;

const FatherName = styled.h2`
  color: #8B0000;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const DetailItem = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
`;

const DetailLabel = styled.h3`
  color: #8B0000;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const DetailText = styled.p`
  color: #333;
  font-size: 1rem;
  line-height: 1.6;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #f44336;
`;

interface FatherType {
    id: string;
    name: string;
    image: string;
    bio?: string;
    birthDate?: string;
    ordainedDate?: string;
    education?: string;
    responsibilities?: string;
}

const FatherDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [father, setFather] = useState<FatherType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchFatherDetails();
    }, [id]);

    const fetchFatherDetails = async () => {
        if (!id) {
            setError(true);
            setLoading(false);
            return;
        }

        try {
            const docRef = doc(db, 'fathers', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setFather({ id: docSnap.id, ...docSnap.data() } as FatherType);
            } else {
                setError(true);
            }
        } catch (err) {
            console.error('Error fetching father details:', err);
            setError(true);
        } finally {
            setLoading(false);
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

    if (error || !father) {
        return (
            <Container>
                <Header>
                    <Title>تفاصيل الأب</Title>
                    <BackButton to="/admin/fathers">
                        <FaArrowRight />
                        العودة
                    </BackButton>
                </Header>
                <ErrorMessage>عذراً، لم يتم العثور على البيانات</ErrorMessage>
            </Container>
        );
    }

    return (
        <Container>
            <Header>
                <Title>تفاصيل الأب</Title>
                <BackButton to="/admin/fathers">
                    <FaArrowRight />
                    العودة
                </BackButton>
            </Header>

            <ContentWrapper>
                <FatherImage src={father.image} alt={father.name} />
                <InfoSection>
                    <FatherName>{father.name}</FatherName>

                    {father.bio && (
                        <DetailItem>
                            <DetailLabel>نبذة تعريفية</DetailLabel>
                            <DetailText>{father.bio}</DetailText>
                        </DetailItem>
                    )}

                    {father.birthDate && (
                        <DetailItem>
                            <DetailLabel>تاريخ الميلاد</DetailLabel>
                            <DetailText>{father.birthDate}</DetailText>
                        </DetailItem>
                    )}

                    {father.ordainedDate && (
                        <DetailItem>
                            <DetailLabel>تاريخ الرسامة</DetailLabel>
                            <DetailText>{father.ordainedDate}</DetailText>
                        </DetailItem>
                    )}

                    {father.education && (
                        <DetailItem>
                            <DetailLabel>المؤهلات الدراسية</DetailLabel>
                            <DetailText>{father.education}</DetailText>
                        </DetailItem>
                    )}

                    {father.responsibilities && (
                        <DetailItem>
                            <DetailLabel>المسؤوليات والخدمات</DetailLabel>
                            <DetailText>{father.responsibilities}</DetailText>
                        </DetailItem>
                    )}
                </InfoSection>
            </ContentWrapper>
        </Container>
    );
};

export default FatherDetail;
