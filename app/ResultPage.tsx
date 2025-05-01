'use client'

import React, { useEffect, useState, useRef } from 'react'

export default function ResultPage() {
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<string | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (!resultRef.current) return
    // @ts-ignore
    window.html2pdf().from(resultRef.current).save('profil-de-marque.pdf')
  }

  useEffect(() => {
    const storedAnswers = localStorage.getItem('quizAnswers')
    if (!storedAnswers) {
      setResult('Aucune donnée de quiz trouvée.')
      setLoading(false)
      return
    }

    const answers = JSON.parse(storedAnswers)

    const generate = async () => {
      try {
        const res = await fetch('/api/generate-brand', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ answers })
        })
        const data = await res.json()
        setResult(data.result)
      } catch (err) {
        setResult('Erreur lors de la génération.')
      } finally {
        setLoading(false)
      }
    }

    generate()
  }, [])

  return (
    <main className="min-h-screen bg-[#FAFAFA] py-20 px-6 flex justify-center items-start">
      <div className="bg-white rounded-xl shadow-sm p-10 max-w-4xl w-full space-y-14 border border-[#ECECEC]">
        {loading ? (
          <p className="text-center text-[#A0A0A0] text-xl font-semibold tracking-wide animate-pulse">
            ⏳ Génération de ton profil de marque...
          </p>
        ) : result ? (
          <>
            <div ref={resultRef} className="space-y-12 text-[#2C2C2C] whitespace-pre-wrap leading-relaxed font-sans">
              <div className="bg-[#F9FAFB] border border-[#DCE1E7] p-6 rounded-lg space-y-3">
                <h4 className="text-md font-semibold text-[#444]">📌 Recommandation pour ton activité existante</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Tu es déjà lancée dans ton activité (comme une esthéticienne, coiffeuse, photographe ou thérapeute) ?
                  Voici comment adapter ces résultats à ton univers existant : intègre ton storytelling dans ta bio Instagram,
                  utilise la citation comme slogan sur ta carte de visite, et harmonise la palette avec ta charte actuelle.
                  Ce profil complète ton image déjà posée avec cohérence.
                </p>
              </div>
              {['1. Storytelling', '2. Ton de voix', '3. Citation signature', '4. Palette de couleurs', '5. Hashtags', '6. Nom de marque'].map((title, i) => {
                const section = result.split('\n\n')[i] || ''
                const content = section.replace(/^\d+\.\s*/, '')

                return (
                  <div key={i} className="space-y-4 border-l-2 border-[#E19882] pl-6">
                    <h3 className="text-xl font-semibold text-[#333]">{title.replace(/^\d+\.\s*/, '')}</h3>

                    {title.startsWith('3.') ? (
                      <blockquote className="border-l-2 border-[#E19882] pl-4 italic text-[#444] bg-[#FAF7F6] py-3 px-4 rounded-md text-base">
                        “{content.replace(/^["“”]+|["“”]+$/g, '')}”
                      </blockquote>
                    ) : title.startsWith('6.') ? (
                      <div className="bg-[#F8F9FA] p-6 rounded-lg border border-[#E0E0E0] space-y-3">
                        <p className="text-[#222] text-[15px] leading-relaxed">{content}</p>
                      </div>
                    ) : title.startsWith('5.') ? (
                      <div className="flex flex-wrap gap-2">
                        {content.split(/[,、;]/).map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-[#F7F4F3] text-[#444] text-xs font-medium px-3 py-1 rounded-full border border-gray-200"
                          >
                            #{tag.trim().replace(/^#/, '')}
                          </span>
                        ))}
                      </div>
                    ) : title.startsWith('4.') ? (
                      <div className="flex flex-wrap gap-4 mt-3">
                        {content.match(/#(?:[0-9a-fA-F]{3}){1,2}/g)?.map((color, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full border border-gray-300" style={{ backgroundColor: color }} />
                            <span className="text-xs font-mono text-gray-600">{color}</span>
                          </div>
                        )) || <p className="text-base">{content}</p>}
                      </div>
                    ) : (
                      <p className="text-base text-gray-700 leading-relaxed">{content}</p>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="text-center pt-6">
              <button
                onClick={handleDownload}
                className="border border-[#E19882] text-[#E19882] font-medium px-6 py-2 rounded-md hover:bg-[#E19882]/10 transition"
              >
                Télécharger ce profil en PDF
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-red-600 text-lg font-semibold tracking-wide">
            ❌ Une erreur est survenue lors de la génération.
          </p>
        )}
      </div>
    </main>
  )
}