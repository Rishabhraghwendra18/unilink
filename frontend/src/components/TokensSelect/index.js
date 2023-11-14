import styles from "./index.module.css";
import {OutlinedInput,InputAdornment,Checkbox} from "@mui/material"

function TokensSelect({tokenName,maxAmount,style}) {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <div className={styles.tokens_container} style={style}>
        <div className={styles.checkbox_token}>
         <Checkbox {...label} sx={{padding:0}}/>
        <span>{tokenName}</span>
        </div>
        <div className={styles.amount_input}>
        <OutlinedInput
            id="tokenAmount"
            size="small"
            type={'number'}
            endAdornment={
              <InputAdornment position="end">
                <button className={styles.max_btn}>Max</button>
              </InputAdornment>
            }
            placeholder="Amount"
          />
        </div>
    </div>
  )
}

export default TokensSelect;