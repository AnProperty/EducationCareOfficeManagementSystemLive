/* eslint-disable prettier/prettier */
import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './App.css'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import AdminOfficerPrivet from './PrivetRoute/AdminOfficerPrivet'
import CounselorPrivet from './PrivetRoute/CounselorPrivet'
import CounselorHomePage from './views/pages/Counselor/CounselorHomePage'
import Dashboard from './views/dashboard/Dashboard'
import StudentList from './views/Students/StudentList/StudentList'
import CreateStudent from './views/Students/CreateStudent/CreateStudent'
import DisplayStudentInformation from './views/Students/DisplayStudentInformation/DisplayStudentInformation'
import EmployeeList from './views/Employee/EmployeeList/EmployeeList'
import CreateEmployee from './views/Employee/CreateEmployee/CreateEmployee'
import EmployeeDetails from './views/Employee/EmployeeDetails/EmployeeDetails'
import DocumentsUploadsForm from './views/Students/DocumentsUploads/DocumentsUploadsForm'
import StudentsDocuments from './views/Students/StudentsDocuments/StudentsDocuments'
import SuperAdminPrivet from './PrivetRoute/SuperAdminPrivet'
//-----------//
import EnrolledStudentList from './views/Students/EnrolledStudentList/EnrolledStudentList'
import FollowUpStudentsList from './views/Students/FollowUpStudentsList/FollowUpStudentsList'
import ApplicationProcessingStudentList from './views/Students/ApplicationProcessingStudentList/ApplicationProcessingStudentList'
import VisaProcessingStudentList from './views/Students/VisaprocessingStudentList/VisaProcessingStudentList'
import SuccessStudentList from './views/Students/SuccessStudentList/SuccessStudentList'
//-----------//
import Receptionist from './components/Receptionist/Receptionist'
import ReceptionistPrivet from './PrivetRoute/ReceptionistPrivet'
import ApplicationForm from './views/pages/AdminOfficer/ApplicationForm/ApplicationForm'
import AssignVisaTeamWithAllDocuments from './views/pages/AdminOfficer/AssignVisaTeamWithAllDocuments/AssignVisaTeamWithAllDocuments'
import VisaTeamLayOut from './layout/VisaTeamLayOut'
import VisaTeamDashBoard from './views/pages/VisaTeam/VisaTeamDashBoard/VisaTeamDashBoard'
import VisaTeamPrivet from './PrivetRoute/VisaTeamPrivet'
import NessecaryStudentDocuments from './views/pages/VisaTeam/NessecaryStudentDocuments/NessecaryStudentDocuments'
import UniversityList from './views/University/UniversityList/UniversityList'
import Commission from './views/B2B/Commission/Commission'
import StudentListFromWeb from './views/pages/Counselor/StudentListFromWeb/StudentListFromWeb'
import WebStudentsDetailsPage from './views/pages/Counselor/WebStudentsDetailsPage/WebStudentsDetailsPage'



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
