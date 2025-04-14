import { Module } from '@nestjs/common';
import { makeCounterProvider, makeHistogramProvider } from '@willsoto/nestjs-prometheus';
import { MetricsInterceptor } from './MetricsInterceptor';
import { GCMetricService } from './GCMetrics.Service';

const metricsProviders = [
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
  makeCounterProvider({
    name: 'exceptions_total',
    help: 'Total number of exceptions thrown',
    labelNames: ['method', 'url'],
  }),
  makeHistogramProvider({
    name: 'http_request_duration_seconds',
    help: 'HTTP 요청 처리 시간',
    labelNames: ['method', 'url'],
    buckets: [0.1, 0.3, 0.5, 1, 2, 5],
  }),
];

@Module({
  providers: [MetricsInterceptor, ...metricsProviders, GCMetricService],
})
export class MetricsModule {}
