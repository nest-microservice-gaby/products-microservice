import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from '../common/dto/pagination.dto';
import { RpcException } from '@nestjs/microservices';

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

    const totalRegisters = await this.product.count({ where: { available: true } });
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
      throw new RpcException({ message: `Product with id ${id} not found`, status: HttpStatus.BAD_REQUEST });
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    const { id: __, ...data } = updateProductDto;
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
  async validateProduct(ids: number[]) {
    console.log(ids);
    const localId = Array.from(new Set(ids));
    this.logger.log(`Validating products with ids: ${localId}`);
    

    const products = await this.product.findMany({
      where: {
        id: {
          in: ids
        }
      }
    });

    if (products.length !== ids.length) {
      throw new RpcException({ message: 'Some products were not found', status: HttpStatus.BAD_REQUEST });
    }

    return products;
  }
}
