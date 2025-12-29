import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ftAnton from '../../img/ft-anton.jpeg'
import ftPhilo from '../../img/ft-philo.jpeg'

const FathersSection = styled.section`
  padding: 4rem 0;
  background: #f9f9f9;
  direction: rtl;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SectionTitle = styled.h2`
  color: #8B0000;
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2rem;
  
  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: #D4AF37;
    margin: 1rem auto;
  }
`;

const FathersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FatherCard = styled(motion.div)`
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
`;

const FatherImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const FatherContent = styled.div`
  padding: 1.5rem;
`;

const FatherName = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const FatherDate = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const Fathers: React.FC = () => {
  const fathers = [
    {
      id: 1,
      name: 'القمص أنطونيوس منير',
      date: 'تاريخ الرسامة 6/1997',
      image: ftAnton
    },
    {
      id: 2,
      name: 'القس فيلوباتير رمزي',
      date: 'تاريخ الرسامة 8/2002',
      image: ftPhilo
    },
    {
      id: 3,
      name: 'القس أرميا حلمي',
      date: 'تاريخ الرسامة 3/2008',
      image: '/img/Fathers/Armia2.jpeg'
    }
  ];

  return (
    <FathersSection>
      <Container>
        <SectionTitle>أباء الكنيسة</SectionTitle>
        <FathersGrid>
          {fathers.map((father) => (
            <FatherCard
              key={father.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FatherImage src={father.image} alt={father.name} />
              <FatherContent>
                <FatherName>{father.name}</FatherName>
                <FatherDate>{father.date}</FatherDate>
              </FatherContent>
            </FatherCard>
          ))}
        </FathersGrid>
      </Container>
    </FathersSection>
  );
};

export default Fathers;
