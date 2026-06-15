# Planlegging – Fagprøve – IT-Utvikling

**Falk von Krogh**

15.6.2026 – 23.6.2026

---

## Innhold

- [Introduksjon](#introduksjon)
  - [-Claude-](#-claude-)
- [Fremdriftsplan for Fagprøve-uken](#fremdriftsplan-for-fagprøve-uken)
- [Stories (Oppgaver)](#stories-oppgaver)
  - [STRY0019743](#stry0019743)
  - [STRY0019744](#stry0019744)
  - [STRY0019741](#stry0019741)
  - [STRY0019745](#stry0019745)
- [Fagbegreper / Interne navn](#fagbegreper--interne-navn)
- [Hjelpemidler](#hjelpemidler)
- [Utstyr](#utstyr)
- [Total-tid](#total-tid)
- [Kilder / samarbeidspartnere](#kilder--samarbeidspartnere)

---

## Introduksjon

Dette vil bli ett dokument for planlegging av arbeid som vil bli gjort underveis i fagprøven. Jeg vil også legge ved ett utskrift fra Claude som blir en av mine hjelpemidler under fagprøven for å klarifisere hvordan bruken min av kunstig intelligens vil bli gjort.

### -Claude-

> «Så må jeg være ærlig med deg om én ting, og det er fordi jeg mener det er til ditt beste – ikke for å være vanskelig. Vi avtalte dette i forrige uke: forberedelse var fritt frem, men når prøven er live er det *din* kompetanse som vurderes. Den linja holder jeg nå. Reglene dine (bilde 8) sier eksplisitt at du kan diskutere problemstillinger med en kollega *så lenge du selv kan redegjøre for løsningen*. Det er nøyaktig den rollen jeg kan ha: en kollega du tenker høyt med, som utfordrer tolkningen din, stiller deg "hvorfor"-spørsmål, og hjelper deg når du står fast. Det jeg ikke gjør, er å skrive planen, koden eller egenvurderingen din.»

Det er veldig viktig for meg å presisere dette, ettersom kunstig intelligens skal brukes som ett verktøy og ikke en fasit i dagens verden hvor KI har blitt en så stor del av hverdagsoppgavene.

---

## Fremdriftsplan for Fagprøve-uken

| Dag | Dato | Hovedfokus | Faste frister |
| --- | --- | --- | --- |
| 1 | Man 15.6 | Planlegging: tolke alle 4 STRY-er, skrive løsningsforslag + tidsskjema | **Plan til Kristoffer + Jan Egil innen 17:00** |
| 2 | Tir 16.6 | **STRY0019743** – opprette Criticality-feltet (choice 1–5) og legge det på skjemaet. Ferdigstille og teste. Ved tid: begynne på **STRY0019744** | Logg innen 16:00 |
| 3 | Ons 17.6 | STRY0019744 ferdig + test. *Mulig endring fra nemnda* | Logg innen 16:00 |
| 4 | Tor 18.6 | STRY0019741 (cmn_location-filter) + start STRY0019745. *Mulig endring* | Logg innen 16:00 |
| 5 | Fre 19.6 | STRY0019745 (trygg fjerning av CI) ferdig + test | Logg innen 16:00 |
| 6 | Man 22.6 | Sluttkontroll, buffer, all testing fullført, dokumentasjon ferdigstilt | **Arbeid + dokumentasjon tilgjengelig innen 16:00** + logg |
| 7 | Tir 23.6 | Presentasjon + demo for nemnda, deretter egenvurdering | **Egenvurdering sendes etter presentasjon** |

---

## Stories (Oppgaver)

### STRY0019743

**Tids-estimat – 2 timer**

#### Skisse

| Egenskap | Verdi |
| --- | --- |
| Tabell | change_request |
| Feltnavn | u_criticality |
| Type | Choice |
| Verdier | 1–5 (1 = høyest) |
| Plassering | Under Impact-feltet |
| Tilgang | read-only for bruker, settes automatisk av business rule (STRY0019744) |

Målet for denne storyen er å implementere ett nytt felt inn i formen. Denne skal inneholde følgende –

- Plassert på change request, under Impact-feltet
- Inneholde verdiene 1–5 (1 = høyest)
- read-only for bruker, settes automatisk

Fremgangsmåten her kan gjøres på flere forskjellige måter, men jeg velger den metoden som jeg har tatt i bruk flere ganger tidligere. Den måten går ut på å bruke ServiceNow sin egen Form Builder for å legge inn ett nytt ferdigdefinert felt slik som Criticality som jeg skal bruke i denne oppgaven.

Hvis feltet allerede finnes i systemet så vil det være ganske enkelt å legge til feltet. Det skal ikke være mer enn å dra feltet inn så vil systemet ordne resten.

Hvis feltet ikke finnes så må jeg lage den manuelt. Dette innebærer å bruke Dictionary Entry sin egen tabell for å bygge opp feltet selv. Altså konfigurere og sette verdier på hver av de forskjellige valgene.

Basert på hva jeg finner når jeg skal gjøre oppgaven (etter planleggings-dagen) så velger jeg da om jeg kan gjenbruke en funksjonalitet som allerede finnes eller om jeg må lage feltet fra bunnen av.

---

### STRY0019744

**Tids-estimat – 3–4 timer**

#### Skisse

| Risk | Impact | Criticality |
| --- | --- | --- |
| No risk | One user or none | 5 |
| Low risk | One user or none | 5 |
| Moderate risk | One user or none | 4 |
| ... | ... | ... |
| Very high risk | Org-wide / Critical services | 1 |

*(Lookup-tabellen får 20 rader totalt – 5 Risk × 4 Impact. Verdiene for Risk/Impact må verifiseres mot faktiske choices i Dev.)*

```
Bruker setter/endrer Risk eller Impact
              │
              ▼
   Data Lookup Definition trigger
              │
              ▼
   Slår opp (Risk + Impact) i lookup-tabellen
              │
              ▼
   Setter Criticality automatisk på recorden
```

Målet for denne storyen er å få criticality-feltet automatisk fylt ut basert på Risk og Impact, via matrisen, samt oppdateres når risk eller impact endres. Denne skal inneholde følgende –

- Criticality beregnes automatisk basert på Risk og Impact
- Det trigger når enten Risk *eller* Impact settes/endres
- Verdien oppdateres på recorden

Fremgangsmåten her blir definitivt annerledes enn de andre oppgavene ettersom dette er helt nytt for meg. Basert på det jeg har lest i storyen og søkt meg frem til nå så burde jeg bruke en Data Lookup Definition.

En lookup-tabell må lages for at Data Lookup-definisjonen skal ha ett sted å lete. Denne skal inneholde de forskjellige kombinasjonene med risk og impact (Risk + Impact → Criticality) og en type definition-record som kobler input til output.

Grunnen til at jeg velger en Data Lookup fremfor en Business Rule + Script Include er fordi Data Lookup Definition er innebygd i ServiceNow, kodefritt og veldig enkel å vedlikeholde. Det er også viktig å påpeke at matrisen jeg bruker er ett oppslag med verdier og ikke en formel.

---

### STRY0019741

**Tids-estimat – 3 timer**

#### Skisse

Filteret som skal legges på er allerede beskrevet i «acceptance criteria», og en skisse her vil være meningsløst uten å avklare den faktiske mekanismen som blir avklart under gjennomføring.

Målet for denne storyen er å lage ett filter som gjør det enklere for brukere å lese tabellen. Denne skal inneholde følgende –

- Listen er default-filtrert til Install Status = Installed
- OG viser kun faktiske nettverksenheter (routere, switcher, AP-er, brannmurer, WLC, ISE) – ekskluderer power supplies, interfaces og andre ikke-enheter
- Brukeren kan endre/fjerne filteret for å se de ekskluderte recordene

Fremgangsmåten her blir å lage ett filter på Configuration Items related list i en cmn_location-record. Har jobbet med filtre før, men det å redigere ett «default» filter som skal vises for alle som ser den er en annen sak. Jeg må passe på at jeg tilfredsstiller alle parter og holder den lett å lese for alle, slik at alle brukere ikke ønsker å «lage sitt eget» filter med en gang de ser den.

Ett lite problem som oppsto i planleggingsdelen her nå er at den konkrete mekanismen for ett «systemwide» default-filter på denne related listen må undersøkes på gjennomføringsdagen, da det ikke er en standard relationship-record.

Jeg vil også legge til at avgrensning av hva som blir filtrert sannsynligvis vil bli gjort basert på CI-klasse eller en kategori som «Network Gear». Dette er ett valg jeg vil gjøre når selve arbeidet starter, ettersom jeg ikke har utforsket tilgjengelige felter i tabellen i planleggingsdelen.

---

### STRY0019745

**Tids-estimat – 4 timer**

#### Skisse

```
Bruker huker av rader i listen
              │
              ▼
Velger "Remove Selected" i Actions on selected rows
              │
              ▼
Leser avhukede sys_id-er (sysparm_checked_items, klientside)
              │
              ▼
GlideRecord (server-side) sletter koblingsradene i m2m-tabellen
              │
              ▼
CI-recordene i cmdb_ci forblir urørt
```

```
[ change_request ] ──< m2m-koblingstabell >── [ cmdb_ci ]
                            ▲
                Remove Selected sletter HER
                (koblingsraden), ikke i cmdb_ci
```

Målet for denne storyen er å lage en UI Action med navn «Remove Selected».

Denne skal inneholde følgende –

- En "Remove Selected"-knapp på "Impacted Services/CIs" related list
- Den fjerner valgte CI-referanser fra listen
- De underliggende CI-recordene i CMDB forblir uendret

Fremgangsmåten min for denne oppgaven blir å lage en UI Action på «selected rows»-menyen ettersom det gir en enklere UX. Dette er fordi selected rows-menyen ligger visuelt på samme sted, i motsetning til en UI Action-knapp som ville ligget på toppen av formen.

Jeg kommer til å bruke en UI Action-funksjon i koden som heter «sysparm_checked_items». Det ligger litt i navnet, men det den gjør er å hente hvilke rader som er huket av på klientsiden, for så å sende den videre ved bruk av en GlideRecord på server-siden for å sende spørringer og dermed slette koblingsradene.

Noe av det viktigste i denne storyen er at man kun skal fjerne koblingen mellom change-recorden og CI-en, og at man ikke fjerner selve CI-en fra cmdb-tabellen.

---

## Fagbegreper / Interne navn

| Navn jeg bruker | Forklaring | Systemnavn |
| --- | --- | --- |
| Form Builder | En «drag & drop»-side for å kunne bygge forms. Den har basic funksjonalitet for det enkleste (legg inn ett tekstfelt eller overskrift), men den har også mulighet for avanserte funksjoner som for eksempel UI Policies (for å gjemme felter basert på en pre-definert funksjon etc…) | |
| System Dictionary | sys_dictionary definerer *felter* (kolonner, datatyper) | sys_dictionary |
| Business Rules | En business rule er server-side logikk som kjører på en database-operasjon (insert/update/delete/query) på en tabell. | |

---

## Hjelpemidler

Claude, SN-Utils, intern dokumentasjon, ServiceNow Docs

---

## Utstyr

ServiceNow, SN-Utils, PC

Verdt å påpeke at det ikke er nødvendig med noen andre former for utstyr i ServiceNow. Den har alt bygd inn, og det gjør det ekstremt mye enklere å jobbe på kryss og tvers.

---

## Total-tid

Regnet på 12–13t på selve arbeidet. Det vil garantert ta lenger tid grunnet flytting mellom instanser og avventing av svar fra kollegaer.

---

## Kilder / samarbeidspartnere

ServiceNow Docs, Telenors interne change-rutiner, SPA (mitt team), Ovid Alexander (tester på change stories), Espen Frøstrup (kontakt på Location-story)
