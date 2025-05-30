import Book from "../models/book.model.js";

const BOOK_API_ENDPOINTS = {

    GET_BOOK: async (request, response, next) => { 

        try {
            
            const books = await Book.find();

            return response.status(200).message({ message: "Books fetched successfully !", data: [...books] });

        } catch (error) { next(error); };
    },

    CREATE_BOOK: async (request, response, next) => { 

        const requiredFeilds = ["title", "author", "price", "imgUrl"];

        requiredFeilds.forEach((Feild) => {

            if (!request.body[Feild]) { return response.status(400).json({ message: `The '${ Feild } Feild is required !'` }); }
        });

        try {
            
            const new_Book = new Book({ ...request.body });

            await new_Book.save();

            return response.status(200).json({ message: "New book added successfully", data: { ...new_Book } });

        } catch (error) { next(error); };
    },

    UPDATE_BOOK: async (request, response, next) => { 

        
        let id = request.params.id;
        
        if (!Book.findById(id)) { return response.status(400).json({ message: `Book ${ id } does not exist !` }); }
        
        let Feilds_to_update = 0;

        const requiredFeilds = ["title", "author", "price", "imgUrl"];

        requiredFeilds.forEach((feild) => {

            Feilds_to_update = !request.body[feild] ? Feilds_to_update ++ : Feilds_to_update;
        });

        if (Feilds_to_update === requiredFeilds.length) { return response.status(400).json({ message: "No feilds to update !" }); }

        try {


            return response.status(200).json({ message: "Book updated successfully" });

        } catch (error) { next(error); };
    },

    DELETE_BOOK: async (request, response, next) => {  },

};

export default BOOK_API_ENDPOINTS;