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
    studentDocs.ssc &
      studentDocs.ssc.sscCertificate &
      fileUrls.push(studentDocs.ssc.sscCertificate);
    studentDocs.ssc &
      studentDocs.ssc.sscTranscript &
      fileUrls.push(studentDocs.ssc.sscTranscript);

    studentDocs.hsc &
      studentDocs.hsc.hscCertificate &
      fileUrls.push(studentDocs.hsc.hscCertificate);
    studentDocs.hsc &
      studentDocs.hsc.hscTranscript &
      fileUrls.push(studentDocs.hsc.hscTranscript);
    studentDocs.hsc &
      studentDocs.hsc.hscRecommendation &
      fileUrls.push(studentDocs.hsc.hscRecommendation);

    studentDocs.hons &
      studentDocs.hons.honsCertificate &
      fileUrls.push(studentDocs.hons.honsCertificate);
    studentDocs.hons &
      studentDocs.hons.honsTranscript &
      fileUrls.push(studentDocs.hons.honsTranscript);
    studentDocs.hons &
      studentDocs.hons.honsRecommendation &
      fileUrls.push(studentDocs.hons.honsRecommendation);

    studentDocs.masters &
      studentDocs.masters.mscCertificate &
      fileUrls.push(studentDocs.masters.mscCertificate);
    studentDocs.masters &
      studentDocs.masters.mscTranscript &
      fileUrls.push(studentDocs.masters.mscTranscript);
    studentDocs.masters &
      studentDocs.masters.mscRecommendation &
      fileUrls.push(studentDocs.masters.mscRecommendation);

    studentDocs.utilities &
      studentDocs.utilities.ielts &
      fileUrls.push(studentDocs.utilities.ielts);
    studentDocs.utilities &
      studentDocs.utilities.cv &
      fileUrls.push(studentDocs.utilities.cv);
    studentDocs.utilities &
      studentDocs.utilities.passport &
      fileUrls.push(studentDocs.utilities.passport);
    studentDocs.utilities &
      studentDocs.utilities.extraCA &
      fileUrls.push(studentDocs.utilities.extraCA);
    studentDocs.utilities &
      studentDocs.utilities.bankSolvency &
      fileUrls.push(studentDocs.utilities.bankSolvency);

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
