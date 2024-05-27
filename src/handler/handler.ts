import {NextFunction, Request, Response} from 'express';
import log4js from 'log4js';
import {ValidationError} from "./errors/validationError";
import {NotFoundError} from "./errors/notFoundError";
import {InternalError} from "./errors/internalError";
import {BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND} from "http-status";
import {ClientError} from "./errors/clientError";

export const errorHandler = (err: any, _: Request, res: Response, next: NextFunction) => {
  console.log('errorHandler');

  const logger = log4js.getLogger();

  if (err instanceof ValidationError) {
    logger.error('Validation error:' + err.message);
    res.status(BAD_REQUEST).json({ message: 'Validation Error', errors: err.validationErrors });
  } else if (err instanceof NotFoundError) {
    logger.error('Not Found error:', err.message);
    res.status(NOT_FOUND).send({ message: err.message });
  } else if (err instanceof ClientError) {
    logger.error('Client is unavailable:', err.message);
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  } else if (err instanceof InternalError) {
    logger.error('Internal error:', err.message);
    res.status(err.status).send({ message: err.message });
  } else {
    logger.error('Unhandled error');
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
  }

  next();
};