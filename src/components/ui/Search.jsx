import { useState } from 'react'
import Fuse from 'fuse.js'
import NoteItem from '../ui/NoteItem'

export default function Search({ searchList }) {
  const [query, setQuery] = useState('')

  const options = {
    keys: ['data.title'],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.5
  }
  const fuse = new Fuse(searchList, options)

  const notes = fuse
    .search(query)
    .map((result) => result.item)

  function handleOnSearch({ target = {} }) {
    const { value } = target
    setQuery(value)
  }

  return (
    <>
      <div class="flex flex-col bg-[#1E262F] rounded-lg text-lg">
        <input 
          type="text" 
          value={query} 
          onChange={handleOnSearch} 
          placeholder="Search notes" 
          class="px-4 py-4"
        />
      </div>
      {query.length > 1 && (
        <div class="my-5 text-lg">
          <div>{notes.length} {notes.length === 1 ? 'note' : 'notes'} found with <span class="font-bold">{query}</span>:
          </div>
        </div>
      )}
      {notes &&
        notes.map((note) => (
          <NoteItem note={note} />
        ))}
    </>
  )
}