import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

// export const UserModel = mongoose.model('User', UserSchema);
export const UserModel = mongoose.model('User', UserSchema, 'myusers');
// 세번째 인자에 스트링으로 추가하면 해당 명칭으로된 컬렉션을 추가할 수 있음!

// some actions, which are going to be used in controller
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    'authentication.sessionToken': sessionToken,
  });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
// toObject() 는 Mongoose 문서 객체를 일반 JavaScript 객체로 변환하는 역할
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
