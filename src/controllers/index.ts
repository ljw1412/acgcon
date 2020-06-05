import userLogin from './user/login'
import { get, set } from './user/local'

export default {
  user: { get, set, login: userLogin }
}
