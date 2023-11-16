import {Table,TableBody,TableCell,TableHead,TableRow} from '@mui/material';

function TokensPreview({tokens=[]}) {
  return (
    <Table aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>Token Name</TableCell>
        <TableCell align="right">Amount</TableCell>
        <TableCell align="right">You Will Get</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {tokens.map((token) => (
        <TableRow
          key={token.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {token.name}
          </TableCell>
          <TableCell align="right">{token.amount}</TableCell>
          <TableCell align="right">{token.finalAmount}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  )
}

export default TokensPreview;