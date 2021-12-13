const expect = require("chai").expect;
const request = require("request");

describe("add two number", () => {
    const url = "http://localhost:8585/addNumber/2/3";

    it("requests return status code 200", (done) => {
        request(url, (err, res, body) => {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    it("requests returns status code 200 within the message body", (done) => {
        request(url, (err, res, body) => {
            body = JSON.parse(body);
            expect(body.statusCode).to.equal(200);
            done();
        });
    });

    it("requests returns a number as the result in the body", (done) => {
        request(url, (err, res, body) => {
            body = JSON.parse(body);
            expect(body.result).to.be.a('number');
            done();
        });
    });

    it("requests returns 5 as the result in the body", (done) => {
        request(url, (err, res, body) => {
            body = JSON.parse(body);
            expect(body.result).to.equal(5);
            done();
        });
    });

});

describe("add two string", () => {
    const url = "http://localhost:8585/addNumber/a/b";

    it("should not retunr 200 as status code", (done) => {
        request(url, (err, res, body) => {
            expect(res.statusCode).to.not.equal(200);
            done();
        });
    });

    it("should return correct error message", (done) => {
        request(url, (err, res, body) => {
            body = JSON.parse(body);
            expect(body.err).to.equal('Both input should be a number');
            done();
        });
    });

});

describe("add one number and one string", () => {
    const url = "http://localhost:8585/addNumber/a/2";

    it("should not retunr 200 as status code", (done) => {
        request(url, (err, res, body) => {
            expect(res.statusCode).to.not.equal(200);
            done();
        });
    });

    it("should return correct error message", (done) => {
        request(url, (err, res, body) => {
            body = JSON.parse(body);
            expect(body.err).to.equal('Both input should be a number');
            done();
        });
    });

});

describe("add two number where input has extra space", () => {

    const url = "http://localhost:8585/addNumber/2  /3";

    it("requests return status code 200", (done) => {
        request(url, (err, res, body) => {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    it("requests returns status code 200 within the message body", (done) => {
        request(url, (err, res, body) => {
            body = JSON.parse(body);
            expect(body.statusCode).to.equal(200);
            done();
        });
    });

    it("requests returns a number as the result in the body", (done) => {
        request(url, (err, res, body) => {
            body = JSON.parse(body);
            expect(body.result).to.be.a('number');
            done();
        });
    });

    it("requests returns 5 as the result in the body", (done) => {
        request(url, (err, res, body) => {
            body = JSON.parse(body);
            expect(body.result).to.equal(5);
            done();
        });
    });


});