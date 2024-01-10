import {DataSource, EntityMetadata, EntitySchema} from "typeorm";
import { faker } from "@faker-js/faker";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";

type Constructor<T> = new (...args: any[]) => T;

export class FakeEntity {
    private readonly datasource: DataSource;
constructor(datasource: DataSource) {
    this.datasource = datasource;
}

generateFakeEntity<T>(
    entityClass: Constructor<T> | EntitySchema<T>,
    memo?: Set<any>
): T {
    memo = memo || new Set<any>;
    const entityMetadata: EntityMetadata = this.datasource.getMetadata(entityClass);
    const fakeObject = new (entityClass as Constructor<T>)();
    entityMetadata.columns.map(column => {
         if (!column.isVirtual && !column.isPrimary && !column.isCreateDate && !column.isUpdateDate) {
            const fakeValue = this.generateFakeValue(column);
            // @ts-ignore
            fakeObject[column.propertyName] = fakeValue;
        }
    });

    entityMetadata.relations.filter (relation => !(memo.has(relation.propertyName)) &&
                                                (relation.entityMetadata.name != relation.inverseEntityMetadata.name) &&
                                                (!!relation.inverseRelation) &&
                                               (relation.isOneToOne || relation.isOneToMany || relation.isManyToMany))
                            .map(relation => {
                                // @ts-ignore
                                    memo.add(relation.propertyName);
                                    // @ts-ignore
                                    fakeObject[relation.propertyName] = [this.generateFakeEntity(relation.inverseRelation.target as Constructor<T>, memo)];
                                }
                            );
    return fakeObject;
}


private generateFakeValue(column: ColumnMetadata) {
    let fakeValue;
    let columnType;
    if (!!column.default) return column.default;
    if (typeof column.type != "string") columnType = column.type.name;
    else columnType = column.type;
    if (column.isArray) return [];
    switch (columnType) {
        case "enum":
            fakeValue = "";
            break;
        case "varchar":
            fakeValue = faker.lorem.word();
            break;
        case "text":
            fakeValue = faker.lorem.sentence(5);
            break;
        case "int":
        case "integer":
            fakeValue = faker.datatype.number();
            break;
        case "float":
            fakeValue = faker.datatype.float();
            break;
        case "double":
            fakeValue = faker.datatype.float({ precision: 0.0001 });
            break;
        case "decimal":
            fakeValue = faker.datatype.float({ precision: 0.01 });
            break;
        case "boolean":
        case "Boolean":
            fakeValue = faker.datatype.boolean();
            break;
        case "json":
        case "simple-json":
            fakeValue = {};
            break;
        case "array":
            fakeValue = [];
            break;
        case "date":
            fakeValue = faker.date.past();
            break;
        case "time":
            fakeValue = faker.date.recent();
            break;
        case "timetz || timestamptz || timestamp || timestamp without time zone || timestamp with time zone || date || time || time without time zone || time with time zone":
            fakeValue = faker.date.recent();
            break;
        default:
            fakeValue = undefined;
            break;
    }
    return fakeValue;
}


}



