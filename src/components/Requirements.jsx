import { useEffect, useState } from "react"
import { useFieldArray } from "react-hook-form"
import { BiTrashAlt } from "react-icons/bi"
import LabledInput from "./LabledInput"
import SubRequirements from "./SubRequirements"

const Requirements = ({ control, register, nestIndex, json, setRJson }) => {
  const name = `sections.${nestIndex}.requirements`
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  })

  const [srJson, setSrJson] = useState(null)

  useEffect(() => {
    if (json) {
      let srJsons = []
      for (let requirement of Object.entries(json)) {
        append({
          description: requirement[1].description,
          number: requirement[1].number,
          correct: true,
          message: requirement[1].message,
        })

        let sub_reqs = []
        for (let sub_req of Object.values(requirement[1])) {
          if (typeof sub_req == "object") {
            sub_reqs.push(sub_req)
          }
        }

        srJsons.push(sub_reqs)
      }

      setSrJson(srJsons)
      setRJson(null)
    }
  }, [json, append, setRJson])

  return (
    <div className="relative p-5 mt-3 overflow-hidden rounded-md bg-zinc-700 border-zinc-500">
      <span className="absolute top-0 left-0 p-2 text-xs text-white rounded-br-md bg-zinc-600">
        Requirements
      </span>

      <div className="flex flex-col gap-5 mt-5">
        {fields.map((item, index) => {
          return (
            <div key={item.id} className="grid grid-cols-[auto,28px] gap-3">
              <div>
                <div className="grid grid-cols-3 gap-3">
                  <LabledInput label={"Description"}>
                    <input
                      {...register(`${name}.${index}.data.description`)}
                      placeholder="Description"
                      className="w-full"
                    />
                  </LabledInput>
                  <LabledInput label={"Number"}>
                    <input
                      {...register(`${name}.${index}.data.number`)}
                      placeholder="Number"
                      className="w-full"
                    />
                  </LabledInput>
                  <LabledInput label={"Message"}>
                    <input
                      {...register(`${name}.${index}.data.message`)}
                      placeholder="Message"
                      className="w-full"
                    />
                  </LabledInput>
                </div>

                <SubRequirements
                  nestIndex={nestIndex}
                  reqNestIndex={index}
                  json={srJson ? srJson[index] : null}
                  setSrJson={setSrJson}
                  {...{ control, register }}
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="grid text-white bg-red-500 rounded-full w-7 h-7 place-items-center"
                >
                  <BiTrashAlt />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-3">
        <button
          type="button"
          onClick={() => append({ data: { message: "not okay" } })}
          className="px-3 py-2 text-xs text-white rounded-md bg-zinc-800"
        >
          Add Requirement
        </button>
      </div>
    </div>
  )
}

export default Requirements
