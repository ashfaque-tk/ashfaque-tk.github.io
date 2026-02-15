# How to Add Your Profile Photo

## Quick Steps

1. **Prepare your photo:**
   - Use a professional-looking headshot
   - Square format works best (500x500px or larger)
   - File formats: JPG or PNG

2. **Add to repository:**
   ```
   Save your photo as: assets/images/profile.jpg
   ```

3. **That's it!** The site will automatically display it.

---

## Detailed Instructions

### Option 1: Add Photo via GitHub Web Interface

1. Go to your repository on GitHub
2. Navigate to `assets/images/` folder
3. Click **Add file** → **Upload files**
4. Upload your photo named `profile.jpg`
5. Commit the changes

### Option 2: Add Photo Locally

```bash
# In your portfolio directory
cp /path/to/your/photo.jpg assets/images/profile.jpg

# Commit and push
git add assets/images/profile.jpg
git commit -m "Add profile photo"
git push
```

---

## Photo Recommendations

**Good profile photos:**
- Professional but approachable
- Clear face, good lighting
- Neutral or simple background
- Centered composition
- Square aspect ratio

**Avoid:**
- Selfies or casual snapshots
- Group photos (crop to just you)
- Busy backgrounds
- Poor lighting or blurry images
- Sunglasses or hats covering face

**Size:**
- Recommended: 500x500px to 1000x1000px
- File size: Keep under 500KB
- The CSS will crop it to a circle, so make sure your face is centered

---

## Temporary Placeholder

**Don't have a photo ready?**

You can temporarily hide the photo section:

Edit `_layouts/default.html` and comment out the profile-photo div:

```html
<!-- Temporarily hidden until photo is ready
<div class="profile-photo">
  <img src="{{ "/assets/images/profile.jpg" | relative_url }}" alt="{{ site.author.name }}">
</div>
-->
```

The site will still work, just without the circular photo at the top of the sidebar.

---

## Testing Locally

If running Jekyll locally:
```bash
bundle exec jekyll serve
```

Visit `http://localhost:4000` to see how your photo looks before pushing to GitHub.

---

## Troubleshooting

**Photo not showing?**
- Check file name is exactly: `profile.jpg` (not `Profile.jpg` or `profile.jpeg`)
- Verify it's in: `assets/images/profile.jpg`
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Wait 2-3 minutes for GitHub Pages to rebuild

**Photo looks stretched or cropped wrong?**
- Make sure original photo is square
- Center your face in the original photo
- Try a different photo with more headroom
