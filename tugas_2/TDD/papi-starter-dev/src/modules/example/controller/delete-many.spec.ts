import request from "supertest";
import { createApp } from "@src/app.js";

describe("delete many examples", () => {
  it("should be able to delete many examples", async () => {
    const app = await createApp();
    const response = await request(app).post("/v1/examples/delete-many");
    expect(response.statusCode).toEqual(204);
  });
});
