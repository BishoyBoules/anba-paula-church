import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
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

const AlbumSection = styled.div`
  margin-bottom: 3rem;
`;

const AlbumTitle = styled.h2`
  color: #8B0000;
  font-size: 1.6rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #8B0000;
`;

const SliderWrapper = styled.div`
  position: relative;
`;

const SliderTrack = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0.5rem 0;
  direction: rtl;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const PhotoCard = styled(motion.div)`
  flex: 0 0 240px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  &:hover img { transform: scale(1.05); }
`;

const Photo = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 0.3s;
  display: block;
`;

const PhotoTitle = styled.p`
  padding: 0.6rem;
  background: white;
  color: #333;
  font-size: 0.9rem;
  text-align: center;
`;

const NavBtn = styled.button<{ side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${p => p.side}: -15px;
  transform: translateY(-50%);
  background: #8B0000;
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  &:hover { background: #3f0101; }
  @media (max-width: 768px) { display: none; }
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

type GroupedAlbum = { category: string; photos: AlbumPhoto[] };

const AlbumTrack: React.FC<{ photos: AlbumPhoto[]; onSelect: (p: AlbumPhoto) => void }> = ({ photos, onSelect }) => {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => {
    if (ref.current) ref.current.scrollBy({ left: dir === 'right' ? 260 : -260, behavior: 'smooth' });
  };
  return (
    <SliderWrapper>
      <NavBtn side="right" onClick={() => scroll('right')}>‹</NavBtn>
      <SliderTrack ref={ref}>
        {photos.map((photo, i) => (
          <PhotoCard key={photo.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} onClick={() => onSelect(photo)}>
            <Photo src={photo.image} alt={photo.title} />
            {photo.title && <PhotoTitle>{photo.title}</PhotoTitle>}
          </PhotoCard>
        ))}
      </SliderTrack>
      <NavBtn side="left" onClick={() => scroll('left')}>›</NavBtn>
    </SliderWrapper>
  );
};

const Album: React.FC = () => {
  const [albums, setAlbums] = useState<GroupedAlbum[]>([]);
  const [selected, setSelected] = useState<AlbumPhoto | null>(null);

  useEffect(() => {
    getAlbumPhotos()
      .then(res => {
        const map = new Map<string, AlbumPhoto[]>();
        res.data.forEach(p => {
          const cat = p.category || 'عام';
          if (!map.has(cat)) map.set(cat, []);
          map.get(cat)!.push(p);
        });
        setAlbums(Array.from(map.entries()).map(([category, photos]) => ({ category, photos })));
      })
      .catch(() => { });
  }, []);

  return (
    <PageContainer>
      <Title>ألبوم الصور</Title>

      {albums.length === 0 ? (
        <Empty>لا توجد صور بعد</Empty>
      ) : (
        albums.map(album => (
          <AlbumSection key={album.category}>
            <AlbumTitle>{album.category}</AlbumTitle>
            <AlbumTrack photos={album.photos} onSelect={setSelected} />
          </AlbumSection>
        ))
      )}

      <AnimatePresence>
        {selected && (
          <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <CloseBtn onClick={() => setSelected(null)}><FaTimes /></CloseBtn>
            <LargeImage src={selected.image} alt={selected.title} onClick={e => e.stopPropagation()} />
          </Overlay>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default Album;
