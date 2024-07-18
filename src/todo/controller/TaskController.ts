import { Controller, Get } from '@nestjs/common';

@Controller()
export class TaskController {
  @Get('task')
  helloTask(): string {
    return 'Hello';
  }
}
