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

const ScheduleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const DayCard = styled(motion.div)`
  background: #fff;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const DayTitle = styled.h3`
  color: #8B0000;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-align: center;
`;

const TimeSlot = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const Time = styled.p`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #666;
`;

const Note = styled.div`
  margin-top: 3rem;
  padding: 1.5rem;
  background: #fff3cd;
  border-radius: 10px;
  text-align: center;
  
  p {
    color: #856404;
    margin: 0;
  }
`;

const Schedule: React.FC = () => {
  const massSchedule = [
    {
      day: 'الأحد',
      times: [
        { time: '6:00 - 8:00 صباحاً', description: 'القداس الأول' },
        { time: '8:00 - 10:00 صباحاً', description: 'القداس الثاني' }
      ]
    },
    {
      day: 'الجمعة',
      times: [
        { time: '6:00 - 8:00 صباحاً', description: 'القداس الأول' },
        { time: '8:00 - 10:00 صباحاً', description: 'القداس الثاني' }
      ]
    },
    {
      day: 'السبت',
      times: [
        { time: '6:00 - 8:00 صباحاً', description: 'القداس الأول' },
        { time: '8:00 - 10:00 صباحاً', description: 'القداس الثاني' }
      ]
    },
    {
      day: 'الاتنين الي الخميس',
      times: [
        { time: '6:00 - 8:00 صباحاً', description: '' }
      ]
    }
  ];

  return (
    <PageContainer>
      <Container>
        <Title>مواعيد القداسات</Title>
        <ScheduleContainer>
          {massSchedule.map((day, index) => (
            <DayCard
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <DayTitle>{day.day}</DayTitle>
              {day.times.map((slot, slotIndex) => (
                <TimeSlot key={slotIndex}>
                  <Time>{slot.time}</Time>
                  <Description>{slot.description}</Description>
                </TimeSlot>
              ))}
            </DayCard>
          ))}
        </ScheduleContainer>
        <Note>
          <p>* في الأعياد والمناسبات الخاصة قد تتغير المواعيد. يرجى متابعة إعلانات الكنيسة.</p>
        </Note>
      </Container>
    </PageContainer>
  );
};

export default Schedule;
