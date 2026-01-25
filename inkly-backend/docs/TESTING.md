# Testing Guide

**Docker is MANDATORY** - All tests run inside Docker containers.

## Overview

- **Backend**: Jest with NestJS testing utilities
- **Frontend**: Jest with React Testing Library
- **All tests run in Docker containers** - No local setup needed

## Setup

### One-Time Setup

```bash
# Set up pre-commit hooks (only needs to be done once)
./setup-tests.sh
```

This installs Husky for git hooks. Test dependencies are automatically installed in Docker containers when you run `./start-docker.sh`.

## Running Tests

### Run All Tests

```bash
# From root directory
npm test
# or
./run-tests-docker.sh
```

### Run Specific Service Tests

```bash
# Backend tests only
npm run test:backend
# or
docker-compose exec backend npm test

# Frontend tests only
npm run test:frontend
# or
docker-compose exec frontend npm test
```

### Run with Coverage

```bash
npm run test:coverage
```

This generates coverage reports in:
- Backend: `inkly-backend/coverage/`
- Frontend: `inkly-frontend/coverage/`

### Watch Mode (Inside Container)

```bash
# Backend watch mode
docker-compose exec backend npm run test:watch

# Frontend watch mode
docker-compose exec frontend npm run test:watch
```

## Pre-commit Hooks

Tests are automatically run before each git commit using Husky. The pre-commit hook will:

1. Check if Docker containers are running
2. Run tests in containers
3. Block commit if tests fail

If containers are not running, the hook will skip tests with a warning.

To skip the pre-commit hook (not recommended):
```bash
git commit --no-verify
```

## Test Structure

### Backend Tests
- Location: `inkly-backend/src/**/*.spec.ts`
- Tests services, controllers, and modules
- Uses NestJS testing utilities for dependency injection mocking

### Frontend Tests
- Location: `inkly-frontend/__tests__/**/*.test.tsx`
- Tests components, pages, utilities, and stores
- Uses React Testing Library for component testing

## Writing Tests

### Backend Example
```typescript
describe('ProductsService', () => {
  it('should return products', async () => {
    // Test implementation
  });
});
```

### Frontend Example
```typescript
describe('ProductCard', () => {
  it('renders product information', () => {
    // Test implementation
  });
});
```

## Troubleshooting

### Tests not running

If tests fail to run in containers:

1. **Check containers are running:**
   ```bash
   docker-compose ps
   ```

2. **Rebuild containers:**
   ```bash
   docker-compose up -d --build
   ```

3. **Check test dependencies:**
   ```bash
   docker-compose exec backend npm list jest
   docker-compose exec frontend npm list jest
   ```

### Pre-commit hook not working

1. **Set up Husky:**
   ```bash
   ./setup-tests.sh
   ```

2. **Make hook executable:**
   ```bash
   chmod +x .husky/pre-commit
   ```

### Coverage not generating

Ensure you're running the coverage command:
```bash
npm run test:coverage
```

Coverage files are generated inside containers and accessible via volume mounts.

## Continuous Integration

Tests should pass before:
- Committing code (pre-commit hook)
- Pushing to repository
- Merging pull requests
