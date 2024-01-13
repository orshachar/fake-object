import { faker } from "@faker-js/faker";
import { processModulesDirectory } from "./fakerFunctions"; 
const path = require('path');
const { dirname } = require('path');
const fakerInstance = faker;
const jaccard = require('jaccard');
// Use require.resolve to find the path of a file within @faker-js/faker
const fakerPath = require.resolve('@faker-js/faker');

// Construct the path to the 'modules' directory
const FAKER_MODULE_DIRECTORY = path.join(fakerPath, '..', '..', 'types', 'modules');
let fakerFunctions = processModulesDirectory(FAKER_MODULE_DIRECTORY);

interface NestedObject {
    [key: string]: any;
}``

interface FunctionObject {
    functionName: string;
    functionSet: Set<string>;
}
/**  
 *  Generates a fake object based on the provided nested object.
 * @param obj - The nested object to generate a fake object from.
 * @param path - The path to the current object in the nested structure (optional).
 * @returns The generated fake object.
 */
export function generateFakeObject(obj: NestedObject, path: string[] = []): NestedObject {
    const result: NestedObject = {};
    if (obj == null) return obj;
    Object.keys(obj).forEach(key => {
        if (Array.isArray(obj[key])) {
            const arrayKeyType = typeof obj[key][0];
            const fakerFuncsForKey = fakerFunctions[arrayKeyType];
            const pathSet = new Set(path.concat(key));
            const resultFunction = findJacardBestMatch(fakerFuncsForKey, Array.from(pathSet));
            const newValue = Array.from({ length: obj[key].length }, () => {
                if (resultFunction && resultFunction !== "") {
                    const modifiedResultFunction = resultFunction.replace('faker.', 'fakerInstance.');
                    try {
                        return eval(modifiedResultFunction);
                    } catch (e) {
                        return obj[key];
                    }
                } else {
                    return obj[key];
                }
            });
            result[key] = newValue;
        } else if (typeof obj[key] === 'object') {
            result[key] = generateFakeObject(obj[key], path.concat(key));
        } else {
            const pathSet = new Set(path.concat(key));
            const keyType = typeof key;
            const fakerFuncsForKey = fakerFunctions[keyType];
            let newValue: any;
            if (fakerFuncsForKey != null) {
                let resultFunction = findJacardBestMatch(fakerFuncsForKey, Array.from(pathSet));
                if (resultFunction && resultFunction != "") {
                    resultFunction = resultFunction.replace('faker.', 'fakerInstance.');
                    try {
                        newValue = eval(resultFunction);
                    }   
                    catch (e) {
                        newValue = obj[key];
                    }
                }
                else newValue = obj[key];
            }
            else newValue = obj[key];

            result[key] = newValue;
        }
    });
    return result;
}

/**
 * Finds the best match in an array of FunctionObjects based on Jaccard distance.
 * @param arr - The array of FunctionObjects to search through.
 * @param set - The target set to compare against.
 * @returns The name of the best matching function.
 */
function findJacardBestMatch(arr: FunctionObject[], set: string[]): string {
    let bestMatch = {
        functionName: "",
        distance: Infinity
    };
    // Iterate over Function Sets
    arr.forEach(functionObj => {
        // Calculate Javcard distance
        const distance = jaccard.distance(functionObj.functionSet, set);
        const functionName = functionObj.functionName;

        // Check if this is a closer match
        if (distance < bestMatch.distance) {
            bestMatch = { functionName, distance };
        }
    });

    return bestMatch.functionName;
}



module.exports.generateFakeObject = generateFakeObject;


