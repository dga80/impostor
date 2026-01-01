import { WORDS } from "../data/words";

/**
 * Shuffles an array in place.
 * @param {Array} array 
 */
export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Assigns roles to players.
 * @param {Array<string>} playerNames 
 * @param {number} impostorCount 
 * @returns {Array<{id: string, name: string, role: 'citizen' | 'impostor', seen: false}>}
 */
export function assignRoles(playerNames, impostorCount) {
    if (playerNames.length < impostorCount + 2) {
        throw new Error("Pocos jugadores para este número de impostores.");
    }

    const shuffledNames = shuffle([...playerNames]);
    const players = shuffledNames.map((name, index) => ({
        id: crypto.randomUUID(),
        name,
        role: index < impostorCount ? 'impostor' : 'citizen',
        seen: false,
    }));

    // Shuffle again so impostors aren't always the first added
    return shuffle(players);
}

/**
 * Picks a random word pair from the database.
 * @returns {{category: string, citizen: string, impostor: string}}
 */
export function getRandomWord() {
    const index = Math.floor(Math.random() * WORDS.length);
    return WORDS[index];
}
