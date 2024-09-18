const { loginStaff } = require('../../controller/Staff/login');
const Staff = require('../../model/Staff/Staff');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../../utils/generateToken');
jest.mock('../../model/Staff/Staff');
jest.mock('bcryptjs');
jest.mock('../../utils/generateToken');

const req = {
    body: {
        staffID: "fake_staffID",
        password: "fake_password"
    }
};

const res = {
    status: jest.fn().mockReturnThis(),
    header: jest.fn().mockReturnThis(),
    json: jest.fn(),
};

const next = jest.fn();

describe('loginStaff controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call next with a 400 error if staff does not exist', async () => {
        Staff.findOne.mockResolvedValueOnce(null);  // No staff found

        await loginStaff(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.objectContaining({ message: 'Invalid Credentials', statusCode: 400 }));
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should call next with a 401 error if fields are missing', async () => {
        const reqWithMissingFields = { body: { staffID: "", password: "" } };  // Missing password

        await loginStaff(reqWithMissingFields, res, next);

        expect(next).toHaveBeenCalledWith(expect.objectContaining({ message: 'fields can not be blank', statusCode: 401 }));
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should send a status code of 202 if login is successful', async () => {
        Staff.findOne.mockResolvedValueOnce({
            _id: 'fake_staffID',
            staffID: 'fake_staffID',
            password: await bcrypt.hash('fake_password', 10),
        });
        bcrypt.compare.mockResolvedValueOnce(true);  // Password match

        await loginStaff(req, res, next);

        expect(res.status).toHaveBeenCalledWith(202);
        expect(res.header).toHaveBeenCalledWith('Authorization', expect.any(String));
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ staffID: 'fake_staffID' }));
        expect(next).not.toHaveBeenCalled();
    });

    it('should call next with a 500 error on internal failure', async () => {
        const error = new Error('Internal error');
        Staff.findOne.mockRejectedValueOnce(error);  // Simulate an internal error

        await loginStaff(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.objectContaining({ message: 'server error', statusCode: 500 }));
    });
});
