import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Gauge } from 'prom-client';
import * as v8 from 'v8';

@Injectable()
export class GCMetricService {
  private gcCount = 0;

  constructor(
    @InjectMetric('nodejs_gc_total')
    private readonly gcCounter: Gauge<string>,
    @InjectMetric('nodejs_memory_used_bytes')
    private readonly memoryUsedGauge: Gauge<string>,
    @InjectMetric('nodejs_memory_total_bytes')
    private readonly memoryTotalGauge: Gauge<string>,
  ) {
    if (global.gc) {
      process.on('gc', () => {
        this.gcCount++;
        this.gcCounter.set(this.gcCount); // GC 횟수 업데이트
      });
    } else {
      console.warn('GC is not exposed. Please run Node.js with --expose-gc flag.');
    }
  }

  startGcMetricsCollection() {
    setInterval(() => {
      const memoryUsage = process.memoryUsage();
      this.memoryUsedGauge.set(memoryUsage.rss);
      this.memoryTotalGauge.set(v8.getHeapStatistics().total_available_size);
    }, 10000);
  }
}
