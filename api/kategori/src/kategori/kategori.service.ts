import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class KategoriService {
  // Buat constructor untuk menginisialisasi PrismaService
  constructor(private readonly prisma: PrismaService) {}

  create(createKategoriDto: CreateKategoriDto) {
    return 'This action adds a new kategori';
  }

  async findAll() {
    // return this.prisma.kategori.findMany();
    // tampilkan data kategori dengan nama dan deskripsi saja
    const data = await this.prisma.kategori.findMany();
    return {
      success: true,
      massage: '',
      metadata: {
        status: HttpStatus.OK,
        total_data: data.length,
      },
      data: data,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} kategori`;
  }

  update(id: number, updateKategoriDto: UpdateKategoriDto) {
    return `This action updates a #${id} kategori`;
  }

  remove(id: number) {
    return `This action removes a #${id} kategori`;
  }
}
