import User from "../models/user.model.js";

export async function getUsersForSidebar(req, res) {
  // try {
  //   const loggedInUserId = req.user._id;
  //   const filteredUsers = await User.find({
  //     _id: { $ne: loggedInUserId },
  //   }).select("-password");
  //   res.status(200).json(filteredUsers);
  // } catch (error) {
  //   console.log("error in getUserForSidebar : ", error);
  //   res.status(500).json({ success: false, error: "Internal Server Error" });
  // }
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
