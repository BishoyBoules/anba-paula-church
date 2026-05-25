import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getSettings, saveSettings, uploadImage } from '../../services/api';
import { FaArrowRight, FaSave } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem;
  direction: rtl;
  min-height: 80vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #8B0000;
`;

const Title = styled.h1`
  color: #8B0000;
  font-size: 2rem;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #666;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.3s;
  &:hover { background: #555; }
`;

const SectionCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #8B0000;
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #333;
  font-weight: 500;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  &:focus { outline: none; border-color: #8B0000; }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  &:focus { outline: none; border-color: #8B0000; }
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 2rem;
  background: #8B0000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s;
  &:hover { background: #3f0101; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const SuccessMsg = styled.p`
  color: #4CAF50;
  font-size: 1rem;
  margin-top: 0.5rem;
`;

const ImagePreview = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 0.5rem;
`;

const defaultSettings: Record<string, string> = {
  church_name: '',
  church_subtitle: '',
  church_quote: '',
  logo_url: '',
  phone1: '',
  phone2: '',
  maps_url: '',
  youtube_url: '',
  soundcloud_url: '',
  facebook_url: '',
  youtube_live_url: '',
  schedule_page_title: '',
  schedule_note: '',
  donation_bank_name: '',
  donation_account_name: '',
  donation_account_number: '',
  donation_iban: '',
  donation_swift: '',
};

const ManageSettings: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, string>>(defaultSettings);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  useEffect(() => {
    getSettings()
      .then(res => setSettings({ ...defaultSettings, ...res.data }))
      .catch(() => {});
  }, []);

  const set = (key: string, value: string) =>
    setSettings(prev => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);
    try {
      let logoUrl = settings.logo_url;
      if (logoFile) {
        logoUrl = await uploadImage(logoFile);
        set('logo_url', logoUrl);
      }
      await saveSettings({ ...settings, logo_url: logoUrl });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('حدث خطأ أثناء حفظ الإعدادات');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <Title>إعدادات الموقع</Title>
        <BackButton to="/admin/dashboard"><FaArrowRight /> العودة</BackButton>
      </Header>

      <SectionCard>
        <SectionTitle>معلومات الكنيسة</SectionTitle>
        <FormGrid>
          <FormGroup>
            <Label>اسم الكنيسة</Label>
            <Input value={settings.church_name} onChange={e => set('church_name', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>العنوان الفرعي</Label>
            <Input value={settings.church_subtitle} onChange={e => set('church_subtitle', e.target.value)} />
          </FormGroup>
          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <Label>الاقتباس / الشعار</Label>
            <TextArea value={settings.church_quote} onChange={e => set('church_quote', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>شعار الكنيسة (صورة)</Label>
            <Input type="file" accept="image/*" onChange={e => setLogoFile(e.target.files?.[0] || null)} />
            {settings.logo_url && !logoFile && <ImagePreview src={settings.logo_url} alt="logo" />}
          </FormGroup>
        </FormGrid>
      </SectionCard>

      <SectionCard>
        <SectionTitle>بيانات التواصل والموقع</SectionTitle>
        <FormGrid>
          <FormGroup>
            <Label>رقم الهاتف الأول</Label>
            <Input value={settings.phone1} onChange={e => set('phone1', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>رقم الهاتف الثاني</Label>
            <Input value={settings.phone2} onChange={e => set('phone2', e.target.value)} />
          </FormGroup>
          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <Label>رابط الخريطة (Google Maps embed URL)</Label>
            <Input value={settings.maps_url} onChange={e => set('maps_url', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionCard>

      <SectionCard>
        <SectionTitle>روابط التواصل الاجتماعي والبث</SectionTitle>
        <FormGrid>
          <FormGroup>
            <Label>رابط YouTube</Label>
            <Input value={settings.youtube_url} onChange={e => set('youtube_url', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>رابط SoundCloud</Label>
            <Input value={settings.soundcloud_url} onChange={e => set('soundcloud_url', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>رابط Facebook</Label>
            <Input value={settings.facebook_url} onChange={e => set('facebook_url', e.target.value)} placeholder="https://www.facebook.com/..." />
          </FormGroup>
          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <Label>رابط البث المباشر (يمكن لصق رابط YouTube العادي أو رابط embed)</Label>
            <Input value={settings.youtube_live_url} onChange={e => set('youtube_live_url', e.target.value)} placeholder="https://www.youtube.com/watch?v=... أو https://www.youtube.com/embed/..." />
          </FormGroup>
        </FormGrid>
      </SectionCard>

      <SectionCard>
        <SectionTitle>صفحة مواعيد القداسات</SectionTitle>
        <FormGrid>
          <FormGroup>
            <Label>عنوان الصفحة</Label>
            <Input value={settings.schedule_page_title} onChange={e => set('schedule_page_title', e.target.value)} />
          </FormGroup>
          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <Label>ملاحظة المواعيد</Label>
            <TextArea value={settings.schedule_note} onChange={e => set('schedule_note', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionCard>

      <SectionCard>
        <SectionTitle>بيانات التبرعات والحساب البنكي</SectionTitle>
        <FormGrid>
          <FormGroup>
            <Label>اسم البنك</Label>
            <Input value={settings.donation_bank_name} onChange={e => set('donation_bank_name', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>اسم الحساب</Label>
            <Input value={settings.donation_account_name} onChange={e => set('donation_account_name', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>رقم الحساب</Label>
            <Input value={settings.donation_account_number} onChange={e => set('donation_account_number', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>IBAN</Label>
            <Input value={settings.donation_iban} onChange={e => set('donation_iban', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>SWIFT Code</Label>
            <Input value={settings.donation_swift} onChange={e => set('donation_swift', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionCard>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <SaveButton onClick={handleSave} disabled={loading}>
          <FaSave /> {loading ? 'جاري الحفظ...' : 'حفظ جميع الإعدادات'}
        </SaveButton>
        {saved && <SuccessMsg>تم الحفظ بنجاح!</SuccessMsg>}
      </div>
    </Container>
  );
};

export default ManageSettings;
