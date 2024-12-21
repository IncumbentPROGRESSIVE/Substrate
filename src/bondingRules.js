import { gcd } from "./mathUtils"; // Ensure this file exists and is correctly located

export const bondingRules = {
  elements: {
    Na: { valence: 1, type: "ionic", bondsWith: ["Cl"] },
    Cl: { valence: -1, type: "ionic", bondsWith: ["Na", "H"] },
    H: { valence: 1, type: "covalent", bondsWith: ["O", "Cl", "N"] },
    O: { valence: -2, type: "covalent", bondsWith: ["H", "C", "N"] },
    C: { valence: 4, type: "covalent", bondsWith: ["H", "O", "N"] },
    N: { valence: -3, type: "covalent", bondsWith: ["H", "C", "O"] },
    K: { valence: 1, type: "ionic", bondsWith: ["Cl", "O"] },
    Mg: { valence: 2, type: "ionic", bondsWith: ["Cl", "O"] },
    Ca: { valence: 2, type: "ionic", bondsWith: ["Cl", "O"] },
    S: { valence: -2, type: "covalent", bondsWith: ["H", "O"] },
    Fe: { valence: 3, type: "ionic", bondsWith: ["Cl", "O"] },
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
  const e1 = bondingRules.elements[element1];
  const e2 = bondingRules.elements[element2];

  if (!e1 || !e2 || !canBond(element1, element2)) {
    throw new Error(
      `Cannot create a compound with ${element1} and ${element2}`
    );
  }

  const absValence1 = Math.abs(e1.valence);
  const absValence2 = Math.abs(e2.valence);

  const lcm = (absValence1 * absValence2) / gcd(absValence1, absValence2);

  const count1 = lcm / absValence1;
  const count2 = lcm / absValence2;

  const formula =
    (count1 > 1 ? `${element1}${count1}` : element1) +
    (count2 > 1 ? `${element2}${count2}` : element2);

  return {
    formula,
    type: e1.type,
    components: [
      { element: element1, count: count1 },
      { element: element2, count: count2 },
    ],
  };
};
