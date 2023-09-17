const favouritesKey = 'photos_favourites';

const getFavourites = (): string[] => {
    const favourites = localStorage.getItem(favouritesKey);
    try {
        if (!favourites) {
            return [];
        }
        const parsedFavourites: string[] = JSON.parse(favourites);
        return parsedFavourites;
    } catch (e) {
        console.log("cant get favourites", e);
        return [];
    }
}

export const getIsFavourite = (favourite: string): boolean => {
    return !!getFavourites()?.find(item => item === favourite);
}

export const saveFavourite = (favourite: string) => {
    localStorage.setItem(favouritesKey, JSON.stringify([...getFavourites(), favourite]));
}

export const removeFavourite = (favourite: string) => {
    localStorage.setItem(favouritesKey, JSON.stringify(getFavourites()?.filter(item => item !== favourite)));
}