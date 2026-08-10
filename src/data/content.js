import { tr } from '../i18n'

export const PALETTE = {
  blue: '#7AA6C8',
  green: '#A6BE6C',
  gold: '#D8B45C',
  sand: '#DCD4C0',
  grey: '#C2C2C2',
  peach: '#F2C4A9',
  ink: '#141414',
}

// The atlas is black and white: nothing about a circle's fill encodes what it
// is. Type is carried by the tag on the focal node and by the labels, never by
// colour. kindColor is kept as the single seam so a palette could return.
export const KIND_LABELS = {
  theme: 'Theme',
  story: 'Story',
  milestone: 'Milestone',
  person: 'Laureate',
  artifact: 'Artifact',
}

export const kindColor = () => PALETTE.ink

export const FIELDS = [
  { id: 'physics', label: 'Physics' },
  { id: 'chemistry', label: 'Chemistry' },
  { id: 'medicine', label: 'Physiology or Medicine' },
  { id: 'literature', label: 'Literature' },
  { id: 'peace', label: 'Peace' },
  { id: 'economics', label: 'Economic Sciences' },
]

export const THEMES = [
  { id: 'chance', label: 'Chance', weight: 3, blurb: 'The prepared mind meets the unplanned moment. Mould drifts onto a forgotten dish; a screen glows when it should be dark.', laureates: ['fleming', 'rontgen', 'becquerel'], milestones: ['antibiotics', 'radioactivity'], related: ['accident', 'observation', 'patience'] },
  { id: 'creativity', label: 'Creativity', weight: 3, blurb: 'Seeing a shape nobody has drawn yet — in a molecule, a sentence, a proof.', laureates: ['einstein', 'morrison', 'curie'], milestones: ['modern-physics'], related: ['imagination', 'play', 'dreams'] },
  { id: 'revolt', label: 'Revolt', weight: 2, blurb: 'Refusing the settled account. Every paradigm was once an act of disobedience.', laureates: ['einstein', 'mccli', 'sakharov'], milestones: ['modern-physics', 'human-rights'], related: ['courage', 'doubt', 'outsiders'] },
  { id: 'accident', label: 'Accident', weight: 2, blurb: 'A spill, a slip, a contaminated sample. Discovery hidden inside a mistake.', laureates: ['fleming', 'rontgen'], milestones: ['antibiotics'], related: ['chance', 'observation'] },
  { id: 'invisible-worlds', label: 'Invisible Worlds', weight: 3, blurb: 'Everything happening beneath the threshold of the eye — microbes, atoms, radiation, genes.', laureates: ['rontgen', 'curie', 'koch', 'crick'], milestones: ['microorganisms', 'atomic-age', 'dna'], related: ['observation', 'scale', 'instruments'] },
  { id: 'courage', label: 'Courage', weight: 2, blurb: 'Standing in the open when it costs something. Speech, exile, prison, silence broken.', laureates: ['addams', 'sakharov', 'suu-kyi', 'yousafzai'], milestones: ['human-rights', 'nazism'], related: ['revolt', 'conscience', 'women-rights'] },
  { id: 'play', label: 'Play', weight: 2, blurb: 'Serious work that looks like fiddling. Toys, puzzles and tinkering that turn into physics.', laureates: ['feynman', 'geim'], milestones: ['modern-physics'], related: ['creativity', 'imagination', 'youth'] },
  { id: 'solitude', label: 'Solitude', weight: 2, blurb: 'Long stretches alone with a problem — the quiet that most breakthroughs are made of.', laureates: ['mccli', 'dirac', 'morrison'], milestones: [], related: ['persistence', 'doubt'] },
  { id: 'dreams', label: 'Dreams', weight: 3, blurb: 'Answers arriving sideways, in sleep or reverie, when the reasoning mind lets go.', laureates: ['loewi', 'marquez'], milestones: [], related: ['imagination', 'creativity'] },
  { id: 'youth', label: 'Youth', weight: 1, blurb: 'Work done absurdly early. Bragg was 25. Malala was 17.', laureates: ['bragg', 'yousafzai'], milestones: ['modern-physics'], related: ['play', 'mentoring'] },
  { id: 'collaboration', label: 'Collaboration', weight: 3, blurb: 'Prizes name three people. Discoveries rarely have so few authors.', laureates: ['crick', 'curie', 'banting'], milestones: ['dna', 'insulin'], related: ['mentoring', 'invisible-hands'] },
  { id: 'persistence', label: 'Persistence', weight: 2, blurb: 'Tonnes of ore reduced to a decigram of radium. The unglamorous middle of the story.', laureates: ['curie', 'mccli', 'katalin'], milestones: ['radioactivity', 'mrna'], related: ['solitude', 'testing', 'patience'] },
  { id: 'observation', label: 'Observation', weight: 3, blurb: 'Looking harder at what everyone else has already looked at.', laureates: ['koch', 'fleming', 'mccli', 'lorenz'], milestones: ['microorganisms'], related: ['invisible-worlds', 'instruments', 'senses-behaviour'] },
  { id: 'imagination', label: 'Imagination', weight: 3, blurb: 'Riding a beam of light. Picturing a world you cannot yet measure.', laureates: ['einstein', 'morrison', 'marquez'], milestones: ['modern-physics'], related: ['creativity', 'dreams', 'storytelling'] },
  { id: 'mentoring', label: 'Mentoring', weight: 2, blurb: 'Lineages of teachers and students; laboratories that keep producing laureates.', laureates: ['bragg', 'curie', 'thomson'], milestones: [], related: ['collaboration', 'youth'] },
  { id: 'testing', label: 'Testing', weight: 1, blurb: 'The discipline of trying to prove yourself wrong, thousands of times.', laureates: ['banting', 'katalin', 'fleming'], milestones: ['insulin'], related: ['persistence', 'doubt'] },
  { id: 'senses-behaviour', label: 'Senses and Behaviour', weight: 3, blurb: 'How bodies and brains take in a world — sight, smell, pain, instinct, memory.', laureates: ['pavlov', 'kandel', 'axel'], milestones: [], related: ['observation', 'consciousness'] },
  { id: 'healthcare', label: 'Healthcare', weight: 3, blurb: 'From ward to clinic: the slow translation of laboratory findings into ordinary survival.', laureates: ['banting', 'fleming', 'katalin'], milestones: ['insulin', 'antibiotics', 'vaccines', 'mrna'], related: ['microorganisms-t', 'invisible-worlds'] },
  { id: 'the-atomic-age', label: 'The Atomic Age', weight: 2, blurb: 'The same physics that lit cities also ended two of them.', laureates: ['curie', 'fermi', 'einstein'], milestones: ['atomic-age', 'nuclear-arms'], related: ['arms-defense', 'conscience', 'invisible-worlds'] },
  { id: 'antibiotics-t', label: 'Antibiotics', weight: 2, blurb: 'A decade between the mould on the dish and the drug in the vial.', laureates: ['fleming', 'chain'], milestones: ['antibiotics'], related: ['healthcare', 'chance'] },
  { id: 'genes', label: 'Genes', weight: 1, blurb: 'Instructions written in four letters, jumping, folding, mutating.', laureates: ['crick', 'mccli', 'doudna'], milestones: ['dna', 'crispr'], related: ['invisible-worlds', 'code'] },
  { id: 'women-rights', label: "Women's Rights", weight: 1, blurb: 'Suffrage, settlement houses, schooling — and the laureates who were kept from laboratories.', laureates: ['addams', 'balch', 'yousafzai', 'curie'], milestones: ['human-rights'], related: ['courage', 'outsiders'] },
  { id: 'arms-defense', label: 'Arms and Defense', weight: 2, blurb: 'Disarmament treaties written by people who helped build the weapons.', laureates: ['sakharov', 'pauling'], milestones: ['nuclear-arms', 'world-war-i'], related: ['the-atomic-age', 'conscience', 'peacebuilding'] },
  { id: 'economic-history', label: 'Economic History and Business Cycles', weight: 2, blurb: 'Booms, crashes and the models that failed to see them coming.', laureates: ['friedman', 'ostrom'], milestones: ['depression'], related: ['commons', 'inequality'] },
  { id: 'conscience', label: 'Conscience', weight: 2, blurb: 'Scientists who campaigned against their own creations.', laureates: ['sakharov', 'pauling', 'einstein'], milestones: ['nuclear-arms'], related: ['courage', 'arms-defense', 'the-atomic-age'] },
  { id: 'exile', label: 'Exile', weight: 2, blurb: 'Passports withdrawn, laboratories abandoned, work continued elsewhere.', laureates: ['einstein', 'fermi', 'brodsky'], milestones: ['nazism', 'holocaust'], related: ['outsiders', 'courage'] },
  { id: 'outsiders', label: 'Outsiders', weight: 2, blurb: 'Amateurs, clerks, immigrants and unpaid assistants who changed the field they were shut out of.', laureates: ['einstein', 'mccli', 'ernaux', 'katalin'], milestones: [], related: ['revolt', 'exile', 'persistence'] },
  { id: 'instruments', label: 'Instruments', weight: 2, blurb: 'You cannot see a thing until someone builds the thing that sees it.', laureates: ['rontgen', 'ruska', 'betzig'], milestones: ['microorganisms', 'modern-physics'], related: ['invisible-worlds', 'observation', 'scale'] },
  { id: 'scale', label: 'Scale', weight: 1, blurb: 'From quarks to galaxies — the vertigo of very small and very large numbers.', laureates: ['einstein', 'penrose'], milestones: ['modern-physics', 'cosmology'], related: ['invisible-worlds', 'instruments'] },
  { id: 'storytelling', label: 'Storytelling', weight: 3, blurb: 'Literature laureates who rewrote whose life counts as a story.', laureates: ['morrison', 'marquez', 'brodsky', 'ernaux'], milestones: [], related: ['imagination', 'memory', 'language'] },
  { id: 'memory', label: 'Memory', weight: 2, blurb: 'What a nerve cell keeps; what a country agrees to forget.', laureates: ['kandel', 'morrison', 'brodsky'], milestones: ['holocaust'], related: ['senses-behaviour', 'storytelling', 'truth'] },
  { id: 'language', label: 'Language', weight: 1, blurb: 'Prizes given for sentences — and for the languages a prize never reads.', laureates: ['morrison', 'marquez', 'ernaux'], milestones: [], related: ['storytelling', 'translation'] },
  { id: 'doubt', label: 'Doubt', weight: 2, blurb: 'The productive kind: uncertainty as a working method rather than a failure.', laureates: ['einstein', 'heisenberg'], milestones: ['modern-physics'], related: ['revolt', 'testing', 'solitude'] },
  { id: 'patience', label: 'Patience', weight: 1, blurb: 'Forty years between a finding and its recognition. McClintock waited.', laureates: ['mccli', 'katalin'], milestones: ['crispr', 'mrna'], related: ['persistence', 'chance'] },
  { id: 'hunger', label: 'Hunger', weight: 2, blurb: 'Nitrogen out of air; dwarf wheat; food aid convoys. Also the famines these did not stop.', laureates: ['haber', 'borlaug', 'wfp'], milestones: ['fertilizers', 'green-revolution'], related: ['healthcare', 'commons'] },
  { id: 'commons', label: 'The Commons', weight: 1, blurb: 'Shared fisheries, forests and atmospheres, and who is trusted to govern them.', laureates: ['ostrom'], milestones: ['climate'], related: ['economic-history', 'climate-t'] },
  { id: 'climate-t', label: 'Climate', weight: 2, blurb: 'A century of measurements before the graph became a politics.', laureates: ['manabe', 'gore'], milestones: ['climate'], related: ['commons', 'conscience'] },
  { id: 'peacebuilding', label: 'Peacebuilding', weight: 2, blurb: 'Settlement houses, mediation tables, refugee agencies — slow work with no clean ending.', laureates: ['addams', 'balch', 'suu-kyi'], milestones: ['human-rights', 'world-war-i'], related: ['courage', 'arms-defense', 'women-rights'] },
  { id: 'microorganisms-t', label: 'Microorganisms and Diseases', weight: 3, blurb: 'The germ theory that turned illness from fate into cause and effect.', laureates: ['koch', 'fleming', 'ross'], milestones: ['microorganisms', 'vaccines'], related: ['invisible-worlds', 'healthcare'] },
  { id: 'code', label: 'Code', weight: 1, blurb: 'Nature as something written — and, eventually, something edited.', laureates: ['crick', 'doudna'], milestones: ['dna', 'crispr'], related: ['genes', 'invisible-worlds'] },
  { id: 'truth', label: 'Truth', weight: 2, blurb: 'Journalists and dissidents awarded for refusing an official version.', laureates: ['sakharov', 'ressa'], milestones: ['human-rights'], related: ['courage', 'memory', 'conscience'] },
  { id: 'consciousness', label: 'Consciousness', weight: 1, blurb: 'The hardest object of study is the one doing the studying.', laureates: ['kandel', 'sherrington'], milestones: [], related: ['senses-behaviour', 'memory'] },
  { id: 'translation', label: 'Translation', weight: 1, blurb: 'How a prize decided in Swedish reaches a reader in any other language.', laureates: ['brodsky', 'marquez'], milestones: [], related: ['language', 'storytelling'] },
  { id: 'inequality', label: 'Inequality', weight: 1, blurb: 'Who receives prizes, who receives treatment, and who is counted in the data.', laureates: ['ostrom', 'addams'], milestones: ['depression'], related: ['economic-history', 'women-rights'] },
  { id: 'invisible-hands', label: 'Invisible Hands', weight: 2, blurb: 'Technicians, spouses, students and computers — the uncredited labour inside every citation.', laureates: ['crick', 'mccli', 'curie'], milestones: [], related: ['collaboration', 'outsiders'] },
]

