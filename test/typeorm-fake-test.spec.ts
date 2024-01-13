import { DataSource } from "typeorm";
import {FakeEntity, generateNestedObject} from "./../src/FakeEntity";
import { Group } from "./entities/Group";
import { Post } from "./entities/Post";
import { Profile } from "./entities/Profile";
import { User } from "./entities/User";

describe('TypeORM Mock Tests', () => {
    let dataSource: DataSource;

    beforeEach(async () => {
        dataSource = new DataSource({
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            entities: [User, Profile, Post, Group],
            synchronize: true,
            logging: false
        });

        await dataSource.initialize();
    });

    afterEach(async () => {
        if (dataSource.isInitialized) {
            await dataSource.destroy();
        }
    });

    test('Your test here', async () => {
        const fakeEntity = new FakeEntity(dataSource);
        const fakeUser = fakeEntity.generateFakeEntity(User);
        const users = dataSource.getRepository(User).find
        expect(users).toBeDefined();

    });
});
