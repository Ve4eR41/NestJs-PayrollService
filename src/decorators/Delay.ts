export function Delay(ms: number = 1000) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      return new Promise(async (resolve) => {
        setTimeout(async () => {
          const result = await originalMethod.apply(this, args);
          resolve(result);
        }, ms);
      });
    };

    return descriptor;
  };
}