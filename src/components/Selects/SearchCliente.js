import React, {useEffect} from 'react'

import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../../redux/actions/Cliente";

export default function SearchCliente({setVal,idCliente,defaultVal,selectInputRef, searchDoc }) {
  const dispatch = useDispatch();
  const clienteFilter = useSelector(({ cliente }) => cliente.clienteFilter);
  const handleInputChange = (inputValue, actionMeta) => {
      inputValue.length >= 2 && dispatch(filter(inputValue));
  }

  useEffect(() => {
    if(searchDoc!=null){
      dispatch(filter(searchDoc));
    }
  }, [searchDoc,dispatch]);

  useEffect(() => {
    if(clienteFilter.length>0 && searchDoc!=null){
      setVal(clienteFilter.find(c=>c.documento === searchDoc)?.value);
    }
    // eslint-disable-next-line
  }, [clienteFilter,searchDoc]);

  return (
    <Select
      ref={selectInputRef}
      placeholder="Cliente..."
      id="searchcliente"
      name="searchcliente"
      className="select-style"
      onInputChange={handleInputChange}
      isClearable={true}
      onChange={(inputValue, actionMeta) => {
        setVal(inputValue != null ? inputValue.value : null);
      }}
      options={clienteFilter} 
      defaultValue={defaultVal}
      value={clienteFilter.find(c=>c.value === idCliente)}
      />
  )
}
