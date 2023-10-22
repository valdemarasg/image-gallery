import { expect, test, describe } from 'vitest';
import { checkForDuplicates, checkForNewAuthors } from './photosUtils';
import photos from './mocks/photos-1';
import newPhotos from './mocks/photos-2';
import expectedResultWithoutDuplicates from './mocks/photos-3';

describe('checkForDuplicates ', () => {
    test('should remove last photo item as it matches with item in photo list', () => {
        expect(checkForDuplicates(photos, newPhotos)).toEqual(expectedResultWithoutDuplicates);
    })
    test('should return same new photos list if non member matches from both arrays', () => {
        expect(checkForDuplicates(photos, expectedResultWithoutDuplicates)).toEqual(expectedResultWithoutDuplicates);
    })
})

describe('checkForNewAuthors ', () => {
    test('should returm new author list', () => {
        const authorIds: string[] = ['35389361@N06', '144401380@N06'];
        const expectedResult = ['165133281@N05', '185888701@N02', '61137578@N00'];
        expect(checkForNewAuthors(authorIds, photos)).toEqual(expectedResult)
    })
})