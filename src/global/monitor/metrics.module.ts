import { Module } from '@nestjs/common';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';
import { MetricsInterceptor } from './MetricsInterceptor';

@Module({
  providers: [
    MetricsInterceptor,
    makeCounterProvider({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'url'],
    }),
    makeCounterProvider({
      name: 'http_response_status_total',
      help: 'Total number of HTTP responses by status code',
      labelNames: ['statusCode'],
    }),
  ],
  exports: [],
})
export class MetricsModule {}
