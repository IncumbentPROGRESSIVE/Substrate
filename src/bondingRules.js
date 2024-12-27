import { gcd } from "./mathUtils";

export const bondingRules = {
  elements: {
    // Alkali metals
    H: { valence: 1, type: "covalent", bondsWith: ["O", "N", "Cl", "C"] },
    Li: { valence: 1, type: "ionic", bondsWith: ["Cl", "O", "F"] },
    Na: { valence: 1, type: "ionic", bondsWith: ["Cl", "O", "F"] },
    K: { valence: 1, type: "ionic", bondsWith: ["Cl", "O", "F"] },

    // Alkaline earth metals
    Mg: { valence: 2, type: "ionic", bondsWith: ["Cl", "O", "S"] },
    Ca: { valence: 2, type: "ionic", bondsWith: ["Cl", "O", "S"] },
    Ba: { valence: 2, type: "ionic", bondsWith: ["Cl", "O", "S"] },

    // Halogens
    F: { valence: -1, type: "ionic", bondsWith: ["Na", "K", "H"] },
    Cl: { valence: -1, type: "ionic", bondsWith: ["Na", "K", "H", "C"] },
    Br: { valence: -1, type: "ionic", bondsWith: ["Na", "K", "H"] },
    I: { valence: -1, type: "ionic", bondsWith: ["Na", "K", "H"] },

    // Chalcogens
    O: { valence: -2, type: "covalent", bondsWith: ["H", "C", "N", "S"] },
    S: { valence: -2, type: "covalent", bondsWith: ["H", "O", "C"] },
    Se: { valence: -2, type: "covalent", bondsWith: ["H", "O", "C"] },

    // Group 14 (Carbon group)
    C: { valence: 4, type: "covalent", bondsWith: ["H", "O", "N", "S"] },
    Si: { valence: 4, type: "covalent", bondsWith: ["H", "O", "C"] },

    // Group 15 (Nitrogen group)
    N: { valence: -3, type: "covalent", bondsWith: ["H", "C", "O"] },
    P: { valence: -3, type: "covalent", bondsWith: ["H", "O", "Cl"] },

    // Transition metals (simplified)
    Fe: { valence: 3, type: "ionic", bondsWith: ["O", "Cl", "S"] },
    Cu: { valence: 2, type: "ionic", bondsWith: ["O", "Cl", "S"] },
    Zn: { valence: 2, type: "ionic", bondsWith: ["O", "Cl", "S"] },
    Ag: { valence: 1, type: "ionic", bondsWith: ["O", "Cl", "S"] },

    // Noble gases (simplified)
    He: { valence: 0, type: "inert", bondsWith: [] },
    Ne: { valence: 0, type: "inert", bondsWith: [] },
    Ar: { valence: 0, type: "inert", bondsWith: [] },
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
 * Prioritizes smaller compounds like OH over larger compounds like H₂O.
 * @param {string} element1 - Symbol of the first element.
 * @param {string} element2 - Symbol of the second element.
 * @returns {object} - The compound object.
 */
export const createCompound = (element1, element2) => {
  const e1 = bondingRules.elements[element1];
  const e2 = bondingRules.elements[element2];

  // Validate both elements exist and can bond
  if (!e1 || !e2 || !canBond(element1, element2)) {
    throw new Error(
      `Cannot create a compound with ${element1} and ${element2}`
    );
  }

  // Handle special cases like OH
  if (
    (element1 === "O" && element2 === "H") ||
    (element1 === "H" && element2 === "O")
  ) {
    return {
      formula: "OH",
      type: "covalent",
      components: [
        { element: "O", count: 1 },
        { element: "H", count: 1 },
      ],
    };
  }

  // General logic for creating compounds based on valence
  const absCationValence = Math.abs(e1.valence);
  const absAnionValence = Math.abs(e2.valence);

  // Find the greatest common divisor (GCD) to simplify the ratio
  const lcm =
    (absCationValence * absAnionValence) /
    gcd(absCationValence, absAnionValence);

  // Determine the counts of each element in the simplest ratio
  const cationCount = lcm / absCationValence;
  const anionCount = lcm / absAnionValence;

  // Construct the formula
  const [cation, anion] =
    e1.valence > 0 ? [element1, element2] : [element2, element1];
  const formula =
    (cationCount > 1 ? `${cation}${cationCount}` : cation) +
    (anionCount > 1 ? `${anion}${anionCount}` : anion);

  return {
    formula,
    type: e1.type, // Assumes type of the compound is the same as the cation
    components: [
      { element: cation, count: cationCount },
      { element: anion, count: anionCount },
    ],
  };
};
