var http = require("http");
http.createServer(function(request,response){
  //发送HTTP头部
  //http状态值   200:成功
  //内容类型  text/plain
  response.writeHead(200,{'Content-type':'text/plain'});

  //发送响应
  response.end("hello world\n");

}).listen(8888);
console.log()