import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5184/api/proyecto", // Cambia esta URL por la de tu API
    headers: {
        "Content-Type": "application/json",
    },
});

// Método para obtener los datos de la entidad
export const fetchEntityData = async (entity: string) => {
    try {
        const response = await axiosInstance.get(`/${entity}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data for ${entity}:`, error);
        throw error;
    }
};

// Método para eliminar una entidad por ID
export const deleteEntity = async (entity: string, field: string, value: number,) => {
    try {
        await axiosInstance.delete(`/${entity}/${field}/${value}`);
    } catch (error) {
        console.error(`Error deleting ${entity} with ID ${value}:`, error);
        throw error;
    }
};

// Método para agregar una nueva entidad
export const addEntity = async (entity: string, data: any) => {
    try {
        const response = await axiosInstance.post(`/${entity}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error adding new ${entity}:`, error);
        throw error;
    }
};

// Método para actualizar una entidad existente por ID
export const updateEntity = async (entity: string, field: string, value: number, data: any) => {
    try {
        const response = await axiosInstance.put(`/${entity}/${field}/${value}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating ${entity} with ID ${value}:`, error);
        throw error;
    }
};

export const searchEntity = async (entity: string, field: string, value: string) => {
    try {
        const response = await axiosInstance.get(`/${entity}/${field}/${value}`);
        return response.data;
    } catch (error) {
        console.error(`Error searching ${entity} with ${field} ${value}:`, error);
        throw error;
    }
}