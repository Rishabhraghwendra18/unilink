"use client";

import Image from "next/image";
import { useState,useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { FormControl } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import LINKSepoliaABI from "../../ABI/LINKSepolia.json";
import LINKMumbaiABI from "../../ABI/LINKMumbai.json";
import {readContractBalance} from "../../utils/readContract";
import TokensSelect from "../../components/TokensSelect";
import CustomSelect from "../../components/CustomSelect";
import CustomCommonButton from "../../components/CustomButton"
import ConfirmationModal from "../../components/ConfirmationModal"; 
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

function Bridge() {
  const { address } = useWeb3ModalAccount();
  useEffect(()=>{
    if(address){
      console.log("LINK balance: ",readContractBalance('0x779877A7B0D9E8603169DdbD7836e478b4624789',LINKSepoliaABI,address))
    }
  },[address])
  const [selectedSourceChain, setSelectedSourceChain] = useState();
  const [destinationSourceChain, setDestinationSourceChain] = useState();
  const [tokensList, setTokensList] = useState([{ name: "CCIP-BnM", amount: 0,maxAmount:1.23,isSelected:false },{ name: "cCCIP-LnM", amount: 0,maxAmount:1.23,isSelected:false }]);
  const [isTranscationModaOpen, setIsTranscationModaOpen] = useState(false);

  const onTokenSelect = (tokenName,isChecked)=>{
    let tokens=[...tokensList];
    tokens=tokens.map(token=>{
      if(token.name === tokenName){
        return {...token,isSelected:isChecked}
      }
      return token;
    })
    setTokensList(tokens);
  }
  const onTokenAmountChange = (tokenName,amount)=>{
    let tokens=[...tokensList];
    tokens=tokens.map(token=>{
      if(token.name === tokenName){
        return {...token,amount}
      }
      return token;
    })
    setTokensList(tokens);
  }
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
            <label>Select Tokens</label>
            <div className={styles.select_tokens_container}>
            {selectedSourceChain && tokensList.map((token,index)=>(
              <TokensSelect key={index} token={token} style={index==tokensList.length-1 ? {padding:0,border:'none'}:undefined} onSelect={onTokenSelect} onChange={onTokenAmountChange}/>
            ))}
            </div>
            <CustomSelect
              isDisable={!selectedSourceChain}
              placeholder="Destination Chain"
              id={"destination-chain-select"}
              labeId={"detaination-chain-select-label"}
              onChange={(e) => {setDestinationSourceChain(e.target.value)}}
              options={chains?.filter(chain=>selectedSourceChain?.name !== chain?.name)}
              value={destinationSourceChain}
            />
            <CustomCommonButton onClick={()=>setIsTranscationModaOpen(true)}>Transfer</CustomCommonButton>
          </FormControl>
        </div>
        <Image priority src={star33x33} className={styles.star33x33} />
        <Image priority src={star63x63} className={styles.star63x63} />
        {isTranscationModaOpen && <ConfirmationModal open={isTranscationModaOpen} setOpen={setIsTranscationModaOpen} fromNetwork={selectedSourceChain?.name} toNetwork={destinationSourceChain?.name} selectedTokens={tokensList}/>}
      </div>
    </ThemeProvider>
  );
}
export default Bridge;
