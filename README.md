# TheoWeb Solutions

Landing page statique en français pour offrir la checklist PDF gratuite :
« Les 7 informations qu’un client doit trouver en moins de 30 secondes ».

## Stack et structure

Le projet utilise HTML, CSS et JavaScript vanilla : aucune installation de dépendance ni commande de build n’est nécessaire.

```text
index.html                 Page principale et métadonnées SEO
style.css                  Styles responsive
script.js                  Formulaires, téléchargement et interactions
analytics.js               Chargement conditionnel de Google Analytics 4
api/analytics-config.js    Fonction Vercel qui expose uniquement l’ID GA4
assets/logo.png            Logo TheoWeb Solutions
robots.txt                 Instructions pour les moteurs de recherche
sitemap.xml                Sitemap temporaire
```

## Lancer localement

Ouvrez `index.html` avec l’extension Live Server de VS Code, ou lancez un serveur statique depuis le dossier du projet :

```bash
npx serve .
```

Ouvrez ensuite l’adresse affichée dans le navigateur.

## Vérifications avant publication

- Le bouton de téléchargement pointe vers le PDF Google Drive.
- Les boutons WhatsApp utilisent le numéro `+509 4634 4841`.
- Les liens Facebook et LinkedIn sont renseignés dans le footer.
- Le formulaire de checklist envoie une notification via FormSubmit après le clic réel sur le téléchargement. Validez l’email d’activation FormSubmit reçu lors de la première soumission.
- Le formulaire de contact affiche aujourd’hui une confirmation locale ; il ne transmet pas encore de message par email.

## Liens à modifier

- PDF : cherchez `drive.google.com` dans `index.html`.
- WhatsApp : cherchez `50946344841` dans `index.html` et `script.js`.
- Email de contact : cherchez `louisjustetheodore@gmail.com`.
- Réseaux sociaux : modifiez les liens Facebook et LinkedIn du footer dans `index.html`.
- Image sociale : remplacez `assets/logo.png` par une image 1200 × 630 px et mettez à jour `og:image` dans `index.html`.

## Déployer sur Vercel

1. Connectez-vous à Vercel :

   ```bash
   npx vercel login
   ```

2. Liez le dossier au nouveau projet. Choisissez le nom `theoweb-solutions` si disponible, puis confirmez que le répertoire courant est le dossier du projet.

   ```bash
   npx vercel link
   ```

3. Ajoutez Google Analytics si vous avez déjà son Measurement ID (voir la section suivante), puis déployez :

   ```bash
   npx vercel --prod
   ```

Vercel publie le site automatiquement en HTTPS et fournit un certificat SSL pour l’URL `vercel.app`. L’URL temporaire prévue par les fichiers SEO est `https://theoweb-solutions.vercel.app/`. Si Vercel attribue une URL différente, remplacez cette URL dans `index.html`, `robots.txt` et `sitemap.xml`, puis redéployez.

### Ajouter un domaine personnalisé plus tard

Dans le tableau de bord Vercel, ouvrez le projet puis **Settings → Domains**. Ajoutez le domaine et appliquez les enregistrements DNS fournis. Après validation, remplacez l’URL `vercel.app` dans les balises canonical/Open Graph, `robots.txt` et `sitemap.xml`, puis redéployez.

## Configuration de Google Analytics

1. Créez une propriété Google Analytics 4 sur [Google Analytics](https://analytics.google.com).
2. Récupérez le Measurement ID qui commence par `G-`.
3. Dans Vercel, ouvrez **Settings → Environment Variables** et ajoutez :

   ```text
   GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```

   Ajoutez-le au moins à l’environnement **Production**.
4. Redéployez le site avec `npx vercel --prod`.
5. Vérifiez les visites dans le rapport Temps réel de Google Analytics.

Sans cette variable, aucun script Google Analytics n’est chargé. Les événements configurés ne contiennent aucune donnée personnelle :

- `form_submit`
- `checklist_download_click`
- `whatsapp_audit_click`

## Connecter le site à Google Search Console

1. Ouvrez [Google Search Console](https://search.google.com/search-console).
2. Ajoutez une propriété de type **Préfixe de l’URL**.
3. Saisissez l’URL Vercel finale, par exemple `https://theoweb-solutions.vercel.app/`.
4. Utilisez la méthode de validation recommandée par Google Search Console.
5. Une fois la propriété validée, ouvrez la section **Sitemaps** et soumettez :

   ```text
   https://theoweb-solutions.vercel.app/sitemap.xml
   ```

6. Quand un domaine personnalisé sera connecté, créez une propriété pour ce domaine (ou actualisez la propriété appropriée), mettez à jour les URL SEO du projet, puis soumettez le nouveau sitemap.

## Variables d’environnement

Copiez `.env.example` en `.env.local` seulement pour les tests locaux. Ne versionnez jamais `.env.local` ni une vraie clé.
