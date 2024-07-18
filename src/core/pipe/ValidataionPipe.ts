import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import {
    ArgumentMetadata, BadRequestException, Injectable, PipeTransform, Type
} from '@nestjs/common';

@Injectable()
export class ValidataionPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      for (const key in errors[0].constraints) {
        throw new BadRequestException(errors[0].constraints[key]);
      }
    }
    return undefined;
  }

  private toValidate(metatype: Type<any>): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
