// Content depth, as defined for the project:
//
//   1  top line, self-explanatory — a laureate card, an artifact in bullets
//   2  a short explainer, roughly fifty words
//   3  a story, read across screens with back and next
//
// Levels 1 and 2 live on the same node: a laureate opens as a card and carries
// an explainer beneath it. Level 3 is its own node. Themes carry no content of
// their own — they are signposts — so they sit outside the scale.
export const LEVEL = {
  theme: 0,
  person: 1,
  milestone: 1,
  artifact: 1,
  story: 3,
}

export const levelOf = (kind) => LEVEL[kind] ?? 1

// How many of each kind a mode wants in the ring around a node. Story mode
// leads with level 3 and supports it with level 2; milestones lead with the
// level 1 and 2 record and admit a story or two; discovery holds all three
// evenly. Quotas are filled in order and any shortfall is passed on, so a node
// with no stories still fills its ring.
export const MIX = {
  stories: { story: 4, theme: 2, person: 1, milestone: 1, artifact: 1 },
  milestones: { person: 3, artifact: 2, milestone: 2, story: 1, theme: 1 },
  discovery: { story: 2, person: 2, milestone: 2, artifact: 2, theme: 2 },
}

export const mixFor = (mode) => MIX[mode] ?? MIX.discovery
