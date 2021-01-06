import React from 'react';
import validate from "./validators/medication-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/medication-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';



class MedicationForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: true,

            formControls: {
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
                sideEffects: {
                    value: '',
                    placeholder: 'SideEffects...',
                    valid: true,
                    touched: false,
                },
                dosage: {
                    value: '',
                    placeholder: 'Dosage...',
                    valid: true,
                    touched: false,
                },
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
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
        let medication = {
            name: this.state.formControls.name.value,
            dosage: this.state.formControls.dosage.value,
            sideEffects: this.state.formControls.sideEffects.value,
        };

        console.log(medication);
        this.props.finishEdit(medication);
    }

    componentDidMount(){

            console.log("component mounting")
            this.updateFields();
        
    }

    updateFields = () => {
        if (this.props.medication){
            const values = this.props.medication;
            const formControls = this.state.formControls;
            console.log(values);
            this.setState({
                formControls : {
                    name : {
                        ...formControls.name,
                        value : values.name
                    },
                    dosage : {
                        ...formControls.dosage,
                        value : values.dosage
                    },
                    sideEffects : {
                        ...formControls.sideEffects,
                        value : values.sideEffects
                    },
                    
                }
            })
        }
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

                <FormGroup id='sideEffects'>
                    <Label for='sideEffectsField'> SideEffects: </Label>
                    <Input name='sideEffects' id='sideEffectsField' placeholder={this.state.formControls.sideEffects.placeholder}
                           onChange={this.handleChange}
                           value={this.state.formControls.sideEffects.value}
                           touched={this.state.formControls.sideEffects.touched? 1 : 0}
                           valid={this.state.formControls.sideEffects.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='dosage'>
                    <Label for='dosageField'> Dosage: </Label>
                    <Input name='dosage' id='dosageField' placeholder={this.state.formControls.dosage.placeholder}
                           onChange={this.handleChange}
                           value={this.state.formControls.dosage.value}
                           touched={this.state.formControls.dosage.touched? 1 : 0}
                           valid={this.state.formControls.dosage.valid}
                           required
                    />
                </FormGroup>              

                    <Row>
                        <Col sm={{size: '3', offset: 8}}>
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

export default MedicationForm;
