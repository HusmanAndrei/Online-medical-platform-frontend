import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    // getAll: '/patient/patients',
    getById: '/patient/patient/{id}',
    // post: '/doctor/patient',
    // deleteByID: '/doctor/patient/',
    // edit: '/doctor/patient/'
};

// function getPatients(callback) {
//     let request = new Request(HOST.backend_api + endpoint.getAll, {
//         method: 'GET',
//     });
//     console.log(request.url);
//     RestApiClient.performRequest(request, callback);
// }

function getCaregivers(callback) {
    let request = new Request(HOST.backend_api + endpoint.getAllCaregivers, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

// function deletePatientById(id, callback){
//     let request = new Request(HOST.backend_api + endpoint.deleteByID + id, {
//        method: 'DELETE'
//     });
//     fetch(request);
//     callback();
// }

// async function editPatient(patient, callback){
//     let request = new Request(HOST.backend_api + endpoint.edit + patient.id, {
//        method: 'PUT',
//        headers : {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(patient)
//     });
//     await fetch(request);
//     callback();
// }

function getPatientById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.getById + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

// function postPatient(user, callback){
//     let request = new Request(HOST.backend_api + endpoint.post , {
//         method: 'POST',
//         headers : {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(user)
//     });

//     console.log("URL: " + request.url);

//     RestApiClient.performRequest(request, callback);
// }

export {
    // getPatients,
    getCaregivers,
    getPatientById,
    // postPatient,
    // deletePatientById,
    // editPatient

};
