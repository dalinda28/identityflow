'use client'

import React, { useEffect, useState, useRef } from 'react'

export default function ResultPage() {
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<string | null>(null)
  const [nomMarque, setNomMarque] = useState('')
  const [activite, setActivite] = useState('')
  const [cliente, setCliente] = useState('')
  const [couleur, setCouleur] = useState('')
  const resultRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (!resultRef.current) return;
    const html2pdf = (await import('html2pdf.js')).default;
    html2pdf().from(resultRef.current).save('profil-de-marque.pdf');
  }

  useEffect(() => {
    const storedAnswers = localStorage.getItem('quizAnswers')

    if (!storedAnswers) {
      setResult('Aucune donnée de quiz trouvée.')
      setLoading(false)
      return
    }
    const allAnswers = JSON.parse(storedAnswers)
    if (!Array.isArray(allAnswers) || allAnswers.length < 5) {
      setResult('Données de quiz incomplètes.')
      setLoading(false)
      return
    }

    const total = allAnswers.length
    const nomMarqueLS = allAnswers[total - 4]
    const activiteLS = allAnswers[total - 3]
    const clienteLS = allAnswers[total - 2]
    const couleurLS = allAnswers[total - 1]
    const answers = allAnswers.slice(0, total - 4)

    setNomMarque(nomMarqueLS)
    setActivite(activiteLS)
    setCliente(clienteLS)
    setCouleur(couleurLS)

    const generate = async () => {
      try {
        const res = await fetch('/api/generate-brand', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ answers, nomMarque: nomMarqueLS, activite: activiteLS, cliente: clienteLS, couleur: couleurLS })
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

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] py-20 px-6 flex justify-center items-center">
        <p className="text-center text-[#A0A0A0] text-xl font-semibold tracking-wide animate-pulse">
          ⏳ Génération de ton profil de marque...
        </p>
      </main>
    );
  }
  if (!result) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] py-20 px-6 flex justify-center items-center">
        <p className="text-center text-red-600 text-lg font-semibold tracking-wide">
          ❌ Aucune donnée de résultat disponible.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] py-20 px-6 flex justify-center items-start">
      <div className="bg-white rounded-xl shadow-sm p-10 max-w-4xl w-full space-y-14 border border-[#ECECEC]">
        {result ? (
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
              <div className="bg-[#FCFCFC] border border-[#E8E8E8] p-6 rounded-lg space-y-2">
                <h4 className="text-md font-semibold text-[#444]">📝 Détails de ton activité</h4>
                <p><strong>Nom de marque :</strong> {nomMarque}</p>
                <p><strong>Activité :</strong> {activite}</p>
                <p><strong>Cliente idéale :</strong> {cliente}</p>
                <p><strong>Couleur souhaitée :</strong> {couleur}</p>
              </div>
              {(() => {
                // Nettoyage du résultat : supprime séparateurs et balises Markdown autour des titres
                const cleaned = result
                  .replace(/^-{3,}$/gm, '')   // supprime lignes '---'
                  .replace(/\*\*(\d+\.\s*[^*\r\n]+)\*\*/g, '$1')  // enlève ** autour du numéro+titre
                  .trim();
                // Sépare en sections numérotées sur double saut de ligne ou position de numéro
                const sectionsRaw = cleaned.split(/\n(?=\d+\.)/).filter(s => /^\d+\.\s/.test(s));
                return sectionsRaw.map((raw, idx) => {
                  // Sépare header et body
                  const [headerLine, ...bodyLines] = raw.split('\n');
                  const numMatch = headerLine.match(/^(\d+)\.\s*(.*)/);
                  const num = numMatch ? numMatch[1] : '';
                  const header = numMatch ? numMatch[2].trim() : headerLine;
                  const content = bodyLines.join('\n').trim();
                  // Détermine titre avec emoji
                  let title = header;
                  switch (num) {
                    case '1': title = '📖 Storytelling'; break;
                    case '2': title = '🎙️ Ton de voix'; break;
                    case '3': title = '🧭 Citation signature'; break;
                    case '4': title = '🎨 Palette de couleurs'; break;
                    case '5': title = '🏷️ Hashtags'; break;
                    case '6': title = '🏷️ Nom de marque'; break;
                  }
                  return (
                    <div key={idx} className="space-y-4 border-l-2 border-[#E19882] pl-6">
                      <h3 className="text-xl font-semibold text-[#333]">{title}</h3>

                      {num === '3' ? (
                        <blockquote className="border-l-2 border-[#E19882] pl-4 italic text-[#444] bg-[#FAF7F6] py-3 px-4 rounded-md text-base">
                          “{content.replace(/^["“”]+|["“”]+$/g, '')}”
                        </blockquote>
                      ) : num === '4' ? (
                        <div className="flex flex-wrap gap-4 mt-3">
                          {content.match(/#(?:[0-9A-Fa-f]{3,6})/g)?.map((color, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full border border-gray-300" style={{ backgroundColor: color }} />
                              <span className="text-xs font-mono text-gray-600">{color}</span>
                            </div>
                          )) || <p className="text-base">{content}</p>}
                        </div>
                      ) : num === '5' ? (
                        <div className="flex flex-wrap gap-2">
                          {content.match(/#[\wÀ-ÿ]+/g)?.map((tag, i) => (
                            <span
                              key={i}
                              className="bg-[#F7F4F3] text-[#444] text-xs font-medium px-3 py-1 rounded-full border border-gray-200"
                            >
                              {tag}
                            </span>
                          )) || <p className="text-base">{content}</p>}
                        </div>
                      ) : num === '6' ? (
                        <div className="bg-[#F8F9FA] p-6 rounded-lg border border-[#E0E0E0]">
                          <p className="text-[#222] leading-relaxed">{content}</p>
                        </div>
                      ) : (
                        <p className="text-base text-gray-700 leading-relaxed">{content}</p>
                      )}
                    </div>
                  );
                });
              })()}
            </div>
            <p className="text-center text-[#555] italic text-sm mt-4">
              Ce profil a été généré pour toi, autour de <strong>{nomMarque}</strong>. Il t’appartient maintenant de le faire rayonner ✨
            </p>
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