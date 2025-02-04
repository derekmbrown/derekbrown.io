export default function TagItem({ tag }) {
  return (
    <a href={`/tags/${tag}`}>
      <div class="bg-[#1E262F] rounded-lg mr-2 text-lg flex items-center">
        <div class="px-4 py-2">{tag}</div>
      </div>
    </a>
  )
}