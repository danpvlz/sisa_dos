import React, {useEffect} from 'react'

import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../../redux/actions/Participante";

export default function SearchParticipants({setVal,idVal}) {
  const dispatch = useDispatch();
  const filterParticipants = useSelector(({ participante }) => participante.filterParticipants);
  const handleInputChange = (inputValue, actionMeta) => {
      inputValue.length >= 2 && dispatch(filter(inputValue));
  }
  return (
    <Select
      placeholder="Seleccione..."
      id="searchParticipants"
      name="searchParticipants"
      className="select-style"
      isClearable={true}
      onInputChange={handleInputChange}
      onChange={(inputValue, actionMeta) => {
        setVal(inputValue != null ? inputValue.value : null);
      }}
      options={filterParticipants} 
      value={filterParticipants.find(a=>a.value==idVal)}
      />
  )
}
