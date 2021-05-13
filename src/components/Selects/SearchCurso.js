import React, { useState } from 'react'
import CreatableSelect from 'react-select/creatable';
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../../redux/actions/Curso";

export default function SearchCurso({ setVal, val, setNews, news }) {
  const dispatch = useDispatch();
  const filterCursos = useSelector(({ curso }) => curso.filterCursos);
  const handleInputChange = (inputValue, actionMeta) => {
    inputValue.length >= 2 && dispatch(filter(inputValue));
  }

  const handleCreate = (inputValue) => {
    let newVal = {
      value: Date.now(),
      label: inputValue,
      new: true,
    };
    setNews(news.concat(newVal));
    setVal(newVal);
  };

  return (
    <CreatableSelect
      placeholder="Seleccione..."
      id="searchCurso"
      className="select-style"
      formatCreateLabel={userInput => `Crear nuevo curso '${userInput}'`}
      isClearable
      onChange={(inputValue, actionMeta) => {
        setVal(inputValue);
      }}
      onInputChange={handleInputChange}
      onCreateOption={handleCreate}
      options={filterCursos.concat(news)}
      value={ val ? filterCursos.concat(news).find(c=>c.value==val.value) : null }
    />
  )
}
