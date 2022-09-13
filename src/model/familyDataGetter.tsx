import Papa from "papaparse";
import { familyGraph } from "./familyGraph";
import { RelationRaw, IndividualRaw } from "./csvGraph";

const baseDocumentId = "1kma7idppXhBzQFTCypZIosD5Pp-o5iIaoKlhnGCgzXU";
const relationSheetId = "0";
const peopleSheetId = "282415891";

export async function downloadFamilyData() {
  return new Promise((resolve, reject) => {
    Papa.parse(`https://docs.google.com/spreadsheets/d/${baseDocumentId}/pub?output=csv&gid=${peopleSheetId}`, {
      download: true,
      header: true,
      complete: async (results: any) => {
        familyGraph.buildGraphNodes(results.data as IndividualRaw[]);
        await downloadRelationData();
        resolve(true);
      }
    });
  });
}

async function downloadRelationData() {
  return new Promise((resolve, reject) => {
    Papa.parse(`https://docs.google.com/spreadsheets/d/${baseDocumentId}/pub?output=csv&gid=${relationSheetId}`, {
      download: true,
      header: true,
      complete: (results: any) => {
        familyGraph.buildGraphEdges(results.data as RelationRaw[]);
        resolve(true);
      }
    });
  });
}

export function computePath(nameA: string, nameB: string) {
  return familyGraph.getPath(nameA, nameB);
}
