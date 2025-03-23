import React from "react";

const ProfilePicture = ({ name}) => {
  // Extract the first letter of the name
  const firstLetter = name ? name.charAt(0).toUpperCase() : "U"; // Default to "U" if no name

  // Generate a random background color for the avatar
  const getRandomColor = () => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Default avatar style
  const defaultAvatarStyle = {
    backgroundColor: getRandomColor(),
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
    color: "#FFFFFF",
  };

  return (
    <div>
        
        <div style={defaultAvatarStyle}>{firstLetter}</div>
      
    </div>
  );
};

export default ProfilePicture;