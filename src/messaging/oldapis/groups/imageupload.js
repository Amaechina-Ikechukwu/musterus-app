import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const imageupload = async (mykey, mskl, uid, group, data, image) => {
  try {
    const formData = new FormData();
    formData.append('userfile', {
      uri: image, // Replace with the actual path of the image file
      type: image.substring(image.lastIndexOf('.') + 1), // Replace with the appropriate image type
      name: image.substring(image.lastIndexOf('/') + 1), // Replace with the desired filename
    });

    const url = `/ws/groups/imageupload?mykey=${mykey}&mskl=${mskl}&uid=${uid}&group=${group}&location=groups&imagecaption=${encodeURIComponent(
      data?.caption,
    )}&upsection=${encodeURIComponent(data?.upsection)}`;

    const response = await api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
