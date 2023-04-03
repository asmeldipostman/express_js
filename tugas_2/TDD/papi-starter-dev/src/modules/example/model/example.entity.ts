export enum ExampleStatusTypes {
  Active = "active",
  Suspended = "suspended",
}

export interface ExampleEntityInterface {
  _id?: string;
  name?: string;
  status?: ExampleStatusTypes;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ExampleEntity implements ExampleEntityInterface {
  public _id?: string;
  public name?: string;
  public status?: ExampleStatusTypes;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(example: ExampleEntityInterface) {
    this._id = example._id;
    this.name = example.name;
    this.status = example.status;
    this.createdAt = example.createdAt;
    this.updatedAt = example.updatedAt;
  }
}
