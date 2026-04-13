import { ConflictException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
// buat fungsi untuk mengecek apakah data kategori dengan id tertentu sudah ada atau belum
export const conflictKategori = async (
  prisma: PrismaService['kategori'],
  id: number,
  message: string,
  nama: string,
) => {
  // buat variabel untuk filter data kategori berdasarkan nama
  const nama_filter = nama.replace(/\s/g, '').toLowerCase().trim();

  // cek apakah nama kategori sudah ada di database
  // fineFirst untuk yang bikan primary key, findUnique untuk yang primary key
  const exist = await prisma.findFirst({
    where: {
      NOT: { id: id },
      nama_filter: nama_filter,
    },
  });

  // Jika nama kategori sudah ada, maka kembalikan response error
  if (exist) {
    throw new ConflictException({
      success: false,
      message: message,
      metadata: {
        status: HttpStatus.CONFLICT,
      },
    });
  }

  return nama_filter;
};
