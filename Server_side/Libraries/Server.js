//Libraries ------------------------------------------------------------------------
var HTTP = require('http'),
	URL = require('url'),
	MySQL = require('mysql');
//-Libraries -----------------------------------------------------------------------	
//Global Variables -----------------------------------------------------------------
var Port = 8001;
var Pool = MySQL.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: 'BlackSwan93!',
	database: 'mysql1'
});
//-Global Variables ----------------------------------------------------------------

HTTP.createServer(
	function (request, response) {
		var operation;
		var startIndex;
		var endIndex;
		var headers = request.headers;
		var method = request.method;
		var url = request.url;
		var body = [];
		var params = [];

		request.on('error', function (err) {
			console.error(err);
			response.statusCode = 400;
			response.end();
		}).on('data', function (chunk) {
			//console.log("Chunk: " + chunk + ".");
			body.push(chunk);
		}).on('end', function () {
			body = Buffer.concat(body).toString();
			//console.log(body);
			console.log("Request received!");

			// At this point, we have the headers, method, url and body, and can now
			// do whatever we need to in order to respond to this request.

			response.on('error', function (err) {
				console.error(err);
			});

			//console.log("Body: " + body + "\n");

			startIndex = body.indexOf("operation=");
			endIndex = startIndex + body.substring(startIndex).indexOf("&");
			//console.log("startIndex: " + startIndex);
			//console.log("endIndex: " + endIndex);
			if (endIndex <= startIndex) {
				endIndex = body.length;
			}
			startIndex += "operation=".length;
			operation = body.substring(startIndex, endIndex);
			//console.log("Operation: " + operation);

			switch (operation) {
				case "register":
					{
						var counter = 0;
						//console.log("Operation register!");

						startIndex = body.indexOf("username=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						startIndex += "username=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("username: " + params[counter]);
						counter++;

						startIndex = body.indexOf("password=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						startIndex += "password=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("password: " + params[counter]);
						counter++;

						startIndex = body.indexOf("email=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						startIndex += "email=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("email: " + params[counter]);
						counter++;

						startIndex = body.indexOf("firstName=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						startIndex += "firstName=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("firstName: " + params[counter]);
						counter++;

						startIndex = body.indexOf("surname=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						startIndex += "surname=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("surname: " + params[counter]);
						counter++;

						startIndex = body.indexOf("lastName=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						startIndex += "lastName=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("lastName: " + params[counter]);
						counter++;

						startIndex = body.indexOf("country=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						startIndex += "country=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("country: " + params[counter]);
						counter++;

						startIndex = body.indexOf("town=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						startIndex += "town=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("town: " + params[counter]);
						counter++;

						startIndex = body.indexOf("address=");
						endIndex = body.length + 1;
						startIndex += "address=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("address: " + params[counter]);
						//counter++;

						break;
					}

					//------------------------------------------------------------------------------------------------

				case "login":
					{
						var counter = 0;
						//console.log("Operation register!");

						startIndex = body.indexOf("username=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						startIndex += "username=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("username: " + params[counter]);
						counter++;

						startIndex = body.indexOf("password=");
						endIndex = body.length + 1;
						startIndex += "password=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("password: " + params[counter]);

						break;
					}

					//------------------------------------------------------------------------------------------------

				case "holidays":
					{
						//console.log("Operation holidays!");

						break;
					}

					//------------------------------------------------------------------------------------------------

				case "search":
					{
						//console.log("Operation search!");
						var counter = 0;

						startIndex = body.indexOf("searchedValue=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						if (endIndex < startIndex) {
							endIndex = startIndex + body.substring(startIndex).length;
						}
						startIndex += "searchedValue=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("startIndex: " + startIndex + "\nendIndex: " + endIndex + "\nparams[counter]: " + params[counter]);
						//console.log("searchedValue: " + params[counter]);
						counter++;

						break;
					}

					//------------------------------------------------------------------------------------------------

				case "holidayInfo":
					{
						//console.log("Operation holidayInfo!");
						var counter = 0;

						//Index 0
						startIndex = body.indexOf("HolidayID=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						if (endIndex < startIndex) {
							endIndex = startIndex + body.substring(startIndex).length;
						}
						startIndex += "HolidayID=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("startIndex: " + startIndex + "\nendIndex: " + endIndex + "\nparams[counter]: " + params[counter]);
						//console.log("HolidayID: " + params[counter]);
						counter++;

						//Index 1
						startIndex = body.indexOf("Nickname=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						if (endIndex < startIndex) {
							endIndex = startIndex + body.substring(startIndex).length;
						}
						startIndex += "Nickname=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("startIndex: " + startIndex + "\nendIndex: " + endIndex + "\nparams[counter]: " + params[counter]);
						//console.log("Nickname: " + params[counter]);
						counter++;

						break;
					}

					//------------------------------------------------------------------------------------------------

				case "vote":
					{
						//console.log("Operation holidayInfo!");
						var counter = 0;

						//Index 0
						startIndex = body.indexOf("VoteValue=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						if (endIndex < startIndex) {
							endIndex = startIndex + body.substring(startIndex).length;
						}
						startIndex += "VoteValue=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("VoteValue: " + params[counter]);
						counter++;

						//Index 1
						startIndex = body.indexOf("HolidayID=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						if (endIndex < startIndex) {
							endIndex = startIndex + body.substring(startIndex).length;
						}
						startIndex += "HolidayID=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("HolidayID: " + params[counter]);
						counter++;

						//Index 2
						startIndex = body.indexOf("Nickname=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						if (endIndex < startIndex) {
							endIndex = startIndex + body.substring(startIndex).length;
						}
						startIndex += "Nickname=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("Nickname: " + params[counter]);
						counter++;

						break;
					}

					//------------------------------------------------------------------------------------------------

				case "changeVote":
					{
						//console.log("Operation holidayInfo!");
						var counter = 0;

						//Index 0
						startIndex = body.indexOf("VoteValue=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						if (endIndex < startIndex) {
							endIndex = startIndex + body.substring(startIndex).length;
						}
						startIndex += "VoteValue=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("VoteValue: " + params[counter]);
						counter++;

						//Index 1
						startIndex = body.indexOf("HolidayID=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						if (endIndex < startIndex) {
							endIndex = startIndex + body.substring(startIndex).length;
						}
						startIndex += "HolidayID=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("HolidayID: " + params[counter]);
						counter++;

						//Index 2
						startIndex = body.indexOf("Nickname=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						if (endIndex < startIndex) {
							endIndex = startIndex + body.substring(startIndex).length;
						}
						startIndex += "Nickname=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("Nickname: " + params[counter]);
						counter++;

						break;
					}

					//------------------------------------------------------------------------------------------------

				case "buyHoliday":
					{
						//console.log("Operation buyHoliday!");
						var counter = 0;

						//Index 0
						startIndex = body.indexOf("Description=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						if (endIndex < startIndex) {
							endIndex = startIndex + body.substring(startIndex).length;
						}
						startIndex += "Description=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("Description: " + params[counter]);
						counter++;

						//Index 1
						startIndex = body.indexOf("TotalPrice=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						if (endIndex < startIndex) {
							endIndex = startIndex + body.substring(startIndex).length;
						}
						startIndex += "TotalPrice=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("TotalPrice: " + params[counter]);
						counter++;

						//Index 2
						startIndex = body.indexOf("Nickname=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						if (endIndex < startIndex) {
							endIndex = startIndex + body.substring(startIndex).length;
						}
						startIndex += "Nickname=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("Nickname: " + params[counter]);
						counter++;

						//Index 3
						startIndex = body.indexOf("HolidayID=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						if (endIndex < startIndex) {
							endIndex = startIndex + body.substring(startIndex).length;
						}
						startIndex += "HolidayID=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("HolidayID: " + params[counter]);
						counter++;

						break;
					}

					//------------------------------------------------------------------------------------------------

				case "commentHoliday":
					{
						//console.log("Operation buyHoliday!");
						var counter = 0;

						//Index 0
						startIndex = body.indexOf("Comment=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						if (endIndex < startIndex) {
							endIndex = startIndex + body.substring(startIndex).length;
						}
						startIndex += "Comment=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("Comment: " + params[counter]);
						counter++;

						//Index 1
						startIndex = body.indexOf("Nickname=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						if (endIndex < startIndex) {
							endIndex = startIndex + body.substring(startIndex).length;
						}
						startIndex += "Nickname=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("Nickname: " + params[counter]);
						counter++;

						//Index 2
						startIndex = body.indexOf("HolidayID=");
						endIndex = startIndex + body.substring(startIndex).indexOf("&");
						if (endIndex < startIndex) {
							endIndex = startIndex + body.substring(startIndex).length;
						}
						startIndex += "HolidayID=".length;
						params[counter] = body.substring(startIndex, endIndex);
						//console.log("HolidayID: " + params[counter]);
						counter++;

						break;
					}
			}

			ConnectToDatabase(response, operation, params);
		});
	}).listen(Port);
console.log("\nServer initialized!\n");

//Additional functions-------------------------------------------------------------------------------------------------------------------------------------

function ConnectToDatabase(response, operation, params) {
	Pool.getConnection(
		function (err, connection) {
			var sql;

			if (err) {
				console.log('Error connecting to Db!');
				return;
			} else {
				console.log('Connection to database established!\nConnected as id: ' + connection.threadId + '!');

				switch (operation) {
					case "register":
						{
							//console.log(params[0] + "\n" + params[1] + "\n" + params[2] + "\n" + params[3] + "\n" + params[4] + "\n" + params[5] + "\n" + params[6] + "\n" + params[7] + "\n" + params[8] + "\n");
							if (params[4] == "") {
								connection.query("INSERT INTO users (Nickname, Password, Role, Email, FirstName, LastName, Country, Town, Address) VALUES (?, ?, 'Member', ?, ?, ?, ?, ?, ?)", //? is for avoiding SQL injection attack
									[params[0], params[1], params[2], params[3], params[5], params[6], params[7], params[8]], //params replacing the ?
									function (error, results, fields) {
										if (error) {
											console.log('Error adding user to database!\nError code: ' + error.code + "\n");

											response.writeHead(200, {
												"Content-Type": "text/plain",
												"Access-Control-Allow-Origin": "*"
											});
											response.end("Error. Error code: " + error.code);
										} else {
											response.writeHead(200, {
												"Content-Type": "text/plain",
												"Access-Control-Allow-Origin": "*"
											});
											response.end("Success.");
										}

										console.log("Response sent!");
										connection.release();
										console.log("Connection to database released!\n\n");
									});
							} else {
								connection.query("INSERT INTO users (Nickname, Password, Role, Email, FirstName, Surname, LastName, Country, Town, Address) VALUES (?, ?, 'Member', ?, ?, ?, ?, ?, ?, ?)", //? is for avoiding SQL injection attack
									[params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7], params[8]], //params replacing the ?
									function (error, results, fields) {
										if (error) {
											console.log('Error adding user to database!\nError code: ' + error.code + "\n");

											response.writeHead(200, {
												"Content-Type": "text/plain",
												"Access-Control-Allow-Origin": "*"
											});
											response.end("Error. Error code: " + error.code);
										} else {
											response.writeHead(200, {
												"Content-Type": "text/plain",
												"Access-Control-Allow-Origin": "*"
											});
											response.end("Success.");
										}

										console.log("Response sent!");
										connection.release();
										console.log("Connection to database released!\n\n");
									});
							}

							break;
						}

						//------------------------------------------------------------------------------------------------

					case "login":
						{
							//console.log(params[0] + "\n" + params[1]);
							connection.query("SELECT * FROM users WHERE Nickname=? AND Password=?", //? is for avoiding SQL injection attack
								[params[0], params[1]], //params replacing the ?
								function (error, results, fields) {
									if (error) {
										console.log('Error in sending query!\nError code: ' + error.code + "\n");

										response.writeHead(200, {
											"Content-Type": "text/plain",
											"Access-Control-Allow-Origin": "*"
										});
										response.end("Error. Error code: " + error.code);
									} else {
										var responseMessage;
										if (results.length == 0) //Username or password are invalid
										{
											response.writeHead(200, {
												"Content-Type": "text/plain",
												"Access-Control-Allow-Origin": "*"
											});
											responseMessage = "Fail.";
											response.end(responseMessage);
										} else //Username and password are correct
										{
											response.writeHead(200, {
												"Content-Type": "text/plain",
												"Access-Control-Allow-Origin": "*"
											});
											responseMessage = "Success.firstName=" + results[0]["FirstName"] + "&lastName=" + results[0]["LastName"];
											response.end(responseMessage);
										}
									}

									console.log("Response sent!");
									connection.release();
									console.log("Connection to database released!\n\n");
								});

							break;
						}

						//------------------------------------------------------------------------------------------------

					case "holidays":
						{
							connection.query("SELECT * FROM holidays WHERE StartDate < NOW() AND NOW() < EndDate",
								function (error, results, fields) {
									if (error) {
										console.log('Error in sending query!\nError code: ' + error.code + "\n");

										response.writeHead(200, {
											"Content-Type": "text/plain",
											"Access-Control-Allow-Origin": "*"
										});
										response.end("Error. Error code: " + error.code);
									} else {
										var responseMessage = "";

										response.writeHead(200, {
											"Content-Type": "text/plain",
											"Access-Control-Allow-Origin": "*"
										});

										//Cycle------------------------------------------------------------------------------------------------------
										responseMessage += "Success.";
										for (var i = 0; i < results.length; i++) {
											responseMessage += "ID=" + results[i]["ID"] +
												"&HolidayName=" + results[i]["HolidayName"] +
												"&Destinations=" + results[i]["Destinations"] +
												"&Days=" + results[i]["Days"] +
												"&Price=" + results[i]["Price"] +
												"&StartDate=" + results[i]["StartDate"] +
												"&EndDate=" + results[i]["EndDate"] +
												"&PicturesURL=" + results[i]["PicturesURL"] +
												"&Description=" + results[i]["Description"] +
												"&ShortDescription=" + results[i]["ShortDescription"] +
												"&VoteUpCount=" + results[i]["VoteUpCount"] +
												"&VoteDownCount=" + results[i]["VoteDownCount"] + ";;";

											//console.log(results[i]["HolidayName"] + "\n");
										}
										response.end(responseMessage);
									}

									console.log("Response sent!");
									connection.release();
									console.log("Connection to database released!\n\n");
								});

							break;
						}

						//------------------------------------------------------------------------------------------------

					case "search":
						{
							params[0] = '%' + params[0] + '%'; //% means 0 to any count of symbols
							connection.query("SELECT * FROM holidays WHERE (HolidayName LIKE ? OR Destinations LIKE ? OR Description LIKE ? OR ShortDescription LIKE ?) AND StartDate < NOW() AND NOW() < EndDate", //? is for avoiding SQL injection attack
								[params[0], params[0], params[0], params[0]], //params replacing the ?
								function (error, results, fields) {
									if (error) {
										console.log('Error in sending query!\nError code: ' + error.code + "\n");

										response.writeHead(200, {
											"Content-Type": "text/plain",
											"Access-Control-Allow-Origin": "*"
										});
										response.end("Error. Error code: " + error.code);
									} else {
										var responseMessage = "";

										response.writeHead(200, {
											"Content-Type": "text/plain",
											"Access-Control-Allow-Origin": "*"
										});

										//Cycle------------------------------------------------------------------------------------------------------
										responseMessage += "Success.";
										for (var i = 0; i < results.length; i++) {
											responseMessage += "ID=" + results[i]["ID"] +
												"&HolidayName=" + results[i]["HolidayName"] +
												"&Destinations=" + results[i]["Destinations"] +
												"&Days=" + results[i]["Days"] +
												"&Price=" + results[i]["Price"] +
												"&StartDate=" + results[i]["StartDate"] +
												"&EndDate=" + results[i]["EndDate"] +
												"&PicturesURL=" + results[i]["PicturesURL"] +
												"&Description=" + results[i]["Description"] +
												"&ShortDescription=" + results[i]["ShortDescription"] +
												"&VoteUpCount=" + results[i]["VoteUpCount"] +
												"&VoteDownCount=" + results[i]["VoteDownCount"] + ";;";

											//console.log(results[i]["HolidayName"] + "\n");
										}
										response.end(responseMessage);
									}

									console.log("Response sent!");
									connection.release();
									console.log("Connection to database released!\n\n");
								});

							break;
						}

						//------------------------------------------------------------------------------------------------

					case "holidayInfo":
						{
							connection.query("SELECT * FROM holidays WHERE ID = ?", //? is for avoiding SQL injection attack
								[params[0]], //params replacing the ?
								function (error, results, fields) {
									if (error) {
										console.log('Error in sending query!\nError code: ' + error.code + "\n");

										response.writeHead(200, {
											"Content-Type": "text/plain",
											"Access-Control-Allow-Origin": "*"
										});
										response.end("Error. Error code: " + error.code);

										console.log("Response sent!");
										connection.release();
										console.log("Connection to database released!\n\n");
									} else {
										var responseMessage = "";

										response.writeHead(200, {
											"Content-Type": "text/plain",
											"Access-Control-Allow-Origin": "*"
										});

										//Cycle------------------------------------------------------------------------------------------------------
										responseMessage += "Success.";
										//console.log("\nresults.length: " + results.length);
										for (var i = 0; i < results.length; i++) {
											responseMessage += "ID=" + results[i]["ID"] +
												"&HolidayName=" + results[i]["HolidayName"] +
												"&Destinations=" + results[i]["Destinations"] +
												"&Days=" + results[i]["Days"] +
												"&Price=" + results[i]["Price"] +
												"&StartDate=" + results[i]["StartDate"] +
												"&EndDate=" + results[i]["EndDate"] +
												"&PicturesURL=" + results[i]["PicturesURL"] +
												"&Description=" + results[i]["Description"] +
												"&ShortDescription=" + results[i]["ShortDescription"] +
												"&VoteUpCount=" + results[i]["VoteUpCount"] +
												"&VoteDownCount=" + results[i]["VoteDownCount"] + ";;";

											//console.log("Description: " + results[i]["Description"].substring(0, 300) + "\n");
										}
										responseMessage += ";;;";
										response.write(responseMessage);

										connection.query("SELECT * FROM comments WHERE HolidayID = ?", //? is for avoiding SQL injection attack
											[params[0]], //params replacing the ?
											function (error, results, fields) {
												if (error) {
													console.log('Error in sending query!\nError code: ' + error.code + "\n");

													response.end("Error. Error code: " + error.code);

													console.log("Response sent!");
													connection.release();
													console.log("Connection to database released!\n\n");
												} else {
													responseMessage = "";

													//Cycle------------------------------------------------------------------------------------------------------
													responseMessage += "Success.";
													for (var i = 0; i < results.length; i++) {
														responseMessage += "ID=" + results[i]["ID"] +
															"&Comment=" + results[i]["Comment"] +
															"&Nickname=" + results[i]["Nickname"] +
															"&HolidayID=" + results[i]["HolidayID"] +
															"&DateTime=" + results[i]["DateTime"] + ";;";

														//console.log("results[i][\"Comment\"]: " + results[i]["Comment"] + "\n");
													}
													responseMessage += ";;;";
													response.write(responseMessage);

													connection.query("SELECT CAST(VoteValue AS UNSIGNED) AS VoteValue FROM votes WHERE HolidayID = ? AND Nickname = ?", //? is for avoiding SQL injection attack
														[params[0], params[1]], //params replacing the ?
														function (error, results, fields) {
															if (error) {
																console.log('Error in sending query!\nError code: ' + error.code + "\n");

																response.end("Error. Error code: " + error.code);
															} else {
																responseMessage = "";

																//Cycle------------------------------------------------------------------------------------------------------
																responseMessage += "Success.";
																if (results.length > 0) {
																	//console.log("\nresults[0]['VoteValue']: " + (results[0]["VoteValue"] - 1));
																	responseMessage += "Voted=true" + "&VoteValue=" + (results[0]["VoteValue"] - 1);
																} else {
																	responseMessage += "Voted=false.";
																}

																responseMessage += ";;";
																response.end(responseMessage);
															}

															console.log("Response sent!");
															connection.release();
															console.log("Connection to database released!\n\n");
														});
												}
											});
									}
								});

							break;
						}

						//------------------------------------------------------------------------------------------------

					case "vote":
						{
							var SQL;

							if (params[0] == 1) //VoteValue
							{
								SQL = "INSERT INTO votes (VoteValue, HolidayID, Nickname) VALUES (b'10', ?, ?)";
							} else {
								if (params[0] == -1) {
									SQL = "INSERT INTO votes (VoteValue, HolidayID, Nickname) VALUES (b'00', ?, ?)";
								}
							}
							connection.query(SQL, [params[1], params[2]],
								function (error, results, fields) {
									if (error) {
										console.log('Error in sending query!\nError code: ' + error.code + "\n");

										response.writeHead(200, {
											"Content-Type": "text/plain",
											"Access-Control-Allow-Origin": "*"
										});
										response.end("Error. Error code: " + error.code);

										console.log("Response sent!");
										connection.release();
										console.log("Connection to database released!\n\n");
									} else {
										var responseMessage = "";
										var SQL;

										if (params[0] == 1) //VoteValue
										{
											SQL = "UPDATE holidays SET VoteUpCount = VoteUpCount + 1 WHERE ID = ?";
										} else {
											if (params[0] == -1) {
												SQL = "UPDATE holidays SET VoteDownCount = VoteDownCount + 1 WHERE ID = ?";
											}
										}

										connection.query(SQL,
											params[1],
											function (error, results, fields) {
												if (error) {
													console.log('Error in sending query!\nError code: ' + error.code + "\n");

													response.writeHead(200, {
														"Content-Type": "text/plain",
														"Access-Control-Allow-Origin": "*"
													});
													response.end("Error. Error code: " + error.code);

													console.log("Response sent!");
													connection.release();
													console.log("Connection to database released!\n\n");
												} else {
													response.writeHead(200, {
														"Content-Type": "text/plain",
														"Access-Control-Allow-Origin": "*"
													});

													responseMessage += "Success.";
													response.end(responseMessage);

													console.log("Response sent!");
													connection.release();
													console.log("Connection to database released!\n\n");
												}
											});
									}
								});

							break;
						}

						//------------------------------------------------------------------------------------------------

					case "changeVote":
						{
							var SQL;

							if (params[0] == 1) //VoteValue
							{
								SQL = "UPDATE votes SET VoteValue = b'10' WHERE HolidayID = ? AND Nickname = ?";
							} else {
								if (params[0] == -1) {
									SQL = "UPDATE votes SET VoteValue = b'00' WHERE HolidayID = ? AND Nickname = ?";
								}
							}
							connection.query(SQL, [params[1], params[2]],
								function (error, results, fields) {
									if (error) {
										console.log('Error in sending query!\nError code: ' + error.code + "\n");

										response.writeHead(200, {
											"Content-Type": "text/plain",
											"Access-Control-Allow-Origin": "*"
										});
										response.end("Error. Error code: " + error.code);

										console.log("Response sent!");
										connection.release();
										console.log("Connection to database released!\n\n");
									} else {
										var SQL;

										if (params[0] == 1) //VoteValue
										{
											SQL = "UPDATE holidays SET VoteUpCount = VoteUpCount + 1 WHERE ID = ?";
										} else {
											if (params[0] == -1) {
												SQL = "UPDATE holidays SET VoteDownCount = VoteDownCount + 1 WHERE ID = ?";
											}
										}

										connection.query(SQL,
											params[1],
											function (error, results, fields) {
												if (error) {
													console.log('Error in sending query!\nError code: ' + error.code + "\n");

													response.writeHead(200, {
														"Content-Type": "text/plain",
														"Access-Control-Allow-Origin": "*"
													});
													response.end("Error. Error code: " + error.code);

													console.log("Response sent!");
													connection.release();
													console.log("Connection to database released!\n\n");
												} else {
													var responseMessage = "";
													var SQL;

													if (params[0] == 1) //VoteValue
													{
														SQL = "UPDATE holidays SET VoteDownCount = VoteDownCount - 1 WHERE ID = ?";
													} else {
														if (params[0] == -1) {
															SQL = "UPDATE holidays SET VoteUpCount = VoteUpCount - 1 WHERE ID = ?";
														}
													}

													connection.query(SQL,
														params[1],
														function (error, results, fields) {
															if (error) {
																console.log('Error in sending query!\nError code: ' + error.code + "\n");

																response.writeHead(200, {
																	"Content-Type": "text/plain",
																	"Access-Control-Allow-Origin": "*"
																});
																response.end("Error. Error code: " + error.code);

																console.log("Response sent!");
																connection.release();
																console.log("Connection to database released!\n\n");
															} else {
																response.writeHead(200, {
																	"Content-Type": "text/plain",
																	"Access-Control-Allow-Origin": "*"
																});

																responseMessage += "Success.";
																response.end(responseMessage);

																console.log("Response sent!");
																connection.release();
																console.log("Connection to database released!\n\n");
															}
														});
												}
											});
									}
								});

							break;
						}

						//------------------------------------------------------------------------------------------------

					case "buyHoliday":
						{
							connection.query("INSERT INTO orders (Description, TotalPrice, DateOrdered, Nickname, HolidayID) VALUES (?, ?, NOW(), ?, ?)", [params[0], params[1], params[2], params[3]],
								function (error, results, fields) {
									if (error) {
										console.log('Error in sending query!\nError code: ' + error.code + "\n");

										response.writeHead(200, {
											"Content-Type": "text/plain",
											"Access-Control-Allow-Origin": "*"
										});
										response.end("Error. Error code: " + error.code);
									} else {
										var responseMessage = "";

										response.writeHead(200, {
											"Content-Type": "text/plain",
											"Access-Control-Allow-Origin": "*"
										});

										responseMessage += "Success.";
										response.end(responseMessage);
									}

									console.log("Response sent!");
									connection.release();
									console.log("Connection to database released!\n\n");
								});

							break;
						}

						//------------------------------------------------------------------------------------------------

					case "commentHoliday":
						{
							connection.query("INSERT INTO comments (Comment, Nickname, HolidayID, DateTime) VALUES (?, ?, ?, NOW())", [params[0], params[1], params[2]],
								function (error, results, fields) {
									if (error) {
										console.log('Error in sending query!\nError code: ' + error.code + "\n");

										response.writeHead(200, {
											"Content-Type": "text/plain",
											"Access-Control-Allow-Origin": "*"
										});
										response.end("Error. Error code: " + error.code);
									} else {
										var responseMessage = "";

										response.writeHead(200, {
											"Content-Type": "text/plain",
											"Access-Control-Allow-Origin": "*"
										});

										responseMessage += "Success.";
										response.end(responseMessage);
									}

									console.log("Response sent!");
									connection.release();
									console.log("Connection to database released!\n\n");
								});

							break;
						}

						//------------------------------------------------------------------------------------------------

					default:
						{
							connection.release();
							console.log("Connection to database released!\n\n");

							break;
						}
				}
			}
		});
}

//End - Additional functions-------------------------------------------------------------------------------------------------------------------------------