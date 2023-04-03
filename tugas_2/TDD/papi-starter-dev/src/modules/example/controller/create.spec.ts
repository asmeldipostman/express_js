// import { isValid } from "date-fns";
import request from "supertest";
// import { ExampleStatusTypes } from "../model/example.entity.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve } from "@src/test/utils.js";

describe("create an example", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  // it("should return error if client don't send required data", async () => {
  //   const app = await createApp();

  //   const response = await request(app).post("/v1/examples").send();

  //   // expect http response
  //   expect(response.statusCode).toEqual(422);

  //   // expect response json
  //   expect(response.body.message).toBe("validation Error");
  //   expect(response.body.errors.name).toBe("name is required");
  // });
  it("should be able to create an example", async () => {
    const app = await createApp();

    const data = {
      name: "Asmeldi",
    };

    const response = await request(app).post("/v1/examples").send(data);

    // expect http response
    expect(response.statusCode).toEqual(201);

    // expect response json
    expect(response.body._id).toBeDefined();

    // expect recorded data
    const exampleRecord = await retrieve("examples", response.body._id);
    expect(exampleRecord?._id).toBeDefined();
    expect(exampleRecord?.name).toBe(data.name);
    expect(exampleRecord?.status).toBe("active");
    expect(exampleRecord?.createdAt).toBeDefined();
  });
});
