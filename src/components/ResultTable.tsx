import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles(() => {
  return {
    tableContainer: {
      maxWidth: "320px",
    },
  };
});

const ResultTable = (props: any) => {
  const classes = useStyle();
  const { fetchedData } = props;
  
  return (
        <TableContainer className={classes.tableContainer}>
          <Table sx={{ minWidth: 320 }}>
            <TableHead>
              <TableRow>
                <TableCell>Label</TableCell>
                <TableCell align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchedData.map((item: any) => (
                <TableRow key={item.description}>
                  <TableCell component="th" scope="row">
                    {item.description}
                  </TableCell>
                  <TableCell align="right">
                    {(item.score * 100).toFixed(4)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
}

export default ResultTable

