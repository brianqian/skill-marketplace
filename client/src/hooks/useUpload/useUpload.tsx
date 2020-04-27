import { useEffect, useState } from 'react';

const LIMIT = 4;

// This hook should take in a FileList and stores an array of images in the format of of base64 encoded string
//

const useUpload = (initialMedia: string[] = []) => {
  const [files, setFiles] = useState(initialMedia);
  const [loaded, setLoaded] = useState(false);

  const resetState = () => {
    setFiles(initialMedia);
    setLoaded(false);
  };

  const convert = (input: FileList) => {
    const imageArray = [] as string[];
    const loadImages = (event: any, name: string, i: number) => {
      imageArray.push(event.target.result);
      if (i === input.length - 1) {
        console.log('done', imageArray);
        setFiles([...files, ...imageArray]);
        setLoaded(true);
      }
    };

    Array.from(input).forEach((file, i) => {
      console.log(`Parsing ${file.name}`);
      const reader = new FileReader();
      const { name } = file;
      reader.addEventListener('load', e => loadImages(e, name, i));
      reader.readAsDataURL(file);
    });
  };

  return { convert, files, loaded, resetState };
};

export default useUpload;
