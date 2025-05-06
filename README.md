# IdentityFlow

**IdentityFlow** est une application web Next.js qui permet aux femmes entrepreneuses de créer une identité de marque forte, cohérente et personnalisée grâce à l’intelligence artificielle.

## 🚀 Fonctionnalités

- **Quiz interactif** : Questions guidées pour cerner les valeurs, la vision et la personnalité de la fondatrice.
- **Blocs d’activité** : Nom de marque, secteur, cliente idéale et couleur d’ancrage pour un profil sur-mesure.
- **Génération IA** : Storytelling, ton de voix, citation signature, palette de couleurs experte, hashtags et suggestion de nom.
- **Téléchargement PDF** : Export du profil complet au format PDF via html2pdf.js.
- **Interface moderne** : Next.js 15, Tailwind CSS, animations Framer Motion.

## 🛠️ Tech Stack

- **Framework** : Next.js 15 (App Router)
- **Langage** : TypeScript & React
- **Styles** : Tailwind CSS
- **Animations** : Framer Motion
- **API IA** : OpenAI (GPT-3.5-Turbo)
- **Export PDF** : html2pdf.js

## 📥 Installation

1. Clone le dépôt :
   ```bash
   git clone https://github.com/dalinda28/identityflow.git
   cd identityflow
   ```
2. Installe les dépendances :
   ```bash
   npm install
   ```
3. Crée un fichier `.env.local` à la racine avec ta clé OpenAI :
   ```
   OPENAI_API_KEY=ta_cle_api_openai
   ```
4. Lance le serveur de développement :
   ```bash
   npm run dev
   ```
5. Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

## ⚙️ Configuration

- **OPENAI_API_KEY** : Clé secrète pour accéder à l’API OpenAI.
- **allowedDevOrigins** (optionnel) : Configure `next.config.js` si tu utilises un hôte externe pour le dev (Cross-Origin).

## 🚀 Déploiement

- Déployez sur Vercel pour bénéficier du support Next.js.
- Ajoutez la variable `OPENAI_API_KEY` dans les Environment Variables de Vercel.

## 📚 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

© 2025 IdentityFlow — Créé avec ❤️ par Dalinda  