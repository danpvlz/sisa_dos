import React from 'react'

import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../../redux/actions/Asociado";

export default function SearchAsociado({setVal, selectInputRef}) {
  const dispatch = useDispatch();
  const associatedFilter = useSelector(({ asociado }) => asociado.associatedFilter);
  const handleInputChange = (inputValue, actionMeta) => {
      inputValue.length >= 2 && dispatch(filter(inputValue));
  }
  return (
    <Select
      ref={selectInputRef}
      placeholder="Seleccione..."
      id="searchAsociado"
      name="searchAsociado"
      className="select-style"
      onInputChange={handleInputChange}
      isClearable={true}
      onChange={(inputValue, actionMeta) => {
        setVal(inputValue != null ? inputValue.value : null);
      }}
      options={associatedFilter} />
  )
}
