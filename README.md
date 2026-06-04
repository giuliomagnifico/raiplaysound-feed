# RaiPlay Sound Feed

Questo repository genera dei feed RSS per i programmi di RaiPlay Sound, e sono generati automaticamente tramite GitHub Actions e GitHub Pages. In modo da potersi abbonare/ascoltare su qualsiasi client podcast  e non esclusivamente tramite l’app RaiPlaySound. 

Questo progetto è una evoluzione di un mio [precedente repository](https://github.com/giuliomagnifico/raiplay-feed),  il quale aveva il problema di non risolvere correttamente la redirect ed era quindi necessario scaricare il file prima di riprodurlo certi podcast. Adesso gli URLs vengono risolti fino alla CDN finale Rai, evitando i problemi causati dai redirect `relinkerServlet.htm` con alcuni client podcast (i.e. [PocketCasts](https://pocketcasts.com/)).


> [!TIP]
> È una versione modificata del repository [frammenti/raiplaysoundrss](https://github.com/frammenti/raiplaysoundrss) costruita per poter funzionare usando solo su GitHub, in modo da essere indipendente da un server esterno. 


## Podcast

| Programma | Feed RSS |
|----------|----------|
| America7 | https://giuliomagnifico.github.io/raiplaysound-feed/rss/programmi/america7.xml |
| Detectives - Casi risolti e irrisolti | https://giuliomagnifico.github.io/raiplaysound-feed/rss/programmi/detectives-casirisoltieirrisolti.xml |
| Eta Beta | https://giuliomagnifico.github.io/raiplaysound-feed/rss/programmi/etabeta.xml |
| GR Friuli Venezia Giulia | https://giuliomagnifico.github.io/raiplaysound-feed/rss/programmi/grfriuliveneziagiulia.xml |
| GR1 | https://giuliomagnifico.github.io/raiplaysound-feed/rss/programmi/gr1.xml |
| L'edicola di Radio1 | https://giuliomagnifico.github.io/raiplaysound-feed/rss/programmi/ledicoladiradio1.xml |
| Lillo e Greg 610 | https://giuliomagnifico.github.io/raiplaysound-feed/rss/programmi/lilloegreg610.xml |
| Prima Pagina | https://giuliomagnifico.github.io/raiplaysound-feed/rss/programmi/primapagina.xml |
| Radio anch'io | https://giuliomagnifico.github.io/raiplaysound-feed/rss/programmi/radioanchio.xml |
| Radio3 Mondo | https://giuliomagnifico.github.io/raiplaysound-feed/rss/programmi/radio3mondo.xml |
| Radio3 Scienza | https://giuliomagnifico.github.io/raiplaysound-feed/rss/programmi/radio3scienza.xml |
| Revolution | https://giuliomagnifico.github.io/raiplaysound-feed/rss/programmi/revolution.xml |
| Tra poco in edicola | https://giuliomagnifico.github.io/raiplaysound-feed/rss/programmi/trapocoinedicola.xml |
| Tutta la città ne parla | https://giuliomagnifico.github.io/raiplaysound-feed/rss/programmi/tuttalacittaneparla.xml |
| Un giorno da pecora | https://giuliomagnifico.github.io/raiplaysound-feed/rss/programmi/ungiornodapecora.xml |
| Zapping | https://giuliomagnifico.github.io/raiplaysound-feed/rss/programmi/zapping.xml |

## Audiolibri

| Audiolibro | Feed RSS |
|------------|----------|
| Arancia meccanica | https://giuliomagnifico.github.io/raiplaysound-feed/rss/audiolibri/aranciameccanica.xml |
| Cuore di tenebra | https://giuliomagnifico.github.io/raiplaysound-feed/rss/audiolibri/cuoreditenebra.xml |
| Il grande Gatsby | https://giuliomagnifico.github.io/raiplaysound-feed/rss/audiolibri/ilgrandegatsby.xml |
| Racconti di Italo Calvino | https://giuliomagnifico.github.io/raiplaysound-feed/rss/audiolibri/raccontidiitalocalvino.xml |
| Ventimila leghe sotto i mari | https://giuliomagnifico.github.io/raiplaysound-feed/rss/audiolibri/ventimilaleghesottoimari.xml |

## Abbonarsi o aggiungere un feed

Per abbonarsi basta copiare l'URL del feed dalla tabella nel lettore podcast.

Per aggiungere programmi o audiolibri puoi forkare il repository e aggiungere manualmente i feed, oppure aprire una Pull Request modificando [static.ts](https://github.com/giuliomagnifico/raiplaysound-feed/blob/main/src/static.ts), esempio:

```ts
{
  title: 'Radio3 Scienza',
  path: 'programmi/radio3scienza'
}
```

oppure per un audiolibro:

```ts
{
  title: 'Arancia meccanica',
  path: 'audiolibri/aranciameccanica'
}
```

> [!NOTE]
> la tabella con i feeds o audiolibri nuovi si aggiorna  automaticamente con il nuovo feed (in ordine alfabetico) quando viene eseguita la Action, non aggiungere o modificare manualmente la tabella.

## Aggiornamento ogni ora

I feed vengono aggiornati automaticamente tramite GitHub Actions ogni ora e viene controllata la validità degli URL vecchi ogni 14 giorni.
