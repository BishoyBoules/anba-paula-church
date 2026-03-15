import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ServicesContainer = styled.div`
  padding: 2rem;
  direction: rtl;
`;

const Title = styled.h1`
  color: #8B0000;
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ServiceCard = styled(motion.div)`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ServiceLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const ServiceIcon = styled.div`
  font-size: 2.5rem;
  color: #8B0000;
  margin-bottom: 1rem;
`;

const ServiceTitle = styled.h3`
  color: #3f0101;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ServiceDescription = styled.p`
  color: #333;
  line-height: 1.6;
`;


const Services: React.FC = () => {
  const services = [
    {
      id: 1,
      title: 'القداس الإلهي',
      description: 'قداس أسبوعي يقام كل يوم أحد',
      link: '/mass/schedule',
      icon: '🕊️'
    },
    {
      id: 2,
      title: 'مدارس الأحد',
      description: 'تعليم الأطفال والشباب مبادئ الإيمان المسيحي',
      link: '/services/education',
      icon: '📚'
    },
    {
      id: 3,
      title: 'اجتماع الشباب',
      description: 'لقاء أسبوعي للشباب للدراسة والتأمل في الكتاب المقدس',
      link: '/services/youth',
      icon: '👥'
    },
    {
      id: 4,
      title: 'خدمة ابو سيفين لاخوة الرب',
      description: 'الاهتمام باخوة الرب وتقديم المساعدة لهم',
      link: '/services/abosefen',
      icon: '🏥'
    },
    {
      id: 5,
      title: 'درس الكتاب',
      description: 'دراسة وتأمل في الكتاب المقدس',
      link: '/services/bible-study',
      icon: '📖'
    },
    {
      id: 6,
      title: 'خدمة المسنين',
      description: 'رعاية وخدمة كبار السن في المجتمع',
      link: '/services/seniors',
      icon: '🤝'
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <ServicesContainer>
      <Title>الخدمات</Title>
      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceLink key={service.id} to={service.link} onClick={() => window.scrollTo(0, 0)}>
            <ServiceCard
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceCard>
          </ServiceLink>
        ))}
      </ServicesGrid>
    </ServicesContainer>
  );
};

export default Services;
