const JSZip = require("jszip");
const axios = require("axios");

const StudentDetailsModel = require("../../model/StudentDetails.model");
const {
  generateExcelFile,
} = require("../../services/UtilitiesServices/utilitiesServices");
const UniversityDocsModel = require("../../model/UnivarsityDocsForVisa.model");
const CreateStudent = require("../../model/CreateStudent.model");

exports.downloadStudentDocumentController = async (req, res) => {
  try {
    console.log("Request received:", req.params);
    const studentDocs = await StudentDetailsModel.findOne(req.params);
    console.log("student docs found:", studentDocs);

    if (!studentDocs) {
      console.log("studentDocs not found");
      return res.status(404).json({ error: "studentDocs not found" });
    }

    let fileUrls = [];
      studentDocs.sscCertificate &
      fileUrls.push(studentDocs.sscCertificate);

      studentDocs.sscTranscript &
      fileUrls.push(studentDocs.sscTranscript);

      studentDocs.hscCertificate &
      fileUrls.push(studentDocs.hscCertificate);
    
      studentDocs.hscTranscript &
      fileUrls.push(studentDocs.hscTranscript);
 
      studentDocs.hscRecommendation &
      fileUrls.push(studentDocs.hscRecommendation);

    
      studentDocs.honsCertificate &
      fileUrls.push(studentDocs.honsCertificate);
    
      studentDocs.honsTranscript &
      fileUrls.push(studentDocs.honsTranscript);
   
      studentDocs.honsRecommendation &
      fileUrls.push(studentDocs.honsRecommendation);

    
      studentDocs.mscCertificate &
      fileUrls.push(studentDocs.mscCertificate);
    
      studentDocs.mscTranscript &
      fileUrls.push(studentDocs.mscTranscript);
    
      studentDocs.mscRecommendation &
      fileUrls.push(studentDocs.mscRecommendation);

    
      studentDocs.ielts &
      fileUrls.push(studentDocs.ielts);

      studentDocs.cv &
      fileUrls.push(studentDocs.cv);
    
      studentDocs.passport &
      fileUrls.push(studentDocs.passport);

      studentDocs.extraCA &
      fileUrls.push(studentDocs.extraCA);

      studentDocs.bankSolvency &
      fileUrls.push(studentDocs.bankSolvency);

    fileUrls = fileUrls.filter((url) => url !== undefined);


    const zip = new JSZip();

    // Add files to the ZIP archive
    await Promise.all(
      fileUrls.map(async (fileUrl, index) => {
        const fileResponse = await axios.get(fileUrl, {
          responseType: "arraybuffer",
        });
        const extension = fileUrl.split('.').pop();
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
    console.log("Request received:", req.params);
    const uniDocs = await UniversityDocsModel.findOne(req.params);
    console.log("University docs found:", uniDocs);

    if (!uniDocs) {
      console.log("UniDocs not found");
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


    fileUrls = fileUrls.filter((url) => (url !== '' && url != undefined));
    console.log('fileUrlsssssssssss', fileUrls);

    const zip = new JSZip();

    // Add files to the ZIP archive
    await Promise.all(
      fileUrls.map(async (fileUrl, index) => {
        const fileResponse = await axios.get(fileUrl, {
          responseType: "arraybuffer",
        });
        const extension = fileUrl.split('.').pop();
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
    console.log("Received Query Params:", req.query);

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
    console.log(query);
    // Fetch data based on the constructed query
    const data = await CreateStudent.find(query).lean();

    const buffer = generateExcelFile(data);

    res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.downloadDateData = async (req, res) => {
  try {

    const data = req.body

    const buffer = generateExcelFile(data);
    res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (error) {
    res.status(500).send(error);
  }
};
