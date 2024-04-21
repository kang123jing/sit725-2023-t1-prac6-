const express = require("express");
const app = express();
const dbConnect = require("./dbConnect"); // 注意文件名应该是 dbConnect 而不是 dbconnect
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const MongoClient = require("mongodb").MongoClient;

// 路由模块引入
const projectsRoute = require("./routers/router");

const port = process.env.PORT || 8080; // 注意将 PoRT 改为 PORT，并添加默认端口号 8080

app.use(express.json());
app.use(express.static(__dirname + '/public')); // 注意 dirname 应该是 __dirname，并添加路径拼接符 /

// 使用 projectsRoute 处理 '/api/projects' 路径下的请求
app.use('/api/projects', projectsRoute);

// 测试路由
app.get("/test", function (request, response) {
    var userName = request.query.userName; // 注意 query 参数的拼写应为 userName
    response.end("Hello " + userName); // 注意拼接字符串的语法
});

// 使用动态路由处理 '/addTwoNumbers/:firstNumber/:secondNumber' 路径下的请求
app.get('/addTwoNumbers/:firstNumber/:secondNumber', function (req, res, next) {
    var firstNumber = parseInt(req.params.firstNumber); // 注意拼写和语法
    var secondNumber = parseInt(req.params.secondNumber); // 注意拼写和语法
    var result = firstNumber + secondNumber; // 注意计算结果的逻辑

    if (isNaN(result)) {
        res.status(400).json({ error: "Invalid input" }); // 返回错误状态码和信息
    } else {
        res.status(200).json({ result: result }); // 返回计算结果和成功状态码
    }
});

// Socket.io 测试
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);
});

http.listen(port, () => {
    console.log("Listening on port", port);
});
