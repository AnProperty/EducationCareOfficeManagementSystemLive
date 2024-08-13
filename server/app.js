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
const EmployeeRoleRoute = require("./Routes/v1/EmployeeRole.route.js");


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(cors({
  origin: ['http://antgec.com', 'http://www.antgec.com'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Add PATCH and DELETE here
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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
app.use("/api/v1/role", EmployeeRoleRoute);



app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
