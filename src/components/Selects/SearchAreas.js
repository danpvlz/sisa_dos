import React, {useEffect} from 'react'

import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { filterAreas } from "../../redux/actions/Concepto";

export default function SearchAreas({setVal,idArea}) {
  const dispatch = useDispatch();
  const areasFilter = useSelector(({ concepto }) => concepto.areasFilter);
  useEffect(() => {
      dispatch(filterAreas());
  }, [dispatch])
  return (
    <Select
      placeholder="Seleccione..."
      id="searchAreas"
      name="searchAreas"
      className="select-style"
      isClearable={true}
      onChange={(inputValue, actionMeta) => {
        setVal(inputValue != null ? inputValue.value : null);
      }}
      options={areasFilter} 
      value={areasFilter.find(a=>a.value === idArea)}
      />
  )
}
