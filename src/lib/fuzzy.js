// Scoring for the search box. It has to forgive three different kinds of miss:
// a typo (rontgen for röntgen), a different ending (discoveries for discovery),
// and a half-typed word — so a query is scored against every word in a record
// and the best match wins.

const FOLD = { å: 'a', ä: 'a', ö: 'o', é: 'e', è: 'e', ü: 'u', ø: 'o', æ: 'ae', ñ: 'n', ç: 'c' }

export const fold = (text) =>
  text
    .toLowerCase()
    .replace(/[åäöéèüøæñç]/g, (c) => FOLD[c] ?? c)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

// Cheap stem: drop the endings that separate a word from its relatives, so
// "discoveries", "discovery" and "discovered" collapse to one another.
const stem = (word) =>
  word
    .replace(/(ies|ied)$/, 'y')
    .replace(/(ing|ed|es|s)$/, '')
    .replace(/(erna|arna|orna|en|et|ar|or)$/, '')

const words = (text) => fold(text).split(/[^a-z0-9]+/).filter(Boolean)

// Levenshtein, bailed out early — we only ever care whether it is within two.
function within(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return false
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i += 1) {
    const row = [i]
    let best = i
    for (let j = 1; j <= b.length; j += 1) {
      row[j] = Math.min(
        prev[j] + 1,
        row[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
      if (row[j] < best) best = row[j]
    }
    if (best > max) return false
    prev = row
  }
  return prev[b.length] <= max
}

// Do the query's letters appear in order? Catches "hsnbrg" for "heisenberg".
function subsequence(query, target) {
  let i = 0
  for (let j = 0; j < target.length && i < query.length; j += 1) {
    if (target[j] === query[i]) i += 1
  }
  return i === query.length
}

export function scoreOne(queryWord, targetWords) {
  const q = queryWord
  const qs = stem(q)
  let best = 0
  for (const word of targetWords) {
    if (word === q) return 100
    if (word.startsWith(q)) best = Math.max(best, 88 - (word.length - q.length) * 0.4)
    else if (stem(word) === qs && qs.length > 2) best = Math.max(best, 80)
    else if (word.includes(q) && q.length > 2) best = Math.max(best, 62)
    else if (q.length > 3 && within(q, word, q.length > 6 ? 2 : 1)) best = Math.max(best, 56)
    else if (q.length > 3 && subsequence(q, word)) best = Math.max(best, 34)
  }
  return best
}

// Every query word must find something, or the record is not a match at all —
// otherwise "marie curie" would return everyone called Marie.
export function scoreRecord(query, record) {
  const qWords = words(query)
  if (!qWords.length) return 0
  let total = 0
  for (const qw of qWords) {
    const inTitle = scoreOne(qw, record.titleWords)
    const inBody = scoreOne(qw, record.bodyWords) * 0.45
    const best = Math.max(inTitle, inBody)
    if (best === 0) return 0
    total += best
  }
  return total / qWords.length
}

// The completion offered inline in the field: the rest of the best-matching
// title word, so typing "heis" ghosts "enberg".
export function completionFor(query, records) {
  const qWords = words(query)
  const last = qWords[qWords.length - 1]
  if (!last || last.length < 2 || /[^a-z0-9]$/.test(query)) return ''
  let best = null
  for (const record of records) {
    for (const word of record.titleWords) {
      if (word.startsWith(last) && word.length > last.length) {
        if (!best || word.length < best.length) best = word
      }
    }
  }
  return best ? best.slice(last.length) : ''
}
