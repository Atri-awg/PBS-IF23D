import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';
import { PrismaService } from '../prisma.service';
import { noteExistKategori } from '../common/utils/not-exist-kategori.utils';
import { conflictKategori } from '../common/utils/conflict-kategori.utils';

@Injectable()
export class KategoriService {
  // Buat constructor untuk menginisialisasi PrismaService
  constructor(private readonly prisma: PrismaService) {}

  async create(createKategoriDto: CreateKategoriDto) {
    // return 'This action adds a new kategori';

    // panggil fungsi checkKategoriExist untuk mengecek apakah data kategori dengan nama tertentu sudah ada atau belum
    const nama_filter = await conflictKategori(
      this.prisma.kategori,
      process.env.FAILED_SAVE!,
      createKategoriDto.nama,
    );

    // Simpan data kategori ke database menggunakan Prisma
    await this.prisma.kategori.create({
      data: {
        nama: createKategoriDto.nama,
        nama_filter: nama_filter,
      },
    });
    return {
      success: true,
      message: process.env.SUCCESS_SAVE,
      metadata: {
        status: HttpStatus.CREATED,
      },
    };
  }

  async findAll() {
    const data = await this.prisma.kategori.findMany();

    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Data kategori tidak ditemukan',
        metadata: {
          status: HttpStatus.NOT_FOUND,
        },
      });
    }

    // jika data kategori tidak ditemukan, maka kembalikan response error
  }

  // buat fungsi untuk detail data
  async findOne(id: number) {
    // return `This action returns a #${id} kategori`;

    try {
      // panggil fungsi notExistKategori untuk mengecek apakah data kategori dengan id tertentu sudah ada atau belum
      const data = await noteExistKategori(
        this.prisma.kategori,
        id,
        'Data kategori tidak ditemukan',
      );

      // jika data kategori ditemukan, maka kembalikan data kategori
      return {
        success: true,
        message: 'Data kategori berhasil ditemukan',
        metadata: { status: HttpStatus.OK },
        data: data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException({
        success: false,
        message: 'Parameter slug atau id harus berupa angka',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  // buat fungsi untuk update data
  async update(id: number, updateKategoriDto: UpdateKategoriDto) {
    // return `This action updates a #${id} kategori`;

    try {
      // panggil fungsi notExistKategori untuk mengecek apakah data kategori dengan id tertentu sudah ada atau belum
      await noteExistKategori(
        this.prisma.kategori,
        id,
        'Data kategori tidak ditemukan',
      );

      // jika data ditemukan, maka update data kategori
      const nama_filter = await conflictKategori(
        this.prisma.kategori,
        process.env.FAILED_UPDATE!,
        updateKategoriDto.nama ?? '',
        id,
      );

      // Update data kategori berdasarkan id
      await this.prisma.kategori.update({
        where: {
          id: id,
        },
        data: {
          nama: updateKategoriDto.nama,
          nama_filter: nama_filter,
        },
      });

      return {
        success: true,
        message: process.env.SUCCESS_UPDATE,
        metadata: { status: HttpStatus.OK },
      };
    } catch (error) {
      // if (
      //   error instanceof NotFoundException ||
      //   error instanceof ConflictException
      // ) {
      //   throw error;
      // }

      // if (error instanceof ConflictException) {
      //   throw error;
      // }

      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException({
        success: false,
        message: 'Parameter slug atau id harus berupa angka',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  async remove(id: number) {
    // return `This action removes a #${id} kategori`;

    try {
      // panggil fungsi notExistKategori untuk mengecek apakah data kategori dengan id tertentu sudah ada atau belum
      await noteExistKategori(
        this.prisma.kategori,
        id,
        'Data kategori tidak ditemukan',
      );

      // jika data kategori ditemukan, maka hapus data kategori
      // Hapus data kategori berdasarkan id
      await this.prisma.kategori.delete({
        where: {
          id: id,
        },
      });
      return {
        success: true,
        message: 'Data kategori berhasil dihapus',
        metadata: { status: HttpStatus.OK },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException({
        success: false,
        message: 'Parameter slug atau id harus berupa angka',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }
}
