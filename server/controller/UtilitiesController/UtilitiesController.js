const JSZip = require("jszip");
const axios = require("axios");

const StudentDetailsModel = require("../../model/StudentDetails.model");
const {
  generateExcelFile,
  MoveStudent,
} = require("../../services/UtilitiesServices/utilitiesServices");
const UniversityDocsModel = require("../../model/UnivarsityDocsForVisa.model");
const CreateStudent = require("../../model/CreateStudent.model");
const CreateEmployee = require("../../model/CreateEmployee.model");
const ArchivedStudent = require("../../model/ArchivedStudent.model");

exports.downloadStudentDocumentController = async (req, res) => {
  try {
    const studentDocs = await StudentDetailsModel.findOne(req.params);

    if (!studentDocs) {
      return res.status(404).json({ error: "studentDocs not found" });
    }

    let fileUrls = [];
    studentDocs.sscCertificate & fileUrls.push(studentDocs.sscCertificate);

    studentDocs.sscTranscript & fileUrls.push(studentDocs.sscTranscript);

    studentDocs.hscCertificate & fileUrls.push(studentDocs.hscCertificate);

    studentDocs.hscTranscript & fileUrls.push(studentDocs.hscTranscript);

    studentDocs.hscRecommendation &
      fileUrls.push(studentDocs.hscRecommendation);

    studentDocs.honsCertificate & fileUrls.push(studentDocs.honsCertificate);

    studentDocs.honsTranscript & fileUrls.push(studentDocs.honsTranscript);

    studentDocs.honsRecommendation &
      fileUrls.push(studentDocs.honsRecommendation);

    studentDocs.mscCertificate & fileUrls.push(studentDocs.mscCertificate);

    studentDocs.mscTranscript & fileUrls.push(studentDocs.mscTranscript);

    studentDocs.mscRecommendation &
      fileUrls.push(studentDocs.mscRecommendation);

    studentDocs.ielts & fileUrls.push(studentDocs.ielts);

    studentDocs.cv & fileUrls.push(studentDocs.cv);

    studentDocs.passport & fileUrls.push(studentDocs.passport);

    studentDocs.extraCA & fileUrls.push(studentDocs.extraCA);

    studentDocs.bankSolvency & fileUrls.push(studentDocs.bankSolvency);

    fileUrls = fileUrls.filter((url) => url !== undefined);

    const zip = new JSZip();

    // Add files to the ZIP archive
    await Promise.all(
      fileUrls.map(async (fileUrl, index) => {
        const fileResponse = await axios.get(fileUrl, {
          responseType: "arraybuffer",
        });
        const extension = fileUrl.split(".").pop();
        zip.file(
          `${studentDocs.studentId}/file${index + 1}.${extension}`,
          fileResponse.data
        );
      })
    );

    // Generate the ZIP file
    const zipData = await zip.generateAsync({ type: "nodebuffer" });

    // Send the ZIP file as a response
    res.set("Content-Type", "application/zip");
    res.set(
      "Content-Disposition",
      `attachment; filename="${studentDocs.studentId}.zip"`
    );
    res.send(zipData);
  } catch (error) {
    console.error("Error downloading student's files:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.downloadUniDocsController = async (req, res) => {
  try {
    const uniDocs = await UniversityDocsModel.findOne(req.params);

    if (!uniDocs) {
      return res.status(404).json({ error: "studentDocs not found" });
    }

    let fileUrls = [];

    uniDocs.offerLetter & fileUrls.push(uniDocs.offerLetter);
    uniDocs.swiftCopy & fileUrls.push(uniDocs.swiftCopy);
    uniDocs.universityPaymentRecept &
      fileUrls.push(uniDocs.universityPaymentRecept);
    uniDocs.loa & fileUrls.push(uniDocs.loa);
    uniDocs.dol & fileUrls.push(uniDocs.dol);
    uniDocs.pal & fileUrls.push(uniDocs.pal);

    fileUrls = fileUrls.filter((url) => url !== "" && url != undefined);

    const zip = new JSZip();

    // Add files to the ZIP archive
    await Promise.all(
      fileUrls.map(async (fileUrl, index) => {
        const fileResponse = await axios.get(fileUrl, {
          responseType: "arraybuffer",
        });
        const extension = fileUrl.split(".").pop();
        zip.file(
          `${uniDocs.studentId}/file${index + 1}.${extension}`,
          fileResponse.data
        );
      })
    );

    // Generate the ZIP file
    const zipData = await zip.generateAsync({ type: "nodebuffer" });

    // Send the ZIP file as a response
    res.set("Content-Type", "application/zip");
    res.set(
      "Content-Disposition",
      `attachment; filename="${uniDocs.studentId}-${uniDocs.universityName}.zip"`
    );
    res.send(zipData);
  } catch (error) {
    console.error("Error downloading university's response files:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.downloadData = async (req, res) => {
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
      query.fullName = new RegExp(fullName, "i"); // Case-insensitive search
    }

    // Filter by status (only if status is not an empty string)
    if (status !== undefined) {
      query.status = status;
    }

    // Fetch data based on the constructed query
    const data = await CreateStudent.find(query).lean().sort({ createdAt: -1 });

    const buffer = generateExcelFile(data);

    res.setHeader("Content-Disposition", "attachment; filename=data.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.downloadDataForSpecificEmployeeController = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const { startDate, endDate, fullName, status } = req.query;

    // Log query params for debugging

    // Find the employee and populate students
    const employee = await CreateEmployee.findOne({ employee_id })
      .select("students")
      .populate({
        path: "students",
        match: {}, // Will apply the filters later
      });

    // If employee not found
    if (!employee) {
      return res.status(404).json({
        status: "fail",
        message: "Employee not found",
      });
    }

    // If there are no students
    if (!employee.students || employee.students.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "No students found for this employee",
        data: [],
      });
    }

    // Apply filters to students
    let filteredStudents = employee.students;

    // Filter by startDate and endDate
    if (startDate) {
      const start = new Date(startDate);
      filteredStudents = filteredStudents.filter(
        (student) => new Date(student.createdAt) >= start
      );
    }

    if (endDate) {
      const end = new Date(endDate);
      filteredStudents = filteredStudents.filter(
        (student) => new Date(student.createdAt) <= end
      );
    }

    // Filter by fullName (case-insensitive search)
    if (fullName) {
      const nameRegex = new RegExp(fullName, "i");
      filteredStudents = filteredStudents.filter((student) =>
        nameRegex.test(student.fullName)
      );
    }

    // Filter by status
    if (status !== undefined) {
      filteredStudents = filteredStudents.filter(
        (student) => student.status === status
      );
    }

    const buffer = generateExcelFile(filteredStudents);

    res.setHeader("Content-Disposition", "attachment; filename=data.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.downloadDateData = async (req, res) => {
  try {
    const data = req.body;

    const buffer = generateExcelFile(data);
    res.setHeader("Content-Disposition", "attachment; filename=data.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.filterApplicantController = async (req, res, next) => {
  try {
    const { employee_id } = req.params;
    const { startDate, endDate, fullName, status } = req.query;

    // Log query params for debugging

    // Find the employee and populate students
    const employee = await CreateEmployee.findOne({ employee_id })
      .select("students")
      .populate({
        path: "students",
        match: {}, // Will apply the filters later
      });

    // If employee not found
    if (!employee) {
      return res.status(404).json({
        status: "fail",
        message: "Employee not found",
      });
    }

    // If there are no students
    if (!employee.students || employee.students.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "No students found for this employee",
        data: [],
      });
    }

    // Apply filters to students
    let filteredStudents = employee.students;

    // Filter by startDate and endDate
    if (startDate) {
      const start = new Date(startDate);
      filteredStudents = filteredStudents.filter(
        (student) => new Date(student.createdAt) >= start
      );
    }

    if (endDate) {
      const end = new Date(endDate);
      filteredStudents = filteredStudents.filter(
        (student) => new Date(student.createdAt) <= end
      );
    }

    // Filter by fullName (case-insensitive search)
    if (fullName) {
      const nameRegex = new RegExp(fullName, "i");
      filteredStudents = filteredStudents.filter((student) =>
        nameRegex.test(student.fullName)
      );
    }

    // Standardize the status to always be an array
    let statusArray = [];
    if (typeof status === "string") {
      statusArray = [status]; // Convert single string to array
    } else if (Array.isArray(status)) {
      statusArray = status; // Already an array
    }

    // Filter by status if any
    if (statusArray.length > 0) {
      filteredStudents = filteredStudents.filter((student) =>
        statusArray.includes(student.status)
      );
    }

    // Send filtered students in the response
    res.status(200).json({
      status: "success",
      message: "Data fetched successfully",
      data: filteredStudents,
    });
  } catch (err) {
    // Error handling
    res.status(400).json({
      status: "fail",
      message: "Unable to fetch data",
      error: err.message,
    });
  }
};

exports.DeleteStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const employeeId = req.params.employeeId;
    const remove = await MoveStudent(studentId, employeeId);

    console.log("Move to archive done!");
    res.status(201).json({ data: remove });
  } catch (error) {
    console.error("Error downloading employee files:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getArchiveStudents = async (req, res) => {
  try {
    const archivedStudents = await ArchivedStudent.find().populate(
      "student removedFromEmployee"
    );
    res.json(archivedStudents);
  } catch (error) {
    console.error("Error fetching archived students:", error);
    res.status(500).json({ message: "Error fetching archived students" });
  }
};
exports.restoreStudentFromArchive = async (req, res) => {
  const { studentId, employeeId } = req.body;
  try {
    // Find the employee and add the student back to the students array
    await CreateEmployee.findByIdAndUpdate(employeeId, {
      $push: { students: studentId },
    });

    // Remove the student from ArchivedStudent collection
    await ArchivedStudent.findOneAndDelete({ student: studentId });

    res.json({ message: "Student restored successfully" });
  } catch (error) {
    console.error("Error restoring student:", error);
    res.status(500).json({ message: "Error restoring student" });
  }
};

exports.SuggestStudentsNameController = async (req, res, next) => {
  try {
    const { employee_id } = req.params;
    const { fullName } = req.query;

    // Check if fullName query param is provided
    if (!fullName) {
      return res.status(400).json({
        status: "fail",
        message: "fullName query parameter is required",
      });
    }

    // Find the employee by employee_id and populate students
    const employee = await CreateEmployee.findOne({ employee_id })
      .select("students")
      .populate({
        path: "students",
        match: { fullName: { $regex: fullName, $options: "i" } }, // Case-insensitive matching
        select: "fullName", // Only return the fullName field
      });

    // If employee not found
    if (!employee) {
      return res.status(404).json({
        status: "fail",
        message: "Employee not found",
      });
    }

    // Extract the fullName suggestions from the populated students
    const suggestions = employee.students.map((student) => student.fullName);

    // Send the suggestions back in the response
    res.status(200).json(suggestions);
  } catch (err) {
    // Error handling
    res.status(500).json({
      status: "fail",
      message: "Server error",
      error: err.message,
    });
  }
};
