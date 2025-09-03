jest.mock("../src/database/models/user.model");
jest.mock("../src/database/repositories/user.repository");

const userRepository = require("../src/database/repositories/user.repository");
const userService = require("../src/services/user.service");
const { USER_DATA, CREATE_USER_RESULT, GET_USER_BY_ID_RESULT } = require("./mock-data/user");

describe("UserService.createUser", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should create a user", async () => {
    jest.spyOn(userRepository, "create").mockResolvedValue(CREATE_USER_RESULT);

    const result = await userService.createUser(USER_DATA);
    expect(result).toBeDefined();
    expect(result).toEqual(CREATE_USER_RESULT);
  });
});

describe("UserService.getUserById", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should get a user by id", async () => {
    jest.spyOn(userRepository, "findOne").mockResolvedValue(GET_USER_BY_ID_RESULT);

    const result = await userService.getUserById(GET_USER_BY_ID_RESULT._id);
    expect(result).toBeDefined();
    expect(result).toEqual(GET_USER_BY_ID_RESULT);
  });

  it("should throw 404 if user not found", async () => {
    jest.spyOn(userRepository, "findOne").mockResolvedValue(null);

    await expect(userService.getUserById(GET_USER_BY_ID_RESULT._id)).rejects.toMatchObject({
      statusCode: 404,
      name: 'Not Found',
      message: 'User not found'
    })  ;
  });
});

describe("UserService.getUser", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("empty list", async () => {
    jest.spyOn(userRepository, "find").mockResolvedValue(null);

    const result = await userService.getUser();
    expect(result).toBeDefined();
    expect(result).toEqual({
      users: [],
      page: 1,
      limit: 10,
      total: 0
    });
  });

  it("should get a user list", async () => {
    jest.spyOn(userRepository, "find").mockResolvedValue([GET_USER_BY_ID_RESULT]);
    jest.spyOn(userRepository, 'countDocuments').mockResolvedValue(1);

    const result = await userService.getUser();
    expect(result).toBeDefined();
    expect(result).toEqual({
      users: [GET_USER_BY_ID_RESULT],
      page: 1,
      limit: 10,
      total: 1
    });
  });
});

