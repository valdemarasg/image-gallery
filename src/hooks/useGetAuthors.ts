import { useEffect, useState } from 'react';
import { Photo, Author } from '../types'
import { checkForNewAuthors } from '../utils';
import { api_key } from '../constants';

export function useGetAuthors(latestPhotos: Photo[], photos: Photo[]) {

    const [authorDetails, setAuthorDettails] = useState<Author[]>([])
    const ids = photos?.map(item => item.owner) || [];
    useEffect(() => {
        const newAuthors = checkForNewAuthors(ids, latestPhotos);
        const fetchAuthor = async (authorId: string) => {
            const response = await fetch(
                `https://www.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=${api_key}&user_id=${authorId}&format=json&nojsoncallback=1`
            );
            const data = await response.json();
            const name = data?.person?.realname?._content;
            const username = data?.person?.username?._content;
            const newAuthor = { id: authorId, author: name?.length > 0 ? name : username };
            setAuthorDettails((curr) => [...curr, newAuthor]);
        }
        newAuthors.forEach(author => fetchAuthor(author))
    }, [latestPhotos, photos, ids])
    return { authorDetails };
}