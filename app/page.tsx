'use client'

import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import QuizPage from './QuizPage'
import ResultPage from './ResultPage'

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [showResult, setShowResult] = useState(false)
  return (
    <main className="min-h-screen bg-[#FFFAF6] flex flex-col">
      <Header />

      <section className="flex-1 flex items-center justify-center px-6 py-12">
        {!showQuiz ? (
          <div className="text-center max-w-2xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#1F1F1F] leading-tight">
              Ta marque mérite <span className="text-[#E19882]">plus qu’un logo</span>
            </h1>

            <p className="text-lg text-[#4A4A4A]">
              Découvre ton univers de marque en 5 minutes : storytelling, ton, positionnement. C’est guidé, fluide, et magique ✨
            </p>

            <button
              onClick={() => setShowQuiz(true)}
              className="bg-[#E19882] hover:bg-[#CC7A68] text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              🎯 Commencer le quiz
            </button>

            <p className="text-sm text-[#999999]">
              +120 entrepreneuses ont déjà transformé leur image avec IdentityFlow
            </p>
          </div>
        ) : showResult ? (
          <div className="w-full max-w-3xl">
            <ResultPage />
          </div>
        ) : (
          <div className="w-full max-w-xl">
            <QuizPage onFinish={() => setShowResult(true)} />
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}