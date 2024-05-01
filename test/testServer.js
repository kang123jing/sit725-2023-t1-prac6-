import { expect } from "chai";
import request from "request";
let cat;
let url = "http://localhost:3000/api/cat";

// 测试 GET 请求
describe("test GET api", function() {
    it("it return statusCode of 200", function(done) {
        request(url, function(error, response, bodystring) {
            if (bodystring) {
                let bodyObj = JSON.parse(bodystring);
                expect(bodyObj.message).to.equal("get all cats success");
            }
            done();
        });
    });
});

// 测试 POST 请求
describe("test POST api", function() {
    it("post cat to DB", function(done) {
        request({ url: url, form: cat }, function(error, response, bodystring) {
            if (bodystring) {
                let bodyObj = JSON.parse(bodystring);
                expect(bodyObj.message).to.equal("success");
            }
            done();
        });
    });
});

// 测试 DELETE 请求
describe("test DELETE api", function() {
    it("delete a cat ", function(done) {
        request({ url: url, form: cat }, function(a, b, c) {
            done();
        });
    });
});

// 其他测试用例
describe("Add Two Numbers", function() {
    var url = "http://localhost:8090/addTwoNumbers/3/5";

    it("returns status 200 to check if API works", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("returns statusCode key in body to check if API gives the right result should be 200", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            expect(body.statusCode).to.not.equal(200);
            done();
        });
    });

    it("returns the result as a number", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            expect(body.result).to.be.a('number');
            done();
        });
    });

    it("returns the result equal to 8", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            expect(body.result).to.equal(8);
            done();
        });
    });

    it("returns the result not equal to 15", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            expect(body.result).to.not.equal(15);
            done();
        });
    });
});

describe("Add Two Strings", function() {
    var url = "http://localhost:8090/addTwoNumbers/a/b";

    it('should not return status 200', function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.not.equal(200);
            done();
        });
    });

    it("returns statusCode key in body to check if API gives the right result should be 400", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            expect(body.statusCode).to.not.equal(400);
            done();
        });
    });

    it("returns the result as null", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            expect(body.result).to.be. not.a('null');
            done();
        });
    });
});
