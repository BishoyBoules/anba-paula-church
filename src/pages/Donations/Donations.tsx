import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHandHoldingHeart, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';

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

const AccountDetails = styled.div`
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 5px;
  margin-top: 1rem;
`;

const AccountNumber = styled.p`
  font-family: monospace;
  font-size: 1.2rem;
  color: #333;
  margin: 0.5rem 0;
`;

const Donations: React.FC = () => {
  const donationMethods = [
    {
      id: 1,
      icon: <FaHandHoldingHeart />,
      title: 'التبرع المباشر',
      description: 'يمكنك التبرع مباشرة في الكنيسة',
      details: [
        'متاح يومياً من 9 صباحاً حتى 5 مساءً'
      ]
    },
    {
      id: 2,
      icon: <FaCreditCard />,
      title: 'التحويل البنكي',
      description: 'يمكنك التحويل مباشرة إلى حساب الكنيسة',
      details: [
        'بالمصري: 1383070552561400018',
        'بالدولار: 1383060552561400018',
        'باليورو: 1383170552561401011',
        'اسم البنك: البنك الأهلي',
        'IBAN: EG170003013830705525614000180',
        'اسم الحساب: كنيسة الأنبا بولا'
      ]
    },
    // {
    //   id: 3,
    //   icon: <FaMoneyBillWave />,
    //   title: 'التبرع الشهري',
    //   description: 'اشترك في برنامج التبرع الشهري لدعم أنشطة الكنيسة',
    //   details: [
    //     'تواصل مع مكتب الكنيسة للاشتراك',
    //     'الحد الأدنى: 100 جنيه شهرياً'
    //   ]
    // }
  ];

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
          {donationMethods.map((method) => (
            <MethodCard
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <IconWrapper>{method.icon}</IconWrapper>
              <MethodTitle>{method.title}</MethodTitle>
              <MethodDescription>{method.description}</MethodDescription>
              {method.details.map((detail, index) => (
                <AccountDetails key={index}>{detail}</AccountDetails>
              ))}
            </MethodCard>
          ))}
        </DonationMethodsGrid>
      </ContentSection>
    </PageContainer>
  );
};

export default Donations;