export const LAUREATES = [
  { id: 'curie', name: 'Marie Curie', field: 'physics', year: 1903, country: 'Poland', blurb: 'Radioactivity, then radium and polonium — the only person awarded in two different sciences.', themes: ['persistence', 'invisible-worlds', 'the-atomic-age', 'women-rights', 'invisible-hands'] },
  { id: 'einstein', name: 'Albert Einstein', field: 'physics', year: 1921, country: 'Germany', blurb: 'Awarded not for relativity but for the photoelectric effect — the paper that opened quantum theory.', themes: ['imagination', 'revolt', 'exile', 'doubt', 'scale'] },
  { id: 'rontgen', name: 'Wilhelm Röntgen', field: 'physics', year: 1901, country: 'Germany', blurb: 'A screen glowing across a darkened room; the first Nobel Prize in Physics, and the first X-ray.', themes: ['chance', 'accident', 'instruments', 'invisible-worlds'] },
  { id: 'becquerel', name: 'Henri Becquerel', field: 'physics', year: 1903, country: 'France', blurb: 'Cloudy weather, a drawer, and uranium salts that fogged a plate with no sunlight at all.', themes: ['chance', 'invisible-worlds'] },
  { id: 'fleming', name: 'Alexander Fleming', field: 'medicine', year: 1945, country: 'United Kingdom', blurb: 'An unwashed culture plate, a summer holiday, and a ring of dead bacteria around a mould.', themes: ['chance', 'accident', 'observation', 'antibiotics-t', 'healthcare'] },
  { id: 'koch', name: 'Robert Koch', field: 'medicine', year: 1905, country: 'Germany', blurb: 'Postulates that made contagion provable: this organism, this disease, every time.', themes: ['observation', 'microorganisms-t', 'invisible-worlds'] },
  { id: 'mccli', name: 'Barbara McClintock', field: 'medicine', year: 1983, country: 'United States', blurb: 'Jumping genes in maize, described in 1948 and believed roughly thirty years later.', themes: ['solitude', 'persistence', 'patience', 'outsiders', 'genes', 'revolt'] },
  { id: 'crick', name: 'Francis Crick', field: 'medicine', year: 1962, country: 'United Kingdom', blurb: 'The double helix — built on Franklin\'s diffraction images, which the prize did not name.', themes: ['collaboration', 'genes', 'code', 'invisible-worlds'] },
  { id: 'banting', name: 'Frederick Banting', field: 'medicine', year: 1923, country: 'Canada', blurb: 'Insulin isolated in a borrowed summer laboratory; the patent sold for one dollar.', themes: ['testing', 'collaboration', 'healthcare'] },
  { id: 'addams', name: 'Jane Addams', field: 'peace', year: 1931, country: 'United States', blurb: 'Hull House, and a pacifism that made her the most admired and then most suspected woman in America.', themes: ['courage', 'women-rights', 'peacebuilding', 'inequality'] },
  { id: 'balch', name: 'Emily Greene Balch', field: 'peace', year: 1946, country: 'United States', blurb: 'Dismissed from her professorship for opposing the First World War; awarded thirty years afterwards.', themes: ['courage', 'women-rights', 'peacebuilding'] },
  { id: 'sakharov', name: 'Andrei Sakharov', field: 'peace', year: 1975, country: 'Russia', blurb: 'Designed the Soviet hydrogen bomb, then spent his life campaigning against it.', themes: ['conscience', 'courage', 'arms-defense', 'truth', 'revolt'] },
  { id: 'suu-kyi', name: 'Aung San Suu Kyi', field: 'peace', year: 1991, country: 'Myanmar', blurb: 'Awarded under house arrest — and a reminder that a prize is given at one moment, not for all time.', themes: ['courage', 'peacebuilding'] },
  { id: 'yousafzai', name: 'Malala Yousafzai', field: 'peace', year: 2014, country: 'Pakistan', blurb: 'Seventeen years old: the youngest laureate in any category.', themes: ['courage', 'youth', 'women-rights'] },
  { id: 'morrison', name: 'Toni Morrison', field: 'literature', year: 1993, country: 'United States', blurb: 'Novels that put the interior life of Black America at the centre of the American story.', themes: ['storytelling', 'memory', 'language', 'imagination', 'creativity'] },
  { id: 'marquez', name: 'Gabriel García Márquez', field: 'literature', year: 1982, country: 'Colombia', blurb: 'A continent\'s history told as though the impossible were simply local weather.', themes: ['storytelling', 'imagination', 'language', 'translation'] },
  { id: 'brodsky', name: 'Joseph Brodsky', field: 'literature', year: 1987, country: 'Russia', blurb: 'Tried for "social parasitism", exiled, and awarded for poems written in two languages.', themes: ['exile', 'storytelling', 'memory', 'translation'] },
  { id: 'libby', name: 'Willard Libby', field: 'chemistry', year: 1960, country: 'United States', blurb: 'Radiocarbon dating — a clock hidden inside every once-living thing.', themes: ['invisible-worlds', 'instruments', 'the-atomic-age'] },
  { id: 'fermi', name: 'Enrico Fermi', field: 'physics', year: 1938, country: 'Italy', blurb: 'Collected the prize in Stockholm and never returned home; the first reactor followed four years later.', themes: ['the-atomic-age', 'exile'] },
  { id: 'bragg', name: 'Lawrence Bragg', field: 'physics', year: 1915, country: 'Australia', blurb: 'Twenty-five years old, sharing the prize with his father, for reading crystals with X-rays.', themes: ['youth', 'mentoring', 'instruments'] },
  { id: 'pavlov', name: 'Ivan Pavlov', field: 'medicine', year: 1904, country: 'Russia', blurb: 'Digestion, awarded — and conditioning, the work everyone actually remembers.', themes: ['senses-behaviour', 'observation'] },
  { id: 'kandel', name: 'Eric Kandel', field: 'medicine', year: 2000, country: 'Austria', blurb: 'Traced memory to the strengthening of individual synapses, in a sea slug.', themes: ['memory', 'senses-behaviour', 'consciousness'] },
  { id: 'doudna', name: 'Jennifer Doudna', field: 'chemistry', year: 2020, country: 'United States', blurb: 'CRISPR–Cas9: a bacterial immune system turned into an editing tool.', themes: ['genes', 'code', 'conscience'] },
  { id: 'katalin', name: 'Katalin Karikó', field: 'medicine', year: 2023, country: 'Hungary', blurb: 'Demoted and defunded for decades over mRNA; the basis of a vaccine given billions of times.', themes: ['persistence', 'patience', 'outsiders', 'healthcare', 'testing'] },
  { id: 'borlaug', name: 'Norman Borlaug', field: 'peace', year: 1970, country: 'United States', blurb: 'Semi-dwarf wheat and the Green Revolution — credited with a billion lives, and with a debt of soil.', themes: ['hunger', 'commons'] },
  { id: 'ostrom', name: 'Elinor Ostrom', field: 'economics', year: 2009, country: 'United States', blurb: 'Showed communities governing shared resources well, against a theory that said they could not.', themes: ['commons', 'economic-history', 'inequality'] },
  { id: 'feynman', name: 'Richard Feynman', field: 'physics', year: 1965, country: 'United States', blurb: 'Quantum electrodynamics, drawn as pictures — and a lifelong refusal to be solemn about it.', themes: ['play', 'creativity', 'imagination'] },
  { id: 'geim', name: 'Andre Geim', field: 'physics', year: 2010, country: 'Netherlands', blurb: 'Graphene lifted off graphite with sticky tape. The only person to hold both a Nobel and an Ig Nobel.', themes: ['play', 'instruments'] },
  { id: 'dirac', name: 'Paul Dirac', field: 'physics', year: 1933, country: 'United Kingdom', blurb: 'Predicted antimatter from an equation alone, and spoke as sparingly as he wrote.', themes: ['solitude', 'doubt', 'scale'] },
  { id: 'loewi', name: 'Otto Loewi', field: 'medicine', year: 1936, country: 'Austria', blurb: 'Dreamt the frog-heart experiment twice; the second time he went straight to the laboratory at 3am.', themes: ['dreams', 'senses-behaviour'] },
  { id: 'lorenz', name: 'Konrad Lorenz', field: 'medicine', year: 1973, country: 'Austria', blurb: 'Founded ethology by watching geese decide he was their mother.', themes: ['observation', 'senses-behaviour'] },
  { id: 'thomson', name: 'J. J. Thomson', field: 'physics', year: 1906, country: 'United Kingdom', blurb: 'Discovered the electron; seven of his research assistants went on to win their own prizes.', themes: ['mentoring', 'invisible-worlds', 'instruments'] },
  { id: 'axel', name: 'Richard Axel', field: 'medicine', year: 2004, country: 'United States', blurb: 'Mapped the olfactory receptor genes — roughly three per cent of the genome devoted to smell.', themes: ['senses-behaviour', 'genes'] },
  { id: 'chain', name: 'Ernst Chain', field: 'medicine', year: 1945, country: 'Germany', blurb: 'The chemist who turned Fleming\'s observation into a purified, usable drug.', themes: ['antibiotics-t', 'exile', 'healthcare'] },
  { id: 'pauling', name: 'Linus Pauling', field: 'chemistry', year: 1954, country: 'United States', blurb: 'Chemistry in 1954, Peace in 1962 — the only person with two unshared Nobel Prizes.', themes: ['conscience', 'arms-defense', 'the-atomic-age'] },
  { id: 'friedman', name: 'Milton Friedman', field: 'economics', year: 1976, country: 'United States', blurb: 'Reread the Depression as a monetary failure, and reshaped central banking for forty years.', themes: ['economic-history'] },
  { id: 'ruska', name: 'Ernst Ruska', field: 'physics', year: 1986, country: 'Germany', blurb: 'Built the electron microscope in 1931; awarded fifty-five years later, at eighty.', themes: ['instruments', 'invisible-worlds', 'patience'] },
  { id: 'betzig', name: 'Eric Betzig', field: 'chemistry', year: 2014, country: 'United States', blurb: 'Broke the diffraction limit — light microscopes that resolve single molecules.', themes: ['instruments', 'invisible-worlds'] },
  { id: 'penrose', name: 'Roger Penrose', field: 'physics', year: 2020, country: 'United Kingdom', blurb: 'Proved that black holes are a prediction of general relativity, not an exotic accident.', themes: ['scale', 'imagination'] },
  { id: 'ernaux', name: 'Annie Ernaux', field: 'literature', year: 2022, country: 'France', blurb: 'Autobiography stripped of consolation: class, memory and the female body as documentary evidence.', themes: ['storytelling', 'memory', 'language', 'outsiders'] },
  { id: 'heisenberg', name: 'Werner Heisenberg', field: 'physics', year: 1932, country: 'Germany', blurb: 'Uncertainty as a law of nature — and a war spent leading the German nuclear programme.', themes: ['doubt', 'conscience', 'the-atomic-age'] },
  { id: 'haber', name: 'Fritz Haber', field: 'chemistry', year: 1918, country: 'Germany', blurb: 'Bread from air, and chlorine gas at Ypres. The most contested prize ever awarded.', themes: ['hunger', 'conscience', 'arms-defense'] },
  { id: 'wfp', name: 'World Food Programme', field: 'peace', year: 2020, country: 'Italy', blurb: 'Awarded for treating hunger as a weapon of war that can be disarmed.', themes: ['hunger', 'peacebuilding', 'commons'] },
  { id: 'manabe', name: 'Syukuro Manabe', field: 'physics', year: 2021, country: 'Japan', blurb: 'Modelled carbon dioxide against global temperature in 1967; the projection has held.', themes: ['climate-t', 'scale'] },
  { id: 'gore', name: 'Al Gore and the IPCC', field: 'peace', year: 2007, country: 'United States', blurb: 'A shared prize for turning accumulated climate data into public argument.', themes: ['climate-t', 'commons', 'truth'] },
  { id: 'ross', name: 'Ronald Ross', field: 'medicine', year: 1902, country: 'United Kingdom', blurb: 'Found the malaria parasite in a mosquito\'s stomach, and wrote a poem about it that night.', themes: ['microorganisms-t', 'observation', 'healthcare'] },
  { id: 'ressa', name: 'Maria Ressa', field: 'peace', year: 2021, country: 'Philippines', blurb: 'Reporting under a barrage of arrest warrants; the first Filipino laureate.', themes: ['truth', 'courage', 'women-rights'] },
  { id: 'shirakawa', name: 'Hideki Shirakawa', field: 'chemistry', year: 2000, country: 'Japan', blurb: 'A catalyst added at a thousand times the intended concentration produced a plastic that conducts electricity.', themes: ['accident', 'chance', 'testing', 'instruments'] },
  { id: 'penzias', name: 'Arno Penzias', field: 'physics', year: 1978, country: 'United States', blurb: 'Spent a year trying to eliminate a hiss in an antenna that turned out to be the afterglow of the early universe.', themes: ['chance', 'instruments', 'scale', 'observation'] },
  { id: 'sherrington', name: 'Charles Sherrington', field: 'medicine', year: 1932, country: 'United Kingdom', blurb: 'Named the synapse and described the nervous system as an "enchanted loom".', themes: ['consciousness', 'senses-behaviour'] },
]

