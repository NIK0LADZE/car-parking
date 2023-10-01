import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

// This is needed since there is no way to override useGlobalPipes for specific controllers
export class ValidationPipeWithGlobalOptions extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super({
      ...options,
      whitelist:
        typeof options?.whitelist !== 'undefined' ? options?.whitelist : true,
      transform:
        typeof options?.transform !== 'undefined' ? options?.transform : true,
    });
  }
}
