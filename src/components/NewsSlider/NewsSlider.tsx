import React from 'react';
import styled from 'styled-components';

const SliderContainer = styled.section`
  padding: 4rem 1rem;
  background: #fff;
  direction: rtl;

  @media (max-width: 768px) {
    padding: 2rem 0.5rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const Title = styled.h2`
  text-align: center;
  color: #8B0000;
  margin-bottom: 3rem;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 1rem 0.5rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NewsCard = styled.div`
  flex: 0 0 300px;
  padding: 1.5rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    flex: 0 0 280px;
  }
`;

const NewsImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const NewsTitle = styled.h3`
  color: #3f0101;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const NewsDate = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const NewsDescription = styled.p`
  color: #333;
  line-height: 1.6;
`;

const NavigationButton = styled.button<{ direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  ${({ direction }) => direction === 'prev' ? 'left: -20px;' : 'right: -20px;'}
  transform: translateY(-50%);
  background: #3f0101c2;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  backdrop-filter: blur(5px);
  transition: background-color 0.3s ease;

  &:hover {
    background: #8B0000;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

interface NewsItem {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'القداس الإلهي الأسبوعي',
    date: '٢٦ يناير ٢٠٢٥',
    description: 'يقام القداس الإلهي كل يوم أحد الساعة ٨ صباحاً بكنيسة الأنبا بولا',
    image: '/img/kudas/kudas1.jpg'
  },
  {
    id: 2,
    title: 'اجتماع الشباب',
    date: '٢٥ يناير ٢٠٢٥',
    description: 'اجتماع شباب الكنيسة كل يوم جمعة الساعة ٧ مساءً',
    image: '/img/pray.jpeg'
  },
  {
    id: 3,
    title: 'مدارس الأحد',
    date: '٢٤ يناير ٢٠٢٥',
    description: 'تقام مدارس الأحد للأطفال كل يوم جمعة الساعة ٤ عصراً',
    image: '/newImgs/Media2.jpeg'
  },
  {
    id: 4,
    title: 'خدمة افتقاد المرضى',
    date: '٢٣ يناير ٢٠٢٥',
    description: 'زيارة المرضى وافتقادهم في المستشفيات والمنازل',
    image: '/img/kdasat.jpeg'
  }
];

const NewsSlider: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'prev' | 'next') => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollAmount = 320; // card width + gap
      const scrollLeft = direction === 'prev' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <SliderContainer>
      <Container>
        <Title>أخبار الكنيسة</Title>
        <NavigationButton direction="prev" onClick={() => scroll('prev')}>
          ›
        </NavigationButton>
        <CardsContainer ref={containerRef}>
          {newsItems.map((item) => (
            <NewsCard key={item.id}>
              <NewsImage src={item.image} alt={item.title} />
              <NewsTitle>{item.title}</NewsTitle>
              <NewsDate>{item.date}</NewsDate>
              <NewsDescription>{item.description}</NewsDescription>
            </NewsCard>
          ))}
        </CardsContainer>
        <NavigationButton direction="next" onClick={() => scroll('next')}>
          ‹
        </NavigationButton>
      </Container>
    </SliderContainer>
  );
};

export default NewsSlider;
