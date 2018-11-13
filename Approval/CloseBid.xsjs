var acmd = $.request.parameters.get("cmd");
var project_exe = $.request.parameters.get("projexec");
var project_own = $.request.parameters.get("projown");
var own_bal = $.request.parameters.get("ownbal");
var exec_bal = $.request.parameters.get("execbal");
var project_id = $.request.parameters.get("projid");
var list_id = $.request.parameters.get("listid");


function update (){
    try{
        own_bal = parseInt(own_bal);
        exec_bal = parseInt(exec_bal);
        
    	var conn = $.db.getConnection();
    	var query = 'call \"BIDCHAIN"."BIDDINGCHAIN.PROCEDURE::BidClosed\"(?,?,?,?,?,?,?)';
    	var myStatement = conn.prepareCall(query);
    	myStatement.setString(1, project_own);
    	myStatement.setString(2, project_exe);
    	myStatement.setString(3, list_id);
    	myStatement.setString(4, project_id);
    	myStatement.setInteger(5, own_bal);
    	myStatement.setInteger(6, exec_bal);
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