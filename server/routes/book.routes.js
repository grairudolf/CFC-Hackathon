import { Router } from "express";

import BOOK_API_ENDPOINTS from "../controllers/book.controller.js";


const BOOKS_ROUTE = Router();

BOOKS_ROUTE

    .get    ("/", BOOK_API_ENDPOINTS.GET_BOOK)
    .post   ("/", BOOK_API_ENDPOINTS.CREATE_BOOK)
    .put ("/:id", BOOK_API_ENDPOINTS.UPDATE_BOOK)
    .delete ("/:id", BOOK_API_ENDPOINTS.DELETE_BOOK);


export default BOOKS_ROUTE;