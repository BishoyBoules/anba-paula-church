import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const MemberName = styled.h3`
  color: #8B0000;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
`;

const MemberRole = styled.p`
  color: #666;
  font-style: italic;
  margin-bottom: 1rem;
`;

const MemberDescription = styled.p`
  color: #333;
  line-height: 1.6;
`;

const ChurchCouncil: React.FC = () => {
  const councilMembers = [
    {
      id: 1,
      name: 'الشماس مينا حنا',
      role: 'أمين المجلس',
      description: 'يخدم في المجلس منذ عام ٢٠١٥',
    },
    {
      id: 2,
      name: 'الشماس جورج إبراهيم',
      role: 'أمين الصندوق',
      description: 'يخدم في المجلس منذ عام ٢٠١٨',
    },
    // Add more council members as needed
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
              <MemberName>{member.name}</MemberName>
              <MemberRole>{member.role}</MemberRole>
              <MemberDescription>{member.description}</MemberDescription>
            </MemberCard>
          ))}
        </MembersGrid>
      </CouncilSection>
    </PageContainer>
  );
};

export default ChurchCouncil;
