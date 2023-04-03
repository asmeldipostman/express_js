import request from "supertest";
import { createApp } from "@src/app.js";

describe("update many examples", () => {
  it("should be able to update many examples", async () => {
    const app = await createApp();
    const response = await request(app).post("/v1/examples/update-many");
    expect(response.statusCode).toEqual(204);
  });
});
