// The Swedish locale. Every key mirrors the English source; anything missing
// falls back to the English original rather than showing a key.

const ui = {
  close: { en: 'Close', sv: 'Stäng' },
  home: { en: 'Home', sv: 'Hem' },
  search: { en: 'Search', sv: 'Sök' },
  language: { en: 'Language', sv: 'Språk' },
  searchPlaceholder: {
    en: 'Search stories, laureates, milestones…',
    sv: 'Sök berättelser, pristagare, milstolpar…',
  },
  nothingMatches: { en: 'Nothing matches', sv: 'Inget matchar' },
  trailLabel: { en: 'Path through the atlas', sv: 'Vägen genom atlasen' },

  landingTagline: {
    en: 'Tap on what you want to explore today',
    sv: 'Tryck på det du vill utforska i dag',
  },
  entryStory: { en: 'Story', sv: 'Berättelse' },
  entryStoryBlurb: {
    en: 'Discover the story behind remarkable minds',
    sv: 'Upptäck historien bakom märkvärdiga tankar',
  },
  entryMilestone: { en: 'Milestone', sv: 'Milstolpe' },
  entryMilestoneBlurb: {
    en: 'Move through moments that changed the world',
    sv: 'Vandra genom ögonblick som förändrade världen',
  },
  entryDiscovery: { en: 'Discovery', sv: 'Upptäck' },
  entryDiscoveryBlurb: {
    en: 'Follow your curiosity and explore your own path',
    sv: 'Följ din nyfikenhet och gå din egen väg',
  },

  storiesTitle: { en: 'Stories', sv: 'Berättelser' },
  storiesHint: { en: 'Drag to explore · tap a story to open it', sv: 'Dra för att utforska · tryck på en berättelse' },
  milestonesTitle: { en: 'Milestones', sv: 'Milstolpar' },
  milestonesHint: {
    en: 'Key events across the century · open one to meet its laureates',
    sv: 'Seklets viktigaste händelser · öppna en för att möta dess pristagare',
  },
  discoveryTitle: { en: 'Discovery', sv: 'Upptäck' },
  discoveryHint: { en: 'Filter the matrix · drag to explore', sv: 'Filtrera matrisen · dra för att utforska' },
  nothingHere: { en: 'Nothing matches these filters', sv: 'Inget matchar dessa filter' },

  fields: { en: 'Fields', sv: 'Områden' },
  timeline: { en: 'Timeline', sv: 'Tidslinje' },
  location: { en: 'Location', sv: 'Plats' },
  resetFilters: { en: 'Reset filters', sv: 'Rensa filter' },

  storyKicker: { en: 'Story', sv: 'Berättelse' },
  of: { en: 'of', sv: 'av' },
  previousScreen: { en: 'Previous screen', sv: 'Föregående sida' },
  nextScreen: { en: 'Next screen', sv: 'Nästa sida' },
  storyScreens: { en: 'Story screens', sv: 'Berättelsens sidor' },
  credit: {
    en: 'Imagery generated for this prototype. Text drawn from Nobel Prize history.',
    sv: 'Bilderna är genererade för denna prototyp. Texten bygger på Nobelprisets historia.',
  },
}

const kinds = {
  theme: 'Tema',
  person: 'Pristagare',
  milestone: 'Milstolpe',
  artifact: 'Föremål',
  story: 'Berättelse',
}

const fields = {
  physics: 'Fysik',
  chemistry: 'Kemi',
  medicine: 'Fysiologi eller medicin',
  literature: 'Litteratur',
  peace: 'Fred',
  economics: 'Ekonomisk vetenskap',
}

const countries = {
  'United States': 'USA',
  'United Kingdom': 'Storbritannien',
  Germany: 'Tyskland',
  France: 'Frankrike',
  Poland: 'Polen',
  Russia: 'Ryssland',
  Italy: 'Italien',
  Canada: 'Kanada',
  Austria: 'Österrike',
  Japan: 'Japan',
  Netherlands: 'Nederländerna',
  Colombia: 'Colombia',
  Hungary: 'Ungern',
  Myanmar: 'Myanmar',
  Pakistan: 'Pakistan',
  Philippines: 'Filippinerna',
  Australia: 'Australien',
}

