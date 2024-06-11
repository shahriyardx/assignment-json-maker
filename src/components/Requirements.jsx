import { useFieldArray } from "react-hook-form"
import { BiChevronDown, BiChevronUp, BiTrashAlt } from "react-icons/bi"
import LabledInput from "./LabledInput"
import SubRequirements from "./SubRequirements"

const Requirements = ({ control, register, nestIndex }) => {
  const name = `sections.${nestIndex}.requirements`
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name,
  })

  return (
    <div className="relative p-5 mt-3 overflow-hidden rounded-md bg-zinc-700 border-zinc-500">
      <span className="absolute top-0 left-0 p-2 text-xs text-white rounded-br-md bg-zinc-600">
        Requirements
      </span>

      <div className="flex flex-col gap-5 mt-5">
        {fields.map((item, index) => {
          return (
            <div
              key={item.id}
              className="grid grid-cols-[28px,auto,28px] gap-3"
            >
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (index != 0) {
                      swap(index, index - 1)
                    }
                  }}
                  className="grid text-white rounded-full bg-zinc-600 w-7 h-7 place-items-center"
                >
                  <BiChevronUp />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (index < fields.length - 1) {
                      swap(index, index + 1)
                    }
                  }}
                  className="grid text-white rounded-full bg-zinc-600 w-7 h-7 place-items-center"
                >
                  <BiChevronDown />
                </button>
              </div>
              <div>
                <div className="grid grid-cols-6 gap-3">
                  <LabledInput label={"Description"} className="col-span-3">
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
                  <LabledInput label={"Okay Message"}>
                    <input
                      {...register(`${name}.${index}.data.okayMessage`)}
                      placeholder="OKay Message"
                      className="w-full"
                    />
                  </LabledInput>
                  <LabledInput label={"Not Okay Message"}>
                    <input
                      {...register(`${name}.${index}.data.notOkayMessage`)}
                      placeholder="Not Okay Message"
                      className="w-full"
                    />
                  </LabledInput>
                </div>

                <SubRequirements
                  nestIndex={nestIndex}
                  reqNestIndex={index}
                  {...{ control, register }}
                />
              </div>

              <div className="mt-6">
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
          onClick={() =>
            append({
              data: { okayMessage: "okay", notOkayMessage: "not okay" },
            })
          }
          className="px-3 py-2 text-xs text-white rounded-md bg-zinc-800"
        >
          Add Requirement
        </button>
      </div>
    </div>
  )
}

export default Requirements
