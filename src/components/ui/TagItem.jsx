export default function TagItem({ tag, count }) {
  return (
    <a href={`/tags/${tag}`}>
      <div class="bg-[#1E262F] rounded-lg mr-2.5 text-lg flex items-center">
        <div class="px-4 py-2">{tag}</div>
        {count !== undefined && (
          <div class="pr-4 text-[#7E8C9A] text-sm">{count}</div>
        )}
      </div>
    </a>
  )
}