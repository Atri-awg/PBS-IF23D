import {
  ConflictException,
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

    // buat variabel untuk filter data kategori berdasarkan nama
    const nama_filter = createKategoriDto.nama
      .replace(/\s/g, '')
      .toLowerCase()
      .trim();

    // cek apakah nama kategori sudah ada di database
    const exist = await this.prisma.kategori.findFirst({
      where: {
        nama: nama_filter,
      },
    });

    // Jika nama kategori sudah ada, maka kembalikan response error
    if (exist) {
      throw new ConflictException({
        success: false,
        message: 'Data kategori gagal ditambahkan (nama kategori sudah ada)',
        metadata: {
          status: HttpStatus.CONFLICT,
        },
      });
    }

    // Simpan data kategori ke database menggunakan Prisma
    await this.prisma.kategori.create({
      data: {
        nama: createKategoriDto.nama,
      },
    });
    return {
      success: true,
      message: 'Data kategori berhasil ditambahkan',
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
        message: 'Data kategori tidak ditemukan',
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: data.length,
        },
      });
    }
    return {
      success: true,
      message: '',
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
