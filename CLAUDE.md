# WalkWithDogs — Claude Code & Agent Guide

## Quick Commands

Type `/` in Claude Code to see all available commands, or use these directly:

| Command | What it does |
|---------|-------------|
| `/user-story-creator` | 📋 Elicit requirements + generate BDD user stories |
| `/jira-task-creator` | 📝 Create Jira tickets (epic + subtasks) |
| `/dev-agent` | 💻 Implement a Jira ticket (full cycle) |
| `/qa-agent` | ✅ Run QA on a ticket |
| `/release-manager` | 🚀 Prepare and execute a release |
| `/browse-agents` | 📋 List all available agents |

---

## Project Overview

**WalkWithDogs** is a React Native 0.85.3 + TypeScript mobile application for dog walking management. The project uses a professional MVVM architecture with clean separation of concerns, prepared for Firebase and local database integration.

### Stack
- **Frontend**: React Native 0.85.3, TypeScript 5.8.3
- **Navigation**: React Navigation 7.x (Native Stack)
- **State Management**: React Context + useReducer (MVVM pattern)
- **Styling**: React Native StyleSheet with theme system
- **Build Tools**: Metro, Babel with module-resolver
- **Testing**: Jest, ESLint, Prettier
- **Database** (placeholders): AsyncStorage, MMKV, SQLite, Realm, WatermelonDB, or Firebase
- **Backend** (placeholders): Firebase (Auth, Firestore, Storage) or custom REST API

---

## Getting Started

### Clone with submodules

This project uses git submodules for the Claude agent ecosystem (`.claude/skills`). Clone properly:

```sh
# Recommended: one-step clone + init
git clone --recurse-submodules <repo-url>

# OR if you already cloned without submodules
git submodule update --init --recursive
```

### Install dependencies

```sh
# Node modules
npm install

# iOS only: Ruby and CocoaPods
bundle install
bundle exec pod install
```

### Run the app

```sh
# Start Metro dev server
npm start

# In another terminal — Android
npm run android

# In another terminal — iOS
npm run ios
```

---

## Project Architecture

### Folder Structure

```
src/
├── assets/              # Images, icons, fonts
├── commons/             # Shared components, hooks, helpers, constants, theme
├── domain/              # Business logic models, DTOs, use cases
├── data/                # Repositories, data sources (local/remote), services
└── presentation/        # Navigation, screens, ViewModels, UI components
```

### Design Pattern: MVVM

Each screen follows the MVVM pattern with **Context + useReducer** for state management:

```tsx
// 1. Define ViewModel (state + reducer)
type ScreenState = { count: number };
type ScreenAction = { type: 'INCREMENT' };
const reducer = (state: ScreenState, action: ScreenAction) => { ... };

// 2. Create ViewModel + Provider + hook
const { Provider: ScreenViewModelProvider, useViewModel: useScreenViewModel } =
  createViewModel(reducer, initialState);

// 3. Use in component
export const ScreenContent: React.FC = () => {
  const { state, dispatch } = useScreenViewModel();
  return <View>...</View>;
};

// 4. Wrap screen with provider
export const Screen: React.FC = () => (
  <ScreenViewModelProvider>
    <ScreenContent />
  </ScreenViewModelProvider>
);
```

**Example**: See `src/presentation/screens/HomeScreen/`.

### Import Aliases

Clean imports without relative paths:

```ts
import { colors } from '@commons/theme';
import { HttpClient } from '@data/services/http';
import { RootNavigator } from '@presentation/navigation';
```

---

## Activating Features

### Firebase

Uncomment and configure Firebase in [`src/data/services/firebase/FirebaseService.ts`](src/data/services/firebase/FirebaseService.ts):

```bash
npm install @react-native-firebase/app
npm install @react-native-firebase/auth         # Auth
npm install @react-native-firebase/firestore    # Database
npm install @react-native-firebase/storage      # File storage
```

Then add:
- **Android**: `google-services.json` → `android/app/`
- **iOS**: `GoogleService-Info.plist` → `ios/WalkWithDogs/`

### Local Database

Pick one and install. See [`src/data/datasources/local/ILocalDataSource.ts`](src/data/datasources/local/ILocalDataSource.ts) for options:

