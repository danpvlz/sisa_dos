import React, {useEffect} from 'react'

import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../../redux/actions/Participante";

var timeOutFunc;
export default function SearchParticipants({setVal,participant,searched}) {
  const dispatch = useDispatch();
  const filterParticipants = useSelector(({ participante }) => participante.filterParticipants);
  const handleInputChange = (inputValue, actionMeta) => {
    if(inputValue.length >= 2){
      clearTimeout(timeOutFunc);
      timeOutFunc = setTimeout(() => {
        dispatch(filter(inputValue));
      }, 800);
    }
  }

  useEffect(() => {
    if(searched!=null){
      dispatch(filter(searched));
    }
  }, [searched,dispatch]);

  useEffect(() => {
    if(filterParticipants.length>0 && searched!=null){      
      setVal(filterParticipants.find(c=>c.dni===searched));
    }
  }, [filterParticipants,searched,setVal]);

  return (
    <Select
      placeholder="Seleccione..."
      id="searchParticipants"
      name="searchParticipants"
      className="select-style"
      isClearable={true}
      onInputChange={handleInputChange}
      onChange={(inputValue, actionMeta) => {
        setVal(inputValue);
      }}
      options={filterParticipants} 
      value={participant}
      />
  )
}
