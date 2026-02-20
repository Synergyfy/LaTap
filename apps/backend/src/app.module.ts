import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './modules/users/entities/user.entity';
import { Business } from './modules/businesses/entities/business.entity';
import { Visit } from './modules/visitors/entities/visit.entity';
import { Notification } from './modules/notifications/entities/notification.entity';
import { Otp } from './modules/auth/entities/otp.entity';
import { Device } from './modules/devices/entities/device.entity';
import { Campaign } from './modules/campaigns/entities/campaign.entity';
import { CampaignTemplate } from './modules/campaigns/entities/campaign-template.entity';
import { Survey } from './modules/surveys/entities/survey.entity';
import { Product } from './modules/products/entities/product.entity';
import { Quote } from './modules/products/entities/quote.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BusinessesModule } from './modules/businesses/businesses.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { DevicesModule } from './modules/devices/devices.module';
import { VisitorsModule } from './modules/visitors/visitors.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { SurveysModule } from './modules/surveys/surveys.module';
import { ProductsModule } from './modules/products/products.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbType = configService.get<string>('DB_TYPE', 'postgres');
        if (dbType === 'sqlite') {
          return {
            type: 'sqlite',
            database: ':memory:',
            entities: [
              User,
              Business,
              Visit,
              Notification,
              Otp,
              Device,
              Campaign,
              CampaignTemplate,
              Survey,
              Product,
              Quote,
            ],
            synchronize: true,
            dropSchema: true,
          };
        }
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [
            User,
            Business,
            Visit,
            Notification,
            Otp,
            Device,
            Campaign,
            CampaignTemplate,
            Survey,
            Product,
            Quote,
          ],
          synchronize: configService.get<string>('NODE_ENV') === 'development',
          ssl:
            configService.get<string>('DB_SSL') === 'true'
              ? { rejectUnauthorized: false }
              : false,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    BusinessesModule,
    NotificationsModule,
    DevicesModule,
    VisitorsModule,
    CampaignsModule,
    SurveysModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
