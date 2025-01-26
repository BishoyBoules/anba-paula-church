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
  font-size: 1.2rem;
`;

const CardText = styled.p`
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const Schedule = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const ScheduleItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const Education: React.FC = () => {
  const classes = [
    {
      title: 'فصل حضانة',
      image: '/img/education/kindergarten.jpg',
      description: 'تعليم الأطفال من سن 3-5 سنوات أساسيات الإيمان المسيحي من خلال الألعاب والأنشطة',
      schedule: 'الجمعة 4-6 مساءً'
    },
    {
      title: 'فصل ابتدائي',
      image: '/img/education/primary.jpg',
      description: 'دراسة الكتاب المقدس وحياة القديسين للأطفال من سن 6-12 سنة',
      schedule: 'الجمعة 4-6 مساءً'
    },
    {
      title: 'فصل إعدادي',
      image: '/img/education/middle.jpg',
      description: 'تعميق الفهم الروحي والعقائدي للمراهقين من سن 12-15 سنة',
      schedule: 'الجمعة 6-8 مساءً'
    },
    {
      title: 'فصل ثانوي',
      image: '/img/education/high.jpg',
      description: 'مناقشة القضايا المعاصرة من منظور مسيحي للشباب من سن 15-18 سنة',
      schedule: 'الجمعة 6-8 مساءً'
    }
  ];

  return (
    <PageContainer>
      <Container>
        <Title>التربية الكنسية</Title>
        <Grid>
          {classes.map((classItem, index) => (
            <Card
              key={classItem.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CardImage src={classItem.image} alt={classItem.title} />
              <CardContent>
                <CardTitle>{classItem.title}</CardTitle>
                <CardText>{classItem.description}</CardText>
                <Schedule>
                  <ScheduleItem>
                    <span>موعد الفصل:</span>
                    <span>{classItem.schedule}</span>
                  </ScheduleItem>
                </Schedule>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Container>
    </PageContainer>
  );
};

export default Education;
