const expect = require("chai").expect;
const request = require("request");


describe("Test add two number", () => {

    const url = "http://localhost:8585/add/2/3";

    it("returns status code 200 when calling api", (done) => {
        request(url, (err, response, body) => {
            //if the response.statusCode == 200
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("returns a number as the result of request", (done) => {
        request(url, (err, response, body) => {
            //if the body.result is a number
            body = JSON.parse(body);
            expect(body.result).to.be.a("number");
            done();
        });
    });

    it("returns 5 as the result of test", (done) => {
        request(url, (err, response, body) => {
            //if the body.result == 5
            body = JSON.parse(body);
            expect(body.result).to.equal(5);
            done();
        });
    });

});

describe("Test add two string", () => {
    const url = "http://localhost:8585/add/a/b";

    it("returns status code 400 when calling api", (done) => {
        request(url, (err, response, body) => {
            //if the response.statusCode == 200
            expect(response.statusCode).to.equal(400);
            done();
        });
    });

    it("returns the right error message", (done) => {
        request(url, (err, response, body) => {
            //if the body.error == 'bad input, the input should be two numbers'
            body = JSON.parse(body);
            expect(body.error).to.equal('bad input, the input should be two numbers');
            done();
        });
    });



})

describe("Test add one string and one number", () => {
    const url = "http://localhost:8585/add/a/2";

    it("returns status code 400 when calling api", (done) => {
        request(url, (err, response, body) => {
            //if the response.statusCode == 200
            expect(response.statusCode).to.equal(400);
            done();
        });
    });

    it("returns the right error message", (done) => {
        request(url, (err, response, body) => {
            //if the body.error == 'bad input, the input should be two numbers'
            body = JSON.parse(body);
            expect(body.error).to.equal('bad input, the input should be two numbers');
            done();
        });
    });



})

describe("Test add two number with space", () => {

    const url = "http://localhost:8585/add/2  /  3  ";

    it("returns status code 200 when calling api", (done) => {
        request(url, (err, response, body) => {
            //if the response.statusCode == 200
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("returns a number as the result of request", (done) => {
        request(url, (err, response, body) => {
            //if the body.result is a number
            body = JSON.parse(body);
            expect(body.result).to.be.a("number");
            done();
        });
    });

    it("returns 5 as the result of test", (done) => {
        request(url, (err, response, body) => {
            //if the body.result == 5
            body = JSON.parse(body);
            expect(body.result).to.equal(5);
            done();
        });
    });

});
