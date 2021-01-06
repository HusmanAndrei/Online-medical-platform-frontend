import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';
import CaregiverForm from "./components/caregiver2-form";

import * as API_USERS from "./api/caregiver2-api"
import CaregiverTable2 from "./components/caregiver2-table";



class CaregiverContainer2 extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);
        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
            editedCaregiver: null,
            isCaregiver: (localStorage.getItem("role") === "CAREGIVER"),
            id: localStorage.getItem("id")

        };
    }

    // async deleteCaregiver(id){

    //     await API_USERS.deleteCaregiver(id, this.reload.bind(this))
    // }

    componentDidMount() {
         this.fetchPatients();
        console.log(localStorage.getItem("id"))
    }

    // editCaregiver(caregiver){
    //     this.setState({
    //         editedCaregiver: caregiver,
    //         selected: true
    //     })
    // }

    // async _editCaregiver(caregiver){
    //     caregiver.id = this.state.editedCaregiver.id;
    //     await API_USERS.editCaregiver(caregiver, () => this.reload());
    // }


    fetchPatients() {
        return API_USERS.getPatients(this.state.id,(result, status, err) => {

            if (result !== null && status === 200) {
                if(this.state.isCaregiver)
                result = result.map(patient => {
                    return {
                        ...patient,
                        // edit : <Button color="primary" onClick={() => this.editPatient(patient)}>Edit</Button>,
                        // delete : <Button color="primary" onClick={() => this.deletePatient(patient.id)}>Delete</Button>
                    }
                });
                else
                 result = result.map(patient => {
                    return {
                        ...patient
                    }
                });
                this.setState({
                    tableData: result,
                    isLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    // fetchCaregivers() {
    //     return API_USERS.getCaregivers((result, status, err) => {

    //         if (result !== null && status === 200) {
    //             this.setState({
    //                 tableData: result.map(c => ({
    //                     ...c,
    //                     edit : <Button color="primary" onClick={() => this.editCaregiver(c)}>Edit</Button>,
    //                     delete : <Button color="primary" onClick={() => this.deleteCaregiver(c.id)}>Delete</Button>

    //                 })),
    //                 isLoaded: true
    //             });
    //         } else {
    //             this.setState(({
    //                 errorStatus: status,
    //                 error: err
    //             }));
    //         }
    //     });
    // }

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    // addCaregiver(caregiver) {
    //     return API_USERS.postCaregiver(caregiver, (result, status, error) => {
    //         if (result !== null && (status === 200 || status === 201)) {
    //             console.log("Successfully inserted caregiver with id: " + result);
    //             this.reload();
    //         } else {
    //             this.setState(({
    //                 errorStatus: status,
    //                 error: error
    //             }));
    //         }
    //     });
    // }

    // async finishEdit(c){
    //     if(this.state.editedCaregiver !== null){
    //         await this._editCaregiver(c);
    //     }
    //     this.addCaregiver(c)
    // }

    reload() {
        this.setState({
            isLoaded: false,
            selected: false
        });
        //this.toggleForm();
        //this.fetchPatients();
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Caregiver Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {/* <Button color="primary" onClick={this.toggleForm}>Add Caregiver </Button> */}
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <CaregiverTable2 tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                        </Col>
                    </Row>
                </Card>
                { this.state.selected &&
                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add Caregiver: </ModalHeader>
                    <ModalBody>
                        <CaregiverForm caregiver={this.state.editedCaregiver}
                        finishEdit={(c) => this.finishEdit(c)}

                        />
                    </ModalBody>
                </Modal>
                }

            </div>
        )

    }
}


export default CaregiverContainer2;
