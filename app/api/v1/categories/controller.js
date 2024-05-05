const categories = require('./model');

const create = async(req, res, next) => {
    try {
        const { name } = req.body;
        const result = await categories.create({ name });
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const index = async(req, res, next) => {
    try {
        const result = await categories.find();
        res.status(201).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const findOne = async(req, res, next) => {
    try {
        const { id } = req.params;
        const result = await categories.findOne({ _id: id });

        if (!result) {
            return res.status(404).json({
                message: "Id Category not found"
            });
        }

        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

const update = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const result = await categories.findOneAndUpdate({ _id: id }, { name }, { new: true, runValidators: true });

        res.status(200).json({
            data: result,
        });

    } catch (error) {
        next(error);
    }
}

const destroy = async(req, res, next) => {
    try {
        const { id } = req.params;
        const result = await categories.findByIdAndDelete(id);

        res.status(200).json({
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