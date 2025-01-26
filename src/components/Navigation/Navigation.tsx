import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = styled.nav`
  background: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #8B0000;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 768px) {
    display: block;
  }
`;

interface NavMenuProps {
  $isOpen: boolean;
}

const NavMenu = styled.ul<NavMenuProps>`
  display: flex;
  gap: 3rem;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    background: #fff;
    padding: 1.2rem 0;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    gap: 1rem;
    text-align: center;
  }
`;

const NavItem = styled.li`
  position: relative;
  padding: 0.8rem 0;

  &:hover .dropdown {
    display: block;
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: #333;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 0.75rem;
  transition: color 0.3s ease;

  &:hover {
    color: #8B0000;
  }

  &.active {
    color: #8B0000;
  }

  @media (max-width: 768px) {
    display: block;
    padding: 0.75rem 0;
    font-size: 1.3rem;
  }
`;

const Dropdown = styled.ul`
  display: none;
  position: absolute;
  top: 100%;
  right: 50%;
  transform: translateX(50%);
  background: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 5px;
  padding: 0.5rem 0;
  min-width: 250px;
  z-index: 1000;

  @media (max-width: 768px) {
    position: static;
    transform: none;
    box-shadow: none;
    padding: 0.5rem 0;
    display: block;
    min-width: 100%;
  }
`;

const DropdownItem = styled.li`
  list-style: none;

  a {
    display: block;
    padding: 0.75rem 1.5rem;
    color: #333;
    text-decoration: none;
    transition: background 0.3s ease;
    font-size: 1.1rem;

    &:hover {
      background: #f5f5f5;
      color: #8B0000;
    }
  }

  @media (max-width: 768px) {
    a {
      padding: 0.75rem 0;
      font-size: 1.2rem;
    }
  }
`;

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav>
      <Container>
        <MenuButton onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>
        <NavMenu $isOpen={isOpen}>
          <NavItem>
            <StyledNavLink to="/">الرئيسية</StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink to="/about">عن كنيستنا</StyledNavLink>
            <Dropdown className="dropdown">
              <DropdownItem>
                <StyledNavLink to="/about/stpaul">الأنبا بولا</StyledNavLink>
              </DropdownItem>
              <DropdownItem>
                <StyledNavLink to="/about/history">تاريخ الكنيسة</StyledNavLink>
              </DropdownItem>
              <DropdownItem>
                <StyledNavLink to="/about/news">الأخبار</StyledNavLink>
              </DropdownItem>
              <DropdownItem>
                <StyledNavLink to="/about/album">ألبوم الصور</StyledNavLink>
              </DropdownItem>
            </Dropdown>
          </NavItem>
          <NavItem>
            <StyledNavLink to="/mass">القداسات</StyledNavLink>
            <Dropdown className="dropdown">
              <DropdownItem>
                <StyledNavLink to="/mass/schedule">مواعيد القداسات</StyledNavLink>
              </DropdownItem>
            </Dropdown>
          </NavItem>
          <NavItem>
            <StyledNavLink to="/services">الخدمات</StyledNavLink>
            <Dropdown className="dropdown">
              <DropdownItem>
                <StyledNavLink to="/services/education">التربية الكنسية</StyledNavLink>
              </DropdownItem>
              <DropdownItem>
                <StyledNavLink to="/services/seniors">خدمة المسنين</StyledNavLink>
              </DropdownItem>
              <DropdownItem>
                <StyledNavLink to="/services/women">خدمة السيدات</StyledNavLink>
              </DropdownItem>
            </Dropdown>
          </NavItem>
          <NavItem>
            <StyledNavLink to="/library">المكتبة</StyledNavLink>
          </NavItem>
        </NavMenu>
      </Container>
    </Nav>
  );
};

export default Navigation;
