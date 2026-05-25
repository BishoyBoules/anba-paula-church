import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import NewsSlider from '../components/NewsSlider/NewsSlider';
import NewsTicker from '../components/NewsTicker/NewsTicker';
import { getAlbumPhotos, getSettings, AlbumPhoto } from '../services/api';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
`;

const LiveBanner = styled.div`
  background: linear-gradient(135deg, #8B0000, #3f0101);
  color: white;
  direction: rtl;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: filter 0.2s;
  flex-wrap: wrap;

  &:hover { filter: brightness(1.15); }

  @media (max-width: 480px) {
    gap: 0.75rem;
    padding: 0.75rem 1rem;
  }
`;

const LiveDot = styled.span`
  width: 12px;
  height: 12px;
  background: #ff4444;
  border-radius: 50%;
  display: inline-block;
  animation: ${pulse} 1.4s ease-in-out infinite;
  flex-shrink: 0;
`;

const LiveText = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.03em;

  @media (max-width: 480px) { font-size: 0.95rem; }
`;

const WatchBtn = styled.span`
  background: white;
  color: #8B0000;
  padding: 0.4rem 1.1rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.95rem;
  white-space: nowrap;
`;

const LiveModal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
`;

const LiveModalBox = styled.div`
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  max-width: 860px;
  position: relative;
`;

const LiveModalHeader = styled.div`
  background: #1a1a1a;
  color: white;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  direction: rtl;
`;

const CloseModalBtn = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  &:hover { color: #ff4444; }
`;

const IframeWrap = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;

  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const AlbumSection = styled.section`
  padding: 4rem 1rem;
  background: #fff;
  direction: rtl;
`;

const SectionHeader = styled.div`
  max-width: 1200px;
  margin: 0 auto 2rem;
`;

const SectionTitle = styled.h2`
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

const ViewAllLink = styled(Link)`
  color: #8B0000;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  white-space: nowrap;
  &:hover { text-decoration: underline; }
`;

const CategoriesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const CategoryCard = styled.div`
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  box-shadow: 0 4px 14px rgba(0,0,0,0.12);
  aspect-ratio: 4/3;

  &:hover img { transform: scale(1.06); }
  &:hover .overlay { background: rgba(0,0,0,0.45); }
`;

const CoverPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.35s ease;
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.3);
  transition: background 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
`;

const CategoryName = styled.h3`
  color: white;
  font-size: 1.2rem;
  text-align: center;
  text-shadow: 0 2px 6px rgba(0,0,0,0.6);
  margin: 0 0 0.3rem;
`;

const PhotoCount = styled.span`
  color: rgba(255,255,255,0.85);
  font-size: 0.85rem;
`;

/* ── Lightbox ── */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalBox = styled.div`
  background: white;
  border-radius: 16px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ModalImage = styled.img`
  width: 100%;
  max-height: 70vh;
  object-fit: contain;
  display: block;
  background: #f5f5f5;
`;

const ModalFooter = styled.div`
  padding: 0.75rem 1rem;
  text-align: center;
  color: #555;
  font-size: 0.9rem;
  border-top: 1px solid #eee;
  direction: rtl;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: rgba(0,0,0,0.5);
  border: none;
  color: white;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  font-size: 1.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  &:hover { background: #8B0000; }
`;

const NavArrow = styled.button<{ side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${p => p.side}: 0.5rem;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.45);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  &:hover { background: #8B0000; }
`;

type Album = { category: string; photos: AlbumPhoto[] };

const toEmbedUrl = (url: string): string => {
  if (!url) return '';
  if (url.includes('/embed/')) return url;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : '';
};

const Home: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [lightbox, setLightbox] = useState<{ photos: AlbumPhoto[]; index: number; title: string } | null>(null);
  const [liveUrl, setLiveUrl] = useState('');
  const [rawLiveUrl, setRawLiveUrl] = useState('');
  const [showLive, setShowLive] = useState(false);

  useEffect(() => {
    getSettings()
      .then(res => {
        const raw = res.data.youtube_live_url;
        if (raw) {
          setRawLiveUrl(raw);
          setLiveUrl(toEmbedUrl(raw));
        }
      })
      .catch(() => {});
  }, []);

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

  const openAlbum = (album: Album) => {
    setLightbox({ photos: album.photos, index: 0, title: album.category });
  };

  const prev = useCallback(() => {
    if (!lightbox) return;
    setLightbox({ ...lightbox, index: (lightbox.index - 1 + lightbox.photos.length) % lightbox.photos.length });
  }, [lightbox]);

  const next = useCallback(() => {
    if (!lightbox) return;
    setLightbox({ ...lightbox, index: (lightbox.index + 1) % lightbox.photos.length });
  }, [lightbox]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === 'ArrowLeft') next();
      if (e.key === 'ArrowRight') prev();
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, prev, next]);

  const current = lightbox ? lightbox.photos[lightbox.index] : null;

  return (
    <>
      {rawLiveUrl && (
        <LiveBanner onClick={() => setShowLive(true)}>
          <LiveDot />
          <LiveText>بث مباشر الآن</LiveText>
          <WatchBtn>مشاهدة البث المباشر</WatchBtn>
        </LiveBanner>
      )}

      <NewsSlider />

      {albums.length > 0 && (
        <AlbumSection>
          <SectionHeader>
            <SectionTitle>معرض الصور</SectionTitle>
            <ViewAllLink to="/about/album">عرض الكل</ViewAllLink>
          </SectionHeader>

          <CategoriesGrid>
            {albums.map(album => (
              <CategoryCard key={album.category} onClick={() => openAlbum(album)}>
                <CoverPhoto src={album.photos[0].image} alt={album.category} />
                <CardOverlay className="overlay">
                  <CategoryName>{album.category}</CategoryName>
                  <PhotoCount>{album.photos.length} صورة</PhotoCount>
                </CardOverlay>
              </CategoryCard>
            ))}
          </CategoriesGrid>
        </AlbumSection>
      )}

      <NewsTicker />

      {lightbox && current && (
        <Overlay onClick={() => setLightbox(null)}>
          <ModalBox onClick={e => e.stopPropagation()}>
            <CloseBtn onClick={() => setLightbox(null)}>×</CloseBtn>

            {lightbox.photos.length > 1 && (
              <>
                <NavArrow side="left" onClick={next}>›</NavArrow>
                <NavArrow side="right" onClick={prev}>‹</NavArrow>
              </>
            )}

            <ModalImage src={current.image} alt={current.title} />

            <ModalFooter>
              <span style={{ fontWeight: 600, color: '#8B0000' }}>{lightbox.title}</span>
              {current.title && <span>{current.title}</span>}
              <span style={{ color: '#aaa', fontSize: '0.82rem' }}>
                {lightbox.index + 1} / {lightbox.photos.length}
              </span>
            </ModalFooter>
          </ModalBox>
        </Overlay>
      )}

      {showLive && rawLiveUrl && (
        <LiveModal onClick={() => setShowLive(false)}>
          <LiveModalBox onClick={e => e.stopPropagation()}>
            <LiveModalHeader>
              <span style={{ fontWeight: 700 }}>البث المباشر</span>
              <CloseModalBtn onClick={() => setShowLive(false)}>×</CloseModalBtn>
            </LiveModalHeader>
            {liveUrl ? (
              <IframeWrap>
                <iframe src={liveUrl} title="Live Stream" allowFullScreen allow="autoplay; encrypted-media" />
              </IframeWrap>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p style={{ color: '#ccc', marginBottom: '1.5rem', direction: 'rtl' }}>
                  انقر لمشاهدة البث المباشر على يوتيوب
                </p>
                <a
                  href={rawLiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#ff0000',
                    color: 'white',
                    padding: '0.75rem 2rem',
                    borderRadius: '24px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                  }}
                >
                  ▶ فتح على يوتيوب
                </a>
              </div>
            )}
          </LiveModalBox>
        </LiveModal>
      )}
    </>
  );
};

export default Home;
