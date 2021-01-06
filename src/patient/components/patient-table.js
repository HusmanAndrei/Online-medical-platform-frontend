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
        Header: 'Name',
        accessor: 'name'
    },
    {
        Header: 'Address',
        accessor: 'address',
    },
    {
        Header: 'Birth Date',
        accessor: 'birthDate',
    },
    {
        Header: 'Gender',
        accessor: 'gender'
    },
    {
        Header: 'Medical Record',
        accessor: 'medicalRecord'
    },
    {
        Header: 'Caregiver ID',
        accessor: 'caregiverId'
    },
    // {
    //     Header: 'Medical Plan ID',
    //     accessor: 'medicalPlanId'
    // }
];

const filters = [
    {
        accessor: 'name',
    }
];

class PatientTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log("sould comp update table")
        return true
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

export default PatientTable;