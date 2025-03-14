// import { createContext, useContext, useState } from "react";

// const AddContext = createContext();

// export function useLocalContext() {
//   return useContext(AddContext);
// }

// export function ContextProvider({ children }) {
//   const [createClassDialog, setCreateClassDialog] = useState(false);
//   const [joinClassDialog, setJoinClassDialog] = useState(false);
//   const [loggedInUser, setLoggedInUser] = useState(null);

//   // Dummy login function (simulates Google login)
//   const login = () => {
//     const fakeUser = {
//       displayName: "John Doe",
//       email: "johndoe@example.com",
//       photoURL: "https://i.pravatar.cc/150?img=3", // Random avatar
//     };
//     setLoggedInUser(fakeUser);
//     localStorage.setItem("loggedInUser", JSON.stringify(fakeUser)); // Persist login state
//   };

//   // Dummy logout function
//   const logout = () => {
//     setLoggedInUser(null);
//     localStorage.removeItem("loggedInUser"); // Clear session
//   };

//   // Check local storage for saved session on page reload
//   useState(() => {
//     const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (savedUser) {
//       setLoggedInUser(savedUser);
//     }
//   });

//   const value = {
//     createClassDialog,
//     setCreateClassDialog,
//     joinClassDialog,
//     setJoinClassDialog,
//     login,
//     logout,
//     loggedInUser,
//   };

//   return <AddContext.Provider value={value}>{children}</AddContext.Provider>;
// }
