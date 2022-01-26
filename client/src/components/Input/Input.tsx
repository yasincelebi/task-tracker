import {library} from '@fortawesome/fontawesome-svg-core'


import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './Input.scss'
import React, { Ref} from "react";
import {faSearch} from '@fortawesome/free-solid-svg-icons'
library.add(faSearch)
const Input = React.forwardRef(({placeholder, onChange, value, isSearch,  className, ...style}: InputProps, ref: Ref<HTMLInputElement> | undefined) => {
    return (
        <div className={`input-container ${isSearch ? 'pd-20' : ''}`}>
            <input className={className} ref={ref} type="text" placeholder={placeholder} onChange={onChange}
                   value={value} {...style} />
            {isSearch && <FontAwesomeIcon icon={faSearch}/>}

        </div>
    )
})


export default Input;


export interface InputProps {
    placeholder?: string | "";
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string | "";
    isSearch: boolean | false;
    style?: React.CSSProperties | undefined;
    className?: string | undefined;
}