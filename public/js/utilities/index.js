export function previewText(text, limit) {
    if (text === "") return "";
    if (limit === 0) return "...";

    const res = text.replaceAll("\n", " ").replaceAll("\\s\\s+", " ").trim();
    if (res.length <= limit) return res;
    return res.substring(0, limit) + "..." ;
}