const GET_AUTH0_USER_RESULT = {
    "name": "test",
    "first_name": "test",
    "last_name": "test",
    "auth_id": "sample-auth-id",
    "email": "sample@test.com",
    "_id": "68b6e1cd59841c90604598df",
    "created_at": "2025-09-02T12:23:41.516Z",
    "updated_at": "2025-09-02T12:23:41.516Z",
    "__v": 0
}

const AUTH_DATA = {
    auth: {
      token: "test",
      refresh_token: "test",
      payload: {
        sub: "test",
        exp: 1234567890
      }
    }
}

const AUTH0_USERINFO = {
  data: {
    "sub": "sample-auth-id",
    "given_name": "tomo",
    "nickname": "ick",
    "name": "tomo",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocIEOlyDIzGr22LZyQGZ-O-FU98yR7hBwhzq-lJRipXFm36wask=s96-c",
    "updated_at": "2025-09-02T12:13:10.072Z",
    "email": "sample@test.com",
    "email_verified": true
  }
}

module.exports = {
    GET_AUTH0_USER_RESULT,
    AUTH_DATA,
    AUTH0_USERINFO
}