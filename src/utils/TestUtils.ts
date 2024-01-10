export function getRandomEnum<E> (e: any) {
    const rand = Math.floor(Math.random() * Object.keys(e).length);
    return e[Object.keys(e)[rand]];
}

export function clearEmpties(o: { [x: string]: any; }) {
    for (const k in o) {
        if (!o[k] || typeof o[k] !== "object") {
            if (o[k] == undefined) delete o[k];
            continue; // If null or not an object, skip to the next iteration
        }

        // The property is an object
        clearEmpties(o[k]); // <-- Make a recursive call on the nested object
        if (Object.keys(o[k]).length === 0) {
            delete o[k]; // The object had no properties, so delete that property
        }
    }
    return o;
}
