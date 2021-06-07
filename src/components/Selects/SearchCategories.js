import React, {useEffect} from 'react'

import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { filterCategories } from "../../redux/actions/Concepto";

export default function SearchCategories({setVal,idCategoria,idArea}) {
  const dispatch = useDispatch();
  const categoriasFilter = useSelector(({ concepto }) => concepto.categoriasFilter);

  useEffect(() => {
    if(idArea){
      dispatch(filterCategories(idArea));
    }
  }, [idArea,dispatch]);

  return (
    <Select
      placeholder="Seleccione..."
      id="SearchCategories"
      name="SearchCategories"
      className="select-style"
      isClearable={true}
      onChange={(inputValue, actionMeta) => {
        setVal(inputValue != null ? inputValue.value : null);
      }}
      options={categoriasFilter}
      value={categoriasFilter.find(c=>c.value === idCategoria)}
      />
  )
}