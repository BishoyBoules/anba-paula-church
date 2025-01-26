import React from 'react';
import styled from 'styled-components';
import { FaCross, FaBook, FaPray, FaChurch } from 'react-icons/fa';
import { motion } from 'framer-motion';

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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0;
  }
`;

const FeatureCard = styled(motion.div)`
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FeatureImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const Icon = styled.div`
  font-size: 2.5rem;
  color: #8B0000;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FeatureTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Features: React.FC = () => {
  const features = [
    {
      icon: <FaCross />,
      title: 'القداسات الإلهية',
      description: 'نقيم القداسات الإلهية يومياً، ونقدم خدمة البث المباشر للقداسات',
      image: '/img/kdasat.jpeg'
    },
    {
      icon: <FaBook />,
      title: 'التربية الكنسية',
      description: 'دروس وفصول للأطفال والشباب لتعليم الإيمان المسيحي والتقاليد القبطية',
      image: '/img/kudas/kudas1.jpg'
    },
    {
      icon: <FaPray />,
      title: 'الخدمات الروحية',
      description: 'اجتماعات روحية للشباب والكبار، وخدمات المشورة الروحية',
      image: '/img/pray.jpeg'
    },
    {
      icon: <FaChurch />,
      title: 'خدمات اجتماعية',
      description: 'مساعدة المحتاجين وزيارة المرضى وخدمة كبار السن',
      image: '/newImgs/Media2.jpeg'
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <FeaturesContainer>
      <Container>
        <Title>خدمات الكنيسة</Title>
        <Grid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <FeatureImage src={feature.image} alt={feature.title} />
              <Icon>{feature.icon}</Icon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </Grid>
      </Container>
    </FeaturesContainer>
  );
};

export default Features;
