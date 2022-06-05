import ITokenDecoded from '../interfaces/TokenDecoded.interface';
import User from '../models/User.models';

const extractUser = async (tokenDecoded: ITokenDecoded) => {
  const user = await User.findOne({ email: tokenDecoded.email });
  if (user) { return user.id; }
  return null;
};

export default extractUser;
