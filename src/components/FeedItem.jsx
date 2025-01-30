import React from 'react'
export default function FeedItem({ note }) {
  return (
    <a href={`/notes/${note.id}`}>
      <div class="flex flex-col justify-between md:flex-row md:mb-3 mb-3 bg-[#1E262F] p-6 text-lg rounded-lg">
        <div class="mr-2">
          {note.data.title}
        </div>
        <div class="text-[#7E8C9A] shrink-0">
          {new Date(note.data.pubDate).toDateString().slice(4, 15)}
        </div>
      </div>
    </a>
  )
}