import React, { useState } from 'react'
import CreatableSelect from 'react-select/creatable';

export default function SearchPromotor({ searched, setSearched }) {
    const promotores = require('../../data/filtroPromotor.json');
    const [searchPromotor, setSearchPromotor] = useState([]);

    const handleChange = (newValue, actionMeta) => {
        setSearched(newValue)
    };

    const handleInputChange = (inputValue, actionMeta) => {
        setSearchPromotor(
            inputValue.length >= 2 ? promotores : []
        );
    }

    const handleCreate = (inputValue) => {
        let newOption = {
            value: 0,
            label: inputValue,
        };
        setSearchPromotor([newOption]);
        setSearched(newOption);
    };
    
    return (
        <CreatableSelect
            placeholder="Seleccione..."
            id="searchPromotor"
            className="select-style"
            formatCreateLabel={userInput => `Crear promotor ${userInput}`}
            isClearable
            onChange={handleChange}
            onInputChange={handleInputChange}
            onCreateOption={handleCreate}
            options={searchPromotor}
            value={searched}
        />
    )
}
