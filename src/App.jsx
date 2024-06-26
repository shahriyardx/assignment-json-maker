import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import ExportModal from "./components/ExportModal"
import Sections from "./components/Sections"
import { getJsonData } from "./utils"
import LabledInput from "./components/LabledInput"

function App() {
  const {
    reset,
    control,
    register,
    handleSubmit,
    getValues,
    errors,
    setValue,
  } = useForm({ defaultValues: { sections: [], highestMark: 60 } })
  const importRef = useRef()

  const [json, setJson] = useState(null)
  const [open, setOpen] = useState(false)
  const [filename, setFilename] = useState()

  const loadJson = (file) => {
    setFilename(file.name)

    const reader = new FileReader()
    reader.onloadend = () => {
      const content = reader.result
      const jsonData = JSON.parse(content)
      reset(getJsonData(jsonData))

      try {
        importRef.current?.reset()
      } catch {
        console.log("Failed to reset imput form")
      }
    }

    reader.readAsText(file)
  }

  const download = (json) => {
    const jsonString = JSON.stringify(json, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })

    const a = document.createElement("a")
    a.href = window.URL.createObjectURL(blob)
    a.download = `${filename.replaceAll(".json", "")}.json`

    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const onSubmit = (data) => {
    const json = {
      type: "new",
      ...data,
    }

    download(json)
  }

  const onSubmitLegacy = (data) => {
    const json = {}

    for (let section of data.sections) {
      const sectionJson = {}
      const requirements = section.requirements
      for (let requirementIndex in requirements) {
        const requirement = requirements[requirementIndex]
        const requirementJson = {
          description: requirement.data.description,
          number: String(requirement.data.number),
          correct: true,
          message: requirement.data.notOkayMessage,
        }
        const subRequirements = requirement.subRequirements

        for (let subRequirementIndex in subRequirements) {
          const subRequirement = subRequirements[subRequirementIndex]
          const req_name = `sub_req_${Number(requirementIndex) + 1}${
            Number(subRequirementIndex) + 1
          }`

          const subReqJson = {
            description: subRequirement.description,
            number: String(subRequirement.number),
            correct: true,
            message: data.include
              ? subRequirement.notOkayMessage == "not okay" ||
                subRequirement.notOkayMessage == "not okay."
                ? `${subRequirement.description} -> ${requirement.data.notOkayMessage}`
                : subRequirement.notOkayMessage
              : requirement.data.notOkayMessage,
          }
          requirementJson[req_name] = subReqJson
        }
        sectionJson[`req-${Number(requirementIndex) + 1}`] = requirementJson
      }
      json[section.name.trim().replaceAll(" ", "-")] = sectionJson
    }

    download(json)
  }

  return (
    <div className="container px-5 pt-10 pb-5 mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Json Maker</h1>
        <input
          ref={importRef}
          type="file"
          accept="application/json"
          onChange={(e) => loadJson(e.target.files[0])}
          className="hidden"
        />
        <button
          className="px-3 py-2 text-white rounded-md bg-zinc-700"
          onClick={() => importRef.current?.click()}
        >
          import
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <Sections
          json={json}
          setJson={setJson}
          {...{ control, register, getValues, setValue, errors }}
        />

        <div className="mt-5 grid grid-cols-[200px,auto] gap-5 p-5 border border-zinc-500 rounded-md">
          <LabledInput>
            <input
              {...register("highestMark")}
              className="w-full"
              placeholder="Highest Mark"
            />
          </LabledInput>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <input
                id="include"
                type="checkbox"
                defaultChecked
                {...register("include")}
              />
              <label htmlFor="include">
                include description for sub requirements
              </label>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-3 py-2 mt-5 text-white bg-green-500 rounded-md"
            onClick={() => setOpen(true)}
          >
            Export
          </button>

          <button
            type="button"
            onClick={() => reset({ sections: [] })}
            className="px-3 py-2 mt-5 text-white bg-red-500 rounded-md"
          >
            reset
          </button>
        </div>
      </form>

      <ExportModal
        open={open}
        setOpen={setOpen}
        filename={filename}
        setFilename={setFilename}
        getValues={getValues}
        onSubmitLegacy={onSubmitLegacy}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default App
