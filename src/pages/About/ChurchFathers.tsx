import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ftAnton from '../../img/ft-anton.jpeg'
import ftPhilo from '../../img/ft-philo.jpeg'
import ftIbrahim from '../../img/ft-Ibrahim.jpeg'
import ftArmia from '../../img/ft-Armia.jpeg'

const PageContainer = styled.div`
  padding: 2rem;
  direction: rtl;
`;

const HeroSection = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/img/fathers-hero.jpg');
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: -2rem -2rem 2rem -2rem;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #D4AF37;
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  color: #8B0000;
  margin: 3rem 0 2rem;
  text-align: center;
  font-size: 2rem;
`;

const FathersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FatherCard = styled(motion.div)`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FatherImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

const FatherInfo = styled.div`
  padding: 2rem;
  text-align: center;
`;

const FatherName = styled.h3`
  color: #8B0000;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`;

const ChurchFathers: React.FC = () => {
  const fathers = [
    {
      id: 1,
      name: 'القمص إبراهيم توفيق',
      image: ftIbrahim,
    },
    {
      id: 2,
      name: 'القمص أنطونيوس منير',
      image: ftAnton,
    },
    {
      id: 3,
      name: 'القس فيلوباتير رمزي',
      image: ftPhilo,
    },

    {
      id: 4,
      name: 'القس أرميا حلمي',
      image: ftArmia,
    }
  ];

  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>أباء الكنيسة</HeroTitle>
          <HeroDescription>
            أباؤنا الكهنة هم خدام الرب وخدام المذبح المقدس، يقدمون الذبيحة الإلهية ويرعون شعب الله
          </HeroDescription>
        </HeroContent>
      </HeroSection>

      <SectionTitle>أباء كنيسة الأنبا بولا</SectionTitle>
      <FathersGrid>
        {fathers.map((father) => (
          <FatherCard
            key={father.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FatherImage src={father.image} alt={father.name} />
            <FatherInfo>
              <FatherName>{father.name}</FatherName>
            </FatherInfo>
          </FatherCard>
        ))}
      </FathersGrid>
    </PageContainer>
  );
};

export default ChurchFathers;
