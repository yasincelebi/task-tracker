import {MouseEventHandler, ReactNode} from "react";
import './Button.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

const Button = ({onClick, text,className, icon}: ButtonProps) => {
  return (
    <button className={className + ' primary'} onClick={onClick} >
      {icon && <FontAwesomeIcon icon={icon} style={{marginInline: 5}} />}
        {text}
    </button>
  );
};
export default Button;

export interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>
  text?: string | ReactNode;
  className?: string;
  icon?: IconProp
}