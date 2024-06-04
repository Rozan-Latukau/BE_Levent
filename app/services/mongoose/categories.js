const categories = require("../../api/v1/categories/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllCategories = async (req) => {
  const result = await categories.find({ organizer: req.user.organizer });

  return result;
};

const createCategories = async (req) => {
  const { name } = req.body;

  const check = await categories.findOne({ name, organizer: req.user.organizer });

  if (check) throw new BadRequestError("Nama duplikat");

  const result = await categories.create({ name, organizer: req.user.organizer });

  return result;
};

const getOneCategories = async (req) => {
  const { id } = req.params;

  const result = await categories.findOne({ _id: id, organizer: req.user.organizer });

  if (!result) throw new BadRequestError(`Id Category tidak ditemukan, ${id}`);

  // if (!result) {
  //     return result.status(400).json({
  //         message: "Id Category not found"
  //     });
  // }

  return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const check = await categories.findOne({
    name,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError("kategori nama duplikat");

  const result = await categories.findOneAndUpdate({ _id: id }, { name }, { new: true, runValidators: true });

  if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

  return result;
};

const destroyCategories = async (req) => {
  const { id } = req.params;

  const result = await categories.findByIdAndDelete({ _id: id, organizer: req.user.organizer });

  if (!result) throw new NotFoundError(`Tidak ada id, ${id}`);

  return result;
};

const checkingCategories = async (id) => {
  const result = await categories.findOne({ _id: id });
  if (!result) throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`);
  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  destroyCategories,
  checkingCategories,
};
