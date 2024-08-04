import { decodeEntity } from 'html-entities';
import { getPlaiceholder } from 'plaiceholder';
import probe, { ProbeResult } from 'probe-image-size';

export const generateThumbnail = async (url: string) => {
  try {
    const decodedURL = decodeEntity(url);
    const thumbnail = await getPlaiceholder(decodedURL);

    return thumbnail.base64;
  } catch (error) {
    if (error instanceof Error)
      console.error(`Error generating thumbnail: ${error.message}`);

    return '';
  }
};

export const getMetadata = async (url: string) => {
  try {
    const imageData: ProbeResult = await probe(url);
    const metadata = {
      width: imageData.width,
      height: imageData.height,
      type: imageData.type,
      mime: imageData.mime,
    };

    return metadata;
  } catch (error) {
    if (error instanceof Error)
      console.error(`Error getting Image resolution: ${error.message}`);

    return {
      width: 0,
      height: 0,
      type: '',
      mime: '',
    };
  }
};
