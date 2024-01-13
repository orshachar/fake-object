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

export function areKeysAndTypesEqual(obj1, obj2) {
    // Check if both arguments are objects
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return false;
    }

    // Get the keys of both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check if both objects have the same number of keys
    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        // Check if the key exists in the second object
        if (!keys2.includes(key)) {
            return false;
        }

        // If the property is an object, do a recursive check
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
            if (!areKeysAndTypesEqual(obj1[key], obj2[key])) {
                return false;
            }
        } else {
            // Check if the types of the values are the same
            if (typeof obj1[key] !== typeof obj2[key]) {
                return false;
            }
        }
    }

    return true;
}

export function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

export function isValidPhone(phone) {
    const regex = /^\d{10}$/;
    return regex.test(phone);
}
