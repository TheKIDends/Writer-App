export function downloadHTML(htmlContent, filename) {
    let source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(htmlContent);
    let fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = filename + '.html';
    fileDownload.click();
    document.body.removeChild(fileDownload);
}

export function downloadWord(htmlContent, filename) {
    let header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
                        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
                        "xmlns='http://www.w3.org/TR/REC-html40'>" +
                        "<head><meta charset='utf-8'></head><body>";
    let footer = "</body></html>";
    let sourceHTML = header + htmlContent + footer;
    let source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    let fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = filename + '.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
}
