export const bondingRules = {
  elements: {
    Na: { valence: 1, type: "ionic", bondsWith: ["Cl"] },
    Cl: { valence: -1, type: "ionic", bondsWith: ["Na"] },
    H: { valence: 1, type: "covalent", bondsWith: ["O", "N"] },
    O: { valence: -2, type: "covalent", bondsWith: ["H", "C"] },
    // Add more elements as needed
  },
};

/**
 * Determines if two elements can bond.
 * @param {string} element1 - Symbol of the first element.
 * @param {string} element2 - Symbol of the second element.
 * @returns {boolean} - True if the elements can bond.
 */
export const canBond = (element1, element2) => {
  const e1 = bondingRules.elements[element1];
  const e2 = bondingRules.elements[element2];

  if (!e1 || !e2) return false; // Invalid elements
  return e1.bondsWith.includes(element2) && e2.bondsWith.includes(element1);
};

/**
 * Creates a new compound based on bonded elements.
 * @param {string} element1 - Symbol of the first element.
 * @param {string} element2 - Symbol of the second element.
 * @returns {object} - The compound object.
 */
export const createCompound = (element1, element2) => {
  return {
    formula: `${element1}${element2}`, // Simplistic, expand for real chemical formulas
    type: bondingRules.elements[element1].type, // ionic or covalent
    components: [element1, element2],
  };
};
