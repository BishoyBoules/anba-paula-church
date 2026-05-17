import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getChurchServiceBySlug, ChurchService } from '../../services/api';

const PageContainer = styled.div`
  direction: rtl;
`;

const Banner = styled.div<{ image: string }>`
  background: linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),
              url('${p => p.image}') center/cover no-repeat;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  margin: -2rem -1rem 0;
`;

const BannerTitle = styled.h1`
  font-size: 2.8rem;
  color: #D4AF37;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Content = styled.div`
  max-width: 900px;
  margin: 3rem auto;
  padding: 0 1rem;
`;

const InfoCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  padding: 2rem;
  margin-bottom: 2rem;
  border-right: 5px solid #8B0000;
`;

const InfoRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InfoLabel = styled.span`
  color: #8B0000;
  font-weight: bold;
  min-width: 120px;
`;

const InfoValue = styled.span`
  color: #333;
  line-height: 1.6;
`;

const Description = styled.p`
  color: #444;
  line-height: 1.9;
  font-size: 1.1rem;
  white-space: pre-wrap;
`;

const defaults: Record<string, Partial<ChurchService>> = {
  youth:       { name: 'اجتماع الشباب', schedule: 'الخميس 7:30 - 9:30 مساءً', supervisor: 'تحت رعاية ابونا انطونيوس', bannerImage: '/img/abo-sefen.jpg' },
  seniors:     { name: 'خدمة المسنين', schedule: 'الأربعاء 7:30 - 9:30 مساءً', supervisor: 'تحت رعاية ابونا إبراهيم', bannerImage: '/img/services/seniors-hero.jpg' },
  women:       { name: 'خدمة السيدات', schedule: 'الاثنين 6:00 - 8:00 مساءً', supervisor: 'تحت رعاية ابونا إبراهيم', bannerImage: '/img/women/banner.jpg' },
  kashafa:     { name: 'خدمة كشافة الأنبا بولا', schedule: 'الأربعاء 7:30 - 9:30 مساءً', supervisor: 'تحت رعاية ابونا إبراهيم', bannerImage: '/img/women/banner.jpg' },
  abosefen:    { name: 'خدمة ابو سيفين لاخوة الرب', schedule: 'الجمعة 7:30 - 9:30 مساءً', supervisor: 'تحت رعاية ابونا فيلوباتير', bannerImage: '/img/abo-sefen.jpg' },
  'bible-study': { name: 'درس الكتاب المقدس', schedule: 'السبت 7:00 - 8:00 مساءً', supervisor: 'تحت رعاية ابونا إرميا', bannerImage: '/img/women/banner.jpg' },
  preparation: { name: 'خدمة إعداد خدام', schedule: 'الجمعة 11:00 صباحاً - 1:00 ظهراً', supervisor: 'تحت رعاية ابونا إرميا حلمي', bannerImage: '/img/women/banner.jpg' },
  school:      { name: 'مدرسة الشمامسة', schedule: 'الجمعة 12:30 - 1:00 ظهراً', supervisor: 'تحت رعاية ابونا إرميا حلمي', bannerImage: '/img/women/banner.jpg' },
  random:      { name: 'خدمة المناطق العشوائية', schedule: 'السبت الثالث من كل شهر 9:30 صباحاً - 1:00 ظهراً', supervisor: 'تحت رعاية ابونا إرميا حلمي', bannerImage: '/img/women/banner.jpg' },
};

const ServicePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Partial<ChurchService> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    getChurchServiceBySlug(slug)
      .then(res => setService(res.data))
      .catch(() => setService(defaults[slug] || null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <PageContainer style={{ padding: '4rem', textAlign: 'center' }}>جاري التحميل...</PageContainer>;
  if (!service) return <PageContainer style={{ padding: '4rem', textAlign: 'center' }}>الصفحة غير موجودة</PageContainer>;

  return (
    <PageContainer>
      <Banner image={service.bannerImage || '/img/women/banner.jpg'}>
        <BannerTitle>{service.name}</BannerTitle>
      </Banner>

      <Content>
        <InfoCard>
          {service.schedule && (
            <InfoRow>
              <InfoLabel>الموعد:</InfoLabel>
              <InfoValue>{service.schedule}</InfoValue>
            </InfoRow>
          )}
          {service.supervisor && (
            <InfoRow>
              <InfoLabel>الإشراف:</InfoLabel>
              <InfoValue>{service.supervisor}</InfoValue>
            </InfoRow>
          )}
        </InfoCard>

        {service.description && <Description>{service.description}</Description>}
        {service.extraContent && <Description style={{ marginTop: '1rem' }}>{service.extraContent}</Description>}
      </Content>
    </PageContainer>
  );
};

export default ServicePage;
