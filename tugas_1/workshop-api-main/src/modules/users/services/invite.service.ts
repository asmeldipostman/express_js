import { ApiError } from "@point-hub/express-error-handler";
// import { validate } from "../request/invite.request";
import DatabaseConnection from "@src/database/connection.js";

export class InviteUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(data: any, session: any) {
    //check unathorized
    const authorizationHeader = data.header.authorization ?? "";
    if (authorizationHeader === "") {
      throw new ApiError(401);
    }

    // validate(data.body);

    return {
      _id: "12345",
    };
  }
}
