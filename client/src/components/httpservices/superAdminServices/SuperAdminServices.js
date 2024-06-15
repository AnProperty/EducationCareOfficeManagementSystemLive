/* eslint-disable prettier/prettier */

import requests from "../httpServices";

class SuperAdminServices {
    createEmployee(body) {
        console.log(body);
        return requests.post('/super-admin/create-employee', body);
    }
    
}


export default  new SuperAdminServices();