import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { FaNewspaper, FaUsers, FaCalendarAlt, FaImages, FaSignOutAlt } from 'react-icons/fa';

const DashboardContainer = styled.div`
  min-height: 80vh;
  padding: 2rem;
  direction: rtl;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #8B0000;
`;

const Title = styled.h1`
  color: #8B0000;
  font-size: 2.5rem;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #8B0000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #3f0101;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled(Link)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  color: #8B0000;
`;

const CardTitle = styled.h2`
  color: #333;
  font-size: 1.5rem;
  text-align: center;
`;

const CardDescription = styled.p`
  color: #666;
  text-align: center;
  line-height: 1.6;
`;

const WelcomeMessage = styled.div`
  background: linear-gradient(135deg, #8B0000 0%, #3f0101 100%);
  color: white;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  text-align: center;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

const Dashboard: React.FC = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/admin/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <DashboardContainer>
            <Header>
                <Title>لوحة التحكم</Title>
                <LogoutButton onClick={handleLogout}>
                    <FaSignOutAlt />
                    تسجيل الخروج
                </LogoutButton>
            </Header>

            <WelcomeMessage>
                <h2>مرحباً بك في لوحة التحكم</h2>
                <p>يمكنك من هنا إدارة محتوى موقع كنيسة الأنبا بولا</p>
            </WelcomeMessage>

            <CardsGrid>
                <Card to="/admin/news">
                    <CardIcon>
                        <FaNewspaper />
                    </CardIcon>
                    <CardTitle>إدارة الأخبار</CardTitle>
                    <CardDescription>
                        إضافة وتعديل وحذف أخبار الكنيسة
                    </CardDescription>
                </Card>

                <Card to="/admin/fathers">
                    <CardIcon>
                        <FaUsers />
                    </CardIcon>
                    <CardTitle>إدارة أباء الكنيسة</CardTitle>
                    <CardDescription>
                        إضافة وتعديل معلومات أباء الكنيسة
                    </CardDescription>
                </Card>

                <Card to="/admin/events">
                    <CardIcon>
                        <FaCalendarAlt />
                    </CardIcon>
                    <CardTitle>إدارة الفعاليات</CardTitle>
                    <CardDescription>
                        إضافة وتعديل فعاليات وأنشطة الكنيسة
                    </CardDescription>
                </Card>

                <Card to="/admin/gallery">
                    <CardIcon>
                        <FaImages />
                    </CardIcon>
                    <CardTitle>إدارة الصور</CardTitle>
                    <CardDescription>
                        إضافة وتنظيم صور الكنيسة والفعاليات
                    </CardDescription>
                </Card>
            </CardsGrid>
        </DashboardContainer>
    );
};

export default Dashboard;
