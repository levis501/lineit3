import { useStore } from '../store';
import { AlgorithmType } from '../types';

export default function ControlsPanel() {
  const { params, updateParams } = useStore();

  const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateParams({ algorithm: e.target.value as AlgorithmType });
  };

  return (
    <div className="space-y-4">
      {/* Algorithm Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Algorithm</label>
        <select
          value={params.algorithm}
          onChange={handleAlgorithmChange}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="canny">Canny Edge Detection</option>
          <option value="sobel">Sobel Operator</option>
          <option value="laplacian">Laplacian</option>
          <option value="threshold">Simple Threshold</option>
        </select>
      </div>

      {/* Canny Parameters */}
      {params.algorithm === 'canny' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Lower Threshold: {params.cannyThreshold1}
            </label>
            <input
              type="range"
              min="0"
              max="255"
              value={params.cannyThreshold1}
              onChange={(e) => updateParams({ cannyThreshold1: Number(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Upper Threshold: {params.cannyThreshold2}
            </label>
            <input
              type="range"
              min="0"
              max="255"
              value={params.cannyThreshold2}
              onChange={(e) => updateParams({ cannyThreshold2: Number(e.target.value) })}
              className="w-full"
            />
          </div>
        </>
      )}

      {/* Sobel Parameters */}
      {params.algorithm === 'sobel' && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Kernel Size: {params.sobelKSize}
          </label>
          <select
            value={params.sobelKSize}
            onChange={(e) => updateParams({ sobelKSize: Number(e.target.value) })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">1</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="7">7</option>
          </select>
        </div>
      )}

      {/* Laplacian Parameters */}
      {params.algorithm === 'laplacian' && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Kernel Size: {params.laplacianKSize}
          </label>
          <select
            value={params.laplacianKSize}
            onChange={(e) => updateParams({ laplacianKSize: Number(e.target.value) })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">1</option>
            <option value="3">3</option>
            <option value="5">5</option>
          </select>
        </div>
      )}

      {/* Threshold Parameters */}
      {params.algorithm === 'threshold' && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Threshold Value: {params.thresholdValue}
          </label>
          <input
            type="range"
            min="0"
            max="255"
            value={params.thresholdValue}
            onChange={(e) => updateParams({ thresholdValue: Number(e.target.value) })}
            className="w-full"
          />
        </div>
      )}

      {/* Common Parameters */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Gaussian Blur: {params.gaussianBlur}
        </label>
        <input
          type="range"
          min="1"
          max="21"
          step="2"
          value={params.gaussianBlur}
          onChange={(e) => updateParams({ gaussianBlur: Number(e.target.value) })}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Contrast: {params.contrast?.toFixed(2)}
        </label>
        <input
          type="range"
          min="0.5"
          max="2.0"
          step="0.1"
          value={params.contrast}
          onChange={(e) => updateParams({ contrast: Number(e.target.value) })}
          className="w-full"
        />
      </div>

      <div className="flex items-center">
        <input
          id="invert"
          type="checkbox"
          checked={params.invertColors}
          onChange={(e) => updateParams({ invertColors: e.target.checked })}
          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
        />
        <label htmlFor="invert" className="ml-2 text-sm font-medium text-gray-300">
          Invert Colors
        </label>
      </div>
    </div>
  );
}
