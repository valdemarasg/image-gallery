import { Photo } from '../types';

//removes items from newPhotos if it exists in photos array
export const checkForDuplicates = (photos: Photo[], newPhotos: Photo[]): Photo[] => {
    const uniquePhotos: Photo[] = [];
    newPhotos.forEach(photoItem => {
        const isDuplicate = photos.find(item => item.id === photoItem.id)
        if (!isDuplicate) {
            uniquePhotos.push(photoItem);
        }
    });

    return uniquePhotos;
}


//returns new author ids from latestPhotos if it dont exist in authorIds array
export const checkForNewAuthors = (authorIds: string[], latestPhotos: Photo[]): string[] => {
    const newAuthors: string[] = [];
    latestPhotos.forEach(photoItem => {
        if (!authorIds.find(item => item === photoItem.owner)) {
            newAuthors.push(photoItem.owner);
        }
    });
    return newAuthors;
}