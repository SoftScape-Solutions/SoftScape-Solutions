# 🚀 Softscape Solutions

Enterprise-grade modular full-stack application built with modern technologies.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

- **Modular Architecture** - Feature-based backend design for easy scalability
- **Full-Stack TypeScript** - End-to-end type safety
- **Authentication & Authorization** - JWT-based auth with role management
- **Admin Dashboard** - Comprehensive admin panel for management
- **File Upload System** - S3/Local file storage support
- **Email Service** - Integrated email notifications
- **Real-time Features** - WebSocket support for live updates
- **Payment Integration** - Stripe & PayPal ready
- **Docker Support** - Containerized development and production
- **Future-Ready** - Kubernetes & Mobile app ready (disabled for now)

## 🛠 Tech Stack

### Backend
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- Redis (caching)
- JWT Authentication
- Winston (logging)

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Zustand (state management)

### DevOps
- Docker & Docker Compose
- Nginx (reverse proxy)
- GitHub Actions (CI/CD)
- Prometheus + Grafana (monitoring)

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker (optional)
- MongoDB (or use Docker)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd softscape-solutions
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start development servers**
```bash
# Start all services
npm run dev

# Or individually
npm run dev:api    # API on http://localhost:3001
npm run dev:web    # Web on http://localhost:3000
npm run dev:admin  # Admin on http://localhost:3002
```

### Using Docker

```bash
# Start all services with Docker
docker-compose up

# With rebuild
docker-compose up --build

# Stop all services
docker-compose down
```

## 📁 Project Structure

```
softscape-solutions/
├── apps/
│   ├── api/          # Backend API (Node.js + Express)
│   ├── web/          # Frontend Website (Next.js)
│   └── admin/        # Admin Dashboard (Next.js)
│
├── libs/
│   ├── ui/           # Shared UI components
│   ├── common/       # Common utilities
│   └── config/       # Shared configurations
│
├── infra/
│   ├── docker/       # Docker configurations
│   ├── scripts/      # Deployment scripts
│   └── _future/      # Future infrastructure (K8s, Helm)
│
└── docs/             # Documentation
```

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev              # Start all services
npm run dev:api          # Start API only
npm run dev:web          # Start web only
npm run dev:admin        # Start admin only

# Building
npm run build            # Build all apps
npm run build:api        # Build API only

# Testing
npm run test             # Run all tests
npm run test:coverage    # Test coverage

# Code Quality
npm run lint             # Lint all code
npm run lint:fix         # Fix linting issues
npm run format           # Format code with Prettier
npm run type-check       # TypeScript type checking

# Docker
npm run docker:dev       # Start Docker dev environment
npm run docker:prod      # Start Docker production

# Cleanup
npm run clean            # Remove node_modules
```

### Adding a New Feature

1. Create feature folder in `apps/api/src/features/`
2. Follow the modular pattern (controllers, services, routes, etc.)
3. Register routes in `src/server.ts`
4. See `docs/development/adding-features.md` for details

## 🚢 Deployment

### Docker Deployment (Current)

```bash
# Build and deploy with Docker
npm run docker:prod:build

# Or manually
docker-compose -f docker-compose.prod.yml up -d
```

### Future: Kubernetes (Ready but Disabled)

When ready to enable Kubernetes:
```bash
# Move K8s configs from future
mv infra/_future/kubernetes infra/kubernetes

# Deploy
kubectl apply -f infra/kubernetes/
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 📖 Documentation

- [API Documentation](./docs/api/README.md)
- [Architecture](./docs/architecture/system-design.md)
- [Deployment Guide](./docs/deployment/README.md)
- [Development Guide](./docs/development/getting-started.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👥 Authors

- **Softscape Solutions Team**

## 🙏 Acknowledgments

- Built with modern best practices
- Designed for scalability and maintainability
- Enterprise-ready architecture

---

**Made with ❤️ by Softscape Solutions**
