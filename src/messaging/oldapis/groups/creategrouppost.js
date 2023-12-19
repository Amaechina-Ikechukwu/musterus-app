import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const creategrouppost = async (mykey, mskl, uid, group, data, image) => {
  console.log({mykey, mskl, uid, group, data});
  try {
    const url = `/ws/groups/createpost?mykey=${mykey}&mskl=${mskl}&uid=${uid}&group=${group}&postid={groups}&poststatus=${encodeURIComponent(
      data?.status,
    )}&posttitle=${encodeURIComponent(data?.title)}&postbody=${data.body}`;

    const response = await api.post(url);

    return response.data;
  } catch (error) {
    throw error;
  }
};
