# Customization Guide - Layout Changes Explained

## Overview of New Layout

Your portfolio now has a **Maggie Wolff-inspired** layout:

**Left Sidebar:**
- Profile photo (circular)
- Your name
- Title/tagline
- Location
- Social links (LinkedIn, GitHub, Blog)

**Main Content Area:**
- Horizontal navigation at top (About | Projects | CV/Resume | Writing)
- Page content below

---

## How to Make Changes

### 1. Update Your Profile Info

**Edit `_config.yml`:**

```yaml
author:
  name: Ashfaque Thonikkadavan        # Your name
  title: Data Scientist | Optimization Specialist   # Your tagline
  location: Strasbourg, France         # Your location
  email: your@email.com
  github: your-github-username         # Just username, not full URL
  linkedin: your-linkedin-id           # Just the ID from your LinkedIn URL
  medium: your-medium-handle           # Just the handle
```

These values automatically populate throughout the site.

---

### 2. Add Your Profile Photo

See `assets/images/README.md` for detailed instructions.

**Quick version:**
1. Save a square professional photo as: `assets/images/profile.jpg`
2. Commit and push
3. Done!

**Temporary workaround if no photo yet:**

Edit `_layouts/default.html` and comment out lines 16-20:

```html
<!-- 
<div class="profile-photo">
  <img src="{{ "/assets/images/profile.jpg" | relative_url }}" alt="{{ site.author.name }}">
</div>
-->
```

---

### 3. Customize Navigation

**To add/remove/rename nav items:**

Edit `_layouts/default.html`, find the `<nav class="horizontal-nav">` section (around line 37):

```html
<nav class="horizontal-nav">
  <a href="{{ "/" | relative_url }}">About</a>
  <a href="{{ "/projects" | relative_url }}">Projects</a>
  <a href="{{ "/cv" | relative_url }}">CV/Resume</a>
  <a href="{{ "/writing" | relative_url }}">Writing</a>
  <!-- Add more links here -->
</nav>
```

**To add a new page:**
1. Create new markdown file (e.g., `talks.md`)
2. Add link to navigation
3. Done!

---

### 4. Change Colors

**Main colors are in `assets/css/style.scss`:**

```scss
/* Links and accents */
color: #2980b9;  /* Blue - Line 52 */

/* Headings */
color: #2c3e50;  /* Dark blue-gray - Line 29 */

/* Text */
color: #333;     /* Dark gray - Line 10 */

/* Borders */
border-bottom: 2px solid #e8e8e8;  /* Light gray - Line 30 */
```

**To change your brand color:**
1. Search for `#2980b9` in `style.scss`
2. Replace all instances with your color (e.g., `#e74c3c` for red)
3. Do the same for hover state `#1a5490`

---

### 5. Adjust Sidebar Width

The minimal theme sets sidebar width. To customize:

**Create a new file: `assets/css/overrides.scss`**

```scss
---
---

@import "style";

/* Wider sidebar */
@media screen and (min-width: 960px) {
  .wrapper {
    width: 1200px;  /* Default is 860px */
  }
  
  header {
    width: 300px;   /* Default is 270px */
  }
  
  section {
    width: 850px;   /* Adjust based on wrapper width */
  }
}
```

Then update `_layouts/default.html` to use `overrides.css` instead of `style.css`.

---

### 6. Social Link Icons

**Current setup uses emoji:** 🔗 💻 ✍️

**To use Font Awesome icons instead:**

Add to `_layouts/default.html` in `<head>`:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
```

Then update social links section:

```html
<div class="social-links">
  <p><a href="..."><i class="fab fa-linkedin"></i> LinkedIn</a></p>
  <p><a href="..."><i class="fab fa-github"></i> GitHub</a></p>
  <p><a href="..."><i class="fab fa-medium"></i> Blog</a></p>
</div>
```

---

### 7. Homepage Content

**Edit `index.md` to customize your "About Me" section.**

Current structure:
- Brief intro paragraph
- Your transition story
- What you do
- What you bring
- Currently learning

**Keep it concise** - 4-5 short paragraphs max. This is Maggie's style.

**For more detailed content**, use the Projects page.

---

### 8. Remove Sections You Don't Need

**Don't have blog posts yet?**

Delete or hide `writing.md` and remove from navigation.

**Don't want to show certain info?**

Edit `_config.yml` and comment out:

```yaml
# author:
#   medium: your-handle   # Hide blog link
```

The template checks if values exist before displaying.

---

## Layout Comparison

### Old Version (Eugene-style)
- ❌ Name appears twice (sidebar + content)
- ❌ Vertical navigation in sidebar
- ❌ Homepage was thematic organization
- ❌ No photo support

### New Version (Maggie-style)
- ✅ Name only in sidebar
- ✅ Horizontal navigation at top of content
- ✅ Homepage is clean "About Me"
- ✅ Profile photo in sidebar
- ✅ Social links with icons

---

## Files You'll Edit Most Often

**Regular updates:**
- `index.md` - Homepage content
- `projects.md` - Add new projects
- `cv.md` - Update resume
- `writing.md` - Add blog posts

**One-time setup:**
- `_config.yml` - Your info
- `assets/images/profile.jpg` - Your photo
- `_layouts/default.html` - Layout changes (advanced)
- `assets/css/style.scss` - Styling (advanced)

**Don't touch:**
- `.gitignore`
- `Gemfile`
- Jekyll internal files

---

## Common Questions

**Q: Can I use a different theme?**  
A: Yes, but you'll lose the custom layout. For now, stick with this until you upgrade to Hugo/Next.js in 4-6 months.

**Q: How do I make the sidebar photo bigger?**  
A: Edit `assets/css/style.scss`, line 24, change `150px` to `200px` (or whatever size).

**Q: Can I add a resume PDF download link?**  
A: Yes! Add to `cv.md`:
```markdown
[Download PDF](assets/files/Ashfaque_CV.pdf)
```
Then upload your PDF to `assets/files/`.

**Q: The site looks different on my phone.**  
A: That's intentional - it's responsive. Test on mobile to ensure it looks good.

---

## Getting Help

**Layout not working?**
- Check `_layouts/default.html` for typos
- Ensure all closing tags match opening tags
- Test locally with `bundle exec jekyll serve`

**Styling broken?**
- Check `assets/css/style.scss` for missing semicolons or braces
- Clear browser cache
- Inspect element in browser dev tools

**Content not updating?**
- Wait 2-3 minutes for GitHub Pages to rebuild
- Check GitHub Pages status in repository Settings → Pages
- Clear browser cache

---

## Next Steps

1. ✅ Add your profile photo
2. ✅ Update `_config.yml` with your info
3. ✅ Customize `index.md` About Me section
4. ✅ Test locally before pushing
5. ✅ Deploy to GitHub Pages
6. ⏳ Start adding projects as you complete them
