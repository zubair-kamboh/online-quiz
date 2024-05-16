import React from 'react'

const Button = ({ text, handleSubmit }) => {
  return (
    <button
      onClick={handleSubmit}
      className="text-white bg-blue py-[6px] border-[1px] border-[#000] px-5 rounded-[10px] mt-2"
    >
      {text}
    </button>
  )
}

export default Button
