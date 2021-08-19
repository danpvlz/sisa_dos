import React, { useState } from 'react'
import CreatableSelect from 'react-select/creatable';
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../../redux/actions/Promotor";

export default function SearchPromotor({ setVal, setNew,curVal }) {
    const dispatch = useDispatch();
    const promotorFilter = useSelector(({ promotor }) => promotor.promotorFilter);
    const [newOption, setnewOption] = useState(null);
    const handleInputChange = (inputValue, actionMeta) => {
        inputValue.length >= 2 && dispatch(filter(inputValue));
    }

    const handleCreate = (inputValue) => {
        let newVal = {
            value: 0,
            label: inputValue,
        };
        setNew(inputValue);
        setnewOption([newVal]);
    };
    
    return (
        <CreatableSelect
            placeholder="Seleccione..."
            id="searchPromotor"
            className="select-style"
            formatCreateLabel={userInput => `Crear promotor ${userInput}`}
            isClearable
            onChange={(inputValue, actionMeta) => {
              if(inputValue){
                setVal(inputValue != null ? {value:inputValue.value,label:inputValue.label} : null);
              }else{
                setNew(null);
                setnewOption(null);
              }
            }}
            onInputChange={handleInputChange}
            onCreateOption={handleCreate}
            options={ newOption ? newOption : promotorFilter }
            value={curVal}
        />
    )
}
