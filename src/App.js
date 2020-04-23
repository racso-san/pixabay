import React, { useState,useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';
import { match } from 'minimatch';

function App() {

  const [busqueda,guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1); // Paginador
  const [totalpaginas, guardarTotalPaginas] = useState(1); // Paginador


  useEffect(() => {
    const consultarAPI = async() =>{
      if(busqueda==='') return; // No trae valores en la primera

      const imagenesPorPagina = 30;
      const key = '1732750-d45b5378879d1e877cd1d35a6';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;
      //  const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      // Caclcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);
    }
    consultarAPI();
  }, [busqueda]);

  return (
  
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes
        </p>

        <Formulario
          guardarBusqueda={guardarBusqueda}
        />

      </div>

      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />
      </div>

    </div>

  );
}

export default App;
