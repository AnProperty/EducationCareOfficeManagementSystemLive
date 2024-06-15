/* eslint-disable prettier/prettier */

import requests from "../httpServices";

class receptionistServices {
    createStudent(body) {
        console.log(body);
        return requests.post('/receptionist/create-student', body);
    }
    getStudentList() {
        return requests.get('/receptionist/get-student-list');
    }
    
}


export default  new receptionistServices();