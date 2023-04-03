import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { ExampleEntityInterface, ExampleStatusTypes } from "./example.entity.js";
import { ExampleRepository } from "./example.repository.js";
import { db } from "@src/database/database.js";

export default class ExampleFactory extends Factory<ExampleEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      status: ExampleStatusTypes.Active,
      createdAt: new Date(),
    };
  }

  async create() {
    const exampleRepository = new ExampleRepository(db);
    return await exampleRepository.create(this.makeOne());
  }

  async createMany(count: number) {
    const exampleRepository = new ExampleRepository(db);
    return await exampleRepository.createMany(this.makeMany(count));
  }
}
