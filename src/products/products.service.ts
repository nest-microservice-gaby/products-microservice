import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger(ProductsService.name);

  onModuleInit() {
    this.$connect();
    this.logger.log(`Database Connected Successfully`);
  }
  create(createProductDto: CreateProductDto) {


    return this.product.create({
      data: createProductDto
    });
  }

  async findAll(PaginationDto: PaginationDto) {
    const { page, limit } = PaginationDto;

    const totalRegisters = await this.product.count({where: {available: true}});
    const totalPages = Math.ceil(totalRegisters / limit!);

    return {
      data: await this.product.findMany({
        skip: (page! - 1) * limit!,
        take: limit,
        where: {
          available: true
        }
      }),
      metadata: {
        page, totalPages, totalRegisters

      }
    }


  }

  async findOne(id: number) {
    const product = await
      this.product.findUnique({
        where: {
          id, available: true
        }
      });

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    const {id:__, ...data} = updateProductDto;
    await this.findOne(id);

    return this.product.update({
      where: {
        id
      },
      data: data
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    const product = await this.product.update({
      where: {
        id
      },
      data: {
        available: false
      }
    });

    return product;
  }
}
