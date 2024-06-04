const { StatusCodes } = require('http-status-codes');
const { getAllCategories, createCategories, getOneCategories, updateCategories, destroyCategories } = require('../../../services/mongoose/categories');

const create = async(req, res, next) => {
    try {
        const result = await createCategories(req);
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const index = async(req, res, next) => {
    try {
        const result = await getAllCategories(req);
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const findOne = async(req, res, next) => {
    try {
        const result = await getOneCategories(req);

        res.status(StatusCodes.OK).json({
            data: result,
        })

        // const { id } = req.params;
        // const result = await categories.findOne({ _id: id });

        // if (!result) {
        //     return res.status(404).json({
        //         message: "Id Category not found"
        //     });
        // }

        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

const update = async(req, res, next) => {
    try {
        // const { id } = req.params;
        // const { name } = req.body;

        const result = await updateCategories(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });

    } catch (error) {
        next(error);
    }
}

const destroy = async(req, res, next) => {
    try {
        const result = await destroyCategories(req);
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create,
    index,
    findOne,
    update,
    destroy,
};