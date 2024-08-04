const CreateEmployee = require("../../model/CreateEmployee.model");
const CreateStudent = require("../../model/CreateStudent.model");

exports.getCounselorStudentByCounselorId = async (query) => {
  const requestedInfo = await CreateEmployee.find(query)
    .select("students")
    .populate({
      path: "students",
    });

  return requestedInfo;
};
exports.AssignStudentToApplicantServices = async (query, body) => {
  console.log("query", query);
  console.log("lyuiyiytu", query.studentId);

  await CreateEmployee.updateOne(
    {
      _id: query.apllicantId,
    },
    {
      $push: {
        students: query.studentId,
      },
    }
  );
  await CreateStudent.updateOne(
    {
      _id: query.studentId,
    },
    {
      $push: {
        applicant: body.applicant,
      },
      $set: {
        status: "application-processing",
      },
    }
  );

  const stdInfo = await CreateStudent.find({
    _id: query.studentId,
  });
  const allApplicant = [...stdInfo[0].applicant];
  console.log("allApplicant", allApplicant);
  return allApplicant;
};

exports.makeAdvicesServices = async (query, body) => {
  console.log("query", query);
  console.log("lyuiyiytu", body);

  const lol = await CreateStudent.updateOne(
    {
      $and: [
        { 'studentId': query.studentId },
        { 'counselor.employee_id': query.counselorId },
      ],
    },
    {
      $set: {
        advices: body,
      },
    }
  );

  console.log(lol)
  const stdInfo = await CreateStudent.find({
    $and: [
      { 'studentId': query.studentId },
      { 'counselor.employee_id': query.counselorId },
    ],
  });
  const advicesList = stdInfo[0].advices;
  console.log("allApplicant", advicesList);
  return advicesList;
};
