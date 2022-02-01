import "./TaskList.scss";
import Input from "../Input/Input";
import React, { useContext, useEffect, useRef, useState } from "react";
import Select from "../Select/Select";
import Table, { TableData } from "../Table/Table";
import { Badge } from "reactstrap";
import { TaskPriority, TasksContext } from "../../context/Tasks";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import { useModal } from "../../hooks/useModal";
import PortalModal from "../Modal/Modal";
import ApproveModal from "../ApproveModal/ApproveModal";
import EditModal from "../EditModal/EditModal";
import axios from "axios";

library.add(faPencilAlt, faTrashAlt);

const TaskList = () => {
  const [modalOpen, setModalOpen, toggle] = useModal(false);
  const [modalType, setModalType] = useState<"approve" | "edit" | null>(null);
  const { items, setItems, localTasks } = useContext(TasksContext);
  const [selectedItem, setSelectedItem] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tableData, setTableData] = useState<TableData>();
  const [inputValue, setInputValue] = useState("");
  const [isSortedPriority, setIsSortedPriority] = useState(false);
  const [isSortedName, setIsSortedName] = useState(false);
  const [isSortedID, setIsSortedID] = useState(false);
  const [pritories, setPritories] = useState([]);

  const handleInpuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // @ts-ignore
    setFilteredData(
      items.filter((item) =>
        // @ts-ignore
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    handleTableData();
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const onChangeSelect = () => {
    if (selectRef?.current?.value === "Priority(All)") {
      setFilteredData(items);
    }

    setFilteredData(() =>
      // @ts-ignore
      items.filter((item) => item.priority === selectRef?.current?.value)
    );
    handleTableData();
  };

  const getBadge = (status: string) => {
    switch (status) {
      case TaskPriority.Regular:
        return <Badge color="primary">Regular</Badge>;
      case TaskPriority.Trivial:
        return <Badge color="warning">Trivial</Badge>;
      default:
        return <Badge color="danger">Urgent</Badge>;
    }
  };

  function sortBy(field: string | number, type: "asc" | "desc") {
    return function (a: any, b: any) {
      if (type === "asc") {
        // @ts-ignore
        return (a[field] < b[field]) - (a[field] > b[field]);
      } else {
        // @ts-ignore
        return (a[field] > b[field]) - (a[field] < b[field]);
      }
    };
  }

  const handleTableData = () => {
    const cols = [
      { data: "ID", ratio: 2 },
      { data: "Job Name", ratio: 7 },
      {
        data: "Status",
        ratio: 4,
      },
      { data: "Actions", ratio: 1 },
    ];
    // @ts-ignore

    let rows = items.map((item: any) => {
      return [item.id, item.name, getBadge(item.priority)];
    });

    // eslint-disable-next-line no-mixed-operators
    if (
      (inputRef.current && inputRef.current.value !== "") ||
      (selectRef.current && selectRef?.current?.value !== "Priority(All)")
    ) {
      rows = filteredData.map((item: any) => {
        return [item.id, item.name, getBadge(item.priority)];
      });
    }
    const buttons = [
      {
        node: <Button className={"bg-danger"} icon={faTrashAlt} />,
        onClick: (rowData: any) => openApproveModal(rowData),
      },
      {
        node: <Button icon={faPencilAlt} />,
        onClick: (rowData: any) => openEditModal(rowData),
      },
    ];

    setTableData({
      cols,
      rows,
      buttons,
    });
  };
  useEffect(() => {
    items.sort(sortBy("priority", "asc"));
    handleTableData();
  }, [items, localTasks, filteredData]);

  const deleteTask = () => {
    // @ts-ignore
    setItems(items.filter((item) => item.id !== selectedItem[0]));
    setSelectedItem([]);
    toggle();
  };
  const openApproveModal = (e: any) => {
    setModalType("approve");
    setSelectedItem(e);
    toggle();
  };

  const openEditModal = (e: any) => {
    setModalType("edit");
    setSelectedItem(e);
    toggle();
  };
  const editTask = (priority: string) => {
    const newItems = items.map((item: any) => {
      if (item.id === selectedItem[0]) {
        item.priority = priority;
      }
      return item;
    });
    setItems(newItems);
    setSelectedItem([]);
    toggle();
  };

  const sortData = (e: any) => {
    const value = e.data;
    if (value === "ID") {
      sortDataFunc("id", isSortedID, setIsSortedID);
    } else if (value === "Job Name") {
      sortDataFunc("name", isSortedName, setIsSortedName);
    } else if (value === "Status") {
      sortDataFunc("priority", isSortedPriority, setIsSortedPriority);
    }

    handleTableData();
  };

  const sortDataFunc = (
    field: string,
    state: React.ComponentState,
    setState: React.Dispatch<React.SetStateAction<any>>
  ) => {
    if (state) {
      items.sort(sortBy(field, "asc"));
      console.log(items);
      setState(false);
    } else {
      items.sort(sortBy(field, "desc"));
      console.log(items);
      setState(true);
    }
  };

  const getPriorities = () => {
    axios
      .get("http://localhost:5000")
      .then((res) => {
        setPritories(
          res.data.data.map((item: any) => {
            return { value: [item as keyof TaskPriority][0], label: item };
          })
        );
      })
      .then(() => {
        // @ts-ignore
        console.log("qweqwe");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPriorities();
  }, []);

  return (
    <>
      <div className="titles row">
        <div className="col-md-11">
          <div className="title">Job List</div>
        </div>
        <div className="col-md-1 ml-auto">
          <div className="sayac">3/3</div>
        </div>
      </div>
      <div className="background-container">
        <div className="group row">
          <div className={"col-md-8"}>
            <Input
              placeholder={"Job name"}
              ref={inputRef}
              onChange={handleInpuChange}
              value={inputValue}
              isSearch={true}
            />
          </div>

          <div className={"col-md-4"}>
            <Select
              hasDefault={false}
              onChange={onChangeSelect}
              ref={selectRef}
              options={[
                {
                  value: "Priority(All)",
                  label: "Priority(All)",
                },
                ...pritories,
              ]}
            />
          </div>
        </div>
      </div>
      {tableData && <Table filterClick={sortData} data={tableData} />}
      <PortalModal
        children={
          modalType === "approve" ? (
            <ApproveModal
              approve={deleteTask}
              toggle={toggle}
              content={"Are you sure you want to delete it?"}
              buttons={["Cancel", "Approve"]}
            />
          ) : (
            <EditModal
              toggle={toggle}
              edit={editTask}
              selectedPriority={selectedItem[2]}
              jobName={"qwe"}
            />
          )
        }
        isOpen={modalOpen}
      />
    </>
  );
};
export default TaskList;
