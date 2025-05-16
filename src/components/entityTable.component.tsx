import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

function EntityTable({ data, onEdit, onDelete }: any) {
    // Obtenemos las claves del primer elemento para crear las cabeceras de la tabla
    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <Box sx={{ overflowX: "auto", maxWidth: "100%" }}> {/* Contenedor para el scroll horizontal */}
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header) => (
                            <TableCell key={header}>{header}</TableCell>
                        ))}
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item: any) => (
                        <TableRow key={item.id || item[headers[0]]}>
                            {headers.map((header) => (
                                <TableCell key={header}>{item[header]}</TableCell>
                            ))}
                            <TableCell>
                                <Box display="flex" justifyContent="center" alignItems="center" gap={1} sx={{ flex: 1, maxWidth: 1 }}>
                                    <IconButton onClick={() => onEdit(item)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => onDelete(item)}>
                                        <Delete />
                                    </IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}

export default EntityTable;
