import { BaseRepository } from "@src/database/base-repository.js";
import DatabaseConnection, {
  CreateOptionsInterface,
  DeleteOptionsInterface,
  DocumentInterface,
  QueryInterface,
  RetrieveAllOptionsInterface,
  RetrieveOptionsInterface,
  UpdateOptionsInterface,
  CreateResultInterface,
  RetrieveResultInterface,
  RetrieveAllResultInterface,
  UpdateResultInterface,
  AggregateResultInterface,
  AggregateQueryInterface,
  AggregateOptionsInterface,
  DeleteResultInterface,
  CreateManyOptionsInterface,
  CreateManyResultInterface,
} from "@src/database/connection.js";

export class ExampleRepository extends BaseRepository {
  constructor(db: DatabaseConnection) {
    super(db, "examples");
  }

  public async create(document: DocumentInterface, options?: CreateOptionsInterface): Promise<CreateResultInterface> {
    return await this.collection().create(document, options);
  }

  public async createMany(
    documents: Array<DocumentInterface>,
    options?: CreateManyOptionsInterface
  ): Promise<CreateManyResultInterface> {
    return await this.collection().createMany(documents, options);
  }

  public async retrieve(id: string, options?: RetrieveOptionsInterface): Promise<RetrieveResultInterface> {
    return await this.collection().retrieve(id, options);
  }

  public async retrieveAll(
    query: QueryInterface,
    options?: RetrieveAllOptionsInterface
  ): Promise<RetrieveAllResultInterface> {
    return await this.collection().retrieveAll(query, options);
  }

  public async update(
    id: string,
    document: DocumentInterface,
    options?: UpdateOptionsInterface
  ): Promise<UpdateResultInterface> {
    return await this.collection().update(id, document, options);
  }

  public async delete(id: string, options?: DeleteOptionsInterface): Promise<DeleteResultInterface> {
    return await this.collection().delete(id, options);
  }

  public async aggregate(
    pipeline: never,
    query: AggregateQueryInterface,
    options?: AggregateOptionsInterface
  ): Promise<AggregateResultInterface> {
    return await this.collection().aggregate(pipeline, query, options);
  }
}
