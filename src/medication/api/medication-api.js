import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    getAll: '/doctor/medications',
    getByID: '/doctor/medication/{id}',
    insert: '/doctor/medication',
    delete: '/doctor/medication/'
};

function getMedications(callback) {
    let request = new Request(HOST.backend_api + endpoint.getAll, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getMedicationById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.getByID + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postMedication(user, callback){
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

export function deleteMedication(cId, callback){
    let request = new Request(HOST.backend_api + endpoint.delete + cId, {
        method: 'DELETE',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
export function editMedication(medication, callback){
    let request = new Request(HOST.backend_api + endpoint.insert + "/" + medication.id, {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(medication)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

export {
    getMedications,
    getMedicationById,
    postMedication
};
