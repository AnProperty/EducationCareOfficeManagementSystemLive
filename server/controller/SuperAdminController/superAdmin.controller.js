const JSZip = require('jszip');
const axios = require('axios');

const {
  GetAllEmployeeListServices,
  GetAllStudenteListServices,
  addEmployee,
  GetAllCommissionListServices,
  addNewRoleEmployee,
  DeleteStudent
} = require("../../services/superAdminServices/superAdmin.services");
const CreateEmployee = require("../../model/CreateEmployee.model");
const CreateStudent = require("../../model/CreateStudent.model");


exports.GetAllEmployeeListController = async (req, res, next) => {
  try {
    const employeeList = await GetAllEmployeeListServices();
    res.status(200).json({
      status: "success",
      message: "Get Employee List successfully",
      data: employeeList,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: "Can't get Employee List!!!",
      error: err,
    });
  }
};
exports.GetAllStudentListController = async (req, res, next) => {
  try {
    const studentList = await GetAllStudenteListServices();
    res.status(200).json({
      status: "success",
      message: "Get Student List successfully",
      data: studentList,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: "Can't get Student List!!!",
      error: err,
    });
  }
};
exports.GetAllCommissionListController = async (req, res, next) => {
  try {
    const studentList = await GetAllCommissionListServices();
    res.status(200).json({
      status: "success",
      message: "Get Student List successfully",
      data: studentList,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: "Can't get Student List!!!",
      error: err,
    });
  }
};


exports.CreateEmployeeController = async (req, res, next) => {
  try {
    const employeeData = req.body;
    const files = req.files;
    const newEmployee = await addEmployee(employeeData, files)
    res.status(200).json({
      status: "success",
      message: "Employee Registration completed successfully",
      data: newEmployee,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.addNewRoleController = async (req, res, next) => {
  try {
    let employeeData = req.body;


    const total = await CreateEmployee.countDocuments();
    employeeData.employee_id = `gec-${total}`;

    const newEmployee = await addNewRoleEmployee(employeeData);
    res.status(200).json({
      status: "success",
      message: "Employee Registration completed successfully",
      data: newEmployee,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.DownloadEmployeeFiles = async (req, res) => {
  try {
    const employee = await CreateEmployee.findOne(req.params);


    if (!employee) {

      return res.status(404).json({ error: 'Employee not found' });
    }

    let fileUrls = [];
    employee.profilePic & fileUrls.push(employee.profilePic)
    employee.cv & fileUrls.push(employee.cv)
    employee.resume & fileUrls.push(employee.resume)



    const zip = new JSZip();

    // Add files to the ZIP archive
    await Promise.all(fileUrls.map(async (fileUrl, index) => {
      const fileResponse = await axios.get(fileUrl, { responseType: 'arraybuffer' });
      const extension = fileUrl.split('.').pop();
      zip.file(`${employee.name}/file${index + 1}.${extension}`, fileResponse.data);
    }));

    // Generate the ZIP file
    const zipData = await zip.generateAsync({ type: 'nodebuffer' });

    // Send the ZIP file as a response
    res.set('Content-Type', 'application/zip');
    res.set('Content-Disposition', `attachment; filename="${employee.name}.zip"`);
    res.send(zipData);

  } catch (error) {
    console.error('Error downloading employee files:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.DeleteStudent = async (req, res) => {
  try {

    const studentId = req.params.studentId;
    const employeeId = req.params.employeeId;
    const remove = await DeleteStudent(studentId, employeeId);

    console.log("Move to archive done!")
    res.status(201).json({ data: remove });
  } catch (error) {
    console.error('Error downloading employee files:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.filterLeadsController = async (req, res) => {
  try {
    const { startDate, endDate, fullName, status } = req.query;

    const query = {};

    // Filter by startDate and endDate
    if (startDate) {
      query.createdAt = { ...query.createdAt, $gte: new Date(startDate) };
    }
    if (endDate) {
      query.createdAt = { ...query.createdAt, $lte: new Date(endDate) };
    }

    // Filter by fullName
    if (fullName) {
      query.fullName = new RegExp(fullName, 'i'); // Case-insensitive search
    }

    // Filter by status (only if status is not an empty string)
    if (status !== undefined) {
      query.status = status;
    }
    // Fetch data based on the constructed query
    const data = await CreateStudent.find(query).lean().sort({ createdAt: -1 });


    res.send(data);
  } catch (error) {
    console.error('Error in filterLeadsController:', error);
    res.status(500).send(error);
  }
};


exports.getStudentNameSuggestions = async (req, res) => {
  try {
    const { fullName } = req.query;

    // Simple regex search to find students whose names match the input
    const suggestions = await CreateStudent.find({
      fullName: { $regex: fullName, $options: 'i' } // 'i' for case-insensitive
    }).limit(10).select('fullName'); // Limit the results and only select fullName field

    // Send back an array of fullName strings as suggestions
    res.json(suggestions.map(student => student.fullName));
  } catch (error) {
    console.error('Error fetching student name suggestions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.GetEmployeeStudentListBasedOnEmployeeId = async (req, res) => {
  try {

    console.log("hhhhhhhhhhhhhhhhhhhh", req.params);
    // Simple regex search to find students whose names match the input
    const Students = await CreateEmployee.find(req.params).select("students")
      .populate({
        path: "students",
      });
    console.log(Students);
    // Send back an array of fullName strings as suggestions
    res.send(Students);;
  } catch (error) {
    console.error('Error fetching student name suggestions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};






