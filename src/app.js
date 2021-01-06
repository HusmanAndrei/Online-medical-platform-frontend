import React from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import Home from './home/home';
import Login from './login/login';
import PersonContainer from './person/person-container'
import PatientContainer from './patient/patient-container'
import DoctorContainer from './doctor/doctor-container'
import CaregiverContainer from './caregiver/caregiver-container'
import MedicationContainer from './medication/medication-container'
import CaregiverContainer2 from './caregiver2/caregiver2-container'


import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';

class App extends React.Component {

    // constructor(props, context) {
    //     super(props, context);

    //     this.state = {
    //         isLoaded = isLoaded
    //     };
    // }

    render() {

        return (
            <div className={styles.back}>
            <Router>
                <div>
                    <NavigationBar />
                    <Switch>

                        {/* <Route
                            exact
                            path='/login'
                            render={() => <Login/>}
                            
                            
                            // (this.state.isLoaded && (localStorage.get("role")=== "DOCTOR") 
                            // <Redirect to="/doctor"/>)}

                            // this.state.authenticated === true ?
                            //                        (this.state.userType === UserType.PATIENT ?
                            //                            <PatientHome {...props} tableIcons={tableIcons}/>
                            //                            : <Redirect to={'/'}/>)
                            //                        : <Redirect to={'/login'}/>
                             
                        /> */}

                        <Route
                            exact
                            path='/'
                            render={() => <Login/>}
                        />
                        <Route
                            exact
                            path='/medication'
                            render={() => <MedicationContainer/>}
                        />

                        {/* <Route
                            exact
                            path='/person'
                            render={() => <PersonContainer/>}
                        /> */}

                        <Route
                            exact
                            path='/patient'
                            render={() => <PatientContainer/>}
                        />
                        <Route
                            exact
                            path='/doctor'
                            render={() => <DoctorContainer/>}
                        />
                        <Route
                            exact
                            path='/caregiver'
                            render={() => <CaregiverContainer/>}
                        />
                        <Route
                            exact
                            path='/caregiver2'
                            render={() => <CaregiverContainer2/>}
                        />
                        

                        {/*Error*/}
                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage/>}
                        />

                        <Route render={() =><ErrorPage/>} />
                    </Switch>
                </div>
            </Router>
            </div>
        )
    };
}

export default App
