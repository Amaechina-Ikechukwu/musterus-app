// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const groupupdate = async (
  mykey,
  mskl,
  uid,
  group,
  groupname,
  groupcategory,
  moderated,
  publicgroup,
  groupintro,
  grouppolicy,
  website,
) => {
  console.log({
    mykey,
    mskl,
    uid,
    group,
    groupname,
    groupcategory,
    moderated,
    publicgroup,
    groupintro,
    grouppolicy,
    website,
  });
  try {
    const url = `/ws/groups/update?mykey=${mykey}&mskl=${mskl}&uid=${uid}&grid=${group}&groupname=${groupname}&groupcategory=${groupcategory}&moderated=${moderated}&publicgroup=${publicgroup}&groupintro=${groupintro}&grouppolicy=${grouppolicy}&website=${website}`;

    const response = await api.post(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
