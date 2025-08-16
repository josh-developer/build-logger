export function detectCIEnv(env: NodeJS.ProcessEnv) {
  if (env.GITHUB_ACTIONS === "true") {
    return { name: "github", buildId: env.GITHUB_RUN_ID, commit: env.GITHUB_SHA, branch: env.GITHUB_REF_NAME };
  }
  if (env.GITLAB_CI === "true") {
    return { name: "gitlab", buildId: env.CI_PIPELINE_ID, commit: env.CI_COMMIT_SHA, branch: env.CI_COMMIT_REF_NAME };
  }
  return { name: "unknown" };
}
