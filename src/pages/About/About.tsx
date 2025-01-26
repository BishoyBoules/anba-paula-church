import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  padding: 2rem;
  direction: rtl;
`;

const Title = styled.h1`
  color: #8B0000;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  font-size: 1.1rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #3f0101;
  margin-bottom: 1rem;
  font-size: 1.8rem;
`;

const About: React.FC = () => {
  return (
    <AboutContainer>
      <Title>عن كنيستنا</Title>
      <Content>
        <Section>
          <SectionTitle>تاريخ الكنيسة</SectionTitle>
          <p>
            تأسست كنيسة الأنبا بولا في عام ١٩٩٥، وهي تخدم المجتمع القبطي في المنطقة منذ ذلك الحين.
            الكنيسة مكرسة على اسم القديس العظيم الأنبا بولا، أول السواح.
          </p>
        </Section>

        <Section>
          <SectionTitle>رسالتنا</SectionTitle>
          <p>
            نسعى لنشر تعاليم المسيح وخدمة المجتمع من خلال التعليم الروحي والخدمات الاجتماعية.
            نؤمن بأهمية بناء مجتمع مسيحي قوي يعيش وفقاً لتعاليم الإنجيل.
          </p>
        </Section>

        <Section>
          <SectionTitle>قيمنا</SectionTitle>
          <p>
            نؤمن بالمحبة والخدمة والتواضع كقيم أساسية في حياتنا المسيحية.
            نسعى لتقديم القدوة الحسنة من خلال السلوك المسيحي والخدمة المتفانية.
          </p>
        </Section>

        <Section>
          <SectionTitle>مواعيد القداسات</SectionTitle>
          <p>
            يقام القداس الإلهي كل يوم أحد الساعة ٨ صباحاً
            كما تقام قداسات خاصة في المناسبات والأعياد الكنسية
          </p>
        </Section>
      </Content>
    </AboutContainer>
  );
};

export default About;
