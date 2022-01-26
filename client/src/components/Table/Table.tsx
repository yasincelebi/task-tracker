import './Table.scss'
import React, {ReactNode, useEffect} from "react";


const Table = ({className, data, filterClick}: TableProps) => {
    const [filteredData, setFilteredData] = React.useState(data);

    const getReactNodeToString = (node: any): string | number => {
        if (typeof node === 'string' || typeof node === 'number') {
            return node;
        }
        console.log(node)
        return node.props.children
    };

    // filter data.rows[i] from reactnode to string
    const filterData = (data: TableData): any[] => {
        return data.rows.map((row: string[] | ReactNode[]) => {
            return row.map((node: ReactNode) => {
                return getReactNodeToString(node)
            })
        })
    };




    useEffect(() => {
        setFilteredData({...data, rows: filterData(data)})


    }, [data])
    return (
        <>
        <table className={`${className} table-container`}>
            <thead>
            <tr>
                {data && data.cols.length && data.cols.map((column, index) => (
                    <th onClick={()=> filterClick && filterClick(column)} className={`col-md-${column.ratio.toString()}`} key={index}>
                        {column.data}
                    </th>
                ))}
            </tr>


            </thead>
            <tbody>
            {
                data && data.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, index) => (
                            <td key={index}>{cell}</td>
                        ))}
                        {data.buttons &&
                        <td key={rowIndex} className={'d-flex justify-content-center flex-row gap-1'}>
                            {data.buttons && data.buttons.map((button, index) => (
                                <div key={index} onClick={() => button.onClick(filteredData.rows[rowIndex])}>{button.node}</div>
                            ))}
                        </td>
                        }
                    </tr>
                ))
            }
            </tbody>

        </table>

        </>
    )

}
export default Table;


export interface TableProps {
    className?: string;
    data: TableData
    filterClick?: (column: Column) => void
}

export interface TableData {
    cols: Column[];
    rows: string[][] | ReactNode[][];
    buttons?: ButtonData[];
}

export interface Column {
    ratio: number // 1-12
    data: string,
}

export interface ButtonData {
    node: string | ReactNode;
    onClick: <T>(data: T | T[]) => T | T[] | void;
}


