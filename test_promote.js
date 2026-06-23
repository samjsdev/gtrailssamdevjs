const GOOGLE_PHOTO_HOST_RE = /(googleusercontent\.com|ggpht\.com|gstatic\.com|googleapis\.com)/i;

function promoteGooglePhotoUrl(url) {
    if (!GOOGLE_PHOTO_HOST_RE.test(url)) return url;

    // Clean size parameters in the path if any (e.g. /w100-h100/ or /s16-c/)
    let clean = url
        .replace(/\/w\d+-h\d+(-[a-z0-9-]+)?\//gi, '/')
        .replace(/\/s\d+(-[a-z0-9-]+)?\//gi, '/');

    // Split by '=' to get the base URL
    const baseUrl = clean.split('=')[0];

    // Return standard high-resolution format
    return `${baseUrl}=w2048-h1536`;
}

console.log(promoteGooglePhotoUrl('https://lh5.googleusercontent.com/p/AF1QipNCXbB_j3tCg_hO1bH_yXv2p1p2j4_xVvT-_=w100-h100'));
console.log(promoteGooglePhotoUrl('https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=123&cb_client=maps_sv'));