export const MILESTONES = [
  { id: 'radioactivity', year: 1896, title: 'Radioactivity', blurb: 'Becquerel\'s fogged plate opens a field that Marie and Pierre Curie will name.', weight: 2, themes: ['chance', 'invisible-worlds', 'persistence'], laureates: ['becquerel', 'curie'] },
  { id: 'microorganisms', year: 1900, title: 'Microorganisms and Diseases', blurb: 'Germ theory reorganises medicine: sanitation, sterilisation and the first targeted cures.', weight: 3, themes: ['microorganisms-t', 'observation', 'invisible-worlds'], laureates: ['koch'] },
  { id: 'modern-physics', year: 1905, title: 'Modern Physics', blurb: 'Quanta, relativity and the atom: the classical picture comes apart in twenty years.', weight: 4, themes: ['revolt', 'imagination', 'doubt', 'scale'], laureates: ['einstein', 'bragg'] },
  { id: 'fertilizers', year: 1913, title: 'Artificial Fertilizers', blurb: 'Nitrogen pulled from air feeds half the planet — and supplies the explosives of two wars.', weight: 2, themes: ['hunger', 'conscience'], laureates: [] },
  { id: 'world-war-i', year: 1914, title: 'World War I', blurb: 'Gas, industrial casualties, and a prize suspended in several categories.', weight: 4, themes: ['arms-defense', 'peacebuilding', 'conscience'], laureates: ['addams', 'balch'] },
  { id: 'insulin', year: 1921, title: 'Insulin', blurb: 'A fatal diagnosis becomes a managed condition within eighteen months.', weight: 2, themes: ['healthcare', 'testing', 'collaboration'], laureates: ['banting'] },
  { id: 'antibiotics', year: 1928, title: 'Antibiotics', blurb: 'Penicillin observed; then a decade of chemistry before a single patient is treated.', weight: 3, themes: ['chance', 'antibiotics-t', 'healthcare'], laureates: ['fleming'] },
  { id: 'depression', year: 1929, title: 'Economic Depression', blurb: 'The crash that made macroeconomics a discipline governments were forced to listen to.', weight: 2, themes: ['economic-history', 'inequality'], laureates: [] },
  { id: 'nazism', year: 1933, title: 'Nazism and Armament', blurb: 'Laureates stripped of citizenship; German winners forbidden to accept the prize.', weight: 3, themes: ['exile', 'courage', 'conscience'], laureates: ['einstein', 'fermi'] },
  { id: 'holocaust', year: 1941, title: 'The Holocaust', blurb: 'Two laureates\' gold medals dissolved in acid in Copenhagen to keep them from the Reich.', weight: 2, themes: ['memory', 'exile', 'courage'], laureates: [] },
  { id: 'atomic-age', year: 1945, title: 'The Atomic Age', blurb: 'Hiroshima and Nagasaki: physics acquires a permanent moral problem.', weight: 3, themes: ['the-atomic-age', 'conscience', 'arms-defense'], laureates: ['fermi', 'curie'] },
  { id: 'human-rights', year: 1948, title: 'UN and Human Rights', blurb: 'A universal declaration, and a Peace Prize that starts rewarding institutions as well as individuals.', weight: 3, themes: ['peacebuilding', 'courage', 'truth', 'women-rights'], laureates: ['balch', 'addams'] },
  { id: 'dna', year: 1953, title: 'The Double Helix', blurb: 'Structure implies mechanism: heredity becomes a chemistry problem.', weight: 3, themes: ['genes', 'code', 'collaboration'], laureates: ['crick'] },
  { id: 'carbon-14', year: 1960, title: 'Carbon-14 Dating', blurb: 'Libby\'s clock lets archaeology and geology agree on a number for the first time.', weight: 2, themes: ['instruments', 'invisible-worlds'], laureates: ['libby'] },
  { id: 'nuclear-arms', year: 1963, title: 'Nuclear Arms Control', blurb: 'Test ban treaties, largely argued for by the physicists who built the weapons.', weight: 2, themes: ['arms-defense', 'conscience', 'the-atomic-age'], laureates: ['sakharov'] },
  { id: 'green-revolution', year: 1970, title: 'The Green Revolution', blurb: 'High-yield grain transforms Asian agriculture, and the Peace Prize goes to a plant breeder.', weight: 2, themes: ['hunger', 'commons'], laureates: ['borlaug'] },
  { id: 'vaccines', year: 1980, title: 'Smallpox Eradicated', blurb: 'The first disease deliberately removed from the world.', weight: 2, themes: ['healthcare', 'microorganisms-t'], laureates: [] },
  { id: 'cosmology', year: 1992, title: 'Cosmic Background', blurb: 'The afterglow of the Big Bang, mapped — cosmology becomes a measuring science.', weight: 2, themes: ['scale', 'instruments'], laureates: [] },
  { id: 'genome', year: 2003, title: 'The Human Genome', blurb: 'Three billion letters, published — the reading is finished, the understanding is not.', weight: 2, themes: ['genes', 'code', 'collaboration'], laureates: ['crick'] },
  { id: 'climate', year: 2007, title: 'Climate Consensus', blurb: 'A Peace Prize for climate science: the atmosphere reframed as a shared responsibility.', weight: 3, themes: ['climate-t', 'commons', 'conscience'], laureates: [] },
  { id: 'crispr', year: 2012, title: 'CRISPR', blurb: 'Precise gene editing arrives, and with it a debate nobody has finished having.', weight: 2, themes: ['genes', 'code', 'patience'], laureates: ['doudna'] },
  { id: 'mrna', year: 2020, title: 'mRNA Vaccines', blurb: 'Thirty years of rejected grant applications, deployed globally in eleven months.', weight: 3, themes: ['persistence', 'healthcare', 'patience', 'outsiders'], laureates: ['katalin'] },
]

