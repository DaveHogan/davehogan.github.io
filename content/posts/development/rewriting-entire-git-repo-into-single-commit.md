+++
title = 'Rewriting Entire Git Branch into a Single Commit'
date = 2024-08-21T23:44:22+01:00
draft = false
tags = ["Git", "Tutorials"]
categories = ["Development Blog"]
+++

## Squishing Everything Back to a Single Commit in Git

Ever wanted your Git history to go back to the initial commit while preserving the content you have today? For example, maybe you're making a private repository public and want to remove the commit history but keep the current state. While a better option might be to create a new repository and commit everything fresh, if you really need to do this, here are the steps I took recently.

__It should probably go without saying, but please understand what this does and double-check why you think you may need to do this! Others who have this repository cloned will have to re-clone or reset their copies.__

__Additionally, this approach works best if you have a single branch. If you have other branches, you will encounter challenges. It's best to do this only on repositories with a single branch. You could theoretically repeat these steps on additional branches.__

### 1. **Backup Your Work**
Before making any changes, ensure you back up your repository to prevent accidental data loss. I repeat, __backup!__ Don't rely on your local Git or remotes to get out of this!

### 2. **Reset to Initial Commit**
First, reset your repository to the initial commit to erase any previous commit history.

1. Find the hash of the initial commit:
    ```bash
    git log --reverse
    ```
    The first commit will be at the bottom. Copy its hash or the one you want to revert to.

2. Reset the repository to that commit:
    ```bash
    git reset --soft <initial-commit-hash>
    ```
    This should keep the files you have in the directory while taking you back to the commit hash you specified in step 2.1. Be aware of anything that may have been inadvertently included in a `.gitignore` file.

### 3. **Stage All Changes**
Stage all current files to prepare them for a new commit:

```bash
git add .

```

### 4. **Create a New Commit**
Create a new commit that will include all the, now staged, changes:

```bash
git commit -m "Initial commit"
```

### 5. **Force Push to the Remote Repository (if applicable and if permitted)**
If you've already pushed commits with history you wish to clear to a remote repository, force-push the new single commit to overwrite the remote history:

```bash
git push origin main --force
```

### 6. **Verify the New History**
Check the Git log to ensure that everything has been squashed into a single commit:

```bash
git log
```

## Did it work?

If your git history data is still present (perhaps in older commits), you want to permanently remove it. Tools like `git filter-repo` or `BFG Repo-Cleaner` can help you clean the entire history of a Git repository, removing sensitive files from all previous commits.

By following these steps, you'll have a single commit as the main history of your repository, with the previous commits effectively erased in your local and remote where you `push -f` too.


