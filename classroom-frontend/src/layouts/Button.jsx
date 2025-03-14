import React from "react";
import { useNavigate } from "react-router-dom";




const Button = (props) => {


  return (
    <div>
      <button 
      onClick={props.methodName}
      className="px-6 py-1 border-2 border-white bg-[#007BFF] text-white hover:text-white hover:bg-[#0056b3] transition-all rounded-full">
        {props.title}
      </button>
    </div>
  );
};

export default Button;
