import fs from 'fs/promises'
import path from 'path'
import { buildFeed } from './feed.js'
import { initCache } from './cache.js'

const BASE_URL = 'https://giuliomagnifico.github.io/raiplaysound-feed'

const programs = [
  {
    title: 'Radio3 Scienza',
    path: 'programmi/radio3scienza'
  },
  {
    title: 'Zapping',
    path: 'programmi/zapping'
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
    title: 'Un giorno da pecora',
    path: 'programmi/ungiornodapecora'
  }
]

const sortedPrograms = [...programs].sort((a, b) =>
  a.title.localeCompare(b.title, 'it', {
    sensitivity: 'base'
  })
)

await initCache()
await fs.mkdir('out/rss', { recursive: true })

for (const program of programs) {
  try {
    console.log(`Generating ${program.title}: ${program.path}`)

    const xml = await buildFeed(program.path)
    const file = path.join('out/rss', `${program.path}.xml`)

    await fs.mkdir(path.dirname(file), { recursive: true })
    await fs.writeFile(file, xml)

    console.log(`Generated ${file}`)
  } catch (err) {
    console.error(`Skipped ${program.title} (${program.path})`)
    console.error(err)
  }
}

const tableRows = sortedPrograms
  .map(program => {
    const feedUrl = `${BASE_URL}/rss/${program.path}.xml`
    return `| ${program.title} | ${feedUrl} |`
  })
  .join('\n')

const readme = `# RaiPlay Sound Feed

Feed RSS statici per RaiPlay Sound generati tramite GitHub Actions e pubblicati su GitHub Pages.

> [!TIP]
> Questo repo è la versione modificata, per essere indipendente da un server personale, appoggiandosi solo su GitHub Actions + Pages, da [frammenti/raiplaysoundrss: RSS feed for RaiPlay Sound](https://github.com/frammenti/raiplaysoundrss).

Gli URL nei feed vengono risolti fino alla CDN finale Rai, evitando i problemi causati dai redirect \`relinkerServlet.htm\` con alcuni client podcast (i.e. [PocketCasts](https://pocketcasts.com/)).

## Podcast

| Podcast | Feed RSS |
|----------|----------|
${tableRows}

## Abbonarsi o aggiungere un feed

Per abbonarsi basta copiare l'URL del podcast dalla tabella nel lettore podcast.

Per aggiungere programmi puoi forkare il repository e aggiungere manualmente i feeds, oppure aprire una Pull Request con il programma che vuoi aggiungere, modificando [static.ts](https://github.com/giuliomagnifico/raiplaysound-feed/blob/main/src/static.ts), esempio:

\`\`\`ts
{
  title: 'Radio3 Scienza',
  path: 'programmi/radio3scienza'
}
\`\`\`

Al primo run della Action si aggiorna automaticamente anche la tabella nel README con il nuovo feed in ordine alfabetico.

## Aggiornamento orario

I feed vengono aggiornati automaticamente tramite GitHub Actions ogni ora e viene controllata la validità degli URL vecchi ogni 14 giorni.
`

await fs.writeFile('README.md', readme)

const htmlRows = sortedPrograms
  .map(program => {
    const feedUrl = `${BASE_URL}/rss/${program.path}.xml`

    return `<tr>
  <td>${program.title}</td>
  <td><a href="${feedUrl}">${feedUrl}</a></td>
</tr>`
  })
  .join('\n')

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

<table border="1">
<tr>
<th>Podcast</th>
<th>Feed RSS</th>
</tr>
${htmlRows}
</table>

</body>
</html>
`
)
