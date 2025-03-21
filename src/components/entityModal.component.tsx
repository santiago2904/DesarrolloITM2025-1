import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

interface EntityModalProps {
    open: boolean;
    onClose: () => void;
    formData: any;
    setFormData: (data: any) => void;
    isEditing: boolean;
    onSubmit: () => void;
    headers: string[];
}

const EntityModal: React.FC<EntityModalProps> = ({ open, onClose, formData, setFormData, isEditing, onSubmit, headers }) => {
    const formFields = isEditing || headers.length === 0 ? Object.keys(formData) : headers;

    return (
        <Modal open={open} onClose={onClose}>
            <div className="modal-container" style={{ padding: '20px', width: '400px', margin: 'auto', backgroundColor: 'white' }}>
                <Typography variant="h6" align="center" gutterBottom>
                    {isEditing ? 'Actualizar' : 'Agregar'}
                </Typography>

                {formFields.map((field) => (
                    <TextField
                        key={field}
                        label={field}
                        value={formData[field] || ''}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                ))}

                <Box display="flex" justifyContent="center" mt={2}>
                    <Button variant="contained" color="primary" onClick={onSubmit}>
                        {isEditing ? 'Actualizar' : 'Agregar'}
                    </Button>
                </Box>
            </div>
        </Modal>
    );
};

export default EntityModal;
