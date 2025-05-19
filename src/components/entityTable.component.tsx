import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

// Step 1: Define an array of roles and their allowed actions
const rolesWithActions = [
  { role: 'admin', actions: ['create', 'edit', 'delete', 'view'] },
  { role: 'Verificador', actions: ['view'] },
  { role: 'Validador', actions: ['edit', 'view'] },
  { role: 'Administrativo', actions: ['edit', 'view'] },
  { role: 'invitado', actions: ['view'] },
];

// Step 2: Function to get roles from local storage
const getRolesFromLocalStorage = () => {
  const roles = localStorage.getItem('roles');
  return roles ? JSON.parse(roles) : [];
};

// Step 3: Function to check if a role can perform an action
const canPerformAction = (role: string, action: string) => {
  const roleData = rolesWithActions.find(r => r.role === role);
  return roleData ? roleData.actions.includes(action) : false;
};

function EntityTable({ data, onEdit, onDelete }: any) {
    // Obtenemos las claves del primer elemento para crear las cabeceras de la tabla
    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    // Example usage
    const userRoles = getRolesFromLocalStorage();
    const canEdit = userRoles.some((role: string) => canPerformAction(role, 'edit'));
    const canDelete = userRoles.some((role: string) => canPerformAction(role, 'delete'));

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
                                    <IconButton onClick={() => onEdit(item)} disabled={!canEdit}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => onDelete(item)} disabled={!canDelete}>
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
