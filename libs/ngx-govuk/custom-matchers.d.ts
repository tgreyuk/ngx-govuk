export {};

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeGreaterThanOrEqualTo(a: number): R;
    }
  }
}
