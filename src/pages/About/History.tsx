import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  
  &::after {
    content: '';
    position: absolute;
    width: 4px;
    background-color: #D4AF37;
    top: 0;
    bottom: 0;
    right: 50%;
    margin-right: -2px;
  }
`;

const TimelineItem = styled(motion.div)`
  padding: 10px 40px;
  position: relative;
  width: 50%;
  
  &:nth-child(odd) {
    right: 0;
    
    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      right: -10px;
      background-color: #8B0000;
      border: 4px solid #D4AF37;
      top: 15px;
      border-radius: 50%;
      z-index: 1;
    }
  }
  
  &:nth-child(even) {
    right: 50%;
    
    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      right: -10px;
      background-color: #8B0000;
      border: 4px solid #D4AF37;
      top: 15px;
      border-radius: 50%;
      z-index: 1;
    }
  }
`;

const TimelineContent = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const Year = styled.h3`
  color: #8B0000;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  line-height: 1.6;
`;

const History: React.FC = () => {
  const timelineEvents = [
    {
      year: '1975',
      description: 'تأسيس كنيسة الأنبا بولا في منطقة أرض الجولف'
    },
    {
      year: '1980',
      description: 'بناء مبنى الكنيسة الرئيسي وتكريسه'
    },
    {
      year: '1990',
      description: 'إضافة قاعة المناسبات ومركز الخدمات'
    },
    {
      year: '2000',
      description: 'توسعة مبنى الكنيسة وإضافة الطابق الثاني'
    },
    {
      year: '2010',
      description: 'تجديد المذبح الرئيسي وإضافة الأيقونات الجديدة'
    },
    {
      year: '2020',
      description: 'بدء مشروع مبنى الخدمات الجديد'
    }
  ];

  return (
    <PageContainer>
      <Container>
        <Title>تاريخ كنيستنا</Title>
        <Timeline>
          {timelineEvents.map((event, index) => (
            <TimelineItem
              key={event.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <TimelineContent>
                <Year>{event.year}</Year>
                <Description>{event.description}</Description>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </PageContainer>
  );
};

export default History;
