export default class BaseAPI {
  protected http: any

  constructor(axios: any) {
    this.http = axios
  }
}
