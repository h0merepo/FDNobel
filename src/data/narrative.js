import { tr, t as ui } from '../i18n'
// Narrative copy for the story panel. Keyed `${kind}:${id}`.
// `standfirst` is the lead paragraph, `body` the continuation, `caption` labels
// the inset plate. Anything without an entry falls back to its blurb.

const themes = {
  chance: {
    cta: 'Discover how the unexpected sparks new light',
    standfirst:
      'Almost every laboratory keeps a story about the day nothing went to plan and something arrived anyway.',
    body: [
      'Fleming came back from a summer holiday to a culture plate he had meant to wash. Röntgen noticed a screen glowing on a bench where no light should have reached it. Becquerel blamed the weather, put his uranium salts in a drawer, and found the photographic plate fogged regardless.',
      'What the word chance conceals is the preparation. Thousands of people have thrown away a contaminated dish. The prize is not for the accident but for the refusal to tidy it away — for looking at the anomaly long enough to ask what it is doing there.',
    ],
    caption: 'A ring of cleared bacteria around a contaminant',
  },
  creativity: {
    cta: 'See what happens when someone imagines the shape first',
    standfirst:
      'A discovery is not found lying in the world. Someone has to imagine the shape it might take before the evidence can confirm it.',
    body: [
      'Einstein pictured himself riding alongside a beam of light. Morrison built novels around what a community agrees not to say. In both cases the raw material was already public; the invention was the arrangement.',
      'Committees find this hard to reward. Creativity leaves no instrument reading and no dated notebook page. It shows up only in the gap between what was available to everyone and what one person did with it.',
    ],
    caption: 'Working notes, redrawn',
  },
  revolt: {
    cta: 'Meet the people who refused the settled account',
    standfirst:
      'Every settled account of the world was once a minority position held by someone who would not let it go.',
    body: [
      'Modern physics arrived as an act of disobedience against a mechanics that had worked for two hundred years. McClintock described genes that moved and was met with a silence that lasted decades. Sakharov built the weapon and then spent his life arguing against the state that had commissioned it.',
      'Revolt in science rarely looks heroic at the time. It looks like a difficult colleague, a paper nobody will referee kindly, a seminar that goes badly.',
    ],
    caption: 'A disputed result, first presentation',
  },
  accident: {
    cta: 'Follow the discoveries that began as somebody’s mistake',
    standfirst:
      'A spill, a slip, a contaminated sample. Some of the most consequential findings of the century began as somebody\'s mistake.',
    body: [
      'The accident is not the discovery. Between the ruined experiment and the published result there is usually a decade of chemistry, a funding crisis, and a great deal of unglamorous confirmation.',
      'What accidents really provide is a question nobody had thought to ask. The rest is ordinary work, done by people whose names often do not reach the citation.',
    ],
    caption: 'The ruined preparation, kept',
  },
  'invisible-worlds': {
    cta: 'Look beneath the threshold of the eye',
    standfirst:
      'Beneath the threshold of the eye there is a second world — microbes, atoms, radiation, genes — and almost all of it was discovered within a single lifetime.',
    body: [
      'In 1895 illness was still, for most people, a matter of fate and bad air. Within thirty years there were organisms to name, particles to count, and a form of radiation that could photograph the bones inside a living hand.',
      'Each of these worlds needed an instrument before it needed a theory. The microscope, the diffraction camera, the counter: seeing came first, and understanding arrived some years behind it.',
    ],
    caption: 'Exposure made without visible light',
  },
  courage: {
    cta: 'Stand with those who spoke when it cost them everything',
    standfirst:
      'Standing in the open when it costs something — a professorship, a passport, a country, occasionally a life.',
    body: [
      'Balch lost her chair at Wellesley for opposing the First World War and was recognised thirty years later. Addams went from the most admired woman in America to the most suspected, for the same convictions. Suu Kyi was awarded while under house arrest, a reminder that a prize is given at one moment and not for all time.',
      'The Peace Prize has always been the most contested category, because it is the only one where the committee must judge a life still in progress.',
    ],
    caption: 'Delegates leaving the congress',
  },
  play: {
    cta: 'Find out what serious work looks like when it looks like fiddling',
    standfirst:
      'Serious work that looks, from outside, like fiddling about — and turns out to be physics.',
    body: [
      'Geim lifted graphene off a block of graphite with ordinary sticky tape, during a Friday-evening session his laboratory ran for experiments with no obvious purpose. He remains the only person holding both a Nobel and an Ig Nobel Prize.',
      'Feynman drew quantum electrodynamics as pictures because the algebra bored him. The pictures became the standard notation of the field.',
    ],
    caption: 'Apparatus assembled from what was to hand',
  },
  solitude: {
    cta: 'Spend time with the quiet where breakthroughs are made',
    standfirst:
      'Long stretches alone with a problem: the quiet, unwitnessed condition in which most breakthroughs are actually made.',
    body: [
      'McClintock worked her maize plots largely by herself for forty years. Dirac predicted antimatter from an equation and spoke as sparingly as he wrote. Neither was building a school or a following.',
      'Solitude is not the same as isolation. It is a working method, and one that institutional science — with its teams, its grants, its quarterly reporting — now finds increasingly difficult to fund.',
    ],
    caption: 'A single-occupant laboratory',
  },
  dreams: {
    cta: 'Follow the answers that arrived in sleep',
    standfirst:
      'Answers that arrive sideways, in sleep or reverie, when the reasoning mind has stopped insisting.',
    body: [
      'Otto Loewi dreamt the decisive frog-heart experiment twice. The first time he scribbled a note in the dark and could not read his own handwriting in the morning. The second time he got up at three and went straight to the laboratory.',
      'The experiment showed that nerves communicate chemically rather than electrically. It took a night\'s sleep to design and a century of neuroscience to unpack.',
    ],
    caption: 'Notes taken at three in the morning',
  },
  youth: {
    cta: 'Meet the laureates who were far too young to know better',
    standfirst: 'Work done absurdly early, by people the field had not yet learned to take seriously.',
    body: [
      'Lawrence Bragg was twenty-five when he shared the physics prize with his father for reading the structure of crystals with X-rays; he remains the youngest science laureate. Malala Yousafzai was seventeen.',
      'The pattern is not that the young are cleverer. It is that they have not yet absorbed the reasons a thing cannot be done.',
    ],
    caption: 'The youngest laureate, on the day',
  },
  collaboration: {
    cta: 'Count the names a prize for three could never hold',
    standfirst:
      'The statutes allow a prize to be divided three ways. Discoveries are rarely so considerate.',
    body: [
      'The double helix was built on Rosalind Franklin\'s diffraction images. Insulin came out of a borrowed summer laboratory and a dispute about credit that never fully settled. Behind each medal there is a list of names the citation had no room for.',
      'The rule of three was written in 1900, when a laboratory might hold four people. A modern physics paper can carry three thousand authors.',
    ],
    caption: 'The group photograph, with omissions',
  },
  persistence: {
    cta: 'Sit with the unglamorous middle of the story',
    standfirst:
      'Tonnes of pitchblende reduced, by hand, in a shed, to a decigram of radium chloride. This is the part of the story that gets summarised in a clause.',
    body: [
      'Marie Curie spent four years on the extraction. Karikó spent three decades being demoted and defunded over mRNA before the technology was administered billions of times in a single year.',
      'Persistence is the least photogenic virtue in science and the one most reliably present in the record.',
    ],
    caption: 'Four years of extraction, one result',
  },
  observation: {
    cta: 'Learn to look harder at what everyone has already seen',
    standfirst: 'Looking harder at exactly what everybody else has already looked at.',
    body: [
      'Koch established that a specific organism produces a specific disease, every time — turning contagion from a mood into a mechanism. Lorenz founded ethology by watching geese decide he was their mother.',
      'The skill is not visual acuity. It is the discipline of not deciding in advance what the thing in front of you is going to be.',
    ],
    caption: 'The same field, examined again',
  },
  imagination: {
    cta: 'Picture a world before anyone could measure it',
    standfirst:
      'Picturing a world you cannot yet measure, and then building the measurement to check.',
    body: [
      'Relativity began as a thought experiment about a falling lift. Penrose proved black holes were a necessary consequence of general relativity rather than an exotic accident, half a century before anyone photographed one.',
      'In literature the same faculty runs in reverse: not predicting the world but making an unlived one specific enough to be entered.',
    ],
    caption: 'A geometry drawn before it was observed',
  },
  mentoring: {
    cta: 'Trace the corridors that keep producing laureates',
    standfirst:
      'Lineages of teachers and students; particular corridors that keep producing laureates decade after decade.',
    body: [
      'Seven of J. J. Thomson\'s research assistants went on to win prizes of their own, as did his son. The Cavendish, the Curie laboratory, and a handful of similar rooms account for a share of the roll of honour that no theory of individual genius explains.',
      'What is transmitted is rarely knowledge. It is a sense of which problems are worth a decade.',
    ],
    caption: 'A laboratory and its descendants',
  },
  testing: {
    cta: 'Watch a discipline built on proving yourself wrong',
    standfirst:
      'The discipline of trying, methodically, to prove yourself wrong — several thousand times, on the record.',
    body: [
      'Banting and Best worked through pancreatic extracts until one lowered blood sugar without killing the animal. The patent was later sold to the University of Toronto for a dollar, on the argument that insulin belonged to the patients.',
      'Most of what testing produces is negative results, which journals do not print and prizes do not name.',
    ],
    caption: 'The log of unsuccessful preparations',
  },
  'senses-behaviour': {
    cta: 'Explore how a body takes in a world',
    standfirst:
      'How bodies and brains take in a world: sight, smell, pain, instinct, memory, habit.',
    body: [
      'Pavlov was awarded for digestion and is remembered for conditioning. Axel and Buck mapped the olfactory receptor genes and found that roughly three per cent of the genome is given over to smell.',
      'The field keeps arriving at the same uncomfortable position — that a great deal of what feels like decision is arriving pre-processed.',
    ],
    caption: 'Response measured against stimulus',
  },
  healthcare: {
    cta: 'Follow a finding from the bench to the ward',
    standfirst:
      'The slow translation of a laboratory finding into ordinary, unremarkable survival.',
    body: [
      'A fatal childhood diagnosis became a managed condition within eighteen months of insulin. Penicillin took a decade to move from an observation to a vial. Smallpox took two centuries and then, quite suddenly, stopped existing.',
      'The distance between the discovery and the clinic is measured in chemistry, manufacturing and politics, in roughly that order.',
    ],
    caption: 'Ward records, before and after',
  },
  'the-atomic-age': {
    cta: 'Face the physics that lit cities and ended two of them',
    standfirst:
      'The same physics that lit cities also ended two of them, within four decades of the first prize.',
    body: [
      'The chain runs from Becquerel\'s fogged plate through the Curies, Rutherford and Fermi to a reactor under a Chicago squash court in 1942. Almost every link in it was recognised in Stockholm.',
      'After 1945 physicists acquired something the discipline had not previously needed: a permanent moral problem, and a large number of laureates campaigning against their own field.',
    ],
    caption: 'Instrument readings, 1945',
  },
  'antibiotics-t': {
    cta: 'Travel the decade between a mould and a medicine',
    standfirst:
      'A decade separates the mould on Fleming\'s dish from the drug in the vial, and the second half of that story is chemistry.',
    body: [
      'Chain and Florey did the purification work that made penicillin a medicine rather than a curiosity. The 1945 prize was shared between all three, which is unusually fair by the standards of the period.',
      'Resistance was predicted in Fleming\'s own Nobel lecture. He was specific about the mechanism and the timescale, and correct on both.',
    ],
    caption: 'The original plate, re-photographed',
  },
  genes: {
    cta: 'Read the instructions written in four letters',
    standfirst:
      'Instructions written in four letters — jumping, folding, mutating, and now edited.',
    body: [
      'McClintock found genetic elements that moved around the maize genome in 1948 and waited roughly thirty years for the field to believe her. CRISPR arrived from an unglamorous corner of bacterial immunology.',
      'Each step compressed the interval between reading the code and rewriting it, until the two became difficult to keep apart.',
    ],
    caption: 'Sequence data, partial',
  },
  'women-rights': {
    cta: 'Meet the women kept out of the rooms they changed',
    standfirst:
      'Suffrage, settlement houses, schooling — and, separately, the laureates who were kept out of the laboratories where the work was done.',
    body: [
      'Marie Curie was initially left off the 1903 nomination until Pierre insisted. Lise Meitner was never awarded at all. Jane Addams and Emily Greene Balch were both recognised for peace work that had cost them their standing at home.',
      'The imbalance in the record is not a historical curiosity. It is a description of who had access to a bench.',
    ],
    caption: 'Congress delegates, The Hague, 1915',
  },
  'arms-defense': {
    cta: 'Hear the disarmament case made by the weapon builders',
    standfirst:
      'Disarmament treaties argued for, with unusual authority, by the people who had built the weapons.',
    body: [
      'Pauling campaigned against atmospheric testing and became the only person to hold two unshared prizes. Sakharov designed the Soviet hydrogen bomb and then spent his life opposing it, at considerable cost.',
      'Chemical weapons appear in the record twice — once as an atrocity at Ypres, and once as a prize awarded to the chemist responsible for both the gas and the fertiliser.',
    ],
    caption: 'Treaty text, initialled',
  },
  'economic-history': {
    cta: 'Revisit the crashes the models never saw coming',
    standfirst: 'Booms, crashes, and the models that consistently failed to see them coming.',
    body: [
      'The 1929 crash turned macroeconomics into a subject governments were obliged to listen to. Friedman reread the Depression as a monetary failure and reshaped central banking for forty years on the strength of it.',
      'Ostrom then demonstrated that communities routinely govern shared resources well, against a theory that had proved they could not.',
    ],
    caption: 'Index series, 1928–1933',
  },
  conscience: {
    cta: 'Meet the scientists who turned against their own work',
    standfirst:
      'Scientists who spent the second half of their careers campaigning against the first half.',
    body: [
      'Einstein signed the letter urging an American bomb programme and called it his one great mistake. Sakharov, Pauling and Rotblat all worked from inside the weapons establishment before turning on it.',
      'The pattern is specific to the twentieth century, when for the first time a laboratory result could be fielded as a weapon within a decade.',
    ],
    caption: 'Open letter, first page',
  },
  exile: {
    cta: 'Follow the work that continued somewhere else',
    standfirst:
      'Passports withdrawn, laboratories abandoned, appointments cancelled — and the work continued somewhere else.',
    body: [
      'Fermi collected his prize in Stockholm in 1938 and never went home. German laureates were forbidden by decree to accept the award at all. Brodsky was tried for "social parasitism" and expelled.',
      'Two laureates\' gold medals were dissolved in acid in Copenhagen to keep them from the occupying authorities, and the gold was recovered and recast after the war.',
    ],
    caption: 'Travel document, annotated',
  },
  outsiders: {
    cta: 'Meet the amateurs and assistants who changed the field',
    standfirst:
      'Amateurs, clerks, immigrants and unpaid assistants who changed a field that had not made room for them.',
    body: [
      'Einstein wrote the 1905 papers as a patent examiner in Bern. Karikó was demoted repeatedly for pursuing mRNA. McClintock had no permanent academic post for much of her career.',
      'Institutions tend to write these cases up afterwards as evidence of their own openness.',
    ],
    caption: 'Correspondence, unanswered',
  },
  instruments: {
    cta: 'Discover the machines that had to exist before the seeing',
    standfirst: 'You cannot see a thing until somebody has built the thing that sees it.',
    body: [
      'Ruska built the first electron microscope in 1931 and was recognised fifty-five years later, at eighty. Betzig broke the diffraction limit that was supposed to be a hard physical ceiling on optical microscopy.',
      'The instrument almost always precedes the theory, and is almost always credited afterwards.',
    ],
    caption: 'Optical assembly, sectioned',
  },
  scale: {
    cta: 'Travel from the quark to the galaxy in one step',
    standfirst: 'From quarks to galaxies: the vertigo of very small and very large numbers.',
    body: [
      'The century began with the atom as a convenient fiction and ended with the cosmic microwave background mapped to a precision that constrains the age of the universe.',
      'What both ends share is that the object of study cannot be handled, only inferred — from a track, a shadow, a residual hiss.',
    ],
    caption: 'Sky survey, background subtracted',
  },
  storytelling: {
    cta: 'Find out whose life became a story worth telling',
    standfirst: 'Literature laureates who changed whose life counts as a story worth telling.',
    body: [
      'Morrison put the interior life of Black America at the centre of the American novel. García Márquez wrote a continent\'s history as though the impossible were simply local weather. Ernaux stripped autobiography of consolation.',
      'The literature prize is the one the committee is most regularly accused of getting wrong, largely because it is the only one where the evidence is a matter of reading.',
    ],
    caption: 'Manuscript page, corrected',
  },
  memory: {
    cta: 'Compare what a nerve cell keeps with what a country forgets',
    standfirst:
      'What a nerve cell keeps, and what a country agrees to forget. Two subjects that turn out to share a vocabulary.',
    body: [
      'Kandel traced memory to the strengthening of individual synapses, working in a sea slug with unusually large and countable neurons.',
      'The literature laureates were working the same seam from the other direction: Morrison on what a community will not say aloud, Brodsky on a state that edited its own record.',
    ],
    caption: 'Synaptic trace, recorded',
  },
  language: {
    cta: 'Consider the languages a prize has never read',
    standfirst:
      'Prizes given for sentences — and for the many languages a Stockholm committee has never read.',
    body: [
      'The literature award has been dominated by European languages for most of its history, less because of the writing than because of what reaches the committee in translation.',
      'Every laureate outside that circle arrived through a translator who is not named on the medal.',
    ],
    caption: 'Parallel text, two editions',
  },
  doubt: {
    cta: 'Take uncertainty as a working method',
    standfirst:
      'The productive kind: uncertainty adopted as a working method rather than admitted as a failure.',
    body: [
      'Heisenberg made indeterminacy a law of nature rather than a limit of apparatus. Einstein never accepted the consequence and spent thirty years constructing objections, most of which turned out to be useful.',
      'The argument between them produced more physics than either position would have alone.',
    ],
    caption: 'Conference proceedings, 1927',
  },
  patience: {
    cta: 'Wait forty years for a finding to be believed',
    standfirst:
      'The interval between a finding and its recognition, measured in decades rather than years.',
    body: [
      'McClintock published in 1948 and was awarded in 1983. Ruska waited fifty-five years. Karikó\'s grant applications were rejected consistently through the 1990s.',
      'The prize is not awarded posthumously, which means the record of delayed recognition is also, quietly, a record of people who died first.',
    ],
    caption: 'Publication date and citation date',
  },
  hunger: {
    cta: 'Weigh bread from air against the famines it never stopped',
    standfirst:
      'Nitrogen pulled out of the air, semi-dwarf wheat, and convoys — alongside the famines none of them prevented.',
    body: [
      'The Haber–Bosch process feeds an estimated half of the world\'s population and supplied the explosives of two wars. Borlaug\'s wheat is credited with a billion lives and with a long-term debt in soil and water.',
      'The World Food Programme was recognised in 2020 for treating hunger as a weapon of war, and therefore as something that can be disarmed.',
    ],
    caption: 'Yield trials, two varieties',
  },
  commons: {
    cta: 'See who can be trusted with what everyone owns',
    standfirst:
      'Shared fisheries, forests and atmospheres, and the question of who can be trusted to govern them.',
    body: [
      'Ostrom went and looked. Irrigation systems in Nepal, lobster fisheries in Maine, alpine pasture in Switzerland — communities managing shared resources for centuries without either privatisation or the state.',
      'She was the first woman awarded in economic sciences, and had been trained as a political scientist.',
    ],
    caption: 'Field survey, common pasture',
  },
  'climate-t': {
    cta: 'Watch a century of measurement become a politics',
    standfirst:
      'A century of patient measurement before the graph turned into a politics.',
    body: [
      'Manabe modelled carbon dioxide against global temperature in 1967. The projection has held for over fifty years, which is an unusual thing to be able to say about any model.',
      'The 2007 Peace Prize reframed the atmosphere as a shared responsibility rather than a scientific subject, which is either a category error or the entire point.',
    ],
    caption: 'Temperature series, annotated',
  },
  peacebuilding: {
    cta: 'Join the slow work that has no clean ending',
    standfirst:
      'Settlement houses, mediation tables, refugee agencies: slow institutional work with no clean ending.',
    body: [
      'Addams built Hull House. Balch helped found the Women\'s International League for Peace and Freedom. Neither produced a treaty, and both were recognised for changing the terms of an argument.',
      'From 1948 the committee increasingly awarded institutions rather than individuals — an acknowledgement that this kind of work outlasts the people doing it.',
    ],
    caption: 'Settlement house, afternoon',
  },
  'microorganisms-t': {
    cta: 'Watch illness turn from fate into cause and effect',
    standfirst:
      'The germ theory that turned illness from a fate into a chain of cause and effect.',
    body: [
      'Koch\'s postulates made contagion provable. Ross found the malaria parasite in a mosquito\'s stomach wall and wrote a poem about it the same night.',
      'Within a generation, hospitals had changed their procedures, cities had rebuilt their drains, and the average life expectancy in industrial countries had moved by decades.',
    ],
    caption: 'Stained preparation, high power',
  },
  code: {
    cta: 'Follow nature from something written to something edited',
    standfirst:
      'Nature understood as something written, and then — within fifty years — as something editable.',
    body: [
      'The double helix implied a copying mechanism the moment its structure was clear. The genome was read out in full by 2003. CRISPR made targeted rewriting routine by the early 2010s.',
      'The reading is finished. The understanding is not, and the editing has arrived regardless.',
    ],
    caption: 'Four-letter sequence, aligned',
  },
  truth: {
    cta: 'Stand with the reporters who refused the official version',
    standfirst:
      'Journalists and dissidents recognised for declining to accept an official version of events.',
    body: [
      'Ressa reported through a barrage of arrest warrants and became the first Filipino laureate. Sakharov\'s prize was collected by his wife because he was refused permission to travel.',
      'The category is uncomfortable by design: it requires the committee to say, in public, which account of a country is the accurate one.',
    ],
    caption: 'Front page, later retracted',
  },
  consciousness: {
    cta: 'Study the one object that is doing the studying',
    standfirst:
      'The hardest available object of study, on account of being the thing conducting the study.',
    body: [
      'Sherrington named the synapse and described the waking brain as an "enchanted loom" of shifting patterns — a phrase that has outlasted most of the physiology around it.',
      'A century on, the mechanism is far better mapped and the original question is exactly where it was.',
    ],
    caption: 'Cortical mapping, early attempt',
  },
  translation: {
    cta: 'Follow a prize decided in Swedish to its reader',
    standfirst:
      'How a prize decided in Swedish reaches a reader in any other language at all.',
    body: [
      'Brodsky wrote in Russian and English and translated himself, unhappily. García Márquez said the English One Hundred Years of Solitude was better than his original.',
      'Every literature award depends on a chain of translators whose judgement shapes the committee\'s, and who appear nowhere in the citation.',
    ],
    caption: 'Two editions, same paragraph',
  },
  inequality: {
    cta: 'Ask who is counted, treated, and awarded',
    standfirst:
      'Who receives prizes, who receives treatment, and who appears in the data at all.',
    body: [
      'The three questions turn out to be one question, examined at different scales. Addams was making it about American cities in 1910; Ostrom was making it about resource governance in 2009.',
      'The roll of laureates is itself a dataset on the subject, and not a flattering one.',
    ],
    caption: 'Distribution, by decade',
  },
  'invisible-hands': {
    cta: 'Credit the labour inside every citation',
    standfirst:
      'Technicians, spouses, students and human computers: the uncredited labour inside every citation.',
    body: [
      'Franklin\'s Photograph 51 was shown to Watson and Crick without her knowledge. Curie\'s laboratory ran on assistants who appear in no citation. The word "computer" described a person, usually a woman, until the 1950s.',
      'A prize that names at most three people is, by construction, a machine for producing this category.',
    ],
    caption: 'Laboratory staff, unlabelled',
  },
}

