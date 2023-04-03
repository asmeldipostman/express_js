/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseError, IError, IHttpStatus, find } from "@point-hub/express-error-handler";
import { MongoServerError } from "mongodb";

export default class MongoError extends BaseError {
  constructor(err: MongoServerError) {
    const error: IError = find(400) as IHttpStatus;
    if (err.code === 121) {
      // handle schema validation error
      error.errors = {} as any;
      const errorMessage = err.errInfo?.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied;
      errorMessage.forEach((element: any) => {
        const obj: any = {};
        obj[element.propertyName] = element.details;
        error.errors = obj;
      });
    } else if (err.code === 11000) {
      // TODO: handle unique validation
    }
    super(error);
  }
  get isOperational() {
    return true;
  }
}
