import ErrorHandler from "../middleware/Error.js";
import { ConnectionSchema } from "../models/connectionModel.js";
import { MessageSchema } from "../models/messageModal.js";

export const establishConnnection = async (req, res, next) => {
  try {
    const sessionUserId = req.user._id;
    const sessionFriendId = req.params.userId;

    const myConversation = await ConnectionSchema.find({
      $and: [
        { members: { $in: sessionUserId } },
        { members: { $in: sessionFriendId } },
      ],
    });
    if (myConversation.length > 0) {
      const deleteUser = await ConnectionSchema.findById(myConversation[0]._id);
      deleteUser.deleteOne();
      return res.json({ message: "UnFriend" });
    }

    const newConnection = new ConnectionSchema({
      members: [sessionUserId, sessionFriendId],
    });
    const saveConverstion = await newConnection.save();
    res.json({
      message: `Added`,
      success: true,
      saveConverstion,
    });
  } catch (error) {
    next(error);
  }
};
export const checkIfFriend = async (req, res, next) => {
  try {
    const sessionUserId = req.user._id;
    const sessionFriendId = req.params.userId;

    const myConversation = await ConnectionSchema.find({
      $and: [
        { members: { $in: sessionUserId } },
        { members: { $in: sessionFriendId } },
      ],
    });
    if (myConversation.length > 0)
      return res.json({ message: "Already added", added: true });
    else return res.json({ message: "Not added", added: false });
  } catch (error) {
    next(error);
  }
};

export const getMyConnection = async (req, res, next) => {
  try {
    const myConversation = await ConnectionSchema.find({
      members: { $in: [req.user._id] },
    });
    res.status(200).json({
      myId: req.user._id,
      data: myConversation,
    });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const myId = req.user._id;
    const { conversationId, text } = req.body;
    const newMessage = new MessageSchema({
      conversationId,
      sender: myId,
      text,
    });
    const savedMessage = await newMessage.save();
    res.json({ message: "Message Sent", success: true, savedMessage });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  const conversationId = req.params.id;

  try {
    const getMessage = await MessageSchema.find({ conversationId });
    res.json({
      message: "Fetched",
      success: true,
      currentUser: req.user._id,
      getMessage,
    });
  } catch (error) {
    next(error);
  }
};
