import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { UserDTO, UserValidationGroups } from '../user.dto';

@Injectable()
export class AuthDataValidator implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const userData = new UserDTO();
    userData.populate(req.body);
    const validationErrors = await validate(userData, {
      groups: [UserValidationGroups.AUTH],
    });

    if (validationErrors.length > 0) {
      const constraintsArray = validationErrors
        .map(({ constraints }) => constraints)
        .map((constraints) => Object.values(constraints))
        .flat();

      throw new BadRequestException(constraintsArray);
    }

    next();
  }
}
