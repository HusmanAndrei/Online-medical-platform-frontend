import React from "react";
import Table from "../../commons/tables/table";


const columns = [
    {
        Header: 'Delete',
        accessor: 'delete'
    },
    {
        Header: 'Edit',
        accessor: 'edit'
    },
    {   
        Header: 'ID',
        accessor: 'id'
    },
    
    {   
        Header: 'Name',
        accessor: 'name'
    },
    {
        Header: 'SideEffects',
        accessor: 'sideEffects',
    },
    {
        Header: 'Dosage',
        accessor: 'dosage',
    },
    
];

const filters = [
    {
        accessor: 'name',
    }
];

class MedicationTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
    }

    render() {
        return (
            <Table
                data={this.props.tableData}
                columns={columns}
                search={filters}
                pageSize={5}
            />
        )
    }
}

export default MedicationTable;