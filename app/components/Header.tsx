export default function Header() {
    return (
      <header className="w-full py-4 px-6 flex justify-between items-center bg-transparent">
        <h1 className="text-xl font-bold text-[#E19882] tracking-wide">IdentityFlow</h1>
        <nav>
          <a href="/quiz" className="text-[#1F1F1F] hover:text-[#E19882] font-medium transition">
            Commencer
          </a>
        </nav>
      </header>
    )
  }