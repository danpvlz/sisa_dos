import React from 'react'

import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../../redux/actions/Concepto";

export default function SearchConcepto({setVal,setLabel,defaultVal,selectInputRef,setInmutable,setprice }) {
  const dispatch = useDispatch();
  const {conceptoFilter} = useSelector(({ concepto }) => concepto);
  const handleInputChange = (inputValue, actionMeta) => {
      inputValue.length >= 2 && dispatch(filter(inputValue));
  }
  return (
    <Select
      ref={selectInputRef}
      placeholder="Seleccione..."
      id="searchconcepto"
      name="searchconcepto"
      className="select-style"
      onInputChange={handleInputChange}
      isClearable={true}
      onChange={(inputValue, actionMeta) => {
        setVal(inputValue != null ? inputValue.value : null);
        setLabel(inputValue != null ? inputValue.label : null);
        if(setInmutable){
          setInmutable(inputValue != null ? inputValue.inmutable : null);
          setprice(inputValue != null ? inputValue.price : null);

        }
      }}
      options={conceptoFilter} 
      defaultValue={defaultVal}
      />
  )
}
