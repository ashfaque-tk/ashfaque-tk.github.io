# Portfolio Website v2.0 - Maggie Wolff Layout

Clean, professional portfolio with sidebar layout inspired by Maggie Wolff's design.

## Layout Features

**Sidebar (Left):**
- Circular profile photo
- Name and title
- Location
- Social links (LinkedIn, GitHub, Blog) with icons

**Main Content:**
- Horizontal navigation (About | Projects | CV/Resume | Writing)
- Clean, focused content pages

✅ **Mobile responsive** - Sidebar collapses on small screens  
✅ **Fast & minimal** - No JavaScript, loads instantly  
✅ **Easy to update** - Just edit markdown files  
✅ **Professional** - Matches industry-standard DS portfolio layouts  

---

## Quick Deploy (5 Minutes)

### Step 1: Create GitHub Repository
```bash
# On GitHub, create new repository: yourusername.github.io
# Example: ashfaque-tk.github.io
```

### Step 2: Add Your Profile Photo (IMPORTANT)

**Before pushing, add your profile photo:**

1. Save a professional square photo as: `assets/images/profile.jpg`
2. Photo should be 500x500px or larger
3. The CSS will crop it to a circle

**Don't have a photo ready?** See `assets/images/README.md` for how to temporarily hide the photo section.

### Step 3: Update Your Info

**Edit `_config.yml`:**
```yaml
author:
  name: Your Name
  title: Your Title
  location: Your City, Country
  email: your@email.com
  github: your-username
  linkedin: your-linkedin-id
  medium: your-medium-handle
```

### Step 4: Clone and Push
```bash
# Clone this repository or download files
git init
git add .
git commit -m "Initial portfolio v2"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

### Step 5: Enable GitHub Pages
1. Go to repository **Settings** → **Pages**
2. Source: `main` branch, `/ (root)` folder
3. Click **Save**

**Live in 2-3 minutes:** `https://yourusername.github.io`

---

## Customization Guide

**📖 See [CUSTOMIZATION.md](CUSTOMIZATION.md) for detailed instructions on:**
- Adding your profile photo
- Changing colors and styling
- Modifying navigation
- Adjusting sidebar width
- Adding Font Awesome icons
- Common layout questions

---

## File Structure

```
portfolio-v2/
├── _config.yml              # Site configuration (EDIT YOUR INFO HERE)
├── _layouts/
│   └── default.html         # Custom layout with sidebar + horizontal nav
├── assets/
│   ├── css/
│   │   └── style.scss       # Custom styling
│   └── images/
│       ├── profile.jpg      # YOUR PHOTO GOES HERE
│       └── README.md        # Photo instructions
├── index.md                 # Homepage (About Me)
├── projects.md              # Projects page
├── cv.md                    # CV/Resume page
├── writing.md               # Blog/writing page
├── CUSTOMIZATION.md         # Detailed customization guide
└── README.md                # This file
```

---

## Customization Guide

### 1. Update Your Info (REQUIRED)

**Edit `_config.yml`:**
```yaml
title: Your Name
description: Your tagline
author:
  name: Your Name
  email: your@email.com
  github: your-github-username
  linkedin: your-linkedin-id
  medium: your-medium-handle
```

### 2. Update Homepage (`index.md`)

- Edit "Key themes in my work" section
- Update project list (as you complete them)
- Modify "About" section to match your story

### 3. Add Projects (`projects.md`)

For each new project:
```markdown
### Project Name
*Brief description*

**Problem:** What problem does it solve?

**Approach:**
- Key technical decisions
- Methods used
- Results achieved

**Impact:** Quantified business results

**Tech:** Tools and libraries used  
**Code:** [GitHub link] | **Blog:** [Medium link]
```

### 4. Update CV (`cv.md`)

- Add new skills as you learn them
- Update work experience section
- Add new projects (keep top 3-4 most impressive)
- Update education if needed

### 5. Add Blog Posts (`writing.md`)

For each post:
```markdown
### Post Title
*Month Year*

Brief description of what the post covers.

[Read on Medium](link) | **Topics:** tags, tags, tags
```

---

## Adding Pages

Create new `.md` file in root:
```markdown
---
layout: default
title: Page Title
---

# Page Content

Your content here...
```

Link from navigation (edit `_layouts/default.html`) or from other pages.

---

## Local Testing (Optional)

**Install Jekyll:**
```bash
gem install jekyll bundler
```

**Create Gemfile:**
```bash
echo 'source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins' > Gemfile
```

**Run locally:**
```bash
bundle install
bundle exec jekyll serve
```

Visit: `http://localhost:4000`

---

## Styling Customization

**Colors, fonts, spacing:** Edit `assets/css/style.scss`

**Common customizations:**
- Link color: Search for `#2980b9` and replace
- Heading color: Search for `#2c3e50` and replace
- Font size: Modify `font: 16px/1.6` in body section
- Spacing: Adjust margins in heading sections

---

## When to Upgrade

**Keep this GitHub Pages version until:**
- You have 3-4 completed projects
- You're actively job hunting
- You have regular blog posts

**Then consider upgrading to:**
- Hugo Academic theme (more features, still free)
- Custom Next.js site (full control, requires hosting)
- Jekyll with custom theme (middle ground)

---

## Tips for Success

**Content Strategy:**
1. Complete projects BEFORE listing them
2. Write blog posts as you build projects
3. Update CV after each project
4. Add links when available (don't leave placeholder #)

**SEO:**
- Each page has descriptive title
- Add meta descriptions in frontmatter
- Link between pages naturally
- Keep URLs clean and readable

**Maintenance:**
- Update every time you complete a project (every 2-3 weeks)
- Add blog posts regularly (monthly minimum)
- Keep CV section synced with resume
- Remove "In Progress" when done

---

## Layout Highlights

**What Makes This Layout Work:**
- ✅ Profile photo creates immediate personal connection
- ✅ Horizontal navigation feels modern and intuitive
- ✅ Sidebar keeps contact info always visible
- ✅ Clean "About Me" homepage (like Maggie Wolff's)
- ✅ No duplicate content (name appears once)
- ✅ Professional hierarchy matches industry standards

**Compared to Eugene Yan's style:**
- More visual (photo + cleaner sidebar)
- Simpler homepage (brief intro vs thematic organization)
- Better for career changers (emphasis on person, not just projects)

---

## Next Steps

**Week 1:**
1. Deploy this site
2. Update all personal info
3. Test all pages

**Weeks 2-4:**
1. Complete Project 1 (Demand Forecasting)
2. Update projects.md with results
3. Write blog post about it
4. Add to writing.md

**Repeat for each project.**

---

## Support

**Issues?**
- Check GitHub Pages is enabled in Settings
- Verify `_config.yml` has no syntax errors
- Test locally with `bundle exec jekyll serve`
- Check file permissions (should be public)

**Questions?**
- GitHub Pages docs: https://docs.github.com/en/pages
- Jekyll docs: https://jekyllrb.com/docs/

---

**License:** MIT - Use freely, attribution appreciated

**Credits:** Inspired by Eugene Yan and Maggie Wolff's excellent portfolios
