const APPOINTMENT_DATA = {
    "date": "2025-09-08",
    "time": "10:00",
    "dentist": "68b6e1cd59841c90604598df",
    "patient": "68b6e1cd59841c90604598df",
    "status": "PENDING"
}

const GET_APPOINTMENT_BY_ID_RESULT = {
    "_id": "68b6e1cd59841c90604598df",
    ...APPOINTMENT_DATA,
    "created_at": new Date(),
    "updated_at": new Date(),
    "deleted_at": null,
    "__v": 0
};

module.exports = {
    GET_APPOINTMENT_BY_ID_RESULT,
    APPOINTMENT_DATA
};
