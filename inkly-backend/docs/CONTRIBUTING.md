# Contributing to Inkly

Thank you for your interest in contributing to Inkly! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

### Prerequisites

- **Docker** and **Docker Compose** (REQUIRED)
- Git

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Inkly
   ```

2. **Start the application**
   ```bash
   ./start-docker.sh
   ```

3. **Verify everything is running**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001/api
   - API Docs: http://localhost:3001/api/docs

4. **Set up testing (one-time)**
   ```bash
   ./setup-tests.sh
   ```

## 🔧 Development Workflow

### Making Changes

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Edit files as needed
   - Follow existing code style
   - Write tests for new features

3. **Test your changes**
   ```bash
   # Run all tests
   npm test

   # Run specific tests
   npm run test:backend
   npm run test:frontend
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```
   
   **Note:** Tests will run automatically before commit. If tests fail, the commit will be blocked.

5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Open a PR on GitHub
   - Provide a clear description of your changes
   - Reference any related issues

## 📝 Code Style

### Backend (NestJS)

- Follow NestJS conventions
- Use TypeScript strict mode
- Write unit tests for services and controllers
- Use DTOs for data validation
- Follow RESTful API conventions

### Frontend (Next.js)

- Use TypeScript
- Follow React best practices
- Use functional components with hooks
- Write tests for components and pages
- Follow the existing design system

## 🧪 Testing

### Writing Tests

- Write tests for all new features
- Maintain or improve test coverage
- Tests should be fast and isolated

### Running Tests

```bash
# All tests
npm test

# Backend tests
npm run test:backend

# Frontend tests
npm run test:frontend

# Watch mode (inside container)
docker-compose exec backend npm run test:watch
docker-compose exec frontend npm run test:watch
```

### Test Requirements

- All tests must pass before committing
- New features must include tests
- Bug fixes should include regression tests

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] New tests added for new features
- [ ] Documentation updated if needed
- [ ] No console.logs or debug code
- [ ] No hardcoded credentials or secrets

### PR Description

Include:
- What changes were made
- Why the changes were needed
- How to test the changes
- Screenshots (for UI changes)
- Related issues

## 🐛 Reporting Bugs

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., macOS, Linux]
- Docker version: [e.g., 24.0]
- Browser: [e.g., Chrome, Safari]

**Additional context**
Any other relevant information.
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Any alternative solutions or features.

**Additional context**
Any other relevant information.
```

## 🔍 Code Review Process

1. PRs are reviewed by maintainers
2. Address any feedback or requested changes
3. Once approved, your PR will be merged
4. Thank you for contributing! 🎉

## 📚 Resources

- [Docker Setup Guide](./DOCKER_SETUP.md)
- [Testing Guide](./TESTING.md)
- [API Documentation](http://localhost:3001/api/docs)

## ❓ Questions?

If you have questions, please:
1. Check existing documentation
2. Search existing issues
3. Create a new issue with your question

Thank you for contributing to Inkly! 🚀
