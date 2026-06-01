# RaiPlay Sound Feed

Feed RSS statici per RaiPlay Sound generati tramite GitHub Actions e pubblicati su GitHub Pages.

> [!TIP]
> Questo repo è la versione modificata, per essere indipendente da un server personale, appoggiandosi solo su GitHub Actions + Pages, da [frammenti/raiplaysoundrss: RSS feed for RaiPlay Sound](https://github.com/frammenti/raiplaysoundrss).

Gli URL nei feed vengono risolti fino alla CDN finale Rai, evitando i problemi causati dai redirect `relinkerServlet.htm` con alcuni client podcast (i.e. [PocketCasts](https://pocketcasts.com/)).

## Podcast

| Podcast | Feed RSS |
|----------|----------|
| America7 | https://giuliomagnifico.github.io/raiplaysound-feed/rss/programmi/america7.xml |
| Detectives - Casi risolti e irrisolti | https://giuliomagnifico.github.io/raiplaysound-feed/rss/programmi/detectives-casirisoltieirrisolti.xml |
| Eta Beta | https://giuliomagnifico.github.io/raiplaysound-feed/rss/programmi/etabeta.xml |
| L'edicola di Radio1 | https://giuliomagnifico.github.io/raiplaysound-feed/rss/programmi/ledicoladiradio1.xml |
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

Al primo run della Action si aggiorna automaticamente anche la tabella nel README con il nuovo feed in ordine alfabetico.

## Aggiornamento orario

I feed vengono aggiornati automaticamente tramite GitHub Actions ogni ora e viene controllata la validità degli URL vecchi ogni 14 giorni.
