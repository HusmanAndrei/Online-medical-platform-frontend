import React from "react";
import Table from "../../commons/tables/table";


const columns = [
    {   
        Header: 'Name',
        accessor: 'name'
    },
    
];

const filters = [
    {
        accessor: 'name',
    }
];

class DoctorTable extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            tableData: this.props.tableData
        };
        console.log(this.state.tableData);
    }

    render() {
        return (
            <Table
                data={this.state.tableData}
                columns={columns}
                search={filters}
                pageSize={5}
            />
        )
    }
}

export default DoctorTable;