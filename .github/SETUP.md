# GitHub Actions Setup

## Automated Issue Creation in operators-frontend

To enable automatic issue creation in the `operators-frontend` repository when protocols are updated, you need to configure a Personal Access Token (PAT).

### Setup Instructions

1. **Create a Personal Access Token**:
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Give it a descriptive name: `operators-auto-sync`
   - Set expiration (recommend: 1 year)
   - Select scopes:
     - ✅ `repo` (Full control of private repositories)
       - This includes access to create issues in the operators-frontend repo
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again)

2. **Add the token as a repository secret**:
   - Go to the `operators` repository settings
   - Navigate to: Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `FRONTEND_PAT`
   - Value: Paste the token you copied
   - Click "Add secret"

3. **Verify setup**:
   - Make a test change to any protocol file in `protocols/`
   - Push to main branch
   - Check the GitHub Actions workflow runs
   - Verify that an issue is created in `operators-frontend`

### How It Works

When protocols are updated:
1. The `auto-compile.yml` workflow compiles `protocols.json`
2. If `FRONTEND_PAT` is configured:
   - ✅ Creates/updates an issue in `operators-frontend` with sync instructions
3. If `FRONTEND_PAT` is NOT configured:
   - ⚠️ Shows a warning in the workflow logs
   - The workflow still succeeds, but no issue is created

### Security Notes

- The PAT is stored securely as a GitHub secret
- It's never exposed in logs or workflow outputs
- Only repository admins can view/edit secrets
- Consider using a bot/service account instead of a personal account
- Rotate the token before expiration

### Troubleshooting

**Issue not being created?**
1. Check the workflow logs for errors
2. Verify the `FRONTEND_PAT` secret exists and is correctly named
3. Ensure the token hasn't expired
4. Verify the token has `repo` scope permissions

**Issue created but can't be accessed?**
- The token might not have access to the `operators-frontend` repository
- If using an organization, ensure SSO is enabled for the token
