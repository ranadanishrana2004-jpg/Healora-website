# HealOra — Google Search Console setup (GoDaddy)

## Current setup: URL-prefix HTML verification

The owner selected the URL-prefix alternative after difficulty accessing GoDaddy DNS. The supplied Google verification tag has been added to the root homepage `index.html` for the property `https://www.healora.org/`. The static build copies this tag into the published homepage. Keep the tag in place after verification; `scripts/update-seo.mjs` preserves it.

Next: deploy the updated website, confirm the live homepage source contains the supplied `google-site-verification` meta tag, then return to the HTML-tag verification dialog and click **Verify**. After verification, open **Sitemaps**, enter `sitemap.xml` when the prefix is prefilled (otherwise the full sitemap URL below), and submit. Ownership is not verified merely by adding the tag locally.

The Domain/DNS instructions below remain an optional way to verify the entire domain later; they are not required for this URL-prefix method.

## Ready configuration

| Setting | Value |
| --- | --- |
| Recommended Search Console property | Domain: `healora.org` |
| Canonical website | `https://www.healora.org/` |
| Sitemap to submit | `https://www.healora.org/sitemap.xml` |
| Sitemap coverage | 15 public pages |
| Robots file | `https://www.healora.org/robots.txt` |
| Ownership verification | GoDaddy DNS TXT record supplied by Google |

The static build already publishes the sitemap and robots file. Public pages have canonical URLs and permit indexing; error pages have `noindex`. Domain verification does not require an HTML tag, a Google Analytics account, a code change or an API key. Google generates the account-specific verification value. It has not been supplied or added by this task.

Live check on 15 September 2026: homepage, sitemap and robots file all returned HTTP 200. The live sitemap contains the expected 15 URLs; live robots.txt permits crawling and references the correct sitemap. DNS nameservers are `ns65.domaincontrol.com` and `ns66.domaincontrol.com`, consistent with the owner's confirmed GoDaddy DNS provider. Search Console ownership and submission have not been performed.

## 1. Google mein property add karein

1. [Google Search Console](https://search.google.com/search-console/) kholein aur apne business-owner Google account se sign in karein.
2. Top-left property dropdown se **Add property** choose karein. Agar verified `healora.org` property pehle se maujood hai, usay select karke seedha step 4 par jayein.
3. **Domain** field mein sirf `healora.org` likhein. `https://`, `www` ya slash add na karein.
4. **Continue** dabayein. Manual DNS verification mein **TXT** record choose karein aur Google ka poora `google-site-verification=...` record copy karein. Google agar GoDaddy se automatic connection offer kare, woh bhi supported option hai; neeche manual method diya hai.

## 2. GoDaddy mein TXT record add karein

1. [GoDaddy Domain Portfolio](https://dcc.godaddy.com/) mein sign in karein.
2. `healora.org` select karein, phir **DNS / Manage DNS** kholein.
3. **Add New Record** choose karke ye values dein:

| Field | Value |
| --- | --- |
| Type | `TXT` |
| Name / Host | `@` |
| Value | Google ka poora copied record, `google-site-verification=` se shuru hone wala |
| TTL | Default / 1 hour |

4. **Save** karein. Existing records ko replace na karein; isay ek naya TXT record rakhein. Nameservers, A/CNAME aur email MX/SPF records ko change karne ki zaroorat nahi.

## 3. Ownership verify karein

1. Search Console ke verification dialog mein wapas ja kar **Verify** dabayein.
2. Agar record abhi na mile, kuch waqt baad dobara Verify karein. DNS changes ko propagate hone mein 48 hours tak lag sakte hain.
3. Success ke baad **Go to property** choose karein. TXT record ko DNS mein rehne dein: Google baad mein verification dobara check kar sakta hai.

## 4. Sitemap submit karein

1. Browser mein [sitemap.xml](https://www.healora.org/sitemap.xml) kholein. XML/URLs dikhne chahiye, login page ya error nahi. XML par browser ka “no style information” message normal hai.
2. Search Console mein verified `healora.org` property select karein.
3. Left sidebar mein **Indexing → Sitemaps** kholein.
4. **Add a new sitemap** mein `https://www.healora.org/sitemap.xml` paste karein aur **Submit** dabayein. Agar UI pehle se `https://www.healora.org/` prefix dikha rahi ho to sirf `sitemap.xml` likhein.
5. Report refresh hone ke baad **Success** status check karein. Sitemap mein 15 URLs hain; discovered-page count update hone mein waqt lag sakta hai. Discovered URLs ka matlab sab URLs indexed hona nahi hai.

## 5. Priority pages ki indexing request karein

Search Console ke top **URL Inspection** bar mein ek URL paste karein. **Test live URL** se availability check karein; agar page indexable ho aur indexed na ho/update hua ho to **Request indexing** use karein. In pages se shuru karein:

- `https://www.healora.org/`
- `https://www.healora.org/services/websites-and-apps/`
- `https://www.healora.org/services/ai-agents-and-bots/`

Baaki pages sitemap se discover ho sakte hain. Same URL ko baar-baar request karna crawl ko tez nahi karta. Crawling/indexing mein din ya haftay lag sakte hain; request se ranking ya indexing guarantee nahi hoti.

## Agar error aaye

- **Ownership verification failed:** root host `@`, correct domain aur exact Google TXT value check karein; DNS propagation ka waqt dein.
- **Couldn't fetch sitemap:** exact HTTPS URL open karein, website deployment aur HTTP 200 response check karein. Sitemap URL ko login/password protection se free hona chahiye.
- **Sitemap read, pages not indexed:** **Indexing → Pages** report aur individual **URL Inspection** result dekhein. Submitted/discovered aur indexed alag stages hain.

## Sources

- [Google: add a property](https://support.google.com/webmasters/answer/34592?hl=en)
- [Google: verify ownership](https://support.google.com/webmasters/answer/9008080?hl=en)
- [GoDaddy: add a TXT record](https://www.godaddy.com/help/add-a-txt-record-19232)
- [Google: Sitemaps report](https://support.google.com/webmasters/answer/7451001?hl=en)
- [Google: request crawling](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
