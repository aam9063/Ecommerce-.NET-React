import { createSlice } from "@reduxjs/toolkit"; // Importa createSlice de Redux Toolkit
import { getProductById } from "../actions/productsAction"; // Importa la acción getProductById

// Estado inicial del slice
export const initialState = {
    product: null, // Producto inicial es null
    loading: false, // Estado de carga inicial es false
    error: null, // Error inicial es null
};

// Crea el slice productByIdSlice
export const productByIdSlice = createSlice({
    name: "productByIdSlice", // Nombre del slice
    initialState, // Estado inicial
    reducers: {
        // Reducer para resetear el estado
        resetGetById: (state, action) =>  {
            state.loading = false; // Resetea el estado de carga
            state.error = null; // Resetea el error
            state.product = null; // Resetea el producto
        }
    },
    extraReducers: {
        // Caso cuando la acción getProductById está pendiente
        [getProductById.pending]: (state) => {
            state.loading = true; // Cambia el estado de carga a true
            state.error = null; // Resetea el error
        },
        // Caso cuando la acción getProductById se ha cumplido
        [getProductById.fulfilled]: (state, {payload}) => {
            state.loading = false; // Cambia el estado de carga a false
            state.product = payload.data; // Asigna el producto del payload
            state.error = null; // Resetea el error
        },
        // Caso cuando la acción getProductById ha sido rechazada
        [getProductById.rejected] : (state, action) => {
            state.loading = false; // Cambia el estado de carga a false
            state.error = action.payload; // Asigna el error del payload
        },
    },
});

// Exporta la acción resetGetById
export const { resetGetById } = productByIdSlice.actions;
// Exporta el reducer productByIdReducer
export const productByIdReducer = productByIdSlice.reducer;