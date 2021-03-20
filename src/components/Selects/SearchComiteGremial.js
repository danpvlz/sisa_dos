import React, {useState} from 'react'

import Select from 'react-select';

export default function SearchComiteGremial() {
    const searchComiteGremial = [
      { value: '1', label: 'Daniela Paiva' },
      { value: '2', label: 'Alejandra Paiva' },
      { value: '3', label: 'Mileidy Quintero' }
    ];
    return (
        <Select 
        placeholder="Seleccione..."
        name="searchComiteGremial"
        id="searchComiteGremial"
        className="select-style"
        onChange={(inputValue, actionMeta) => {
            console.log(inputValue.value);
        }}
        options={searchComiteGremial} />
    )
}
