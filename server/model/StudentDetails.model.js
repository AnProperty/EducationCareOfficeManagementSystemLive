const mongoose = require("mongoose");

const StudentDetailsSchema = mongoose.Schema(
  {
    studentId: { type: String, required: true },
    counselorId: { type: String, required: true },
    ssc: {
      sscCertificate: String,
      sscTranscript: String,
    },
    hsc: {
      hscCertificate: String,
      hscTranscript: String,
      hscRecommendation: String,
    },
    hons: {
      honsCertificate: String,
      honsTranscript: String,
      honsRecommendation: String,
    },
    masters: {
      mscCertificate: String,
      mscTranscript: String,
      mscRecommendation: String,
    },

    utilities: {
      ielts: String,
      cv: String,
      passport: String,
      extraCA: String,
      bankSolvency: String,
    },
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
