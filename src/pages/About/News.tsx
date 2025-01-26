import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  padding: 4rem 0;
  direction: rtl;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  color: #8B0000;
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainNews = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const NewsCard = styled(motion.article)`
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const NewsImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const NewsContent = styled.div`
  padding: 1.5rem;
`;

const NewsDate = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const NewsTitle = styled.h2`
  color: #333;
  margin: 1rem 0;
  font-size: 1.5rem;
`;

const NewsExcerpt = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ReadMore = styled.button`
  background: #8B0000;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #660000;
  }
`;

const EventCard = styled(motion.div)`
  background: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const EventTitle = styled.h3`
  color: #8B0000;
  margin-bottom: 1rem;
`;

const EventDate = styled.p`
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const EventDescription = styled.p`
  color: #333;
  line-height: 1.6;
`;

const News: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      title: 'افتتاح مبنى الخدمات الجديد',
      date: '٢٦ يناير ٢٠٢٥',
      image: '/img/news/building.jpg',
      excerpt: 'تم بنعمة الله افتتاح مبنى الخدمات الجديد الذي يضم قاعات للاجتماعات ومكتبة وفصول للتربية الكنسية.'
    },
    {
      id: 2,
      title: 'زيارة قداسة البابا تواضروس الثاني',
      date: '٢٠ يناير ٢٠٢٥',
      image: '/img/news/pope-visit.jpg',
      excerpt: 'تشرفت كنيستنا بزيارة قداسة البابا تواضروس الثاني وصلاة القداس الإلهي.'
    }
  ];

  const upcomingEvents = [
    {
      title: 'مؤتمر الشباب',
      date: '١-٣ فبراير ٢٠٢٥',
      description: 'مؤتمر روحي للشباب تحت عنوان "حياة التوبة"'
    },
    {
      title: 'رحلة العائلات',
      date: '١٥ فبراير ٢٠٢٥',
      description: 'رحلة عائلية إلى دير الأنبا بيشوي'
    },
    {
      title: 'نهضة العذراء',
      date: '٧-٢٢ أغسطس ٢٠٢٥',
      description: 'صلوات وقداسات صوم العذراء'
    }
  ];

  return (
    <PageContainer>
      <Container>
        <Title>أخبار الكنيسة</Title>
        <NewsGrid>
          <MainNews>
            {newsItems.map((news, index) => (
              <NewsCard
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <NewsImage src={news.image} alt={news.title} />
                <NewsContent>
                  <NewsDate>{news.date}</NewsDate>
                  <NewsTitle>{news.title}</NewsTitle>
                  <NewsExcerpt>{news.excerpt}</NewsExcerpt>
                  <ReadMore>اقرأ المزيد</ReadMore>
                </NewsContent>
              </NewsCard>
            ))}
          </MainNews>
          
          <Sidebar>
            <h2>الأحداث القادمة</h2>
            {upcomingEvents.map((event, index) => (
              <EventCard
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <EventTitle>{event.title}</EventTitle>
                <EventDate>{event.date}</EventDate>
                <EventDescription>{event.description}</EventDescription>
              </EventCard>
            ))}
          </Sidebar>
        </NewsGrid>
      </Container>
    </PageContainer>
  );
};

export default News;
