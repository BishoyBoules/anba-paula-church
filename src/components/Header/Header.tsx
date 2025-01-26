import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background: #3f0101c2;
  padding: 3rem 1rem;
  text-align: center;
  direction: rtl;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  color: white;
  backdrop-filter: blur(5px);

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 2rem;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s ease, filter 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.4));
  }

  @media (max-width: 768px) {
    width: 80px;
    margin-bottom: 0.5rem;
  }
`;

const Title = styled.p`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  color: white;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

const Quote = styled.p`
  font-style: italic;
  font-size: 1.1rem;
  max-width: 500px;
  margin: 0 auto;
  color: #D4AF37;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    line-height: 1.4;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Container>
        <Link to="/">
          <Logo src="/img/st paula logo mid.png" alt="كنيسة الأنبا بولا" />
        </Link>
        <Title>كنيسة الأنبا بولا</Title>
        <Quote>"من يهرب من الضيق يهرب من الله"</Quote>
      </Container>
    </HeaderContainer>
  );
};

export default Header;
