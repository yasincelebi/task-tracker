import React from "react";
import ReactDOM from "react-dom";
import './Modal.scss'

const PortalModal = ({
                         children,
                         isOpen,
                     }: {
    children: React.ReactElement;
    isOpen: boolean;
}) => {
    if (!isOpen) return null;
    return ReactDOM.createPortal(
        <div className={"modal-overlay"}>
        <div className={'modal-wrapper'}
        >
            {children}
        </div>
                    </div>,

        document.body
    );
};

export default PortalModal;
