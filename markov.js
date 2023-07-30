/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let markov = new Map()
    for (let i = 0; i < this.words.length; i++){
      let word1 = this.words[i]
      let word2 = this.words[i+1] | null
      if(markov.has(word1)){
        markov.get(word1).push(word2)
      }
      else{
        markov.set(word1,[word2])
      }
    }
    this.markov = markov
  }


  /** return random text from chains */

  static choice(arr){
    let rand = arr[Math.floor(Math.random()*arr.length)]
    return rand
  }

  makeText(numWords = 100) {
    let keys = Array.from(this.markov.keys())
    let key = MarkovMachine.choice(keys)
    let res = []
    while (res.length < numWords && key != null){
      res.push(key)
      key = MarkovMachine.choice(this.markov.get(key))
    }
    let final = res.join(' ')
    return final
  }
}


module.exports = {
  MarkovMachine
}