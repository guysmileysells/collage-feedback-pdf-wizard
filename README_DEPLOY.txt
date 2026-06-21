Collage Feedback PDF Wizard - Deployable Site

What this is

This folder is a static website version of the Collage Feedback PDF Wizard.
It can be uploaded to a normal website host and opened from desktop or mobile.

Default access code

1234

Important security note

This is a simple 4-digit static-site gate. It is useful for casual access
control, but it is not strong security because static websites send their code
to the browser. For private student records or sensitive information, use a
hosting platform with real server-side password protection or account login.

How to publish

Option 1: Netlify Drop

1. Go to https://app.netlify.com/drop
2. Drag the entire Collage_Feedback_PDF_Wizard_Site folder onto the page.
3. Netlify will give you a public URL.
4. Share that URL and the 4-digit code.

Option 2: Cloudflare Pages

1. Create a Cloudflare Pages project.
2. Upload this folder or connect it to a repository.
3. Use index.html as the site entry page.

Option 3: Any basic web host

Upload index.html as the main page for a folder or subdomain.

Changing the 4-digit code

Ask Codex to change the Collage Feedback PDF Wizard site PIN, or update the
ACCESS_CODE_HASH value in index.html with the hash for your desired code.
