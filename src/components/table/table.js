import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function DenseTable(props) {
    function createData(serie, minValue, MaxValue) {
        return { serie, minValue, MaxValue };
    }

    const rows = [
        createData(props.names[1], Math.max(...props.serie1), Math.min(...props.serie1)),
        createData(props.names[2], Math.max(...props.serie2), Math.min(...props.serie2)),
        createData(props.names[3], Math.max(...props.serie3), Math.min(...props.serie3)),
    ];

    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Serie</TableCell>
                        <TableCell align="right">Valor Máximo</TableCell>
                        <TableCell align="right">Valor Minímo</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.serie}>
                            <TableCell component="th" scope="row">
                                {row.serie}
                            </TableCell>
                            <TableCell align="right">{row.minValue}</TableCell>
                            <TableCell align="right">{row.MaxValue}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}