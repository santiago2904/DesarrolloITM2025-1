import {fetchEntityData, deleteEntity, addEntity, updateEntity} from "../api/entity.service.ts";

export const getData = async (entity: string, setLoading: Function, setData: Function, setHeaders: Function) => {
    setLoading(true);
    try {
        const result = await fetchEntityData(entity);
        setData(result);
        if (result.length > 0) {
            setHeaders(Object.keys(result[0]));
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }
};

export const handleDeleteEntity = async (entity: string, itemToDelete: any, headers: string[], setData: Function, setFilteredData: Function, data: any[], filteredData: any[]) => {
    try {
        const field = headers[0];
        const value = itemToDelete[headers[0]];
        await deleteEntity(entity, field, value);
        setData(data.filter(i => i[headers[0]] !== value));
        setFilteredData(filteredData.filter(i => i[headers[0]] !== value)); // También actualizamos los datos filtrados
    } catch (error) {
        console.error("Error deleting entity:", error);
    }
};

export const handleSubmitEntity = async (isEditing: boolean, entity: string, headers: string[], formData: any, setData: Function, setFilteredData: Function, setFormData: Function, handleCloseModal: Function, editId: number | null) => {
    if (isEditing && editId !== null) {
        await updateEntity(entity, headers[0], formData[headers[0]], formData);
        setData((prevData: any[]) =>
            prevData.map((item) =>
                item[headers[0]] === formData[headers[0]] ? formData : item
            )
        );
    } else {
        const newEntity = await addEntity(entity, formData);
        setData((prevData: any[]) => [...prevData, formData]);
        setFilteredData((prevData: any[]) => [...prevData, formData]);
    }
    handleCloseModal();
};
