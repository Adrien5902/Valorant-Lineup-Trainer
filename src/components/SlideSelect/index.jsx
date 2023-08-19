import React, { useEffect, useState } from 'react';
import './style.css'

/**
 * 
 * @param {{
 *      buttons : {
 *          text: string
 *          onChange: (buttonIndex: Number) => void
 *      }[]
 * }} param0 
 * @returns 
 */

function SlideSelect({buttons, defaultIndex = 0, id}) {
    const [buttonIndex, setButtonIndex] = useState(defaultIndex)
    /**
     * 
     * @param {HTMLElement} e 
     * @param {Number} i 
     */
    function handleChange(el, i){
        setButtonIndex(i)

        /** @type {HTMLDivElement} */
        const btn = el?.closest(".slider-select-button") ?? document.querySelectorAll(`#${id} .slider-select-button`)[i]
        const select = btn.parentNode
        /** @type {HTMLDivElement} */
        const slider = select.querySelector('.slider-select-slider')
        const btnPos = btn.getBoundingClientRect()
        const selectPos = select.getBoundingClientRect()

        slider.style.left = btnPos.left - selectPos.left + "px"
        slider.style.top = btnPos.top - selectPos.top + "px"
        slider.style.width = btn.clientWidth + "px"
        slider.style.height = btn.clientHeight + "px"
    }

    useEffect(()=>{
        handleChange(null, buttonIndex)
    }, [])

    return ( <div className='slider-select' id={id}>
        <div className='slider-select-slider'></div>
        {buttons.map(({text, onChange}, i) => (
            <div
                select={String(buttonIndex == i)}
                key={i}
                className='slider-select-button'
                onClick={e => {
                    handleChange(e.target, i)
                    if(typeof onChange == 'function') onChange(i)
                }}
            >
                <span className='slider-select-button-text'>{text}</span>
            </div>
        ))}
    </div>);
}

export default SlideSelect;