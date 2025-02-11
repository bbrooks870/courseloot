# Guide to Change Website Theme

## Example Prompt for Theme Change (Self-Help Theme Example)

```
I have a Next.js website codebase for PDFs that I want to convert into a self-help books website. Please help me update the following based on the .cursorrules guide:

1. Update SEO & Metadata:
   - Site name: "FreeSelfHelpPDF" (or your chosen name)
   - Theme: "Self Help Books and Personal Development"
   - Update all titles and descriptions in:
     - app/layout.tsx
     - app/page/[page]/layout.tsx
     - app/categories/layout.tsx
     - app/privacy/page.tsx
     - app/terms/page.tsx
     - app/contact/page.tsx

2. Update Content in server/videos.ts:
   - Categories should be self-help related like:
     - Personal Development
     - Mindfulness & Meditation
     - Psychology
     - Success & Achievement
     - Relationships
     - Health & Wellness
     - Financial Success
     - Leadership
   - Update PDF entries with self-help books
   - Update descriptions to match self-help theme

3. Update Branding:
   - Change email to: contact@freeselfhelppdf.com (or your domain)
   - Update social media links
   - Change color scheme to be more calming/inspiring (suggest colors)

4. Update Images:
   - Create new logo for self-help theme
   - Update favicon
   - Create new OG image
   - Update default PDF thumbnails to match self-help style

Please help me implement these changes one by one, starting with the metadata updates.
```

## Steps to Change Theme

1. Clone Repository
   ```bash
   git clone [repository-url]
   cd [repository-name]
   npm install
   ```

2. Prepare Your Content
   - Gather your PDF links and content
   - Organize your categories
   - Prepare your branding assets
   - Choose your color scheme

3. Follow the Prompt Structure
   - Replace "Self Help" with your theme
   - Adjust categories to match your theme
   - Modify colors and branding to suit your niche
   - Update example domain with your domain

4. Common Theme Examples and Their Categories:

   ### Educational Books
   - Mathematics
   - Physics
   - Chemistry
   - Biology
   - Computer Science
   - Languages
   - History
   - Literature

   ### Business Books
   - Marketing
   - Finance
   - Management
   - Entrepreneurship
   - Strategy
   - Leadership
   - Sales
   - Economics

   ### Technology Books
   - Programming
   - Web Development
   - Mobile Development
   - Data Science
   - AI & Machine Learning
   - Cybersecurity
   - Cloud Computing
   - DevOps

   ### Health & Medical Books
   - Medicine
   - Nursing
   - Anatomy
   - Nutrition
   - Mental Health
   - Fitness
   - Alternative Medicine
   - Public Health

5. Theme-Specific Considerations

   For each theme, consider:
   - Color scheme appropriate for the niche
   - Typography that matches the subject matter
   - Relevant icons and imagery
   - Appropriate tone in descriptions
   - Target audience expectations
   - Industry-specific terminology
   - Relevant social media platforms to link

6. SEO Optimization Tips
   - Use niche-specific keywords
   - Write descriptions that resonate with your target audience
   - Include relevant meta tags for your industry
   - Optimize image alt texts for your theme
   - Use proper heading hierarchy for your content

Remember to:
- Keep branding consistent across all pages
- Test all functionality after changes
- Update all placeholder content
- Verify all links and resources
- Check mobile responsiveness
- Test performance after changes 