'use client'

import styles from "./index.module.css";
import { usePathname,useRouter } from 'next/navigation'
import Link from 'next/link';
import CustomButton from "../CustomButton";
function Navbar() {
  const pathname = usePathname();
  const { push } = useRouter();
  const onNavbarButtonClick=()=>{
    if(pathname === "/"){
      push('/bridge');
      return;
    }

  }
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_contents}>
        <Link href="/">
          <span className={styles.logo} style={{color:'white'}}>Uni</span>
          <span className={styles.logo} style={{ color: "#00C4F4" }}>
            Link
          </span>
        </Link>

        <div className={styles.navItems}>
          <Link href="/" className={pathname==='/' ? styles.active_link:styles.unactive_link}>Home</Link>
          <Link href="/bridge" className={pathname==='/bridge' ? styles.active_link:styles.unactive_link}>Bridge</Link>
          <span className={styles.unactive_link}>Team</span>
        </div>
        <div>
          <CustomButton onClick={onNavbarButtonClick}>{pathname === "/"?"Enter App":"Connect Wallet"}</CustomButton>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