const themes = {
  chance: {
    label: 'Slump',
    cta: 'Upptäck hur det oväntade tänder nytt ljus',
    blurb: 'Det förberedda sinnet möter det oplanerade ögonblicket. Mögel driver in på en glömd skål; en skärm lyser när den borde vara mörk.',
  },
  creativity: {
    label: 'Kreativitet',
    cta: 'Se vad som händer när någon föreställer sig formen först',
    blurb: 'Att se en form som ingen ännu har ritat — i en molekyl, en mening, ett bevis.',
  },
  revolt: {
    label: 'Uppror',
    cta: 'Möt dem som vägrade acceptera den vedertagna bilden',
    blurb: 'Att vägra den fastlagda förklaringen. Varje paradigm var en gång en olydnadshandling.',
  },
  accident: {
    label: 'Olyckshändelse',
    cta: 'Följ upptäckterna som började som någons misstag',
    blurb: 'Ett spill, ett felgrepp, ett förorenat prov. En upptäckt gömd inuti ett misstag.',
  },
  'invisible-worlds': {
    label: 'Osynliga världar',
    cta: 'Se under ögats tröskel',
    blurb: 'Allt som sker under ögats tröskel — mikrober, atomer, strålning, gener.',
  },
  courage: {
    label: 'Mod',
    cta: 'Stå med dem som talade när det kostade dem allt',
    blurb: 'Att stå i det öppna när det kostar något. Tal, exil, fängelse, bruten tystnad.',
  },
  play: {
    label: 'Lek',
    cta: 'Ta reda på hur allvarligt arbete ser ut när det liknar pyssel',
    blurb: 'Allvarligt arbete som ser ut som pyssel. Leksaker och pusslande som blir fysik.',
  },
  solitude: {
    label: 'Ensamhet',
    cta: 'Tillbringa tid i tystnaden där genombrotten görs',
    blurb: 'Långa sträckor ensam med ett problem — den tystnad som de flesta genombrott görs i.',
  },
  dreams: {
    label: 'Drömmar',
    cta: 'Följ svaren som kom i sömnen',
    blurb: 'Svar som kommer på tvären, i sömn eller dagdröm, när förnuftet släpper taget.',
  },
  youth: {
    label: 'Ungdom',
    cta: 'Möt pristagarna som var alldeles för unga för att veta bättre',
    blurb: 'Arbete gjort orimligt tidigt. Bragg var 25. Malala var 17.',
  },
  collaboration: {
    label: 'Samarbete',
    cta: 'Räkna namnen som ett pris för tre aldrig kunde rymma',
    blurb: 'Priser nämner tre personer. Upptäckter har sällan så få upphovsmän.',
  },
  persistence: {
    label: 'Uthållighet',
    cta: 'Stanna i berättelsens oglamorösa mitt',
    blurb: 'Ton av malm reducerad till ett decigram radium. Berättelsens oglamorösa mitt.',
  },
  observation: {
    label: 'Iakttagelse',
    cta: 'Lär dig se noggrannare på det alla redan sett',
    blurb: 'Att se noggrannare på det som alla andra redan har tittat på.',
  },
  imagination: {
    label: 'Fantasi',
    cta: 'Föreställ dig en värld innan någon kunde mäta den',
    blurb: 'Att rida på en ljusstråle. Att föreställa sig en värld man ännu inte kan mäta.',
  },
  mentoring: {
    label: 'Mentorskap',
    cta: 'Följ korridorerna som fortsätter att fostra pristagare',
    blurb: 'Släktled av lärare och elever; laboratorier som fortsätter att fostra pristagare.',
  },
  testing: {
    label: 'Prövning',
    cta: 'Se en disciplin byggd på att bevisa sig själv fel',
    blurb: 'Disciplinen att försöka bevisa sig själv fel, tusentals gånger.',
  },
  'senses-behaviour': {
    label: 'Sinnen och beteende',
    cta: 'Utforska hur en kropp tar in en värld',
    blurb: 'Hur kroppar och hjärnor tar in en värld — syn, lukt, smärta, instinkt, minne.',
  },
  healthcare: {
    label: 'Sjukvård',
    cta: 'Följ ett fynd från bänken till vårdavdelningen',
    blurb: 'Från sal till mottagning: den långsamma översättningen av laboratoriefynd till vanlig överlevnad.',
  },
  'the-atomic-age': {
    label: 'Atomåldern',
    cta: 'Möt fysiken som lyste upp städer och utplånade två',
    blurb: 'Samma fysik som lyste upp städer utplånade också två av dem.',
  },
  'antibiotics-t': {
    label: 'Antibiotika',
    cta: 'Färdas genom decenniet mellan ett mögel och en medicin',
    blurb: 'Ett decennium mellan möglet på skålen och läkemedlet i ampullen.',
  },
  genes: {
    label: 'Gener',
    cta: 'Läs instruktionerna skrivna med fyra bokstäver',
    blurb: 'Instruktioner skrivna med fyra bokstäver, som hoppar, viks och muteras.',
  },
  'women-rights': {
    label: 'Kvinnors rättigheter',
    cta: 'Möt kvinnorna som stängdes ute från rummen de förändrade',
    blurb: 'Rösträtt, settlementhus, skolgång — och pristagarna som hölls borta från laboratorierna.',
  },
  'arms-defense': {
    label: 'Vapen och försvar',
    cta: 'Hör nedrustningens argument från dem som byggde vapnen',
    blurb: 'Nedrustningsavtal skrivna av människor som varit med och byggt vapnen.',
  },
  'economic-history': {
    label: 'Ekonomisk historia',
    cta: 'Återvänd till krascherna som modellerna aldrig såg komma',
    blurb: 'Uppgångar, krascher och modellerna som inte såg dem komma.',
  },
  conscience: {
    label: 'Samvete',
    cta: 'Möt forskarna som vände sig mot sitt eget verk',
    blurb: 'Forskare som drev kampanj mot sina egna skapelser.',
  },
  exile: {
    label: 'Exil',
    cta: 'Följ arbetet som fortsatte någon annanstans',
    blurb: 'Indragna pass, övergivna laboratorier, arbete som fortsatte någon annanstans.',
  },
  outsiders: {
    label: 'Utanförskap',
    cta: 'Möt amatörerna och assistenterna som förändrade fältet',
    blurb: 'Amatörer, kontorister, invandrare och oavlönade assistenter som förändrade fältet de stängdes ute från.',
  },
  instruments: {
    label: 'Instrument',
    cta: 'Upptäck maskinerna som måste finnas före seendet',
    blurb: 'Man kan inte se en sak förrän någon byggt det som ser den.',
  },
  scale: {
    label: 'Skala',
    cta: 'Färdas från kvarken till galaxen i ett steg',
    blurb: 'Från kvarkar till galaxer — svindeln inför mycket små och mycket stora tal.',
  },
  storytelling: {
    label: 'Berättande',
    cta: 'Ta reda på vems liv som blev en historia värd att berätta',
    blurb: 'Litteraturpristagare som skrev om vems liv som räknas som en berättelse.',
  },
  memory: {
    label: 'Minne',
    cta: 'Jämför vad en nervcell bevarar med vad ett land glömmer',
    blurb: 'Vad en nervcell bevarar; vad ett land kommer överens om att glömma.',
  },
  language: {
    label: 'Språk',
    cta: 'Betänk språken som ett pris aldrig har läst',
    blurb: 'Priser givna för meningar — och för de språk ett pris aldrig läser.',
  },
  doubt: {
    label: 'Tvivel',
    cta: 'Ta ovissheten som arbetsmetod',
    blurb: 'Den produktiva sorten: ovisshet som arbetsmetod snarare än som misslyckande.',
  },
  patience: {
    label: 'Tålamod',
    cta: 'Vänta i fyrtio år på att ett fynd ska tros på',
    blurb: 'Fyrtio år mellan ett fynd och dess erkännande. McClintock väntade.',
  },
  hunger: {
    label: 'Hunger',
    cta: 'Väg bröd ur luft mot svälten det aldrig hejdade',
    blurb: 'Kväve ur luft; dvärgvete; konvojer med nödhjälp. Och svälten de inte hejdade.',
  },
  commons: {
    label: 'Allmänningar',
    cta: 'Se vem som kan anförtros det alla äger',
    blurb: 'Delade fisken, skogar och atmosfärer, och vem som anförtros att förvalta dem.',
  },
  'climate-t': {
    label: 'Klimat',
    cta: 'Se ett sekel av mätningar bli en politik',
    blurb: 'Ett sekel av mätningar innan kurvan blev en politik.',
  },
  peacebuilding: {
    label: 'Fredsarbete',
    cta: 'Delta i det långsamma arbetet utan tydligt slut',
    blurb: 'Settlementhus, förhandlingsbord, flyktingorgan — långsamt arbete utan tydligt slut.',
  },
  'microorganisms-t': {
    label: 'Mikroorganismer och sjukdomar',
    cta: 'Se sjukdom förvandlas från öde till orsak och verkan',
    blurb: 'Bakterieteorin som gjorde sjukdom till orsak och verkan i stället för öde.',
  },
  code: {
    label: 'Kod',
    cta: 'Följ naturen från något skrivet till något redigerat',
    blurb: 'Naturen som något skrivet — och till slut något redigerbart.',
  },
  truth: {
    label: 'Sanning',
    cta: 'Stå med reportrarna som vägrade den officiella versionen',
    blurb: 'Journalister och dissidenter belönade för att ha vägrat en officiell version.',
  },
  consciousness: {
    label: 'Medvetande',
    cta: 'Studera det enda föremål som själv står för studien',
    blurb: 'Det svåraste studieobjektet är det som utför studien.',
  },
  translation: {
    label: 'Översättning',
    cta: 'Följ ett pris avgjort på svenska fram till sin läsare',
    blurb: 'Hur ett pris som avgörs på svenska når en läsare på vilket annat språk som helst.',
  },
  inequality: {
    label: 'Ojämlikhet',
    cta: 'Fråga vem som räknas, vårdas och belönas',
    blurb: 'Vem som får pris, vem som får vård, och vem som räknas i statistiken.',
  },
  'invisible-hands': {
    label: 'Osynliga händer',
    cta: 'Ge det arbete som ryms i varje referens dess erkännande',
    blurb: 'Tekniker, makar, studenter och räknebiträden — det oomnämnda arbetet inuti varje referens.',
  },
}

