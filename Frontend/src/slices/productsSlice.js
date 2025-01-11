import { createSlice } from "@reduxjs/toolkit"; // Importa createSlice de Redux Toolkit
import { getProducts } from "../actions/productsAction"; // Importa la acción getProducts

// Estado inicial del slice
export const initialState = {
    products: [], // Array de productos inicial
    loading: false, // Estado de carga inicial
    error: null // Error inicial
}

// Crea el slice productsSlice
export const productsSlice = createSlice({
    name: "products", // Nombre del slice
    initialState, // Estado inicial
    reducers: {}, // Reducers vacíos ya que no hay acciones sincrónicas definidas
    extraReducers: {
        // Caso cuando la acción getProducts está pendiente
        [getProducts.pending]: (state) => {
            state.loading = true; // Cambia el estado de carga a true
            state.error = null; // Resetea el error
        },
        // Caso cuando la acción getProducts se ha cumplido
        [getProducts.fulfilled]: (state, {payload})=> {
            state.loading = false; // Cambia el estado de carga a false
            state.products = payload.data; // Asigna los productos del payload
            state.error = null; // Resetea el error
        },
        // Caso cuando la acción getProducts ha sido rechazada
        [getProducts.rejected]: (state, action) => {
            state.loading = false; // Cambia el estado de carga a false
            state.error = action.payload; // Asigna el error del payload
        }
    }
});

// Exporta el reducer productsReducer
export const productsReducer = productsSlice.reducer;