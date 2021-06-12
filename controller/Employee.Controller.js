const employeeService = require("../service/Employee.Service");
let employee = new employeeService();

class EmployeeController {
    constructor() { }

    async importHandler(request, response) {
        try {
            if (!request.file) {
                return response.status(404).send({
                    _status: "validation error",
                    _status_code: 404,
                    _message: "file not found"
                });

            }
            let employeeDetails = await employee.importHandler(request.file);
            return response.status(200).send({
                _status: "SUCCESS",
                _status_code: 200,
                _message: `Successfully imported the details in the DB`,
                data: employeeDetails
            });
        } catch (err) {
            return response.send({
                _status: "ERROR",
                _status_code: 500,
                _message: err.message
            })
        }
    }

}

module.exports = EmployeeController;