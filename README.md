# Pamod Madubashana - Personal Portfolio

A futuristic personal portfolio website built with React, TypeScript, and Vite.

## 🌐 Live Demo

**Production URL**: https://pamod.is-a.dev

## 🏗️ Development Setup

### Prerequisites

- Node.js 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- npm or yarn package manager

### Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/pamod-madubashana.github.io.git
cd pamod-madubashana.github.io

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
VITE_API_BASE_URL=http://localhost:5000
VITE_GITHUB_USERNAME=your-github-username
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## 🛠️ Technologies Used

This project is built with:

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context API
- **Data Fetching**: TanStack Query
- **UI Components**: Radix UI primitives

## 📁 Project Structure

```
src/
├── api/           # API service functions
├── components/    # Reusable UI components
│   ├── layout/    # Layout components (Navbar, Footer)
│   ├── sections/  # Page sections (Hero, About, etc.)
│   └── ui/        # shadcn/ui components
├── contexts/      # React context providers
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Page components
│   ├── Admin/     # Admin dashboard
│   ├── Auth/      # Authentication pages
│   └── ...        # Main pages
└── App.tsx        # Main application component
```

## 🚀 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions.

### Prerequisites

1. Repository settings:
   - Go to Settings → Pages
   - Set Source to "GitHub Actions"

2. Environment variables (Settings → Secrets and variables → Actions):
   ```bash
   VITE_API_BASE_URL=https://your-api-url.com # Optional backend API
   VITE_GITHUB_USERNAME=your-github-username   # For fetching repositories
   ```

### Manual Deployment

```bash
# Build the project
npm run build

# Serve locally for testing
npm run preview
```

The workflow automatically triggers on pushes to the `main` branch.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
