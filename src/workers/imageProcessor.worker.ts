import type { ProcessingParams } from '../types';
import { applyCanny } from '../libs/algorithms/canny';
import { applySobel } from '../libs/algorithms/sobel';
import { applyLaplacian } from '../libs/algorithms/laplacian';

// Web Worker for image processing
self.onmessage = async (e: MessageEvent) => {
  const { imageData, params } = e.data as {
    imageData: ImageData;
    params: ProcessingParams;
  };

  try {
    const startTime = performance.now();

    let result: ImageData;

    switch (params.algorithm) {
      case 'canny':
        result = applyCanny(
          imageData,
          params.cannyThreshold1,
          params.cannyThreshold2,
          params.gaussianBlur
        );
        break;
      case 'sobel':
        result = applySobel(imageData, params.sobelKSize, params.gaussianBlur);
        break;
      case 'laplacian':
        result = applyLaplacian(imageData, params.laplacianKSize, params.gaussianBlur);
        break;
      case 'threshold':
        result = applyThreshold(imageData, params.thresholdValue || 128);
        break;
      default:
        throw new Error(`Unknown algorithm: ${params.algorithm}`);
    }

    // Apply contrast adjustment
    if (params.contrast !== undefined && params.contrast !== 1.0) {
      result = applyContrast(result, params.contrast);
    }

    // Apply color inversion
    if (params.invertColors) {
      result = invertImageData(result);
    }

    const processTime = performance.now() - startTime;

    self.postMessage({
      success: true,
      imageData: result,
      processTime,
    });
  } catch (error) {
    self.postMessage({
      success: false,
      error: error instanceof Error ? error.message : 'Processing failed',
    });
  }
};

function applyThreshold(imageData: ImageData, threshold: number): ImageData {
  const output = new ImageData(imageData.width, imageData.height);
  const data = imageData.data;
  const outData = output.data;

  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    const value = gray > threshold ? 255 : 0;
    outData[i] = value;
    outData[i + 1] = value;
    outData[i + 2] = value;
    outData[i + 3] = 255;
  }

  return output;
}

function applyContrast(imageData: ImageData, contrast: number): ImageData {
  const output = new ImageData(imageData.width, imageData.height);
  const data = imageData.data;
  const outData = output.data;
  const factor = (259 * (contrast * 255 + 255)) / (255 * (259 - contrast * 255));

  for (let i = 0; i < data.length; i += 4) {
    outData[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
    outData[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
    outData[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
    outData[i + 3] = data[i + 3];
  }

  return output;
}

function invertImageData(imageData: ImageData): ImageData {
  const output = new ImageData(imageData.width, imageData.height);
  const data = imageData.data;
  const outData = output.data;

  for (let i = 0; i < data.length; i += 4) {
    outData[i] = 255 - data[i];
    outData[i + 1] = 255 - data[i + 1];
    outData[i + 2] = 255 - data[i + 2];
    outData[i + 3] = data[i + 3];
  }

  return output;
}
