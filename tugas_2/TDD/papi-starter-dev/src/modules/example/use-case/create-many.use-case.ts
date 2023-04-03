import { ExampleEntity, ExampleStatusTypes } from "../model/example.entity.js";
import { ExampleRepository } from "../model/example.repository.js";
import { validate } from "../validation/create-many.validation.js";
import DatabaseConnection, { CreateManyOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class CreateManyExampleUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(documents: Array<DocumentInterface>, options: CreateManyOptionsInterface) {
    try {
      // validate request body
      validate(documents);

      // define entity
      const entities = [];
      for (const document of documents) {
        entities.push(
          new ExampleEntity({
            name: document.name,
            status: ExampleStatusTypes.Active,
            createdAt: new Date(),
          })
        );
      }

      // save to database
      const exampleRepository = new ExampleRepository(this.db);
      const response = await exampleRepository.createMany(entities, options);

      return {
        acknowledged: response.acknowledged,
        insertedCount: response.insertedCount,
        insertedIds: response.insertedIds,
      };
    } catch (error) {
      throw error;
    }
  }
}
