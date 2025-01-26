import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBible, FaHeart, FaHandsHelping, FaGraduationCap } from 'react-icons/fa';

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

const Banner = styled.div`
  position: relative;
  height: 400px;
  margin-bottom: 4rem;
  border-radius: 15px;
  overflow: hidden;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BannerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 2rem;
`;

const BannerTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const BannerText = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  line-height: 1.6;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ServiceCard = styled(motion.div)`
  background: #fff;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const ServiceIcon = styled.div`
  font-size: 2.5rem;
  color: #8B0000;
  margin-bottom: 1rem;
`;

const ServiceTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const ServiceText = styled.p`
  color: #666;
  line-height: 1.6;
`;

const EventsSection = styled.div`
  margin-bottom: 4rem;
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const EventCard = styled(motion.div)`
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const EventImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const EventContent = styled.div`
  padding: 1.5rem;
`;

const EventTitle = styled.h3`
  color: #8B0000;
  margin-bottom: 1rem;
`;

const EventDate = styled.p`
  color: #666;
  margin-bottom: 0.5rem;
`;

const EventDescription = styled.p`
  color: #333;
  line-height: 1.6;
`;

const ContactSection = styled.div`
  text-align: center;
  background: #fff;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const ContactTitle = styled.h3`
  color: #8B0000;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const ContactButton = styled.button`
  background: #8B0000;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #660000;
  }
`;

const Women: React.FC = () => {
  const services = [
    {
      icon: <FaBible />,
      title: 'دراسة الكتاب المقدس',
      description: 'دراسة عميقة للكتاب المقدس وتطبيقاته في الحياة اليومية'
    },
    {
      icon: <FaHeart />,
      title: 'خدمة اجتماعية',
      description: 'مساعدة المحتاجين وزيارة المرضى والمسنين'
    },
    {
      icon: <FaHandsHelping />,
      title: 'دعم نفسي',
      description: 'جلسات إرشاد ودعم نفسي للسيدات'
    },
    {
      icon: <FaGraduationCap />,
      title: 'تنمية مهارات',
      description: 'ورش عمل لتنمية المهارات الحياتية والمهنية'
    }
  ];

  const events = [
    {
      title: 'مؤتمر السيدات السنوي',
      date: '١٥-١٧ فبراير ٢٠٢٥',
      image: '/img/women/conference.jpg',
      description: 'مؤتمر روحي خاص بالسيدات يتناول موضوع "المرأة في الكتاب المقدس"'
    },
    {
      title: 'ورشة عمل المهارات الأسرية',
      date: '٢٥ فبراير ٢٠٢٥',
      image: '/img/women/workshop.jpg',
      description: 'ورشة عمل لتنمية المهارات الأسرية والتربوية'
    },
    {
      title: 'يوم خدمة المجتمع',
      date: '١٠ مارس ٢٠٢٥',
      image: '/img/women/service.jpg',
      description: 'يوم مخصص لخدمة المجتمع المحيط بالكنيسة'
    }
  ];

  return (
    <PageContainer>
      <Container>
        <Banner>
          <BannerImage src="/img/women/banner.jpg" alt="خدمة السيدات" />
          <BannerOverlay>
            <BannerTitle>خدمة السيدات</BannerTitle>
            <BannerText>
              نسعى لتمكين السيدات روحياً واجتماعياً من خلال برامج متنوعة تلبي احتياجاتهن
            </BannerText>
          </BannerOverlay>
        </Banner>

        <Title>خدماتنا</Title>
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceText>{service.description}</ServiceText>
            </ServiceCard>
          ))}
        </ServicesGrid>

        <EventsSection>
          <Title>الأحداث القادمة</Title>
          <EventsGrid>
            {events.map((event, index) => (
              <EventCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <EventImage src={event.image} alt={event.title} />
                <EventContent>
                  <EventTitle>{event.title}</EventTitle>
                  <EventDate>{event.date}</EventDate>
                  <EventDescription>{event.description}</EventDescription>
                </EventContent>
              </EventCard>
            ))}
          </EventsGrid>
        </EventsSection>

        <ContactSection>
          <ContactTitle>هل تريدين المشاركة في الخدمة؟</ContactTitle>
          <ContactButton>تواصلي معنا</ContactButton>
        </ContactSection>
      </Container>
    </PageContainer>
  );
};

export default Women;
