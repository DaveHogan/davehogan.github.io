+++
title = 'Cloudflare Universal SSL limitations with multi-level subdomains'
date = 2025-10-13T00:05:00+01:00
draft = false
tags = ["Cloudflare"]
categories = ["Development Blog"]
+++

## Universal SSL (free) doesn't support multi-level subdomains
I've battled another Cloudflare issue recently which is almost certainly due to my lack of experience with Cloudflare! However, I'm documenting it here for my own benefit and hopefully others.

After migrating some of my applications that have staging versions of a backend API, I came across some domains that just wouldn't resolve the SSL certificate. The error was simply `ERR_SSL_VERSION_OR_CIPHER_MISMATCH`.

![Browser error showing the text 'This site can't provide a secure connection' with error code 'ERR_SSL_VERSION_OR_CIPHER_MISMATCH'](/images/ERR_SSL_VERSION_OR_CIPHER_MISMATCH.png)

Assuming it was similar to the ['Too Many Redirects' from an Azure Hosted App Service](/posts/development/cloudflare-with-azure-app-service-too-many-redirects/), I checked the DNS, the certificate at the edge and in Azure. My usual box of tricks and a quick Google search couldn't determine the cause. I guess I wasn't searching for the right thing!

I finally got it working, without understanding the root cause, by purchasing the Advanced Certificate Manager product. My thinking at the time was perhaps it was specific to the assigned generated certificate. Maybe a fault in the generation of some kind.

Well, it sort of was, but not for the reason I first thought. 
After confirming that the paid Advanced Certificate Manager product worked, I did some further digging into the Cloudflare docs & community forums and discovered that the Cloudflare wildcard certificate only covers single-level *.domain.com subdomains. 

I wrongly assumed the wildcard would cover any number of subdomains. In fairness to Cloudflare this is well documented on their developer portal titled [Universal SSL certificates present some limitations](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/limitations/#hostname-coverage). 

Of course it's typical to come across this after the fact 😊

## My scenario: 

|Subdomain Example|Free SSL Covers?|Result|
|--|--|--|
|mydomain.com|✅|Always covered|
|api.mydomain.com|✅|Covered by *.mydomain.com|
|staging.mydomain.com|✅|Covered (as above)|
|api.staging.mydomain.com|❌|Not covered|

## The Root Cause
Cloudflare's free Universal SSL certificates use a wildcard that only covers **single-level** subdomains (*.domain.com). This is standard behavior for wildcard certificates, they don't cascade to deeper levels.
This was entirely my fault as I had the incorrect assumption I could have multi-level domains on an existing free wildcard certificate.

## The Options to resolve
For multi-level subdomains like `api.staging.mydomain.com`, you'd need a certificate that specifically includes `*.staging.mydomain.com` as a Subject Alternative Name (SAN).

So the options are:
1. Purchase the Advanced Certificate Manager from Cloudflare. 
   
   The benefit of this is that it evidently, manages this all for you seamlessly!
   ![Cloudflare Pricing / Order from for the Advanced Certificate Manager](/images/Purchase-AdvancedCertificateManager.png)
2. Avoid multi level subdomain such as replacing api.staging.mydomain.com with api-staging.mydomain.com
3. Disable Cloudflare for the sub-domain (grey-cloud api.staging.mydomain.com)
4. Upgrade to a Business or Enterprise plan to upload custom certificates (bring your own)

### Route I took
Whilst it's only $10 p/m for the Advanced Certificate Manager, I couldn't justify keeping this for essentially a non-prod domain for a pet project. I eventually went for option 3 before migrating to option 2.

The Advanced certificate manager does provide a ton of control and flexibility that the free Universal SSL doesn't provide so YMMV on your requirement. The price is very reasonable compared against other places I've purchased wildcard SSL certificates from previously.

I'm still amazed at the incredible offering from Cloudflare and the level of features provided for free for most use cases.