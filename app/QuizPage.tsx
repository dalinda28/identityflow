'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { questions as rawQuestions } from './data/quizQuestions'
const questions = rawQuestions.slice(0, rawQuestions.length - 1)
import ProgressBar from './components/ProgressBar'
type QuizProps = {
    onFinish?: () => void
    onAnswersCollected?: (answers: string[]) => void
}
export default function QuizPage({ onFinish, onAnswersCollected }: QuizProps) {
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
    const [result, setResult] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const handleAnswer = async (answer: string) => {
        const newAnswers = [...answers, answer]
        setAnswers(newAnswers)

        if (step < totalSteps - 1) {
            setStep(step + 1)
        } else {
            setIsFinished(true)
            localStorage.setItem('quizAnswers', JSON.stringify(newAnswers))
            setLoading(true)
            try {
                const res = await fetch('/api/generate-brand', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ answers: newAnswers })
                })
                const data = await res.json()
                localStorage.setItem('quizResult', data.result)
                setResult(data.result)
            } catch (error) {
                console.error("Erreur lors de la génération IA :", error)
            } finally {
                setLoading(false)
            }
            onAnswersCollected?.(newAnswers)
            onFinish?.()
        }
    }

    const current = questions[step]

    return (
        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6 border border-[#F0F0F0]">
            <ProgressBar currentStep={step + 1} totalSteps={totalSteps} />
            <p className="text-sm text-center text-[#999]">
              Étape {step + 1} sur {totalSteps}
            </p>

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
                                        className="w-full py-3 px-4 rounded-xl border border-[#E2E2E2] bg-white text-[#1F1F1F] text-left shadow-sm hover:shadow-md hover:border-[#C8D8C3] transition-all duration-200 active:scale-95"
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
                className="text-center space-y-6 pt-8"
              >
                <h2 className="text-3xl font-extrabold text-[#1F1F1F]">🌟 Félicitations !</h2>
                <p className="text-lg text-[#5f5f5f] max-w-md mx-auto">
                  Tu viens de faire un grand pas vers une identité de marque claire et alignée avec ton essence.
                </p>
                {loading ? (
                  <p className="text-[#999] mt-6">⏳ Génération de ton profil de marque en cours...</p>
                ) : result ? (
                  <div className="text-left text-sm text-[#333] bg-[#F9F9F9] rounded-xl p-4 shadow-inner whitespace-pre-wrap">
                    {result}
                  </div>
                ) : (
                  <p className="text-[#CC7A68]">Une erreur est survenue. Veuillez réessayer.</p>
                )}
              </motion.div>
            )}
        </div>
    )
}