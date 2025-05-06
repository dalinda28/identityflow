import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { answers } = await req.json()

  if (!answers || !Array.isArray(answers)) {
    return NextResponse.json({ error: 'Réponses manquantes ou invalides' }, { status: 400 })
  }

  const prompt = `
Tu es une consultante senior en branding et storytelling, avec plus de 10 ans d’expérience, spécialisée dans l’accompagnement de femmes entrepreneuses ambitieuses qui veulent bâtir une identité forte, cohérente et mémorable. À partir des données suivantes, génère un profil de marque complet, prêt à être livré à une cliente payante :

Voici les réponses introspectives de la fondatrice à un quiz de positionnement :
${answers.map((a: string, i: number) => `Q${i + 1}: ${a}`).join('\n')}

Et les informations supplémentaires à prendre en compte :
- Nom de marque (si connu) : ${answers[answers.length - 4] || 'non renseigné'}
- Domaine d’activité : ${answers[answers.length - 3] || 'non renseigné'}
- Cliente idéale : ${answers[answers.length - 2] || 'non renseigné'}
- Couleur de base souhaitée : ${answers[answers.length - 1] || 'non renseignée'}

💡 Si une couleur est précisée, construis une palette autour d’elle, cohérente avec l’univers émotionnel exprimé. Sinon, propose une palette complète alignée avec le storytelling.

Rédige un livrable clair, inspirant et complet, structuré comme suit :

1. Storytelling de la marque : 6 à 10 lignes, incarnant sa vision, ses valeurs, sa mission et sa singularité. Le style doit être humain, fluide, sensible mais impactant.
2. Ton de voix : 4 adjectifs pour qualifier la personnalité verbale de la marque.
3. Citation signature : un slogan ou mantra percutant, original et aligné avec l’âme de la marque.
4. Palette de couleurs : 4 à 5 couleurs (en codes hex), harmonieuses et alignées avec l’émotion dominante.
5. Hashtags : une liste de hashtags pertinents à utiliser sur Instagram et LinkedIn pour parler à sa communauté idéale.
6. Suggestion de nom de marque : propose un nom court, mémorable et aligné avec le ton, accompagné d’une brève justification.

🧠 Adopte un ton expert, bienveillant, clair et motivant. Tu t’adresses à une femme intuitive, déterminée, qui veut bâtir une marque incarnée, moderne et inspirante.
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
