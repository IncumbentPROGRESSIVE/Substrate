import periodicTableJSON from "./periodicData/Periodic-Table-JSON-master/PeriodicTableJSON.json";
import periodicTableLookup from "./periodicData/Periodic-Table-JSON-master/periodic-table-lookup.json";

export const mergePeriodicTableData = () => {
  const lookupData = periodicTableLookup;
  const elements = periodicTableJSON.elements;

  // Merge the periodicTableJSON data with periodic-table-lookup data
  return elements.map((element) => {
    const elementKey = element.name.toLowerCase();
    const lookupDetails = lookupData[elementKey] || {};

    return {
      ...element, // Data from periodic_TableJSON.json
      ...lookupDetails, // Additional data from periodic-table-lookup.json
    };
  });
};
