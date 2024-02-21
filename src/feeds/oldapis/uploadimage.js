import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const uploadimage = async (mykey, image) => {
  try {
    const formData = new FormData();
    const name = image.substring(image.lastIndexOf('/') + 1);

    formData.append('userfile', {
      uri: image, // Replace with the actual path of the image file
      type: `image/${name}`, // Replace with the appropriate image type
      name: `image/${name}`, // Replace with the desired filename
    });

    const url = '/ws/postcomment'; // API endpoint path, baseURL will be automatically prepended
    const response = await api.post(url, formData._parts, {
      headers: {
        'Content-Type': 'multipart/form-data',
        mykey: mykey, // Include your custom headers here
      },
    });

    console.log(response.data, formData._parts); // Logging the response data

    return response.data;
  } catch (error) {
    throw error;
  }
};
