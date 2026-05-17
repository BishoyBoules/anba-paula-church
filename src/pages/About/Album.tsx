import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { getAlbumPhotos, AlbumPhoto } from '../../services/api';

const PageContainer = styled.div`
  padding: 2rem;
  direction: rtl;
`;

const Title = styled.h1`
  color: #8B0000;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterBtn = styled.button<{ active: boolean }>`
  padding: 0.5rem 1.25rem;
  border: 2px solid #8B0000;
  border-radius: 25px;
  background: ${p => p.active ? '#8B0000' : 'white'};
  color: ${p => p.active ? 'white' : '#8B0000'};
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;

  &:hover { background: #8B0000; color: white; }
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const PhotoCard = styled(motion.div)`
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);

  &:hover img { transform: scale(1.05); }
`;

const Photo = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s;
`;

const PhotoTitle = styled.p`
  padding: 0.75rem;
  background: white;
  color: #333;
  font-size: 0.95rem;
  text-align: center;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const LargeImage = styled.img`
  max-width: 90vw;
  max-height: 85vh;
  border-radius: 8px;
  object-fit: contain;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

const Empty = styled.p`
  text-align: center;
  color: #999;
  padding: 3rem;
`;

const Album: React.FC = () => {
  const [photos, setPhotos] = useState<AlbumPhoto[]>([]);
  const [categories, setCategories] = useState<string[]>(['الكل']);
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [selected, setSelected] = useState<AlbumPhoto | null>(null);

  useEffect(() => {
    getAlbumPhotos()
      .then(res => {
        setPhotos(res.data);
        const cats = Array.from(new Set(res.data.map(p => p.category).filter(Boolean)));
        if (cats.length > 0) setCategories(['الكل', ...cats]);
      })
      .catch(() => {});
  }, []);

  const filtered = activeFilter === 'الكل' ? photos : photos.filter(p => p.category === activeFilter);

  return (
    <PageContainer>
      <Title>ألبوم الصور</Title>

      {categories.length > 1 && (
        <FilterContainer>
          {categories.map(cat => (
            <FilterBtn key={cat} active={activeFilter === cat} onClick={() => setActiveFilter(cat)}>
              {cat}
            </FilterBtn>
          ))}
        </FilterContainer>
      )}

      {filtered.length === 0 ? (
        <Empty>لا توجد صور في هذا القسم</Empty>
      ) : (
        <PhotoGrid>
          {filtered.map((photo, i) => (
            <PhotoCard
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(photo)}
            >
              <Photo src={photo.image} alt={photo.title} />
              {photo.title && <PhotoTitle>{photo.title}</PhotoTitle>}
            </PhotoCard>
          ))}
        </PhotoGrid>
      )}

      <AnimatePresence>
        {selected && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <CloseBtn onClick={() => setSelected(null)}><FaTimes /></CloseBtn>
            <LargeImage src={selected.image} alt={selected.title} onClick={e => e.stopPropagation()} />
          </Overlay>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default Album;
