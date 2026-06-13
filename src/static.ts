import fs from 'fs/promises'
import path from 'path'
import { buildFeed } from './feed.js'
import { initCache } from './cache.js'

const BASE_URL = 'https://giuliomagnifico.github.io/raiplaysound-feed'

const podcasts = [
  {
    title: 'Radio3 Scienza',
    path: 'programmi/radio3scienza'
  },
  {
    title: 'Zapping',
    path: 'programmi/zapping'
  },
    {
    title: 'GR1',
    path: 'programmi/gr1'
  },
    {
    title: 'GR Friuli Venezia Giulia',
    path: 'programmi/grfriuliveneziagiulia'
  },
  {
    title: "Radio anch'io",
    path: 'programmi/radioanchio'
  },
  {
    title: 'Radio3 Mondo',
    path: 'programmi/radio3mondo'
  },
  {
    title: 'America7',
    path: 'programmi/america7'
  },
  {
    title: 'Eta Beta',
    path: 'programmi/etabeta'
  },
  {
    title: 'Detectives - Casi risolti e irrisolti',
    path: 'programmi/detectives-casirisoltieirrisolti'
  },
  {
    title: "L'edicola di Radio1",
    path: 'programmi/ledicoladiradio1'
  },
  {
    title: 'Prima Pagina',
    path: 'programmi/primapagina'
  },
  {
    title: 'Revolution',
    path: 'programmi/revolution'
  },
  {
    title: 'Tutta la città ne parla',
    path: 'programmi/tuttalacittaneparla'
  },
  {
    title: 'Tra poco in edicola',
    path: 'programmi/trapocoinedicola'
  },
    {
    title: 'Lillo e Greg 610',
    path: 'programmi/lilloegreg610'
  },
  {
    title: 'Un giorno da pecora',
    path: 'programmi/ungiornodapecora'
  },
  {
    title: 'Number Stations - Le radio delle spie',
    path: 'programmi/numberstations-leradiodellespie'
  },
    {
    title: 'Pillole di Eta Beta',
    path: 'programmi/pilloledietabeta'
  },
  {
    title: 'Gr3',
    path: 'programmi/Gr3'
  },
  {
    title: 'Wikiradio. Le voci della storia',
    path: 'programmi/wikiradiolevocidellastoria'
  },
  {
    title: 'L'idealista',
    path: 'programmi/lidealista'
  },
  {
    title: 'La musica tra le righe',
    path: 'programmi/lamusicatralerighe'
  },
   {
    title: 'Giro del Mondo in una Coppa',
    path: 'programmi/girodelmondoinunacoppa'
  }
]

const audiobooks = [
  {
    title: 'Arancia meccanica',
    path: 'audiolibri/aranciameccanica'
  },
    {
    title: 'Cuore di tenebra',
    path: 'audiolibri/cuoreditenebra'
  },
    {
    title: 'Il grande Gatsby',
    path: 'audiolibri/ilgrandegatsby'
  },
    {
    title: 'Racconti di Italo Calvino',
    path: 'audiolibri/raccontidiitalocalvino'
  },
    {
    title: 'Ventimila leghe sotto i mari',
    path: 'audiolibri/ventimilaleghesottoimari'
  }
]

const allFeeds = [...podcasts, ...audiobooks]

const sortedPodcasts = [...podcasts].sort((a, b) =>
  a.title.localeCompare(b.title, 'it', {
    sensitivity: 'base'
  })
)

const sortedAudiobooks = [...audiobooks].sort((a, b) =>
  a.title.localeCompare(b.title, 'it', {
    sensitivity: 'base'
  })
)

await initCache()
await fs.mkdir('out/rss', { recursive: true })

for (const feed of allFeeds) {
  try {
    console.log(`Generating ${feed.title}: ${feed.path}`)

    const xml = await buildFeed(feed.path)
    const file = path.join('out/rss', `${feed.path}.xml`)

    await fs.mkdir(path.dirname(file), { recursive: true })
    await fs.writeFile(file, xml)

    console.log(`Generated ${file}`)
  } catch (err) {
    console.error(`Skipped ${feed.title} (${feed.path})`)
    console.error(err)
  }
}

