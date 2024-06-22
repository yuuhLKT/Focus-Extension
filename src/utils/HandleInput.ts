export const handleTimerInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: (value: number) => void,
    maxValue: number
) => {
    let input = e.target.value.replace(/\D/g, ''); 
    input = input.slice(0, 2); 
    const value = input ? parseInt(input, 10) : 0;
    setValue(value > maxValue ? maxValue : value);
};


export const formatUrl = (url: string) => {
    if (!/^https?:\/\//i.test(url)) {
        url = `https://${url}`;
    }
    if (!/^https?:\/\/www\./i.test(url)) {
        url = url.replace(/^https?:\/\//i, 'https://www.');
    }
    return url;
};

export function validateUrl(url: string) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?'+ // port
        '(\\/[-a-z\\d%_.~+]*)*'+ // path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(url);
}