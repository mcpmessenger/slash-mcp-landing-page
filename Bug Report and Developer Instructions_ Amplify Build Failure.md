# Bug Report and Developer Instructions: Amplify Build Failure

This document provides a bug-bounty style report for the identified issue in the Amplify CI/CD pipeline and includes the necessary instructions for the developer to implement the fix.

## Bug Report

| Field | Value |
| :--- | :--- |
| **Title** | Amplify deploys always run `npm ci`, even when `package-lock.json` is missing |
| **Severity** | Medium |
| **Author** | Manus AI |
| **Date** | December 28, 2025 |

### Description

The Amplify CI build specification, defined in `amplify.yml`, executes the `npm ci` command unconditionally during the `preBuild` phase. The `npm ci` command is designed to perform a clean installation of dependencies but strictly requires an existing `package-lock.json` file.

When the repository snapshot checked out by Amplify does not include `package-lock.json`—a scenario common for clean deploys or branches that temporarily omit it—`npm ci` immediately fails with the documented `EUSAGE` error:

> "`npm ci` can only install with an existing package-lock.json"

This failure causes every frontend deployment to exit with code 1 before the build step can even commence.

### Steps to Reproduce

1.  Trigger an Amplify build on a commit that lacks the `package-lock.json` file.
2.  Amplify runs `npm ci` during the `preBuild` phase.
3.  The build log will show the `EUSAGE` error, and the build will exit with code 1.

### Impact

No new frontend deployments can successfully complete unless the repository checkout already contains a valid `package-lock.json` file, leading to a brittle and unreliable deployment pipeline.

### Suggested Fix

The root cause is addressed by wrapping the dependency installation step with a conditional guard. The fix ensures that if `package-lock.json` exists, the faster and more reliable `npm ci` is used; otherwise, it falls back to the standard `npm install` command.

The corrected `preBuild` phase in `amplify.yml` is as follows:

```yaml
    preBuild:
      commands:
        - echo "Installing dependencies (using npm ci if lockfile exists, else npm install)"
        - if [ -f package-lock.json ]; then npm ci; else npm install; fi
```

---

## Developer Instructions

The following steps outline the process to commit and push the necessary changes to resolve the build issue.

### 1. Review and Stage Changes

Ensure the following three files are staged for commit. The `amplify.yml` file contains the fix, and the other two files were specified as part of the necessary deployment payload.

| File Path | Purpose |
| :--- | :--- |
| `amplify.yml` | Contains the fix for the conditional `npm ci` execution. |
| `src/components/ui/scroll-morph-hero.tsx` | User-specified file to be included in the commit. |
| `package-lock.json` | The updated dependency lockfile. |

**Command to Stage Files:**

```bash
git add amplify.yml src/components/ui/scroll-morph-hero.tsx package-lock.json
```

### 2. Commit Changes

Use a clear and descriptive commit message following conventional commit guidelines.

**Command to Commit:**

```bash
git commit -m "Fix(amplify): Guard npm ci with package-lock.json check to prevent build failures"
```

### 3. Push to Remote

Push the changes to the remote repository. Amplify will automatically pick up the changes and the next build should succeed, even from a clean checkout.

**Command to Push:**

```bash
git push
```
