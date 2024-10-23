import { Mutex } from 'async-mutex';

function MutexAlgorithm() {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    const mutex = new Mutex();
    descriptor.value = async function (...args: any[]) {
      const release = await mutex.acquire();
      console.log('뮤텍스 시작');
      try {
        const result = await originalMethod.apply(this, args);
        return result;
      } catch (error) {
        throw error;
      } finally {
        release();
        console.log('뮤텍스 완료');
      }
    };
  };
}

export { MutexAlgorithm };
