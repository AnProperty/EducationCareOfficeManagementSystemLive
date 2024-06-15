/* eslint-disable prettier/prettier */

import requests from "../httpServices";

class VisaTeamServices {
    updateStatus(id,date,status) {
        const body = {
            "status" : status,
        }
        return requests.patch(`/visa/update-visa-status/${id}/${date}`,body );
    }
    
}

export default  new VisaTeamServices();