function markdownRows(feeds: typeof allFeeds) {
  return feeds
    .map(feed => {
      const feedUrl = `${BASE_URL}/rss/${feed.path}.xml`
      return `| ${feed.title} | ${feedUrl} |`
    })
    .join('\n')
}

function htmlRows(feeds: typeof allFeeds) {
  return feeds
    .map(feed => {
      const feedUrl = `${BASE_URL}/rss/${feed.path}.xml`

      return `<tr>
  <td>${feed.title}</td>
  <td><a href="${feedUrl}">${feedUrl}</a></td>
</tr>`
    })
    .join('\n')
}

const podcastRows = markdownRows(sortedPodcasts)
const audiobookRows = markdownRows(sortedAudiobooks)

const readme = `# RaiPlay Sound Feed

Questo repository genera dei feed RSS per i programmi di RaiPlay Sound, e sono generati automaticamente tramite GitHub Actions e GitHub Pages. In modo da potersi abbonare/ascoltare su qualsiasi client podcast  e non esclusivamente tramite l’app RaiPlaySound. 


## Podcast

| Programma | Feed RSS |
|----------|----------|
${podcastRows}

## Audiolibri

| Audiolibro | Feed RSS |
|------------|----------|
${audiobookRows}

## Abbonarsi o aggiungere un feed

Per abbonarsi basta copiare l'URL del feed dalla tabella nel lettore podcast.

Per aggiungere programmi o audiolibri puoi forkare il repository e aggiungere manualmente i feed, oppure aprire una Pull Request modificando [static.ts](https://github.com/giuliomagnifico/raiplaysound-feed/blob/main/src/static.ts), esempio:

\`\`\`ts
{
  title: 'Radio3 Scienza',
  path: 'programmi/radio3scienza'
}
\`\`\`

oppure per un audiolibro:

\`\`\`ts
{
  title: 'Arancia meccanica',
  path: 'audiolibri/aranciameccanica'
}
\`\`\`

> [!NOTE]
> la tabella con i feeds o audiolibri nuovi si aggiorna  automaticamente con il nuovo feed (in ordine alfabetico) quando viene eseguita la Action, non aggiungere o modificare manualmente la tabella.

## Aggiornamento ogni ora

I feed vengono aggiornati automaticamente tramite GitHub Actions ogni ora e viene controllata la validità degli URL vecchi ogni 14 giorni.

## INFO

Questo progetto è una evoluzione di un mio [precedente repository](https://github.com/giuliomagnifico/raiplay-feed),  il quale aveva il problema di non risolvere correttamente la redirect ed era quindi necessario scaricare il file prima di riprodurlo certi podcast. Adesso gli URLs vengono risolti fino alla CDN finale Rai, evitando i problemi causati dai redirect \`relinkerServlet.htm\` con alcuni client podcast (i.e. [PocketCasts](https://pocketcasts.com/)).


> [!TIP]
> È una versione modificata del repository [frammenti/raiplaysoundrss](https://github.com/frammenti/raiplaysoundrss) costruita per poter funzionare usando solo su GitHub, in modo da essere indipendente da un server esterno. 

`
await fs.writeFile('README.md', readme)

await fs.writeFile(
  'out/index.html',
  `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>RaiPlay Sound Feed</title>
</head>
<body>
<h1>RaiPlay Sound Feed</h1>

<p>Feed RSS statici per RaiPlay Sound con URL CDN Rai già risolti.</p>

<h2>Podcast</h2>
<table border="1">
<tr>
<th>Podcast</th>
<th>Feed RSS</th>
</tr>
${htmlRows(sortedPodcasts)}
</table>

<h2>Audiolibri</h2>
<table border="1">
<tr>
<th>Audiolibro</th>
<th>Feed RSS</th>
</tr>
${htmlRows(sortedAudiobooks)}
</table>

</body>
</html>
`
)
