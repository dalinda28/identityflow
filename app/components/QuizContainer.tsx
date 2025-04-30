'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { questions as rawQuestions } from '../data/quizQuestions'
const questions = rawQuestions.slice(0, rawQuestions.length - 1)
import ProgressBar from './ProgressBar'

export default function QuizContainer() {
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState<string[]>([])
    const totalSteps = questions.length
    const subtexts = [
        "Fais ton choix instinctivement 💡",
        "Laisse parler ton intuition ✨",
        "Réponds avec ce qui te parle le plus 💬",
        "Ne réfléchis pas trop, suis ton feeling 🌿",
        "Va avec ce qui résonne en toi 🔍",
        "Choisis ce qui te ressemble le plus 🌟"
    ]
    const [isFinished, setIsFinished] = useState(false)
    const handleAnswer = (answer: string) => {
        const newAnswers = [...answers, answer]
        setAnswers(newAnswers)

        if (step < totalSteps - 1) {
            setStep(step + 1)
        } else {
            setIsFinished(true)
            // Appeler OpenAI API ici avec newAnswers
        }
    }

    const current = questions[step]

    return (
        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6 border border-[#F0F0F0]">
            <ProgressBar currentStep={step + 1} totalSteps={totalSteps} />

            {!isFinished && (
              <AnimatePresence mode="wait">
                  <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="space-y-6"
                  >
                      <div className="space-y-2">
                          <h2 className="text-2xl font-bold text-[#1F1F1F]">{current.question}</h2>
                          <p className="text-sm text-[#888888]">{subtexts[step]}</p>
                      </div>

                      <ul className="grid gap-4">
                          {current.options.map((opt, index) => (
                              <li key={index}>
                                  <button
                                      onClick={() => handleAnswer(opt)}
                                      className="w-full py-3 px-4 rounded-xl border border-[#E2E2E2] bg-white text-[#1F1F1F] text-left shadow-sm hover:shadow-md hover:border-[#C8D8C3] transition-all duration-200"
                                  >
                                      {opt}
                                  </button>
                              </li>
                          ))}
                      </ul>
                      
                  </motion.div>
              </AnimatePresence>
            )}
            {isFinished && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="text-center space-y-4"
                >
                    <h2 className="text-2xl font-bold text-[#1F1F1F]">✨ C’est terminé !</h2>
                    <p className="text-[#5f5f5f]">Merci pour tes réponses. Prête à découvrir ton identité de marque ?</p>
                    <button className="mt-4 bg-[#E19882] hover:bg-[#CC7A68] text-white font-semibold px-6 py-3 rounded-xl transition">
                        Générer mon profil de marque
                    </button>
                </motion.div>
            )}
        </div>
    )
}