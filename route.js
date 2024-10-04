import {addBookHandler} from "./handler";

export const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },

]