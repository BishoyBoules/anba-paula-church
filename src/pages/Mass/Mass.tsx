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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled(motion.div)`
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  color: #8B0000;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const CardText = styled.p`
  line-height: 1.6;
  margin-bottom: 1rem;
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

const Mass: React.FC = () => {
  const massInfo = [
    {
      title: 'القداس الإلهي',
      image: '/img/mass/liturgy.jpg',
      description: 'القداس الإلهي هو سر الأسرار وقمة العبادة في الكنيسة القبطية الأرثوذكسية. يتم فيه تقديم ذبيحة الإفخارستيا.'
    },
    {
      title: 'رفع بخور عشية وباكر',
      image: '/img/mass/incense.jpg',
      description: 'صلوات رفع البخور هي صلوات تسبيح وتمجيد لله، تقام في المساء وفي الصباح الباكر.'
    },
    {
      title: 'التسبحة',
      image: '/img/mass/praise.jpg',
      description: 'التسبحة هي مجموعة من الألحان والتراتيل الروحية التي تقدم تسبيحاً لله على مدار السنة الطقسية.'
    }
  ];

  return (
    <PageContainer>
      <Container>
        <Title>القداسات والصلوات</Title>
        <Grid>
          {massInfo.map((item, index) => (
            <Card
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CardImage src={item.image} alt={item.title} />
              <CardContent>
                <CardTitle>{item.title}</CardTitle>
                <CardText>{item.description}</CardText>
              </CardContent>
            </Card>
          ))}
        </Grid>

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
      </Container>
    </PageContainer>
  );
};

export default Mass;
