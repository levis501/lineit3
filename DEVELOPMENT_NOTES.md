# Development Notes

## Current Status

The LineIt3 MVP has been successfully scaffolded with the following features:

### Completed
- ✅ Vite + React + TypeScript setup
- ✅ Tailwind CSS configuration
- ✅ Zustand state management
- ✅ All core components (ImageUploader, CanvasPreview, ControlsPanel, PresetSelector, ExportButton)
- ✅ Web Worker for image processing
- ✅ Placeholder algorithm implementations (Canny, Sobel, Laplacian, Threshold)
- ✅ Testing setup (Vitest + Playwright)
- ✅ GitHub Actions CI/CD
- ✅ ESLint and Prettier configuration
- ✅ Responsive UI layout

### To Do (Next Steps)
- [ ] Install and integrate opencv-wasm for real image processing
- [ ] Replace placeholder algorithms with actual OpenCV implementations
- [ ] Add more presets based on user feedback
- [ ] Implement zoom/pan controls for preview
- [ ] Add keyboard shortcuts
- [ ] Performance optimization for large images
- [ ] Deploy to Vercel or Netlify

## Quick Start

```bash
# Install dependencies (already done)
npm install

# Start dev server
npm run dev

# Open http://localhost:5173
```

## Architecture Notes

### State Management
- Uses Zustand for lightweight, simple state management
- Store located in `src/store.ts`
- Key state: originalImage, processedImage, params, processing status

### Image Processing Flow
1. User uploads image → ImageUploader component
2. Image converted to ImageData → stored in Zustand
3. Parameters changed → triggers Web Worker
4. Worker processes image → returns processed ImageData
5. Result displayed in CanvasPreview

### Web Worker
- Runs image processing off the main thread
- Located in `src/workers/imageProcessor.worker.ts`
- Prevents UI blocking during heavy computation

### Components
- **ImageUploader**: Drag-and-drop file upload
- **CanvasPreview**: Side-by-side original/processed display
- **ControlsPanel**: Algorithm and parameter controls
- **PresetSelector**: Quick preset application
- **ExportButton**: PNG export (normal and transparent)

## OpenCV Integration (Pending)

To integrate opencv-wasm:

1. Install package:
   ```bash
   npm install opencv-wasm
   ```

2. Update `src/libs/opencv-loader.ts` to load OpenCV from CDN or bundle

3. Update algorithm files in `src/libs/algorithms/` with real OpenCV calls

4. Example Canny implementation:
   ```typescript
   import cv from 'opencv-wasm';

   export function applyCanny(imageData, threshold1, threshold2) {
     const src = cv.matFromImageData(imageData);
     const dst = new cv.Mat();
     cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY);
     cv.Canny(src, dst, threshold1, threshold2);
     const result = imageDataFromMat(dst);
     src.delete();
     dst.delete();
     return result;
   }
   ```

## Testing

### Unit Tests
```bash
npm test
```
Located in `src/tests/`

### E2E Tests
```bash
npm run test:e2e
```
Located in `src/tests/e2e/`

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Manual Build
```bash
npm run build
# Output in dist/ folder
```

## Performance Considerations

1. **Image Downscaling**: For preview, consider downscaling large images
2. **Worker Pool**: For batch processing, implement worker pool
3. **Lazy Loading**: OpenCV.js is large (~8MB), lazy load it
4. **Caching**: Cache processed results with parameter fingerprints
5. **ImageBitmap**: Use ImageBitmap API where supported for better performance

## Browser Support

- Modern browsers with ES2020+ support
- Web Workers required
- Canvas API required
- Tested on Chrome 90+, Firefox 88+, Safari 14+

## Known Limitations

1. OpenCV is placeholder implementation (basic edge detection only)
2. No undo/redo functionality yet
3. No batch processing
4. Single worker instance (could support multiple)
5. No progress indicator for long operations

## Contributing

See main README.md for contribution guidelines.
