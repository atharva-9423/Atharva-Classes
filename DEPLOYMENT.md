
# GitHub Pages Deployment Instructions

## Quick Setup

1. **Change Repository Name References:**
   - In `vite.config.js`: Change `base: '/Atharva-classes/'` to `base: '/your-repo-name/'`
   - In `package.json`: Change homepage URL `https://your-username.github.io/Atharva-classes` to `https://your-username.github.io/your-repo-name`

2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

## Detailed Steps

### 1. Create GitHub Repository
- Create a new repository on GitHub with your desired name
- Push your code to the repository

### 2. Update Configuration
Replace the following placeholders:
- `your-username` → Your GitHub username
- `your-repo-name` → Your repository name
- `Atharva-classes` → Your repository name

### 3. Enable GitHub Pages
- Go to your repository settings
- Navigate to "Pages" section
- Select "Deploy from a branch"
- Choose `gh-pages` branch as source

### 4. Deploy
Run the deployment command:
```bash
npm run deploy
```

Your site will be available at: `https://your-username.github.io/your-repo-name`

## Files to Modify When Changing Repository Name

1. **vite.config.js** - Update the `base` property
2. **package.json** - Update the `homepage` field

## Commands Available

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages

## Troubleshooting

- Ensure your repository is public or you have GitHub Pro for private repo pages
- Make sure the `gh-pages` branch is created after first deployment
- Check that GitHub Pages is enabled in repository settings