const laureates = {
  curie: {
    blurb: 'Radioaktivitet, sedan radium och polonium — den enda som belönats i två skilda naturvetenskaper.',
    narrative: [
      'Hon renade ton av beckblände för hand, i ett skjul som Sorbonne slutat använda, för att få fram ett decigram radiumklorid. Fysikpriset 1903 skulle från början bara nämna Becquerel och Pierre; Pierre gjorde klart att han inte tog emot det på de villkoren.',
      'Kemipriset 1911 kom ensamt, mitt under en presskampanj om hennes privatliv som Akademien antydde att hon borde hålla sig borta från Stockholm för att undvika. Hon åkte. Hennes anteckningsböcker är fortfarande radioaktiva och läses mot undertecknad ansvarsfriskrivning.',
    ],
  },
  einstein: {
    blurb: 'Belönad inte för relativitetsteorin utan för den fotoelektriska effekten — uppsatsen som öppnade kvantfysiken.',
    narrative: [
      'Priset gavs för den fotoelektriska effekten, inte för relativitetsteorin — kommittén ville ha ett resultat som mätts upp snarare än en teori som bara bekräftats. Uppsatsen den belönade är den som öppnade kvantfysiken.',
      'Han skrev den 1905 som patentgranskare i Bern, under ett år som också gav den speciella relativitetsteorin och ekvivalensen mellan massa och energi. Han var tjugosex år och stod helt utanför den akademiska världen.',
    ],
  },
  rontgen: {
    blurb: 'En skärm som lyste tvärs över ett mörklagt rum; det första fysikpriset, och den första röntgenbilden.',
    narrative: [
      'Han arbetade med ett övertäckt urladdningsrör i ett mörkt rum när en skärm på andra sidan bänken började lysa. Inom några veckor hade han fotograferat benen i sin hustrus hand, och hon lär ha sagt att hon sett sin egen död.',
      'Han vägrade patentera upptäckten, tog inga pengar för den och skänkte prissumman till sitt universitet. Sjukhusen hade fungerande röntgenutrustning inom ett år.',
    ],
  },
  becquerel: {
    blurb: 'Mulet väder, en byrålåda och uransalter som slöjade en plåt helt utan solljus.',
    narrative: [
      'Han väntade sig att uransalter skulle fosforescera efter solljus och slöja en fotografisk plåt. Paris var mulet, så han lade hela uppställningen i en byrålåda och väntade.',
      'Plåten var slöjad ändå, kraftigt, utan att något solljus varit inblandat. Det han funnit var inte ett svar på ljus utan en egenskap hos grundämnet självt — och början på det fält som paret Curie skulle namnge.',
    ],
  },
  fleming: {
    blurb: 'En odiskad odlingsskål, en sommarsemester och en ring av döda bakterier runt ett mögel.',
    narrative: [
      'Han kom tillbaka från en sommarsemester 1928 till en trave stafylokockskålar som han lämnat vid ett fönster. En hade koloniserats av ett mögel, och runt möglet fanns en klar ring där bakterierna dött.',
      'Han publicerade, och mycket lite hände under tio år. Hans egen nobelföreläsning 1945 innehöll en träffsäker varning om resistens, inklusive mekanismen och den troliga tidsskalan.',
    ],
  },
  koch: {
    blurb: 'Postulat som gjorde smitta bevisbar: denna organism, denna sjukdom, varje gång.',
    narrative: [
      'Han arbetade fram de postulat som gjorde smitta bevisbar: isolera organismen från en sjuk värd, odla den, återinför den, återfinn samma organism i det nya fallet.',
      'Det låter som en procedur. Det förvandlade sjukdom från en fråga om konstitution och dålig luft till en kedja av orsak och verkan som gick att bryta — vilket är det mesta av modern folkhälsa.',
    ],
  },
  mccli: {
    blurb: 'Hoppande gener i majs, beskrivna 1948 och trodda på ungefär trettio år senare.',
    narrative: [
      'Hon beskrev genetiska element som flyttade sig inom majsens arvsmassa 1948, till stor del ensam i arbetet. Fältet fann påståendet osannolikt och slutade i huvudsak att befatta sig med det.',
      'Hon belönades 1983, trettiofem år senare, som ensam mottagare — den enda kvinna som fått ett odelat pris i fysiologi eller medicin. Hon sade att hon helt enkelt hade fortsatt, och att intervallet varit användbart.',
    ],
  },
  crick: {
    blurb: 'Dubbelspiralen — byggd på Franklins diffraktionsbilder, som priset inte nämnde.',
    narrative: [
      'Strukturen sattes samman av andras data lika mycket som av modellbygge: Chargaffs kvoter, Franklins diffraktionsbilder, Wilkins tillgång till dem.',
      'Fotografi 51 visades för Watson utan Franklins vetskap. Hon dog 1958 och priset delades ut 1962, vilket gjort att frågan om vad hon skulle ha fått förblivit öppen.',
    ],
  },
  banting: {
    blurb: 'Insulin isolerat i ett lånat sommarlaboratorium; patentet sålt för en dollar.',
    narrative: [
      'Arbetet gjordes under en sommar i Toronto, i ett laboratorium som lånats ut medan ägaren var bortrest, tillsammans med en medicinstudent, Charles Best, utsedd genom slantsingling.',
      'Den första patienten var fjorton år och nära döden; han levde i tretton år till. Patentet såldes till universitetet för en dollar med motiveringen att insulin inte kunde tillhöra någon.',
    ],
  },
  addams: {
    blurb: 'Hull House, och en pacifism som gjorde henne till Amerikas mest beundrade och sedan mest misstänkta kvinna.',
    narrative: [
      'Hull House i Chicago erbjöd kurser, barnomsorg, arbetsförmedling och ett folkkök till ett kvarter av nyanlända. Det var också, avsiktligt, en plats där de som drev det själva bodde.',
      'Hennes motstånd mot första världskriget förde henne från Amerikas mest beundrade kvinna till en person under federal övervakning. Priset kom 1931, när hon var för sjuk för att resa till Stockholm.',
    ],
  },
  balch: {
    blurb: 'Avskedad från sin professur för att ha motsatt sig första världskriget; belönad trettio år senare.',
    narrative: [
      'Hon förlorade sin professur vid Wellesley 1918 för att ha motsatt sig kriget, ett avsked som lärosätet inte omprövade under hennes livstid.',
      'Hon ägnade de följande decennierna åt internationalismens maskineri — Nationernas förbund, flyktingmottagande, nedrustningskonferenser — och belönades 1946, vid sjuttionio års ålder.',
    ],
  },
  sakharov: {
    blurb: 'Konstruerade den sovjetiska vätebomben och ägnade sedan sitt liv åt att kämpa mot den.',
    narrative: [
      'Han var huvudkonstruktör för den sovjetiska vätebomben och under en period en av unionens mest privilegierade forskare.',
      'Sedan ägnade han tjugo år åt att motarbeta det program han byggt upp, fråntogs sina utmärkelser och förvisades internt till Gorkij. Hans hustru tog emot priset i Stockholm; han nekades pass.',
    ],
  },
  'suu-kyi': {
    blurb: 'Belönad i husarrest — och en påminnelse om att ett pris ges i ett ögonblick, inte för all framtid.',
    narrative: [
      'Hon belönades 1991 medan hon satt i husarrest i Rangoon, och hennes söner tog emot priset i hennes ställe. Sin nobelföreläsning höll hon tjugoett år senare.',
      'Hennes senare roll i regeringen, och hennes försvar av staten mot anklagelser om folkmord i Haag, gör henne till prisets tydligaste fall av en utmärkelse given i ett ögonblick snarare än för all framtid.',
    ],
  },
  yousafzai: {
    blurb: 'Sjutton år gammal: den yngsta pristagaren i någon kategori.',
    narrative: [
      'Hon sköts på en skolbuss i Swatdalen 2012 för att offentligt ha drivit frågan om flickors skolgång, efter att ha skrivit för BBC under pseudonym sedan elva års ålder.',
      'Hon belönades två år senare vid sjutton års ålder, den yngsta pristagaren i någon kategori, och delade priset med Kailash Satyarthi — en indier och en pakistanier, en hindu och en muslim, vilket inte var en slump från kommitténs sida.',
    ],
  },
  morrison: {
    blurb: 'Romaner som satte det svarta Amerikas inre liv i centrum av den amerikanska berättelsen.',
    narrative: [
      'Hon arbetade som förläggare på Random House i nära tjugo år och gav ut en hel generation svarta författare, och skrev sina första romaner i timmarna runt det arbetet och två barn.',
      'Motiveringen 1993 talade om romaner med visionär kraft och poetisk skärpa som ger liv åt en väsentlig sida av den amerikanska verkligheten. Hon var den första svarta kvinnan som fick litteraturpriset.',
    ],
  },
  marquez: {
    blurb: 'En kontinents historia berättad som om det omöjliga bara vore lokalt väder.',
    narrative: [
      'Han skrev Hundra år av ensamhet på arton månader, pantsatte husgeråd för att kunna fortsätta, och skickade manuset till förlaget i två halvor eftersom han inte hade råd med portot på en gång.',
      'I sin nobelföreläsning hävdade han att Latinamerikas historia helt enkelt sprungit ifrån den realism som fanns att beskriva den med, och att etiketten på hans verk var mindre uppfinning än reportage.',
    ],
  },
  brodsky: {
    blurb: 'Åtalad för "socialt snyltande", landsförvisad, och belönad för dikter skrivna på två språk.',
    narrative: [
      'Han ställdes inför rätta i Leningrad 1964 för "socialt snyltande". På domarens fråga om vem som gett honom tillstånd att vara poet svarade han att han antog att det kom från Gud.',
      'Han utvisades 1972, skrev därefter på både ryska och engelska och översatte sig själv med synbar motvilja. Han belönades 1987 och blev fyra år senare USA:s poet laureate.',
    ],
  },
  libby: {
    blurb: 'Radiokoldatering — en klocka gömd i allt som en gång levt.',
    narrative: [
      'Levande ting tar upp kol-14 ur atmosfären så länge de lever och slutar vid döden, varefter isotopen sönderfaller i känd takt. Följden är en klocka inuti varje organiskt prov.',
      'Det gav arkeologi och geologi ett gemensamt tal för första gången, och rubbade omedelbart flera kronologier som man tvistat om i ett sekel.',
    ],
  },
  fermi: {
    blurb: 'Hämtade priset i Stockholm och återvände aldrig hem; den första reaktorn följde fyra år senare.',
    narrative: [
      'Han reste till Stockholm 1938 för att ta emot priset och fortsatte till New York i stället för att återvända till Italien, där raslagarna gjort hans hustrus ställning ohållbar.',
      'Fyra år senare byggde han den första självunderhållande kärnreaktorn under läktarna till en nedlagd squashbana i Chicago, och rapporterade resultatet per telefon i kod.',
    ],
  },
  bragg: {
    blurb: 'Tjugofem år gammal, delade priset med sin far, för att ha läst kristaller med röntgenstrålar.',
    narrative: [
      'Han var tjugofem och delade 1915 års pris med sin far för att ha visat att röntgendiffraktion kunde läsas baklänges till en kristalls atomära struktur.',
      'Han är fortfarande den yngste naturvetenskaplige pristagaren. Senare ledde han Cavendish, där dubbelspiralen byggdes — en kontinuitet som prislistan sällan fångar.',
    ],
  },
  pavlov: {
    blurb: 'Matsmältning, belönad — och betingning, det arbete alla faktiskt minns.',
    narrative: [
      'Priset 1904 gavs för matsmältningens fysiologi, ett arbete med kirurgiskt inlagda fistlar som lät honom mäta utsöndring hos ett vaket djur.',
      'De betingningsförsök alla minns kom ur en artefakt i det arbetet: hundarna började utsöndra innan maten kom, som svar på vad som än tillförlitligt föregick den.',
    ],
  },
  kandel: {
    blurb: 'Spårade minnet till förstärkningen av enskilda synapser, i en havssnigel.',
    narrative: [
      'Han valde Aplysia, en havssnigel med några tusen ovanligt stora nervceller, just för att den var enkel nog att följa en hel krets i.',
      'Fyndet var att inlärning förändrar styrkan i bestämda synapser — minnet som en fysisk förändring på en identifierbar plats. Han hade själv lämnat Wien som barn 1939.',
    ],
  },
  doudna: {
    blurb: 'CRISPR–Cas9: ett bakteriellt immunförsvar förvandlat till ett redigeringsverktyg.',
    narrative: [
      'CRISPR fanns i bakteriers immunförsvar: ett sätt för en cell att lagra fragment av tidigare infektioner och klippa matchande sekvenser på plats.',
      'Hon och Charpentier visade att systemet kunde programmeras att klippa vilken vald sekvens som helst. Priset 2020 var det första naturvetenskapliga som gavs till två kvinnor ensamma.',
    ],
  },
  katalin: {
    blurb: 'Degraderad och utan anslag i decennier för mRNA; grunden för ett vaccin som getts miljarder gånger.',
    narrative: [
      'Hon degraderades i Pennsylvania 1995 snarare än avskedades, och fortsatte med mRNA på sänkt lön eftersom ansökningarna om anslag fortsatte att avslås.',
      'Den modifiering hon och Drew Weissman fann — att byta in en modifierad nukleosid så att immunförsvaret tolererar budskapet — är skälet till att vaccinerna 2020 fungerade alls.',
    ],
  },
  borlaug: {
    blurb: 'Halvdvärgvete och den gröna revolutionen — tillskriven en miljard liv, och en skuld i jord.',
    narrative: [
      'Han förädlade fram halvdvärgvete som lade sin energi på kärnan i stället för på strået och tålde kraftig gödsling utan att lägga sig. Skördarna i Mexiko, och sedan i Indien och Pakistan, ungefär fördubblades.',
      'Han tillskrivs ha avvärjt svält i en omfattning som brukar skrivas som en miljard liv, och kritiseras för en jordbruksmodell som sedan dess tärt på jord och grundvatten.',
    ],
  },
  ostrom: {
    blurb: 'Visade att samhällen förvaltar gemensamma resurser väl, mot en teori som sade att de inte kunde.',
    narrative: [
      'Den gängse teorin sade att delade resurser oundvikligen förstörs om de inte privatiseras eller övervakas. Hon åkte ut och kartlade platser där så inte skett.',
      'Nepalesiska bevattningssystem, hummerfiske i Maine, alpbeten i Schweiz: samhällen med egna regler, egen kontroll och egna sanktioner, i funktion i århundraden. Hon var den första kvinnan som belönades i ekonomisk vetenskap.',
    ],
  },
  feynman: {
    blurb: 'Kvantelektrodynamik, ritad som bilder — och en livslång vägran att vara högtidlig om den.',
    narrative: [
      'Han ritade kvantelektrodynamiken som diagram därför att han fann algebran outhärdlig. Diagrammen blev partikelfysikens standardnotation.',
      'Han beskrev priset som ett besvär och var nära att tacka nej. Senare satt han i Challengerkommissionen och demonstrerade O-ringens brister med ett glas isvatten i direktsändning.',
    ],
  },
  geim: {
    blurb: 'Grafen lyft från grafit med tejp. Den ende som håller både ett Nobelpris och ett Ig Nobel.',
    narrative: [
      'Grafen lyftes av ett block grafit med vanlig tejp, under en fredagskväll som hans laboratorium avsatte för experiment utan försvarbart syfte.',
      'Han hade tidigare fått en levande groda att sväva i ett magnetfält, vilket gav honom ett Ig Nobel. Han är den ende som håller båda.',
    ],
  },
  dirac: {
    blurb: 'Förutsade antimateria enbart ur en ekvation, och talade lika sparsamt som han skrev.',
    narrative: [
      'Ekvationen han skrev 1928 hade lösningar med negativ energi. I stället för att förkasta dem föreslog han att de beskrev en partikel identisk med elektronen men med motsatt laddning.',
      'Positronen upptäcktes fyra år senare. Han var ökänt sparsam i samtal och ville först tacka nej till priset med motiveringen att uppmärksamheten vore värre än äran.',
    ],
  },
  loewi: {
    blurb: 'Drömde grodhjärteexperimentet två gånger; andra gången gick han till laboratoriet klockan tre.',
    narrative: [
      'Han drömde upplägget till det avgörande experimentet, vaknade, skrev ner det och fann anteckningen oläslig på morgonen. Nästa natt återkom drömmen och han gick till laboratoriet klockan tre.',
      'Vätska från ett stimulerat grodhjärta bromsade ett andra, ostimulerat hjärta. Nerver signalerade kemiskt, inte elektriskt — ett resultat som tog några timmar att få fram efter sjutton år av att inte veta hur det skulle prövas.',
    ],
  },
  lorenz: {
    blurb: 'Grundade etologin genom att se gäss bestämma sig för att han var deras mor.',
    narrative: [
      'Nykläckta grågäss fäste sig vid det första rörliga de mötte, vilket i hans fall var Lorenz själv. Sedan hade han gäss resten av säsongen.',
      'Prägling visade att komplext beteende kan ha ett fast utvecklingsfönster. Hans medlemskap i nazistpartiet, och de texter han skrev under det, hör till bilden.',
    ],
  },
  thomson: {
    blurb: 'Upptäckte elektronen; sju av hans assistenter fick sedan egna pris.',
    narrative: [
      'Han visade att katodstrålar var partiklar långt lättare än någon atom — den första subatomära beståndsdelen, vid en tidpunkt då atomen fortfarande antogs vara odelbar.',
      'Sju av hans forskningsassistenter fick sedan egna pris, liksom hans son, för att ha visat att elektronen också uppträder som en våg.',
    ],
  },
  axel: {
    blurb: 'Kartlade luktreceptorgenerna — ungefär tre procent av arvsmassan ägnad åt lukt.',
    narrative: [
      'Han och Linda Buck fann en familj av omkring tusen gener som kodar för luktreceptorer — ungefär tre procent av arvsmassan ägnad enbart åt lukt.',
      'Varje receptorcell uttrycker en receptortyp och rapporterar till en plats i luktbulben, vilket är hur några hundra fungerande receptorer skiljer tiotusentals dofter åt.',
    ],
  },
  chain: {
    blurb: 'Kemisten som förvandlade Flemings iakttagelse till ett renat, användbart läkemedel.',
    narrative: [
      'Han läste Flemings uppsats från 1929 i Oxford ett decennium efter publiceringen och tyckte att kemin var värd ett försök. Med Florey renade han fram tillräckligt med penicillin för att pröva på möss, sedan på en polis.',
      'Förrådet tog slut och patienten dog. Tillverkningen flyttades till USA, och 1944 fanns tillräckligt för landstigningen i Normandie.',
    ],
  },
  pauling: {
    blurb: 'Kemi 1954, fred 1962 — den ende med två odelade Nobelpris.',
    narrative: [
      'Kemipriset 1954 gavs för den kemiska bindningens natur, ett arbete som ligger under det mesta av strukturkemin och en god del av molekylärbiologin.',
      'Fredspriset 1962 gavs för kampanjen mot atmosfäriska kärnvapenprov. Han är den ende som håller två odelade Nobelpris, och däremellan hade hans pass dragits in.',
    ],
  },
  friedman: {
    blurb: 'Läste om depressionen som ett penningpolitiskt misslyckande och formade centralbanksväsendet i fyrtio år.',
    narrative: [
      'Han och Anna Schwartz läste om depressionen som en penningmängdskontraktion som Federal Reserve kunnat förhindra och i stället fördjupade.',
      'Argumentet organiserade om centralbanksväsendet i fyra decennier och är fortfarande standardreferensen i varje efterföljande kris, också för dem som avvisar det.',
    ],
  },
  ruska: {
    blurb: 'Byggde elektronmikroskopet 1931; belönad femtiofem år senare, vid åttio.',
    narrative: [
      'Elektroner har långt kortare våglängd än synligt ljus, så en lins som fokuserar dem kan upplösa långt mindre ting. Han byggde det första sådana mikroskopet 1931, tjugofyra år gammal.',
      'Vid 1933 överträffade det varje optiskt instrument. Han belönades 1986, femtiofem år senare, vid åttio — ett av de längsta intervallen i prisets historia.',
    ],
  },
  betzig: {
    blurb: 'Bröt diffraktionsgränsen — ljusmikroskop som upplöser enskilda molekyler.',
    narrative: [
      'Diffraktionsgränsen antogs vara ett hårt tak: inget optiskt mikroskop kunde upplösa något mycket finare än halva ljusets våglängd.',
      'Vägen runt var att tända enskilda molekyler några i taget, bestämma varje position exakt och bygga bilden av tusentals rutor. Han tänkte ut mycket av det medan han stod helt utanför den akademiska världen.',
    ],
  },
  penrose: {
    blurb: 'Bevisade att svarta hål är en förutsägelse ur den allmänna relativitetsteorin, inte en exotisk olyckshändelse.',
    narrative: [
      'Han visade 1965, med topologi snarare än något särskilt symmetriantagande, att en kollapsande stjärna måste bilda en singularitet — svarta hål var en förutsägelse ur den allmänna relativitetsteorin, inte ett exotiskt specialfall.',
      'Han belönades femtiofem år senare, samma år som de första direkta mätningarna av objektet i vår egen galax mitt.',
    ],
  },
  ernaux: {
    blurb: 'Självbiografi utan tröst: klass, minne och den kvinnliga kroppen som dokumentärt underlag.',
    narrative: [
      'Hon skriver sitt eget liv som dokumentärt underlag: en klassbakgrund, en olaglig abort, en mors demens, nedtecknade utan tröst i form av en handling.',
      'Motiveringen 2022 nämnde metodens mod och kliniska skärpa. Hon har beskrivit sin position som etnolog över sig själv.',
    ],
  },
  heisenberg: {
    blurb: 'Ovisshet som en naturlag — och ett krig tillbringat med att leda det tyska kärnvapenprogrammet.',
    narrative: [
      'Ovissheten var inte en brist hos apparaturen utan en egenskap hos världen: position och rörelsemängd kunde inte samtidigt ha bestämda värden.',
      'Han ledde det tyska kärnvapenprogrammet genom kriget, och vad han i själva verket försökte åstadkomma där har diskuterats sedan dess — bland annat utifrån ett inspelat samtal på Farm Hall natten då Hiroshima tillkännagavs.',
    ],
  },
  haber: {
    blurb: 'Bröd ur luft, och klorgas vid Ypres. Det mest omstridda pris som någonsin delats ut.',
    narrative: [
      'Att binda luftens kväve till ammoniak gjorde konstgödsel möjligt och beräknas försörja omkring hälften av världens befolkning.',
      'Han ledde också den första storskaliga klorgasattacken vid Ypres 1915 och var själv på plats vid fronten. Hans pris 1918 är fortfarande det mest omstridda Akademien delat ut.',
    ],
  },
  wfp: {
    blurb: 'Belönat för att behandla hunger som ett krigsvapen som går att avväpna.',
    narrative: [
      'Priset 2020 gick till ett organ som flyttar mat in i områden där själva livsmedelsförsörjningen gjorts till ett vapen.',
      'Motiveringen var uttrycklig: hunger som avsiktligt krigsredskap är en fredspolitisk fråga, och därmed något som går att förhandla bort snarare än bara lindra.',
    ],
  },
  manabe: {
    blurb: 'Modellerade koldioxid mot global temperatur 1967; projektionen har hållit.',
    narrative: [
      'Hans modell från 1967 kopplade strålning till luftens vertikala rörelser och gav ett tal för hur mycket ytan värms när koldioxidhalten fördubblas.',
      'Projektionen har hållit i mer än femtio år mot allt som mätts sedan dess, vilket är ovanligt att kunna säga om en klimatmodell eller någon annan modell.',
    ],
  },
  gore: {
    blurb: 'Ett delat pris för att ha förvandlat samlade klimatdata till offentligt argument.',
    narrative: [
      'Priset 2007 delades mellan IPCC och en tidigare vicepresident, för arbete av mycket olika slag: utvärderingsrapporter å ena sidan, offentligt argument å den andra.',
      'Kommitténs resonemang var att vetenskapen varit avgjord en tid och att det som saknades var politisk uppmärksamhet — en bedömning lika mycket av prisets egen funktion som av klimatet.',
    ],
  },
  ross: {
    blurb: 'Fann malariaparasiten i en myggas mage och skrev en dikt om det samma kväll.',
    narrative: [
      'Han dissekerade myggor som sugit blod från malariapatienter tills han fann parasiten i magsäcksväggen på en av dem, den 20 augusti 1897.',
      'Han skrev en dikt samma kväll om att Gud lagt den mördande döden i hans hand. En stor del av hans senare karriär gick åt till prioritetstvister med den italienska skolan som arbetade med samma problem.',
    ],
  },
  ressa: {
    blurb: 'Rapportering under en skur av arresteringsorder; den första filippinska pristagaren.',
    narrative: [
      'Hon var med och grundade Rappler och rapporterade om dödandet under det filippinska drogkriget, och samlade på sig arresteringsorder och åtal i en takt som gjorde själva den fortsatta publiceringen till nyheten.',
      'Priset 2021 delades med Dmitrij Muratov på Novaja Gazeta — det första till journalister sedan 1935, då mottagaren satt i ett tyskt läger.',
    ],
  },
  sherrington: {
    blurb: 'Gav synapsen dess namn och beskrev nervsystemet som en "förtrollad vävstol".',
    narrative: [
      'Han gav synapsen dess namn, visade att reflexbågen är en integrerande mekanism snarare än ett enkelt relä, och kartlade den ömsesidiga hämning som låter en muskel slappna av när dess motpart drar ihop sig.',
      'Han beskrev också den vakna hjärnan som "en förtrollad vävstol där miljoner blixtrande skyttlar väver ett mönster som ständigt löses upp", en bild som överlevt det mesta av fysiologin omkring den.',
    ],
  },
  shirakawa: {
    blurb: 'En katalysator tillsatt i tusen gånger avsedd koncentration gav en plast som leder ström.',
    narrative: [
      'En besökande forskare fick ett standardrecept för polyacetylen och tillsatte katalysatorn i ungefär tusen gånger avsedd koncentration.',
      'I stället för svart pulver bildades en silverblank film. Shirakawa kastade den inte utan karaktäriserade den, och tio år senare visade han tillsammans med MacDiarmid och Heeger att den kunde ledas att bära ström som en metall.',
    ],
  },
  penzias: {
    blurb: 'Ägnade ett år åt att försöka få bort ett brus i en antenn som visade sig vara det tidiga universums efterglöd.',
    narrative: [
      'Han och Robert Wilson hade en tjugofots hornantenn i Holmdel och behövde fastställa dess brusnivå innan de kunde göra astronomi. Bruset var omkring hundra gånger starkare än det borde ha varit.',
      'De uteslöt New York, kärnvapenprov och lösa fogar, och skrubbade bort en duvbon som antecknades som "ett vitt dielektriskt material". Bruset satt kvar. Det var det tidiga universums efterglöd.',
    ],
  },
}

