📦 Build Logger

A lightweight, framework-agnostic library that logs build information (timestamp, CI/CD metadata, commit, branch, etc.) at runtime.
Useful for debugging deployments, verifying CI/CD builds, and showing build versions inside your apps.

✨ Features

📅 Logs build timestamp in human-readable format

🖥️ Supports CI/CD metadata (build ID, commit, branch, provider)

⚡ Framework-agnostic (works with React, Angular, Vue, Node, etc.)

🛠️ Easy integration into any project

🔄 Auto-published with semantic-release

🚀 Installation
npm install vector-academy-build-logger
# or
yarn add vector-academy-build-logger
# or
pnpm add vector-academy-build-logger

⚡ Usage
1. Add Build Step in package.json
{
  "scripts": {
    "prebuild": "build-logger ./public/build-info.json",
    "build": "vite build"
  }
}


This generates a build-info.json file during build.

2. Log Build Info in Your App
import { logBuildInfo } from "vector-academy-build-logger";

logBuildInfo("build-info.json");
