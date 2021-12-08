import { Table, TableBody, TableCell, TableRow } from "@mui/material";

export default function MyTable({ labels, values, ...props }) {
  return (
    <Table {...props}>
      <TableBody>
        {labels.map((label, index) => (
          <TableRow key={index}>
            <TableCell>{label}</TableCell>
            <TableCell>{values[index]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
