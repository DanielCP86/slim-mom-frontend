import { NavLinkStyled, Thumb } from './NavMenuModal.styled';

export const NavMenuModal = ({ handleMenuOpen }) => {
  return (
    <Thumb>
      <NavLinkStyled to="/diary" onClick={() => handleMenuOpen(false)}>
        Diary
      </NavLinkStyled>

      <NavLinkStyled to="/calculator" onClick={() => handleMenuOpen(false)}>
        Calculator
      </NavLinkStyled>
    </Thumb>
  );
};
