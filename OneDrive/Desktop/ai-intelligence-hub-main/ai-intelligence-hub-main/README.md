# AI Intelligence Hub

A beautiful radial orbital timeline interface connecting social networks and AI intelligence models in a unified ecosystem. This interactive visualization showcases the MCP Messenger ecosystem with clickable nodes linking to various platforms and AI models.

![AI Intelligence Hub](https://img.shields.io/badge/AI-Intelligence%20Hub-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite)

## 🌐 Live Links

### Social Media & Platforms

- **GitHub Repository**: [mcpmessenger/slashmcp](https://github.com/mcpmessenger/slashmcp)
- **YouTube Channel**: [@MCPMessenger](https://youtube.com/@MCPMessenger)
- **Twitter/X**: [@MCPMessenger](https://x.com/MCPMessenger)

### AI Models & Intelligence

- **Grok (xAI)**: [Grok Share Link](https://grok.com/share/bGVnYWN5_acccd31a-3468-4f45-8eb3-4e6874a49c66)
- **Google Gemini**: [Gemini Share Link](https://gemini.google.com/share/106d731426da)
- **OpenAI ChatGPT**: [ChatGPT Share Link](https://chatgpt.com/share/691d1b6f-08c0-8010-b565-16747fe35a3e)

## ✨ Features

- **Interactive Radial Timeline**: Beautiful orbital visualization with clickable nodes
- **Dark/Light Theme Toggle**: Seamless theme switching with persistent preferences
- **AI Model Integration**: Direct links to Grok, Gemini, and ChatGPT conversations
- **Social Media Hub**: Quick access to GitHub, YouTube, and Twitter/X
- **Responsive Design**: Works seamlessly across all device sizes
- **Smooth Animations**: Engaging transitions and hover effects
- **Energy-Based Visualization**: Nodes sized and positioned based on energy levels

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mcpmessenger/ai-intelligence-hub.git
   cd ai-intelligence-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🚀 Deployment with AWS Amplify

This project is configured for deployment on AWS Amplify via GitHub.

### Prerequisites

- AWS Account
- GitHub repository with this project
- AWS Amplify Console access

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit: AI Intelligence Hub"
   git push origin main
   ```

2. **Connect to AWS Amplify**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "New app" → "Host web app"
   - Select "GitHub" as your source
   - Authorize AWS Amplify to access your GitHub account
   - Select the repository: `mcpmessenger/ai-intelligence-hub`
   - Select the branch: `main`

3. **Configure Build Settings**
   - Amplify will auto-detect the `amplify.yml` configuration file
   - The build settings are already configured:
     - **Build command**: `npm run build`
     - **Output directory**: `dist`
     - **Base directory**: (root)

4. **Review and Deploy**
   - Review the build settings
   - Click "Save and deploy"
   - Amplify will automatically:
     - Install dependencies (`npm ci`)
     - Build the application (`npm run build`)
     - Deploy to a unique Amplify URL

5. **Custom Domain (Optional)**
   - After deployment, go to "Domain management"
   - Add your custom domain
   - Follow the DNS configuration instructions

### Amplify Configuration

The `amplify.yml` file in the root directory contains the build configuration:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Continuous Deployment

Once connected, AWS Amplify will automatically:
- Deploy on every push to the `main` branch
- Run builds on pull requests (optional)
- Provide preview deployments for branches
- Handle SSL certificates automatically

### Environment Variables

If you need to add environment variables:
1. Go to Amplify Console → Your App → Environment variables
2. Add variables (e.g., `VITE_API_URL`)
3. Redeploy the app

**Note**: For Vite apps, environment variables must be prefixed with `VITE_` to be accessible in the browser.

### SPA Routing

The `public/_redirects` file ensures that all routes are handled correctly by the React Router SPA. This file is automatically copied to the `dist` folder during build and configured for Amplify.

## 🛠️ Technology Stack

- **Framework**: React 18.3.1
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 5.4.19
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS 3.4.17
- **Icons**: Lucide React 0.554.0
- **Routing**: React Router DOM 6.30.1
- **State Management**: React Hooks
- **Form Handling**: React Hook Form 7.61.1
- **Charts**: Recharts 2.15.4

## 📁 Project Structure

```
ai-intelligence-hub/
├── public/                 # Static assets
│   ├── favicon.png
│   ├── robots.txt
│   └── _redirects         # SPA routing for Amplify
├── src/
│   ├── components/         # React components
│   │   ├── icons/          # Custom icon components
│   │   │   └── GrokIcon.tsx
│   │   └── ui/             # shadcn/ui components
│   │       └── radial-orbital-timeline.tsx
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Main radial timeline page
│   │   └── NotFound.tsx
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vite.config.ts
└── amplify.yml          # AWS Amplify build configuration
```

## 🎨 Key Components

### Radial Orbital Timeline

The centerpiece of the application, featuring:
- Interactive nodes representing platforms and AI models
- Energy-based positioning and sizing
- Smooth animations and transitions
- Clickable links to external resources
- Related node highlighting
- Expandable detail cards

### Custom Icons

- **GrokIcon**: Custom SVG icon component for Grok/xAI integration
- **Lucide Icons**: Comprehensive icon library for all other nodes

## 🔗 Related Projects

- **[slashmcp](https://github.com/mcpmessenger/slashmcp)**: MCP Messenger's main application repository

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**MCP Messenger** - Building the future of AI intelligence networks

- GitHub: [@mcpmessenger](https://github.com/mcpmessenger)
- YouTube: [@MCPMessenger](https://youtube.com/@MCPMessenger)
- Twitter/X: [@MCPMessenger](https://x.com/MCPMessenger)

## 🌟 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

**Built with ❤️ by the MCP Messenger team**

For more information, visit our [GitHub organization](https://github.com/mcpmessenger) or check out our [main project](https://github.com/mcpmessenger/slashmcp).
