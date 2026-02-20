import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, ProductStatus } from './entities/product.entity';
import { Quote } from './entities/quote.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RequestQuoteDto } from './dto/request-quote.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAllPublished(): Promise<Product[]> {
    return this.productRepository.find({
      where: { status: ProductStatus.PUBLISHED },
      order: { createdAt: 'DESC' },
    });
  }

  async findAllAdmin(): Promise<Product[]> {
    return this.productRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  async requestQuote(
    user: User,
    productId: string,
    requestQuoteDto: RequestQuoteDto,
  ): Promise<Quote> {
    const product = await this.findOne(productId);

    const quote = this.quoteRepository.create({
      ...requestQuoteDto,
      user,
      product,
      userId: user.id,
      productId: product.id,
    });

    return this.quoteRepository.save(quote);
  }
}
