import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [toggleBtnPosition, setToggleBtnPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;
  return (
    <MenusContext.Provider
      value={{ openId, close, open, toggleBtnPosition, setToggleBtnPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open, setToggleBtnPosition } =
    useContext(MenusContext);

  function handleToggleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();

    openId === "" || openId !== id ? open(id) : close();

    setToggleBtnPosition({
      x: window.innerWidth - rect.x + 8,
      y: rect.y,
    });
  }

  return (
    <StyledToggle onClick={handleToggleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ id, children }) {
  const { openId, toggleBtnPosition, close } = useContext(MenusContext);
  const ref = useOutsideClick(close);

  if (openId !== id) return null;
  return createPortal(
    <StyledList position={toggleBtnPosition} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  function handleOnClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleOnClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

Menus.propTypes = {
  children: PropTypes.node,
};

Toggle.propTypes = {
  id: PropTypes.number,
};

List.propTypes = {
  id: PropTypes.number,
  children: PropTypes.node,
};

Button.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  onClick: PropTypes.func,
};

export default Menus;
