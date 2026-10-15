'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getWords, deleteWord, type Word } from '@/lib/storage'

export default function Home() {
  const [words, setWords] = useState<Word[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setWords(getWords())
    setMounted(true)
  }, [])

  const handleDelete = (id: string) => {
    if (!confirm('حذف این کلمه؟')) return
    deleteWord(id)
    setWords(getWords())
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <p className="text-gray-400">در حال بارگذاری...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">دفترچه یادگیری زبان 📓</h1>
          <Link
            href="/add"
            className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            + افزودن کلمه
          </Link>
        </div>

        {words.length > 0 ? (
          <div className="space-y-3">
            {words.map((w) => (
              <div
                key={w.id}
                className="bg-white p-5 rounded-xl shadow-sm border flex justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">{w.word}</h2>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {w.level}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">{w.meaning}</p>
                  {w.example && (
                    <p className="text-sm text-gray-500 mt-2 italic">مثال: {w.example}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(w.id)}
                  className="text-red-500 hover:text-red-700 text-sm shrink-0 self-start"
                >
                  حذف
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed">
            <p className="text-gray-500 mb-4">هنوز هیچ کلمه‌ای اضافه نشده.</p>
            <Link
              href="/add"
              className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700"
            >
              اولین کلمه را اضافه کن
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}