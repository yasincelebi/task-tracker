import React, {LegacyRef} from "react";
import './Select.scss'

const Select = React.forwardRef(({options, className, onChange, hasDefault}: SelectProps, ref: LegacyRef<HTMLSelectElement> | undefined) => {


    return (
        <div className={'input-container'}>
            <select  ref={ref} className={className} onChange={onChange}>
                {
                    hasDefault &&
                    <option value={"0"} selected={true} disabled={true}>Choose</option>
                }
                {options.map((option, index) => {
                    return <option selected={option.selected} key={index} value={option.label}>{option.label}</option>
                })}
            </select>
        </div>
    );
});

export default Select;

export interface SelectProps {
    options:
        {
            value: string,
            label: string,
            selected?: boolean
        }[],
    className?: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    hasDefault?: boolean;
}