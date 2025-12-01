import React from 'react';
import styled from 'styled-components';

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
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const Text = styled.div`
  line-height: 1.8;
  font-size: 1.1rem;

  h2 {
    color: #8B0000;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
  }
`;

const StPaul: React.FC = () => {
  return (
    <PageContainer>
      <Container>
        <Title>القديس العظيم الأنبا بولا أول السواح</Title>
        <Content>
          <Image src="/img/603_nsmaller.jpg" alt="القديس الأنبا بولا" />
          <Text>
            <h2>سيرة القديس الأنبا بولا</h2>
            <p>
              ولد القديس الأنبا بولا في مدينة الإسكندرية سنة 228م من أبوين مسيحيين غنيين، وكان له أخ أكبر منه.
              تعلم العلوم المسيحية واليونانية، وكان محباً للكنيسة منذ صغره.
            </p>
            <p>
              عندما بلغ من العمر 16 سنة مات والداه وتركا له ميراثاً كبيراً. وفي أيام الاضطهاد الذي أثاره دقلديانوس سنة 250م،
              هرب إلى البرية خوفاً من أخيه الذي أراد أن يبلغ عنه للوالي ليأخذ ميراثه.
            </p>
            <p>
              وجد مغارة بجوار عين ماء ونخلة، فسكن فيها وكان يأكل من ثمر النخلة ويلبس من ليفها ويشرب من الماء.
              وظل على هذه الحال 90 سنة لم ير فيها وجه إنسان.
            </p>
            <h2>لقاؤه بالقديس أنطونيوس</h2>
            <p>
              في سنة 341م، أعلن الله للقديس أنطونيوس الكبير عن وجود الأنبا بولا في البرية، فذهب إليه والتقى به،
              وتحدثا معاً عن عجائب الله. وفي اليوم التالي تنيح الأنبا بولا، فكفنه القديس أنطونيوس ودفنه بمعونة أسدين جاءا من البرية.
            </p>
          </Text>
        </Content>
      </Container>
    </PageContainer>
  );
};

export default StPaul;
