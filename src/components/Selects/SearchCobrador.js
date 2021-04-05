import React from 'react'

import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../../redux/actions/Cobrador";

export default function SearchCobrador({setVal,defaultVal}) {
  const dispatch = useDispatch();
  const debCollectorFilter = useSelector(({ cobrador }) => cobrador.debCollectorFilter);
  const handleInputChange = (inputValue, actionMeta) => {
      inputValue.length >= 2 && dispatch(filter(inputValue));
  }
  return (
    <Select
      placeholder="Seleccione..."
      id="searchDebCollector"
      name="searchDebCollector"
      className="select-style"
      onInputChange={handleInputChange}
      isClearable={true}
      onChange={(inputValue, actionMeta) => {
        setVal(inputValue != null ? inputValue.value : null);
      }}
      options={debCollectorFilter} 
      defaultValue={defaultVal}
      />
  )
}
