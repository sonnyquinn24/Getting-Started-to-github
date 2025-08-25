# GitHub Tutorial Repository

**ALWAYS follow these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

This is an educational repository that teaches GitHub fundamentals through interactive workflows. It contains GitHub Actions-based tutorials that guide users through creating branches, making commits, opening pull requests, and merging changes.

## Working Effectively

### Repository Structure
- **Root files**: README.md, LICENSE, .gitignore
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

**NEVER CANCEL: All validation commands complete in < 5 seconds. Set timeout to 30+ seconds.**

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
- **No build system**: This repository contains no code to build, test, or run - it's pure documentation and workflows

## Validation Scenarios

**CRITICAL**: Always test these scenarios after making changes:

1. **Tutorial flow validation**:
   - Navigate through tutorial steps in order: 0-welcome.md → 1-create-a-branch.md → 2-commit-a-file.md → 3-open-a-pull-request.md → 4-merge-your-pull-request.md → X-finish.md
   - Verify each step references correct images and workflows
   - Check that step progression matches workflow triggers

2. **Image reference validation**:
   - All images referenced in markdown files exist in `images/` directory (except external collabocats.jpg)
   - Run: `grep -o "images/[^)]*\.png\|images/[^)]*\.jpg" .github/steps/*.md | cut -d: -f2 | sort | uniq | while read img; do if [ -f "$img" ]; then echo "✓ $img exists"; else echo "✗ MISSING: $img"; fi; done`

3. **Git workflow testing**:
   - Create test branch: `git branch test-branch`
   - Switch branches: `git checkout test-branch && git checkout main`
   - Clean up: `git branch -d test-branch`

## Common Tasks

### Working with Tutorial Content
- **Add new tutorial step**: Create corresponding `.md` file in `.github/steps/` and `.yml` workflow in `.github/workflows/`
- **Update step progression**: Modify the step number trigger in workflows
- **Add images**: Place in `images/` directory and reference with relative path `/images/filename.png`

### Debugging Workflows
- **Check current step**: `cat .github/steps/-step.txt`
- **Validate workflow syntax**: `yamllint .github/workflows/<workflow-name>.yml`
- **Review workflow logic**: Look for `if` conditions and step triggers in workflow files

### Repository Maintenance
- **Lint markdown**: `markdownlint *.md .github/steps/*.md` (if markdownlint available)
- **Check file structure**: `tree -a` or `find . -type f | sort`
- **Validate all links**: Manual review of markdown files for broken references

## Timing Expectations

- **Git operations**: < 1 second - NEVER CANCEL
- **File operations**: < 1 second - NEVER CANCEL  
- **Workflow validation**: < 5 seconds - NEVER CANCEL, set timeout to 30+ seconds
- **Image validation**: < 2 seconds - NEVER CANCEL
- **Repository exploration**: < 3 seconds - NEVER CANCEL

## Directory Structure Reference

```
.
├── .git/                    # Git repository data
├── .github/
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
│       └── 4-merge-your-pull-request.yml
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
├── .gitignore             # Git ignore rules
├── LICENSE                # MIT License
└── README.md              # Repository introduction
```

## Important Notes for Agents

- **This is NOT a code repository** - do not look for package.json, Makefile, or build scripts
- **No application to run** - this repository teaches GitHub concepts through documentation
- **Focus on documentation quality** - ensure tutorial steps are clear and images are properly referenced  
- **Workflow dependencies** - each step's workflow depends on specific triggers and conditions
- **Always validate changes** - test that tutorial progression still works after modifications

<tool_calling>
You have the capability to call multiple tools in a single response. For maximum efficiency, whenever you need to perform multiple independent operations, ALWAYS invoke all relevant tools simultaneously rather than sequentially. Especially when exploring repository, reading files, viewing directories, validating changes or replying to comments.
</tool_calling>