export const ARTIFACTS = [
  { id: 'medal', label: 'The Medal', blurb: '23-carat gold plate, 175 grams, Nobel in profile. Two were dissolved in acid to hide them from the Gestapo.', themes: ['memory', 'exile'] },
  { id: 'will', label: "Nobel's Will", blurb: 'Four handwritten pages, contested by family and nearly overturned — the entire prize rests on them.', themes: ['conscience'] },
  { id: 'plate', label: 'The Penicillin Plate', blurb: 'Fleming\'s original culture dish, kept and re-photographed for a century.', themes: ['chance', 'accident', 'antibiotics-t'] },
  { id: 'notebook', label: "Curie's Notebooks", blurb: 'Still radioactive. Readers sign a liability waiver and wear gloves.', themes: ['persistence', 'the-atomic-age', 'invisible-worlds'] },
  { id: 'photo51', label: 'Photograph 51', blurb: 'Rosalind Franklin\'s X-ray diffraction image — shown to Watson and Crick without her knowledge.', themes: ['invisible-hands', 'collaboration', 'genes'] },
  { id: 'banquet', label: 'The Banquet Menu', blurb: 'Stockholm City Hall, 10 December. The menu is kept secret until the day itself.', themes: ['storytelling'] },
]

export const textOn = (background) => (background === PALETTE.ink ? '#ffffff' : PALETTE.ink)
export const findTheme = (id) => THEMES.find((t) => t.id === id)
export const findLaureate = (id) => LAUREATES.find((l) => l.id === id)
export const findMilestone = (id) => MILESTONES.find((m) => m.id === id)

// --- localized accessors -------------------------------------------------
// The English data above stays the source of truth; these return the Swedish
// string when one exists and the English original when it does not.

const SECTION = {
  theme: 'themes',
  person: 'laureates',
  milestone: 'milestones',
  artifact: 'artifacts',
  story: 'stories',
}

export const themeLabel = (theme) => tr(theme.label, 'themes', theme.id, 'label')
export const milestoneTitle = (m) => tr(m.title, 'milestones', m.id, 'title')
export const artifactLabel = (a) => tr(a.label, 'artifacts', a.id, 'label')
export const fieldLabel = (field) => tr(field.label, 'fields', field.id)
export const countryName = (country) => tr(country, 'countries', country)
export const kindLabel = (kind) => tr(KIND_LABELS[kind] ?? kind, 'kinds', kind)
export const blurbFor = (kind, id, fallback) => tr(fallback, SECTION[kind], id, 'blurb')
