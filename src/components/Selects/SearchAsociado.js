import React, { useState } from 'react'

import Select from 'react-select';

export default function SearchAsociado() {
  const asociados = require('../../data/filtroColaborador.json');
  const [searchAsociado, setSearchAsociado] = useState([]);
  const handleInputChange = (inputValue, actionMeta) => {
    setSearchAsociado(
      inputValue.length >= 2 ? asociados : []
    );
  }
  return (
    <Select
      placeholder="Seleccione..."
      id="searchAsociado"
      name="searchAsociado"
      className="select-style"
      onInputChange={handleInputChange}
      onChange={(inputValue, actionMeta) => {
        console.log(inputValue.value);
      }}
      options={searchAsociado} />
  )
}
