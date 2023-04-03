import { ExampleEntity, ExampleStatusTypes } from "../model/example.entity.js";
import { ExampleRepository } from "../model/example.repository.js";
import { validate } from "../validation/create.validation.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class CreateExampleUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(document: DocumentInterface, options: CreateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // save to database
      const exampleEntity = new ExampleEntity({
        name: document.name,
        status: ExampleStatusTypes.Active,
        createdAt: new Date(),
      });
      const exampleRepository = new ExampleRepository(this.db);
      const response = await exampleRepository.create(exampleEntity, options);

      return {
        acknowledged: response.acknowledged,
        _id: response._id,
      };
    } catch (error) {
      throw error;
    }
  }
}
