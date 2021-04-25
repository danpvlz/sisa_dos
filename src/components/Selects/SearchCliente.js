import React from 'react'

import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../../redux/actions/Cliente";

export default function SearchCliente({setVal,defaultVal,selectInputRef }) {
  const dispatch = useDispatch();
  const clienteFilter = useSelector(({ cliente }) => cliente.clienteFilter);
  const handleInputChange = (inputValue, actionMeta) => {
      inputValue.length >= 2 && dispatch(filter(inputValue));
  }
  return (
    <Select
      ref={selectInputRef}
      placeholder="Seleccione..."
      id="searchcliente"
      name="searchcliente"
      className="select-style"
      onInputChange={handleInputChange}
      isClearable={true}
      onChange={(inputValue, actionMeta) => {
        setVal(inputValue != null ? inputValue.value : null);
      }}
      options={clienteFilter} 
      defaultValue={defaultVal}
      />
  )
}