const milestones = {
  radioactivity: {
    title: 'Radioaktivitet',
    blurb: 'Becquerels slöjade plåt öppnar ett fält som Marie och Pierre Curie ska namnge.',
    narrative: [
      'Becquerel väntade sig att solljus var inblandat. Paris var mulet, apparaturen hamnade i en byrålåda, och plåten var slöjad ändå — uranet gjorde det på egen hand.',
      'Marie och Pierre Curie tog fenomenet, gav det ett namn och ägnade fyra år åt att utvinna de två nya grundämnen som låg bakom. Fältet det öppnade leder rakt fram till 1945.',
    ],
  },
  microorganisms: {
    title: 'Mikroorganismer och sjukdomar',
    blurb: 'Bakterieteorin organiserar om medicinen: sanitet, sterilisering och de första riktade behandlingarna.',
    narrative: [
      'Inom en generation upphörde sjukdom att vara en fråga om konstitution och dålig luft och blev en kedja av orsak och verkan med en organism i ena änden.',
      'Sanitet, sterilisering, antiseptik och de första riktade behandlingarna följde. Det är den enskilt största förändringen av medellivslängden som finns dokumenterad, och det mesta av den skedde innan antibiotika fanns.',
    ],
  },
  'modern-physics': {
    title: 'Modern fysik',
    blurb: 'Kvanta, relativitet och atomen: den klassiska bilden faller sönder på tjugo år.',
    narrative: [
      'Mellan ungefär 1900 och 1927 föll den klassiska bilden sönder: energi kom i paket, rum och tid visade sig bero på observatören, och atomen fick ett inre.',
      'Nästan varje steg belönades i Stockholm inom ett par decennier, vilket är ovanligt snabbt, och nästan vart och ett motsattes först av någon som varit med och åstadkommit det.',
    ],
  },
  fertilizers: {
    title: 'Konstgödsel',
    blurb: 'Kväve hämtat ur luften föder halva planeten — och levererar sprängämnena i två krig.',
    narrative: [
      'Ammoniak syntetiserad ur luftens kväve tog bort det hårda tak som jordbruket arbetat under sedan det uppstod.',
      'Samma anläggningar levererade sprängämnena i två världskrig, och avrinningen från ett sekels användning är i dag ett problem i varje större flodsystem.',
    ],
  },
  'world-war-i': {
    title: 'Första världskriget',
    blurb: 'Gas, industriella förluster och ett pris som ställdes in i flera kategorier.',
    narrative: [
      'Industriella förluster, gas vid Ypres, och ett pris som ställdes in i flera kategorier i brist på något att dela ut det till.',
      'Fredspriset gick under perioden i huvudsak till hjälporganisationer. Två blivande pristagare, Addams och Balch, tillbringade kriget med att avskedas och övervakas för att ha hävdat att det borde upphöra.',
    ],
  },
  insulin: {
    title: 'Insulin',
    blurb: 'En dödlig diagnos blir ett hanterbart tillstånd på arton månader.',
    narrative: [
      'En diagnos som dödade barn inom månader blev ett tillstånd som gick att leva med, på ungefär arton månader.',
      'Den första patienten som behandlades i januari 1922 var fjorton år och nedgången till knappt trettio kilo. Patentet gick till universitetet i Toronto för en dollar.',
    ],
  },
  antibiotics: {
    title: 'Antibiotika',
    blurb: 'Penicillin iakttaget; sedan ett decennium av kemi innan en enda patient behandlas.',
    narrative: [
      'Fleming iakttog effekten 1928 och publicerade utan större gensvar. Decenniet som följde var kemi: rening, stabilisering och till slut tillverkning i skala.',
      'Den första patienten som behandlades 1941 förbättrades och dog sedan när förrådet tog slut. Tillverkningen måste flyttas till USA innan den kunde nå ett krig.',
    ],
  },
  depression: {
    title: 'Den ekonomiska depressionen',
    blurb: 'Kraschen som gjorde makroekonomi till något regeringar tvingades lyssna på.',
    narrative: [
      'Kraschen gjorde makroekonomi till något regeringar var tvungna att ha en hållning i, och gav ämnet dess bestående testfall.',
      'Varje senare konjunkturteori har måst förklara 1929 först. Friedmans penningpolitiska läsning fyrtio år senare organiserade om centralbanksväsendet kring svaret.',
    ],
  },
  nazism: {
    title: 'Nazism och upprustning',
    blurb: 'Pristagare fråntas medborgarskap; tyska mottagare förbjuds att ta emot priset.',
    narrative: [
      'Tyska pristagare förbjöds genom dekret att ta emot priset efter 1936. Andra fråntogs sitt medborgarskap, avskedades från sina tjänster eller lämnade landet innan det hann ske.',
      'Vetenskapens tyngdpunkt flyttade från Centraleuropa till Storbritannien och USA inom ett decennium, och flyttade aldrig tillbaka.',
    ],
  },
  holocaust: {
    title: 'Förintelsen',
    blurb: 'Två pristagares guldmedaljer löstes upp i syra i Köpenhamn för att undanhållas riket.',
    narrative: [
      'Två pristagares guldmedaljer löstes upp i kungsvatten i Niels Bohrs laboratorium i Köpenhamn, så att ockupationsmakten bara skulle finna en burk vätska på en hylla.',
      'Guldet återvanns efter kriget och medaljerna göts om. Det mesta som perioden förstörde gick inte att återskapa.',
    ],
  },
  'atomic-age': {
    title: 'Atomåldern',
    blurb: 'Hiroshima och Nagasaki: fysiken får ett bestående moraliskt problem.',
    narrative: [
      'Hiroshima och Nagasaki gav fysiken ett bestående moraliskt problem, förvärvat på en vecka och sedan aldrig lagt ifrån sig.',
      'En betydande andel av de pristagare som byggt upp fältet ägnade resten av sina karriärer åt att motarbeta dess tillämpning.',
    ],
  },
  'human-rights': {
    title: 'FN och de mänskliga rättigheterna',
    blurb: 'En allmän förklaring, och ett fredspris som börjar belöna institutioner lika väl som individer.',
    narrative: [
      'Den allmänna förklaringen fastställde för första gången en lista över sådant en människa kan hävda gentemot sin egen regering.',
      'Från denna punkt gick fredspriset i allt högre grad till institutioner snarare än till individer, med resonemanget att arbetet överlever den som utför det.',
    ],
  },
  dna: {
    title: 'Dubbelspiralen',
    blurb: 'Strukturen antyder mekanismen: ärftlighet blir ett kemiskt problem.',
    narrative: [
      'Strukturen antydde mekanismen i samma ögonblick som den blev tydlig: en molekyl byggd av två komplementära strängar är en molekyl som går att kopiera.',
      'Modellen sattes samman i Cambridge av data insamlade i London, däribland en diffraktionsbild som erhållits utan sin upphovspersons vetskap.',
    ],
  },
  'carbon-14': {
    title: 'Kol-14-datering',
    blurb: 'Libbys klocka låter arkeologi och geologi enas om ett tal för första gången.',
    narrative: [
      'En klocka gömd i allt som en gång levt: kol-14 ansamlas under livet och sönderfaller i fast takt därefter.',
      'Arkeologi och geologi kunde plötsligt enas om ett tal. Flera kronologier som man tvistat om i ett sekel avgjordes, och ett par rubbades ordentligt.',
    ],
  },
  'nuclear-arms': {
    title: 'Kärnvapenkontroll',
    blurb: 'Provstoppsavtal, i hög grad drivna av de fysiker som byggt vapnen.',
    narrative: [
      'Det partiella provstoppsavtalet 1963 avslutade atmosfäriska prov, och drevs mest verkningsfullt av de fysiker som byggt laddningarna.',
      'Paulings kampanj, och mätningarna av strontium-90 i barns tänder som stödde den, gjorde mer för saken offentligt än någon diplomatisk kanal.',
    ],
  },
  'green-revolution': {
    title: 'Den gröna revolutionen',
    blurb: 'Högavkastande säd förvandlar asiatiskt jordbruk, och fredspriset går till en växtförädlare.',
    narrative: [
      'Halvdvärgvete som svarade på gödsling fördubblade ungefär skördarna i Mexiko, Indien och Pakistan på mindre än två decennier.',
      'Fredspriset gick till en växtförädlare, med resonemanget att svält är en förutsättning för konflikt. Kostnaderna i jord och vatten kom senare och räknas fortfarande.',
    ],
  },
  vaccines: {
    title: 'Smittkoppor utrotade',
    blurb: 'Den första sjukdom som avsiktligt avlägsnats från världen.',
    narrative: [
      'Smittkoppor förklarades utrotade 1980 — den första sjukdom som avsiktligt avlägsnats från världen, och hittills en av bara två.',
      'Kampanjen fungerade genom ringvaccinering snarare än allmän täckning: hitta varje fall, vaccinera alla omkring det, och låt smittkedjan slutas.',
    ],
  },
  cosmology: {
    title: 'Kosmisk bakgrundsstrålning',
    blurb: 'Efterglöden från big bang, kartlagd — kosmologin blir en mätande vetenskap.',
    narrative: [
      'Den kosmiska bakgrundsstrålningen är efterglöden från det tidiga universum, först hörd som ett oförklarat brus och senare kartlagd i detalj.',
      'Variationerna i den är fröna till varje galax. Kosmologin blev en mätande vetenskap i stället för en spekulativ på ungefär trettio år.',
    ],
  },
  genome: {
    title: 'Det mänskliga genomet',
    blurb: 'Tre miljarder bokstäver, publicerade — läsningen är klar, förståelsen inte.',
    narrative: [
      'Tre miljarder bokstäver, sekvenserade och publicerade, före tidplan och mitt under en kapplöpning mellan ett offentligt konsortium och ett privat företag.',
      'Läsningen var klar 2003. Antalet gener visade sig vara ungefär en femtedel av det förutsagda, vilket var den första antydan om hur mycket av arbetet som sker någon annanstans.',
    ],
  },
  climate: {
    title: 'Klimatkonsensus',
    blurb: 'Ett fredspris för klimatvetenskap: atmosfären omformulerad som ett delat ansvar.',
    narrative: [
      'Priset 2007 behandlade samlade mätningar som en fredspolitisk fråga, vilket antingen var ett kategorifel eller själva poängen.',
      'Vetenskapen hade varit stabil i några år. Det kommittén pekade ut som saknat var offentlig uppmärksamhet, och den delade ut priset därefter.',
    ],
  },
  crispr: {
    title: 'CRISPR',
    blurb: 'Precis genredigering anländer, och med den en debatt ingen hunnit avsluta.',
    narrative: [
      'En bakteriell försvarsmekanism — spara ett fragment av den senaste infektionen, klipp allt som matchar det — blev ett programmerbart verktyg för att redigera vilken vald sekvens som helst.',
      'Det var billigt och fungerade omedelbart, vilket är varför debatten om könscellsredigering kom flera år innan någon enats om hur den skulle föras.',
    ],
  },
  mrna: {
    title: 'mRNA-vacciner',
    blurb: 'Trettio år av avslagna ansökningar, utrullade globalt på elva månader.',
    narrative: [
      'Trettio år av avslagna anslagsansökningar, en degradering, och en ändring av en enda nukleosid som hindrade immunförsvaret från att förstöra budskapet vid ankomsten.',
      'Utrullat globalt inom elva månader från att sekvensen publicerats. Erkännandet följde 2023, då tekniken redan getts miljarder gånger.',
    ],
  },
}

