import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

export interface SearchBarProps {
    searchTerm: string;
    onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
    return (
        <TextField
            fullWidth
            placeholder="Buscar..."
            value={searchTerm}
            onChange={onSearch}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SearchBar;
