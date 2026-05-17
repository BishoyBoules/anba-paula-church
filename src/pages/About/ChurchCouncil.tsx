import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getCouncilMembers, CouncilMember } from '../../services/api';
import sameh from '../../img/board/sameh.jpeg';
import sherif from '../../img/board/sherif.jpeg';
import wageh from '../../img/board/wageh.jpeg';
import magdy from '../../img/board/magdy.jpeg';
import emad from '../../img/board/emad.jpeg';
import engy from '../../img/board/engy.jpeg';
import mina from '../../img/board/mina.jpeg';
import margo from '../../img/board/margo.jpeg';
import soad from '../../img/board/soad.jpeg';

const PageContainer = styled.div`
  padding: 2rem;
  direction: rtl;
`;

const Title = styled.h1`
  color: #8B0000;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2.5rem;
`;

const SectionTitle = styled.h2`
  color: #8B0000;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const MemberCard = styled(motion.div)`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s;

  &:hover { transform: translateY(-5px); }
`;

const MemberImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const MemberInfo = styled.div`
  padding: 1.5rem;
`;

const MemberName = styled.h3`
  color: #8B0000;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const MemberRole = styled.p`
  color: #666;
  font-size: 0.95rem;
`;

const defaultMembers: CouncilMember[] = [
  { id: 1, name: 'دكتور مجدي إبراهيم إسكندر', role: 'رئيس مجلس الكنيسة', image: magdy, displayOrder: 1 },
  { id: 2, name: 'مهندس عماد هنري جبره', role: 'الشؤون المالية', image: emad, displayOrder: 2 },
  { id: 3, name: 'مهندس وجيه آمين جندي', role: 'الشؤون الهندسية', image: wageh, displayOrder: 3 },
  { id: 4, name: 'المستشار سامح مكرم نصيف', role: 'رئيس لجنة القانونية', image: sameh, displayOrder: 4 },
  { id: 5, name: 'دكتور مينا رؤوف فؤاد', role: 'ممثل الشباب', image: mina, displayOrder: 5 },
  { id: 6, name: 'استاذ شريف وديع اسعد', role: 'منسق خدمة الشباب', image: sherif, displayOrder: 6 },
  { id: 7, name: 'المهندسة مارجو وليم سعيد', role: 'شؤون المشاريع', image: margo, displayOrder: 7 },
  { id: 8, name: 'استاذة سعاد مرزوق', role: 'شؤون السيدات', image: soad, displayOrder: 8 },
  { id: 9, name: 'استاذة إنجي عاطف صبحي', role: 'الشؤون الاجتماعية', image: engy, displayOrder: 9 },
];

const ChurchCouncil: React.FC = () => {
  const [members, setMembers] = useState<CouncilMember[]>(defaultMembers);

  useEffect(() => {
    getCouncilMembers()
      .then(res => { if (res.data.length > 0) setMembers(res.data); })
      .catch(() => {});
  }, []);

  return (
    <PageContainer>
      <Title>مجلس الكنيسة</Title>
      <SectionTitle>أعضاء المجلس</SectionTitle>
      <Grid>
        {members.map((member, i) => (
          <MemberCard
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <MemberImage src={member.image} alt={member.name} />
            <MemberInfo>
              <MemberName>{member.name}</MemberName>
              <MemberRole>{member.role}</MemberRole>
            </MemberInfo>
          </MemberCard>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default ChurchCouncil;
