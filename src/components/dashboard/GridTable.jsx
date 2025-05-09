// import React, { useEffect, useState } from "react";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Typography from '@mui/material/Typography';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
// import armasData from '../../store/Armas.json';
// import { RibbonButtons } from '../../components/dashboard'

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//         backgroundColor: theme.palette.primary.light,
//         color: theme.palette.common.black,
//         fontWeight: "bold",
//     },
//     [`&.${tableCellClasses.body}`]: {
//         fontSize: 14,
//     },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     "&:nth-of-type(odd)": {
//         backgroundColor: theme.palette.action.hover,
//     },
//     "&:last-child td, &:last-child th": {
//         border: 0,
//     },
// }));

// const ROWS_PER_PAGE = 10;

// export function GridTable() {
//     const [rows, setRows] = useState([]);
//     const [page, setPage] = useState(1);

//     useEffect(() => {
//         setRows(armasData);
//     }, []);

//     const handleChangePage = (event, value) => {
//         setPage(value);
//     };

//     const filteredRows = rows.filter(row => row && row.id);
//     const pageCount = Math.ceil(filteredRows.length / ROWS_PER_PAGE);
//     const startIndex = (page - 1) * ROWS_PER_PAGE;
//     const visibleRows = filteredRows.slice(startIndex, startIndex + ROWS_PER_PAGE);

//     return (
//         <>
//             <Typography
//                 component="h1"
//                 variant="h5"
//                 sx={{ mt: 2, mb: 2, textAlign: 'center' }}
//             >
//                 LISTADO DE ARMAMENTO MENOR
//             </Typography>

//             <RibbonButtons />
//             <TableContainer
//                 component={Paper}
//                 elevation={0}
//                 sx={{
//                     borderRadius: 0,
//                     boxShadow: "none",
//                 }}
//             >
//                 <Table sx={{ mt: 2, mb: 3, minWidth: 1000 }} aria-label="tabla de inventario">
//                     <TableHead>
//                         <TableRow>
//                             <StyledTableCell>#</StyledTableCell>
//                             <StyledTableCell>NT</StyledTableCell>
//                             <StyledTableCell>Nº Inventario</StyledTableCell>
//                             <StyledTableCell>N.N.E.</StyledTableCell>
//                             <StyledTableCell>Nomenclatura</StyledTableCell>
//                             <StyledTableCell>Apoyado</StyledTableCell>
//                             <StyledTableCell>Ubicación</StyledTableCell>
//                             <StyledTableCell>Nº de Serie</StyledTableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {visibleRows.map((row) => (
//                             <StyledTableRow key={row.id}>
//                                 <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
//                                 <StyledTableCell>{row.nt}</StyledTableCell>
//                                 <StyledTableCell>{row.inventario}</StyledTableCell>
//                                 <StyledTableCell>{row.nne}</StyledTableCell>
//                                 <StyledTableCell>{row.nomenclatura}</StyledTableCell>
//                                 <StyledTableCell>{row.apoyado}</StyledTableCell>
//                                 <StyledTableCell>{row.ubicacion}</StyledTableCell>
//                                 <StyledTableCell>{row.serie}</StyledTableCell>
//                             </StyledTableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Stack spacing={2} alignItems="center" sx={{ mb: 4 }}>
//                 <Pagination
//                     count={pageCount}
//                     page={page}
//                     onChange={handleChangePage}
//                     color="primary"
//                 />
//             </Stack>
//         </>
//     );
// }


import React, { useEffect, useState } from "react";
import { Paper, Typography, IconButton, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import armasData from '../../store/Armas.json';
import { RibbonButtons } from "./RibbonButtons";
import { useNavigate } from 'react-router-dom';

export function GridTable() {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const mappedRows = armasData.map((item, index) => ({
            id: item.id || index + 1,
            nt: item.nt,
            inventario: item.inventario,
            nne: item.nne,
            nomenclatura: item.nomenclatura,
            apoyado: item.apoyado,
            ubicacion: item.ubicacion,
            serie: item.serie,
        }));
        setRows(mappedRows);
    }, []);

    const columns = [
        { field: "id", headerName: "#", width: 60 },
        { field: "nt", headerName: "NT", width: 100 },
        { field: "inventario", headerName: "Nº Inventario", width: 150 },
        { field: "nne", headerName: "N.N.E.", width: 150 },
        { field: "nomenclatura", headerName: "Nomenclatura", flex: 1 },
        { field: "apoyado", headerName: "Apoyado", width: 120 },
        { field: "ubicacion", headerName: "Ubicación", width: 120 },
        { field: "serie", headerName: "Nº de Serie", width: 150 },
        {
            field: "acciones",
            headerName: "Acciones",
            width: 150,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <IconButton title="Editar"><EditIcon /></IconButton>
                    <IconButton title="Eliminar"><DeleteIcon /></IconButton>
                    <IconButton title="Ver Detalles"><VisibilityIcon /></IconButton>
                </Stack>
            ),
        },
    ];

    return (
        <>
            <Typography
                component="h1"
                variant="h5"
                sx={{ mt: 2, mb: 2, textAlign: 'center' }}
            >
                LISTADO DE ARMAMENTO MENOR
            </Typography>

            <RibbonButtons />
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    borderRadius: 0,
                    boxShadow: "none",
                }}
            >
                <DataGrid
                    autoHeight
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10, 25]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    onRowClick={(params) => {
                        navigate(`/armas/${params.row.id}`);
                    }}
                    sx={{
                        border: 0,
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#42a5f5',
                            color: '#fff',
                            fontWeight: 'bold',
                        },
                        '& .MuiDataGrid-row:nth-of-type(even)': {
                            backgroundColor: '#f9f9f9',
                        },
                    }}
                />
            </Paper>
        </>
    );
}
