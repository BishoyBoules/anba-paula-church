import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NewsSection = styled.section`
  padding: 4rem 0;
  background: #fff;
  direction: rtl;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SectionTitle = styled.h2`
  color: #8B0000;
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2rem;
  
  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: #D4AF37;
    margin: 1rem auto;
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const NewsCard = styled(motion.div)`
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const NewsImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const NewsContent = styled.div`
  padding: 1.5rem;
`;

const NewsTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const NewsDate = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const NewsDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const News: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      title: 'إستئناف القداسات اليومية',
      date: '٢٦ يناير ٢٠٢٥',
      description: 'تعلن كنيسة الأنبا بولا لشعبها عن إستئناف القداسات اليومية بالكنيسة',
      image: '/img/mass-announcement.jpg'
    },
    {
      id: 2,
      title: 'تحذير بشأن نسخ مزورة من الكتاب المقدس',
      date: '٢٥ يناير ٢٠٢٥',
      description: 'تحذير الكنيسة القبطية الأرثوذكسية بشأن نسخ مزورة من الكتاب المقدس',
      image: '/img/bible-warning.jpg'
    }
  ];

  return (
    <NewsSection>
      <Container>
        <SectionTitle>أخبار الكنيسة</SectionTitle>
        <NewsGrid>
          {newsItems.map((news) => (
            <NewsCard
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <NewsImage src={news.image} alt={news.title} />
              <NewsContent>
                <NewsTitle>{news.title}</NewsTitle>
                <NewsDate>{news.date}</NewsDate>
                <NewsDescription>{news.description}</NewsDescription>
              </NewsContent>
            </NewsCard>
          ))}
        </NewsGrid>
      </Container>
    </NewsSection>
  );
};

export default News;