- **AsyncStorage** (key-value, simple): `npm install @react-native-async-storage/async-storage`
- **MMKV** (key-value, fast): `npm install react-native-mmkv`
- **SQLite**: `npm install op-sqlite`
- **WatermelonDB** (relational, reactive): `npm install @nozbe/watermelondb`
- **Realm** (document DB): `npm install realm`

---

## Using Claude Agents

The `.claude/skills` submodule provides 4 intelligent agents for the full development lifecycle.

### How to Access Agents

**Option 1: Autocomplete**
Type `/` in Claude Code — you'll see all available agents in autocomplete:
```
/browse-agents
/jira-task-creator
/dev-agent
/qa-agent
/release-manager
```

**Option 2: Launch directly**
Type the command directly:
```
/jira-task-creator          # Create a ticket
/dev-agent                  # Implement a ticket
/qa-agent                   # Run QA
/release-manager            # Prepare release
/browse-agents              # See the list
```

**Option 3: Quick reference**
See the table at the top of this file under "Quick Commands"

### 0. User Story Creator

**Command**: `/user-story-creator`

Product analyst that elicits requirements through questions and maps all use cases (happy path, error, edge, border, offline, permissions) before any ticket is created. Produces a structured specification with user stories and BDD acceptance criteria ready to feed into `jira-task-creator`.

**Use when**: You have a feature idea but requirements are not yet fully defined.

**Example**:
```
/user-story-creator
User: "add push notifications for walk updates"
→ Explores project → Asks questions → Maps all use cases → Outputs specification
```

**Output**: A specification document with user stories, BDD Given/When/Then criteria across 7 use case categories. Pass this document directly to `/jira-task-creator`.

---

### 1. Jira Task Creator

**Command**: `/jira-task-creator`

Creates Jira tickets (epic + subtasks) from a complete specification. Expects acceptance criteria and mapped use cases as input (from `/user-story-creator` or manually written).

**Use when**: You have a complete specification with requirements already defined and acceptance criteria.

**Example**:
```
/jira-task-creator
User: [pastes specification from user-story-creator]
→ Creates WALKWITHDOGS-XX (epic) + subtasks for each user story
```

---

### 2. Dev Agent

**Command**: `/dev-agent`

Full-cycle implementation: reads the Jira ticket, analyzes the project deeply, plans the implementation, writes code + tests, runs linters/tests, commits, opens a PR, and transitions the ticket to "In Review".

**Use when**: You have a Jira ticket ready to implement.

**Example**:
```
/dev-agent
User: "implement WALKWITHDOGS-42"
→ Reads ticket → Analyzes project → Plans → Implements → Tests → Commits → PR → Updates Jira
```

**Prerequisites**:
- Ticket must exist in Jira with clear acceptance criteria.
- The agent operates autonomously; no manual direction during execution.

---

### 3. QA Agent

**Command**: `/qa-agent`

Autonomous QA: reads acceptance criteria, runs full test suite (tsc, eslint, jest, playwright), verifies all criteria functionally, reviews UX/UI across 3 breakpoints, audits WCAG 2.2 AA accessibility, hunts for bugs, and reports in Jira (comment if passing, subtasks per bug if failures).

**Use when**: An implementation is complete and needs validation before merge.

**Example**:
```
/qa-agent
User: "QA WALKWITHDOGS-42"
→ Reads ticket → Explores project → Code quality checks → Functional tests → UX/UI review → Accessibility audit → Bug hunt → Reports in Jira
```

**Output**:
- ✅ All criteria met → comment in Jira with summary
- ❌ Failures found → creates subtasks (one per bug) in Jira for dev to fix

---

### 4. Release Manager

**Command**: `/release-manager`

Closes the delivery cycle: identifies merged PRs, cross-references Jira tickets, confirms scope interactively, generates a structured changelog, commits it, tags the release, creates a GitHub release, and transitions all tickets to "Done".

**Use when**: A sprint is complete and ready to ship.

**Example**:
```
/release-manager
User: "prepare the release"
→ Identifies what's merged → Generates changelog → Asks for confirmation → Creates tag → Updates GitHub → Updates Jira
```

**Safety**: The agent asks one question at a time before irreversible actions (push, tag, release). You control the pace.

---

## Typical Workflow

