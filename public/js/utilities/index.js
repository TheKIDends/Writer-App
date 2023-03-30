export function previewText(text, limit) {
    if (text === "") return "";
    if (limit === 0) return "...";

    const res = text.replaceAll("\n", " ").replaceAll("\\s\\s+", " ").trim();
    if (res.length <= limit) return res;
    return res.substring(0, limit) + "..." ;
}

export function getDate() {
    const now = new Date();
    const options = { timeZone: 'Asia/Ho_Chi_Minh' }; // set timezone to GMT+7
    return now.toLocaleString('en-US', options);
}