# GitHub Skills Tutorial Repository

Always reference these instructions first and only fallback to search or bash commands when you encounter unexpected information that does not match the info here.

This is a GitHub Skills educational repository that teaches GitHub fundamentals through automated workflow-based tutorials. It is NOT a traditional software project with build tools, dependencies, or application code.

## Repository Purpose and Structure

This repository provides an interactive tutorial system for learning GitHub basics:
- **Current Step Tracking**: `.github/steps/-step.txt` contains current tutorial step (0-4, then X for completion)
- **Workflow Automation**: 5 GitHub Actions workflows (`.github/workflows/`) that auto-advance tutorial steps
- **Step Instructions**: Tutorial content in `.github/steps/` (0-welcome.md through X-finish.md)
- **Images**: Tutorial screenshots in `/images/` directory
- **Educational Content**: Only contains README.md, LICENSE, and tutorial infrastructure

## Working Effectively

### Understanding the Tutorial System
- The tutorial progresses through 5 steps (0-4) then completion (X)
- Each step has an automated GitHub Actions workflow that detects user actions
- Workflows automatically update the step number and README content
- Current step is always stored in `.github/steps/-step.txt`

### Step Progression Overview
1. **Step 0 (Welcome)**: Triggered when repository is created from template
2. **Step 1 (Create Branch)**: User must create branch named `my-first-branch`
3. **Step 2 (Commit File)**: User must commit `PROFILE.md` to `my-first-branch`
4. **Step 3 (Open PR)**: User must open pull request from `my-first-branch` to `main`
5. **Step 4 (Merge PR)**: User must merge the pull request
6. **Step X (Finish)**: Tutorial completion with next steps

### Workflow Timing and Behavior
- **NEVER CANCEL**: Workflow execution takes 30-60 seconds. NEVER CANCEL. Set timeout to 120+ seconds.
- **Expected Wait Time**: 20 seconds after each action for workflow to complete and update step
- **Refresh Required**: Users must refresh browser to see updated instructions after workflow completion
- **Manual Triggers**: All workflows support `workflow_dispatch` for manual execution if needed

## Validation Scenarios

### Complete Tutorial Walkthrough
Always test the full tutorial flow when making changes:

1. **Verify Current Step**: Check `.github/steps/-step.txt` shows expected step number
2. **Test Branch Creation**:
   - Create branch named exactly `my-first-branch`
   - Verify step advances from 1 to 2 within 60 seconds
3. **Test File Commit**:
   - Create `PROFILE.md` with content "Welcome to my GitHub profile!"
   - Commit with message "Add PROFILE.md" to `my-first-branch`
   - Verify step advances from 2 to 3 within 60 seconds
4. **Test Pull Request**:
   - Open PR from `my-first-branch` to `main` branch
   - Title: "Add my first file"
   - Verify step advances from 3 to 4 within 60 seconds
5. **Test Merge**:
   - Merge the pull request
   - Delete the branch when prompted
   - Verify step advances from 4 to X within 60 seconds

### Manual Workflow Testing
If automatic triggers fail, test manual workflow dispatch:
- Navigate to repository Actions tab
- Select specific workflow (e.g., "Step 1, Create a branch")
- Click "Run workflow" button to manually trigger
- Workflows typically complete in 30-60 seconds

## Common Tasks and Troubleshooting

### Checking Current Tutorial State
```bash
# Check current step
cat .github/steps/-step.txt

# View current step instructions
cat .github/steps/$(cat .github/steps/-step.txt)-*.md
```

### Workflow Debugging
- **Step Not Advancing**: Wait full 60 seconds, then check Actions tab for workflow status
- **Wrong Branch Names**: Workflows require exact branch name `my-first-branch`
- **Repository Template**: Workflows won't run on template repositories
- **Step Mismatch**: Workflows only run when current step matches expected step number

### File Locations
- **Step tracking**: `.github/steps/-step.txt`
- **Workflow definitions**: `.github/workflows/0-welcome.yml` through `4-merge-your-pull-request.yml`
- **Tutorial content**: `.github/steps/0-welcome.md` through `X-finish.md`
- **Images**: `/images/` directory contains tutorial screenshots

## Repository-Specific Rules

### DO NOT Modify These Files
- Never change `.github/steps/-step.txt` manually (workflows manage this)
- Never modify workflow files unless fixing actual bugs
- Never delete tutorial images from `/images/` directory

### Safe Modifications
- README.md content (though workflows may overwrite during tutorial)
- Adding new documentation files
- Modifying .gitignore or LICENSE
- Creating new branches for development work

### Expected Workflow Execution Times
- **Step advancement workflows**: 30-60 seconds. NEVER CANCEL. Set timeout to 120+ seconds.
- **Manual workflow dispatch**: 30-60 seconds to complete
- **User wait time between steps**: 20 seconds minimum before refreshing browser

## Validation Requirements

When making any changes to this repository:

1. **Always verify tutorial still functions end-to-end**
2. **Test all 5 workflow steps complete successfully**
3. **Confirm step tracking file updates correctly**
4. **Verify README.md updates automatically during tutorial progression**
5. **Test manual workflow dispatch functionality**
6. **Ensure tutorial images display correctly**

This is an educational repository designed to teach GitHub workflows - treat it as a learning platform, not a traditional development project.