const people = {
  curie: [
    'She refined tonnes of pitchblende by hand, in a shed the Sorbonne had stopped using, to obtain a decigram of radium chloride. The 1903 physics prize was originally to name only Becquerel and Pierre; Pierre made clear he would not accept it on those terms.',
    'The 1911 chemistry prize came alone, in the middle of a press campaign about her private life that the Academy suggested she stay away from Stockholm to avoid. She went. Her notebooks remain radioactive and are consulted under a signed waiver.',
  ],
  einstein: [
    'The prize was awarded for the photoelectric effect, not relativity — the committee wanted a result that had been measured rather than a theory that had merely been confirmed. The paper it recognised is the one that opened quantum physics.',
    'He wrote it in 1905 while working as a patent examiner in Bern, in a year that also produced special relativity and the mass–energy equivalence. He was twenty-six and outside the academic system entirely.',
  ],
  rontgen: [
    'He was working with a covered discharge tube in a darkened room when a screen across the bench began to glow. Within weeks he had photographed the bones of his wife\'s hand, and she is reported to have said that she had seen her own death.',
    'He refused to patent the discovery, took no money from it, and donated his prize to his university. Hospitals had working X-ray equipment within a year.',
  ],
  becquerel: [
    'He expected uranium salts to phosphoresce after sunlight and fog a photographic plate. Paris was overcast, so he put the whole arrangement in a drawer and waited.',
    'The plate was fogged anyway, heavily, with no sunlight involved. What he had found was not a response to light but a property of the element itself — and the beginning of the field the Curies would name.',
  ],
  fleming: [
    'He returned from a summer holiday in 1928 to a stack of staphylococcus plates he had left by a window. One had been colonised by a mould, and around the mould was a clear ring where the bacteria had died.',
    'He published, and very little happened for ten years. His own Nobel lecture in 1945 contained an accurate warning about resistance, including the mechanism and the likely timescale.',
  ],
  koch: [
    'He worked out the postulates that made contagion provable: isolate the organism from a sick host, grow it in culture, reintroduce it, recover the same organism from the new case.',
    'It sounds procedural. It converted disease from a matter of constitution and bad air into a chain of cause and effect that could be interrupted, which is most of modern public health.',
  ],
  mccli: [
    'She described genetic elements that moved position within the maize genome in 1948, working largely alone on her own plots. The field found the claim implausible and mostly stopped engaging with it.',
    'She was awarded in 1983, thirty-five years later, as the sole recipient — the only woman to hold an unshared prize in physiology or medicine. She said she had simply carried on and found the interval useful.',
  ],
  crick: [
    'The structure was assembled from other people\'s data as much as from model-building: Chargaff\'s ratios, Franklin\'s diffraction images, Wilkins\'s access to them.',
    'Photograph 51 was shown to Watson without Franklin\'s knowledge. She died in 1958 and the prize was awarded in 1962, which has allowed the question of what she would have been given to remain permanently open.',
  ],
  banting: [
    'The work was done over a Toronto summer in a laboratory lent out while its owner was on holiday, with a medical student, Charles Best, chosen by coin toss.',
    'The first patient was fourteen and close to death; he lived another thirteen years. The patent was sold to the university for one dollar on the argument that insulin could not belong to anybody.',
  ],
  addams: [
    'Hull House in Chicago offered classes, childcare, a labour bureau and a public kitchen to a neighbourhood of new immigrants. It was also, deliberately, a place where the people running it lived.',
    'Her opposition to the First World War moved her from the most admired woman in America to a figure under federal surveillance. The prize came in 1931, when she was too ill to travel to Stockholm.',
  ],
  balch: [
    'She lost her professorship at Wellesley in 1918 for opposing the war, a dismissal the college did not revisit in her lifetime.',
    'She spent the following decades on the machinery of internationalism — the League, refugee resettlement, disarmament conferences — and was awarded in 1946, at seventy-nine.',
  ],
  sakharov: [
    'He was the principal designer of the Soviet hydrogen bomb and, for a period, among the most privileged scientists in the Union.',
    'He then spent twenty years opposing the programme he had built, was stripped of his honours and internally exiled to Gorky. His wife collected the prize in Stockholm; he was refused a passport.',
  ],
  'suu-kyi': [
    'She was awarded in 1991 while under house arrest in Rangoon, and her sons accepted on her behalf. She delivered her Nobel lecture twenty-one years later.',
    'Her later position in government, and her defence of the state against genocide allegations at The Hague, has made her the clearest case in the prize\'s history of an award given at one moment rather than for all time.',
  ],
  yousafzai: [
    'She was shot on a school bus in the Swat Valley in 2012 for campaigning publicly about girls\' education, having written for the BBC under a pseudonym since she was eleven.',
    'She was awarded two years later at seventeen, the youngest laureate in any category, sharing the prize with Kailash Satyarthi — an Indian and a Pakistani, a Hindu and a Muslim, which was not an accident of the committee\'s.',
  ],
  morrison: [
    'She worked as an editor at Random House for nearly twenty years, publishing a generation of Black writers, and wrote her first novels in the hours around that job and two children.',
    'The 1993 citation described novels of "visionary force and poetic import" that give life to an essential aspect of American reality. She was the first Black woman to receive the literature prize.',
  ],
  marquez: [
    'He wrote One Hundred Years of Solitude in eighteen months, pawning household items to keep going, and sent the manuscript to his publisher in two halves because he could not afford the postage at once.',
    'His Nobel lecture argued that Latin America\'s history had simply outrun the realism available to describe it, and that the label applied to his work was less invention than reportage.',
  ],
  brodsky: [
    'He was tried in Leningrad in 1964 for "social parasitism". Asked by the judge who had authorised him to be a poet, he replied that he assumed it came from God.',
    'He was expelled in 1972, wrote afterwards in both Russian and English, and translated himself with visible reluctance. He was awarded in 1987 and became American poet laureate four years later.',
  ],
  libby: [
    'Living things take up carbon-14 from the atmosphere while alive and stop at death, after which the isotope decays at a known rate. The consequence is a clock inside every organic sample.',
    'It gave archaeology and geology a shared number for the first time, and immediately unsettled several chronologies that had been argued about for a century.',
  ],
  fermi: [
    'He travelled to Stockholm in 1938 to collect the prize and continued to New York rather than returning to Italy, where the racial laws had made his wife\'s position untenable.',
    'Four years later he assembled the first self-sustaining nuclear reactor under the stands of a disused squash court in Chicago, and reported the result by telephone in code.',
  ],
  bragg: [
    'He was twenty-five, sharing the 1915 prize with his father for showing that X-ray diffraction could be read backwards into the atomic structure of a crystal.',
    'He remains the youngest science laureate. He later ran the Cavendish, where the double helix was built — a piece of continuity the prize record does not usually capture.',
  ],
  pavlov: [
    'The 1904 prize was for the physiology of digestion, work done with surgically implanted fistulas that let him measure secretion in a conscious animal.',
    'The conditioning experiments everyone remembers came out of an artefact in that work: the dogs began secreting before the food arrived, in response to whatever reliably preceded it.',
  ],
  kandel: [
    'He chose Aplysia, a sea slug with a few thousand unusually large neurons, precisely because it was simple enough to trace a whole circuit.',
    'The finding was that learning changes the strength of specific synapses — memory as a physical alteration at an identifiable location. He had left Vienna as a child in 1939.',
  ],
  doudna: [
    'CRISPR was found in bacterial immune systems: a way for a cell to store fragments of previous infections and cut matching sequences on sight.',
    'She and Charpentier showed it could be programmed to cut any chosen sequence. The 2020 prize was the first in the sciences awarded to two women alone.',
  ],
  katalin: [
    'She was demoted at Pennsylvania in 1995 rather than dismissed, and carried on with mRNA at a reduced salary because the grant applications kept failing.',
    'The modification she and Drew Weissman found — swapping in a modified nucleoside so the immune system tolerates the message — is the reason the vaccines of 2020 worked at all.',
  ],
  borlaug: [
    'He bred semi-dwarf wheat that put its energy into grain rather than stalk and could take heavy fertiliser without falling over. Mexican, then Indian and Pakistani yields roughly doubled.',
    'He is credited with averting famine on a scale that is usually written as a billion lives, and criticised for a model of agriculture that has since drawn down soil and aquifers.',
  ],
  ostrom: [
    'The standard theory said shared resources would inevitably be destroyed unless privatised or policed. She went and surveyed places where they had not been.',
    'Nepalese irrigation, Maine lobster grounds, Swiss alpine pasture: communities with their own rules, monitoring and sanctions, working for centuries. She was the first woman awarded in economic sciences.',
  ],
  feynman: [
    'He drew quantum electrodynamics as diagrams because he found the algebra unbearable. The diagrams became the standard working notation of particle physics.',
    'He described the prize as a nuisance and nearly declined it. He later served on the Challenger commission and demonstrated the O-ring failure with a glass of iced water on television.',
  ],
  geim: [
    'Graphene was lifted off a block of graphite with ordinary adhesive tape, in a Friday-evening session his laboratory kept for experiments with no defensible purpose.',
    'He had earlier levitated a live frog in a magnetic field, for which he received an Ig Nobel. He is the only person to hold both.',
  ],
  dirac: [
    'The equation he wrote in 1928 had solutions with negative energy. Rather than discard them he proposed they described a particle identical to the electron but oppositely charged.',
    'The positron was detected four years later. He was famously sparing in conversation, and initially wanted to decline the prize on the grounds that publicity would be worse than the honour.',
  ],
  loewi: [
    'He dreamt the design of the decisive experiment, woke, wrote it down, and found the note illegible in the morning. The following night the dream returned and he went to the laboratory at three.',
    'Fluid from a stimulated frog heart slowed a second, unstimulated heart. Nerves were signalling chemically, not electrically — a result obtained in a few hours after seventeen years of not knowing how to test it.',
  ],
  lorenz: [
    'Newly hatched greylag geese attached themselves to the first moving thing they encountered, which in his case was Lorenz. He then had geese for the rest of the season.',
    'Imprinting established that complex behaviour could have a fixed developmental window. His membership of the Nazi party, and papers written under it, remain part of the record.',
  ],
  thomson: [
    'He showed that cathode rays were particles far lighter than any atom — the first subatomic constituent, at a point when the atom was still supposed to be indivisible.',
    'Seven of his research assistants went on to win prizes of their own, as did his son, for demonstrating that the electron also behaves as a wave.',
  ],
  axel: [
    'He and Linda Buck found a family of around a thousand genes coding for olfactory receptors — roughly three per cent of the genome given over to smell alone.',
    'Each receptor cell expresses one receptor type and reports to one location in the olfactory bulb, which is how a few hundred working receptors resolve tens of thousands of distinguishable odours.',
  ],
  chain: [
    'He read Fleming\'s 1929 paper in Oxford a decade after publication and thought the chemistry was worth attempting. With Florey he purified enough penicillin to test on mice, then on a policeman.',
    'The supply ran out and the patient died. Production moved to the United States, and by 1944 there was enough for the invasion of Normandy.',
  ],
  pauling: [
    'The chemistry prize in 1954 was for the nature of the chemical bond, work that underlies most of structural chemistry and a good deal of molecular biology.',
    'The peace prize in 1962 was for the campaign against atmospheric nuclear testing. He is the only person to hold two unshared Nobel Prizes, and his passport had been withheld in between.',
  ],
  friedman: [
    'He and Anna Schwartz reread the Depression as a monetary contraction that the Federal Reserve could have prevented and instead deepened.',
    'The argument reorganised central banking for four decades and is still the standard reference point in every subsequent crisis, including by those who reject it.',
  ],
  ruska: [
    'Electrons have a far shorter wavelength than visible light, so a lens that focuses them can resolve far smaller things. He built the first such microscope in 1931, aged twenty-four.',
    'By 1933 it outperformed any optical instrument. He was awarded in 1986, fifty-five years later, at eighty — one of the longest intervals in the record.',
  ],
  betzig: [
    'The diffraction limit was supposed to be a hard ceiling: no optical microscope could resolve anything much finer than half the wavelength of light.',
    'The workaround was to light up individual molecules a few at a time, locate each precisely, and assemble the image from thousands of frames. He did much of the early thinking while out of academia entirely.',
  ],
  penrose: [
    'He showed in 1965, using topology rather than any particular symmetry assumption, that a collapsing star must form a singularity — black holes were a prediction of general relativity, not an exotic special case.',
    'He was awarded fifty-five years later, in the same year as the first direct measurements of the object at the centre of our own galaxy.',
  ],
  ernaux: [
    'She writes her own life as documentary evidence: a class background, an illegal abortion, a mother\'s dementia, recorded without the consolation of shaping them into a plot.',
    'The 2022 citation named "the courage and clinical acuity" of the method. She has described her position as that of an ethnologist of herself.',
  ],
  heisenberg: [
    'Uncertainty was not a limitation of apparatus but a property of the world: position and momentum could not simultaneously possess definite values.',
    'He led the German nuclear programme through the war, and what he was actually attempting there has been argued over ever since — including in a recorded conversation at Farm Hall on the night Hiroshima was announced.',
  ],
  haber: [
    'Fixing atmospheric nitrogen into ammonia made synthetic fertiliser possible and is estimated to sustain around half the world\'s population.',
    'He also directed the first large-scale chlorine attack at Ypres in 1915 and was present at the front for it. His 1918 prize remains the most contested the Academy has awarded.',
  ],
  wfp: [
    'The 2020 prize recognised an agency that moves food into places where the food supply itself has been made a weapon.',
    'The citation was explicit: hunger used deliberately as an instrument of war is a matter for peace policy, and therefore something that can be negotiated away rather than merely relieved.',
  ],
  manabe: [
    'His 1967 model coupled radiation with the vertical movement of air and produced a figure for how much the surface warms when carbon dioxide doubles.',
    'The projection has held for more than fifty years against everything measured since, which is a rare thing to be able to say about a climate model or any other.',
  ],
  gore: [
    'The 2007 prize was shared between the IPCC and a former vice-president, for work of very different kinds: assessment reports on one side, public argument on the other.',
    'The committee\'s reasoning was that the science had been settled for some time and the missing element was political attention — a judgement about the prize\'s own function as much as about climate.',
  ],
  ross: [
    'He dissected mosquitoes that had fed on malaria patients until he found the parasite in the stomach wall of one, on 20 August 1897.',
    'He wrote a poem that night about God putting the murdering death in his hand. He spent much of his later career in disputes over priority with the Italian school working on the same problem.',
  ],
  ressa: [
    'She co-founded Rappler and reported on the killings carried out under the Philippine drug war, accumulating arrest warrants and criminal charges at a rate that made continued publication itself the story.',
    'The 2021 prize was shared with Dmitry Muratov of Novaya Gazeta — the first for journalists since 1935, when the recipient was in a German camp.',
  ],
  sherrington: [
    'He named the synapse, established the reflex arc as an integrative rather than a simple relay mechanism, and mapped the reciprocal inhibition that lets one muscle relax as its opposite contracts.',
    'He also described the waking brain as "an enchanted loom where millions of flashing shuttles weave a dissolving pattern", which has outlived most of the physiology around it.',
  ],
}

