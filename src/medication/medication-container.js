import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
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
import MedicationForm from "./components/medication-form";

import * as API_USERS from "./api/medication-api"
import MedicationTable from "./components/medication-table";



class MedicationContainer extends React.Component {

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
            editedMedication: null,
            isDoctor: (localStorage.getItem("role") === "DOCTOR")
        };
    }

    async deleteMedication(id){

        await API_USERS.deleteMedication(id, this.reload.bind(this))
    }

    componentDidMount() {
        this.fetchMedications();
    }

    editMedication(medication){
        this.setState({
            editedMedication: medication,
            selected: true
        })
    }

    async _editMedication(medication){
        medication.id = this.state.editedMedication.id;
        await API_USERS.editMedication(medication, () => this.reload());
    }

    fetchMedications() {
        if(localStorage.getItem("role") !== "DOCTOR"){
            return <Redirect to="/login"/>;
        }
        return API_USERS.getMedications((result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    tableData: result.map(c => ({
                        ...c,
                        edit : <Button color="primary" onClick={() => this.editMedication(c)}>Edit</Button>,
                        delete : <Button color="primary" onClick={() => this.deleteMedication(c.id)}>Delete</Button>

                    })),
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

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    addMedication(medication) {
        return API_USERS.postMedication(medication, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted medication with id: " + result);
                this.reload();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    async finishEdit(c){
        if(this.state.editedMedication !== null){
            await this._editMedication(c);
        }
        this.addMedication(c)
    }

    reload() {
        this.setState({
            isLoaded: false,
            selected: false
        });
        //this.toggleForm();
        this.fetchMedications();
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Medication Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    {
                        this.state.isDoctor?(
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm}>Add Medication </Button>
                        </Col>
                    </Row>):
                    <br/>
                    }
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <MedicationTable tableData = {this.state.tableData}/>}
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
                    <ModalHeader toggle={this.toggleForm}> Add Medication: </ModalHeader>
                    <ModalBody>
                        <MedicationForm medication={this.state.editedMedication}
                        finishEdit={(c) => this.finishEdit(c)}

                        />
                    </ModalBody>
                </Modal>
                }

            </div>
        )

    }
}


export default MedicationContainer;
