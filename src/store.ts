import { create } from 'zustand';
import type { ProcessingParams, ImageState } from './types';

interface AppStore extends ImageState {
  params: ProcessingParams;
  setOriginalImage: (image: ImageData | null) => void;
  setProcessedImage: (image: ImageData | null) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  setError: (error: string | null) => void;
  updateParams: (params: Partial<ProcessingParams>) => void;
  resetParams: () => void;
}

const defaultParams: ProcessingParams = {
  algorithm: 'canny',
  cannyThreshold1: 50,
  cannyThreshold2: 150,
  sobelKSize: 3,
  laplacianKSize: 3,
  thresholdValue: 128,
  gaussianBlur: 5,
  lineThickness: 1,
  contrast: 1.0,
  invertColors: false,
};

export const useStore = create<AppStore>((set) => ({
  originalImage: null,
  processedImage: null,
  isProcessing: false,
  error: null,
  params: defaultParams,
  setOriginalImage: (originalImage) => set({ originalImage }),
  setProcessedImage: (processedImage) => set({ processedImage }),
  setIsProcessing: (isProcessing) => set({ isProcessing }),
  setError: (error) => set({ error }),
  updateParams: (newParams) =>
    set((state) => ({
      params: { ...state.params, ...newParams },
    })),
  resetParams: () => set({ params: defaultParams }),
}));
