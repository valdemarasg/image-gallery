import { useEffect, useState } from 'react';
import { Photo } from '../types/Photo'
import { saveFavourite, removeFavourite, getIsFavourite, truncateString } from '../utils';
import styled from 'styled-components'

interface PhotoItemProps {
  photo: Photo;
  owner?: string;
}

export const PhotoItem = ({ photo, owner }: PhotoItemProps) => {

  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  useEffect(() => {
    setIsFavourite(getIsFavourite(photo.id))
  }, [photo.id]);

  const handleFavouriteButtonClick = () => {
    isFavourite ? removeFavourite(photo.id) : saveFavourite(photo.id);
    setIsFavourite(prev => !prev);
  }

  return (
    <PhotoItemWrapper>
      <Image loading="lazy" src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} alt={photo.title} />
      <Overlay className='overlay'>
        <Title>{truncateString(photo.title, 30, 'No title')}</Title>
        <Line />
        <Owner>
          {owner}
        </Owner>
        <Button onClick={() => handleFavouriteButtonClick()}>{isFavourite ? 'Remove favourite' : 'Favourite'}</Button>
      </Overlay>
    </PhotoItemWrapper>
  )
}

const Image = styled.img`
  border: 1px solid #ccc;
  box-shadow: 2px 2px 6px 0px  rgba(0,0,0,0.3);
  max-width: 100%;
  max-height: 200px;
`;

const Overlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(57, 57, 57, 0.502);
    top: 0;
    left: 0;
    transform: scale(0);
    transition: all 0.2s 0.1s ease-in-out;
    color: #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Line = styled.hr`
  border: 1px solid white;
  width: 50px;
  margin: 2px;
`;

const Title = styled.div`
  font-weight: 900;
  margin-top: 40px;
  font-size: 16px;
`;

const Owner = styled.div`
  font-weight: 600;
  font-size: 16px;
  font-style: italic;
`;

const Button = styled.button`
  cursor: pointer;
  border: 1px solid white;
  background-color: transparent;
  color: white;
  font-size: 16px;
  margin-top: 15px;
  border-radius: 20px;
  font-weight: 600;
  padding: 5px 15px;

  &:focus-visible,
  :hover {
    outline: none;
  }
`;

const PhotoItemWrapper = styled.div`
  position: relative;
  &:hover {
    .overlay {
      transform: scale(1);
    }
  }
`;