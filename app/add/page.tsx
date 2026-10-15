'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addWord } from '@/lib/storage'

export default function AddWord() {
  const router = useRouter()
  const [word, setWord] = useState('')
  const [meaning, setMeaning] = useState('')
  const [example, setExample] = useState('')
  const [level, setLevel] = useState('A1')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const trimmedWord = word.trim()
    const trimmedMeaning = meaning.trim()

    if (!trimmedWord || !trimmedMeaning) {
      setError('کلمه و معنی الزامی هستند.')
      return
    }

    setLoading(true)
    try {
      addWord({
        word: trimmedWord,
        meaning: trimmedMeaning,
        example: example.trim(),
        level,
      })
      router.push('/')
    } catch (err) {
      setError('خطا در ذخیره. لطفاً دوباره تلاش کنید.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8" dir="rtl">
      <div className="max-w-lg mx-auto bg-white p-6 md:p-8 rounded-xl shadow-sm border">
        <h1 className="text-2xl font-bold mb-6">افزودن کلمه جدید</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">کلمه / اصطلاح</label>
            <input
              type="text"
              required
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="مثلاً: apple"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">معنی</label>
            <input
              type="text"
              required
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="مثلاً: سیب"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">مثال (اختیاری)</label>
            <input
              type="text"
              value={example}
              onChange={(e) => setExample(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="مثلاً: I eat an apple every day"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">سطح</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'در حال ذخیره...' : 'ذخیره کلمه'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => router.push('/')}
          className="mt-4 w-full text-center text-gray-500 hover:text-gray-700"
        >
          بازگشت به لیست
        </button>
      </div>
    </div>
  )
}