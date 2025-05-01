import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { answers } = await req.json()

  if (!answers || !Array.isArray(answers)) {
    return NextResponse.json({ error: 'Réponses manquantes ou invalides' }, { status: 400 })
  }

  const prompt = `
Tu es une experte en stratégie de marque spécialisée dans l'accompagnement des femmes entrepreneuses. À partir des réponses ci-dessous, rédige un profil de marque clair, profond, engageant et cohérent.

Réponses :
${answers.map((a: string, i: number) => `Q${i + 1}: ${a}`).join('\n')}

Donne-moi :
1. Un storytelling complet de 6 à 10 lignes qui incarne la vision, les valeurs et l’essence de la fondatrice. Le style doit être humain, inspirant, sensible mais impactant.
2. Quatre adjectifs pour qualifier le ton de la marque (ex. chaleureux, affirmé, minimaliste…).
3. Une citation signature originale et percutante (style slogan ou mantra) qui reflète l’âme de la marque.
4. Une palette de couleurs cohérente avec l’univers émotionnel évoqué (donne 4 à 5 codes hex).
5. Une liste de hashtags pertinents à utiliser sur Instagram ou LinkedIn pour toucher son audience.
6. Une suggestion de nom de marque (original, court, mémorable) et une brève justification de son intention.

Parle directement à une femme ambitieuse, intuitive et déterminée, en quête d’une identité de marque alignée. Sois professionnelle, bienveillante et inspirante. Utilise un ton clair, fluide et immersif.
`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8
      })
    })

    const data = await response.json()
    console.log('Réponse OpenAI brute :', data)
    const result = data.choices?.[0]?.message?.content

    return NextResponse.json({ result })
  } catch (err) {
    return NextResponse.json({ error: 'Erreur lors de l’appel à OpenAI' }, { status: 500 })
  }
}