const events = {
  radioactivity: [
    'Becquerel expected sunlight to be involved. Paris was overcast, the apparatus went in a drawer, and the plate was fogged regardless — the uranium was doing it by itself.',
    'Marie and Pierre Curie took the phenomenon, named it, and spent four years extracting the two new elements responsible. The field it opened runs directly to 1945.',
  ],
  microorganisms: [
    'Within a generation, illness stopped being a matter of constitution and bad air and became a chain of cause and effect with an organism at one end.',
    'Sanitation, sterilisation, antisepsis and the first targeted treatments followed. It is the single largest change in human life expectancy on record, and most of it happened before antibiotics existed.',
  ],
  'modern-physics': [
    'Between roughly 1900 and 1927 the classical picture came apart: energy arrived in packets, space and time turned out to depend on the observer, and the atom acquired an interior.',
    'Almost every step was recognised in Stockholm within a decade or two, which is unusually fast, and almost every one was resisted first by someone who had helped produce it.',
  ],
  fertilizers: [
    'Ammonia synthesised from atmospheric nitrogen removed the hard ceiling agriculture had been operating under since it began.',
    'The same plants supplied the explosives of two world wars, and the runoff from a century of application is now a problem in every major river system.',
  ],
  'world-war-i': [
    'Industrial casualties, gas at Ypres, and a prize suspended in several categories for want of anything to award it to.',
    'The peace prize of the period went largely to relief organisations. Two future laureates, Addams and Balch, spent the war being dismissed and surveilled for arguing that it should stop.',
  ],
  insulin: [
    'A diagnosis that killed children within months became a condition that could be managed, in the space of about eighteen months.',
    'The first patient treated in January 1922 was fourteen years old and had been reduced to sixty-five pounds. The patent went to the University of Toronto for one dollar.',
  ],
  antibiotics: [
    'Fleming observed the effect in 1928 and published to little response. The decade that followed was chemistry: purification, stabilisation, and eventually manufacture at scale.',
    'The first patient treated in 1941 improved and then died when the supply ran out. Production had to be moved to the United States before it could reach a war.',
  ],
  depression: [
    'The crash made macroeconomics into something governments were obliged to have a position on, and gave the discipline its permanent test case.',
    'Every subsequent theory of the business cycle has had to explain 1929 first. Friedman\'s monetary reading, forty years later, reorganised central banking around the answer.',
  ],
  nazism: [
    'German laureates were forbidden by decree to accept the prize after 1936. Others were stripped of citizenship, dismissed from their posts, or left before they could be.',
    'The scientific centre of gravity moved from central Europe to Britain and the United States within a decade, and never moved back.',
  ],
  holocaust: [
    'Two laureates\' gold medals were dissolved in aqua regia in Niels Bohr\'s laboratory in Copenhagen so that the occupying authorities would find only a jar of liquid on a shelf.',
    'The gold was recovered after the war and the medals recast. Most of what the period destroyed could not be.',
  ],
  'atomic-age': [
    'Hiroshima and Nagasaki gave physics a permanent moral problem, acquired in the space of a week and never subsequently put down.',
    'A significant proportion of the laureates who had built the field spent the rest of their careers campaigning against its application.',
  ],
  'human-rights': [
    'The Universal Declaration set out, for the first time, a list of things that could be claimed by a person against their own government.',
    'From this point the peace prize increasingly went to institutions rather than individuals, on the reasoning that the work outlasts anyone doing it.',
  ],
  dna: [
    'Structure implied mechanism the moment it was clear: a molecule built as two complementary strands is a molecule that can be copied.',
    'The model was assembled in Cambridge from data gathered in London, including a diffraction image obtained without its author\'s knowledge.',
  ],
  'carbon-14': [
    'A clock hidden inside every once-living thing: carbon-14 accumulates during life and decays at a fixed rate afterwards.',
    'Archaeology and geology could suddenly agree on a number. Several chronologies that had been argued about for a century were settled, and a few were badly disrupted.',
  ],
  'nuclear-arms': [
    'The 1963 partial test ban ended atmospheric testing, and was argued for most effectively by the physicists who had built the devices.',
    'Pauling\'s campaign, and the strontium-90 measurements in children\'s teeth that supported it, did more than any diplomatic channel to make the case in public.',
  ],
  'green-revolution': [
    'Semi-dwarf, fertiliser-responsive grain roughly doubled yields across Mexico, India and Pakistan in under two decades.',
    'The peace prize went to a plant breeder, on the reasoning that famine is a precondition of conflict. The soil and water costs arrived later and are still being counted.',
  ],
  vaccines: [
    'Smallpox was declared eradicated in 1980 — the first disease deliberately removed from the world, and so far one of only two.',
    'The campaign worked by ring vaccination rather than universal coverage: find each case, immunise everyone around it, and let the chain of transmission close.',
  ],
  cosmology: [
    'The cosmic microwave background is the afterglow of the early universe, first heard as an unexplained hiss and later mapped in detail.',
    'The variations in it are the seeds of every galaxy. Cosmology became a measuring science rather than a speculative one within about thirty years.',
  ],
  genome: [
    'Three billion letters, sequenced and published, ahead of schedule and in the middle of a race between a public consortium and a private company.',
    'The reading was finished in 2003. The number of genes turned out to be about a fifth of what had been predicted, which was the first indication of how much of the work is done elsewhere.',
  ],
  climate: [
    'The 2007 prize treated accumulated measurement as a matter for peace policy, which was either a category error or the entire point.',
    'The science had been stable for some years. What the committee identified as missing was public attention, and it awarded the prize accordingly.',
  ],
  crispr: [
    'A bacterial defence mechanism — store a fragment of the last infection, cut anything matching it — turned into a programmable tool for editing any chosen sequence.',
    'It was cheap and it worked immediately, which is why the debate about germline editing arrived several years before anyone had agreed how to have it.',
  ],
  mrna: [
    'Thirty years of rejected grant applications, a demotion, and a modification to a single nucleoside that stopped the immune system destroying the message on arrival.',
    'Deployed globally within eleven months of the sequence being published. The recognition followed in 2023, by which point the technology had been administered billions of times.',
  ],
}

