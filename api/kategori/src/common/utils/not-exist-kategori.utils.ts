// Catatan: File ini digunakan untuk mengecek apakah kategori dengan nama tertentu sudah ada atau belum sebelum membuat kategori baru. Fungsi ini akan dipanggil di dalam service kategori sebelum melakukan operasi create.

import { HttpStatus, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

// buat fungsi cek data kategori
export const noteExistKategori = async (
  prisma: PrismaService['kategori'],
  id: number,
  message: string,
) => {
  // tampikan data kategori berdasarkan id
  const data = await prisma.findUnique({
    where: {
      id: id,
    },
  });

  // jika data kategori tidak ditemukan, maka kembalikan response error
  if (!data) {
    throw new NotFoundException({
      success: false,
      message: message,
      metadata: {
        status: HttpStatus.NOT_FOUND,
      },
    });
  }
  return data;
};

// function checkKategoriExist(nama: string) {

// }
