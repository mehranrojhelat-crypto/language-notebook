import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: words, error } = await supabase
    .from('words')
    .select('*')
    .order('created_at', { ascending: false })


  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">خطا در اتصال به دیتابیس</h1>
        <p className="mt-2">{error.message}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">دفترچه یادگیری زبان 📓</h1>

        {words && words.length > 0 ? (
          <div className="space-y-4">
            {words.map((word) => (
              <div key={word.id} className="bg-white p-5 rounded-xl shadow-sm border">
                <h2 className="text-xl font-semibold">{word.word}</h2>
                <p className="text-gray-600 mt-1">{word.meaning}</p>
                {word.example && (
                  <p className="text-sm text-gray-500 mt-2 italic">مثال: {word.example}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">هنوز هیچ کلمه‌ای اضافه نشده.</p>
        )}
      </div>
    </div>
  )
}
