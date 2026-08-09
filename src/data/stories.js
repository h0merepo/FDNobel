// Long-form narratives. Each one is a bubble in the web that opens as a
// seven-screen read inside the content panel. `sub` is the name shown under the
// title on the bubble, matching the way the design labels them.

export const STORIES = [
  {
    id: 'helgoland',
    title: 'Seeing the Invisible',
    sub: 'Heisenberg',
    themes: ['invisible-worlds', 'doubt', 'imagination', 'solitude'],
    laureates: ['heisenberg', 'einstein'],
    milestones: ['modern-physics'],
    screens: [
      {
        heading: 'A treeless island',
        body: 'In June 1925 Werner Heisenberg was twenty-three and could not stop sneezing. His hay fever was so severe that his supervisor gave him two weeks off, and he took a boat to Helgoland — a red sandstone rock in the North Sea with almost nothing growing on it, and therefore almost no pollen.',
      },
      {
        heading: 'The problem he took with him',
        body: 'Physics had a picture of the atom: a small nucleus with electrons in orbits around it. The picture produced the right answer for hydrogen and the wrong answer for everything else. Worse, nobody had ever seen an orbit. It was an object invented to make a diagram work.',
      },
      {
        heading: 'A rule for himself',
        body: 'On the island he made a decision that sounds procedural and was radical: he would build a theory using only quantities that could actually be measured. Not orbits, not positions — the frequencies and brightnesses of the light atoms emit. Whatever was going on inside, he would describe only what came out.',
      },
      {
        heading: 'Three in the morning',
        body: 'The arithmetic was long and he kept making errors. Around three o\'clock the numbers came out: energy was conserved, exactly. He was too excited to sleep. He walked to the southern tip of the island, climbed a rock overlooking the sea, and waited for the sun to come up.',
      },
      {
        heading: 'The multiplication that would not behave',
        body: 'One thing bothered him. In his scheme, multiplying A by B gave a different answer from multiplying B by A. He assumed it was a mistake. Back in Göttingen, Max Born recognised what he was looking at: matrices. Heisenberg had reinvented a piece of mathematics he had never been taught.',
      },
      {
        heading: 'What it cost',
        body: 'Two years later Heisenberg drew out the consequence: position and momentum cannot both have definite values. Not because instruments are imperfect — because the world is not built that way. Einstein spent the rest of his life objecting. The objections were brilliant, and each one turned out to be answerable.',
      },
      {
        heading: 'Afterwards',
        body: 'He was awarded the 1932 prize alone, at thirty-one, for creating quantum mechanics. He stayed in Germany through the war and led its nuclear programme, and what he was really attempting there has been argued over ever since. The island is still treeless. There is a plaque.',
      },
    ],
  },
  {
    id: 'thousand-fold',
    title: 'A Mistake in the Lab',
    sub: 'Shirakawa',
    themes: ['accident', 'chance', 'testing', 'collaboration'],
    laureates: ['shirakawa'],
    milestones: [],
    screens: [
      {
        heading: 'A routine synthesis',
        body: 'In 1967 a visiting researcher joined Hideki Shirakawa\'s laboratory at the Tokyo Institute of Technology. He was given a standard recipe for making polyacetylene — a black powder, of no great interest to anyone, made by bubbling gas through a catalyst.',
      },
      {
        heading: 'A factor of a thousand',
        body: 'Something was lost between the instruction and the bench. Accounts differ on whether a unit was misread or a decimal misplaced, but the catalyst went in at roughly a thousand times the intended concentration. By every normal standard the experiment was ruined before it began.',
      },
      {
        heading: 'The wrong result',
        body: 'No black powder appeared. Instead a film formed on the surface of the liquid — thin, continuous, and silvery, like a piece of aluminium foil. It looked nothing like a plastic and nothing like the expected product.',
      },
      {
        heading: 'What he did next',
        body: 'This is the part that is not an accident. Shirakawa did not discard the film or repeat the synthesis correctly. He characterised it: measured it, worked out what the excess catalyst had done to the polymer chains, and established how to make the film deliberately.',
      },
      {
        heading: 'A conversation in Tokyo',
        body: 'In 1975 Alan MacDiarmid, visiting from Pennsylvania, saw the silvery film during a seminar break and asked about it. Within a year Shirakawa was in Philadelphia, working with MacDiarmid and the physicist Alan Heeger.',
      },
      {
        heading: 'Adding an impurity',
        body: 'They exposed the film to iodine vapour. Its conductivity rose by several orders of magnitude — the plastic was carrying current like a metal. The material everyone used precisely because it insulates had been made to do the opposite.',
      },
      {
        heading: 'Afterwards',
        body: 'The three shared the 2000 chemistry prize. Conducting polymers are now in flexible displays, sensors and organic light-emitting screens. The error is reproduced deliberately in undergraduate laboratories, which is an unusual fate for a mistake.',
      },
    ],
  },
  {
    id: 'mould-juice',
    title: 'An Accidental Discovery',
    sub: 'Fleming',
    themes: ['chance', 'accident', 'observation', 'antibiotics-t', 'healthcare'],
    laureates: ['fleming', 'chain'],
    milestones: ['antibiotics'],
    screens: [
      {
        heading: 'An untidy bench',
        body: 'Alexander Fleming\'s laboratory at St Mary\'s in London was famously disordered. Culture plates accumulated. Colleagues remarked on it. He was, by his own account, not a tidy worker, and in the summer of 1928 he went on holiday leaving a stack of staphylococcus plates by a window.',
      },
      {
        heading: 'A cold snap and a warm spell',
        body: 'The weather that August did something specific. A cool period let a mould spore — probably drifting up from a mycology laboratory one floor below — germinate and grow. A warmer period that followed let the bacteria grow. Either order alone would have produced nothing worth noticing.',
      },
      {
        heading: 'The plate not yet washed',
        body: 'Returning in September, Fleming began clearing the stack into a tray of disinfectant. One plate had not yet gone under. He picked it up, looked at it, and said something that his assistant remembered as unremarkable at the time: "That\'s funny."',
      },
      {
        heading: 'A clear ring',
        body: 'Around the mould colony was a halo where the staphylococcus had dissolved. Something the mould produced was killing the bacteria, and doing it at a distance. He photographed the plate, subcultured the mould, and identified it as a Penicillium.',
      },
      {
        heading: 'Ten quiet years',
        body: 'He called the active substance "mould juice", published in 1929, and could not get it to concentrate or keep. The paper attracted almost no attention. Fleming was a bacteriologist, not a chemist, and the problem that remained was entirely a chemical one.',
      },
      {
        heading: 'Oxford',
        body: 'In 1938 Howard Florey and Ernst Chain read the old paper and thought the purification worth attempting. By 1941 they had enough to treat a policeman with a serious infection. He improved dramatically. Then the supply ran out, and he died.',
      },
      {
        heading: 'Afterwards',
        body: 'Production moved to the United States and scaled in time for the invasion of Normandy. Fleming, Florey and Chain shared the 1945 prize. In his Nobel lecture Fleming described how resistance would arise, by what mechanism, and roughly how soon. He was right on all three.',
      },
    ],
  },
  {
    id: 'holmdel-hiss',
    title: 'A Disturbing Noise',
    sub: 'Penzias & Wilson',
    themes: ['chance', 'instruments', 'scale', 'observation'],
    laureates: ['penzias'],
    milestones: ['cosmology'],
    screens: [
      {
        heading: 'A horn on a hill',
        body: 'At Holmdel in New Jersey stood a twenty-foot horn antenna, built by Bell Labs to bounce signals off early communications satellites. By 1964 the satellites had moved on and two radio astronomers, Arno Penzias and Robert Wilson, had the instrument to themselves.',
      },
      {
        heading: 'A hiss that would not leave',
        body: 'Before doing astronomy they needed to characterise the noise floor. There was more of it than there should have been — a faint, steady hiss about a hundred times stronger than expected. It did not change with the time of day, the season, or the direction they pointed.',
      },
      {
        heading: 'Ruling things out',
        body: 'They checked for interference from New York City. They checked for the aftermath of a 1962 nuclear test. They dismantled and reassembled joints in the antenna, taped over rivets, and looked for loose connections. The hiss stayed exactly where it was.',
      },
      {
        heading: 'White dielectric material',
        body: 'A pair of pigeons had nested in the horn and coated the interior with droppings — recorded in their notes, with some delicacy, as "a white dielectric material". They evicted the birds and scrubbed the metal. The noise did not change at all.',
      },
      {
        heading: 'Forty miles away',
        body: 'At Princeton, Robert Dicke\'s group was building a small antenna to look for exactly this: leftover radiation from a hot early universe, cooled by expansion to a few degrees above absolute zero. A mutual acquaintance mentioned the Holmdel problem. Dicke put down the phone and told his team they had been scooped.',
      },
      {
        heading: 'Two papers',
        body: 'The results were published side by side in 1965. Penzias and Wilson described a measurement of excess antenna temperature and made no cosmological claim at all. The companion paper explained what they had found. The Big Bang stopped being one model among several.',
      },
      {
        heading: 'Afterwards',
        body: 'They shared the 1978 prize. The signal is the oldest light there is, released when the universe first became transparent, and its faint variations are the seeds of every galaxy. It reached two engineers as a fault they spent a year trying to eliminate.',
      },
    ],
  },
  {
    id: 'a-new-kind-of-ray',
    title: 'An Unexpected Discovery',
    sub: 'Röntgen',
    themes: ['chance', 'invisible-worlds', 'instruments', 'accident'],
    laureates: ['rontgen'],
    milestones: ['radioactivity'],
    screens: [
      {
        heading: 'A darkened room',
        body: 'On the evening of 8 November 1895, in Würzburg, Wilhelm Röntgen was working with a cathode ray tube. He had wrapped it in black cardboard to block its light, and darkened the room, so that he could see any faint glow escaping.',
      },
      {
        heading: 'Something across the bench',
        body: 'A small screen coated in barium platinocyanide, lying a metre away, began to glow. It should not have. The tube was covered; cathode rays travelled only a couple of centimetres in air. Something was crossing the room that he had no name for, so he called it X.',
      },
      {
        heading: 'Seven weeks',
        body: 'He effectively moved into the laboratory. Meals were brought to him. He put objects between the tube and the screen: paper, wood, aluminium, a set of weights inside a closed box. The rays went through almost everything, and lead stopped them.',
      },
      {
        heading: 'A hand',
        body: 'On 22 December he asked his wife Anna Bertha to hold her hand over a photographic plate for fifteen minutes. The image showed her finger bones and her wedding ring, with the flesh a faint shadow. She is reported to have said: "I have seen my death."',
      },
      {
        heading: 'Six days later',
        body: 'He submitted the paper on 28 December and posted reprints, with photographs, to leading physicists across Europe. The press had it within a week. Within a month the images were a public sensation and physicians were already using them.',
      },
      {
        heading: 'He took nothing',
        body: 'Röntgen refused to patent the discovery, saying it belonged to humanity, and donated his prize money to his university. Hospitals had working equipment inside a year. He is one of very few people to have made a fortune available and declined it.',
      },
      {
        heading: 'Afterwards',
        body: 'He received the first Nobel Prize in Physics in 1901. The other side of the story arrived more slowly: early operators, working without shielding, developed burns, then cancers. The rays that made the invisible visible took a decade to be understood as dangerous.',
      },
    ],
  },
  {
    id: 'jumping-genes',
    title: 'Forty Years of Waiting',
    sub: 'McClintock',
    themes: ['patience', 'persistence', 'solitude', 'outsiders', 'genes', 'revolt'],
    laureates: ['mccli'],
    milestones: ['dna'],
    screens: [
      {
        heading: 'A field of maize',
        body: 'Barbara McClintock worked plots of maize at Cold Spring Harbor on Long Island, largely alone, for decades. Maize is a good organism for genetics because the evidence is visible: each kernel on a cob is a separate offspring, and its colour is a readable result.',
      },
      {
        heading: 'Broken chromosomes',
        body: 'She had been studying chromosomes that break and rejoin. Following the consequences through generations, she began seeing colour patterns on kernels that no existing model of heredity could produce — patches and streaks appearing in the wrong places, at the wrong frequencies.',
      },
      {
        heading: 'Elements that move',
        body: 'By 1948 she had an explanation. Certain genetic elements were not fixed in position. They could leave one site on a chromosome and insert themselves at another, switching neighbouring genes on and off as they went. The genome was not a stable list of instructions.',
      },
      {
        heading: 'The silence',
        body: 'She presented the work at the 1951 Cold Spring Harbor symposium. The response was not hostility so much as blankness. The evidence was maize cytology, which few in the room could read, and the claim contradicted a picture of the gene that was about to be spectacularly confirmed by the double helix.',
      },
      {
        heading: 'Carrying on',
        body: 'She stopped submitting the work to journals in 1953, describing the reception as "puzzlement, even hostility". She did not stop doing it. She kept the plots, kept the records, and worked on the genetics of maize in Central and South America.',
      },
      {
        heading: 'The field arrives',
        body: 'In the late 1960s and 1970s, molecular biologists working on bacteria found sequences that moved — transposons. The tools finally existed to see in a test tube what she had inferred from a cob. Transposable elements turned out to be present across the living world, and to make up a large fraction of the human genome.',
      },
      {
        heading: 'Afterwards',
        body: 'The 1983 prize was awarded to her alone: the only unshared prize in physiology or medicine ever given to a woman. Asked about the thirty-five-year wait, she said she had known she was right, and that the work itself had been the pleasure.',
      },
    ],
  },
]

export const findStory = (id) => STORIES.find((s) => s.id === id)
