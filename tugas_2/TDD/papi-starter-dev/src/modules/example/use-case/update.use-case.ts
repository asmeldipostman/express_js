import { objClean } from "@point-hub/express-utils";
import { ExampleEntity } from "../model/example.entity.js";
import { ExampleRepository } from "../model/example.repository.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class UpdateExampleUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, document: DocumentInterface, options: UpdateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // update database
      const exampleEntity = new ExampleEntity({
        name: document.name,
        updatedAt: new Date(),
      });

      const exampleRepository = new ExampleRepository(this.db);
      await exampleRepository.update(id, objClean(exampleEntity), options);

      return;
    } catch (error) {
      throw error;
    }
  }
}
