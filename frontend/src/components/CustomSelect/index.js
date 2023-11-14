import { MenuItem, FormControl, Select,InputLabel } from "@mui/material";

function CustomSelect({placeholder,labeId,id,onChange=()=>{},options=[],value}) {
  return (
    <>
      <InputLabel id={id}>{placeholder}</InputLabel>
      <Select
        labelId={labeId}
        id="demo-simple-select"
        value={value}
        label="Source Chain"
        onChange={onChange}
      >
        {options.map((chain, index) => (
          <MenuItem key={index} value={chain} >
            {chain.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

export default CustomSelect;
