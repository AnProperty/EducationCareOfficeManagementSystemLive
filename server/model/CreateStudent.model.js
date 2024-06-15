const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const CreateStudentSchema = mongoose.Schema({
    status: String,
    studentId: { type: String, required: true },
    applicant: [{
        id: String,
        applicantId: String,
        applicant_name: String
    }],
    agreeTerms: String,
    anyCountryRefusal: String,
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    parentPhone: String,
    bankName: String,
    bankStatement: String,
    beforeAppliedAgent: String,
    beforeAppliedUniversity: String,
    chosenCountryName: String,
    city: String,
    counselor: {
        employee_id: String,
        employee_name: String,
        id: {
            type: ObjectId,
            ref: "CreateEmployee"
        }
    },
    country: String,
    course: String,
    courseTitle1: String,
    courseTitle2: String,
    courseTitle3: String,
    courseTitle4: String,
    dob: String,
    englishProficiency: String,
    fullName: String,
    grade1: String,
    grade2: String,
    grade3: String,
    grade4: String,
    group1: String,
    group2: String,
    group3: String,
    group4: String,
    howKnow: String,
    institute1: String,
    institute2: String,
    institute3: String,
    institute4: String,
    intake: String,
    overall: String,
    listening: String,
    specking: String,
    reading: String,
    writing: String,
    passingYear1: String,
    passingYear2: String,
    passingYear3: String,
    passingYear4: String,
    postalCode: String,
    probableDate: String,
    street: String,
    testDate: String,
    universityChoice: String,
    advices: String
}, {
    timestamps: true
});

const CreateStudent = mongoose.model('CreateStudent', CreateStudentSchema);

module.exports = CreateStudent;
