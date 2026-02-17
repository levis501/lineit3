// Placeholder for opencv-wasm loader
// This will be implemented once opencv-wasm is installed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cv: any = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loadOpenCV(): Promise<any> {
  if (cv) {
    return cv;
  }

  // TODO: Load opencv-wasm here
  // For now, return a mock object
  console.warn('OpenCV not loaded - placeholder implementation');

  return new Promise((resolve) => {
    // This is a placeholder. Once opencv-wasm is installed,
    // we'll load it from CDN or local bundle
    setTimeout(() => {
      cv = { loaded: false };
      resolve(cv);
    }, 100);
  });
}

export function isOpenCVReady(): boolean {
  return cv !== null;
}
