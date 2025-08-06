# Jenkins Test

A simple Node.js project with test cases for Jenkins pipeline testing.

## Project Structure

```
jenkins-test/
├── package.json          # Project dependencies and scripts
├── index.js               # Main application file with simple functions
├── test/
│   └── math.test.js       # Test cases using Jest
├── jest.config.js         # Jest configuration
├── Jenkinsfile           # Jenkins pipeline configuration
└── README.md             # This file
```

## Features

- Two simple mathematical functions (`add` and `multiply`)
- Two test cases using Jest framework
- Jenkins pipeline configuration
- Code coverage reporting

## Local Development

### Install Dependencies
```bash
npm install
```

### Run Tests
```bash
npm test
```

### Run Application
```bash
npm start
```

## Jenkins Pipeline

The `Jenkinsfile` includes:
- Dependency installation
- Test execution
- Test result publishing
- Coverage report generation
- Build stage

## Test Cases

1. **Addition Test**: Tests if `add(2, 3)` returns `5`
2. **Multiplication Test**: Tests if `multiply(4, 5)` returns `20`

These simple assertions are perfect for validating your Jenkins pipeline setup.
