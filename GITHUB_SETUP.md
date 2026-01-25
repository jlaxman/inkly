# GitHub Repository Setup Guide

## Step 1: Create Repository on GitHub

1. Go to: https://github.com/new
2. Repository name: `inkly` (or your preferred name)
3. Description: "Premium e-commerce platform for custom apparel, gifts, and more"
4. Choose: **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

## Step 2: Connect Local Repository

After creating the repository on GitHub, run these commands:

```bash
# Add remote (replace with your actual GitHub username if different)
git remote add origin https://github.com/jlaxman/inkly.git

# Or if using SSH:
# git remote add origin git@github.com:jlaxman/inkly.git

# Push to GitHub
git push -u origin main
```

## Step 3: Verify

Check that everything is pushed:
```bash
git remote -v
git log --oneline
```

## Alternative: Create Repository via GitHub CLI

If you have GitHub CLI installed:

```bash
gh repo create inkly --public --source=. --remote=origin --push
```

## Troubleshooting

### Repository not found
- Make sure you created the repository on GitHub first
- Check that the repository name matches exactly
- Verify your GitHub username is correct

### Authentication issues
- Use GitHub Personal Access Token instead of password
- Or set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### Branch name mismatch
If GitHub created the repo with `master` instead of `main`:
```bash
git branch -M main
git push -u origin main
```
