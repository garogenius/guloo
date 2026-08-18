import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { FaqsModule } from './faqs/faqs.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { SubscribersModule } from './subscribers/subscribers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        // synchronize: true will automatically add missing tables/columns, 
        // but it will NOT delete existing data or drop tables. 
        // In production, it's safer to use migrations and set this to false.
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    NewsModule,
    FaqsModule,
    TestimonialsModule,
    SubscribersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
