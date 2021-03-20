import React, {useState} from 'react'

import Select from 'react-select';

export default function SearchColaborador() {
    const [searchColaborador, setSearchColaborador] = useState([]);
    const handleInputChange = (inputValue, actionMeta) => {
      setSearchColaborador(
        inputValue.length>=2 ? [
            { value: '1', label: 'Daniela Paiva' },
            { value: '2', label: 'Alejandra Paiva' },
            { value: '3', label: 'Mileidy Quintero' }
          ] : []
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
