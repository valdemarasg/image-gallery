import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { useGetImages, useGetAuthors } from '../hooks';
import { Spinner } from './Spinner';
import { PhotoItem } from './PhotoItem';

export const ImageGallery = () => {

  const [page, setPage] = useState(1);
  const { photos, loading, latestPhotos } = useGetImages(page);
  const { authorDetails } = useGetAuthors(latestPhotos, photos)

  useEffect(() => {
    const handleScroll = () => {
      const currHeight = window.innerHeight + document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      if (currHeight + 1 >= scrollHeight && !loading) {
        setPage(prev => prev + 1)
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);


  return <PageWrapper>
    <Wrapper>
      {photos?.map(photo => (
        <PhotoItem key={photo.id} photo={photo} owner={authorDetails?.find(item => item.id === photo.owner)?.author} />
      ))}
    </Wrapper>
    {loading &&
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    }
  </PageWrapper>

}

const PageWrapper = styled.div`
  padding-right: 20px;
  padding-left: 20px;
  align-items: center;
  position: relative;
  max-width: 100%;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  max-width: 898px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(273px, 1fr));
  padding: 20px;
  grid-gap: 20px;
  align-items: center;
  background-color: #dddddd;
  text-align: center;
`;

const SpinnerContainer = styled.div`
  margin: 30px auto 0 auto;
  width: 24px;
`;

