import { useEffect, useRef } from 'react';
import { useStore } from '../store';

export function useImageProcessor() {
  const workerRef = useRef<Worker | null>(null);
  const { originalImage, params, setProcessedImage, setIsProcessing, setError } = useStore();

  useEffect(() => {
    // Initialize worker
    workerRef.current = new Worker(
      new URL('../workers/imageProcessor.worker.ts', import.meta.url),
      { type: 'module' }
    );

    workerRef.current.onmessage = (e) => {
      if (e.data.success) {
        setProcessedImage(e.data.imageData);
        setIsProcessing(false);
      } else {
        setError(e.data.error);
        setIsProcessing(false);
      }
    };

    workerRef.current.onerror = (error) => {
      setError(`Worker error: ${error.message}`);
      setIsProcessing(false);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, [setProcessedImage, setIsProcessing, setError]);

  useEffect(() => {
    if (originalImage && workerRef.current) {
      setIsProcessing(true);
      setError(null);
      workerRef.current.postMessage({
        imageData: originalImage,
        params,
      });
    }
  }, [originalImage, params, setIsProcessing, setError]);

  return null;
}
