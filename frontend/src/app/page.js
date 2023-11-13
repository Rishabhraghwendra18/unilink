"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CustomCommonButton from "../components/CustomButton";
import GradientCircle from "../components/GradientCircle";
import CssBaseline from "@mui/material/CssBaseline";
import star33x33 from "../assets/star33x33.svg";
import star39x39 from "../assets/star39x39.svg";
import star63x63 from "../assets/star63x63.svg";
import arrow from "../assets/arrow.svg";

const materialUiTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#12132A",
    },
  },
  typography: {
    fontFamily: ["Outfit", "sans-serif"].join(","),
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={materialUiTheme}>
      <CssBaseline />
      <div className={styles.home_container}>
        <main className={styles.main}>
          <div className={styles.hero_content}>
          <Image
          priority
          src={arrow}
          className={styles.arrow}
          />
            <h1 className={styles.hero_title}>
              Bridge All Cryptos
              <br /> In <br />
              One Click
            </h1>
            <CustomCommonButton sx={{width:'13rem',height:'4rem',fontSize:'1.3rem'}}>Enter App</CustomCommonButton>
          </div>
          <GradientCircle className={styles.gradientCircle} />
        </main>
          <Image
          priority
          src={star33x33}
          className={styles.star33x33}
          />
          <Image
          priority
          src={star39x39}
          className={styles.star39x392}
          />
          <Image
          priority
          src={star39x39}
          className={styles.star39x39}
          />
          <Image
          priority
          src={star63x63}
          className={styles.star63x63}
          />
          <GradientCircle className={styles.gradientCircleRight} />
      </div>
    </ThemeProvider>
  );
}
