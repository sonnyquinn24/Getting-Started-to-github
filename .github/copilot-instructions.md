# GitHub Tutorial Repository with Node.js Application

**ALWAYS follow these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

This repository serves two purposes:
1. **GitHub Tutorial**: Educational content that teaches GitHub fundamentals through interactive workflows and GitHub Actions
2. **Node.js Application**: Ethereum signature verification script with dependencies management

The repository contains GitHub Actions-based tutorials that guide users through creating branches, making commits, opening pull requests, and merging changes, PLUS a working Node.js application for Ethereum signature verification.

## Working Effectively

### Node.js Application Setup and Operation
**NEVER CANCEL: All Node.js operations complete quickly. Set timeout to 30+ seconds for safety.**

- **Install dependencies**:
  - `npm install` - takes ~6 seconds, installs ethers.js, express, lodash, gulp
  - NEVER CANCEL - always completes in under 10 seconds

- **Run the Ethereum signature verification**:
  - `npm run verify` - takes <1 second, runs the signature verification script
  - `node verify.js` - direct execution, same functionality
  - Expected output: Shows recovered Ethereum address and comparison result

- **Known Issue**: CI workflow references `gulp` but no gulpfile exists
  - `npx gulp` will fail with "No gulpfile found" (this is expected)
  - Workflow at `.github/workflows/npm-gulp.yml` will fail on the gulp step
  - Always run `npm install` but skip gulp unless gulpfile is added

### Repository Structure
- **Root files**: README.md, LICENSE, .gitignore, package.json, package-lock.json
- **Node.js application**: verify.js (main script), VERIFICATION.md (documentation)
- **Tutorial content**: `.github/steps/` contains markdown files for each tutorial step (0-welcome.md through X-finish.md)
- **Workflows**: `.github/workflows/` contains GitHub Actions that automatically progress users through tutorial steps
- **Images**: `images/` directory contains screenshots and visual guides for tutorial steps
- **State tracking**: `.github/steps/-step.txt` tracks current tutorial step

### Essential Operations
All git operations in this repository are extremely fast (< 1 second):

- **Clone and explore**:
  - `git clone <repository-url>`
  - `cd Getting-Started-to-github`
  - `ls -la` to see repository structure

- **Basic git operations** (all complete in < 1 second):
  - `git status` - check repository status
  - `git log --oneline --all --graph` - view commit history
  - `git branch -a` - list all branches
  - `git branch <branch-name>` - create new branch
  - `git checkout <branch-name>` - switch branches

### Validation Commands

**NEVER CANCEL: All validation commands complete in < 10 seconds. Set timeout to 30+ seconds.**

- **Validate Node.js application**:
  - `npm install` - install dependencies (~6 seconds)
  - `npm run verify` - test the Ethereum signature verification (<1 second)
  - `node verify.js` - direct script execution (<1 second)
  - Expected output: "Recovered address: 0xe25Cf05796a5c74C295CD7675BDA71f6D3BA39f2" and "Matches expected: false"

- **Validate workflows**:
  - `yamllint .github/workflows/*.yml` - check YAML syntax (expect style warnings, not errors)
  - `find .github/workflows -name "*.yml" -exec head -5 {} \;` - inspect workflow headers

- **Validate tutorial content**:
  - `find . -name "*.md" -exec head -3 {} \;` - check all markdown files
  - `grep -r "images/" --include="*.md" .github/steps/` - find image references in tutorial steps
  - Verify images exist: `grep -o "images/[^)]*\.png\|images/[^)]*\.jpg" .github/steps/*.md | cut -d: -f2 | sort | uniq | while read img; do if [ -f "$img" ]; then echo "✓ $img exists"; else echo "✗ MISSING: $img"; fi; done`

- **Test file operations**:
  - `echo "# Test" > test.md && git add test.md && git status` - test file creation and staging
  - `git restore --staged test.md && rm test.md` - cleanup test file

## Known Issues and Limitations

