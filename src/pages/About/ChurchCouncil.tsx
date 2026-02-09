import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import sameh from '../../img/board/sameh.jpeg'
import sherif from '../../img/board/sherif.jpeg'
import wageh from '../../img/board/wageh.jpeg'
import magdy from '../../img/board/magdy.jpeg'
import emad from '../../img/board/emad.jpeg'
import engy from '../../img/board/engy.jpeg'
import mina from '../../img/board/mina.jpeg'
import margo from '../../img/board/margo.jpeg'
import soad from '../../img/board/soad.jpeg'

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

const CouncilSection = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  text-align: center;
`;

const MembersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const MemberCard = styled(motion.div)`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const MemberImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const MemberInfo = styled.div`
  padding: 1.5rem;
`;

const MemberName = styled.h3`
  color: #8B0000;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const MemberDescription = styled.p`
  color: #333;
  line-height: 1.6;
`;

const ChurchCouncil: React.FC = () => {
  const councilMembers = [
    {
      id: 1,
      name: 'دكتور مجدي إبراهيم إسكندر',
      image: magdy,
      description: 'رئيس مجلس كنيسة الانبا بولا بأرض الجولف',
    },
    {
      id: 2,
      name: 'مهندس عماد هنري جبره',
      image: emad,
      description: 'عضو الشؤون المالية بمجلس كنيسة الانبا بولا بأرض الجولف',
    },
    {
      id: 3,
      name: 'مهندس وجيه آمين جندي',
      image: wageh,
      description: 'عضو الشؤون الهندسية بمجلس كنيسة الانبا بولا بأرض الجولف',
    },
    {
      id: 4,
      name: 'المستشار سامح مكرم نصيف',
      image: sameh,
      description: 'المحامي بالنقض والدستوربة العليا. رئيس اللجنة القانونية بمجلس كنيسة القديس العظيم الأنبا بولا - أرض الجولف',
    },
    {
      id: 5,
      name: 'دكتور مينا رؤوف فؤاد',
      image: mina,
      description: 'ممثل الشباب بمجلس كنيسة الانبا بولا بأرض الجولف',
    },
    {
      id: 6,
      name: 'استاذ شريف وديع اسعد',
      image: sherif,
      description: 'امين خدمة اجتماع الانبا بولا للشباب والخريجين وعضو الشؤون الإدارية بمجلس الكنيسة',
    },
    {
      id: 7,
      name: 'المهندسة مارجو وليم سعيد',
      image: margo,
      description: 'عضو شؤون المشروعات بمجلس الكنيسة',
    },
    {
      id: 8,
      name: 'استاذة سعاد مرزوق',
      image: soad,
      description: 'عضو شؤون المرأة بمجلس الكنيسة',
    },
    {
      id: 9,
      name: 'استاذة إنجي عاطف صبحي',
      image: engy,
      description: 'عضو الشؤون الإجتماعية بمجلس كنيسة الانبا بولا بأرض الجولف',
    },
  ];

  return (
    <PageContainer>
      <Title>مجلس الكنيسة</Title>

      <CouncilSection>
        <SectionTitle>أعضاء المجلس</SectionTitle>
        <MembersGrid>
          {councilMembers.map((member) => (
            <MemberCard
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MemberImage src={member.image} alt={member.name} />
              <MemberInfo>
                <MemberName>{member.name}</MemberName>
                <MemberDescription>{member.description}</MemberDescription>
              </MemberInfo>
            </MemberCard>
          ))}
        </MembersGrid>
      </CouncilSection>
    </PageContainer>
  );
};

export default ChurchCouncil;
