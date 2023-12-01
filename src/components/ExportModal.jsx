import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"

const ExportModal = ({
  open,
  setOpen,
  filename,
  setFilename,
  onSubmit,
  getValues,
}) => {
  function closeModal() {
    setOpen(false)
  }

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-zinc-800 rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-200"
                  >
                    Download File
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <input
                        type="text"
                        name="filename"
                        placeholder="Filename"
                        className="w-full text-white rounded-md bg-zinc-600 placeholder:text-zinc-400"
                        value={filename}
                        autoFocus
                        onChange={(e) => setFilename(`${e.target.value}`)}
                      />
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-zinc-950 hover:bg-zinc-900"
                      onClick={() => {
                        onSubmit(getValues())
                        setOpen(false)
                      }}
                    >
                      Download
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ExportModal
