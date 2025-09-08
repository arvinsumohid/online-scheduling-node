jest.mock("@src/database/models/user.model");
jest.mock("@src/database/repositories/appointment.repository");

const appointmentRepository = require("@src/database/repositories/appointment.repository");
const appointmentService = require("@src/services/appointment.service");
const { GET_APPOINTMENT_BY_ID_RESULT, APPOINTMENT_DATA } = require("./mock-data/appointment");

describe("AppointmentService.getAppointmentById", () => {
    beforeEach(() => {
        jest.resetAllMocks();
      });

    it("empty return not found", async () => {
        jest.spyOn(appointmentRepository, "findOne").mockResolvedValue(null);
        await expect(appointmentService.getAppointmentById("1")).rejects.toMatchObject({
            statusCode: 404,
            name: 'Not Found',
            message: 'Appointment not found'
          });
    });

    it("should get appointment by id", async () => {
        jest.spyOn(appointmentRepository, "findOne").mockResolvedValue(GET_APPOINTMENT_BY_ID_RESULT);
        const appointment = await appointmentService.getAppointmentById(GET_APPOINTMENT_BY_ID_RESULT._id);
        expect(appointment).toBeDefined();
        expect(appointment).toEqual(GET_APPOINTMENT_BY_ID_RESULT);
    });
});

describe("AppointmentService.createAppointment", () => {
    beforeEach(() => {
        jest.resetAllMocks();
      });

    it("find existing appointment", async () => {
        jest.spyOn(appointmentRepository, "findOne").mockResolvedValue(GET_APPOINTMENT_BY_ID_RESULT);
        await expect(appointmentService.createAppointment(GET_APPOINTMENT_BY_ID_RESULT)).rejects.toMatchObject({
            statusCode: 400,
            name: 'Bad Request',
            message: 'Appointment is not available'
          });
    });

    it("should create appointment", async () => {
        jest.spyOn(appointmentRepository, "findOne").mockResolvedValue(null);
        jest.spyOn(appointmentRepository, "create").mockResolvedValue(GET_APPOINTMENT_BY_ID_RESULT);
        const appointment = await appointmentService.createAppointment(GET_APPOINTMENT_BY_ID_RESULT);
        expect(appointment).toBeDefined();
        expect(appointment).toEqual(GET_APPOINTMENT_BY_ID_RESULT);
    });
});

describe("AppointmentService.updateAppointmentStatus", () => {
    beforeEach(() => {
        jest.resetAllMocks();
      });

    it("appointment not found", async () => {
        jest.spyOn(appointmentRepository, "findOne").mockResolvedValue(null);
        await expect(appointmentService.updateAppointmentStatus(GET_APPOINTMENT_BY_ID_RESULT._id, APPOINTMENT_DATA)).rejects.toMatchObject({
            statusCode: 404,
            name: 'Not Found',
            message: 'Appointment not found'
          });
    });

    it("should update appointment status", async () => {
        jest.spyOn(appointmentRepository, "findOne").mockResolvedValue(GET_APPOINTMENT_BY_ID_RESULT);
        jest.spyOn(appointmentRepository, "updateOne").mockResolvedValue(GET_APPOINTMENT_BY_ID_RESULT);
        const appointment = await appointmentService.updateAppointmentStatus(GET_APPOINTMENT_BY_ID_RESULT._id, {});
        expect(appointment).toBeDefined();
        expect(appointment).toEqual(GET_APPOINTMENT_BY_ID_RESULT);
    });
});

describe("AppointmentService.rescheduleAppointment", () => {
    beforeEach(() => {
        jest.resetAllMocks();
      });

    it("appointment not found", async () => {
        jest.spyOn(appointmentRepository, "findOne").mockResolvedValue(null);
        await expect(appointmentService.rescheduleAppointment(GET_APPOINTMENT_BY_ID_RESULT._id, APPOINTMENT_DATA)).rejects.toMatchObject({
            statusCode: 404,
            name: 'Not Found',
            message: 'Appointment not found'
          });
    });

    it("appointment not available", async () => {
        jest.spyOn(appointmentRepository, "findOne")
            .mockResolvedValueOnce(GET_APPOINTMENT_BY_ID_RESULT)
            .mockResolvedValueOnce(GET_APPOINTMENT_BY_ID_RESULT);
        await expect(appointmentService.rescheduleAppointment(GET_APPOINTMENT_BY_ID_RESULT._id, APPOINTMENT_DATA)).rejects.toMatchObject({
            statusCode: 400,
            name: 'Bad Request',
            message: 'Appointment is not available'
          });
    });

    it("should reschedule appointment", async () => {
        jest.spyOn(appointmentRepository, "findOne")
            .mockResolvedValueOnce(GET_APPOINTMENT_BY_ID_RESULT)
            .mockResolvedValueOnce(null);
        jest.spyOn(appointmentRepository, "updateOne").mockResolvedValue(GET_APPOINTMENT_BY_ID_RESULT);
        const appointment = await appointmentService.rescheduleAppointment(GET_APPOINTMENT_BY_ID_RESULT._id, {});
        expect(appointment).toBeDefined();
        expect(appointment).toEqual(GET_APPOINTMENT_BY_ID_RESULT);
    });
})
