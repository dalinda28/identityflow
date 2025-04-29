import Header from './components/Header'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFAF6] flex flex-col">
      <Header />
      <section className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="text-center max-w-3xl space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#1F1F1F] leading-tight">
            Construis une marque <span className="text-[#E19882]">alignée</span>, <span className="text-[#9BC4A7]">inspirante</span><br /> et mémorable
          </h1>

          <p className="text-lg text-[#4A4A4A] max-w-xl mx-auto">
            IdentityFlow est un outil guidé qui t’aide à révéler ton identité de marque en quelques minutes : storytelling, positionnement et univers visuel <br></br> tout est fluide, intuitif, et soutenu par l’IA.
          </p>

          <a
            href="/quiz"
            className="inline-block bg-[#E19882] hover:bg-[#CC7A68] text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all"
          >
            ✨ Commencer le quiz
          </a>
        </div>
      </section>
      <Footer />
    </main>
  )
}