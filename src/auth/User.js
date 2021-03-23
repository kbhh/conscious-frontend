import JwtDecode from 'jwt-decode'

export default class User {
  static decode(token) {
    try {
      let obj = JwtDecode(token)
      return new User(obj)
    } catch (err) {
      console.log(`Decoding failed ${err}`);
      return
    }
  }
  constructor (decodedObj) {
    this.id = decodedObj._id; // eslint-disable-line camelcase
    this.iat = decodedObj.iat
  }

  get isAdmin () {
    // return this.admin
    return this.id
  }
}
