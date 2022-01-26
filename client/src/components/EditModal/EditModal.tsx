
import Input from "../Input/Input";
import Select from "../Select/Select";
import {TaskPriorityConst} from "../../constants/Task";
import {TaskPriority} from "../../context/Tasks";
import {useEffect, useState} from "react";
import './EditModal.scss'
const EditModal = ({toggle, edit, jobName, selectedPriority}: EditModalProps) => {
    const [options, setOptions] = useState<any[]>([
        {value: TaskPriorityConst.Trivial, label: TaskPriorityConst.Trivial, selected: false},
        {value: TaskPriorityConst.Regular, label: TaskPriorityConst.Regular, selected: false},
        {value: TaskPriorityConst.Urgent, label: TaskPriorityConst.Urgent, selected: false}]);
    const [selectedOption, setSelectedOption] = useState<TaskPriority>(selectedPriority);
    console.log(selectedOption)
    useEffect(() => {
        setSelectedPriority()
    }, []);

    const setSelectedPriority = () => {
        setOptions(options.map(option => {
            if (option.value === selectedPriority) {
                option.selected = true;
            }
            return option;
        }));

    };

    const handleChange = (e: any) => {
        setSelectedOption(e.target.value);
    };






    return (
        <div className={'edit-modal-wrapper'}>
            <div className="title">
                Job Edit
            </div>
            <div className="input-wrapper">
                <label htmlFor="">Job Name</label>
                <Input onChange={() => {
                }} value={jobName} isSearch={false} className={'disabled-input'}/>
            </div>
            <div className="input-wrapper">
                <label>Priority</label>
                <Select options={options}
                        onChange={handleChange}/>
            </div>
            <div className="buttons">
                <div onClick={toggle} className="approve-btn cancel">Cancel</div>
                <div onClick={()=> edit(selectedOption)} className="approve-btn approve">Save</div>
            </div>
        </div>
    );
}

export default EditModal;

export interface EditModalProps {
    toggle?: () => void;
    edit: (selectedOption: any) => void;
    jobName: string;
    selectedPriority: TaskPriority
}