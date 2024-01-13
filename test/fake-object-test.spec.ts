import { generateFakeObject } from "../src"
import { areKeysAndTypesEqual, isValidEmail } from "./utils";

describe('Fake Object Tests', () => {
    test('fake object should include all properties of original object', async () => {
        const companyStructure = {
            companyName: "Tech Solutions Inc.",
            departments: {
                IT: {
                    teams: {
                        development: {
                            members: {
                                teamLead: "Alice",
                                developer1: "Bob",
                                developer2: "Charlie"
                            }
                        },
                        operations: {
                            members: {
                                teamLead: "David",
                                sysAdmin: "Eve",
                                networkEngineer: "Frank"
                            }
                        }
                    }
                },
                HR: {
                    teams: {
                        recruitment: {
                            members: {
                                teamLead: {
                                    name: "Grace",
                                    email: "grace@grace.com"
        
                                },
                                recruiter1: "Heidi",
                                recruiter2: "Ivan"
                            }
                        },
                        employeeRelations: {
                            members: {
                                teamLead: "Judy",
                                specialist: "Kyle"
                            }
                        }
                    }
                },
                marketing: {
                    teams: {
                        advertising: {
                            members: {
                                teamLead: "Liam",
                                designer: "Mia",
                                copywriter: "Noah"
                            }
                        },
                        publicRelations: {
                            members: {
                                teamLead: "Olivia",
                                prSpecialist: "Peter"
                            }
                        }
                    }
                }
            }
        };
        const fakeCompanyStructure = generateFakeObject(companyStructure);
        expect(areKeysAndTypesEqual(companyStructure, fakeCompanyStructure)).toBe(true);

    });

    test('fake object should include relevant property values', async () => {
        const objWithEmail = { user: { name: "bbb", email: "temp@temp.com"} };
        const fakeObject = generateFakeObject(objWithEmail);
        expect(isValidEmail(fakeObject.user.email)).toBe(true);
    });

    test('fake object should handle null values', async () => {
        const objWithNull = { user: { name: "ccc", email: null } };
        const fakeObject = generateFakeObject(objWithNull);
        expect(fakeObject.user.email).toBeNull();
    });

    test('fake object should handle nested objects', async () => {
        const objWithNested = { user: { name: "ddd", address: { city: "New York", country: "USA" } } };
        const fakeObject = generateFakeObject(objWithNested);
        expect(fakeObject.user.address.city).not.toBeUndefined();
        expect(fakeObject.user.address.country).not.toBeUndefined();
    });

    test('fake object should handle arrays', async () => {
        const objWithArray = { users: ["Alice", "Bob", "Charlie"] };
        const fakeObject = generateFakeObject(objWithArray);
        expect(fakeObject.users.length).toBe(objWithArray.users.length);
    });

    test('fake object temp', async () => {
        const nestedObject = {
            name: 'John Doe',
            age: 30,
            address: {
              street: '123 Main St',
              city: 'Anytown',
              state: 'CA',
              country: 'USA'
            }
          };
          
          const fakeObject = generateFakeObject(nestedObject);
          console.log(fakeObject);
    });
});