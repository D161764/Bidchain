
var acmd = $.request.parameters.get("cmd");
var to_mail = $.request.parameters.get("to");
// var subject = $.request.parameters.get("sub");
// var text_body = $.request.parameters.get("body");
var subject = "Project Bidchain- Membership Rejected ";
var text_body = "Your Membership has been Rejected by Bid Agent. Request you to communicate sudip.architect@gmail.com for further."

function sendmail() {
var destination_package = "BIDDINGCHAIN.MailGun.Connections"

var destination_name = "mailgun";

var message;

var he;

try {

  var dest = $.net.http.readDestination(destination_package, destination_name);

  var client = new $.net.http.Client();

  var req = new $.web.WebRequest($.net.http.POST, "/messages");

  req.headers.set('Content-Type', encodeURIComponent("application/x-www-form-urlencoded"));

  req.parameters.set("domain","projectbidchain.com");

  req.parameters.set("from","membership@projectbidchain.com");

  req.parameters.set("to",to_mail);

  req.parameters.set("subject",subject);

  req.parameters.set("text",text_body);

  client.request(req, dest);

  var response = client.getResponse();

  $.response.contentType = "text/html";

  $.response.setBody(response.body.asString());

  $.response.status = $.net.http.OK;

} catch (e) {

  $.response.contentType = "text/plain";

  $.response.setBody(e.message);

}
}

switch (acmd) {
case "send":
  sendmail();
  break;
  default:
  $.response.status = $.net.http.OK;
  $.response.setBody("Invlid Parameter: " + acmd);
}
