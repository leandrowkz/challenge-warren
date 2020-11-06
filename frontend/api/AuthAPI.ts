import BaseAPI from '@/api/BaseAPI'

export default class AuthAPI extends BaseAPI {
  // Register a new user
  signUp(user: any) {
    return this.http.post('/auth/signup', user)
  }
}
