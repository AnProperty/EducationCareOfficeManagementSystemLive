const Employee = require("../../model/Employee.model");
const archiver = require('archiver');
const JSZip = require('jszip');
const axios = require('axios');

const {
  GetAllEmployeeListServices,
  GetAllStudenteListServices,
  addEmployee,
  GetAllCommissionListServices,
  addNewRoleEmployee
} = require("../../services/superAdminServices/superAdmin.services");
const { downloadFullFolder } = require("../../services/cloudinaryService");
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
    const employeeData = req.body;
console.log("8974122222222223",employeeData);

    const newEmployee = await addNewRoleEmployee(employeeData)
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
    console.log('Request received:', req.params);
    const employee = await CreateEmployee.findOne(req.params);
    console.log('Employee found:', employee);

    if (!employee) {
      console.log('Employee not found');
      return res.status(404).json({ error: 'Employee not found' });
    }

    let fileUrls = [];
    employee.profilePic & fileUrls.push(employee.profilePic)
    employee.cv & fileUrls.push(employee.cv)
    employee.resume & fileUrls.push(employee.resume)

    console.log(fileUrls)

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

exports.filterLeadsController = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    console.log(req.params);

    const query = {};
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    } else if (startDate) {
      query.createdAt = {
        $gte: new Date(startDate)
      };
    } else if (endDate) {
      query.createdAt = {
        $lte: new Date(endDate)
      };
    }
    console.log("object", query);
    const data = await CreateStudent.find({
      $and: [
        { createdAt: query.createdAt },
        req.params,
      ],

    }).lean();
    console.log("Filtereddddddddddddddddd", data);



    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};



