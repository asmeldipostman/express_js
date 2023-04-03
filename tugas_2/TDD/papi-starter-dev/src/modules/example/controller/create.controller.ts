import { NextFunction, Request, Response } from "express";
import { CreateExampleUseCase } from "../use-case/create.use-case.js";
import { db } from "@src/database/database.js";

export const createController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = db.startSession();

    db.startTransaction();

    const createExampleUseCase = new CreateExampleUseCase(db);
    const result = await createExampleUseCase.handle(req.body, { session });

    await db.commitTransaction();

    res.status(201).json({
      _id: result._id,
    });
  } catch (error) {
    await db.abortTransaction();
    next(error);
  } finally {
    await db.endSession();
  }
};
