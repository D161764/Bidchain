var acmd = $.request.parameters.get("cmd");
var project = $.request.parameters.get("project");



function update (){
    try{
        project = project.toUpperCase();
    	var conn = $.db.getConnection();
    	var query = 'call \"BIDCHAIN"."BIDDINGCHAIN.PROCEDURE::ProjectRejection\"(?,?)';
    	var myStatement = conn.prepareCall(query);
    	myStatement.setString(1, project);
    	var rs = myStatement.execute();
		conn.commit();
		var output = {"status": "success"};
		    output = JSON.stringify(output);
		    $.response.contentType = "text/html";
		    $.response.status = $.net.http.OK;
            $.response.setBody(output);
    }
    catch (e) {
        $.response.contentType = "text/plain";

        $.response.setBody(e.message);
    }

}

switch (acmd) {
case "update":
  update();
  break;
  default:
  $.response.status = $.net.http.OK;
  $.response.setBody("Pass Parameter: " + acmd);
}