import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    getAllPatients: '/caregiver/patients',
    // getByID: '/doctor/caregiver/{id}',
    // insert: '/doctor/caregiver',
    // delete: '/doctor/caregiver/'
};

function getPatients(id, callback) {
    let request = new Request(HOST.backend_api + endpoint.getAllPatients + "/" + id, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getCaregivers(callback) {
    let request = new Request(HOST.backend_api + endpoint.getAllPatients, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getCaregiverById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.getByID + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postCaregiver(user, callback){
    let request = new Request(HOST.backend_api + endpoint.insert , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

export function deleteCaregiver(cId, callback){
    let request = new Request(HOST.backend_api + endpoint.delete + cId, {
        method: 'DELETE',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
export function editCaregiver(caregiver, callback){
    let request = new Request(HOST.backend_api + endpoint.insert + "/" + caregiver.id, {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(caregiver)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

export {
    getPatients,
    getCaregivers,
    getCaregiverById,
    postCaregiver
};
