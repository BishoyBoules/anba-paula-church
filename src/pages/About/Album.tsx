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
  gap: 1.5rem;
`;

const ImageCard = styled(motion.div)`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  height: 250px;

  &:hover img {
    transform: scale(1.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  position: relative;
  max-width: 90%;
  max-height: 90vh;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -2rem;
  right: -2rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button<{ active: boolean }>`
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

const Album: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const images = [
    {
      id: 1,
      src: '/img/album/mass1.jpg',
      title: 'القداس الإلهي',
      category: 'liturgy'
    },
    {
      id: 2,
      src: '/img/album/event1.jpg',
      title: 'مؤتمر الشباب',
      category: 'events'
    },
    {
      id: 3,
      src: '/img/album/trip1.jpg',
      title: 'رحلة العائلات',
      category: 'trips'
    },
    {
      id: 4,
      src: '/img/album/service1.jpg',
      title: 'خدمة المسنين',
      category: 'service'
    },
    // Add more images as needed
  ];

  const filteredImages = images.filter(
    img => activeFilter === 'all' || img.category === activeFilter
  );

  return (
    <PageContainer>
      <Container>
        <Title>ألبوم الصور</Title>
        
        <FilterContainer>
          <FilterButton 
            active={activeFilter === 'all'} 
            onClick={() => setActiveFilter('all')}
          >
            الكل
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'liturgy'} 
            onClick={() => setActiveFilter('liturgy')}
          >
            القداسات
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'events'} 
            onClick={() => setActiveFilter('events')}
          >
            المؤتمرات
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'trips'} 
            onClick={() => setActiveFilter('trips')}
          >
            الرحلات
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'service'} 
            onClick={() => setActiveFilter('service')}
          >
            الخدمات
          </FilterButton>
        </FilterContainer>

        <AlbumGrid>
          {filteredImages.map((image, index) => (
            <ImageCard
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedImage(image.src)}
            >
              <Image src={image.src} alt={image.title} />
              <ImageOverlay>
                <h3>{image.title}</h3>
              </ImageOverlay>
            </ImageCard>
          ))}
        </AlbumGrid>

        <AnimatePresence>
          {selectedImage && (
            <Modal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <ModalContent
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={e => e.stopPropagation()}
              >
                <CloseButton onClick={() => setSelectedImage(null)}>
                  <FaTimes />
                </CloseButton>
                <ModalImage src={selectedImage} alt="Selected" />
              </ModalContent>
            </Modal>
          )}
        </AnimatePresence>
      </Container>
    </PageContainer>
  );
};

export default Album;
