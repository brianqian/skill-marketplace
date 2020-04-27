import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import useUpload from '../../hooks/useUpload/useUpload';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  border: 1px solid lightgray;
  padding: 1rem;
`;

const MediaPlaceholder = styled.div`
  width: 100px;
  height: 100px;
  border: 4px dashed lightgray;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * 1. Container listens to images dragged on and uploaded
 * 2. useUpload makes a request to the backend containing userId and img in dataURL format
 * 3. backend makes the POST request to Cloudinary in this format:
 *    - timestamp: 1315060510 (valid for 1hr)
 *    - public_id: sample_image (image name)
 *    - api_key: 1234 (public api key)
 *    - eager: w_400,h_300,c_pad|w_260,h_200,c_crop
 *    - file: https://www.example.com/sample.jpg (in this case, the dataURL/base64 encoding)
 *    - signature: bfd09f95f331f558cbd1320e67aa8d488770583e
 * 3b. Additional options found here: https://cloudinary.com/documentation/image_upload_api_reference
 *    - Other options to consider, folder, tags (userId). folder path can also be defined in public_id
 * 3c. Signature is a SHA-1 encrypted string (alphabetically ordered parameter keys)
 *    eg. eager=w_400,h_300,c_pad|w_260,h_200,c_crop&public_id=sample_image&timestamp=1315060510<APISECRETKEY>
 *
 * 4. After all the options are gathered, they are URL encoded in the body of the request
 *  'file=https://www.example.com/sample.jpg&eager=w_400,h_300,c_pad|w_260,h_200,c_crop&timestamp=173719931&api_key=436464676&signature=a788d68f86a6f868af'
 * 5. Request returns eager transformed img urls that can be used as thumbnails to notify user of upload
 * 5b. Alternatively full image size thumbnails can be temporarily created until
 *
 */

type Props = {
  media: string[];
  name: 'media';
  setValue: any;
};

const MediaContainer = React.forwardRef((props: Props, ref: React.Ref<HTMLInputElement>) => {
  const [thumbnails, setThumbnails] = useState([]);
  const { convert, files, loaded, resetState } = useUpload(props.media);

  const handleChange = (e: any) => {};

  return (
    <>
      <Container>
        <MediaPlaceholder />
        <MediaPlaceholder />
        <MediaPlaceholder />
        <MediaPlaceholder>
          Add
          <input type="file" name={props.name} onChange={handleChange} />
        </MediaPlaceholder>
      </Container>
    </>
  );
});

export default MediaContainer;
