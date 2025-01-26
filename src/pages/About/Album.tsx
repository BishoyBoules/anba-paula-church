import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

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

const AlbumGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

const ImageCard = styled(motion.div)`
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: relative;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ImageCard}:hover & {
    transform: scale(1.05);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ImageCard}:hover & {
    opacity: 1;
  }

  h3 {
    margin: 0;
    font-size: 1.1rem;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  max-width: 90vw;
  max-height: 90vh;
  
  img {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

interface FilterButtonProps {
  active: boolean;
}

const FilterButton = styled.button<FilterButtonProps>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background: ${props => props.active ? '#8B0000' : '#fff'};
  color: ${props => props.active ? '#fff' : '#333'};
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

interface Image {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: string;
}

const images: Image[] = [
  {
    id: 1,
    src: '/img/album/mass1.jpg',
    alt: 'القداس الإلهي',
    title: 'القداس الإلهي',
    category: 'liturgy'
  },
  {
    id: 2,
    src: '/img/album/event1.jpg',
    alt: 'مؤتمر الشباب',
    title: 'مؤتمر الشباب',
    category: 'events'
  },
  {
    id: 3,
    src: '/img/album/trip1.jpg',
    alt: 'رحلة العائلات',
    title: 'رحلة العائلات',
    category: 'trips'
  },
  {
    id: 4,
    src: '/img/album/service1.jpg',
    alt: 'خدمة المسنين',
    title: 'خدمة المسنين',
    category: 'service'
  }
];

const filters = [
  { id: 'all', label: 'الكل' },
  { id: 'liturgy', label: 'القداسات' },
  { id: 'events', label: 'المؤتمرات' },
  { id: 'trips', label: 'الرحلات' },
  { id: 'service', label: 'الخدمات' }
];

const Album: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredImages = images.filter(
    img => activeFilter === 'all' || img.category === activeFilter
  );

  return (
    <PageContainer>
      <Container>
        <Title>ألبوم الصور</Title>
        
        <FilterContainer>
          {filters.map(filter => (
            <FilterButton
              key={filter.id}
              active={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </FilterButton>
          ))}
        </FilterContainer>

        <AlbumGrid>
          {filteredImages.map((image, index) => (
            <ImageCard
              key={image.id}
              onClick={() => setSelectedImage(image)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <StyledImage src={image.src} alt={image.alt} />
              <ImageOverlay>
                <h3>{image.title}</h3>
              </ImageOverlay>
            </ImageCard>
          ))}
        </AlbumGrid>

        <AnimatePresence mode="wait">
          {selectedImage && (
            <ModalOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <CloseButton onClick={() => setSelectedImage(null)}>
                <FaTimes />
              </CloseButton>
              <ModalContent
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img src={selectedImage.src} alt={selectedImage.alt} />
              </ModalContent>
            </ModalOverlay>
          )}
        </AnimatePresence>
      </Container>
    </PageContainer>
  );
};

export default Album;
