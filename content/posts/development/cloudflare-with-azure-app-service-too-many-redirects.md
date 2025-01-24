+++
title = 'Too many redirects with Cloudflare + Azure App Service'
date = 2025-01-25T00:05:00+01:00
draft = false
tags = ["Azure", "Cloudflare"]
categories = ["Development Blog"]
+++

## Too many redirects?! Why
I spent far too long troubleshooting why a perfectly good, HTTPS enabled Web Application hosted on an Azure App Service failed after moving the DNS (proxied) over to Cloudflare. 

The App Service wasn't doing anything I would consider non-standard. Simple site with a custom domain, correct SSL bindings and just a free "App Service Managed Certificate".

Symptom was simply  `ERR_TOO_MANY_REDIRECTS` like so:

![Too many redirects error in browser](/images/some-domains-too-many-redirects.png)

I've since learnt this typically happens because both Cloudflare and Azure are trying to handle SSL/TLS termination and redirects.

## The Solution

1. **In Cloudflare:**
   - Go to SSL/TLS settings
   - Set SSL mode to "Full (strict)"
   - Optional - Under Edge Certificates, enable "Always Use HTTPS"

![Cloudflare SSL/TLS settings showing Full/Strict mode](/images/cloud-flare-full-strict-ssl.png)



2. Optional - **In Azure App Service:**
   - Navigate to your App Service
   - Go to TLS/SSL settings
   - Under "Protocol Settings", ensure "HTTPS Only" is enabled
   
## Why This Works
- Azure App Service handles the HTTPS redirect at the application level
- Cloudflare handles the SSL/TLS termination at the edge
- Setting SSL mode to "Full (strict)" ensures proper end-to-end encryption and validates the certificate on your origin server
- "Always Use HTTPS" in Cloudflare prevents mixed content issues

## Common Mistakes
1. Using "Flexible" SSL in Cloudflare (this is actually the default!?)
2. Having conflicting redirect rules
3. Not enabling "HTTPS Only" in Azure
4. Using "Full" instead of "Full (strict)" SSL mode

## Testing The Configuration
After making these changes this should resolve the issue but if not try:
1. Clearing your browser cache
2. Try accessing both HTTP and HTTPS versions of your site (you should configure always redirect to HTTPS really)
3. Maybe wait a few minutes after making changes as they may take time to propagate.

Hope this helps someone, I wrongly assumed I had some other issue with the App Service or conflicting certificate. Seems odd the default settings would cause this issue and didn't find much about this elsewhere.