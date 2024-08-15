const mongoose = require("mongoose");

const StudentDetailsSchema = mongoose.Schema(
  {
    studentId: { type: String, required: true },
    counselorId: { type: String, required: true },
    
    sscCertificate: { type: String },
    sscTranscript: { type: String },
    hscCertificate: { type: String },
    hscTranscript: { type: String },
    hscRecommendation: { type: String },
    honsCertificate: { type: String },
    honsTranscript: { type: String },
    honsRecommendation: { type: String },
    mscCertificate: { type: String },
    mscTranscript: { type: String },
    mscRecommendation: { type: String },
    ielts: { type: String },
    cv: { type: String },
    passport: { type: String },
    extraCA: { type: String },
    bankSolvency: { type: String },
  },
  {
    timestamps: true,
  }
);
const StudentDetailsModel = mongoose.model(
  "StudentDetails",
  StudentDetailsSchema
);

module.exports = StudentDetailsModel;
