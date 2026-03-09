import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class KategoriService {
  // Buat constructor untuk menginisialisasi PrismaService
  constructor(private readonly prisma: PrismaService) {}

  async create(createKategoriDto: CreateKategoriDto) {
    // return 'This action adds a new kategori';
    // Simpan data kategori ke database menggunakan Prisma
    await this.prisma.kategori.create({
      data: {
        nama: 'M i n u m a n',
      },
    });
    return {
      success: true,
      massage: 'Data kategori berhasil ditambahkan',
      metadata: {
        status: HttpStatus.CREATED,
      },
    };
  }

  async findAll() {
    // return this.prisma.kategori.findMany();
    // tampilkan data kategori dengan nama dan deskripsi saja
    const data = await this.prisma.kategori.findMany();
    // Jika data kategori tidak ditemukan
    if (data.length === 0) {
      // throw new HttpException(
      //   {
      //     success: false,
      //     massage: 'Data kategori tidak ditemukan',
      //     metadata: {
      //       status: HttpStatus.NOT_FOUND,
      //       total_data: data.length,
      //     },
      //   },
      //   HttpStatus.NOT_FOUND,
      // );

      throw new NotFoundException({
        success: false,
        massage: 'Data kategori tidak ditemukan',
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: data.length,
        },
      });
    }
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
