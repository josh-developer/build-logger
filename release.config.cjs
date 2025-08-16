module.exports = {
  branches: ["main"], // only release on main
  repositoryUrl: "https://github.com/josh-developer/build-logger",
  plugins: [
    "@semantic-release/commit-analyzer", // decides next version
    "@semantic-release/release-notes-generator", // generates changelog text
    "@semantic-release/changelog", // updates CHANGELOG.md
    ["@semantic-release/npm", { npmPublish: true }], // publishes to npm
    ["@semantic-release/git", {
      assets: ["CHANGELOG.md", "package.json"],
      message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
    }],
    "@semantic-release/github" // creates GitHub release
  ]
};
