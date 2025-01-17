/**
 * Paragraph
 */

import { block } from '../grammar-rules'

class Paragraph {
  constructor(marked) {
    this.options = marked.options

    const { gfm } = this.options

    this.tokenTypes = ['paragraph']

    this.rules = {
      block: gfm ? block.gfm.paragraph : block.paragraph,
    }
  }

  tokenize(cap, src, tokens, tokenFunc, isTop) {
    // Paragraph token must be on top level.
    if (!isTop) {
      // return -1 means: skip this match.
      return -1
    }

    tokens.push({
      type: this.tokenTypes[0],
      text: cap[1].charAt(cap[1].length - 1) === '\n'
        ? cap[1].slice(0, -1) : cap[1],
    })
  }

  parse(token, inlineLexer) {
    if (!this.tokenTypes.includes(token.type)) {
      return false
    }

    const content = inlineLexer.output(token.text)
    return `<p>${content}</p>\n`
  }
}

export default Paragraph
