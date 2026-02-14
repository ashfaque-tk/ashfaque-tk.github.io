# Portfolio Website - Setup Instructions

Simple GitHub Pages portfolio site. Takes 5 minutes to deploy.

## Quick Deploy

### Step 1: Create Repository
```bash
# On GitHub, create a new repository named: yourusername.github.io
# Example: ashfaque-tk.github.io
```

### Step 2: Push These Files
```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select: `main` branch, `/ (root)` folder
4. Click **Save**

Your site will be live at: `https://yourusername.github.io` in 2-3 minutes.

## Files Structure

```
portfolio-site/
├── _config.yml          # Site configuration
├── index.md             # Home page with intro
├── cv.md                # Full CV page
└── README.md            # This file
```

## Customization

### Update Contact Info
Edit `_config.yml` and `index.md` with your details.

### Add Projects/Blog Links
Update the links in `index.md` navigation section.

### Change Theme
In `_config.yml`, change `theme:` to any [supported theme](https://pages.github.com/themes/):
- jekyll-theme-minimal (current)
- jekyll-theme-cayman
- jekyll-theme-slate

### Add More Pages
Create new `.md` files in root. Link them from `index.md`.

## Local Testing (Optional)

```bash
# Install Jekyll
gem install jekyll bundler

# Create Gemfile
echo 'source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins' > Gemfile

# Run locally
bundle install
bundle exec jekyll serve

# Visit: http://localhost:4000
```

## Next Steps

1. Add project repositories to your GitHub
2. Write blog posts on Medium
3. Link them in the navigation
4. Update CV as you add forecasting/optimization projects

---

**Note:** GitHub Pages uses Jekyll automatically. No build step needed—just push markdown files.
