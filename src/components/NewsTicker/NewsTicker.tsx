import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { getTicker } from '../../services/api';

const scroll = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const TickerContainer = styled.div`
  background: linear-gradient(90deg, #8B0000 0%, #660000 100%);
  color: white;
  padding: 1rem 0;
  overflow: hidden;
  position: relative;
  direction: rtl;

  @media (max-width: 768px) {
    padding: 0.75rem 0;
  }
`;

const TickerWrapper = styled.div`
  display: flex;
  white-space: nowrap;
  animation: ${scroll} 30s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const Item = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0 3rem;
  font-size: 1.1rem;
  font-weight: 500;

  &::before {
    content: '★';
    margin-left: 1rem;
    color: #D4AF37;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 2rem;
  }
`;

const defaults = [
  'مواعيد القداسات: الجمعة والسبت والأحد - ابتداءً من الساعة 6 صباحاً',
  'اجتماع الشباب: كل يوم جمعة الساعة 7 مساءً',
  'مدارس الأحد: كل يوم جمعة الساعة 10 صباحاً',
  'درس الكتاب: كل يوم سبت الساعة 7 مساءً',
];

const NewsTicker: React.FC = () => {
  const [items, setItems] = useState<string[]>(defaults);

  useEffect(() => {
    getTicker()
      .then(res => { if (res.data.length > 0) setItems(res.data.map(t => t.content)); })
      .catch(() => {});
  }, []);

  return (
    <TickerContainer>
      <TickerWrapper>
        {[...items, ...items].map((item, i) => (
          <Item key={i}>{item}</Item>
        ))}
      </TickerWrapper>
    </TickerContainer>
  );
};

export default NewsTicker;
