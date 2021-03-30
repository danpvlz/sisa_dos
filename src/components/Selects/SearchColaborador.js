import React from 'react'

import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../../redux/actions/Colaborador";

export default function SearchColaborador({setVal}) {
  const dispatch = useDispatch();
  const workersFilter = useSelector(({ colaborador }) => colaborador.workersFilter);
  const handleInputChange = (inputValue, actionMeta) => {
      inputValue.length >= 2 && dispatch(filter(inputValue));
  }
  return (
    <Select
      placeholder="Seleccione..."
      id="searchWorker"
      name="searchWorker"
      className="select-style"
      onInputChange={handleInputChange}
      isClearable={true}
      onChange={(inputValue, actionMeta) => {
        setVal(inputValue != null ? inputValue.value : null);
      }}
      options={workersFilter} />
  )
}
