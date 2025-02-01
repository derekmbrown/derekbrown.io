import moment from 'moment'

export default function NoteItem({ note }) {
  const title = note.data.title
  const pubDate = moment(note.data.pubDate).format('MMM D YYYY')

  return (
    <a href={`/notes/${note.id}`}>
      <div class="flex flex-col justify-between md:flex-row md:mb-3 mb-3 bg-[#1E262F] p-6 text-lg rounded-lg">
        <div class="mr-2">{title}</div>
        <div class="text-[#7E8C9A] shrink-0">{pubDate}</div>
      </div>
    </a>
  )
}