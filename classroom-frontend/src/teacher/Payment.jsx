import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

function Payment() {

    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [availableClasses, setAvailableClasses] = useState([]);

    const [studentId, setStudentId] = useState('');
    const [classDetails, setClassDetails] = useState({ className: '', fees: '' });
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const [addedClasses, setAddedClasses] = useState([]);
    const suggestionsRef = useRef(null);
    const [subtotal, setSubtotal] = useState(0);
    const [showPaymentsModal, setShowPaymentsModal] = useState(false);
    const [payments, setPayments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


    const fetchStudent = async () => {
        try {
          const reponse = await axios.get(
            "http://localhost:8080/api/v1/student/getAll"
          );
          console.log("response", reponse.data);
          setStudents(reponse.data);
        } catch (error) {
          alert("Failed to fetch student.");
        }
    };

    // Fetch classes from backend
      
        const fetchClasses = async () => {
          try {
            const response = await axios.get(
              "http://localhost:8080/api/v1/class/getAll",
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            setClasses(response.data.data);
            console.log(response.data.data);

            const cls = response.data.data.map((classItem) => ({
              className: classItem.className,
              fees: "1500"
            }));
            console.log("cls", cls);
    
            setAvailableClasses(cls);

          } catch (error) {
            console.error("Error fetching classes:", error);
          }
        };
 
        
    
    useEffect(() => {
        fetchStudent();
        fetchClasses();
    
    },[])

    useEffect(() => {
      const total = addedClasses.reduce(
        (sum, classItem) => sum + parseFloat(classItem.fees || 0),
        0
      );
      setSubtotal(total);
      console.log("subtotal", total);
    }, [addedClasses]);

    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/payment/getAll', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
        toast.error("Failed to fetch payments.");
      }
    };
  
    const filteredPayments = payments.filter(payment =>
      payment.student.includes(searchQuery) ||
      payment.className.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    useEffect(() => {
      if (showPaymentsModal) {
        fetchPayments();
      }
    }, [showPaymentsModal]);
    
//   const [students] = useState([
//     { id: '1', name: 'John Doe', email: 'johndoe@example.com' },
//     { id: '2', name: 'Jane Smith', email: 'janesmith@example.com' },
//   ]);    

    

  // const [availableClasses] = useState([
  //   { className: 'Mathematics', fees: '500' },
  //   { className: 'Science', fees: '600' },
  //   { className: 'History', fees: '450' },
  //   { className: 'English', fees: '400' },
  // ]);

 

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
  };

  const handleAddClass = () => {
    if (classDetails.className && classDetails.fees) {
      setAddedClasses([...addedClasses, { ...classDetails }]);
      setClassDetails({ className: '', fees: '' });
      setShowSuggestions(false);
    }
  };

  const handleDeleteClass = (index) => {
    setAddedClasses(addedClasses.filter((_, i) => i !== index));
  };

  const getStudentById = (id) => {
    return students.find((student) => student.studentId === id) || { id: '', name: '', email: '' };
  };

  const handleClassNameChange = (e) => {
    const value = e.target.value;
    setClassDetails({ ...classDetails, className: value });
    setShowSuggestions(value.trim().length > 0);
    setActiveSuggestionIndex(-1);
  };

  const handleClassSuggestionClick = (classItem) => {
    setClassDetails({
      className: classItem.className,
      fees: classItem.fees
    });
    setShowSuggestions(false);
  };

  const filteredClasses = availableClasses.filter(classItem =>
    classItem.className.toLowerCase().includes(classDetails.className.trim().toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    // Arrow down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => 
        prev < filteredClasses.length - 1 ? prev + 1 : prev
      );
    }
    // Arrow up
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => 
        prev > 0 ? prev - 1 : -1
      );
    }
    // Enter
    else if (e.key === 'Enter' && activeSuggestionIndex >= 0) {
      e.preventDefault();
      handleClassSuggestionClick(filteredClasses[activeSuggestionIndex]);
    }
  };

  useEffect(() => {
    if (suggestionsRef.current && activeSuggestionIndex >= 0) {
      const activeItem = suggestionsRef.current.children[activeSuggestionIndex];
      if (activeItem) {
        activeItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }, [activeSuggestionIndex]);

  //const subtotal = addedClasses.reduce((total, classItem) => total + parseFloat(classItem.fees || 0), 0);

  const handleConfirmAndPay = async () => {
    if (!studentId || addedClasses.length === 0) {
      alert("Please enter a valid student and add at least one class.");
      return;
    }
  
    // Prepare the array of objects
    const paymentDetails = addedClasses.map((classItem) => ({
      studentId: studentId,
      classId: classItem.className || '', // Assuming classId is available in classItem
      fees: classItem.fees,
    }));

    console.log("paymentDetails", paymentDetails);
  
    try {
      const response = await axios.post('http://localhost:8080/api/payment/save', {
        paymentDetails, // Pass the array of objects
      },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      });
  
      // Handle success response
      toast.success('Payment initiated successfully!');
      console.log('Payment response:', response.data);
    } catch (err) {
      console.error("Payment Error:", err);
      toast.error("Something went wrong with the payment.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 ">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Payment</h1>
          <button
            onClick={() => setShowPaymentsModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Show Payments
          </button>
        </div>

        {/* Student Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Student ID</label>
            <input
              type="text"
              value={studentId}
              onChange={handleStudentIdChange}
              className="mt-1 block w-full border rounded-full bg-blue-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={getStudentById(studentId).fullName}
              readOnly
              className="mt-1 block w-full border rounded-full bg-blue-300 p-2 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={getStudentById(studentId).email}
              readOnly
              className="mt-1 block w-full border rounded-full bg-blue-300 p-2 0 focus:outline-none"
            />
          </div>
        </div>

        {/* Class Input Section - Always visible */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 ">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Class Name</label>
            <input
              type="text"
              value={classDetails.className}
              onChange={handleClassNameChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(classDetails.className.trim().length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="mt-1 block w-full border rounded-full bg-blue-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search class..."
            />
            {showSuggestions && filteredClasses.length > 0 && (
              <ul 
                ref={suggestionsRef}
                className="absolute z-10 mt-1 w-full border rounded-md bg-white shadow-lg max-h-60 overflow-auto"
              >
                {filteredClasses.map((classItem, index) => (
                  <li
                    key={index}
                    onClick={() => handleClassSuggestionClick(classItem)}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      index === activeSuggestionIndex ? 'bg-blue-50' : ''
                    }`}
                  >
                    {classItem.className}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fees</label>
            <input
              type="number"
              value={classDetails.fees}
              onChange={(e) => setClassDetails({ ...classDetails, fees: e.target.value })}
              className="mt-1 block w-full border rounded-full bg-blue-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleAddClass}
              className="w-full px-2 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              Add Class
            </button>
          </div>
        </div>

        {/* Class Details Section - Only shows when classes are added */}
        <div className="min-h-screen bg-gray-50 p-6 ">
      <div className="max-w-4xl mx-auto bg-white rounded-xl  p-6 shadow-2xl border-2 border-gray-300">
        <h1 className="text-2xl font-bold mb-6">Payment</h1>

        {/* Student Details (unchanged) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* ... (keep student details inputs) */}
        </div>

        {/* Class Input Section (unchanged) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* ... (keep class input fields) */}
        </div>

        {/* Class Details Section - ALWAYS VISIBLE */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Class Details</h2>
          
          {/* Class Cards - Only show if classes exist */}
          {addedClasses.length > 0 ? (
            <div className="space-y-4">
              {addedClasses.map((classItem, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white hover:shadow-md">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Class Name: {classItem.className}</p>
                    <p className="text-sm text-gray-500">Fees: ${classItem.fees}</p>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => handleDeleteClass(index)}
                      className="mt-2 px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-sm text-gray-500 py-4">No classes added yet</div>
          )}

          {/* Subtotal - ALWAYS VISIBLE */}
          <div className="mt-4 flex justify-between">
            <span className="text-sm font-medium text-gray-700">Subtotal:</span>
            <span className="text-sm font-medium text-gray-700">
              ${addedClasses.reduce((total, classItem) => total + parseFloat(classItem.fees || 0), 0)}
            </span>
          </div>
        </div>

        {/* Confirm and Pay Button - ALWAYS VISIBLE */}
        <div className="flex justify-end">
          <button
           onClick={handleConfirmAndPay}
            className={`px-6 py-2 text-white rounded-md ${
              addedClasses.length > 0 ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={addedClasses.length === 0}
          >
            Confirm and Pay
          </button>
        </div>
      </div>
    </div>
      </div>
      {showPaymentsModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-5xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Payments</h2>
              <button
                onClick={() => setShowPaymentsModal(false)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by Student ID or Class Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Payment Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="px-4 py-3 text-left">Payment ID</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Student ID</th>
                    <th className="px-4 py-3 text-left">Class Name</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment, index) => (
                      <tr
                        key={payment.paymentId}
                        className={`hover:bg-gray-300 ${
                          index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        }`}
                      >
                        <td className="px-4 py-3 border-b text-gray-700">{payment.paymentId}</td>
                        <td className="px-4 py-3 border-b text-gray-700">${payment.amount}</td>
                        <td className="px-4 py-3 border-b text-gray-700">{payment.date.split("T")[0]}</td>
                        <td
                          className={`px-4 py-3 border-b font-medium ${
                            payment.status === 'Completed'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {payment.status}
                        </td>
                        <td className="px-4 py-3 border-b text-gray-700">{payment.student}</td>
                        <td className="px-4 py-3 border-b text-gray-700">{payment.className}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-4 py-3 border-b text-center text-gray-500"
                      >
                        No payments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowPaymentsModal(false)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;