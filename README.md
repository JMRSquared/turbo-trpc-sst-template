# PROJECT_NAME Turbo Repo

A monorepo project with tRPC API and React web app using SST v3 for AWS deployment.

## Project Structure

```
/
├── apps/
│   ├── api/          # tRPC API with SST v3 (separate Lambda functions)
│   └── web/          # Vite React app
├── packages/
│   └── api-types/    # Shared tRPC router types
├── package.json      # Root package.json
├── turbo.json        # Turbo configuration
└── biome.json        # Biome formatting configuration
```

## Features

- **API**: tRPC server with separate Lambda functions for `ping` and `pong` endpoints
- **Web**: Vite React app with tRPC client
- **SST v3**: Infrastructure as code with seamless local development
- **Turbo**: Monorepo build system
- **Biome**: Fast formatting and linting
- **TypeScript**: Full type safety across the stack

## Getting Started

### Prerequisites

- Node.js >= 18
- Yarn v4
- AWS CLI configured (for deployment)

### Installation

```bash
# Install dependencies
yarn install

# Build shared packages
yarn build
```

### Development

#### Option 1: Start both services with Turbo (Recommended)

```bash
yarn dev  # Starts both API and web in parallel
```

#### Option 2: Start services individually

```bash
# Terminal 1 - API Development
yarn dev:api  # Starts SST dev mode with local Lambda simulation

# Terminal 2 - Web Development  
yarn dev:web  # Starts Vite dev server on http://localhost:5173
```

#### Option 3: Use the development script

```bash
./scripts/dev.sh  # Starts both services with proper cleanup
```

### Deployment

```bash
# Deploy API to AWS
yarn deploy

# Or manually
cd apps/api
sst deploy
```

### Available Scripts

- `yarn dev` - Start both API and web in development mode
- `yarn build` - Build all packages
- `yarn type-check` - Run TypeScript type checking
- `yarn lint` - Run linting (Biome)
- `yarn format` - Format code (Biome)
- `yarn deploy` - Deploy API to AWS
- `yarn clean` - Clean build artifacts

## API Endpoints

- **POST /trpc/ping** - Query endpoint that returns a ping response
- **POST /trpc/pong** - Mutation endpoint that returns a pong response

Both endpoints accept an optional `message` parameter.

## Tech Stack

- **Frontend**: React, Vite, tRPC Client, TanStack Query
- **Backend**: tRPC Server, AWS Lambda, API Gateway
- **Infrastructure**: SST v3, AWS
- **Tooling**: Turbo, Biome, TypeScript
- **Package Manager**: Yarn Workspaces
