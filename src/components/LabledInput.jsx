import React from "react"

const LabledInput = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs">{label}</label>
      {children}
    </div>
  )
}

export default LabledInput
