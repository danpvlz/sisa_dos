import React, {useEffect} from 'react'

import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../../redux/actions/ComiteGremial";

export default function SearchComiteGremial({setVal, curVal}) {
  const dispatch = useDispatch();
  const comiteGremialFilter = useSelector(({ comite }) => comite.comiteGremialFilter);
  useEffect(() => {
    dispatch(filter());
  }, [dispatch])
  return (
    <Select
      placeholder="Seleccione..."
      id="searchComite"
      name="searchComite"
      className="select-style"
      //onInputChange={handleInputChange}
      isClearable={true}
      onChange={(inputValue, actionMeta) => {
        setVal(inputValue != null ? {value:inputValue.value,label:inputValue.label} : null);
      }}
      options={comiteGremialFilter}
      value={curVal} />
  )
}
