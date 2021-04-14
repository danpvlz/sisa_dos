import React from 'react'

import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../../redux/actions/Promotor";

export default function SearchPromotor({setVal,defaultVal}) {
  const dispatch = useDispatch();
  const promotorFilter = useSelector(({ promotor }) => promotor.promotorFilter);
  const handleInputChange = (inputValue, actionMeta) => {
      inputValue.length >= 2 && dispatch(filter(inputValue));
  }
  return (
    <Select
      placeholder="Seleccione..."
      id="searchPromotorFilter"
      name="searchPromotorFilter"
      className="select-style"
      onInputChange={handleInputChange}
      isClearable={true}
      onChange={(inputValue, actionMeta) => {
        setVal(inputValue != null ? inputValue.value : null);
      }}
      options={promotorFilter} 
      defaultValue={defaultVal}
      />
  )
}
