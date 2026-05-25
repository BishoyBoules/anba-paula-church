import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getChurchServices, ChurchService } from '../../services/api';

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

const ServiceTitle = styled.h3`
  color: #3f0101;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ServiceDescription = styled.p`
  color: #333;
  line-height: 1.6;
`;

const Empty = styled.p`
  text-align: center;
  color: #999;
  padding: 3rem;
`;

const Services: React.FC = () => {
  const [services, setServices] = useState<ChurchService[]>([]);

  useEffect(() => {
    getChurchServices()
      .then(res => setServices(res.data.filter(s => s.active).sort((a, b) => a.displayOrder - b.displayOrder)))
      .catch(() => {});
  }, []);

  return (
    <ServicesContainer>
      <Title>الخدمات</Title>
      {services.length === 0 ? (
        <Empty>جاري التحميل...</Empty>
      ) : (
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceLink key={service.id} to={`/services/${service.slug}`} onClick={() => window.scrollTo(0, 0)}>
              <ServiceCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceTitle>{service.name}</ServiceTitle>
                {service.schedule && <ServiceDescription>{service.schedule}</ServiceDescription>}
              </ServiceCard>
            </ServiceLink>
          ))}
        </ServicesGrid>
      )}
    </ServicesContainer>
  );
};

export default Services;
