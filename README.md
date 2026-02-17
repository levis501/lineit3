# LineIt3

A line detection visualization tool for creating coloring book drawings from photos and artwork.

## Overview

LineIt3 helps you explore and compare different line detection algorithms with adjustable parameters to transform photos and artwork into coloring book-style line drawings.

## Features

- **Multiple Line Detection Algorithms**: Compare various edge detection methods
- **Real-time Parameter Adjustment**: Fine-tune settings and see immediate results
- **Side-by-side Comparison**: View original and processed images simultaneously
- **Export Options**: Save your line drawings for printing or digital use

## Use Cases

- Create custom coloring book pages from personal photos
- Convert artwork into printable line art
- Experiment with different edge detection techniques
- Find optimal settings for specific image types

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser with Web Workers and Canvas support

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd lineit3

# Install dependencies
npm install

# Run the development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Development Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Run unit tests
npm test

# Run unit tests with UI
npm run test:ui

# Run end-to-end tests
npm run test:e2e
```

## Supported Algorithms

- Canny Edge Detection
- Sobel Operator
- Laplacian Edge Detection
- Custom threshold-based methods

## Configuration

Adjust parameters such as:
- Threshold values
- Blur/smoothing levels
- Line thickness
- Contrast settings

## License

[Your License Here]

## Project Structure

```
src/
├── components/         # React components
│   ├── ImageUploader.tsx
│   ├── CanvasPreview.tsx
│   ├── ControlsPanel.tsx
│   ├── PresetSelector.tsx
│   └── ExportButton.tsx
├── workers/           # Web Workers for processing
│   └── imageProcessor.worker.ts
├── libs/              # Core libraries
│   ├── opencv-loader.ts
│   └── algorithms/    # Image processing algorithms
│       ├── canny.ts
│       ├── sobel.ts
│       └── laplacian.ts
├── hooks/             # Custom React hooks
│   └── useImageProcessor.ts
├── styles/            # Global styles
├── tests/             # Test files
├── store.ts           # Zustand state management
└── types.ts           # TypeScript type definitions
```

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Image Processing**: Web Workers + Canvas API
- **Testing**: Vitest (unit) + Playwright (E2E)
- **CI/CD**: GitHub Actions

## Privacy & Security

All image processing happens locally in your browser. No images are uploaded to any server.

## Deployment

This app can be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Roadmap

- [ ] Integrate opencv-wasm for advanced algorithms
- [ ] Add SVG export option
- [ ] Implement zoom and pan controls
- [ ] Add batch processing
- [ ] Desktop app with Tauri

## Contributing

Contributions welcome! Please open an issue or submit a pull request.