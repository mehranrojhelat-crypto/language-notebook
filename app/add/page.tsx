'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AddWord() {
  const router = useRouter()
  const [word, setWord] = useState('')
  const [meaning, setMeaning] = useState('')
  const [example, setExample] = useState('')
  const [level, setLevel] = useState('A1')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('words').insert([
      {
        word,
        meaning,
        example,
        level,
        status: 'new',
      },
    ])

    setLoading(false)

    if (error) {
      alert('خطا در ذخیره کلمه: ' + error.message)
    } else {
      alert('کلمه با موفقیت اضافه شد!')
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-sm border">
        <h1 className="text-2xl font-bold mb-6">افزودن کلمه جدید</h1>

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
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">سطح</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
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
          onClick={() => router.push('/')}
          className="mt-4 w-full text-center text-gray-500 hover:text-gray-700"
        >
          بازگشت به لیست
        </button>
      </div>
    </div>
  )
}
