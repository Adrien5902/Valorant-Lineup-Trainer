import React, { useState } from 'react';
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function CustomSelect({options, onChange, hover, id}) {
    const [optionIndex, setOptionIndex] = useState(0)
    const [dropped, setDropped] = useState(false)

    return ( 
        <div className='custom-select' hover={hover} id={id} dropped={String(dropped)} onMouseLeave={()=>{if(dropped) setDropped(false)}}>
            <div className='custom-select-main' onClick={()=>{setDropped(!dropped)}}>
                {options[optionIndex]}
                <FontAwesomeIcon icon={faChevronDown}/>
            </div>

            <div className='custom-select-dropdown'>
                <div className='custom-select-dropdown-container'>
                    {options.map((option, i)=>
                        <div 
                            key={i}
                            onClick={() => {
                                setOptionIndex(i)
                                setDropped(false)
                                if(typeof onChange == "function") onChange(i)
                            }}
                        >{option}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CustomSelect;