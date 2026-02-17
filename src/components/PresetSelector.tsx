import { useStore } from '../store';
import { Preset } from '../types';

const presets: Preset[] = [
  {
    name: 'Fine Lines',
    description: 'Detailed line art with fine edges',
    params: {
      algorithm: 'canny',
      cannyThreshold1: 30,
      cannyThreshold2: 90,
      gaussianBlur: 3,
      lineThickness: 1,
      contrast: 1.2,
      invertColors: false,
    },
  },
  {
    name: 'Bold Lines',
    description: 'Strong, thick lines for coloring',
    params: {
      algorithm: 'canny',
      cannyThreshold1: 80,
      cannyThreshold2: 200,
      gaussianBlur: 5,
      lineThickness: 2,
      contrast: 1.5,
      invertColors: false,
    },
  },
  {
    name: 'Sketchy',
    description: 'Artistic sketch-like appearance',
    params: {
      algorithm: 'sobel',
      sobelKSize: 3,
      gaussianBlur: 7,
      lineThickness: 1,
      contrast: 1.0,
      invertColors: false,
    },
  },
  {
    name: 'High Contrast',
    description: 'Sharp, high-contrast edges',
    params: {
      algorithm: 'laplacian',
      laplacianKSize: 3,
      gaussianBlur: 3,
      lineThickness: 1,
      contrast: 1.8,
      invertColors: false,
    },
  },
];

export default function PresetSelector() {
  const { updateParams, resetParams } = useStore();

  const applyPreset = (preset: Preset) => {
    updateParams(preset.params);
  };

  return (
    <div className="space-y-2">
      {presets.map((preset) => (
        <button
          key={preset.name}
          onClick={() => applyPreset(preset)}
          className="w-full text-left bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-3 transition-colors"
        >
          <div className="font-medium text-white">{preset.name}</div>
          <div className="text-sm text-gray-400">{preset.description}</div>
        </button>
      ))}
      <button
        onClick={resetParams}
        className="w-full text-left bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-3 transition-colors border border-gray-600"
      >
        <div className="font-medium text-white">Reset to Default</div>
        <div className="text-sm text-gray-400">Clear all custom settings</div>
      </button>
    </div>
  );
}
