import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { Product, ProductStatus } from './entities/product.entity';
import { Quote } from './entities/quote.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { RequestQuoteDto } from './dto/request-quote.dto';
import { User } from '../users/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

const mockProductRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
};

const mockQuoteRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
        {
          provide: getRepositoryToken(Quote),
          useValue: mockQuoteRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        description: 'Test Desc',
        price: 100,
        image: 'img.png',
        tag: 'Hardware',
      };
      const product = new Product();
      Object.assign(product, createProductDto);

      mockProductRepository.create.mockReturnValue(product);
      mockProductRepository.save.mockResolvedValue(product);

      const result = await service.create(createProductDto);

      expect(mockProductRepository.create).toHaveBeenCalledWith(
        createProductDto,
      );
      expect(mockProductRepository.save).toHaveBeenCalledWith(product);
      expect(result).toEqual(product);
    });
  });

  describe('findAllPublished', () => {
    it('should return only published products', async () => {
      const products = [new Product(), new Product()];
      mockProductRepository.find.mockResolvedValue(products);

      const result = await service.findAllPublished();

      expect(mockProductRepository.find).toHaveBeenCalledWith({
        where: { status: ProductStatus.PUBLISHED },
        order: { createdAt: 'DESC' },
      });
      expect(result).toEqual(products);
    });
  });

  describe('findAllAdmin', () => {
    it('should return all products', async () => {
      const products = [new Product(), new Product()];
      mockProductRepository.find.mockResolvedValue(products);

      const result = await service.findAllAdmin();

      expect(mockProductRepository.find).toHaveBeenCalledWith({
        order: { createdAt: 'DESC' },
      });
      expect(result).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should return a product if found', async () => {
      const product = new Product();
      mockProductRepository.findOne.mockResolvedValue(product);

      const result = await service.findOne('id');

      expect(mockProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'id' },
      });
      expect(result).toEqual(product);
    });

    it('should throw NotFoundException if not found', async () => {
      mockProductRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const product = new Product();
      product.name = 'Old Name';
      mockProductRepository.findOne.mockResolvedValue(product);
      mockProductRepository.save.mockResolvedValue({
        ...product,
        name: 'New Name',
      });

      const result = await service.update('id', { name: 'New Name' });

      expect(result.name).toEqual('New Name');
      expect(mockProductRepository.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      const product = new Product();
      mockProductRepository.findOne.mockResolvedValue(product);
      mockProductRepository.remove.mockResolvedValue(product);

      await service.remove('id');

      expect(mockProductRepository.remove).toHaveBeenCalledWith(product);
    });
  });

  describe('requestQuote', () => {
    it('should create a quote request', async () => {
      const user = new User();
      user.id = 'user-id';
      const product = new Product();
      product.id = 'product-id';
      const requestQuoteDto: RequestQuoteDto = {
        quantity: 10,
        location: 'Lagos',
        businessName: 'Biz',
        notes: 'Notes',
      };

      const quote = new Quote();

      mockProductRepository.findOne.mockResolvedValue(product);
      mockQuoteRepository.create.mockReturnValue(quote);
      mockQuoteRepository.save.mockResolvedValue(quote);

      const result = await service.requestQuote(
        user,
        'product-id',
        requestQuoteDto,
      );

      expect(mockProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'product-id' },
      });
      expect(mockQuoteRepository.create).toHaveBeenCalledWith({
        ...requestQuoteDto,
        user,
        product,
        userId: user.id,
        productId: product.id,
      });
      expect(mockQuoteRepository.save).toHaveBeenCalledWith(quote);
      expect(result).toEqual(quote);
    });
  });
});
