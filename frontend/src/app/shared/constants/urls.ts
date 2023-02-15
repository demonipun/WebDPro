// for holding all the constant values and urls are constant too

// define base address since it is shared among all the apis
const base_url = 'http://localhost:5000'; // address of server for development
// when we publish our code on a real server, it will be changed to the address of a real domain


export const foods_url = base_url + '/api/foods';
export const foods_tags_url = foods_url + '/tags';
export const foods_by_search_url = foods_url + '/search/';
export const foods_by_tag_url = foods_url + '/tag/';
export const foods_by_id_url = foods_url + '/';


export const user_login_url = base_url + '/api/users/login';
export const user_register_url = base_url + '/api/users/register';
