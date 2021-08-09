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
        if(setLabel){
          setLabel(inputValue != null ? inputValue.label : null);
        }
        if(setprice){
          setprice(inputValue && inputValue.price ? inputValue.price : 0);
        }
        if(setInmutable){
          setInmutable(inputValue != null ? inputValue.inmutable : null);
        }
        
      }}
      options={conceptoFilter} 
      defaultValue={defaultVal}
      />
  )
}