const artifacts = {
  medal: [
    'A 175-gram disc of 18-carat recycled gold, Alfred Nobel in profile on the obverse, a design specific to each awarding institution on the reverse.',
    'Two were dissolved in acid in Copenhagen in 1940 to keep them out of the hands of the occupying authorities, and recast from the recovered gold after the war.',
  ],
  will: [
    'Four handwritten pages, signed in Paris in 1895, leaving the bulk of an armaments fortune to prizes for those who had conferred the greatest benefit on humankind.',
    'The family contested it, the institutions named had not been consulted, and the Swedish state very nearly took the money instead. The entire prize rests on the document surviving that.',
  ],
  plate: [
    'The original culture dish from 1928, with the mould colony still visible and the cleared ring around it where the staphylococcus had died.',
    'It was photographed at the time, preserved, and has been re-photographed for a century. What it records is a moment before anyone knew what to do with it.',
  ],
  notebook: [
    'Marie Curie\'s laboratory notebooks, still measurably radioactive, held in lead-lined boxes at the Bibliothèque nationale.',
    'Readers sign a liability waiver and wear protective equipment. The half-life of radium-226 is about sixteen hundred years, so this arrangement is effectively permanent.',
  ],
  photo51: [
    'An X-ray diffraction image of the B form of DNA, taken by Raymond Gosling under Rosalind Franklin\'s direction in 1952. The cross pattern indicates a helix; the spacing gives its dimensions.',
    'It was shown to Watson without her knowledge. She died in 1958, four years before the prize, and the question of what she would have been awarded has stayed open ever since.',
  ],
  banquet: [
    'Stockholm City Hall, 10 December, thirteen hundred guests. The menu is chosen months ahead and kept secret until the day itself.',
    'The dessert is always ice cream, delivered by a procession down the staircase. It is the one part of the proceedings the Academy has never been asked to justify.',
  ],
}



// The invitation shown on a theme, in place of any written narrative.
export function ctaFor(id) {
  return tr(themes[id]?.cta ?? 'Follow the connections and see where they lead', 'themes', id, 'cta')
}

const SECTION = { person: 'laureates', milestone: 'milestones', artifact: 'artifacts' }

export function narrativeFor(kind, id, fallback) {
  const credit = ui('credit')
  if (kind === 'theme') {
    const theme = themes[id]
    if (theme) return { standfirst: theme.standfirst, body: theme.body, caption: theme.caption, credit }
  }
  const table = kind === 'person' ? people : kind === 'milestone' ? events : kind === 'artifact' ? artifacts : null
  const paras = table?.[id]
  if (!paras) return { standfirst: fallback, body: [], caption: null, credit }
  return { standfirst: fallback, body: tr(paras, SECTION[kind], id, 'narrative'), caption: null, credit }
}
