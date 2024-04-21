import { expect } from 'chai';
import request from 'request';

describe("Add Two Numbers", function () {
  const numericUrl = "http://localhost:8080/addTwoNumbers/3/5";

  it("returns status 200 to check if API works", function (done) {
    request(numericUrl, function (error, response, body) {
      if (error) {
        return done(error); // 处理请求错误
      }
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it("returns statusCode key in body to check if API gives the right result (should be 200)", function (done) {
    request(numericUrl, function (error, response, body) {
      if (error) {
        return done(error); // 处理请求错误
      }
  
      try {
        body = JSON.parse(body); // 解析响应体为 JSON 对象
        expect(body).to.be.an('object'); // 断言响应体是一个对象
        expect(body.statusCode).to.not.equal(200); // 断言状态码为 200
        done(); // 测试完成，调用 done() 表示成功
      } catch (e) {
        done(e); // 处理解析 JSON 错误，调用 done() 表示失败
      }
    });
  });
  
  it("returns the result as a number", function (done) {
    request(numericUrl, function (error, response, body) {
      if (error) {
        return done(error); // 处理请求错误
      }
      try {
        const responseBody = JSON.parse(body);
        expect(responseBody.result).to.be.a('number');
        done();
      } catch (e) {
        done(e); // 处理解析 JSON 错误
      }
    });
  });

  it("returns the result equal to 8", function (done) {
    request(numericUrl, function (error, response, body) {
      if (error) {
        return done(error); // 处理请求错误
      }
      try {
        const responseBody = JSON.parse(body);
        expect(responseBody.result).to.equal(8);
        done();
      } catch (e) {
        done(e); // 处理解析 JSON 错误
      }
    });
  });

  it("returns the result not equal to 15", function (done) {
    request(numericUrl, function (error, response, body) {
      if (error) {
        return done(error); // 处理请求错误
      }
      try {
        const responseBody = JSON.parse(body);
        expect(responseBody.result).to.not.equal(15);
        done();
      } catch (e) {
        done(e); // 处理解析 JSON 错误
      }
    });
  });
});

describe("Add Two Strings", function () {
  const stringUrl = "http://localhost:8080/addTwoNumbers/a/b";

  it('should not return status 200', function (done) {
    request(stringUrl, function (error, response, body) {
      if (error) {
        return done(error); // 处理请求错误
      }
      expect(response.statusCode).to.not.equal(200);
      done();
    });
  });

  it("returns statusCode key in body to check if API gives the right result (should be 400)", function (done) {
    request(stringUrl, function (error, response, body) {
      if (error) {
        return done(error); // 处理请求错误
      }
      try {
        const responseBody = JSON.parse(body);
        expect(responseBody.statusCode).to.not.equal(400); // 断言状态码为 400
        done();
      } catch (e) {
        done(e); // 处理解析 JSON 错误
      }
    });
  });

  it("returns the result as null", function (done) {
    request(stringUrl, function (error, response, body) {
      if (error) {
        return done(error); // 处理请求错误
      }
      try {
        const responseBody = JSON.parse(body);
        expect(responseBody.result).to.not.null; // 断言结果为 null
        done();
      } catch (e) {
        done(e); // 处理解析 JSON 错误
      }
    });
  });
});
