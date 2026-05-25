import React, { useState } from 'react';
import styled from 'styled-components';
import { getNews, getEvents, NewsItem } from '../../services/api';

const SliderContainer = styled.section`
  padding: 4rem 1rem;
  background: #fff;
  direction: ltr;

  @media (max-width: 768px) {
    padding: 2rem 0.5rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  direction: ltr;
`;

const Title = styled.h2`
  text-align: center;
  color: #8B0000;
  margin-bottom: 3rem;
  font-size: 2rem;
  direction: rtl;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  overflow-x: scroll;
  padding: 1rem 0.5rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  direction: ltr;
  unicode-bidi: bidi-override;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NewsCard = styled.div`
  flex: 0 0 300px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    flex: 0 0 280px;
  }
`;

const NewsImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 0;
`;

const NewsTitle = styled.h3`
  color: #3f0101;
  margin: 0;
  padding: 1rem;
  font-size: 1.2rem;
  text-align: center;
`;

const Modal = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? 'flex' : 'none')};
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 15px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease;
  direction: rtl;

  @keyframes slideIn {
    from { transform: translateY(-50px); opacity: 0; }
    to   { transform: translateY(0);     opacity: 1; }
  }

  @media (max-width: 768px) {
    max-width: 95%;
    max-height: 85vh;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 15px 15px 0 0;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const ModalBody = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ModalTitle = styled.h2`
  color: #8B0000;
  margin-bottom: 1rem;
  font-size: 1.8rem;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const ModalDate = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

const ModalDescription = styled.p`
  color: #333;
  line-height: 1.8;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8B0000;
  transition: background 0.3s ease;

  &:hover {
    background: #fff;
  }
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

const NewsSlider: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [news, setNews] = React.useState<NewsItem[]>();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  React.useEffect(() => {
    Promise.all([getNews().catch(() => ({ data: [] })), getEvents().catch(() => ({ data: [] }))])
      .then(([newsRes, eventsRes]) => {
        const fromEvents: NewsItem[] = eventsRes.data.map((e: any) => ({
          id: e.id + 100000,
          title: e.title,
          date: e.date,
          description: e.description,
          image: e.image,
        }));
        const combined = [...newsRes.data, ...fromEvents];
        if (combined.length > 0) setNews(combined);
      });
  }, []);

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  }, [news]);

  const handleCardClick = (item: NewsItem) => {
    setSelectedNews(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedNews(null), 300);
  };

  const scroll = (direction: 'prev' | 'next') => {
    if (containerRef.current) {
      const scrollAmount = 320;
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + (direction === 'prev' ? -scrollAmount : scrollAmount),
        behavior: 'smooth',
      });
    }
  };

  return (
    <SliderContainer>
      <Container>
        <Title>أخبار الكنيسة</Title>
        <NavigationButton direction="prev" onClick={() => scroll('prev')}>‹</NavigationButton>
        <CardsContainer ref={containerRef} style={{ direction: 'rtl' }}>
          {news?.map((item) => (
            <NewsCard key={item.id} onClick={() => handleCardClick(item)}>
              <NewsImage src={item.image} alt={item.title} />
              <NewsTitle>{item.title}</NewsTitle>
            </NewsCard>
          ))}
        </CardsContainer>
        <NavigationButton direction="next" onClick={() => scroll('next')}>›</NavigationButton>
      </Container>

      <Modal $show={showModal} onClick={handleCloseModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={handleCloseModal}>×</CloseButton>
          {selectedNews && (
            <>
              <ModalImage src={selectedNews.image} alt={selectedNews.title} />
              <ModalBody>
                <ModalTitle>{selectedNews.title}</ModalTitle>
                {selectedNews.date && <ModalDate>{selectedNews.date}</ModalDate>}
                <ModalDescription>{selectedNews.description}</ModalDescription>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </SliderContainer>
  );
};

export default NewsSlider;
