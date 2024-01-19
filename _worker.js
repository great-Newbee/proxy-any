
export default {
  async fetch(request, env) {
      const NewResponse = await handleRequest(request)
      return NewResponse
  },

};



async function handleRequest(request) {
  const url = new URL(request.url);

  const headers_Origin = request.headers.get("Access-Control-Allow-Origin") || "*"
  // 目标地址
  const actualUrlStr = url.pathname
  const directUrl = new URL(actualUrlStr);
  //directUrl.host = actualUrlStr.replace(/^https?:\/\//, '');
  console.log("directUrl:",directUrl)
  const modifiedRequest = new Request(directUrl.toString(), {
    headers: request.headers,
    method: request.method,
    body: request.body,
    redirect: 'follow'
  });
  const response = await fetch(modifiedRequest);
  const modifiedResponse = new Response(response.body, response);
  // 添加允许跨域访问的响应头
  modifiedResponse.headers.set('Access-Control-Allow-Origin', headers_Origin);
  return modifiedResponse;
}


