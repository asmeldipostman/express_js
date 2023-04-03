import { isValid } from "date-fns";
import request from "supertest";
import { ExampleStatusTypes } from "../model/example.entity";
import ExampleFactory from "../model/example.factory";
import { createApp } from "@src/app.js";
import { resetDatabase } from "@src/test/utils.js";

describe("retrieve all examples", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to retrieve all examples", async () => {
    const app = await createApp();

    const exampleFactory = new ExampleFactory();
    const data = [
      {
        name: "John Doe",
      },
      {
        name: "Jane",
      },
      {
        name: "Charles",
      },
    ];
    exampleFactory.sequence(data);
    await exampleFactory.createMany(3);

    const response = await request(app).get(`/v1/examples`);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.examples.length).toStrictEqual(3);
    expect(response.body.examples[0]._id).toBeDefined();
    expect(response.body.examples[0].name).toStrictEqual(data[0].name);
    expect(response.body.examples[0].status).toStrictEqual(ExampleStatusTypes.Active);
    expect(isValid(new Date(response.body.examples[0].createdAt))).toBeTruthy();
    expect(response.body.examples[1].name).toStrictEqual(data[1].name);
    expect(response.body.examples[2].name).toStrictEqual(data[2].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
});
