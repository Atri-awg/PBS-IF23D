import { ConflictException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
// buat fungsi untuk mengecek apakah data kategori dengan id tertentu sudah ada atau belum
export const conflictKategori = async (
  prisma: PrismaService['kategori'],
  message: string,
  nama: string,
  id?: number,
) => {
  // buat variabel untuk filter data kategori berdasarkan nama
  const nama_filter = nama.replace(/\s/g, '').toLowerCase().trim();

  // cek apakah nama kategori sudah ada di database
  // fineFirst untuk yang bikan primary key, findUnique untuk yang primary key
  const exist = await prisma.findFirst({
    where: {
      // ternary operator untuk mengecek apakah id ada atau tidak, jika id ada maka filter data kategori berdasarkan nama dan id yang tidak sama dengan id yang sedang diupdate, jika id tidak ada maka filter data kategori berdasarkan nama saja
      // NOT: id ? { id: id } : undefined,
      nama_filter: nama_filter,
      // spread operator untuk mengecek apakah id tidak sama dengan id yang sedang diupdate (jika id ada)
      ...(id ? { NOT: { id: id } } : undefined),
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
