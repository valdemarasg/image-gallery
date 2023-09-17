
export const truncateString = (str?: string, size = 30, defaultValue?: string) => {
    if (!str || str.length === 0) {
        return defaultValue ?? "";
    }
    return str.length > size ? `${str.slice(0, size)}...` : str;
}