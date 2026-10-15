export type Word = {
  id: string
  word: string
  meaning: string
  example: string
  level: string
  status: 'new' | 'learning' | 'known'
  created_at: string
}

const STORAGE_KEY = 'language-notebook-words'

export function getWords(): Word[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Word[]) : []
  } catch {
    return []
  }
}

export function saveWords(words: Word[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words))
}

export function addWord(data: Omit<Word, 'id' | 'created_at' | 'status'>): Word {
  const words = getWords()
  const newWord: Word = {
    id: crypto.randomUUID(),
    ...data,
    status: 'new',
    created_at: new Date().toISOString(),
  }
  words.unshift(newWord)
  saveWords(words)
  return newWord
}

export function deleteWord(id: string) {
  saveWords(getWords().filter((w) => w.id !== id))
}