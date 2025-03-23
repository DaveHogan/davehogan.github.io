# Personal blog hosted at davehogan.co.uk
Code repo for the personal blog of [Dave Hogan](https://davehogan.co.uk), a software developer from the UK.
You'll find personal opinions / ramblings and findings of my continuous learning journey of Software Development, Technology and Music Theory.

## Tech stack used

 - Hosted on [Github Pages](https://pages.github.com/)
 - Powered by  [Hugo](https://gohugo.io/)
 - Themed with [PaperMod](https://github.com/adityatelange/hugo-PaperMod)
 - Comments powered by [Cusdis](https://cusdis.com/)

## Creating new content

### Creating a new post

1. Use Hugo's built-in command to create a new post:
   ```bash
   hugo new content/posts/category/post-name.md
   ```
   Replace `category` with one of the existing categories (e.g., `music` or `development`) and `post-name` with your post's URL-friendly name.

2. The new post will be generated with the default front matter. Edit it to match your needs:
   ```markdown
   +++
   title = 'Your Post Title'
   date = YYYY-MM-DDT00:00:00+01:00
   tags = ["Tag1", "Tag2"]
   categories = ["Category Name"]
   +++

   Your content goes here...
   ```

3. Write your post content using Markdown.

4. To add YouTube videos, use the YouTube shortcode:
   ```markdown
   {{< youtube VIDEO_ID >}}
   ```

5. To link to other posts, use the format:
   ```markdown
   [Post Title](/posts/category/post-name)
   ```

6. Preview your post by running:
   ```bash
   hugo server -D
   ```

7. Once you're happy with your post, commit and push your changes to GitHub to publish.

### Reference: Existing Tags and Categories

#### Categories
The blog currently uses these categories:
- **Music Blog** - For posts about music, piano learning, etc.
- **Development Blog** - For technical posts about software development

#### Tags
Common tags used in posts:

**Music Related:**
- Piano
- Grade 1
- ABRSM

**Development Related:**
- Git
- Tutorials
- Testing
- Unit Testing
- DI
- WebPack
- Bundling
- Minification
- Web Optimisation
- Azure
- Cloudflare
- Opinionated

**Example front matter for a music post:**
```markdown
+++
title = 'My Piano Progress'
date = 2023-01-01T10:00:00+01:00
tags = ["Piano", "Grade 1", "ABRSM"]
categories = ["Music Blog"]
+++
```

**Example front matter for a development post:**
```markdown
+++
title = 'How to Use Git Effectively'
date = 2023-01-01T10:00:00+01:00
tags = ["Git", "Tutorials"]
categories = ["Development Blog"]
+++
```

## Contributing
Pull requests for content suggestions, typos and improvements welcome but please no advertisements or anything sponsored. Currently no content on this website is affiliated with any third-parties or monetised in any way. In the unlikely event something features in the future, this would be fully disclosed upfront.

