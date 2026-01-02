# MCP Messenger Landing Page

A modern, animated landing page for MCP Messenger built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Beautiful animated landing page with gradient effects and smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **SEO Optimized**: Complete meta tags and Open Graph support for social sharing
- **Fast**: Built with Vite for lightning-fast development and builds
- **Type-Safe**: Full TypeScript support for better developer experience

## 🛠️ Technologies

This project is built with:

- **Vite** - Next generation frontend tooling
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components

## 📦 Installation

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository
git clone https://github.com/mcpmessenger/mcp-messenger-landing-page.git

# Step 2: Navigate to the project directory
cd mcp-messenger-landing-page

# Step 3: Install the necessary dependencies
npm install

# Step 4: Start the development server
npm run dev
```

## 🎨 Development

### Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

### Project Structure

```
├── public/          # Static assets (favicon, robots.txt)
├── src/
│   ├── assets/     # Images and other assets
│   ├── components/ # React components
│   ├── pages/      # Page components
│   ├── hooks/      # Custom React hooks
│   └── lib/        # Utility functions
└── index.html      # HTML entry point
```

## 🌐 Deployment

This project can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag and drop the `dist` folder after building
- **GitHub Pages**: Use GitHub Actions to build and deploy
- **AWS S3 + CloudFront**: Upload the `dist` folder to S3

### Build for Production

```sh
npm run build
```

The production-ready files will be in the `dist` directory.

## 📝 License

This project is part of the MCP Messenger ecosystem.

## 🔗 Links

- **Repository**: [https://github.com/mcpmessenger/mcp-messenger-landing-page](https://github.com/mcpmessenger/mcp-messenger-landing-page)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
