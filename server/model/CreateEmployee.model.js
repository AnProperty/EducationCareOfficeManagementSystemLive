const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;


const CreateEmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: true },
    familyPhone: { type: String, required: false },
    previousExperience: { type: String, required: false },
    password: { type: String, required: true },
    employee_id: { type: String, required: true },
    salary: { type: String, required: false },
    role: { type: String, required: true },
    profilePic: { type: String, required: true },
    cv: { type: String, required: true },
    resume: { type: String, required: false },
    students: [
        {
          type: ObjectId,
          ref: "CreateStudent",
        }
    ],
});

const CreateEmployee = mongoose.model('CreateEmployee', CreateEmployeeSchema);
module.exports = CreateEmployee;