- **Missing external image**: `collabocats.jpg` referenced in X-finish.md is from external URL (https://octodex.github.com/images/collabocats.jpg)
- **YAML style warnings**: GitHub Actions workflows have yamllint style warnings (line length, missing document start) but are functionally correct
- **Broken CI build**: `.github/workflows/npm-gulp.yml` references `gulp` but no gulpfile exists - gulp step will always fail
- **No test suite**: The Node.js application has no automated tests - only manual verification via `npm run verify`
- **Mixed purpose repository**: Contains both tutorial content AND functional Node.js application

## Validation Scenarios

**CRITICAL**: Always test these scenarios after making changes:

1. **Node.js Application validation**:
   - Run `npm install` and verify it completes successfully in ~6 seconds
   - Run `npm run verify` and verify output matches expected Ethereum address recovery
   - Test direct execution: `node verify.js` produces identical output
   - Check that all dependencies (ethers, express, lodash) are properly installed

2. **Tutorial flow validation**:
   - Navigate through tutorial steps in order: 0-welcome.md → 1-create-a-branch.md → 2-commit-a-file.md → 3-open-a-pull-request.md → 4-merge-your-pull-request.md → X-finish.md
   - Verify each step references correct images and workflows
   - Check that step progression matches workflow triggers

3. **Image reference validation**:
   - All images referenced in markdown files exist in `images/` directory (except external collabocats.jpg)
   - Run: `grep -o "images/[^)]*\.png\|images/[^)]*\.jpg" .github/steps/*.md | cut -d: -f2 | sort | uniq | while read img; do if [ -f "$img" ]; then echo "✓ $img exists"; else echo "✗ MISSING: $img"; fi; done`

4. **Git workflow testing**:
   - Create test branch: `git branch test-branch`
   - Switch branches: `git checkout test-branch && git checkout main`
   - Clean up: `git branch -d test-branch`

## Common Tasks

### Working with Node.js Application
- **Install dependencies**: Always run `npm install` before testing changes
- **Test signature verification**: Run `npm run verify` to test Ethereum signature functionality
- **Add new dependencies**: Update package.json and run `npm install`
- **Debug the application**: Use `node verify.js` directly for debugging

### Working with Tutorial Content
- **Add new tutorial step**: Create corresponding `.md` file in `.github/steps/` and `.yml` workflow in `.github/workflows/`
- **Update step progression**: Modify the step number trigger in workflows
- **Add images**: Place in `images/` directory and reference with relative path `/images/filename.png`

### Debugging Workflows
- **Check current step**: `cat .github/steps/-step.txt`
- **Validate workflow syntax**: `yamllint .github/workflows/<workflow-name>.yml`
- **Review workflow logic**: Look for `if` conditions and step triggers in workflow files
- **Fix npm-gulp.yml**: The workflow fails on gulp step - either add gulpfile.js or remove gulp from workflow

### Repository Maintenance
- **Lint markdown**: `markdownlint *.md .github/steps/*.md` (if markdownlint available)
- **Check file structure**: `tree -a` or `find . -type f | sort`
- **Validate all links**: Manual review of markdown files for broken references
- **Update dependencies**: Check `npm audit` and update package.json as needed

## Timing Expectations

- **Git operations**: < 1 second - NEVER CANCEL
- **File operations**: < 1 second - NEVER CANCEL  
- **Node.js operations**: 
  - `npm install`: ~6 seconds - NEVER CANCEL, set timeout to 30+ seconds
  - `npm run verify`: < 1 second - NEVER CANCEL
  - `node verify.js`: < 1 second - NEVER CANCEL
- **Workflow validation**: < 5 seconds - NEVER CANCEL, set timeout to 30+ seconds
- **Image validation**: < 2 seconds - NEVER CANCEL
- **Repository exploration**: < 3 seconds - NEVER CANCEL

## Directory Structure Reference

```
.
├── .git/                    # Git repository data
├── .github/
│   ├── copilot-instructions.md  # THIS FILE - GitHub Copilot instructions
│   ├── dependabot.yml      # Dependabot configuration
│   ├── steps/              # Tutorial step content
│   │   ├── -step.txt       # Current step tracker
│   │   ├── 0-welcome.md    # Welcome step
│   │   ├── 1-create-a-branch.md
│   │   ├── 2-commit-a-file.md
│   │   ├── 3-open-a-pull-request.md
│   │   ├── 4-merge-your-pull-request.md
│   │   └── X-finish.md     # Completion step
│   └── workflows/          # GitHub Actions workflows
│       ├── 0-welcome.yml
│       ├── 1-create-a-branch.yml
│       ├── 2-commit-a-file.yml
│       ├── 3-open-a-pull-request.yml
│       ├── 4-merge-your-pull-request.yml
│       └── npm-gulp.yml    # ⚠️ BROKEN: references gulp but no gulpfile
├── images/                 # Tutorial screenshots
│   ├── Actions-to-step-4.png
│   ├── Green-merge-pull-request.png
│   ├── Pull-request-description.png
│   ├── code-tab.png
│   ├── commit-full-screen.png
│   ├── compare-and-pull-request.png
│   ├── create-branch-button.png
│   ├── create-new-file.png
│   ├── create-new-repository.png
│   ├── delete-branch.png
│   ├── main-branch-dropdown.png
│   ├── my-profile-file.png
│   ├── profile-readme-example.png
│   └── pull-request-branches.png
├── node_modules/           # Node.js dependencies (after npm install)
├── .gitignore             # Git ignore rules
├── LICENSE                # MIT License
├── README.md              # Repository introduction
├── VERIFICATION.md        # Node.js app documentation
├── package.json           # Node.js dependencies and scripts
├── package-lock.json      # Locked dependency versions
└── verify.js              # 🔍 MAIN NODE.JS APPLICATION
```

## Important Notes for Agents

- **Dual-purpose repository**: Contains BOTH GitHub tutorial content AND a functional Node.js application
- **Always test both aspects**: Tutorial progression AND Node.js functionality when making changes
- **Node.js app works**: The Ethereum signature verification script is fully functional
- **CI workflow broken**: npm-gulp.yml will fail on gulp step (no gulpfile exists)
- **No automated tests**: Node.js application must be tested manually with `npm run verify`
- **Focus on documentation quality**: Ensure tutorial steps are clear and images are properly referenced  
- **Workflow dependencies**: Each tutorial step's workflow depends on specific triggers and conditions
- **Always validate changes**: Test that BOTH tutorial progression AND Node.js app still work after modifications

<tool_calling>
You have the capability to call multiple tools in a single response. For maximum efficiency, whenever you need to perform multiple independent operations, ALWAYS invoke all relevant tools simultaneously rather than sequentially. Especially when exploring repository, reading files, viewing directories, validating changes or replying to comments.
</tool_calling>