const artifacts = {
  medal: {
    label: 'Medaljen',
    blurb: '175 gram guld, Nobel i profil. Två löstes upp i syra för att gömmas undan Gestapo.',
    narrative: [
      'En skiva om 175 gram av 18 karats återvunnet guld, Alfred Nobel i profil på framsidan och en formgivning särskild för varje utdelande institution på baksidan.',
      'Två löstes upp i syra i Köpenhamn 1940 för att hållas undan ockupationsmakten, och göts om ur det återvunna guldet efter kriget.',
    ],
  },
  will: {
    label: 'Nobels testamente',
    blurb: 'Fyra handskrivna sidor, bestridda av familjen och nära att upphävas — hela priset vilar på dem.',
    narrative: [
      'Fyra handskrivna sidor, undertecknade i Paris 1895, som testamenterade merparten av en vapenförmögenhet till pris åt dem som gjort mänskligheten störst nytta.',
      'Familjen bestred det, institutionerna som utsågs hade inte tillfrågats, och svenska staten var nära att ta pengarna i stället. Hela priset vilar på att dokumentet överlevde detta.',
    ],
  },
  plate: {
    label: 'Penicillinskålen',
    blurb: 'Flemings ursprungliga odlingsskål, bevarad och omfotograferad i ett sekel.',
    narrative: [
      'Den ursprungliga odlingsskålen från 1928, med mögelkolonin fortfarande synlig och den klara ringen omkring där stafylokockerna dött.',
      'Den fotograferades vid tillfället, bevarades och har omfotograferats i ett sekel. Vad den visar är ett ögonblick innan någon visste vad man skulle göra med det.',
    ],
  },
  notebook: {
    label: 'Curies anteckningsböcker',
    blurb: 'Fortfarande radioaktiva. Läsare undertecknar en ansvarsfriskrivning och bär handskar.',
    narrative: [
      'Marie Curies laboratorieanteckningar, fortfarande mätbart radioaktiva, förvarade i blyfodrade lådor på Frankrikes nationalbibliotek.',
      'Läsare undertecknar en ansvarsfriskrivning och bär skyddsutrustning. Halveringstiden för radium-226 är omkring sextonhundra år, så arrangemanget är i praktiken permanent.',
    ],
  },
  photo51: {
    label: 'Fotografi 51',
    blurb: 'Rosalind Franklins diffraktionsbild — visad för Watson och Crick utan hennes vetskap.',
    narrative: [
      'En röntgendiffraktionsbild av DNA:s B-form, tagen av Raymond Gosling under Rosalind Franklins ledning 1952. Korsmönstret visar en spiral; avstånden ger dess mått.',
      'Den visades för Watson utan hennes vetskap. Hon dog 1958, fyra år före priset, och frågan om vad hon skulle ha belönats med har stått öppen sedan dess.',
    ],
  },
  banquet: {
    label: 'Bankettmenyn',
    blurb: 'Stockholms stadshus, 10 december. Menyn hemlighålls fram till dagen själv.',
    narrative: [
      'Stockholms stadshus, den 10 december, trettonhundra gäster. Menyn väljs månader i förväg och hemlighålls fram till dagen själv.',
      'Efterrätten är alltid glass, buren i procession nedför trappan. Det är den enda delen av tillställningen som Akademien aldrig behövt försvara.',
    ],
  },
}

