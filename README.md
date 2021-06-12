# qed42assignment

STEPS TO RUN:

1) Run the command to clone from git  : git clone https://github.com/rsatyajit/qed42assignment.git
2) cd qed42assignment 
3) git checkout Dev
4) npm i && npm start

STEPS TO USE THE API:

API 1 : TO SCRAP THE HTML OF ANY URL
POST http://localhost:3000/api/v1/scrape

BODY :
{
	"url" : "https://www.qed42.com/blog/javascript"
}

RESPONSE : 
{
    "_status": "SUCCESS",
    "_status_code": 200,
    "_message": "Scraped into ./scraps/website.html in server"
}

API 2 : TO GET THE URL FROM SEARCHED KEYWORD

GET http://localhost:3000/api/v1/scrape/url/get?keyword=generators

QUERY PARAMS : 
{
    "keyword":"generators"
}

RESPONSE : 
{
    "_status": "SUCCESS",
    "_status_code": 200,
    "_message": "Qed links fetched successfully",
    "data": [
        "https://www.qed42.com/blog/implementing-iterators-and-generators-javascript"
    ]
}

API 3 : TO SAVE ALL EMPLOYEE DETAILS IN THE DB FROM CSV file

POST http://localhost:3000/api/v1/employee

FORM-DATA BODY
file : <FILE OBJECT>

RESPONSE : 
{
    "_status": "SUCCESS",
    "_status_code": 200,
    "_message": "Successfully imported the details in the DB",
    "data": {
        "missing": [
            {
                "row": 3,
                "missing": [
                    "Project",
                    "Email"
                ]
            },
            {
                "row": 4,
                "missing": [
                    "Name"
                ]
            }
        ]
    }
}