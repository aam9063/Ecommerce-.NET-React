import {createSlice} from '@reduxjs/toolkit'; // Importa createSlice de Redux Toolkit
import { getProductPagination } from '../actions/productsAction'; // Importa la acción getProductPagination

// Estado inicial del slice
export const initialState = {
  products : [], // Array de productos inicial
  count: 0, // Conteo inicial de productos
  pageIndex: 1, // Índice de página inicial
  pageSize: 2, // Tamaño de página inicial
  pageCount: 0, // Conteo de páginas inicial
  loading: false, // Estado de carga inicial
  resultByPage: 0, // Resultados por página inicial
  error: null, // Error inicial
  search: null, // Búsqueda inicial
  precioMax: null, // Precio máximo inicial
  precioMin: null, // Precio mínimo inicial
  category: null,  // Categoría inicial
  rating: null // Calificación inicial
}

// Crea el slice productPaginationSlice
export const productPaginationSlice = createSlice({
    name: "getProductPagination", // Nombre del slice
    initialState, // Estado inicial
    reducers: {
        // Reducer para la búsqueda con paginación
        searchPagination: (state, action) => {
            state.search = action.payload.search; // Asigna la búsqueda del payload
            state.pageIndex = 1; // Resetea el índice de página a 1
        },

        // Reducer para establecer el índice de página
        setPageIndex: (state, action) => {
            state.pageIndex = action.payload.pageIndex; // Asigna el índice de página del payload
        },

        // Reducer para actualizar el precio
        updatePrecio: (state, action) => {
            state.precioMax = action.payload.precio[1]; // Asigna el precio máximo del payload
            state.precioMin = action.payload.precio[0]; // Asigna el precio mínimo del payload
        },

        // Reducer para resetear la paginación
        resetPagination: (state, action) => {
            state.precioMax = null; // Resetea el precio máximo
            state.precioMin = null; // Resetea el precio mínimo
            state.pageIndex = 1; // Resetea el índice de página a 1
            state.search = null; // Resetea la búsqueda
            state.category = null; // Resetea la categoría
            state.rating = null; // Resetea la calificación
        },

        // Reducer para actualizar la categoría
        updateCategory: (state, action) => {
            state.category = action.payload.category; // Asigna la categoría del payload
        },

        // Reducer para actualizar la calificación
        updateRating: (state, action)  => {
            state.rating = action.payload.rating; // Asigna la calificación del payload
        }
    },

    extraReducers: {
        // Caso cuando la acción getProductPagination está pendiente
        [getProductPagination.pending]: (state) => {
            state.loading = true; // Cambia el estado de carga a true
            state.error = null; // Resetea el error
        },
        
        // Caso cuando la acción getProductPagination se ha cumplido
        [getProductPagination.fulfilled]: (state, {payload}) => {
            state.loading = false; // Cambia el estado de carga a false
            state.products = payload.data; // Asigna los productos del payload
            state.count = payload.count; // Asigna el conteo del payload
            state.pageIndex = payload.pageIndex; // Asigna el índice de página del payload
            state.pageSize = payload.pageSize; // Asigna el tamaño de página del payload
            state.pageCount = payload.pageCount; // Asigna el conteo de páginas del payload
            state.resultByPage = payload.resultByPage; // Asigna los resultados por página del payload
            state.error = null; // Resetea el error
        },

        // Caso cuando la acción getProductPagination ha sido rechazada
        [getProductPagination.rejected]: (state, action) => {
            state.loading = false; // Cambia el estado de carga a false
            state.error = action.payload; // Asigna el error del payload
        },
    },
});

// Exporta las acciones del slice
export const {
            searchPagination, 
            setPageIndex, 
            updatePrecio, 
            resetPagination, 
            updateCategory, 
            updateRating
            } = productPaginationSlice.actions;

// Exporta el reducer productPaginationReducer
export const productPaginationReducer = productPaginationSlice.reducer;