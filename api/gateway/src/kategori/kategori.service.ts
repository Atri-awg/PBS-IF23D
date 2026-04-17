import { Injectable } from '@nestjs/common';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';
import axios from 'axios';

// buat interface untuk data kategori
interface Kategori {
  id: number;
  nama: string;
  nama_filter: string;
}

@Injectable()
export class KategoriService {
  // baut variabel untuk menyimpan endpoint kategori
  private readonly base_url = 'http://localhost:3001/api/kategori';

  create(createKategoriDto: CreateKategoriDto) {
    return 'This action adds a new kategori';
  }

  // fungsi untuk akses
  // endpoint kategori (findAll)
  // async findAll(): Promise<Kategori[]> { untuk menambahkan tipe data yang dikembalikan oleh fungsi findAll
  async findAll(): Promise<Kategori[]> {
    // return `This action returns all kategori`;
    const response = await axios.get<Kategori[]>(`${this.base_url}`);
    return response.data;
  }

  async findOne(id: number): Promise<Kategori[]> {
    // return `This action returns a #${id} kategori`;
    const response = await axios.get<Kategori[]>(`${this.base_url}/${id}`);
    return response.data;
  }

  update(id: number, updateKategoriDto: UpdateKategoriDto) {
    return `This action updates a #${id} kategori`;
  }

  remove(id: number) {
    return `This action removes a #${id} kategori`;
  }
}
