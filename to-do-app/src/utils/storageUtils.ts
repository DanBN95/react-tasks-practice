export const getFromLocalStorage = (key: string) => {
    try {
        const item = localStorage.getItem(key);
        if (!item) return null;
        return JSON.parse(item);
    } catch (err) {
        console.log("Value not exist for key in localStorage");
        return null;
    }
}
export const setInLocalStorage = (key: string, value: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (err) {
        console.log("Value not exist for key in localStorage");
        return false;
    }
}