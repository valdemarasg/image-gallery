import { Photo, Author } from '../types';

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


//returns new autho=r ids from latestPhotos if it dont exist in authorDetails array
export const checkForNewAuthors = (authorDetails: Author[], latestPhotos: Photo[]): string[] => {
    const newAuthors: string[] = [];
    latestPhotos.forEach(photoItem => {
        if (!authorDetails.find(item => item.id === photoItem.owner)) {
            newAuthors.push(photoItem.owner);
        }
    });
    return newAuthors;
}