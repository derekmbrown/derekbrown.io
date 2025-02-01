export default function Nav({ emoji }) {
  return (
    <nav class="flex flex-col mt-12 mb-10 text-[#F2F5F7]">
      <div class="flex font-['Merriweather'] text-4xl font-black mb-3">
        <a href="/">Derek Brown <emoji symbol="👨🏻‍💻" label="person" /></a>
      </div>
      <div class="font-['Merriweather'] text-xl flex items-center gap-4">
        <span class="navItem" id="notes"><a href="/">Notes</a></span>
        <span class="navItem" id="tags"><a href="/tags">Tags</a></span>
        <span class="navItem" id="about"><a href="/about">About</a></span>
      </div>
    </nav>
  )
}