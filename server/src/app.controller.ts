import { Body, Controller, Get, HttpCode, Ip, Post, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { Public } from './app.decorator';
import { AppService } from './app.service';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AppController {
  constructor(private app: AppService) {}

  @Get()
  @Public()
  async index(@Ip() ip: string) {
    return { ip };
  }

  @Post('login')
  @HttpCode(204)
  @Public()
  async authLogin(@Body() body: LoginDto, @Res({ passthrough: true }) res: FastifyReply): Promise<void> {
    const access_token = await this.app.login(body.email, body.password);
    res.setCookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    });
  }
}
