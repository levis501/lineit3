import { useEffect, useRef } from 'react';
import { useStore } from '../store';

export default function CanvasPreview() {
  const { originalImage, processedImage } = useStore();
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const processedCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (originalImage && originalCanvasRef.current) {
      const canvas = originalCanvasRef.current;
      canvas.width = originalImage.width;
      canvas.height = originalImage.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.putImageData(originalImage, 0, 0);
      }
    }
  }, [originalImage]);

  useEffect(() => {
    if (processedImage && processedCanvasRef.current) {
      const canvas = processedCanvasRef.current;
      canvas.width = processedImage.width;
      canvas.height = processedImage.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.putImageData(processedImage, 0, 0);
      }
    }
  }, [processedImage]);

  if (!originalImage) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-900 rounded-lg">
        <p className="text-gray-500">Upload an image to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Original</h3>
          <div className="bg-gray-900 rounded-lg p-4 overflow-auto">
            <canvas
              ref={originalCanvasRef}
              className="max-w-full h-auto mx-auto"
              style={{ imageRendering: 'auto' }}
            />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Processed</h3>
          <div className="bg-gray-900 rounded-lg p-4 overflow-auto">
            {processedImage ? (
              <canvas
                ref={processedCanvasRef}
                className="max-w-full h-auto mx-auto"
                style={{ imageRendering: 'auto' }}
              />
            ) : (
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Adjust parameters to process</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
