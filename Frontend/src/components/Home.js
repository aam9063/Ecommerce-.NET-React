import React, { Fragment, useEffect, useState } from "react"; // Importa React y hooks necesarios
import { useAlert } from "react-alert"; // Importa useAlert para mostrar alertas
import { useDispatch, useSelector } from "react-redux"; // Importa hooks de Redux
import { getProductPagination, getProducts } from "../actions/productsAction"; // Importa acciones de productos
import Loader from "./layout/Loader"; // Importa componente Loader
import MetaData from "./layout/MetaData"; // Importa componente MetaData
import Product from "./product/Product"; // Importa componente Product
import Products from "./products/Products"; // Importa componente Products
import Pagination from "react-js-pagination"; // Importa componente Pagination
import {setPageIndex, updatePrecio, updateCategory} from "../slices/productPaginationSlice"; // Importa acciones del slice
import Slider from "rc-slider"; // Importa componente Slider
import 'rc-slider/assets/index.css'; // Importa estilos de Slider

const { createSliderWithTooltip } = Slider; // Crea un slider con tooltip
const Range = createSliderWithTooltip(Slider.Range); // Crea un rango de slider con tooltip

const Home = () => {
  const [precio, setPrecio] = useState([1, 10000]); // useState hook para establecer el rango de precios
  const dispatch = useDispatch(); // useDispatch hook para despachar acciones

  const {categories} = useSelector(state => state.category);

  // useSelector hook para obtener datos del store
  const {
    products,
    count,
    pageIndex,
    loading, 
    error,
    resultByPage,
    search,
    pageSize,
    precioMax,
    precioMin,
    category,
    rating
  }  = useSelector((state)=> state.productPagination); // useSelector hook para obtener datos del store

  const alert = useAlert(); // useAlert hook para mostrar alertas
  
  useEffect(()=> { // useEffect hook para despachar una acción para obtener productos
    if(error!= null)
    {
      return alert.error(error); // Muestra una alerta si hay un error
    }

    dispatch(
      getProductPagination({ // Despacha una acción para obtener productos
        pageIndex: pageIndex,   // Índice de página
        pageSize: pageSize, // Tamaño de página
        search: search, // Búsqueda
        precioMax: precioMax, // Precio máximo
        precioMin: precioMin, // Precio mínimo
        categoryId: category, // Categoría
        rating: rating, // Calificación
      })
    );
  }, [
      dispatch, // Dependencia de dispatch
      error, // Dependencia de error
      alert, // Dependencia de alert
      search, // Dependencia de búsqueda
      pageSize, // Dependencia de tamaño de página
      pageIndex, // Dependencia de índice de página
      precioMax, // Dependencia de precio máximo
      precioMin, // Dependencia de precio mínimo
      category, // Dependencia de categoría
      rating // Dependencia de calificación
  ]);

  // Función para establecer el número de página actual
  function setCurrentPageNo(pageNumber) {
    dispatch(setPageIndex({pageIndex: pageNumber})); // Despacha la acción setPageIndex con el número de página
  }

  // Función para manejar el cambio de precio
  function onChangePrecio(precioEvent) {
    setPrecio(precioEvent); // Establece el precio con el evento de cambio
  }

  // Función para manejar el cambio de precio después de la acción
  function onAfterChange(precioEvent) {
    dispatch(updatePrecio({precio: precioEvent})); // Despacha la acción updatePrecio con el evento de cambio
  }

  // Función para cambiar la categoría
  function onChangeCategory(ctg) {
    dispatch(updateCategory({category: ctg.id})); // Despacha la acción updateCategory con la categoría
  }

  return (
    <Fragment>
      <MetaData titulo={'Los mejores productos online'} /> {/* Componente MetaData con título */}
      <section id="products" className="container mt-5"> {/* Sección de productos */}
        <div className="row">
          {
          search 
          ? (
            <React.Fragment>
              <div className="col-6 col-md-3 mt-5 mb-5"> {/* Columna para el filtro de precios */}
                <div className="px-5">
                  <Range
                    marks = {{ 1: `$1`, 10000: `$10000` }} // Marcadores del rango de precios
                    min = {1} // Precio mínimo
                    max = {10000} // Precio máximo
                    defaultValue = {[1, 10000]} // Valor por defecto del rango
                    tipFormatter = {value => `$${value}`} // Formateador de tooltip
                    value = {precio} // Valor del rango
                    tipProps = {{
                      placement: "top",
                      visible: true
                    }}
                    onChange = {onChangePrecio} // Evento de cambio de precio
                    onAfterChange = {onAfterChange} // Evento después del cambio de precio
                  />
                </div>
                <hr className="my-5" />
                <div className="mt-5">
                  <h4 className="mb-3">Categorías</h4>
                  <ul className="pl-0">
                    { categories.map(ctg => (
                      <li style={{cursor:"pointer", listStyleType:"none"}} key={ctg.id} onClick={() => onChangeCategory(ctg)}>
                        {ctg.nombre}
                      </li>
                    )) }
                  </ul>

                </div>
              </div>
              <div className="col-6 col-md-9"> {/* Columna para los productos */}
                <div className="row">
                  <Products col={4} products={products} loading={loading} /> {/* Componente Products con productos y estado de carga */}
                </div>
              </div>
            </React.Fragment>
          )
          : <Products col={4} products={products} loading={loading} /> // Componente Products sin filtro de búsqueda
          }
        </div>
      </section>
      <div className="d-flex justify-content-center mt-5"> {/* Contenedor de paginación */}
          <Pagination 
            activePage={pageIndex} // Página activa
            itemsCountPerPage={pageSize} // Cantidad de ítems por página
            totalItemsCount={count} // Conteo total de ítems
            onChange={setCurrentPageNo} // Función para cambiar la página
            nextPageText={">"} // Texto para la siguiente página
            prevPageText={"<"} // Texto para la página anterior
            firstPageText={"<<"} // Texto para la primera página
            lastPageText={">>"} // Texto para la última página
            item-class="page-item" // Clase para el ítem
            linkClass="page-link" // Clase para el enlace
          />
      </div>
    </Fragment>
  );
};

export default Home; // Exporta el componente Home