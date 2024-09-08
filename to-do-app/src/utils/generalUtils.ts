type DebouncedFunction<T extends unknown[]> = (...args: T) => void;

export function debounce<T extends unknown[]>(
    func: (...args: T) => void,
    delay: number
  ): DebouncedFunction<T> {
    let timeoutId: NodeJS.Timeout;
  
    return function debounced(...args: T) {
      clearTimeout(timeoutId);
  
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
}