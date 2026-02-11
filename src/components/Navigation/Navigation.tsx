import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = styled.nav`
  background: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
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
  z-index: 1001;
  
  @media (max-width: 768px) {
    padding-top: 0.5rem;
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
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: #fff;
    padding: 5rem 1.5rem 1.5rem;
    gap: 1.5rem;
    text-align: center;
    overflow-y: auto;
    z-index: 1000;
  }
`;

const NavItem = styled.li`
  position: relative;

  &:hover .dropdown {
    display: block;
  }

  @media (max-width: 768px) {
    width: 100%;

    &:hover .dropdown {
      display: none;
    }

    &.active .dropdown {
      display: block;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  color: #333;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 0.75rem;
  transition: color 0.3s ease;
  display: block;

  &:hover {
    color: #8B0000;
  }

  &.active {
    color: #8B0000;
  }

  @media (max-width: 768px) {
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
  padding: 0.75rem 0;
  min-width: 250px;
  z-index: 1000;

  @media (max-width: 768px) {
    position: static;
    transform: none;
    box-shadow: none;
    padding: 0.5rem 0;
    margin-top: 0.5rem;
    min-width: 100%;
    background: #f5f5f5;
    border-radius: 0;
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
      background: none;

      &:hover {
        background: none;
      }
    }
  }
`;

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const toggleDropdown = (menu: string) => {
    if (window.innerWidth <= 768) {
      setActiveDropdown(activeDropdown === menu ? null : menu);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <Nav>
      <Container>
        <MenuButton onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>
        <NavMenu $isOpen={isOpen}>
          <NavItem>
            <StyledNavLink to="/" onClick={closeMenu}>
              الرئيسية
            </StyledNavLink>
          </NavItem>
          <NavItem className={activeDropdown === 'about' ? 'active' : ''}>
            <StyledNavLink
              to="/about"
              onClick={() => toggleDropdown('about')}
            >
              عن كنيستنا
            </StyledNavLink>
            <Dropdown className="dropdown">
              <DropdownItem>
                <StyledNavLink to="/about/stpaul" onClick={closeMenu}>
                  الأنبا بولا
                </StyledNavLink>
              </DropdownItem>
              {/* <DropdownItem>
                <StyledNavLink to="/about/history" onClick={closeMenu}>
                  تاريخ الكنيسة
                </StyledNavLink>
              </DropdownItem> */}
              <DropdownItem>
                <StyledNavLink to="/about/fathers" onClick={closeMenu}>
                  أباء الكنيسة
                </StyledNavLink>
              </DropdownItem>
              <DropdownItem>
                <StyledNavLink to="/about/council" onClick={closeMenu}>
                  مجلس الكنيسة
                </StyledNavLink>
              </DropdownItem>
              <DropdownItem>
                <StyledNavLink to="/about/news" onClick={closeMenu}>
                  الأخبار
                </StyledNavLink>
              </DropdownItem>
              <DropdownItem>
                <StyledNavLink to="/about/album" onClick={closeMenu}>
                  ألبوم الصور
                </StyledNavLink>
              </DropdownItem>
            </Dropdown>
          </NavItem>
          <NavItem className={activeDropdown === 'services' ? 'active' : ''}>
            <StyledNavLink
              to="/services"
              onClick={() => toggleDropdown('services')}
            >
              الخدمات
            </StyledNavLink>
            <Dropdown className="dropdown">
              <DropdownItem>
                <StyledNavLink to="/services/education" onClick={closeMenu}>
                  التربية الكنسية
                </StyledNavLink>
              </DropdownItem>
              <DropdownItem>
                <StyledNavLink to="/services/kashafa" onClick={closeMenu}>
                  خدمة الكشافة
                </StyledNavLink>
              </DropdownItem>
              <DropdownItem>
                <StyledNavLink to="/services/abosefen" onClick={closeMenu}>
                  خدمة اخوة الرب
                </StyledNavLink>
              </DropdownItem>
              <DropdownItem>
                <StyledNavLink to="/services/seniors" onClick={closeMenu}>
                  خدمة المسنين
                </StyledNavLink>
              </DropdownItem>
              <DropdownItem>
                <StyledNavLink to="/services/women" onClick={closeMenu}>
                  خدمة السيدات
                </StyledNavLink>
              </DropdownItem>
              <DropdownItem>
                <StyledNavLink to="/services/youth" onClick={closeMenu}>
                  اجتماع الشباب
                </StyledNavLink>
              </DropdownItem>
              <DropdownItem>
                <StyledNavLink to="/services/preparation" onClick={closeMenu}>
                  خدمة اعداد خدام
                </StyledNavLink>
              </DropdownItem>
              <DropdownItem>
                <StyledNavLink to="/services/bible-study" onClick={closeMenu}>
                  اجتماع درس الكتاب
                </StyledNavLink>
              </DropdownItem>
            </Dropdown>
          </NavItem>
          <NavItem className={activeDropdown === 'mass' ? 'active' : ''}>
            <StyledNavLink
              to="/mass/schedule"
            >
              القداسات
            </StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink to="/donations" onClick={closeMenu}>
              التبرعات
            </StyledNavLink>
          </NavItem>
        </NavMenu>
      </Container>
    </Nav>
  );
};

export default Navigation;
