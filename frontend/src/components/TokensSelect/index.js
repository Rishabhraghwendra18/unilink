import styles from "./index.module.css";
import {OutlinedInput,InputAdornment,Checkbox} from "@mui/material"

function TokensSelect({token,maxAmount,style,onSelect,onChange}) {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <div className={styles.tokens_container} style={style}>
        <div className={styles.checkbox_token}>
         <Checkbox {...label} sx={{padding:0}} onChange={(e)=>onSelect(token.name,e.target.checked)}/>
        <span>{token.name}</span>
        </div>
        <div className={styles.amount_input}>
        <OutlinedInput
            id="tokenAmount"
            size="small"
            type={'number'}
            onChange={(e)=>{onChange(token.name,e.target.value)}}
            disabled={!token.isSelected}
            value={token.amount}
            endAdornment={
              <InputAdornment position="end">
                <button className={styles.max_btn} onClick={()=>onChange(token.name,token.maxAmount)}>Max</button>
              </InputAdornment>
            }
            placeholder="Amount"
          />
        </div>
    </div>
  )
}

export default TokensSelect;