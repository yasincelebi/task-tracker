
import {library} from "@fortawesome/fontawesome-svg-core";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './ApproveModal.scss'


library.add(faExclamationCircle)
const ApproveModal = ({content, buttons, toggle, approve}: IApproveModal) => {

    return (
        <div className={'approve-modal-wrapper'}>
            <div className="icon"><FontAwesomeIcon style={{color: 'red'}} size={'3x'} icon={faExclamationCircle}/></div>
            <div className="content">{content}</div>
            <div className="buttons">
                <div onClick={toggle} className="approve-btn cancel">{buttons[0]}</div>
                <div onClick={approve} className="approve-btn approve">{buttons[1]}</div>
            </div>
        </div>
    );
};

export default ApproveModal;


export interface IApproveModal {
    content?: string;
    buttons: string[];
    toggle: () => void;
    approve: (e: any) => any
}