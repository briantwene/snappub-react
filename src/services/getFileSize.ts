const bytes = require('bytes');

export const getFileSize = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Error fetching image stream: ${response.status} - ${response.statusText}`
      );
    }
    const fileSize = response.headers.get('content-length');

    if (!fileSize) {
      return 'Unknown';
    }

    return bytes(parseInt(fileSize));
  } catch (error) {
    throw error;
  }
};
