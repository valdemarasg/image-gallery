import { useEffect, useState } from 'react';
import { Photo } from '../types';
import { api_key } from '../constants';
import { checkForDuplicates } from '../utils'

export function useGetImages(page: number) {
    const photosPerPage = 15;
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [latestPhotos, setLatestPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch(
                    `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${api_key}&per_page=${photosPerPage}&page=${page}&format=json&nojsoncallback=1`
                );
                const data = await response.json();
                const newPhotos: Photo[] = data?.photos?.photo ?? [];
                if (newPhotos) {
                    const filteredPhotos = checkForDuplicates(latestPhotos, newPhotos);
                    setPhotos((currPhotos) => [...currPhotos, ...filteredPhotos]);
                    setLatestPhotos(filteredPhotos);
                }

                setLoading(false)

            } catch (error) {
                console.log('failed to fetch photos', error);
            }
        }
        if (!loading) {
            setLoading(true);
            fetchPhotos();
        }
    }, [page]);

    return {
        photos, loading, latestPhotos
    }
}
