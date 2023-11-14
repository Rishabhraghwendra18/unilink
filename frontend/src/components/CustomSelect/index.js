import { MenuItem, Select,InputLabel } from "@mui/material";
import styles from './index.module.css';

function CustomSelect({placeholder,labeId,id,onChange=()=>{},options=[],value,isDisable}) {
  return (
    <div className={styles.customSelect}>
      <InputLabel id={id}>{placeholder}</InputLabel>
      <Select
        disabled={isDisable}
        labelId={labeId}
        id={id}
        value={value}
        label={placeholder}
        onChange={onChange}
        sx={{width:'100%'}}
      >
        {options.map((chain, index) => (
          <MenuItem key={index} value={chain} >
            {chain.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default CustomSelect;
