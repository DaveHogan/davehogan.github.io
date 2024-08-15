+++
title = 'Gitflow Branching Strategy'
date = 2024-08-15T16:41:46+01:00
+++

_This post was taken from a rough [gist](https://gist.githubusercontent.com/DaveHogan/77052a4bcd902d4242d5ccf86daa1ddd/) I created whilst strategising a GitFlow branching strategy in a new team setting. Views may have likely changed since then and no on-size fits all._


# Introduction 
However you and your team manages branches; it's important to have at least some kind of strategy that everyone adheres to. Rules and process should be designed to keep things consistent within the team and changes flowing to avoid complex merges and other such issues with multiple work steams on a single code repository. 

Strategies can also evolve and developers can conflict with differing views. Most developers will at least attest that having some strategy is better than having no strategy. As for what's right for you and your team is no simple answer. It can be very dependant on the software your developing, team size and frequency of changes. 

In this post I've detailed what approach I recently took with a new team on existing code base by adopting mostly GitFlow approach..

Guidance is largely stolen from the following articles:

 - [nvie.com/posts/a-successful-git-branching-model/](https://nvie.com/posts/a-successful-git-branching-model/) 
 - [datasift.github.io/gitflow/index.html](https://datasift.github.io/gitflow/index.html)
 - [theserverside.com/blog/Gitflow-release-branch-process-start-finish](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Gitflow-release-branch-process-start-finish)

# What is Gitflow?
Gitflow is a branching model for Git, coined by ***Vincent Driessen*** in 2010. It has been largely adopted by many teams as it is very well suited to support collaboration and scaling the development team whilst supporting changes and potential hot fixes.

***Vincent Driessen*** has exercised some caution and he has since suggested a simpler `GitHub Flow` for scenarios whereby software is continuously delivered and does not need to support multiple or explicit versioning. [nvie.com/posts/a-successful-git-branching-model/](https://nvie.com/posts/a-successful-git-branching-model/)

# So why still use Gitflow?
Although our applications are largely Web based, continuously delivered and only one production version, we still required explicit versioning. There are also other benefits and will continue and formalise our strategy with Gitflow. This repository's goal is to explain this but also provide a test bed for branching, versioning and packaging.


# Infinite Branches
Each repo should infinitely hold two main branches:

- `main` (could be known as `
` but should be `main` for more inclusive language)
- `develop` (default, compare)

For our purposes we have retained the name `master` in some existing projects and moved to `main` for newly created repositories.

We consider `origin/main` to be the main branch where the source code of HEAD **always** reflects a production-ready state. This is the build that get's packaged and versioned as the release

## Rules for `main` branch
- The `main` branch tracks released code only. 
- The only commits to `main` are merges from release branches and hotfix branches.


### Rules for `develop` branch
We consider `origin/develop` to be the main branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release. Some would call this the `integration branch`. 

This is where any automatic nightly builds are built from - which we don't do today but could/should - 

# Supporting branches

The different types of branches we may use are:

Feature branches:
 - `feature/*`
 - `bugfix/*` (*not a hotfix branch and still acts like a feature branch and the same flow as features*)
    
Release branches:
- `release/*` (*the shortest lived of all Gitflow branches*)

Hotfix branches:
- `hotfix/*`

# Feature Branches
We consider `origin/develop` to be the main branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release. Some would call this the `integration branch`. 

This is where any automatic nightly builds are built from - which we don't do today but could/should
## Rules for feature branches

May branch off from:
`develop`

Must merge back into:
`develop`

Feature branches are branched off of the develop branch, and finished features and fixes are merged back into the develop branch when they’re ready for release

# Release Branches
When it is time to make a release, a release branch is created off of develop:

Release branches isn't the branch to trigger a deployment but rather a branch for formalising and merging in changes ready for a deployment.

When the release is finished, the release branch is merged into `main` as well as `develop`, to make sure that any changes made in the release branch aren't accidentally lost by new development.

The code in the release branch is deployed onto a suitable test environment, tested, and any problems are fixed directly in the release branch. This `deploy -> test -> fix -> redeploy -> retest cycle` continues until you’re happy that the release is good enough to release to customers.

## Rules for release branches
May branch off from: `develop`
Must merge back into:`develop` and `main`
Branch naming convention:
`rc/*`

# Hotfix branches:
Hotfix branches are created directly off the `main` branch

## Rules for Hotfix branches



# Setup & Install
Gitflow is a strategy and doesn't require any install as such however git does provide some helpers. Using the helpers enforces sticking with the strategy and therefore recommended.

Below is the git flow helper commands vs what commands get ran by git. Useful to understand what each command executes. You could run the individual git commands manually should you wish.

## Initialize Repo
*Configures the develop and main branches*
gitflow | git
--------|-----
**`git flow init`** | `git init`
&nbsp; | `git commit --allow-empty -m "Initial commit"`
&nbsp; | `git checkout -b develop main`

###  Create a feature branch
*Creates feature branch ensuring it's from develop branch*
gitflow | git
--------|-----
**`git flow feature start my-feature`** | `git checkout -b feature/my-feature develop`


### Share a feature branch
*Pushes the feature branch to the remote server*
gitflow | git
--------|-----
**`git flow feature publish my-feature`** | `git checkout feature/my-feature`
&nbsp; | `git push origin feature/my-feature`


### Get latest for a feature branch
*Pulls the feature branch from the remote*
gitflow | git
--------|-----
**`git flow feature pull origin my-feature`** | `git checkout feature/my-feature`
&nbsp; | `git pull --rebase origin feature/my-feature`


### Finalize a feature branch
*Merges the feature branch into develop and ensuring a regular merge with no-fastforward is performed* - only use when not creating a pull request for review
gitflow | git
--------|-----
**`git flow feature finish my-feature`** | `git checkout develop`
&nbsp; | `git merge --no-ff feature/my-feature`
&nbsp; | `git branch -d feature/my-feature`

## Releases

### Create a release branch

gitflow | git
--------|-----
**`git flow release start 1.2.0`** | `git checkout -b release/1.2.0 develop`


### Share a release branch

gitflow | git
--------|-----
**`git flow release publish 1.2.0`** | `git checkout release/1.2.0`
&nbsp; | `git push origin release/1.2.0`



### Finalize a release branch

gitflow | git
--------|-----
**`git flow release finish 1.2.0`** | `git checkout main`
&nbsp; | `git merge --no-ff release/1.2.0`
&nbsp; | `git tag -a 1.2.0`
&nbsp; | `git checkout develop`
&nbsp; | `git merge --no-ff release/1.2.0`
&nbsp; | `git branch -d release/1.2.0`


## Hotfixes

### Create a hotfix branch

gitflow | git
--------|-----
**`git flow hotfix start 1.2.1 [commit]`** | `git checkout -b hotfix/1.2.1 [commit]`


### Finalize a hotfix branch

gitflow | git
--------|-----
**`git flow hotfix finish 1.2.1`** | `git checkout main`
&nbsp; | `git merge --no-ff hotfix/1.2.1`
&nbsp; | `git tag -a 1.2.1`
&nbsp; | `git checkout develop`
&nbsp; | `git merge --no-ff hotfix/1.2.1`
&nbsp; | `git branch -d hotfix/1.2.1`


# Pull Requests

Pull requests should be used for merging most feature branches.

As a general rule, on the completion of a pull request, use the `Merge type` of `Merge (no fast forward)` and avoid Squash and Rebase merges unless the impact is full understood. Gitflow helper `**git flow feature finish my-feature**` does this automatically for you.


# Versioning
We should ensure Semantic Versioning throughout our applications, services and packages. The format should be `[Major].[Minor].[Patch].[BuildNumber][BuildSuffixTag]`

• **Major** - indicates a breaking change has been made and the client will have to change in order to use the new version of the service. Major releases are infrequent and slower to deploy

• **Minor** - indicates that minor features or significant fixes have been added

• **Patch** - indicates a minor bug fix or any other insignificant changes

• **BuildNumber** - indicates the incrementing ID from our Build Server.

• **BuildSuffixTag** - optional - signifies it's not a production build / release and differentiate different builds off the same branch.

> Feature branches and the develop branch build will have either an `-alpha` or `-preview` suffix (e.g. `2.6.0.123-alpha`).
>
> Release branches and hotfix branches should always build release candidate  branch build will have an `-rc` suffix (e.g. `2.6.0.123-rc`).
>
> `main` branch should always build unqualified versions - versions without build numbers (e.g. `2.6.0`).

## Version Numbers And GitFlow Branches
Here'’'s what to build from which branch.

Feature branches and the develop branch should always build `-alpha` versions (e.g. `2.6.0.123-alpha`).
Release branches and hotfix branches should always build release candidate versions (e.g. `2.6.0.123-rc`).
The `main` branch should always build unqualified versions - versions without build numbers (e.g. `2.6.0`).

Please remember:

When you create a new branch, you need to manually update the software’s version number.

If you’re using RPM, you need to put the buildNo part of the version number into the release tag in your spec file (or add a release tag to the configuration section if you’re using Maven’s RPM plugin).
What You Should Install Where

As a rule of thumb …

- `-alpha` versions should only be installed on dev boxes and integration environments. They shouldn’t be deployed to any of the dedicated test environments.
- `-rc` version should be installed in the dedicated test environments. In an emergency, a release candidate can be installed into the production environment.

- `Production` releases can be installed anywhere - and they are the only kind of build that should be installed into the production environment.


# Building
All builds should be defined in a `azure-pipelines.yml` that is on the root of `main` when using Azure DevOps Pipelines.

The yaml file should begin with the defined triggers:
```YAML 
trigger:
- main
- develop
- feature/*
- bugfix/*
- hotfix/*
- release/*
```

```YAML
steps:
- task: parse-release-notes-build-task@2 # custom task that takes the version from a release notes file (change log)
  displayName: 'Parse RELEASE_NOTES.md'
  inputs:
    releaseNotesFilename: './release_notes.md'
    semverOutputVariable: 'CustomBuildNumber'

- task: PowerShell@2
  displayName: 'Is Alpha Build?'
  condition: and(succeeded(), not(startsWith(variables['Build.SourceBranch'], 'refs/heads/rc/')))
  inputs: 
    targetType: 'inline'
    script: |
        Write-Host "##vso[build.updatebuildnumber]$(CustomBuildNumber).$(revision)-alpha"
        Write-Host "Build.BuildNumber: $(Build.BuildNumber)"

- task: PowerShell@2
  displayName: 'Is Release-Candidate Build?'
  condition: and(succeeded(), startsWith(variables['Build.SourceBranch'], 'refs/heads/rc/'))
  inputs: 
    targetType: 'inline'
    script: |
        Write-Host "##vso[build.updatebuildnumber]$(CustomBuildNumber).$(revision)"
        Write-Host "Build.BuildNumber: $(Build.BuildNumber)"
```