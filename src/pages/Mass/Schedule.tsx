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

const LiveSection = styled.div`
  margin-top: 4rem;
  text-align: center;
`;

const LiveTitle = styled.h2`
  color: #8B0000;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const LiveFrame = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Schedule: React.FC = () => {
  const massSchedule = [
    {
      day: 'الجمعة',
      times: [
        { time: '6:00 - 8:00 صباحاً', description: 'القداس الأول' },
        { time: '8:00 - 10:00 صباحاً', description: 'القداس الثاني' },
        { time: '12:00 - 2:00 ظهراً', description: 'القداس الثالث' }
      ]
    },
    {
      day: 'السبت والأحد',
      times: [
        { time: '6:00 - 8:00 صباحاً', description: 'القداس الأول' },
        { time: '8:00 - 10:00 صباحاً', description: 'القداس الثاني' }
      ]
    },
    {
      day: 'الاتنين الي الخميس',
      times: [
        { time: '9:00 - 12:00 صباحاً', description: 'القداس الأول' },
        { time: '12:00 - 2:00 ظهراً', description: 'القداس الثاني' }
      ]
    }
  ];

  return (
    <PageContainer>
      <Container>
        <Title>مواعيد القداسات في ايام الصوم الكبير</Title>
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
      <LiveSection>
        <LiveTitle>البث المباشر للقداس</LiveTitle>
        <LiveFrame>
          <iframe
            src="https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID"
            title="بث مباشر للقداس"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </LiveFrame>
      </LiveSection>
    </PageContainer>
  );
};

export default Schedule;
