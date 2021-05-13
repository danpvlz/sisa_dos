import React, {useEffect} from 'react'

import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../../redux/actions/Participante";

export default function SearchParticipants({ setVal, val, searchVal }) {
  const dispatch = useDispatch();
  const filterParticipants = useSelector(({ participante }) => participante.filterParticipants);
  const handleInputChange = (inputValue, actionMeta) => {
    inputValue.length >= 2 && dispatch(filter(inputValue));
  }

  useEffect(() => {
    if(searchVal!=null){
      dispatch(filter(searchVal,true));
    }
  }, [searchVal]);

  return (
    <Select
      placeholder="Seleccione..."
      id="searchParticipants"
      name="searchParticipants"
      className="select-style"
      onInputChange={handleInputChange}
      isClearable={true}
      onChange={(inputValue, actionMeta) => {
        let newVal=inputValue != null ? inputValue.value : null;
        setVal('idParticipante',newVal);
      }}
      options={filterParticipants} 
      value={filterParticipants.find(c=>c.value==val)}
      />
  )
}
