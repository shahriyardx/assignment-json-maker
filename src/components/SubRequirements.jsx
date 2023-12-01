import { useEffect } from "react"
import { useFieldArray } from "react-hook-form"
import { BiTrashAlt } from "react-icons/bi"
import LabledInput from "./LabledInput"

const SubRequirements = ({
  nestIndex,
  reqNestIndex,
  control,
  register,
  json,
  setSrJson,
}) => {
  const name = `sections.${nestIndex}.requirements.${reqNestIndex}.subrequirements`
  const { fields, remove, append } = useFieldArray({
    control,
    name,
  })

  useEffect(() => {
    if (json) {
      for (let requirement of Object.entries(json)) {
        append({
          description: requirement[1].description,
          number: requirement[1].number,
          correct: true,
          message: requirement[1].message,
        })
      }

      setSrJson(null)
    }
  }, [json, append, setSrJson])

  return (
    <>
      {fields.length > 0 ? (
        <div className="relative p-5 mt-3 overflow-hidden rounded-md bg-zinc-500 border-zinc-400">
          <span className="absolute top-0 left-0 p-2 text-xs text-white rounded-br-md bg-zinc-600">
            Sub Requirements
          </span>
          <div className="flex flex-col gap-5 mt-5">
            {fields.map((item, index) => {
              return (
                <div key={item.id} className="grid grid-cols-[auto,28px] gap-3">
                  <div>
                    <div className="grid grid-cols-3 gap-3">
                      <LabledInput label={"Description"}>
                        <input
                          {...register(`${name}.${index}.description`)}
                          placeholder="Description"
                          className="w-full"
                        />
                      </LabledInput>
                      <LabledInput label={"Number"}>
                        <input
                          {...register(`${name}.${index}.number`)}
                          placeholder="Number"
                          className="w-full"
                        />
                      </LabledInput>
                      <LabledInput label={"Message"}>
                        <input
                          {...register(`${name}.${index}.message`)}
                          placeholder="Message"
                          className="w-full"
                        />
                      </LabledInput>
                    </div>
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
              onClick={() => append({ message: "not okay" })}
              className="px-3 py-2 text-xs text-white rounded-md bg-zinc-600"
            >
              Add Another
            </button>
          </div>
        </div>
      ) : (
        <>
          <button
            type="button"
            className="px-2 py-2 mt-2 text-xs rounded-md bg-zinc-600"
            onClick={() => append({ message: "not okay" })}
          >
            Add Sub Requirement
          </button>
        </>
      )}
    </>
  )
}

export default SubRequirements
