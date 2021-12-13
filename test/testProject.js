const expect = require("chai").expect;
const request = require("request");

const dbo = require('../db/conn');



describe('test get all projects', () => {
    const url = "http://localhost:8585/api/projects"

    //set up clear the db and insert 10 dummy projects
    before((done) => {
        dbo.connect(() => {
            const projectCollection = dbo.getDB().collection("projects");
            //clear the database
            projectCollection.deleteMany({});
            //create 10 dummy projects
            const projects = [];
            for (let i = 1; i < 11; i++) {
                projects.push({
                    projectID: i,
                    title: 'title ' + i,
                    info: 'info ' + i,
                    img: 'img ' + i
                })
            }
            projectCollection.insertMany(projects,()=>{
                dbo.disconnect();
                done();
            });
        });

    });

    it("returns status code 200 when calling api", (done) => {
        request(url, (err, response, body) => {
            //if the response.statusCode == 200
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("returns an array as the body of request", (done) => {
        request(url, (err, response, body) => {
            //if the body.result is a number
            body = JSON.parse(body);
            expect(body).to.be.a("array");
            done();
        });
    });

    it("returns exactly 10 projects as body of the response", (done) => {
        request(url, (err, response, body) => {
            //if the body.result is a number
            body = JSON.parse(body);
            expect(body.length).to.equal(10);
            done();
        });
    });


    //clean the collection by removeing all the dummy data
    after(() => {
        dbo.connect(() => {
            const projectCollection = dbo.getDB().collection("projects");
            //clear the database
            projectCollection.deleteMany({}, () => {
                dbo.disconnect();
            });
        });
    });

});