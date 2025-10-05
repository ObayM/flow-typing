'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoMdClose } from "react-icons/io";


export default function SettingsModal() {
  const [open, setOpen] = useState(true)
  const [preDeleteTime, setPreDeleteTime] = useState(5)
  const [writeOrDieDuration, setWriteOrDieDuration] = useState(60)

  const handleSave = () => {
    console.log('Saved settings:', {
      preDeleteTime,
      writeOrDieDuration,
    })
    setOpen(false)
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>Settings</button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 w-full max-w-md relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >

              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={() => setOpen(false)}
              >
                <IoMdClose size={20} />
              </button>

              <h2 className="text-xl font-semibold mb-4">Write or Die Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                   Inactivity Timeout (seconds)
                  </label>
                  <input
                    type="number"
                    value={preDeleteTime}
                    onChange={(e) => setPreDeleteTime(Number(e.target.value))}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    min={1}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Write or Die duration (seconds)
                  </label>
                  <input
                    type="number" fsdfa f sa
                    value={writeOrDieDuration}
                    onChange={(e) => setWriteOrDieDuration(Number(e.target.value))}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    min={5}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <button onClick={handleSave}>Save</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

