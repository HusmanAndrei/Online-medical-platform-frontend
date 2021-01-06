import React from 'react';
import validate from "./validators/patient-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/patient-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';



class PatientForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: true,

            formControls: {
                address: {
                    value: '',
                    placeholder: 'Cluj, Zorilor, Str. Lalelelor 21...',
                    valid: true,
                    touched: false,
                },
                birthDate: {
                    value: '',
                    placeholder: 'Birth date...',
                    valid: true,
                    touched: false,
                },
                gender: {
                    value: '',
                    placeholder: 'Gender...',
                    valid: true,
                    touched: false,
                },
                name: {
                    value: '',
                    placeholder: 'What is your name?...',
                    valid: true,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                password: {
                    value: '',
                    placeholder: 'Password...',
                    valid: true,
                    touched: false,
                },
                username: {
                    value: '',
                    placeholder: 'Username...',
                    valid: true,
                    touched: false,
                },
                medicalRecord: {
                    value: '',
                    placeholder: 'Medical record...',
                    valid: true,
                    touched: false,
                },
                caregiver_id: {
                    value: 1,
                    placeholder: 'Caregiver ID...',
                    valid: true,
                    touched: false,
                },
                medical_plan_id: {
                    value: 1,
                    placeholder: 'Medical plan ID...',
                    valid: true,
                    touched: false,
                }
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }

    componentDidMount(){
        console.log("component mounting")
        this.updateFields();
    }

    updateFields = () => {
        if (this.props.patientToEdit){
            const values = this.props.patientToEdit;
            const formControls = this.state.formControls;
            console.log(values);
            this.setState({
                formControls : {
                    address : {
                        ...formControls.address,
                        value : values.address
                    },
                    birthDate : {
                        ...formControls.birthDate,
                        value : values.birthDate
                    },
                    gender : {
                        ...formControls.gender,
                        value : values.gender
                    },
                    name : {
                        ...formControls.name,
                        value : values.name
                    },
                    password : {
                        ...formControls.password,
                        value : values.password
                    },
                    username : {
                        ...formControls.username,
                        value : values.username
                    },
                    medicalRecord : {
                        ...formControls.medicalRecord,
                        value : values.medicalRecord
                    },
                    caregiver_id : {
                        ...formControls.caregiver_id,
                        value : values.caregiver_id
                    },
                    medical_plan_id : {
                        ...formControls.medical_plan_id,
                        value : values.medical_plan_id
                    }
                }
            })
        }
    }


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    handleSubmit() {
        let patient = {
            name: this.state.formControls.name.value,
            address: this.state.formControls.address.value,
            birthDate: this.state.formControls.birthDate.value,
            gender: this.state.formControls.gender.value,
            password: this.state.formControls.password.value,
            username: this.state.formControls.username.value,
            medicalRecord: this.state.formControls.medicalRecord.value,
            caregiverId: this.state.formControls.caregiver_id.value,
            medicalPlanId: this.state.formControls.medical_plan_id.value,
            id: this.props.patientToEdit ? this.props.patientToEdit.id :  null
        };

        console.log(patient);
        this.props.finishEdit(patient);
        this.props.clearEdit();
    }


    render() {
        return (
            <div>

                <FormGroup id='name'>
                    <Label for='nameField'> Name: </Label>
                    <Input name='name' id='nameField' placeholder={this.state.formControls.name.placeholder}
                           onChange={this.handleChange}
                           value={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched? 1 : 0}
                           valid={this.state.formControls.name.valid}
                           required
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>


                <FormGroup id='address'>
                    <Label for='addressField'> Address: </Label>
                    <Input name='address' id='addressField' placeholder={this.state.formControls.address.placeholder}
                           onChange={this.handleChange}
                           value={this.state.formControls.address.value}
                           touched={this.state.formControls.address.touched? 1 : 0}
                           valid={this.state.formControls.address.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='birthDate'>
                    <Label for='birthDateField'> Birth date: </Label>
                    <Input name='birthDate' id='birthDateField' placeholder={this.state.formControls.birthDate.placeholder}
                           onChange={this.handleChange}
                           value={this.state.formControls.birthDate.value}
                           touched={this.state.formControls.birthDate.touched? 1 : 0}
                           valid={this.state.formControls.birthDate.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='gender'>
                    <Label for='genderField'> Gender: </Label>
                    <Input name='gender' id='genderField' placeholder={this.state.formControls.gender.placeholder}
                           onChange={this.handleChange}
                           value={this.state.formControls.gender.value}
                           touched={this.state.formControls.gender.touched? 1 : 0}
                           valid={this.state.formControls.gender.valid}
                           required
                    />
                </FormGroup>


                <FormGroup id='username'>
                    <Label for='usernameField'> Username: </Label>
                    <Input name='username' id='usernameField' placeholder={this.state.formControls.username.placeholder}
                           onChange={this.handleChange}
                           value={this.state.formControls.username.value}
                           touched={this.state.formControls.username.touched? 1 : 0}
                           valid={this.state.formControls.username.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='password'>
                    <Label for='passwordField'> Password: </Label>
                    <Input name='password' id='passwordField' placeholder={this.state.formControls.password.placeholder}
                           onChange={this.handleChange}
                           value={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched? 1 : 0}
                           valid={this.state.formControls.password.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='medicalRecord'>
                    <Label for='medicalRecordField'> Medical Record: </Label>
                    <Input name='medicalRecord' id='medicalRecordField' placeholder={this.state.formControls.medicalRecord.placeholder}
                           onChange={this.handleChange}
                           value={this.state.formControls.medicalRecord.value}
                           touched={this.state.formControls.medicalRecord.touched? 1 : 0}
                           valid={this.state.formControls.medicalRecord.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='caregiver_id'>
                    <Label for='caregiver_idField'> Caregiver ID: </Label>
                    <Input name='caregiver_id' id='caregiver_idField' placeholder={this.state.formControls.caregiver_id.placeholder}
                           onChange={this.handleChange}
                           value={this.state.formControls.caregiver_id.value}
                           touched={this.state.formControls.caregiver_id.touched? 1 : 0}
                           valid={this.state.formControls.caregiver_id.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='medical_plan_id'>
                    <Label for='medical_plan_idField'> Medical Plan ID: </Label>
                    <Input name='medical_plan_id' id='medical_plan_idField' placeholder={this.state.formControls.medical_plan_id.placeholder}
                           onChange={this.handleChange}
                           value={this.state.formControls.medical_plan_id.value}
                           touched={this.state.formControls.medical_plan_id.touched? 1 : 0}
                           valid={this.state.formControls.medical_plan_id.valid}
                           required
                    />
                </FormGroup>


                    <Row>
                        <Col sm={{size: '9', offset: 8}}>
                            <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Submit </Button>
                        </Col>
                    </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}

export default PatientForm;
