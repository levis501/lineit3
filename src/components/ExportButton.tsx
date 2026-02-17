import { useStore } from '../store';

export default function ExportButton() {
  const { processedImage } = useStore();

  const handleExport = () => {
    if (!processedImage) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = processedImage.width;
    canvas.height = processedImage.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    ctx.putImageData(processedImage, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) {
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lineit3-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  const handleExportTransparent = () => {
    if (!processedImage) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = processedImage.width;
    canvas.height = processedImage.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    ctx.putImageData(processedImage, 0, 0);

    // Make white pixels transparent
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] > 200 && data[i + 1] > 200 && data[i + 2] > 200) {
        data[i + 3] = 0; // Set alpha to 0
      }
    }
    ctx.putImageData(imageData, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) {
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lineit3-transparent-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleExport}
        disabled={!processedImage}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        Export PNG
      </button>
      <button
        onClick={handleExportTransparent}
        disabled={!processedImage}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        Export PNG (Transparent)
      </button>
      {!processedImage && (
        <p className="text-sm text-gray-500 text-center">Process an image first to export</p>
      )}
    </div>
  );
}
