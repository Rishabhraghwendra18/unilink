"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Avatar from "@mui/material/Avatar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CustomCommonButton from "../components/CustomButton";
import GradientCircle from "../components/GradientCircle";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "../components/Card";
import star33x33 from "../assets/star33x33.svg";
import star39x39 from "../assets/star39x39.svg";
import star63x63 from "../assets/star63x63.svg";
import ethereumLogo from "../assets/ethereum-logo.svg";
import polygonLogo from "../assets/polygon-logo.svg";
import avalancheLogo from "../assets/avalanche-logo.png";
import arbitrumLogo from "../assets/arbitrum-logo.svg";
import optimismLogo from "../assets/optimism-logo.svg";
import bnbLogo from "../assets/bnb-logo.svg";
import baseLogo from "../assets/base-logo.svg";
import openingQuoteLogo from "../assets/opening-quote.svg";
import closingQuoteLogo from "../assets/closing-quote.svg";
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
const networksList = [
  {
    logo: ethereumLogo,
    name: "Ethereum",
  },
  {
    logo: polygonLogo,
    name: "Polygon",
  },
  {
    logo: avalancheLogo,
    name: "Avalanche",
  },
  {
    logo: arbitrumLogo,
    name: "Arbitrum",
  },
  {
    logo: optimismLogo,
    name: "Optimism",
  },
  {
    logo: bnbLogo,
    name: "BNB Chain",
  },
  {
    logo: baseLogo,
    name: "Base",
  },
];
export default function Home() {
  return (
    <ThemeProvider theme={materialUiTheme}>
      <CssBaseline />
      <div className={styles.home_container}>
        <main className={styles.main}>
          <div className={styles.hero_content}>
            <Image priority src={arrow} className={styles.arrow} />
            <h1 className={styles.hero_title}>
              Bridge All Cryptos
              <br /> In <br />
              One Click
            </h1>
            <CustomCommonButton
              sx={{ width: "13rem", height: "4rem", fontSize: "1.3rem" }}
            >
              Enter App
            </CustomCommonButton>
          </div>
          <GradientCircle className={styles.gradientCircle} />
        </main>
        <Image priority src={star33x33} className={styles.star33x33} />
        <Image priority src={star39x39} className={styles.star39x392} />
        <Image priority src={star39x39} className={styles.star39x39} />
        <Image priority src={star63x63} className={styles.star63x63} />
        <GradientCircle className={styles.gradientCircleRight} />
      </div>
      <div className={styles.supported_networks}>
        <h2 className={styles.supported_networks_title}>Supported Networks</h2>
        <div className={styles.networks_list}>
          {networksList.map((network, index) => (
            <div className={styles.network} key={index}>
              <Image
                priority
                src={network.logo}
                width={73}
                height={68}
                className={styles.networkLogo}
              />
              <span>{network.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.team_section}>
        <div className={styles.title_div}>
          <Image
            priority
            src={openingQuoteLogo}
            // width={73}
            // height={68}
            // className={styles.networkLogo}
          />
          <h2 className={styles.team_section_heading}>Team</h2>
          <Image
            priority
            src={closingQuoteLogo}
            // width={73}
            // height={68}
            // className={styles.networkLogo}
          />
        </div>
        <div className={styles.team_container}>
        <Card>
          <Avatar
            alt="Rishabh Raghwendra"
            src={"/rishabh-photo.jpeg"}
            sx={{ width: 100, height: 100 }}
          />
          <span className={styles.person_name}>Rishabh Raghwendra</span>
          <span>Blockchain Developer Freelancer</span>

        </Card>
        <Card>
          <Avatar
            alt="Anubha Kumari"
            src={"/anubha-photo.jpeg"}
            sx={{ width: 100, height: 100 }}
          />
          <span className={styles.person_name}>Anubha Kumari</span>
          <span>ReactJS Developer</span>

        </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}
