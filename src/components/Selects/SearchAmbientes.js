import React from 'react'

import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { filterAmbientes } from "../../redux/actions/Concepto";

export default function SearchAmbientes({setVal,setLabel,setprice,setInmutable,setSelected,selectInputRef}) {
  const dispatch = useDispatch();
  const {ambientesFilter} = useSelector(({ concepto }) => concepto);
  const handleInputChange = (inputValue, actionMeta) => {
      inputValue.length >= 2 && dispatch(filterAmbientes(inputValue));
  }
  return (
    <Select
      ref={selectInputRef}
      placeholder="Ambiente o equipo..."
      id="searchAmbientes"
      name="searchAmbientes"
      className="select-style"
      onInputChange={handleInputChange}
      isClearable={true}
      onChange={(inputValue, actionMeta) => {
        if(setSelected){
          setSelected({
            idAmbiente:inputValue != null ? inputValue.value : null,
            label:inputValue != null ? inputValue.label : null,
            price:inputValue && inputValue.price ? inputValue.price : 0,
            inmutable:inputValue != null ? inputValue.inmutable : null
          });
        }
        if(setVal){
          setVal(inputValue != null ? inputValue.value : null);
        }
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
      options={ambientesFilter} 
      />
  )
}
