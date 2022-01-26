import {Row} from "reactstrap";
import Button from "../Button/Button";
import Input from "../Input/Input";
import React, {useContext} from "react";
import Select from "../Select/Select";
import './AddTask.scss'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import {TaskPriority, TasksContext} from "../../context/Tasks";



library.add(faPlus)
const AddTask = () => {
    const {items, setItems} = useContext(TasksContext);
    const [taskName, setTaskName] = React.useState("");
    const [priority, setPriority] = React.useState("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectOptions, setSelectOptions] = React.useState([{value: "1", label: TaskPriority.Trivial}, {
        value: "2",
        label: TaskPriority.Urgent
    }, {value: "3", label: TaskPriority.Regular}]);

    const inputRef = React.useRef<HTMLInputElement>(null);
    const selectRef = React.useRef<HTMLSelectElement>(null);

    const handleChange = (e: any) => {
        setTaskName(e.target.value);
    };


    const onChangeSelect = (e: any) => {
        setPriority(e.target.value);

    };

    const addTask = () => {

        if (taskName.trim().length > 0 && priority.length > 0) {

            setItems([...items, {
                // @ts-ignore
                id: Math.max(...items.map(item => item.id)) + 1,
                name: taskName,
                priority: [priority as keyof TaskPriority][0] // https://stackoverflow.com/a/64217699/14329168
            }]);
            setTaskName("");
            setPriority("");
            inputRef.current?.focus();
        }
    };


    return (
        <div className="add-task">
            <div className="title">Create New Job</div>
            <Row className="align-items-end">
                <div className="title-section col-8">
                    <div className="input-title">Job Name</div>
                    <Input ref={inputRef} onChange={handleChange} value={taskName} placeholder={""} isSearch={false}/>
                </div>
                <div className="priority-section col-3">
                    <div className="input-title">Priority</div>
                    <Select hasDefault={true} onChange={(e)=>onChangeSelect(e)} ref={selectRef}
                            options={selectOptions}/>
                </div>
                <div className='button-wrapper col-1'>
                    <Button icon={faPlus} text={"Create"} className={"px-2"} onClick={addTask}/>
                </div>
            </Row>
        </div>
    )
}

export default AddTask;