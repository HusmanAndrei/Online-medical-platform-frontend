import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    getAll: '/doctor/all',
    getByID: '/doctor/{id}',
    insert: '/doctor/insert'
};

function getDoctors(callback) {
    let request = new Request(HOST.backend_api + endpoint.getAll, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getDoctorById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.getByID + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postDoctor(user, callback){
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

export {
    getDoctors,
    getDoctorById,
    postDoctor
};
