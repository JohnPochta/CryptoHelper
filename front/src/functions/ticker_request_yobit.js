export default function ticker_request_yobit(query_string, fun){
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  fetch(proxyurl+"https://yobit.net/api/3/ticker/"+query_string)
  .then(resp => resp.json())
  .then(respJSON => JSON.stringify(respJSON))
  .then(respJSON => JSON.parse(respJSON))
  .then(respJSON => fun(respJSON));
};