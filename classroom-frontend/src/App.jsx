import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

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

import TeacherIndexClass from "./teacher/TeacherIndexClass";
import TeacherHomePage from "./teacher/teacherpages/TeacherHomePage";
import TeacherClassPage from "./teacher/teacherpages/TeacherClassPage";
import TeacherAllStudent from "./teacher/othermain/TeacherAllStudent";
import TeacherStudentEnrollment from "./teacher/othermain/TeacherStudentEnrollment";
import TeacherUserSetting from "./teacher/othermain/TeacherUserSetting";



const App = () => {
  return (
    <Router>
      <div>
        
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
          <Route path="usersetting" element={<UserSetting/>}></Route>
        </Route>

      {/* Teacher DashBoard */}
        <Route path="/teacherindexclass/*" element={<TeacherIndexClass/>}>
          <Route index element={<TeacherHomePage/>} />
          <Route path="teacherclass/:id" element={<TeacherClassPage />} />
          <Route path="teacherallstudent" element={<TeacherAllStudent/>}></Route>
          <Route path="teacherstudentenrollment" element={<TeacherStudentEnrollment/>}></Route>
          <Route path="teacherusersetting" element={<TeacherUserSetting/>}></Route>
        
        
        </Route>
        
        


        </Routes>

       
      </div>
    </Router>
  );
};

export default App;
