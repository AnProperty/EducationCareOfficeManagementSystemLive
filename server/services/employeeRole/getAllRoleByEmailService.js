const CreateEmployee = require("../../model/CreateEmployee.model");

exports.getAllRoleByEmailService = async (body) => {
  const employeesInfo = await CreateEmployee.find(body).select("-students");


  return employeesInfo;
};

exports.deleteRoleServices = async (params) => {
  try {
    const employeesInfo = await CreateEmployee.deleteOne(params)
      if (result.nModified === 0) {
          throw new CustomError('No document found or course was not in the cart.', 404);
      } else {
          let cart = await Cart.findOne({ userId }).populate("courses");
          return cart;
      }
  } catch (error) {
      throw error;
  }

};