import { HttpException } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

// buat variabel untuk endpoint kategori
export const kategori_api = axios.create({
  baseURL: 'http://localhost:3001/api/kategori',
  timeout: 1000,
});

// kok bisa buat instance axios untuk kategori? karena kita akan menggunakan axios untuk mengakses endpoint kategori di service kategori, jadi kita buat instance axios khusus untuk kategori agar lebih mudah dalam mengelola endpoint kategori dan juga untuk menambahkan interceptor untuk response error pada instance axios tersebut.
// buat interceptor untuk response
kategori_api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message = error.response?.data?.message;
    const status = error.response?.status;

    // jika status error, maka kembalikan response error
    if (status && message) {
      throw new HttpException(message, status);
    }
    // jika tidak ada status error, maka kembalikan response error internal server error
    throw new HttpException('Internal error', 500);
  },
);
