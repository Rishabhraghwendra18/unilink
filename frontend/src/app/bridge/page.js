"use client";

import Image from "next/image";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FormControl } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import CustomDataTable from "../../components/CustomDataGrid";
import CustomSelect from "../../components/CustomSelect";
import GradientCircle from "../../components/GradientCircle";
import {chains} from "../../constants/chain";
import star39x39 from "../../assets/star39x39.svg";
import star33x33 from "../../assets/star33x33.svg";
import star63x63 from "../../assets/star63x63.svg";
import styles from "./page.module.css";

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

const sourceChain = ["Mumbai", "Ethereum", "Avalanche"];
const sourceChainColumns = [
  { field: "token", headerName: "Token Name", sortable: false, flex: 1 },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    editable: true,
    flex: 1,
  },
];
const sourceChainRows = [{ token: "CCIP-BnM", amount: 0 }];
function Bridge() {
  const [selectedSourceChain, setSelectedSourceChain] = useState();
  return (
    <ThemeProvider theme={materialUiTheme}>
      <CssBaseline />
      <div className={styles.app_container}>
        <h1>Select Tokens To Bridge</h1>
        <GradientCircle className={styles.gradientCircleRight} />
        <Image priority src={star39x39} className={styles.star39x39} />
        <Image priority src={star39x39} className={styles.star39x392} />
        <div className={styles.transfer_container}>
          <FormControl
            fullWidth
            sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <CustomSelect
              placeholder="Source Chain"
              id={"source-chain-select"}
              labeId={"source-chain-select-label"}
              onChange={(e) => {setSelectedSourceChain(e.target.value)}}
              options={chains}
              value={selectedSourceChain}
            />
            <CustomDataTable
              columns={sourceChainColumns}
              rows={selectedSourceChain?.name ? sourceChainRows:[]}
            />
          </FormControl>
        </div>
        <Image priority src={star33x33} className={styles.star33x33} />
        <Image priority src={star63x63} className={styles.star63x63} />
      </div>
    </ThemeProvider>
  );
}
export default Bridge;
