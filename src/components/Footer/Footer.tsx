import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSoundcloud, FaYoutube, FaFacebook, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { getSettings, getMassSchedules, MassSchedule } from '../../services/api';

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

  svg { color: #D4AF37; }
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

  &:hover { color: #D4AF37; }
`;

const QuickLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover { color: #D4AF37; }
`;

const ScheduleItem = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.25rem 0;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
    gap: 0;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  color: #888;
`;

const defaultSettings = {
  phone1: '0224146674',
  phone2: '0224181070',
  maps_url: 'https://maps.app.goo.gl/n9ifZ77nuL23egoq6?g_st=aw',
  youtube_url: 'https://www.youtube.com/channel/UC4k_Tq45EqB6_VlLfO_Nh_A',
  soundcloud_url: 'https://soundcloud.com/user-587199843',
  facebook_url: '',
  church_name: 'كنيسة الأنبا بولا - أرض الجولف',
};

const defaultSchedules: MassSchedule[] = [
  { id: 1, day: 'الجمعة', time: '٦:٠٠ - ٨:٠٠ صباحاً', displayOrder: 1, active: true },
  { id: 2, day: 'السبت', time: '٦:٠٠ - ٨:٠٠ صباحاً', displayOrder: 2, active: true },
  { id: 3, day: 'الأحد', time: '٦:٠٠ - ٨:٠٠ صباحاً', displayOrder: 3, active: true },
  { id: 4, day: 'الاثنين - الخميس', time: '٩:٠٠ - ١٢:٠٠ ظهراً', displayOrder: 4, active: true },
];

const Footer: React.FC = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [schedules, setSchedules] = useState<MassSchedule[]>(defaultSchedules);

  useEffect(() => {
    getSettings()
      .then(res => setSettings({ ...defaultSettings, ...res.data }))
      .catch(() => {});
    getMassSchedules()
      .then(res => { if (res.data.length > 0) setSchedules(res.data); })
      .catch(() => {});
  }, []);

  return (
    <FooterContainer>
      <Container>
        <Grid>
          <Section>
            <h3>تواصل معنا</h3>
            <ContactInfo>
              <ContactItem>
                <FaMapMarkerAlt />
                <a href={settings.maps_url} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'white', textDecoration: 'underline' }}>
                  الموقع
                </a>
              </ContactItem>
              <ContactItem>
                <FaPhone />
                <a href={`tel:${settings.phone1}`} style={{ color: 'white' }}>{settings.phone1}</a>
                {settings.phone2 && <a href={`tel:${settings.phone2}`} style={{ color: 'white' }}>{settings.phone2}</a>}
              </ContactItem>
            </ContactInfo>
            <SocialLinks>
              {settings.youtube_url && (
                <SocialLink href={settings.youtube_url} target="_blank" aria-label="YouTube">
                  <FaYoutube />
                </SocialLink>
              )}
              {settings.soundcloud_url && (
                <SocialLink href={settings.soundcloud_url} target="_blank" aria-label="SoundCloud">
                  <FaSoundcloud />
                </SocialLink>
              )}
              {settings.facebook_url && (
                <SocialLink href={settings.facebook_url} target="_blank" aria-label="Facebook">
                  <FaFacebook />
                </SocialLink>
              )}
            </SocialLinks>
          </Section>

          <Section>
            <h3>روابط سريعة</h3>
            <QuickLinks>
              <li><StyledLink to="/">الصفحة الرئيسية</StyledLink></li>
              <li><StyledLink to="/about">عن كنيستنا</StyledLink></li>
              <li><StyledLink to="/services">خدمات الكنيسة</StyledLink></li>
              <li><StyledLink to="/mass/schedule">القداسات</StyledLink></li>
              <li><StyledLink to="/donations">التبرعات</StyledLink></li>
            </QuickLinks>
          </Section>

          <Section>
            <h3>مواعيد القداسات</h3>
            <QuickLinks>
              {schedules.map(s => (
                <ScheduleItem key={s.id}>
                  <span style={{ color: '#D4AF37' }}>{s.day}</span>
                  <span>{s.time}</span>
                </ScheduleItem>
              ))}
            </QuickLinks>
          </Section>
        </Grid>

        <Copyright>
          جميع الحقوق محفوظة © {new Date().getFullYear()} {settings.church_name}
        </Copyright>
        <p style={{ textAlign: 'center', color: '#888' }}>
          تصميم وتطوير بواسطة{' '}
          <a href="https://bishoy-boules.vercel.app/" target="_blank" rel="noopener noreferrer"
            style={{ color: '#D4AF37' }}>Bishoy</a>
        </p>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
