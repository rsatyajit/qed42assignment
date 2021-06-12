const csv = require('csvtojson');
const User = require('../model/user.model');
const Project = require('../model/project.model');

class ScraperService {
    constructor() { }

    importHandler(config) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.cleanUp();
                //import csv to JSON
                const employeeDetails = await csv().fromFile(config.path);
                /**
                 *  build data for project,user and miising reports
                 */
                let projectEntries = [];
                let userEntries = [];
                let errorReport = [];
                for (let i = 0; i < employeeDetails.length; i++) {
                    /**
                     * Project data filtered removing duplicate project name
                     * as same project can be assigned to multiple employee
                     */
                    if (employeeDetails[i].Project) {
                        if ((projectEntries.findIndex(item => item.project === employeeDetails[i].Project)) === -1)
                            projectEntries.push({ "project": employeeDetails[i].Project })
                    }
                    else {
                        errorReport = this.errorReportHandler(errorReport, "Project", i)
                    }

                    /**
                    * User data filtered removing duplicate user email
                    * as same project can be assigned to multiple employee 
                    */
                    if (employeeDetails[i].Email) {
                        let userObj = {};
                        if ((userEntries.findIndex(item => item.email === employeeDetails[i].Email)) === -1) {
                            userObj.email = employeeDetails[i].Email;
                            if (employeeDetails[i].Name) {
                                userObj.name = employeeDetails[i].Name;
                            } else {
                                errorReport = this.errorReportHandler(errorReport, "Name", i)
                            }
                            userEntries.push(userObj)
                        }
                    }
                    else {
                        errorReport = this.errorReportHandler(errorReport, "Email", i)
                    }

                }

                /**
                 * All unique projects have been created in one shot
                 */
                let projectEntered = await Project.insertMany(projectEntries);
                projectEntered = JSON.parse(JSON.stringify(projectEntered));

                /**
                 *  Assign all the project ids to the employees
                 * 
                 */
                for (let i = 0; i < employeeDetails.length; i++) {
                    if (employeeDetails[i].Email) {
                        let userIndex = userEntries.findIndex((item) => item.email === employeeDetails[i].Email);
                        let project = projectEntered.find((item) => item.project === employeeDetails[i].Project);
                        if (project) {
                            if (!userEntries[userIndex].project) userEntries[userIndex].project = [];
                            userEntries[userIndex].project.push(project._id);
                        }
                    }
                }
                /** insert ALL users with their projects
                 * And eliminate users who dont have email id
                 */
                await User.insertMany(userEntries);
                /**
                 * generated the missing reports of CSV and responded back to ADMIN
                 */
                resolve({ missing: errorReport });

            } catch (err) {
                (err) ? reject(err) : resolve();
            }

        })
    }


    //clean up before inserting data
    cleanUp() {
        return new Promise(async (resolve, reject) => {
            try {
                await Project.deleteMany();
                await User.deleteMany();
                resolve();
            } catch (err) {
                reject(err)
            }
        })
    }

    //Missing report Handler Logic
    errorReportHandler(errorReport, attr, i) {
        let index = errorReport.findIndex((item) => item.row === i + 1);
        if (index === -1) {
            errorReport.push({ "row": i + 1, "missing": [attr] })
        } else {
            errorReport[index].missing.push(attr)
        }
        return errorReport;
    }

}

module.exports = ScraperService;