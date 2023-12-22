import React from "react"

const LabledInput = ({ label, children, className }) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-xs">{label}</label>
      {children}
    </div>
  )
}

export default LabledInput
