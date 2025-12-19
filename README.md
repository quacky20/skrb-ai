# 🧮 skbr.ai

An intelligent, AI-powered calculator that recognizes handwritten mathematical expressions and solves them in real-time. Draw equations on the canvas, and let AI handle the computation!

![skbr.ai Demo](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 🎨 Drawing & Canvas
- **Freehand Drawing**: Draw mathematical expressions naturally with mouse or touch
- **Touch Support**: Fully responsive with native touch device support
- **Custom Brush Sizes**: Adjustable brush size (1-30px) for precise writing
- **Color Selection**: Multiple color swatches for different expressions
- **Eraser Tool**: Clean eraser functionality with adjustable size
- **Custom Cursor**: Dynamic cursor that follows your drawing color
- **Grid Background**: Professional grid canvas for better alignment

### 🤖 AI-Powered Calculation
- **Handwriting Recognition**: Powered by Google Gemini AI for accurate expression recognition
- **Multi-Expression Support**: Solve multiple equations in one drawing
- **Variable Assignment**: Support for variable declarations and assignments
- **Real-Time Results**: Instant calculation with animated LaTeX rendering
- **Context-Aware**: Remembers previously assigned variables

### 📐 Advanced Math Features
- **LaTeX Rendering**: Beautiful mathematical notation using MathJax
- **Draggable Results**: Move and position calculation results anywhere on canvas
- **Expression History**: Multiple results displayed with automatic positioning
- **Complex Calculations**: Handles arithmetic, algebra, calculus, and more

### 🎯 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Loading States**: Smooth loading animations during calculations
- **Error Handling**: User-friendly error messages with toast notifications
- **Hide/Show Controls**: Collapsible toolbar to maximize canvas space
- **Reset Functionality**: Clear canvas and start fresh with one click

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Lightning-fast build tool
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Mantine** - Color swatches and UI utilities
- **MathJax** - LaTeX math rendering
- **Axios** - HTTP client

### Backend
- **Node.js** with Express
- **Google Gemini AI** - Handwriting recognition and calculation
- **CORS** - Secure cross-origin requests
- **dotenv** - Environment variable management

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key

### Clone the Repository

```bash
git clone https://github.com/yourusername/skbr.ai.git
cd skbr.ai
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
PORT=4000
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:4000`

### Frontend Setup

1. Navigate to the calculator directory:
```bash
cd calculator
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
VITE_API_URL=http://localhost:4000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
skbr.ai/
├── backend/                  # Express backend
│   ├── config/               # Configuration files
│   │   ├── cors.js           # CORS settings
│   │   └── gemini.config.js  # Gemini AI setup
│   ├── controllers/          # Request handlers
│   │   └── calculate.controller.js
│   ├── routes/               # API routes
│   │   └── calculate.route.js
│   ├── services/             # Business logic
│   │   ├── calculate.prompt.js
│   │   └── gemini.service.js
│   ├── utils/                # Helper functions
│   │   ├── cleanUp.js
│   │   └── prompt.js
│   └── index.js              # Entry point
│
└── calculator/               # React frontend
    ├── public/               # Static assets
    ├── src/
    │   ├── components/       # React components
    │   │   ├── ui/           # shadcn/ui components
    │   │   ├── Cursor.tsx
    │   │   ├── DraggableLatex.tsx
    │   │   ├── Loader.tsx
    │   │   └── Toast.tsx
    │   ├── pages/            # Page components
    │   │   └── home/
    │   │       └── index.tsx
    │   ├── lib/              # Utilities
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── constants.ts          # App constants
    └── vite.config.ts        # Vite configuration
```

## 🎮 How to Use

1. **Draw**: Click and drag (or touch and draw) on the canvas to write mathematical expressions
2. **Select Color**: Choose from the color palette to differentiate expressions
3. **Adjust Brush**: Use the slider to change brush size for better precision
4. **Erase**: Click the eraser icon to remove mistakes
5. **Calculate**: Click the "Calculate" button to process your drawing
6. **View Results**: Results appear as draggable LaTeX expressions
7. **Reset**: Clear everything and start fresh with the "Reset" button

## 🔑 API Endpoints

### POST `/calculate`
Processes handwritten mathematical expressions from canvas image.

**Request Body:**
```json
{
  "image": "data:image/png;base64,...",
  "variables": {
    "x": "5",
    "y": "10"
  }
}
```

**Response:**
```json
[
  {
    "expr": "2 + 2",
    "result": "4",
    "assign": false
  }
]
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powerful handwriting recognition
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [MathJax](https://www.mathjax.org/) for LaTeX rendering

## 📧 Contact

For questions or suggestions, feel free to open an issue or reach out!

## 🌐 Live Demo

**Frontend**: https://skrb-ai.vercel.app/

---

Made with ❤️