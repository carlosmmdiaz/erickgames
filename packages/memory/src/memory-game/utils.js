/**
 * Generates a random int between min an max
 * @param {Number} min
 * @param {Number} max
 */
export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

/**
 * Generates a random array of imageIds
 * @param {Number} numberOfCards different in the game
 * @param {Number} maxCards maximum number of cards
 */
const getRandomImageIds = (numberOfCards, maxCards) => {
  const arrayOfImages = Array.from({ length: maxCards }, (_, i) => i + 1);
  const randomImageIds = [];

  for (let i = 0; i < numberOfCards; i++) {
    const randomImageId = getRandomInt(0, arrayOfImages.length);

    randomImageIds.push(arrayOfImages.splice(randomImageId, 1)[0]);
  }

  return randomImageIds;
};

/**
 * Generate a random game table for the memory game
 * @param {Number} numberOfCards different in the game
 * @param {Number} maxCards maximum number of cards
 */
export const generateRandomGameTable = (numberOfCards, maxCards) => {
  const table = getRandomImageIds(numberOfCards, maxCards);
  const gameTable = table.concat(table);
  const randomGameTable = [];

  for (let i = 0; i < numberOfCards * 2; i++) {
    randomGameTable.push({
      idCard: i,
      imageId: gameTable.splice(getRandomInt(0, gameTable.length), 1)[0],
      flipped: false,
      blocked: false,
    });
  }

  return randomGameTable;
};
