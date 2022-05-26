const throwDices = () => {
    const diceRoll1 = Math.floor(Math.random() * 6) + 1;
    const diceRoll2 = Math.floor(Math.random() * 6) + 1;
    const score = diceRoll1 + diceRoll2;
    const victory = score === 7 ? true : false;
    return {
      victory: victory,
      score : score
    }
  }

  module.exports = throwDices;