import requests from "../httpServices";

class StudentServices {
    uploadDocuments(body) {
        console.log(body);
        return requests.post('/students/:studentId/:counselorId', body);
    }
}


export default  new StudentServices();