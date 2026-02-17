import { useStore } from './store';
import { useImageProcessor } from './hooks/useImageProcessor';
import ImageUploader from './components/ImageUploader';
import CanvasPreview from './components/CanvasPreview';
import ControlsPanel from './components/ControlsPanel';
import PresetSelector from './components/PresetSelector';
import ExportButton from './components/ExportButton';

function App() {
  const { error, isProcessing } = useStore();
  useImageProcessor();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">LineIt3</h1>
          <p className="text-gray-400 mt-1">Transform photos into line art</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Upload & Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
              <ImageUploader />
            </div>

            <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-4">Presets</h2>
              <PresetSelector />
            </div>

            <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-4">Parameters</h2>
              <ControlsPanel />
            </div>

            <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
              <ExportButton />
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Preview</h2>
                {isProcessing && (
                  <span className="text-sm text-blue-400 animate-pulse">Processing...</span>
                )}
              </div>
              <CanvasPreview />
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 py-6 text-center text-gray-500 text-sm">
        <p>LineIt3 - Line Art Creator | All processing happens locally in your browser</p>
      </footer>
    </div>
  );
}

export default App;
