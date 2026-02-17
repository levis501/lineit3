export type AlgorithmType = 'canny' | 'sobel' | 'laplacian' | 'threshold';

export interface ProcessingParams {
  algorithm: AlgorithmType;
  cannyThreshold1?: number;
  cannyThreshold2?: number;
  sobelKSize?: number;
  laplacianKSize?: number;
  thresholdValue?: number;
  gaussianBlur?: number;
  lineThickness?: number;
  contrast?: number;
  invertColors?: boolean;
}

export interface ProcessingResult {
  imageData: ImageData;
  processTime: number;
}

export interface Preset {
  name: string;
  description: string;
  params: ProcessingParams;
}

export interface ImageState {
  originalImage: ImageData | null;
  processedImage: ImageData | null;
  isProcessing: boolean;
  error: string | null;
}
