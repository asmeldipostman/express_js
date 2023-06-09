import { NextFunction, Request, Response } from "express";
import { validate } from "../request/invite.request.js";
import { InviteUserService } from "../services/invite.service.js";
import { db } from "@src/database/database.js";

export const invite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = db.startSession();

    db.startTransaction();

    validate(req.body);

    const inviteUserService = new InviteUserService(db);
    // const result = await inviteUserService.handle(
    //   {
    //     headers: req.headers,
    //     body: req.body,
    //   },
    //   { session }
    // );
    const result = await inviteUserService.handle(req.body, { session });

    await db.commitTransaction();

    res.status(201).json({
      _id: result._id,
    });
  } catch (error) {
    await db.abortTransaction();
    next(error);
  } finally {
    await db.endSession();
    await db.close();
  }
};
