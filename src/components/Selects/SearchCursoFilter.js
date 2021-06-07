import React, {useEffect} from 'react'

import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../../redux/actions/Curso";

export default function SearchCursoFilter({setVal,val,searchVal}) {
  const dispatch = useDispatch();
  const filterCursos = useSelector(({ curso }) => curso.filterCursos);
  const handleInputChange = (inputValue, actionMeta) => {
      inputValue.length >= 2 && dispatch(filter(inputValue));
  }

  useEffect(() => {
    if(searchVal!=null){
      dispatch(filter(searchVal,true));
    }
  }, [searchVal,dispatch]);

  return (
    <Select
      placeholder="Seleccione..."
      id="searchfilterCursos"
      name="searchfilterCursos"
      className="select-style"
      onInputChange={handleInputChange}
      isClearable={true}
      onChange={(inputValue, actionMeta) => {
        let newVal=inputValue != null ? inputValue.value : null;
        setVal(newVal);
      }}
      options={filterCursos}
      value={filterCursos.find(c=>c.value===val)}
      />
  )
}
