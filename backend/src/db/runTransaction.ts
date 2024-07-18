import mongoose, { ClientSession } from "mongoose";

type TransactionCallback = (session: ClientSession) => Promise<void>;

export const runTransaction = async (cb: TransactionCallback) => {
  const session: ClientSession = await mongoose.startSession();

  session.startTransaction();

  try {
    await cb(session);
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};
