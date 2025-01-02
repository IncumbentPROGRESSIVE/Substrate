export const bondingRules = {
  reactions: {
    // Example reactions with products
    "Li + H": "LiH",
    "Na + H": "NaH",
    "K + H": "KH",
    "Rb + H": "RbH",
    "Cs + H": "CsH",
    "Li + F": "LiF",
    "Na + F": "NaF",
    "K + F": "KF",
    "Rb + F": "RbF",
    "Cs + F": "CsF",
    "Li + Cl": "LiCl",
    "Na + Cl": "NaCl",
    "K + Cl": "KCl",
    "Rb + Cl": "RbCl",
    "Cs + Cl": "CsCl",
    "Li + Br": "LiBr",
    "Na + Br": "NaBr",
    "K + Br": "KBr",
    "Rb + Br": "RbBr",
    "Cs + Br": "CsBr",
    "Li + I": "LiI",
    "Na + I": "NaI",
    "K + I": "KI",
    "Rb + I": "RbI",
    "Cs + I": "CsI",
    "Be + H": "BeH",
    "Mg + H": "MgH",
    "Ca + H": "CaH",
    "Sr + H": "SrH",
    "Ba + H": "BaH",
    "Be + F": "BeF",
    "Mg + F": "MgF",
    "Ca + F": "CaF",
    "Sr + F": "SrF",
    "Ba + F": "BaF",
    "Be + Cl": "BeCl",
    "Mg + Cl": "MgCl",
    "Ca + Cl": "CaCl",
    "Sr + Cl": "SrCl",
    "Ba + Cl": "BaCl",
    "Be + Br": "BeBr",
    "Mg + Br": "MgBr",
    "Ca + Br": "CaBr",
    "Sr + Br": "SrBr",
    "Ba + Br": "BaBr",
    "Be + I": "BeI",
    "Mg + I": "MgI",
    "Ca + I": "CaI",
    "Sr + I": "SrI",
    "Ba + I": "BaI",
    // Transition Metals
    "Fe + Cl": "FeCl",
    "Co + Cl": "CoCl",
    "Ni + Cl": "NiCl",
    "Cu + Cl": "CuCl",
    "Zn + Cl": "ZnCl",
    "Ag + Cl": "AgCl",
    // Halogen-Halogen
    "Cl + F": "ClF",
    "Br + F": "BrF",
    "I + F": "IF",
    // Noble Gas Compounds
    "Xe + F": "XeF",
    "Kr + F": "KrF",
    "H + O": "OH",
    // Add other combinations here
  },

  elements: {
    // Keep your existing elements definition here
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
  const reactants = [element1, element2].sort().join(" + ");
  return bondingRules.reactions.hasOwnProperty(reactants);
};

/**
 * Creates a new compound based on bonded elements.
 * @param {string} element1 - Symbol of the first element.
 * @param {string} element2 - Symbol of the second element.
 * @returns {object} - The compound object.
 */
export const createCompound = (element1, element2) => {
  const reactants = [element1, element2].sort().join(" + ");
  const formula = bondingRules.reactions[reactants];

  if (!formula) {
    throw new Error(`No predefined reaction for ${element1} and ${element2}`);
  }

  return {
    formula,
    type: "ionic", // Default type; adjust based on your rules
    components: [
      { element: element1, count: 1 },
      { element: element2, count: 1 },
    ],
  };
};
