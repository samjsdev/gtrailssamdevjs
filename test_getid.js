function getImageId(url) {
    try {
        const parsed = new URL(url);
        if (parsed.search) {
            return parsed.pathname + parsed.search;
        }
        return parsed.pathname;
    } catch {
        return url;
    }
}

console.log(getImageId('https://lh3.googleusercontent.com/p/AF1QipNCXbB_j3tCg_hO1bH_yXv2p1p2j4_xVvT-_=w2048-h1536'));
console.log(getImageId('https://lh5.googleusercontent.com/p/AF1QipNCXbB_j3tCg_hO1bH_yXv2p1p2j4_xVvT-_=w2048-h1536'));
console.log(getImageId('https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=123&cb_client=maps_sv'));
