import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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

const FatherRole = styled.h4`
  color: #666;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const FatherDescription = styled.p`
  color: #333;
  line-height: 1.6;
`;

const ChurchFathers: React.FC = () => {
  const fathers = [
    {
      id: 1,
      name: 'نيافة الحبر الجليل الأنبا دانيال',
      role: 'أسقف المعادي وسكرتير المجمع المقدس',
      image: '/img/fathers/bishop-daniel.jpg',
      description: 'نيافة الأنبا دانيال هو أسقف المعادي وسكرتير المجمع المقدس للكنيسة القبطية الأرثوذكسية.',
    },
    {
      id: 2,
      name: 'القمص أغاثون الأنبا بولا',
      role: 'كاهن كنيسة الأنبا بولا',
      image: '/img/fathers/father-agathon.jpg',
      description: 'القمص أغاثون الأنبا بولا هو كاهن كنيسة الأنبا بولا بأرض الجولف.',
    },
    {
      id: 3,
      name: 'القس بيشوي الأنبا بولا',
      role: 'كاهن كنيسة الأنبا بولا',
      image: '/img/fathers/father-bishoy.jpg',
      description: 'القس بيشوي الأنبا بولا هو كاهن كنيسة الأنبا بولا بأرض الجولف.',
    },
    {
      id: 4,
      name: 'القس يوحنا الأنبا بولا',
      role: 'كاهن كنيسة الأنبا بولا',
      image: '/img/fathers/father-youhanna.jpg',
      description: 'القس يوحنا الأنبا بولا هو كاهن كنيسة الأنبا بولا بأرض الجولف.',
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
              <FatherRole>{father.role}</FatherRole>
              <FatherDescription>{father.description}</FatherDescription>
            </FatherInfo>
          </FatherCard>
        ))}
      </FathersGrid>
    </PageContainer>
  );
};

export default ChurchFathers;
