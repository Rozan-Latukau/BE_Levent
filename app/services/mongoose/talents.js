const Talents = require("../../api/v1/talents/model");

const { checkingImages } = require("./images");

const { BadRequestError, NotFoundError } = require("../../errors");

const getAllTalents = async (req) => {
  const { keyword } = req.query;

  let condition = { organizer: req.user.organizer };

  if (keyword) {
    condition = { ...condition, name: { $regex: keyword, $options: "i" } };
  }
  const result = await Talents.find(condition)
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");

  return result;
};
const createTalents = async (req) => {
  const { name, role, image } = req.body;

  await checkingImages(image);

  const check = await Talents.findOne({ name, organizer: req.user.organizer });

  if (check) throw new BadRequestError("Nama Duplikat");

  const result = await Talents.create({ name, role, image, organizer: req.user.organizer });

  return result;
};

const getOneTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({ _id: id, organizer: req.user.organizer })
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");

  if (!result) throw new NotFoundError(`id Talents tidak ditemukan, ${id}`);

  return result;
};

const updateTalents = async (req) => {
  const { id } = req.params;
  const { name, role, image } = req.body;

  await checkingImages(image);

  const check = await Talents.findOne({
    name,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError("Item duplikat");

  const result = await Talents.findOneAndUpdate({ _id: id }, { name, role, image, organizer: req.user.organizer }, { new: true, runValidators: true });

  if (!result) throw new NotFoundError(`Tidak ada Talent dengan : ${id}`);

  return result;
};

const destroyTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findByIdAndDelete({ _id: id, organizer: req.user.organizer });

  if (!result) throw new NotFoundError(`Tidak ada Talent dengan id, ${id}`);

  return result;
};

const checkingTalents = async (id) => {
  const result = await Talents.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada item dengan id :  ${id}`);

  return result;
};

module.exports = {
  getAllTalents,
  createTalents,
  getOneTalents,
  updateTalents,
  destroyTalents,
  checkingTalents,
};