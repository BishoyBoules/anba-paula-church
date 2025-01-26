import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSearch, FaBook, FaVideo, FaMusic } from 'react-icons/fa';

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

const SearchBar = styled.div`
  max-width: 600px;
  margin: 0 auto 3rem;
  display: flex;
  gap: 1rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #8B0000;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background: ${props => props.active ? '#8B0000' : '#fff'};
  color: ${props => props.active ? '#fff' : '#333'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const Card = styled(motion.div)`
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const CardMeta = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const CardButton = styled.button`
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

const Library: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const resources = [
    {
      id: 1,
      type: 'book',
      title: 'بستان الرهبان',
      author: 'القديس يوحنا كاسيان',
      image: '/img/library/book1.jpg',
      year: '2020'
    },
    {
      id: 2,
      type: 'video',
      title: 'عظة عن التوبة',
      author: 'أبونا أنطونيوس منير',
      image: '/img/library/video1.jpg',
      year: '2023'
    },
    {
      id: 3,
      type: 'audio',
      title: 'ترانيم روحية',
      author: 'كورال الكنيسة',
      image: '/img/library/audio1.jpg',
      year: '2022'
    },
    // Add more resources as needed
  ];

  const filteredResources = resources.filter(resource => {
    const matchesFilter = activeFilter === 'all' || resource.type === activeFilter;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <PageContainer>
      <Container>
        <Title>المكتبة</Title>
        
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="ابحث عن كتب، فيديوهات، أو ترانيم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>

        <FilterContainer>
          <FilterButton active={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>
            الكل
          </FilterButton>
          <FilterButton active={activeFilter === 'book'} onClick={() => setActiveFilter('book')}>
            <FaBook /> كتب
          </FilterButton>
          <FilterButton active={activeFilter === 'video'} onClick={() => setActiveFilter('video')}>
            <FaVideo /> فيديوهات
          </FilterButton>
          <FilterButton active={activeFilter === 'audio'} onClick={() => setActiveFilter('audio')}>
            <FaMusic /> ترانيم
          </FilterButton>
        </FilterContainer>

        <Grid>
          {filteredResources.map((resource, index) => (
            <Card
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CardImage src={resource.image} alt={resource.title} />
              <CardContent>
                <CardTitle>{resource.title}</CardTitle>
                <CardMeta>{resource.author} • {resource.year}</CardMeta>
                <CardButton>تحميل</CardButton>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Container>
    </PageContainer>
  );
};

export default Library;
