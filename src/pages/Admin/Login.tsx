import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

const LoginContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #8B0000 0%, #3f0101 100%);
  direction: rtl;
`;

const LoginCard = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  margin: 2rem;
`;

const Title = styled.h1`
  color: #8B0000;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #8B0000;
  }
`;

const Button = styled.button`
  padding: 1rem;
  background: #8B0000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #3f0101;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c00;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #fcc;
`;

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/admin/dashboard');
        } catch (err: any) {
            setError('فشل تسجيل الدخول. يرجى التحقق من البريد الإلكتروني وكلمة المرور.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginContainer>
            <LoginCard>
                <Title>تسجيل دخول المسؤول</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>البريد الإلكتروني</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="admin@example.com"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>كلمة المرور</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </FormGroup>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                    </Button>
                </Form>
            </LoginCard>
        </LoginContainer>
    );
};

export default Login;
