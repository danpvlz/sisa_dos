import React, { useState } from 'react'

import Select from 'react-select';

export default function SearchComiteGremial() {
    const comiteGremial = require('../../data/filtroComiteGremial.json');
    const [searchComiteGremial, setSearchComiteGremial] = useState([]);
    const handleInputChange = (inputValue, actionMeta) => {
        setSearchComiteGremial(
        inputValue.length >= 2 ? comiteGremial : []
      );
    }
    
    return (
        <Select
            placeholder="Seleccione..."
            name="searchComiteGremial"
            id="searchComiteGremial"
            className="select-style"
            onInputChange={handleInputChange}
            onChange={(inputValue, actionMeta) => {
                console.log(inputValue.value);
            }}
            options={searchComiteGremial} />
    )
}
