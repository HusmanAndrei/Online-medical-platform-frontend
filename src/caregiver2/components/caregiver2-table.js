import React from "react";
import Table from "../../commons/tables/table";


const columns = [
    
    {   
        Header: 'ID',
        accessor: 'id'
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
    
];

const filters = [
    {
        accessor: 'name',
    }
];

class CaregiverTable2 extends React.Component {

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

export default CaregiverTable2;