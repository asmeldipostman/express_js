import { ExampleRepository } from "../model/example.repository.js";
import DatabaseConnection, { DeleteOptionsInterface } from "@src/database/connection.js";

export class DeleteExampleUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, options: DeleteOptionsInterface) {
    try {
      const exampleRepository = new ExampleRepository(this.db);
      const response = await exampleRepository.delete(id, options);

      return {
        acknowledged: response.acknowledged,
        deletedCount: response.deletedCount,
      };
    } catch (error) {
      throw error;
    }
  }
}
