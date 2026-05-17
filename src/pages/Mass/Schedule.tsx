import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getMassSchedules, getSettings, MassSchedule } from '../../services/api';

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

const ScheduleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const Thead = styled.thead`
  background: #8B0000;
  color: white;
`;

const Th = styled.th`
  padding: 1rem 1.5rem;
  text-align: right;
  font-size: 1.1rem;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #eee;

  &:last-child { border-bottom: none; }
  &:hover { background: #faf5f5; }
`;

const Td = styled.td`
  padding: 1rem 1.5rem;
  color: #333;
  font-size: 1rem;
`;

const DayCell = styled(Td)`
  color: #8B0000;
  font-weight: bold;
`;

const Note = styled.div`
  background: #fff8e1;
  border-right: 4px solid #D4AF37;
  padding: 1.5rem;
  border-radius: 8px;
  color: #555;
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const LiveSection = styled.div`
  margin-top: 3rem;
  text-align: center;
`;

const LiveTitle = styled.h2`
  color: #8B0000;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const IframeWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const defaultSchedules: MassSchedule[] = [
  { id: 1, day: 'الجمعة', time: '٦:٠٠ - ٨:٠٠ صباحاً', displayOrder: 1, active: true },
  { id: 2, day: 'الجمعة', time: '٨:٠٠ - ١٠:٠٠ صباحاً', displayOrder: 2, active: true },
  { id: 3, day: 'السبت', time: '٦:٠٠ - ٨:٠٠ صباحاً', displayOrder: 3, active: true },
  { id: 4, day: 'السبت', time: '٨:٠٠ - ١٠:٠٠ صباحاً', displayOrder: 4, active: true },
  { id: 5, day: 'الأحد', time: '٦:٠٠ - ٨:٠٠ صباحاً', displayOrder: 5, active: true },
  { id: 6, day: 'الأحد', time: '٨:٠٠ - ١٠:٠٠ صباحاً', displayOrder: 6, active: true },
  { id: 7, day: 'الاثنين إلى الخميس', time: '٩:٠٠ صباحاً - ١٢:٠٠ ظهراً', displayOrder: 7, active: true },
  { id: 8, day: 'الاثنين إلى الخميس', time: '١٢:٠٠ - ٢:٠٠ ظهراً', displayOrder: 8, active: true },
];

const Schedule: React.FC = () => {
  const [schedules, setSchedules] = useState<MassSchedule[]>(defaultSchedules);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [pageTitle, setPageTitle] = useState('مواعيد القداسات');
  const [note, setNote] = useState('في الأعياد والمناسبات الخاصة قد تتغير المواعيد. يرجى متابعة إعلانات الكنيسة.');

  useEffect(() => {
    getMassSchedules()
      .then(res => { if (res.data.length > 0) setSchedules(res.data); })
      .catch(() => {});
    getSettings()
      .then(res => {
        if (res.data.youtube_live_url) setYoutubeUrl(res.data.youtube_live_url);
        if (res.data.schedule_page_title) setPageTitle(res.data.schedule_page_title);
        if (res.data.schedule_note) setNote(res.data.schedule_note);
      })
      .catch(() => {});
  }, []);

  return (
    <PageContainer>
      <Container>
        <Title>{pageTitle}</Title>

        <ScheduleTable>
          <Thead>
            <tr>
              <Th>اليوم</Th>
              <Th>الوقت</Th>
            </tr>
          </Thead>
          <tbody>
            {schedules.map((s, i) => (
              <motion.tr
                key={s.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{ borderBottom: '1px solid #eee' }}
              >
                <DayCell as="td">{s.day}</DayCell>
                <Td>{s.time}</Td>
              </motion.tr>
            ))}
          </tbody>
        </ScheduleTable>

        {note && <Note>{note}</Note>}

        {youtubeUrl && (
          <LiveSection>
            <LiveTitle>بث مباشر</LiveTitle>
            <IframeWrapper>
              <iframe src={youtubeUrl} title="Live Stream" allowFullScreen />
            </IframeWrapper>
          </LiveSection>
        )}
      </Container>
    </PageContainer>
  );
};

export default Schedule;
