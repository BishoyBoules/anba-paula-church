import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getEvents, ChurchEvent } from '../../services/api';

const PageContainer = styled.div`
  padding: 2rem;
  direction: rtl;
`;

const Title = styled.h1`
  color: #8B0000;
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
`;

const SectionTitle = styled.h2`
  color: #8B0000;
  margin: 2rem 0 1.5rem;
  font-size: 1.8rem;
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s;

  &:hover { transform: translateY(-5px); }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  color: #8B0000;
  margin-bottom: 0.5rem;
`;

const CardDate = styled.p`
  color: #D4AF37;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
`;

const CardText = styled.p`
  color: #555;
  line-height: 1.6;
`;

const Empty = styled.p`
  text-align: center;
  color: #999;
  padding: 2rem;
`;

const NewsPage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<ChurchEvent[]>([]);
  const [events, setEvents] = useState<ChurchEvent[]>([]);

  useEffect(() => {
    getEvents('NEWS').then(res => setNewsItems(res.data)).catch(() => {});
    getEvents('EVENT').then(res => setEvents(res.data)).catch(() => {});
  }, []);

  return (
    <PageContainer>
      <Title>أخبار الكنيسة</Title>

      <SectionTitle>آخر الأخبار</SectionTitle>
      {newsItems.length === 0 ? (
        <Empty>لا توجد أخبار حالياً</Empty>
      ) : (
        <NewsGrid>
          {newsItems.map((item, i) => (
            <Card key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              {item.image && <CardImage src={item.image} alt={item.title} />}
              <CardBody>
                <CardTitle>{item.title}</CardTitle>
                {item.date && <CardDate>{item.date}</CardDate>}
                <CardText>{item.description}</CardText>
              </CardBody>
            </Card>
          ))}
        </NewsGrid>
      )}

      <SectionTitle>الفعاليات القادمة</SectionTitle>
      {events.length === 0 ? (
        <Empty>لا توجد فعاليات قادمة حالياً</Empty>
      ) : (
        <NewsGrid>
          {events.map((item, i) => (
            <Card key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              {item.image && <CardImage src={item.image} alt={item.title} />}
              <CardBody>
                <CardTitle>{item.title}</CardTitle>
                {item.date && <CardDate>{item.date}</CardDate>}
                <CardText>{item.description}</CardText>
              </CardBody>
            </Card>
          ))}
        </NewsGrid>
      )}
    </PageContainer>
  );
};

export default NewsPage;
