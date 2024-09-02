/* eslint-disable prettier/prettier */
import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './App.css'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
const AdminOfficerPrivet = React.lazy(() => import('./PrivetRoute/AdminOfficerPrivet'));
const CounselorPrivet = React.lazy(() => import('./PrivetRoute/CounselorPrivet'));
const CounselorHomePage = React.lazy(() => import('./views/pages/Counselor/CounselorHomePage'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const StudentList = React.lazy(() => import('./views/Students/StudentList/StudentList'));
const CreateStudent = React.lazy(() => import('./views/Students/CreateStudent/CreateStudent'));
const DisplayStudentInformation = React.lazy(() => import('./views/Students/DisplayStudentInformation/DisplayStudentInformation'));
const EmployeeList = React.lazy(() => import('./views/Employee/EmployeeList/EmployeeList'));
const CreateEmployee = React.lazy(() => import('./views/Employee/CreateEmployee/CreateEmployee'));
const EmployeeDetails = React.lazy(() => import('./views/Employee/EmployeeDetails/EmployeeDetails'));
const DocumentsUploadsForm = React.lazy(() => import('./views/Students/DocumentsUploads/DocumentsUploadsForm'));
const StudentsDocuments = React.lazy(() => import('./views/Students/StudentsDocuments/StudentsDocuments'));
const SuperAdminPrivet = React.lazy(() => import('./PrivetRoute/SuperAdminPrivet'));
//-----------//
const EnrolledStudentList = React.lazy(() => import('./views/Students/EnrolledStudentList/EnrolledStudentList'));
const FollowUpStudentsList = React.lazy(() => import('./views/Students/FollowUpStudentsList/FollowUpStudentsList'));
const ApplicationProcessingStudentList = React.lazy(() => import('./views/Students/ApplicationProcessingStudentList/ApplicationProcessingStudentList'));
const VisaProcessingStudentList = React.lazy(() => import('./views/Students/VisaprocessingStudentList/VisaProcessingStudentList'));
const SuccessStudentList = React.lazy(() => import('./views/Students/SuccessStudentList/SuccessStudentList'));

//-----------//
const Receptionist = React.lazy(() => import('./components/Receptionist/Receptionist'))
const ReceptionistPrivet = React.lazy(() => import('./PrivetRoute/ReceptionistPrivet'))
const ApplicationForm = React.lazy(() => import('./views/pages/AdminOfficer/ApplicationForm/ApplicationForm'))
const AssignVisaTeamWithAllDocuments = React.lazy(() => import('./views/pages/AdminOfficer/AssignVisaTeamWithAllDocuments/AssignVisaTeamWithAllDocuments'))

const VisaTeamLayOut = React.lazy(() => import('./layout/VisaTeamLayOut'));
const VisaTeamDashBoard = React.lazy(() => import('./views/pages/VisaTeam/VisaTeamDashBoard/VisaTeamDashBoard'));
const VisaTeamPrivet = React.lazy(() => import('./PrivetRoute/VisaTeamPrivet'));
const NessecaryStudentDocuments = React.lazy(() => import('./views/pages/VisaTeam/NessecaryStudentDocuments/NessecaryStudentDocuments'));
const UniversityList = React.lazy(() => import('./views/University/UniversityList/UniversityList'));
const Commission = React.lazy(() => import('./views/B2B/Commission/Commission'));
const ReCycleStudent = React.lazy(() => import('./views/ReCycleStudent/ReCycleStudent'));
const StudentListFromWeb = React.lazy(() => import('./views/pages/Counselor/StudentListFromWeb/StudentListFromWeb'));
const WebStudentsDetailsPage = React.lazy(() => import('./views/pages/Counselor/WebStudentsDetailsPage/WebStudentsDetailsPage'));
const DisplayCounselorEnrolledStudents = React.lazy(() => import('./views/pages/Counselor/DisplayCounselorEnrolledStudents/DisplayCounselorEnrolledStudents'));
const DisplayCounselorFollowUpStudents = React.lazy(() => import('./views/pages/Counselor/DisplayCounselorFollowUpStudents/DisplayCounselorFollowUpStudents'));
const DisplayAdminOfficerOngoingList = React.lazy(() => import('./views/pages/AdminOfficer/DisplayAdminOfficerOngoingList/DisplayAdminOfficerOngoingList'));
const DisplayAdminOfficerCompletedList = React.lazy(() => import('./views/pages/AdminOfficer/DisplayAdminOfficerCompletedList/DisplayAdminOfficerCompletedList'));
const DisplayVisaStudentsOngoingList = React.lazy(() => import('./views/pages/VisaTeam/DisplayVisaStudentsOngoingList/DisplayVisaStudentsOngoingList'));
const DisplayVisaStudentsCompletedList = React.lazy(() => import('./views/pages/VisaTeam/DisplayVisaStudentsCompletedList/DisplayVisaStudentsCompletedList'));



// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const AdminOfficerLayout = React.lazy(() => import('./layout/AdminOfficerLayout'))
const CounselorLayout = React.lazy(() => import('./layout/CounselorLayout'))
const ReceptionistLayout = React.lazy(() => import('./layout/ReceptionistLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const LandingPage = React.lazy(() => import('./views/LandingPage/LandingPage'))
const AdminOfficerDashBoard = React.lazy(() => import('./views/pages/AdminOfficer/AdminOfficerDashBoard/AdminOfficerDashBoard'))





const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }
    setColorMode(storedTheme)
  }, [])

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/" name="Landing Page" element={<LandingPage />} />
          <Route exact path="/homepage" name="Landing Page" element={<LandingPage />} />
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route path="/*" name="Page 500" element={<Page500 />} />
          <Route exact path={`/file-upload/:studentId/:counselorId`} name="file-upload" element={<DocumentsUploadsForm />} />

          <Route>
            <Route path="/admin-officer" element={<AdminOfficerLayout />}>
              <Route path="/admin-officer/dashboard"
                element={<AdminOfficerPrivet> <AdminOfficerDashBoard /> </AdminOfficerPrivet>}
              />
              <Route path="/admin-officer/dashboard/application-processing"
                element={<AdminOfficerPrivet> <DisplayAdminOfficerOngoingList /> </AdminOfficerPrivet>}
              />
              <Route path="/admin-officer/dashboard/visa-processing"
                element={<AdminOfficerPrivet> <DisplayAdminOfficerCompletedList /> </AdminOfficerPrivet>}
              />
              <Route path="/admin-officer/student-details/:studentId/:counselorId"
                element={<AdminOfficerPrivet><DisplayStudentInformation /></AdminOfficerPrivet>}
              />
              <Route path="/admin-officer/student-documents/:studentId/:counselorId"
                element={<AdminOfficerPrivet><StudentsDocuments /></AdminOfficerPrivet>}
              />
              <Route path="/admin-officer/update-application-status/:studentId/:counselorId/:applicantId"
                element={<AdminOfficerPrivet><ApplicationForm /></AdminOfficerPrivet>}
              />
              <Route path="/admin-officer/assign-visa-team/:studentId/:counselorId/:applicantId"
                element={<AdminOfficerPrivet><AssignVisaTeamWithAllDocuments /></AdminOfficerPrivet>}
              />

            </Route>
          </Route>
          <Route>
            <Route path="/visa-process" element={<VisaTeamLayOut />}>
              <Route path="/visa-process/dashboard"
                element={<VisaTeamPrivet> <VisaTeamDashBoard /> </VisaTeamPrivet>}
              />
              <Route path="/visa-process/dashboard/visa-processing"
                element={<VisaTeamPrivet> <DisplayVisaStudentsOngoingList /> </VisaTeamPrivet>}
              />
              <Route path="/visa-process/dashboard/visa-processing"
                element={<VisaTeamPrivet> <DisplayVisaStudentsCompletedList /> </VisaTeamPrivet>}
              />
              <Route path="/visa-process/student-details/:studentId/:counselorId"
                element={<VisaTeamPrivet> <DisplayStudentInformation /> </VisaTeamPrivet>}
              />
              <Route path="/visa-process/student-documents/:studentId/:counselorId"
                element={<VisaTeamPrivet><StudentsDocuments /></VisaTeamPrivet>}
              />
              <Route path="/visa-process/all-university-documents/:studentId/:counselorId/:applicantId"
                element={<VisaTeamPrivet><NessecaryStudentDocuments /></VisaTeamPrivet>}
              />


            </Route>
          </Route>
          <Route>
            <Route path="/counselor" element={<CounselorLayout />}>
              <Route path="/counselor/dashboard"
                element={<CounselorPrivet> <CounselorHomePage /> </CounselorPrivet>}
              />
              <Route path="/counselor/dashboard/enrolled"
                element={<CounselorPrivet> <DisplayCounselorEnrolledStudents /> </CounselorPrivet>}
              />
              <Route path="/counselor/dashboard/follow-up"
                element={<CounselorPrivet> <DisplayCounselorFollowUpStudents /> </CounselorPrivet>}
              />
              <Route path="/counselor/student-details/:studentId/:counselorId"
                element={<CounselorPrivet><DisplayStudentInformation /></CounselorPrivet>}
              />
              <Route path="/counselor/student-documents/:studentId/:counselorId"
                element={<CounselorPrivet><StudentsDocuments /></CounselorPrivet>}
              />
              <Route path="/counselor/abroad-section"
                element={<CounselorPrivet>
                  <UniversityList />
                </CounselorPrivet>}
              />
              <Route path="/counselor/web-students"
                element={<StudentListFromWeb />}
              />
              <Route path="/counselor/web-student-details/:studentId"
                element={<WebStudentsDetailsPage />}
              />
            </Route>
          </Route>
          <Route>
            <Route path="/receptionist" element={<ReceptionistLayout />}>
              <Route path="/receptionist/dashboard"
                element={<ReceptionistPrivet><Receptionist /></ReceptionistPrivet>}
              />
              <Route path="/receptionist/student-details/:studentId/:counselorId"
                element={<ReceptionistPrivet><DisplayStudentInformation /></ReceptionistPrivet>}
              />
              <Route path="/receptionist/student/create-student"
                element={<ReceptionistPrivet><CreateStudent /></ReceptionistPrivet>}
              />
              <Route path="/receptionist/student/student-list"
                element={<ReceptionistPrivet><StudentList /></ReceptionistPrivet>}
              />

            </Route>
          </Route>



          <Route>

            <Route path="/super-admin" element={<DefaultLayout />}>

              <Route path="/super-admin/dashboard"
                element={<SuperAdminPrivet><Dashboard /></SuperAdminPrivet>}
              />

              <Route path="/super-admin/employee/create-employee"
                element={<SuperAdminPrivet><CreateEmployee /></SuperAdminPrivet>}
              />
              <Route path="/super-admin/update-application-status/:studentId/:counselorId/:applicantId"
                element={<SuperAdminPrivet><ApplicationForm /></SuperAdminPrivet>}
              />
              <Route path="/super-admin/employee/employee-list"
                element={<SuperAdminPrivet><EmployeeList /></SuperAdminPrivet>}
              />
              <Route path="/super-admin/employee/:id"
                element={<SuperAdminPrivet><EmployeeDetails /></SuperAdminPrivet>}
              />
              <Route path="/super-admin/employee/create-employee"
                element={<SuperAdminPrivet><CreateEmployee /></SuperAdminPrivet>}
              />
              <Route path="/super-admin/student/create-student"
                element={<SuperAdminPrivet><CreateStudent /></SuperAdminPrivet>}
              />
              <Route path="/super-admin/student-details/:studentId/:counselorId"
                element={<SuperAdminPrivet><DisplayStudentInformation /></SuperAdminPrivet>}
              />
              <Route path="/super-admin/student-documents/:studentId/:counselorId"
                element={<StudentsDocuments />}
              />
              <Route path="/super-admin/student/student-list"
                element={<SuperAdminPrivet><StudentList /></SuperAdminPrivet>}
              />
              <Route path="/super-admin/student/enrolled-student-list"
                element={<SuperAdminPrivet><EnrolledStudentList /></SuperAdminPrivet>}
              />
              <Route path="/super-admin/student/follow-up-student-list"
                element={<SuperAdminPrivet><FollowUpStudentsList /></SuperAdminPrivet>}
              />
              <Route path="/super-admin/student/application-processing-list"
                element={<SuperAdminPrivet><ApplicationProcessingStudentList /></SuperAdminPrivet>}
              />
              <Route path="/super-admin/student/visa-processing-list"
                element={<SuperAdminPrivet><VisaProcessingStudentList /></SuperAdminPrivet>}
              />
              <Route path="/super-admin/student/success"
                element={<SuperAdminPrivet><SuccessStudentList /></SuperAdminPrivet>}
              />
              <Route path="/super-admin/update-application-status/:studentId/:counselorId/:applicantId"
                element={<SuperAdminPrivet><ApplicationForm /></SuperAdminPrivet>}
              />
              <Route path="/super-admin/assign-visa-team/:studentId/:counselorId/:applicantId"
                element={<SuperAdminPrivet><AssignVisaTeamWithAllDocuments /></SuperAdminPrivet>}
              />
              <Route path="/super-admin/b2b/commission-list"
                element={<SuperAdminPrivet><Commission /></SuperAdminPrivet>}
              />
              <Route path="/super-admin/recycle/student-list"
                element={<SuperAdminPrivet><ReCycleStudent /></SuperAdminPrivet>}
              />
              <Route path="/super-admin/web-students"
                element={<StudentListFromWeb />}
              />
              <Route path="/super-admin/web-student-details/:studentId"
                element={<WebStudentsDetailsPage />}
              />


            </Route>
          </Route>


        </Routes>

      </Suspense>
    </BrowserRouter>
  )
}

export default App
