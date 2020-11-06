const core = require('@actions/core');
const github = require('@actions/github');

try {
  const octokit = github.getOctokit(core.getInput('github-token'));
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

  const fields = {
    status: core.getInput('status'),
    message: core.getInput('message'),
    url: core.getInput('url'),
  };

  console.log(`Fields:`, fields);
  // core.setOutput("time", time);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  const webhooks = await octokit.repos.listWebhooks({
    owner,
    repo,
  });
  console.log(`Webhooks: ${JSON.stringify(webhooks, undefined, 2)}`);

} catch (error) {
  core.setFailed(error.message);
}