1. **Requirements**
   ```
   /user-story-creator
   → Describe the feature idea
   → Outputs specification with user stories and BDD criteria
   ```

2. **Jira Tickets**
   ```
   /jira-task-creator
   → Paste the specification from user-story-creator
   → Tickets created (epic + subtasks for each story)
   ```

3. **Implementation**
   ```
   /dev-agent
   User: "implement WALKWITHDOGS-42"
   → Full code + tests + PR
   ```

4. **Validation**
   ```
   /qa-agent
   User: "QA WALKWITHDOGS-42"
   → Bug hunt + accessibility review + Jira report
   ```

5. **Release**
   ```
   /release-manager
   User: "prepare the release"
   → Changelog + tag + GitHub release + Jira updates
   ```

---

## Configuration

### Atlassian Rovo MCP

All agents connect to Jira via **Atlassian Rovo MCP** (Server-Sent Events):

```
Endpoint: https://mcp.atlassian.com/v1/mcp
Configured in: `.claude/skills/.mcp.json`
```

**Note**: This SSE endpoint retires **June 30, 2026**. Plan for migration to a newer MCP protocol before that date.

### Global Permissions

The project uses global permission bypass (`bypassPermissions: true` in `~/.claude/settings.json`). This means:
- All `Bash` commands are allowed (no prompts).
- All `Read`/`Write` operations are allowed.
- All MCP tool calls are allowed.

If you want to restrict permissions, edit `~/.claude/settings.json` and set `bypassPermissions: false`.

---

## Development Tips

### Adding a New Feature

1. **Define requirements** with `/user-story-creator` → describe the feature idea.
2. **Create Jira tickets** with `/jira-task-creator` → paste the spec output.
3. **Implement** with `/dev-agent PROJ-X`.
4. **QA** with `/qa-agent PROJ-X` before merge.
5. **Release** when ready with `/release-manager`.

### Adding a New Screen

Use the `HomeScreen` example as a template:

```
src/presentation/screens/NewScreen/
├── NewScreen.tsx           # React component
├── NewViewModel.ts         # State + reducer
└── index.ts                # Barrel export
```

### Adding a Repository

```
src/data/repositories/NewRepository.ts
→ Implements IRepository<T>
→ Injects local & remote data sources
→ Handles conflict resolution & caching
```

### Adding a Use Case

```
src/domain/useCases/new/NewUseCase.ts
→ Implements IUseCase<TInput, TOutput>
→ Injects repository
→ Contains business logic
```

---

## Troubleshooting

### Metro fails to start
```sh
npm start
# If it crashes, clear cache:
npm start -- --reset-cache
```

### TypeScript errors with import aliases
- Run `npm run lint` — ESLint catches import issues.
- Check `tsconfig.json` has `baseUrl` and `paths` defined.
- Restart the TypeScript server in your IDE.

### Android/iOS build fails
- **Android**: `cd android && ./gradlew clean && cd ..`
- **iOS**: `rm -rf ios/Pods && bundle exec pod install`
- Then try again: `npm run android` / `npm run ios`

### Agent fails or times out
- Ensure your **Jira instance is accessible** and credentials are valid.
- Check **network connectivity** to Atlassian servers.
- Review the **agent transcript** in Claude Code for error details.

---

## Useful Commands

```sh
# Development
npm start              # Metro dev server
npm run android        # Run on Android emulator/device
npm run ios            # Run on iOS simulator/device

# Linting & formatting
npm run lint           # ESLint check
npm run lint --fix     # Auto-fix issues
# Prettier is configured; format with your IDE or:
npx prettier --write src/

# Testing
npm test               # Jest test suite

# Clean builds
npm run clean          # Remove node_modules, Pods, builds
npm install            # Fresh install
```

---

## Resources

- [React Native Docs](https://reactnative.dev)
- [React Navigation Docs](https://reactnative.dev/docs/navigation)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Firebase React Native Guide](https://rnfirebase.io)
- [MVVM Pattern Overview](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel)

---

## Questions?

For issues with:
- **Code structure**: Review `src/` folder organization.
- **Agents**: Check `.claude/skills/agents/*.md` for detailed agent logic.
- **Firebase/DB setup**: See comments in `src/data/services/` and `src/data/datasources/`.
- **Build problems**: Check React Native official troubleshooting guide.
