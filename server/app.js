const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");


const superAdminRoute = require("./Routes/v1/superAdmin.route");
const receptionistRoute = require("./Routes/v1/receptionist.route");
const logInRoute = require("./Routes/v1/logIn.route");
const CounselorRoute = require("./Routes/v1/counselor.route");
const ApplicantRoute = require("./Routes/v1/applicant.route");
const ApplicantRouteForUploadAllDocuments = require("./Routes/v1/applicant.route.foruploadalluniversity");
const StudentRoute = require("./Routes/v1/students.route");
const VisaTeamRoute = require("./Routes/v1/visa.route");
const UtilitiesRoute = require("./Routes/v1/utilities.route");


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://www.antgec.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use("/uploads", express.static("./uploads"));


app.use('/api/v1/super-admin', superAdminRoute)
app.use("/api/v1/applicant/upload-all-university-document", ApplicantRouteForUploadAllDocuments);
app.use("/api/v1/applicant", ApplicantRoute);
app.use("/api/v1/student", StudentRoute);
app.use("/api/v1/receptionist", receptionistRoute);
app.use("/api/v1/login", logInRoute);
app.use("/api/v1/counselor", CounselorRoute);
app.use("/api/v1/visa", VisaTeamRoute);
app.use("/api/v1/utilities", UtilitiesRoute);



app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
