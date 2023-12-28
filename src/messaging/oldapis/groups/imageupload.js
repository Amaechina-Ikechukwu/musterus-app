import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const imageupload = async (mykey, mskl, uid, group, data, image) => {
  try {
    const formData = new FormData();
    const name = image.substring(image.lastIndexOf('/') + 1);

    formData.append('userfile', {
      uri: image, // Replace with the actual path of the image file
      type: `image.${name}`, // Replace with the appropriate image type
      name: `image/${name}`, // Replace with the desired filename
    });

    const url = `https://www.musterus.com/ws/groups/imageupload?mykey=${mykey}&mskl=${mskl}&uid=${uid}&group=${group}&location=groups&imagecaption=${data?.caption}&upsection=${data?.upsection}`;
    const response = await fetch(url, {
      method: 'POST',
      body: formData?._parts,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const responseData = await response.json();
    console.log(responseData); // Logging the response data

    return responseData;
  } catch (error) {
    throw error;
  }
};
