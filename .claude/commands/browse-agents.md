---
name: browse-agents
description: >
  List all available Claude agents for the WalkWithDogs project.
  Shows user-story-creator, jira-task-creator, dev-agent, qa-agent, and release-manager 
  with their descriptions and usage.
---

# Browse Agents

Display a list of all available agents and their purpose, making it easy to discover and launch them.

## Available Agents

| Command | Description | When to use |
|---------|-------------|------------|
| `/user-story-creator` | Elicit requirements and generate user stories with BDD acceptance criteria | When you have a feature idea but requirements are not yet defined |
| `/jira-task-creator` | Create Jira tickets (epic + subtasks) from the specification | When you have a complete specification with mapped use cases |
| `/dev-agent` | Implement a Jira ticket end-to-end | When you have a ticket WALKWITHDOGS-XX ready to implement |
| `/qa-agent` | Execute complete QA (tests + UX + accessibility + report) | When an implementation is ready to validate |
| `/release-manager` | Prepare and execute a release (changelog + tag + GitHub + Jira) | When you want to close the delivery cycle and ship |

## Typical Workflow

1. **Requirements** → `/user-story-creator` → describe the feature
2. **Jira Tickets** → `/jira-task-creator` → paste the generated specification
3. **Implementation** → `/dev-agent WALKWITHDOGS-XX` → autonomous development
4. **Validation** → `/qa-agent WALKWITHDOGS-XX` → complete QA
5. **Release** → `/release-manager` → prepare and publish
