import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHandHoldingHeart, FaCreditCard } from 'react-icons/fa';
import { getSettings } from '../../services/api';

const PageContainer = styled.div`
  padding: 2rem;
  direction: rtl;
`;

const HeroSection = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/img/donations-hero.jpg');
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: -2rem -2rem 2rem -2rem;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #D4AF37;
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const SectionTitle = styled.h2`
  color: #8B0000;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const DonationMethodsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const MethodCard = styled(motion.div)`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: #8B0000;
  margin-bottom: 1rem;
`;

const MethodTitle = styled.h3`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const MethodDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const DetailRow = styled.div`
  background: #f9f9f9;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  margin-top: 0.5rem;
  font-family: monospace;
  font-size: 1rem;
  color: #333;
  text-align: right;
`;

const Donations: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    getSettings()
      .then(res => setSettings(res.data))
      .catch(() => {});
  }, []);

  const bankDetails = [
    settings.donation_account_number && `رقم الحساب: ${settings.donation_account_number}`,
    settings.donation_bank_name     && `اسم البنك: ${settings.donation_bank_name}`,
    settings.donation_iban          && `IBAN: ${settings.donation_iban}`,
    settings.donation_swift         && `SWIFT: ${settings.donation_swift}`,
    settings.donation_account_name  && `اسم الحساب: ${settings.donation_account_name}`,
  ].filter(Boolean) as string[];

  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>التبرعات</HeroTitle>
          <HeroDescription>
            "مَغْبُوطٌ هُوَ الْعَطَاءُ أَكْثَرُ مِنَ الأَخْذِ" (أع 20: 35)
          </HeroDescription>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <SectionTitle>طرق التبرع</SectionTitle>
        <DonationMethodsGrid>
          <MethodCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <IconWrapper><FaHandHoldingHeart /></IconWrapper>
            <MethodTitle>التبرع المباشر</MethodTitle>
            <MethodDescription>يمكنك التبرع مباشرة في الكنيسة</MethodDescription>
            <DetailRow>متاح يومياً من 9 صباحاً حتى 5 مساءً</DetailRow>
          </MethodCard>

          {bankDetails.length > 0 && (
            <MethodCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <IconWrapper><FaCreditCard /></IconWrapper>
              <MethodTitle>التحويل البنكي</MethodTitle>
              <MethodDescription>يمكنك التحويل مباشرة إلى حساب الكنيسة</MethodDescription>
              {bankDetails.map((detail, i) => (
                <DetailRow key={i}>{detail}</DetailRow>
              ))}
            </MethodCard>
          )}
        </DonationMethodsGrid>
      </ContentSection>
    </PageContainer>
  );
};

export default Donations;
