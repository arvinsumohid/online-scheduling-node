const { GET_AUTH0_USER_RESULT, AUTH_DATA, AUTH0_USERINFO } = require("./mock-data/auth");
const { GET_USER_BY_ID_RESULT } = require('./mock-data/user');

jest.mock("axios");
jest.mock("../src/database/repositories/user.repository");
jest.mock("../src/services/user.service", () => {
  return {
    getUserById: jest.fn(),
    createUser: jest.fn(),
    getUser: jest.fn(),
  }
});
jest.mock("../src/services/auth.service", () => {
  const originalModule = jest.requireActual("../src/services/auth.service");

  return {
    ...originalModule,
    getAuth0User: jest.fn(),
  }
});

const axios = require("axios");
const userService = require("../src/services/user.service");
const authService = require("../src/services/auth.service");
const userRepository = require("../src/database/repositories/user.repository");

describe("AuthService.auth", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("create user if user not found", async () => {
    axios.get.mockResolvedValue(AUTH0_USERINFO);
    jest.spyOn(userRepository, "findOne").mockResolvedValue(null);
    jest.spyOn(userService, "createUser").mockResolvedValue(GET_USER_BY_ID_RESULT);
    jest.spyOn(authService, "getAuth0User").mockResolvedValue(GET_AUTH0_USER_RESULT);
    const result = await authService.auth(AUTH_DATA);

    expect(result).toBeDefined();
    expect(result.user).toBeDefined();
    expect(result.access_token).toBeDefined();
    expect(result.refresh_token).toBeDefined();
    expect(result.expires_in).toBeDefined();
  });

  it("should return success", async () => {
    jest.spyOn(userRepository, "findOne").mockResolvedValue(GET_USER_BY_ID_RESULT);

    const result = await authService.auth(AUTH_DATA);

    expect(result).toBeDefined();
    expect(result.user).toBeDefined();
    expect(result.access_token).toBeDefined();
    expect(result.refresh_token).toBeDefined();
    expect(result.expires_in).toBeDefined();
  });
});