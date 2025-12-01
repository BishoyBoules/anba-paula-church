import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const FeaturesContainer = styled.section`
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    padding: 0;
  }
`;

const GalleryCard = styled(motion.div)`
  cursor: pointer;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    border-radius: 10px;
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  display: block;
`;

const ImageOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(139,0,0,0.7));
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${GalleryCard}:hover & {
    opacity: 1;
  }
`;

const ImageTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ModalImage = styled(motion.img)`
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: #8B0000;

  &:hover {
    background: #8B0000;
    color: white;
    transform: rotate(90deg);
  }

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
  }
`;

const Features: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

  const galleryImages = [
    { src: '/img/kdasat.jpeg', title: 'القداسات الإلهية' },
    { src: '/img/pray.jpeg', title: 'الصلاة' },
    { src: '/img/Album/11.jpeg', title: 'ألبوم الكنيسة' },
    { src: '/img/Album/21.jpeg', title: 'فعاليات الكنيسة' },
    { src: '/img/Album/31.jpeg', title: 'احتفالات' },
    { src: '/img/Album/41.jpeg', title: 'الخدمات' },
    { src: '/img/proc1.jpeg', title: 'مسيرة' },
    { src: '/img/proc2.jpeg', title: 'مسيرة الكنيسة' },
    { src: '/img/Album/51.jpeg', title: 'الأنشطة' },
    { src: '/img/Album/61.jpeg', title: 'التجمعات' },
    { src: '/img/proc3.jpeg', title: 'الاحتفالات' },
    { src: '/img/Album/71.jpeg', title: 'العبادة' },
    { src: '/img/Album/81.jpeg', title: 'الخدمة' },
    { src: '/img/proc4.jpeg', title: 'مسيرة الإيمان' },
    { src: '/img/proc5.jpeg', title: 'المسيرة' },
    { src: '/img/Album/Comos 1.jpg', title: 'القموص' },
  ];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const imageVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    exit: { scale: 0.5, opacity: 0 }
  };

  return (
    <FeaturesContainer>
      <Container>
        <Title>Gallery</Title>
        <Grid>
          {galleryImages.map((image, index) => (
            <GalleryCard
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.05 * index }}
              onClick={() => setSelectedImage(image)}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.95 }}
            >
              <GalleryImage src={image.src} alt={image.title} />
              <ImageOverlay>
                <ImageTitle>{image.title}</ImageTitle>
              </ImageOverlay>
            </GalleryCard>
          ))}
        </Grid>
      </Container>

      <AnimatePresence>
        {selectedImage && (
          <Modal
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedImage(null)}
          >
            <CloseButton onClick={() => setSelectedImage(null)}>
              ×
            </CloseButton>
            <ModalImage
              src={selectedImage.src}
              alt={selectedImage.title}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            />
          </Modal>
        )}
      </AnimatePresence>
    </FeaturesContainer>
  );
};

export default Features;
