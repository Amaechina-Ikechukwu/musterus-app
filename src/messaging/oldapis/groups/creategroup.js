// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const groupcreate = async (
  mykey,
  mskl,
  uid,
  grid,
  groupname,
  groupcategory,
  moderated,
  publicgroup,
  groupintro,
  grouppolicy,
  website,
) => {
  try {
    const url = `/ws/groups/edit?mykey=${mykey}&mskl=${mskl}&uid=${uid}&grid=${grid}&groupname=${groupname}&groupcategory=${groupcategory}&moderated=${moderated}&publicgroup=${publicgroup}&groupintro=${groupintro}&grouppolicy=${grouppolicy}&website=${website}&sj=edit`;

    const response = await api.post(url);

    return response.data;
  } catch (error) {
    throw error;
  }
};
