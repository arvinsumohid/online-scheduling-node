const USER_DATA = {
    "name": "test",
    "first_name": "test",
    "last_name": "test",
    "auth_id": "sample-auth-id",
    "email": "sample@test.com"
}

const GET_USER_BY_ID_RESULT = {
    "_id": "68b6e1cd59841c90604598df",
    ...USER_DATA
}

const CREATE_USER_RESULT = {
    "_id": "68b6e1cd59841c90604598df",
    ...USER_DATA,
    "created_at": new Date(),
    "updated_at": new Date(),
    "deleted_at": null,
    "__v": 0
}

module.exports = {
    GET_USER_BY_ID_RESULT,
    CREATE_USER_RESULT,
    USER_DATA
}