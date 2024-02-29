// Menu.js
import { useRouter } from 'next/router';
import styles from './compstyles/menu.module.css';

const Menu = ({ text, href, hide, onNavbarLinkClick }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  const handleClick = () => {
    if (typeof onNavbarLinkClick === 'function') {
      onNavbarLinkClick();
      router.push(href);
    } else {
      console.error('onNavbarLinkClick is not a function');
    }
  };

  return (
    <div onClick={handleClick} className={isActive ? styles.menu : styles.bor} style={{ display: hide ? 'none' : 'block' }}>
      {text}
    </div>
  );
};

export default Menu;
