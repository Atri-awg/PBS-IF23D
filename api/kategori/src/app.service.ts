import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHell(): string {
    return 'Selamat Sore, Semuanya!';
  }
}
