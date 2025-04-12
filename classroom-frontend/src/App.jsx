import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import './App.css'; 

import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";
import IndexClass from "./components/Indexclass";

import ClassPage from "./components/pages/ClassPage";
import HomePage from "./components/pages/HomePage";
import AllStudent from "./components/AllStudent";
import UserSetting from "./components/UserSetting";
import AllTeacher from "./components/AllTeacher";
import TeacherEnrollment from "./components/TeacherEnrollment";
import StudentEnrollment from "./components/StudentEnrollment";
import ADMINPayment from "./components/Payment";

import TeacherIndexClass from "./teacher/TeacherIndexClass";
import TeacherHomePage from "./teacher/teacherpages/TeacherHomePage";
import TeacherClassPage from "./teacher/teacherpages/TeacherClassPage";
import TeacherAllStudent from "./teacher/othermain/TeacherAllStudent";
import TeacherStudentEnrollment from "./teacher/othermain/TeacherStudentEnrollment";
import TeacherUserSetting from "./teacher/othermain/TeacherUserSetting";
import TeacherStudentWork from "./teacher/teacherpages/TeacherStudentWork";
import TeacherPayment from "./teacher/Payment";



import Classwork from "./components/pages/Classwork";
import StudentWork from "./components/pages/StudentWork";
import StudentIndexClass from "./student/StudentIndexClass";
import StudentHomePage from "./student/studentpages/StudentHomePage";
import StudentClassPage from "./student/studentpages/StudentClassPage";

import StudentStudentWork from "./student/studentpages/StudentStudentWork";
import StudentUserSetting from "./student/userSetting";
import Payment from "./student/StudentPayment";
 import { ToastContainer, toast } from 'react-toastify';

//  import toast from "react-hot-toast";


const App = () => {
  return (
    <Router>
      <div>
      <ToastContainer
        position="top-center" // other options: top-left, bottom-right, etc.
        autoClose={3000}      // time in ms
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"       // options: "light", "dark", "colored"
        toastClassName="custom-toast"
      />

        {/* Routes define the main content for each route */}
        <Routes>
          {/* Home route */}
          <Route
            path="/"
            element={<Main/> }
          />

          {/* Login route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* IndexClass with Sidebar & Dynamic Content */}
        <Route path="/indexclass/*" element={<IndexClass />}>
          <Route index element={<HomePage />} />
          <Route path="class/:id" element={<ClassPage />} />
          <Route path="allstudent" element={<AllStudent/>}></Route>
          <Route path="allteacher" element={<AllTeacher/>}></Route>
          <Route path="studentenrollment" element={<StudentEnrollment/>}></Route>
          <Route path="teacherenrollment" element={<TeacherEnrollment/>}></Route>
          <Route path="payment" element={<ADMINPayment/>}></Route>
          <Route path="usersetting" element={<UserSetting/>}></Route>
          <Route path="student-work/:assignementId" element={<StudentWork />} />
        </Route>

      {/* Teacher DashBoard */}
        <Route path="/teacherindexclass/*" element={<TeacherIndexClass/>}>
          <Route index element={<TeacherHomePage/>} />
          <Route path="teacherclass/:id" element={<TeacherClassPage />} />
          <Route path="teacherallstudent" element={<TeacherAllStudent/>}></Route>
          <Route path="teacherstudentenrollment" element={<TeacherStudentEnrollment/>}></Route>
          <Route path="teacherusersetting" element={<TeacherUserSetting/>}></Route>
          <Route path="student-work/:assignementId" element={<TeacherStudentWork />} />
          <Route path="payment" element={<TeacherPayment/>}></Route>
        
        
        </Route>

        {/* Student DashBoard */}
        <Route path="/studentindexclass/*" element={<StudentIndexClass/>}>
          <Route index element={<StudentHomePage/>}></Route>
          <Route path="studentclass/:id" element={<StudentClassPage />} />
          <Route path="student-work/:assignementId" element={<StudentStudentWork />} />
          <Route path="studentPayment" element={<Payment/>}></Route>
          <Route path="studentusersetting" element={<StudentUserSetting/>}></Route>
        
        
        </Route>
        
        

        </Routes>

       
      </div>
    </Router>
  );
};

export default App;
