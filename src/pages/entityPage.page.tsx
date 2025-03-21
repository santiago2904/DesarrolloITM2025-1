import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
    CircularProgress,
    Typography,
    Card,
    CardContent,
    Button,
    Modal,
    TextField,
    Box,
    Grid,
    TablePagination,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import {Add, Search} from "@mui/icons-material";
import {fetchEntityData, deleteEntity, addEntity, updateEntity} from "../api/entity.service.ts";
import EntityTable from "../components/entityTable.component.tsx";

function EntityPage() {
    const {entity} = useParams<{ entity: string }>();
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]); // Estado para los datos filtrados
    const [loading, setLoading] = useState<boolean>(true);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false); // Estado para el diálogo de confirmación
    const [formData, setFormData] = useState<any>({});
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [headers, setHeaders] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(""); // Estado para el término de búsqueda
    const [page, setPage] = useState(0); // Página actual
    const [rowsPerPage, setRowsPerPage] = useState(10); // Filas por página
    const [itemToDelete, setItemToDelete] = useState<any | null>(null); // Estado para el ítem a eliminar

    // Función para obtener los datos y establecerlos
    const getData = async () => {
        setLoading(true);
        try {
            const result = await fetchEntityData(entity!);
            setData(result);
            setFilteredData(result); // Al iniciar, los datos filtrados son los mismos que los originales
            if (result.length > 0) {
                setHeaders(Object.keys(result[0]));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [entity]);

    // Función de búsqueda
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value); // Actualizamos el estado con el término de búsqueda

        if (value.trim() === "") {
            setFilteredData(data); // Si no hay término de búsqueda, mostramos todos los datos
        } else {
            const lowercasedValue = value.toLowerCase();
            const filtered = data.filter(item =>
                Object.values(item).some(val =>
                    String(val).toLowerCase().includes(lowercasedValue)
                )
            );
            setFilteredData(filtered); // Actualizamos los datos filtrados
        }
    };

    const confirmDelete = (item: any) => {
        setItemToDelete(item);
        setOpenConfirmDialog(true);
    };

    const handleDelete = async () => {
        try {
            if (itemToDelete) {
                const field = headers[0];
                const value = itemToDelete[headers[0]];
                await deleteEntity(entity!, field, value);
                setData(data.filter(i => i[headers[0]] !== value));
                setFilteredData(filteredData.filter(i => i[headers[0]] !== value)); // También actualizamos los datos filtrados
            }
        } catch (error) {
            console.error("Error deleting entity:", error);
        } finally {
            setOpenConfirmDialog(false); // Cerrar diálogo de confirmación
        }
    };

    const handleOpenModal = () => {
        setFormData({});
        setIsEditing(false);
        setOpenModal(true);
    };

    const handleEdit = (item: any) => {
        setFormData(item);
        setIsEditing(true);
        setEditId(item.id);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setFormData({});
        setIsEditing(false);
    };

    const handleSubmit = async () => {
        if (isEditing && editId !== null) {
            await updateEntity(entity!, headers[0], formData[headers[0]], formData);
            setData((prevData) =>
                prevData.map((item) =>
                    item[headers[0]] === formData[headers[0]] ? formData : item
                )
            );
        } else {
            const newEntity = await addEntity(entity!, formData);
            setData((prevData) => [...prevData, formData]); // Añadimos el nuevo dato al estado original
            setFilteredData((prevData) => [...prevData, formData]); // Añadimos el nuevo dato al estado original
        }

        handleCloseModal();
    };


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    if (loading) return <CircularProgress/>;

    // Utiliza los encabezados para generar los campos del formulario
    const formFields = isEditing || headers.length === 0 ? Object.keys(formData) : headers;

    return (
        <div className="container">
            <Card className="card-wrapper">
                <CardContent>
                    <Box p={2} display="flex" flexDirection="column" gap={3} className={'header-container'}>
                        {/* Barra de búsqueda */}
                        <TextField
                            fullWidth
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={handleSearch}
                            InputProps={{
                                startAdornment: <Search />,
                            }}
                        />

                        {/* Contenedor del título y botón */}
                        <Box display="flex" justifyContent="space-between" alignItems="center" gap={'30px'}>
                            <Typography className="table-title" variant="h4" gutterBottom>
                                {`Gestionar ${entity}`}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Add />}
                                onClick={handleOpenModal}
                            >
                                Agregar {entity}
                            </Button>
                        </Box>
                    </Box>
                    <EntityTable
                        data={filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                        onDelete={confirmDelete} // Cambiamos para abrir el diálogo de confirmación
                        onEdit={handleEdit}
                    />
                    <TablePagination
                        component="div"
                        count={filteredData.length} // Número total de filas
                        page={page} // Página actual
                        onPageChange={handleChangePage} // Función para cambiar la página
                        rowsPerPage={rowsPerPage} // Filas por página
                        onRowsPerPageChange={handleChangeRowsPerPage} // Función para cambiar filas por página
                    />
                </CardContent>
            </Card>

            <Modal open={openModal} onClose={handleCloseModal}>
                <div className="modal-container" style={{ padding: '20px', width: '400px', margin: 'auto', backgroundColor: 'white' }}>
                    {/* Título que ocupa todo el ancho */}
                    <Typography variant="h6" fullWidth align="center" gutterBottom>
                        {isEditing ? `Actualizar ${entity}` : `Agregar ${entity}`}
                    </Typography>

                    {/* Campos del formulario */}
                    {formFields.map((field) => (
                        <TextField
                            key={field}
                            label={field}
                            value={formData[field] || ""}
                            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                    ))}

                    {/* Centrar el botón */}
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            {isEditing ? "Actualizar" : "Agregar"}
                        </Button>
                    </Box>
                </div>
            </Modal>

            {/* Diálogo de confirmación */}
            <Dialog
                open={openConfirmDialog}
                onClose={() => setOpenConfirmDialog(false)}
            >
                <DialogTitle>Confirmar eliminación</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EntityPage;
