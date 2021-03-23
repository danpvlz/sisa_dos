import React, { useState } from 'react'

import Select from 'react-select';

export default function SearchColaborador() {
  const colaboradores = require('../../data/filtroColaborador.json');
  const [searchColaborador, setSearchColaborador] = useState([]);
  const handleInputChange = (inputValue, actionMeta) => {
    setSearchColaborador(
      inputValue.length >= 2 ? colaboradores : []
    );
  }
  return (
    <Select
      placeholder="Seleccione..."
      id="searchColaborador"
      name="searchColaborador"
      className="select-style"
      onInputChange={handleInputChange}
      onChange={(inputValue, actionMeta) => {
        console.log(inputValue.value);
      }}
      options={searchColaborador} />
  )
}
