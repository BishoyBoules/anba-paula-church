import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSoundcloud, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: #1a1a1a;
  color: white;
  padding: 3rem 1rem;
  direction: rtl;

  @media (max-width: 768px) {
    padding: 2rem 0.5rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Section = styled.div`
  h3 {
    color: #D4AF37;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    justify-content: center;
  }

  svg {
    color: #D4AF37;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #D4AF37;
  }
`;

const QuickLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const QuickLink = styled(Link)`
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #D4AF37;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  color: #888;

  @media (max-width: 768px) {
    margin-top: 2rem;
    padding-top: 1rem;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Container>
        <Grid>
          <Section>
            <h3>تواصل معنا</h3>
            <ContactInfo>
              <ContactItem>
                <FaMapMarkerAlt />
                <span>أرض الجولف، القاهرة</span>
              </ContactItem>
              <ContactItem>
                <FaPhone />
                <span>+20 xxx xxx xxxx</span>
              </ContactItem>
              <ContactItem>
                <FaEnvelope />
                <span>info@anbapaulachurch.com</span>
              </ContactItem>
            </ContactInfo>
            <SocialLinks>
              <SocialLink
                href="https://www.youtube.com/channel/UC4k_Tq45EqB6_VlLfO_Nh_A"
                target="_blank"
                aria-label="Visit our YouTube channel"
              >
                <FaYoutube />
              </SocialLink>
              <SocialLink href="https://soundcloud.com/user-587199843" target="_blank">
                <FaSoundcloud />
              </SocialLink>
            </SocialLinks>
          </Section>

          <Section>
            <h3>روابط سريعة</h3>
            <QuickLinks>
              <li><QuickLink to="/">الصفحة الرئيسية</QuickLink></li>
              <li><QuickLink to="/about">عن كنيستنا</QuickLink></li>
              <li><QuickLink to="/services">خدمات الكنيسة</QuickLink></li>
              <li><QuickLink to="/mass">القداسات</QuickLink></li>
            </QuickLinks>
          </Section>

          <Section>
            <h3>مواعيد الخدمة</h3>
            <QuickLinks>
              <li><QuickLink to="/services/bible-study">درس الكتاب</QuickLink>: السبت 7:00 - 9:00 مساءاً</li>
              <li><QuickLink to="/services/youth">اجتماع الشباب</QuickLink>: الخميس 7:30 - 9:30 مساءاً</li>
              <li><QuickLink to="/services/education">مدارس الاحد</QuickLink>: الجمعة 10:00 - 1:00 صباحاً</li>
              <li><QuickLink to="/services/kashafa">الكشافة</QuickLink>: الأربع 7:30 -9:30 مساءاً</li>
              <li><QuickLink to="/services/abosefen">خدمة اخوة الرب</QuickLink>: الجمعة 7:30 - 9:30 مساءاً</li>
              <li><QuickLink to="/services/women">خدمة سيدات</QuickLink>: الاثنين 6:00 - 8:00 مساءاً</li>
            </QuickLinks>
          </Section>
        </Grid>

        <Copyright>
          جميع الحقوق محفوظة © {new Date().getFullYear()} كنيسة الأنبا بولا - أرض الجولف
        </Copyright>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
