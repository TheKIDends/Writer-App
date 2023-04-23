export function previewText(text, limit) {
    if (text === "") return "";
    if (limit === 0) return "...";

    const res = text.replaceAll("\n", " ").replaceAll("\\s\\s+", " ").trim();
    if (res.length <= limit) return res;
    return res.substring(0, limit) + "..." ;
}

export function getDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return formattedDate;


    // const options = { timeZone: 'Asia/Ho_Chi_Minh' }; // set timezone to GMT+7
    // return now.toLocaleString('en-US', options);
}