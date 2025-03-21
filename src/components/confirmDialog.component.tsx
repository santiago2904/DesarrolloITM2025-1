import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancelar</Button>
                <Button onClick={onConfirm} color="secondary">Eliminar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;