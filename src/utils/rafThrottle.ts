export function throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timer: NodeJS.Timeout | null = null;
  
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
      if (!timer) {
        func.apply(this, args);
        timer = setTimeout(() => {
          timer = null;
        }, delay);
      }
    };
  }