const stories = {
  helgoland: {
    title: 'Att se det osynliga',
    screens: [
      {
        heading: 'En trädlös ö',
        body: 'I juni 1925 var Werner Heisenberg tjugotre år och kunde inte sluta nysa. Hans hösnuva var så svår att handledaren gav honom två veckor ledigt, och han tog en båt till Helgoland — en klippa av röd sandsten i Nordsjön där nästan ingenting växer, och därför nästan inget pollen finns.',
      },
      {
        heading: 'Problemet han tog med sig',
        body: 'Fysiken hade en bild av atomen: en liten kärna med elektroner i banor omkring. Bilden gav rätt svar för väte och fel svar för allt annat. Värre: ingen hade någonsin sett en bana. Det var ett objekt uppfunnet för att få ett diagram att fungera.',
      },
      {
        heading: 'En regel åt sig själv',
        body: 'På ön fattade han ett beslut som låter procedurmässigt och var radikalt: han skulle bygga en teori enbart av storheter som faktiskt gick att mäta. Inte banor, inte positioner — frekvenserna och styrkan hos det ljus atomer sänder ut. Vad som än pågick därinne skulle han bara beskriva det som kom ut.',
      },
      {
        heading: 'Tre på natten',
        body: 'Räkningarna var långa och han gjorde ständigt fel. Vid tretiden gick talen ihop: energin bevarades, exakt. Han var för uppspelt för att sova. Han gick till öns sydspets, klättrade upp på en klippa över havet och väntade på soluppgången.',
      },
      {
        heading: 'Multiplikationen som inte lydde',
        body: 'En sak störde honom. I hans schema gav A gånger B ett annat svar än B gånger A. Han antog att det var ett fel. Tillbaka i Göttingen kände Max Born igen vad han tittade på: matriser. Heisenberg hade återuppfunnit en matematik han aldrig fått lära sig.',
      },
      {
        heading: 'Vad det kostade',
        body: 'Två år senare drog Heisenberg ut konsekvensen: position och rörelsemängd kan inte båda ha bestämda värden. Inte för att instrumenten är ofullkomliga — för att världen inte är byggd så. Einstein invände resten av sitt liv. Invändningarna var lysande, och var och en visade sig gå att besvara.',
      },
      {
        heading: 'Efteråt',
        body: 'Han belönades ensam 1932, trettioett år gammal, för att ha skapat kvantmekaniken. Han stannade i Tyskland genom kriget och ledde dess kärnvapenprogram, och vad han egentligen försökte åstadkomma där har diskuterats sedan dess. Ön är fortfarande trädlös. Det finns en minnesplakett.',
      },
    ],
  },
  'thousand-fold': {
    title: 'Ett misstag i labbet',
    screens: [
      {
        heading: 'En rutinsyntes',
        body: 'År 1967 anslöt en gästforskare till Hideki Shirakawas laboratorium vid Tokyos tekniska institut. Han fick ett standardrecept för att framställa polyacetylen — ett svart pulver, utan större intresse för någon, gjort genom att bubbla gas genom en katalysator.',
      },
      {
        heading: 'En faktor tusen',
        body: 'Något gick förlorat mellan instruktionen och bänken. Uppgifterna skiljer sig om huruvida en enhet lästes fel eller ett decimaltecken hamnade fel, men katalysatorn tillsattes i ungefär tusen gånger avsedd koncentration. Enligt varje normal måttstock var experimentet förstört innan det började.',
      },
      {
        heading: 'Fel resultat',
        body: 'Inget svart pulver bildades. I stället lade sig en film på vätskeytan — tunn, sammanhängande och silverblank, som ett stycke aluminiumfolie. Den liknade varken en plast eller den förväntade produkten.',
      },
      {
        heading: 'Vad han gjorde sedan',
        body: 'Det är den här delen som inte är en olyckshändelse. Shirakawa kastade varken filmen eller gjorde om syntesen rätt. Han karaktäriserade den: mätte den, räknade ut vad överskottet av katalysator gjort med polymerkedjorna, och fastställde hur filmen kunde framställas med avsikt.',
      },
      {
        heading: 'Ett samtal i Tokyo',
        body: 'År 1975 såg Alan MacDiarmid, på besök från Pennsylvania, den silverblanka filmen under en seminariepaus och frågade om den. Inom ett år var Shirakawa i Philadelphia och arbetade med MacDiarmid och fysikern Alan Heeger.',
      },
      {
        heading: 'Att tillsätta en förorening',
        body: 'De utsatte filmen för jodånga. Dess ledningsförmåga steg med flera storleksordningar — plasten bar ström som en metall. Materialet som alla använde just för att det isolerar hade förmåtts göra tvärtom.',
      },
      {
        heading: 'Efteråt',
        body: 'De tre delade kemipriset 2000. Ledande polymerer finns i dag i böjliga skärmar, sensorer och organiska lysdioder. Felet återskapas med avsikt i grundutbildningens laboratorier, vilket är ett ovanligt öde för ett misstag.',
      },
    ],
  },
  'mould-juice': {
    title: 'En upptäckt av misstag',
    screens: [
      {
        heading: 'En ostädad bänk',
        body: 'Alexander Flemings laboratorium på St Mary’s i London var ökänt oordnat. Odlingsskålar samlades på hög. Kollegor kommenterade det. Han var, med hans egna ord, ingen prydlig arbetare, och sommaren 1928 reste han bort och lämnade en trave stafylokockskålar vid ett fönster.',
      },
      {
        heading: 'En kylig period och en varm',
        body: 'Vädret den augusti gjorde något bestämt. En sval period lät en mögelspor — troligen på drift från ett mykologiskt laboratorium en våning ned — gro och växa. En varmare period som följde lät bakterierna växa. Vardera ordningen ensam hade inte gett något värt att lägga märke till.',
      },
      {
        heading: 'Skålen som inte hunnit diskas',
        body: 'När Fleming kom tillbaka i september började han rensa traven ned i ett kar med desinfektionsmedel. En skål hade ännu inte hamnat där. Han tog upp den, tittade på den och sade något som hans assistent mindes som odramatiskt: "Så egendomligt."',
      },
      {
        heading: 'En klar ring',
        body: 'Runt mögelkolonin fanns en ring där stafylokockerna hade lösts upp. Något som möglet producerade dödade bakterierna, och gjorde det på avstånd. Han fotograferade skålen, odlade vidare på möglet och identifierade det som ett Penicillium.',
      },
      {
        heading: 'Tio tysta år',
        body: 'Han kallade det verksamma ämnet "mögelsaft", publicerade 1929 och lyckades varken koncentrera det eller få det att hålla. Uppsatsen väckte nästan ingen uppmärksamhet. Fleming var bakteriolog, inte kemist, och problemet som återstod var helt och hållet kemiskt.',
      },
      {
        heading: 'Oxford',
        body: 'År 1938 läste Howard Florey och Ernst Chain den gamla uppsatsen och tyckte att reningen var värd ett försök. Vid 1941 hade de tillräckligt för att behandla en polis med en allvarlig infektion. Han förbättrades påtagligt. Sedan tog förrådet slut, och han dog.',
      },
      {
        heading: 'Efteråt',
        body: 'Tillverkningen flyttade till USA och skalades upp i tid för landstigningen i Normandie. Fleming, Florey och Chain delade priset 1945. I sin nobelföreläsning beskrev Fleming hur resistens skulle uppstå, genom vilken mekanism och ungefär hur snart. Han hade rätt på alla tre punkter.',
      },
    ],
  },
  'holmdel-hiss': {
    title: 'Ett störande brus',
    screens: [
      {
        heading: 'Ett horn på en kulle',
        body: 'I Holmdel i New Jersey stod en tjugofots hornantenn, byggd av Bell Labs för att studsa signaler mot tidiga kommunikationssatelliter. Vid 1964 hade satelliterna gått vidare och två radioastronomer, Arno Penzias och Robert Wilson, hade instrumentet för sig själva.',
      },
      {
        heading: 'Ett brus som inte gav sig',
        body: 'Innan de kunde bedriva astronomi behövde de fastställa brusnivån. Det fanns mer av den än det borde ha gjort — ett svagt, jämnt brus omkring hundra gånger starkare än väntat. Det ändrades inte med tid på dygnet, årstid eller riktning.',
      },
      {
        heading: 'Att utesluta saker',
        body: 'De kontrollerade störningar från New York. De kontrollerade efterverkningar av ett kärnvapenprov 1962. De tog isär och satte ihop fogar i antennen, tejpade över nitar och letade efter glapp. Bruset satt exakt där det suttit.',
      },
      {
        heading: 'Ett vitt dielektriskt material',
        body: 'Ett duvpar hade byggt bo i hornet och täckt insidan med spillning — antecknat, med viss finkänslighet, som "ett vitt dielektriskt material". De vräkte fåglarna och skrubbade metallen. Bruset ändrades inte alls.',
      },
      {
        heading: 'Sex mil bort',
        body: 'I Princeton byggde Robert Dickes grupp en liten antenn för att leta efter just detta: kvarvarande strålning från ett hett tidigt universum, nedkyld av utvidgningen till några grader över absoluta nollpunkten. En gemensam bekant nämnde problemet i Holmdel. Dicke lade på luren och sade till sin grupp att de blivit förekomna.',
      },
      {
        heading: 'Två uppsatser',
        body: 'Resultaten publicerades sida vid sida 1965. Penzias och Wilson beskrev en mätning av överskjutande antenntemperatur och gjorde inget kosmologiskt anspråk alls. Den åtföljande uppsatsen förklarade vad de funnit. Big bang upphörde att vara en modell bland flera.',
      },
      {
        heading: 'Efteråt',
        body: 'De delade priset 1978. Signalen är det äldsta ljus som finns, frigjort när universum först blev genomskinligt, och dess svaga variationer är fröna till varje galax. Den nådde två ingenjörer som ett fel de tillbringade ett år med att försöka få bort.',
      },
    ],
  },
  'a-new-kind-of-ray': {
    title: 'En oväntad upptäckt',
    screens: [
      {
        heading: 'Ett mörklagt rum',
        body: 'På kvällen den 8 november 1895, i Würzburg, arbetade Wilhelm Röntgen med ett katodstrålerör. Han hade svept in det i svart kartong för att stänga ute dess ljus, och mörklagt rummet, så att han skulle se varje svagt sken som slapp ut.',
      },
      {
        heading: 'Något tvärs över bänken',
        body: 'En liten skärm belagd med bariumplatinacyanid, en meter bort, började lysa. Det borde den inte. Röret var övertäckt; katodstrålar färdades bara ett par centimeter i luft. Något korsade rummet som han inte hade något namn på, så han kallade det X.',
      },
      {
        heading: 'Sju veckor',
        body: 'Han flyttade i praktiken in i laboratoriet. Måltider bars in till honom. Han lade föremål mellan röret och skärmen: papper, trä, aluminium, en uppsättning vikter i en sluten låda. Strålarna gick igenom nästan allt, och bly stoppade dem.',
      },
      {
        heading: 'En hand',
        body: 'Den 22 december bad han sin hustru Anna Bertha att hålla handen över en fotografisk plåt i femton minuter. Bilden visade hennes fingerben och vigselring, med köttet som en svag skugga. Hon lär ha sagt: "Jag har sett min död."',
      },
      {
        heading: 'Sex dagar senare',
        body: 'Han lämnade in uppsatsen den 28 december och postade särtryck, med fotografier, till ledande fysiker i hela Europa. Pressen hade det inom en vecka. Inom en månad var bilderna en offentlig sensation och läkare använde dem redan.',
      },
      {
        heading: 'Han tog ingenting',
        body: 'Röntgen vägrade patentera upptäckten, med motiveringen att den tillhörde mänskligheten, och skänkte prispengarna till sitt universitet. Sjukhusen hade fungerande utrustning inom ett år. Han är en av mycket få som gjort en förmögenhet tillgänglig och tackat nej till den.',
      },
      {
        heading: 'Efteråt',
        body: 'Han fick det första Nobelpriset i fysik 1901. Berättelsens andra sida kom långsammare: tidiga operatörer, som arbetade utan skydd, fick brännskador och sedan cancer. Strålarna som gjorde det osynliga synligt tog ett decennium att förstås som farliga.',
      },
    ],
  },
  'jumping-genes': {
    title: 'Fyrtio år av väntan',
    screens: [
      {
        heading: 'Ett fält av majs',
        body: 'Barbara McClintock skötte majsodlingar vid Cold Spring Harbor på Long Island, till stor del ensam, i decennier. Majs är en bra organism för genetik därför att bevisen är synliga: varje kärna på en kolv är en egen avkomma, och dess färg är ett läsbart resultat.',
      },
      {
        heading: 'Brutna kromosomer',
        body: 'Hon hade studerat kromosomer som bryts och sätts ihop igen. När hon följde konsekvenserna genom generationer började hon se färgmönster på kärnorna som ingen befintlig ärftlighetsmodell kunde ge upphov till — fläckar och strimmor på fel platser, med fel frekvens.',
      },
      {
        heading: 'Element som flyttar sig',
        body: 'Vid 1948 hade hon en förklaring. Vissa genetiska element satt inte fast. De kunde lämna en plats på en kromosom och sätta sig på en annan, och slå av och på närliggande gener på vägen. Arvsmassan var inte en stabil lista med instruktioner.',
      },
      {
        heading: 'Tystnaden',
        body: 'Hon lade fram arbetet vid symposiet i Cold Spring Harbor 1951. Gensvaret var inte så mycket fientlighet som tomhet. Bevisen var majscytologi, som få i rummet kunde läsa, och påståendet motsade en bild av genen som just skulle bekräftas spektakulärt av dubbelspiralen.',
      },
      {
        heading: 'Att fortsätta ändå',
        body: 'Hon slutade skicka arbetet till tidskrifter 1953, och beskrev mottagandet som "förbryllelse, till och med fientlighet". Hon slutade inte utföra det. Hon behöll odlingarna, behöll anteckningarna och arbetade vidare med majsens genetik i Central- och Sydamerika.',
      },
      {
        heading: 'Fältet kommer ifatt',
        body: 'I slutet av 1960-talet och under 1970-talet fann molekylärbiologer som arbetade med bakterier sekvenser som flyttade sig — transposoner. Verktygen fanns äntligen för att i ett provrör se det hon slutit sig till från en majskolv. Transposabla element visade sig finnas i hela den levande världen, och utgöra en stor del av det mänskliga genomet.',
      },
      {
        heading: 'Efteråt',
        body: 'Priset 1983 gavs till henne ensam: det enda odelade pris i fysiologi eller medicin som någonsin getts till en kvinna. Tillfrågad om de trettiofem årens väntan sade hon att hon vetat att hon hade rätt, och att arbetet i sig varit nöjet.',
      },
    ],
  },
}

export const SV = { ui, kinds, fields, countries, themes, laureates, milestones, artifacts, stories }
