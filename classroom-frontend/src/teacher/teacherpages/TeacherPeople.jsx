import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import axios from 'axios';


const TeacherPeople = ({id}) => {
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [Teachers, setTeachers] = useState([]);
  const [Students, setStudents] = useState([]);
  const [TeacherEnroll, setTeacherEnroll] = useState([]);
  const [StudentEnroll, setStudentEnroll] = useState([]);


const fetchTeacher = async () => {
  try {
    const resp =  await axios.get("http://localhost:8080/api/v1/teacher/getAll");
    console.log(`teachrs ${resp.data.data}`);
    setTeachers(resp.data.data);
    
  } catch (error) {
    console.log(error);
  }

}

const fetchStudents = async () => {
  try {
    const resp = await axios.get("http://localhost:8080/api/v1/student/getAll");
    console.log( resp.data);
    setStudents(resp.data);
    
  } catch (error) {
    alert(error);
    console.log(error)
  }

}

const fetchTeacherEnroll = async () => {
    try {
      const resp = await axios.get("http://localhost:8080/api/v1/classTeachers/getAll", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTeacherEnroll(resp.data.data);
      console.log(`teacher enroll`, resp.data.data);

    } catch (error) {
      alert(error);
      console.log(error);
    }
}

const fetchStudentEnroll = async () => {
  try {
    const resp = await axios.get("http://localhost:8080/api/v1/enrollments/getAll",{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    setStudentEnroll(resp.data.data);
    console.log(`student enroll`, resp.data.data)

  } catch (error) {
    alert(error)
    console.log(error)
  }
}


const filterIds = TeacherEnroll.filter(enroll => enroll.aCourseClass === id).map(enroll => enroll.teacherId);


const filteredTeachers = Teachers.filter(Teacher =>
  filterIds.includes(Teacher.teacherId)
)      

const filterStuIds = StudentEnroll.filter(enroll => enroll.classId === id).map(enroll => enroll.studentId);

const filteredStudents = Students.filter(Student => 
  filterStuIds.includes(Student.studentId)
)

// console.log(`filtered studIds`,filterStuIds)
// console.log(`students`, Students);
// console.log(`filtered students`, filteredStudents);


useEffect(()=>{
  fetchTeacher();
  fetchStudents();
  fetchTeacherEnroll();
  fetchStudentEnroll();
},[]);



  const handleTeacherFormToggle = () => {
    setShowTeacherForm(!showTeacherForm);
  };

  const handleStudentFormToggle = () => {
    setShowStudentForm(!showStudentForm);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Teachers Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Teachers</h2>
          {/* <FaUserPlus
            className="text-gray-600 cursor-pointer"
            onClick={handleTeacherFormToggle}
          /> */}
        </div>
        {showTeacherForm && (
          <div className="flex-col p-4 bg-white rounded shadow mb-4 border-2">
            <input
              type="email"
              className="w-full p-2 border rounded mb-2"
              placeholder="Enter teacher's email address"
            />
            <p className="text-xs">
              Teachers added by you can do everything that you can except delete
              the class.
            </p>

            {/* Button aligned to the right */}
            <div className="flex justify-end">
              <button className="bg-blue-700 hover:bg-blue-900 text-white px-4 py-1 rounded">
                Invite
              </button>
            </div>
          </div>
        )}

        {filteredTeachers?.length > 0 ?(
        filteredTeachers?.map((teacher)=>(
          <div key={teacher.teacherId} className="p-4 flex bg-gray-200 hover  hover:bg-blue-300 rounded shadow-lg mb-4">
          <h3 className="text-sm w-1/3">{teacher.fullName}</h3>
          <h3 className="text-sm w-1/3">{teacher.contact}</h3>
          <h3 className="text-sm w-1/3">{teacher.email}</h3>

        </div>
        ))):(
          <p className="px-7 text-gray-500">No teachers</p>
        )}

        
        {/* Add more teachers here */}
      </div>

      {/* Students Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Students</h2>
          {/* <FaUserPlus
            className="text-gray-600 cursor-pointer"
            onClick={handleStudentFormToggle}
          /> */}
        </div>
        {showStudentForm && (
          <div className="p-4 bg-white rounded shadow mb-4 border-2">
            <input
              type="email"
              className="w-full p-2 border rounded mb-2"
              placeholder="Enter student's email address"
            />
            <p className="text-xs">
              Student only can see the announcementz and people.
            </p>
             <div className="flex justify-end">
              <button className="bg-blue-700 hover:bg-blue-900 text-white px-4 py-1 rounded">
                Invite
              </button>
            </div>
          </div>
        )}

        {filteredStudents?.length > 0?(
        filteredStudents.map((student) => (
          <div key={student.studentId} className="p-4 flex bg-gray-200 hover hover:bg-blue-300 rounded shadow-lg mb-4">
          <h3 className="text-sm w-1/3">{student.fullName}</h3>
          <h3 className="text-sm w-1/3">{student.contact}</h3>
          <h3 className="text-sm w-1/3">{student.email}</h3>

        </div>
        ))):(
          <p className="px-7 text-gray-500">No students</p>
        )}

        
        {/* Add more students here */}
      </div>
    </div>
  );
};

export default TeacherPeople;
