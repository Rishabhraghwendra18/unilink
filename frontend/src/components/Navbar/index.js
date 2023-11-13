import styles from "./index.module.css";
import CustomButton from "../CustomButton";
function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_contents}>
        <div>
          <span className={styles.logo}>Uni</span>
          <span className={styles.logo} style={{ color: "#00C4F4" }}>
            Link
          </span>
        </div>

        <div className={styles.navItems}>
          <span className={styles.active_link}>Home</span>
          <span className={styles.unactive_link}>Bridge</span>
          <span className={styles.unactive_link}>Team</span>
        </div>
        <div>
          <CustomButton>Enter App</CustomButton>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
