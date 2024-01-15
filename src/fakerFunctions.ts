import fs from 'fs';
import path from 'path';

function extractFunctionCallsAndReturnTypes(fileContent: string): { [key: string]: any[] } {
    const methodRegex = /@example\s*\*\s*(faker\.\w+\.\w+\([^\)]*\))[^]*?\*\/[^]*?\w+\([^]*?\): (\w+);/gm;
    let match;
    let groupedMethods: { [key: string]: any[] } = {};

    while ((match = methodRegex.exec(fileContent)) !== null) {
        let fullMethodName = match[1]; // Extracts the full method name

        // Clean up the method name to remove unwanted characters and comments
        fullMethodName = fullMethodName.split('//')[0].trim(); // Removes trailing comments
        fullMethodName = fullMethodName.replace('*', '').trim(); // Removes asterisks

        const returnType = match[2]; // Captures the return type
        const functionSet = fullMethodName.replace('faker.', '').replace(/\([^\)]*\)$/, '').split('.');

        if (!groupedMethods[returnType]) {
            groupedMethods[returnType] = [];
        }

        groupedMethods[returnType].push({
            functionSet: functionSet,
            functionName: fullMethodName
        });
    }

    return groupedMethods;
}

export function processModulesDirectory(modulesDirectoryPath: string) {
    const allMethodDetails: { [key: string]: any[] } = {};

    const entries = fs.readdirSync(modulesDirectoryPath);
    entries.forEach((entry: string) => {
        const entryPath = path.join(modulesDirectoryPath, entry);
        if (fs.statSync(entryPath).isDirectory()) {
            const indexPath = path.join(entryPath, 'index.d.ts');
            if (fs.existsSync(indexPath)) {
                const fileContent = fs.readFileSync(indexPath, 'utf8');
                const methodDetails = extractFunctionCallsAndReturnTypes(fileContent);

                // Merge the method details into allMethodDetails
                for (const [returnType, methods] of Object.entries(methodDetails)) {
                    if (!allMethodDetails[returnType]) {
                        allMethodDetails[returnType] = [];
                    }
                    allMethodDetails[returnType].push(...(methods as any[])); // Cast methods to an array
                }
            }
        }
    });

    return allMethodDetails;
}

