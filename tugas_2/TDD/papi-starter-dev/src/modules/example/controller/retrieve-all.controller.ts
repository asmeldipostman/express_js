import { NextFunction, Request, Response } from "express";
import { RetrieveAllExampleUseCase } from "../use-case/retrieve-all.use-case.js";
import { QueryInterface } from "@src/database/connection.js";
import { db } from "@src/database/database.js";

export const retrieveAllController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createExampleUseCase = new RetrieveAllExampleUseCase(db);
    // const query: QueryInterface = {
    //   fields: "name, createdAt",
    //   excludeFields: ["_id"],
    //   filter: {},
    //   page: 1,
    //   pageSize: 10,
    //   sort: "name-",
    // };
    const result = await createExampleUseCase.handle(req.query as unknown as QueryInterface);

    res.status(200).json({
      examples: result.examples,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};
