declare module 'gifler' {
  interface Animator {
    animateInCanvas(canvas: HTMLCanvasElement): Animator;
    setFrameRate(frameRate: number): Animator;
  }

  interface Gifler {
    get(callback: (animator: Animator) => void): void;
  }

  function gifler(url: string): Gifler;

  export default gifler;
}