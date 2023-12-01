import { useEffect, useState } from "react"
import { useFieldArray } from "react-hook-form"
import { BiTrashAlt } from "react-icons/bi"
import LabledInput from "./LabledInput"
import Requirements from "./Requirements"

const Sections = ({ control, register, json, setJson, getValues }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections",
  })
  const [rJson, setRJson] = useState(null)

  useEffect(() => {
    if (json) {
      let rJsons = []
      for (let section of Object.entries(json)) {
        append({ name: section[0] })
        rJsons.push(section[1])
      }

      setRJson(rJsons)
      setJson(null)
    }
  }, [json, append, setJson])

  return (
    <div className="flex flex-col gap-5">
      {fields.map((item, index) => {
        return (
          <div
            key={item.id}
            className="grid grid-cols-[auto,28px] gap-3 p-5 rounded-md border-zinc-600 bg-zinc-800"
          >
            <div>
              <LabledInput label={"Section Name"}>
                <input
                  {...register(`sections.${index}.name`)}
                  className="w-full"
                  placeholder="Name"
                />
              </LabledInput>

              <Requirements
                setRJson={setRJson}
                json={rJson ? rJson[index] : null}
                nestIndex={index}
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
      <div>
        <button
          type="button"
          onClick={() => append({ name: "" })}
          className="px-3 py-2 text-xs text-white rounded-md bg-zinc-700"
        >
          Add Section
        </button>
      </div>
    </div>
  )
}

export default Sections
