var Http;
var Url = "http://localhost:8001";
var ArrayHolidays = [];//create an empty array
var Holiday;
var ArrayComments = [];
var CurrentPage = 1;
var MaxHolidaysPerPage = 6;
var IndexPage;
var CurrentImage;

function Register()
{
	var regExpResult = 1;
	var params;
	//--------------
	var nickname;
	var	password;
	var email;
	var firstName;
	var surname;
	var lastName;
	var country;
	var town;
	var address;
	
	regExpResult = regExpResult & /[A-Za-z0-9._-]{4,20}/.test(document.getElementById("inputUsername").value);
	regExpResult = regExpResult & /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}/.test(document.getElementById("inputPassword").value);
	regExpResult = regExpResult & /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(document.getElementById("inputEmail").value);
	regExpResult = regExpResult & /[A-Za-z]{4,44}/.test(document.getElementById("inputFirstName").value);
	if(document.getElementById("inputSurname").value != "")
	{
		regExpResult = regExpResult & /[A-Za-z]{4,44}/.test(document.getElementById("inputSurname").value);
	}
	regExpResult = regExpResult & /[A-Za-z]{4,44}/.test(document.getElementById("inputLastName").value);
	regExpResult = regExpResult & /[A-Za-z]{4,44}/.test(document.getElementById("inputCountry").value);
	regExpResult = regExpResult & /[A-Za-z]{4,44}/.test(document.getElementById("inputTown").value);
	regExpResult = regExpResult & /[A-Za-z]{4,199}/.test(document.getElementById("inputAddress").value);
	
	if(regExpResult)
	{
		nickname = document.getElementById("inputUsername").value;
		password = document.getElementById("inputPassword").value;
		email = document.getElementById("inputEmail").value;
		firstName = document.getElementById("inputFirstName").value;
		surname = document.getElementById("inputSurname").value;
		lastName = document.getElementById("inputLastName").value;
		country = document.getElementById("inputCountry").value;
		town = document.getElementById("inputTown").value;
		address = document.getElementById("inputAddress").value;
		
		document.getElementById("inputUsername").value = "";
		document.getElementById("inputPassword").value = "";
		document.getElementById("inputEmail").value = "";
		document.getElementById("inputFirstName").value = "";
		document.getElementById("inputSurname").value = "";
		document.getElementById("inputLastName").value = "";
		document.getElementById("inputCountry").value = "";
		document.getElementById("inputTown").value = "";
		document.getElementById("inputAddress").value = "";
		
		params = "operation=register&username=" + nickname + "&password=" + password + "&email=" + email + "&firstName=" + firstName + "&surname=" + surname + "&lastName=" + lastName + "&country=" + country + "&town=" + town + "&address=" + address;
		
		Http = new XMLHttpRequest();
		
		Http.open("POST", Url, true);

		//Send the proper header information along with the request
		Http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		Http.onreadystatechange = function() 
		{//Call a function when the state changes.
			if(Http.readyState == 4 && Http.status == 200) 
			{
				//alert(Http.responseText);
				if(Http.responseText.includes("Success."))//response contains the phrase "Success."
				{
					window.location.assign(window.location.hostname + window.location.pathname.substring(0, window.location.pathname.indexOf("/Web/")) + "/Index.html");//Redirrect to Home page
				}
				else
				{
					if(Http.responseText.includes("Error."))//response contains the phrase "Error."
					{
						alert(Http.responseText);
					}
				}
			}
			//alert(Http.readyState + " " + Http.status + " " + Http.responseText + ".");
		}
		
		Http.send(params);
	}
}

//--------------------------------------------------------------------------------------------------------------------------------------

function Login()
{
	var regExpResult = 1;
	var params;
	//--------------
	var nickname;
	var	password;
	
	regExpResult = regExpResult & /[A-Za-z0-9._-]{4,20}/.test(document.getElementById("inputUsername").value);
	regExpResult = regExpResult & /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}/.test(document.getElementById("inputPassword").value);
	
	if(regExpResult)
	{
		nickname = document.getElementById("inputUsername").value;
		password = document.getElementById("inputPassword").value;
		
		document.getElementById("inputUsername").value = "";
		document.getElementById("inputPassword").value = "";
		
		params = "operation=login&username=" + nickname + "&password=" + password;
		
		Http = new XMLHttpRequest();
		
		Http.open("POST", Url, true);

		//Send the proper header information along with the request
		Http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		Http.onreadystatechange = function() 
		{//Call a function when the state changes.
			if(Http.readyState == 4 && Http.status == 200) 
			{
				//alert(Http.responseText);
				if(Http.responseText.includes("Success."))
				{
					var startIndex;
					var endIndex;
					var firstName;
					var lastName;
					
					startIndex = Http.responseText.indexOf("firstName=");
					endIndex = startIndex + Http.responseText.substring(startIndex).indexOf("&");
					startIndex += "firstName=".length;
					firstName = Http.responseText.substring(startIndex, endIndex);
					//alert("firstName:"+firstName);
					
					startIndex = Http.responseText.indexOf("lastName=");
					endIndex = Http.responseText.length + 1;
					startIndex += "lastName=".length;
					lastName = Http.responseText.substring(startIndex, endIndex);
					//alert("lastName:"+lastName);
					
					//Write result in cookie
					//alert("nickname: " + nickname);
					SetCookie("nickname", nickname, 30);
					SetCookie("firstName", firstName, 30);
					SetCookie("lastName", lastName, 30);
					
					window.location.assign(window.location.hostname + window.location.pathname.substring(0, window.location.pathname.indexOf("/Web/")) + "/Index.html");//Redirrect to Home page
				}
				else
				{
					if(Http.responseText.includes("Error."))//response contains the phrase "Error."
					{
						alert(Http.responseText);
					}
					else
					{
						if(Http.responseText.includes("Fail."))//response contains the phrase "Fail."
						{
							document.getElementById("message").innerHTML = "Wrong username or password!<br>";
							document.getElementById("message").style = "color: red; font: italic bold 12px/30px Georgia, serif;";
						}
					}
				}
			}
			//alert(Http.readyState + " " + Http.status + " " + Http.responseText + ".");
		}
		
		Http.send(params);
	}
}

//--------------------------------------------------------------------------------------------------------------------------------------

function Logout()
{
	
	SetCookie("nickname", "", -1);
	SetCookie("firstName", "", -1);
	SetCookie("lastName", "", -1);	
}

//--------------------------------------------------------------------------------------------------------------------------------------

function Search()
{
	var regExpResult = 1;
	var searchedValue;
	
	regExpResult = regExpResult & /[A-Za-z0-9А-Яа-я._-]{1,70}/.test(document.getElementById("inputSearch").value);
	
	if(regExpResult)
	{
		searchedValue = document.getElementById("inputSearch").value;
		params = "operation=search" + "&searchedValue=" + searchedValue;
		
		Http = new XMLHttpRequest();
			
		Http.open("POST", Url, true);

		//Send the proper header information along with the request
		Http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		Http.onreadystatechange = function() 
		{//Call a function when the state changes.
			if(Http.readyState == 4 && Http.status == 200) 
			{
				//alert(Http.responseText);
				if(Http.responseText.includes("Success."))
				{
					var startIndex;
					var endIndex;
					var ID, HolidayName, Destinations, Days, Price, StartDate, EndDate, PicturesURL, Description, ShortDescription, VoteUpCount, VoteDownCount;
					var tempResponse;
					var counter;
					var multiplePictures;
					
					tempResponse = Http.responseText;
					
					ArrayHolidays = [];//Empty the array
					while(tempResponse.includes("ID="))
					{
						startIndex = tempResponse.indexOf("ID=");
						endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
						startIndex += "ID=".length;
						ID = tempResponse.substring(startIndex, endIndex);
						//alert("ID:"+ID);
						
						startIndex = tempResponse.indexOf("HolidayName=");
						endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
						startIndex += "HolidayName=".length;
						HolidayName = tempResponse.substring(startIndex, endIndex);
						//alert("HolidayName:"+HolidayName);
						
						startIndex = tempResponse.indexOf("Destinations=");
						endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
						startIndex += "Destinations=".length;
						Destinations = tempResponse.substring(startIndex, endIndex);
						//alert("Destinations:"+Destinations);
						
						startIndex = tempResponse.indexOf("Days=");
						endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
						startIndex += "Days=".length;
						Days = tempResponse.substring(startIndex, endIndex);
						//alert("Days:"+Days);
						
						startIndex = tempResponse.indexOf("Price=");
						endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
						startIndex += "Price=".length;
						Price = tempResponse.substring(startIndex, endIndex);
						//alert("Price:"+Price);
						
						startIndex = tempResponse.indexOf("StartDate=");
						endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
						startIndex += "StartDate=".length;
						StartDate = tempResponse.substring(startIndex, endIndex);
						//alert("StartDate:"+StartDate);
						
						startIndex = tempResponse.indexOf("EndDate=");
						endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
						startIndex += "EndDate=".length;
						EndDate = tempResponse.substring(startIndex, endIndex);
						//alert("EndDate:"+EndDate);
						
						startIndex = tempResponse.indexOf("PicturesURL=");
						endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
						startIndex += "PicturesURL=".length;
						PicturesURL = tempResponse.substring(startIndex, endIndex);
						//alert("PicturesURL:"+PicturesURL);
						
						startIndex = tempResponse.indexOf("Description=");
						endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
						startIndex += "Description=".length;
						Description = tempResponse.substring(startIndex, endIndex);
						//alert("Description:"+Description);
						
						startIndex = tempResponse.indexOf("ShortDescription=");
						endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
						startIndex += "ShortDescription=".length;
						ShortDescription = tempResponse.substring(startIndex, endIndex);
						//alert("ShortDescription:"+ShortDescription);
						
						startIndex = tempResponse.indexOf("VoteUpCount=");
						endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
						startIndex += "VoteUpCount=".length;
						VoteUpCount = tempResponse.substring(startIndex, endIndex);
						//alert("VoteUpCount:"+VoteUpCount);
						
						startIndex = tempResponse.indexOf("VoteDownCount=");
						endIndex = startIndex + tempResponse.substring(startIndex).indexOf(";;");
						startIndex += "VoteDownCount=".length;
						VoteDownCount = tempResponse.substring(startIndex, endIndex);
						//alert("VoteDownCount:"+VoteDownCount);
						
						//alert("tempResponse before: " + tempResponse);
						tempResponse = tempResponse.substring(endIndex);
						//alert("tempResponse after: " + tempResponse);
						
						ArrayHolidays.push({});//push a new empty object in the array
						ArrayHolidays[ArrayHolidays.length - 1].ID = ID;
						ArrayHolidays[ArrayHolidays.length - 1].HolidayName = HolidayName;
						ArrayHolidays[ArrayHolidays.length - 1].Destinations = Destinations;
						ArrayHolidays[ArrayHolidays.length - 1].Days = Days;
						ArrayHolidays[ArrayHolidays.length - 1].Price = Price;
						ArrayHolidays[ArrayHolidays.length - 1].StartDate = StartDate;
						ArrayHolidays[ArrayHolidays.length - 1].EndDate = EndDate;
						
						ArrayHolidays[ArrayHolidays.length - 1].PicturesURL = [];
						counter = 0;
						multiplePictures = false;
						while(PicturesURL.includes(";"))
						{
							multiplePictures = true;
							//alert("PicturesURL: " + PicturesURL);
							startIndex = 0;
							endIndex = PicturesURL.indexOf(";");
							//alert("endIndex: " + endIndex);
							if(endIndex < startIndex)
							{
								endIndex = PicturesURL.length;
							}
							ArrayHolidays[ArrayHolidays.length - 1].PicturesURL[counter] = PicturesURL.substring(startIndex, endIndex);
							//alert("Picture url: " + ArrayHolidays[ArrayHolidays.length - 1].PicturesURL[counter]);
							
							PicturesURL = PicturesURL.substring(endIndex + 1);
							counter++;
						}
						
						if(multiplePictures == false)
						{
							startIndex = 0;
							endIndex = PicturesURL.length;
							ArrayHolidays[ArrayHolidays.length - 1].PicturesURL[counter] = PicturesURL.substring(startIndex, endIndex);
							//alert("1");
						}
						
						ArrayHolidays[ArrayHolidays.length - 1].Description = Description;
						ArrayHolidays[ArrayHolidays.length - 1].ShortDescription = ShortDescription;
						ArrayHolidays[ArrayHolidays.length - 1].VoteUpCount = VoteUpCount;
						ArrayHolidays[ArrayHolidays.length - 1].VoteDownCount = VoteDownCount;
						//alert(ArrayHolidays[ArrayHolidays.length - 1].HolidayName);
					}
					
					IndexPage =  false;
					CurrentPage = 1;
					ShowCurrentPage();
				}
				else
				{
					if(Http.responseText.includes("Error."))//response contains the phrase "Error."
					{
						alert(Http.responseText);
					}
				}
			}
			//alert(Http.readyState + " " + Http.status + " " + Http.responseText + ".");
		}
		Http.send(params);
	}
	else
	{
		HideHolidays();
	}
}

//Events-----------------------------------------------------------------------------------------------------------------------------------------------------
function Index_OnLoad()
{
	var firstName;
	var lastName;
	var params;
	
	//alert("OnLoad()");
	if(CheckCookie("firstName"))//cookie exists / user is logged in
	{
		firstName =  GetCookie("firstName");
		lastName =  GetCookie("lastName");
		//alert(firstName + "\n" + lastName);
		
		document.getElementById("buttonRegister").style.display = "none";
		document.getElementById("buttonLogin").style.display = "none";
		
		document.getElementById("spanUserNames").style.display = "block";
		document.getElementById("spanUserNames").style.width = "80%";
		document.getElementById("spanUserNames").innerHTML = "<b>Welcome back,<br>" + firstName + " " + lastName + "</b>";
		document.getElementById("buttonLogout").style.display = "block";
	}
	else
	{
		document.getElementById("buttonRegister").style.display = "block";
		document.getElementById("buttonLogin").style.display = "block";
		
		document.getElementById("spanUserNames").style.display = "none";
		document.getElementById("buttonLogout").style.display = "none";
	}
	
	Http = new XMLHttpRequest();
		
	Http.open("POST", Url, true);
	params = "operation=holidays";

	//Send the proper header information along with the request
	Http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	Http.onreadystatechange = function() 
	{//Call a function when the state changes.
		if(Http.readyState == 4 && Http.status == 200) 
		{
			//alert(Http.responseText);
			if(Http.responseText.includes("Success."))
			{
				var startIndex;
				var endIndex;
				var ID, HolidayName, Destinations, Days, Price, StartDate, EndDate, PicturesURL, Description, ShortDescription, VoteUpCount, VoteDownCount;
				var tempResponse;
				var counter;
				var multiplePictures;
				
				tempResponse = Http.responseText;
				//alert("tempResponse: " + tempResponse);
				
				ArrayHolidays = [];//Empty the array
				while(tempResponse.includes("ID="))
				{
					startIndex = tempResponse.indexOf("ID=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "ID=".length;
					ID = tempResponse.substring(startIndex, endIndex);
					//alert("ID:"+ID);
					
					startIndex = tempResponse.indexOf("HolidayName=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "HolidayName=".length;
					HolidayName = tempResponse.substring(startIndex, endIndex);
					//alert("HolidayName:"+HolidayName);
					
					startIndex = tempResponse.indexOf("Destinations=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "Destinations=".length;
					Destinations = tempResponse.substring(startIndex, endIndex);
					//alert("Destinations:"+Destinations);
					
					startIndex = tempResponse.indexOf("Days=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "Days=".length;
					Days = tempResponse.substring(startIndex, endIndex);
					//alert("Days:"+Days);
					
					startIndex = tempResponse.indexOf("Price=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "Price=".length;
					Price = tempResponse.substring(startIndex, endIndex);
					//alert("Price:"+Price);
					
					startIndex = tempResponse.indexOf("StartDate=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "StartDate=".length;
					StartDate = tempResponse.substring(startIndex, endIndex);
					//alert("StartDate:"+StartDate);
					
					startIndex = tempResponse.indexOf("EndDate=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "EndDate=".length;
					EndDate = tempResponse.substring(startIndex, endIndex);
					//alert("EndDate:"+EndDate);
					
					startIndex = tempResponse.indexOf("PicturesURL=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "PicturesURL=".length;
					PicturesURL = tempResponse.substring(startIndex, endIndex);
					//alert("PicturesURL:"+PicturesURL);
					
					startIndex = tempResponse.indexOf("Description=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "Description=".length;
					Description = tempResponse.substring(startIndex, endIndex);
					//alert("Description:"+Description);
					
					startIndex = tempResponse.indexOf("ShortDescription=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "ShortDescription=".length;
					ShortDescription = tempResponse.substring(startIndex, endIndex);
					//alert("ShortDescription:"+ShortDescription);
					
					startIndex = tempResponse.indexOf("VoteUpCount=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "VoteUpCount=".length;
					VoteUpCount = tempResponse.substring(startIndex, endIndex);
					//alert("VoteUpCount:"+VoteUpCount);
					
					startIndex = tempResponse.indexOf("VoteDownCount=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf(";;");
					startIndex += "VoteDownCount=".length;
					VoteDownCount = tempResponse.substring(startIndex, endIndex);
					//alert("VoteDownCount:"+VoteDownCount);
					
					//alert("tempResponse before: " + tempResponse);
					tempResponse = tempResponse.substring(endIndex);
					//alert("tempResponse after: " + tempResponse);
					
					ArrayHolidays.push({});//push a new empty object in the array
					ArrayHolidays[ArrayHolidays.length - 1].ID = ID;
					ArrayHolidays[ArrayHolidays.length - 1].HolidayName = HolidayName;
					ArrayHolidays[ArrayHolidays.length - 1].Destinations = Destinations;
					ArrayHolidays[ArrayHolidays.length - 1].Days = Days;
					ArrayHolidays[ArrayHolidays.length - 1].Price = Price;
					ArrayHolidays[ArrayHolidays.length - 1].StartDate = StartDate;
					ArrayHolidays[ArrayHolidays.length - 1].EndDate = EndDate;
					
					ArrayHolidays[ArrayHolidays.length - 1].PicturesURL = [];
					counter = 0;
					multiplePictures = false;
					while(PicturesURL.includes(";"))
					{
						multiplePictures = true;
						//alert("PicturesURL: " + PicturesURL);
						startIndex = 0;
						endIndex = PicturesURL.indexOf(";");
						//alert("endIndex: " + endIndex);
						if(endIndex < startIndex)
						{
							endIndex = PicturesURL.length;
						}
						ArrayHolidays[ArrayHolidays.length - 1].PicturesURL[counter] = PicturesURL.substring(startIndex, endIndex);
						//alert("Picture url: " + ArrayHolidays[ArrayHolidays.length - 1].PicturesURL[counter]);
						
						PicturesURL = PicturesURL.substring(endIndex + 1);
						counter++;
					}
					
					if(multiplePictures == false)
					{
						startIndex = 0;
						endIndex = PicturesURL.length;
						ArrayHolidays[ArrayHolidays.length - 1].PicturesURL[counter] = PicturesURL.substring(startIndex, endIndex);
						//alert("1");
					}
					
					ArrayHolidays[ArrayHolidays.length - 1].Description = Description;
					ArrayHolidays[ArrayHolidays.length - 1].ShortDescription = ShortDescription;
					ArrayHolidays[ArrayHolidays.length - 1].VoteUpCount = VoteUpCount;
					ArrayHolidays[ArrayHolidays.length - 1].VoteDownCount = VoteDownCount;
					//alert(ArrayHolidays[ArrayHolidays.length - 1].HolidayName);
				}
				
				IndexPage =  true;
				CurrentPage = 1;
				ShowCurrentPage();
			}
			else
			{
				if(Http.responseText.includes("Error."))//response contains the phrase "Error."
				{
					alert(Http.responseText);
				}
			}
		}
		//alert(Http.readyState + " " + Http.status + " " + Http.responseText + ".");
	}
	Http.send(params);
}

//--------------------------------------------------------------------------------------------------------------------------------------

function Search_OnLoad()
{
	var firstName;
	var lastName;
	var params;
	
	//alert("OnLoad()");
	if(CheckCookie("firstName"))//cookie exists / user is logged in
	{
		firstName =  GetCookie("firstName");
		lastName =  GetCookie("lastName");
		//alert(firstName + "\n" + lastName);
		
		document.getElementById("buttonRegister").style.display = "none";
		document.getElementById("buttonLogin").style.display = "none";
		
		document.getElementById("spanUserNames").style.display = "block";
		document.getElementById("spanUserNames").style.width = "80%";
		document.getElementById("spanUserNames").innerHTML = "<b>Welcome back,<br>" + firstName + " " + lastName + "</b>";
		document.getElementById("buttonLogout").style.display = "block";
	}
	else
	{
		document.getElementById("buttonRegister").style.display = "block";
		document.getElementById("buttonLogin").style.display = "block";
		
		document.getElementById("spanUserNames").style.display = "none";
		document.getElementById("buttonLogout").style.display = "none";
	}
}

//--------------------------------------------------------------------------------------------------------------------------------------

function ContactUs_OnLoad()
{
	var firstName;
	var lastName;
	var params;
	
	//alert("OnLoad()");
	if(CheckCookie("firstName"))//cookie exists / user is logged in
	{
		firstName =  GetCookie("firstName");
		lastName =  GetCookie("lastName");
		//alert(firstName + "\n" + lastName);
		
		document.getElementById("buttonRegister").style.display = "none";
		document.getElementById("buttonLogin").style.display = "none";
		
		document.getElementById("spanUserNames").style.display = "block";
		document.getElementById("spanUserNames").style.width = "80%";
		document.getElementById("spanUserNames").innerHTML = "<b>Welcome back,<br>" + firstName + " " + lastName + "</b>";
		document.getElementById("buttonLogout").style.display = "block";
	}
	else
	{
		document.getElementById("buttonRegister").style.display = "block";
		document.getElementById("buttonLogin").style.display = "block";
		
		document.getElementById("spanUserNames").style.display = "none";
		document.getElementById("buttonLogout").style.display = "none";
	}
}

//--------------------------------------------------------------------------------------------------------------------------------------

function HolidayInfo_OnLoad()
{
	var firstName;
	var lastName;
	var nickname;
	var params;
	var holidayID = "";
	var mainTable;
	var tempTable;
	var tempRow;
	var tempCell;
	
	//alert("OnLoad()");
	if(CheckCookie("firstName"))//cookie exists / user is logged in
	{
		firstName =  GetCookie("firstName");
		lastName =  GetCookie("lastName");
		nickname = GetCookie("nickname");
		//alert(firstName + "\n" + lastName);
		
		document.getElementById("buttonRegister").style.display = "none";
		document.getElementById("buttonLogin").style.display = "none";
		
		document.getElementById("spanUserNames").style.display = "block";
		document.getElementById("spanUserNames").style.width = "80%";
		document.getElementById("spanUserNames").innerHTML = "<b>Welcome back,<br>" + firstName + " " + lastName + "</b>";
		document.getElementById("buttonLogout").style.display = "block";
		
		document.getElementById("imgButtonBuy").style.visibility = "visible";
		document.getElementById("imgButtonComment").style.visibility = "visible";
		document.getElementById("taComment").onclick = function(){};
		document.getElementById("spanErrorComments").style.visibility = "hidden";
	}
	else
	{
		document.getElementById("buttonRegister").style.display = "block";
		document.getElementById("buttonLogin").style.display = "block";
		
		document.getElementById("spanUserNames").style.display = "none";
		document.getElementById("buttonLogout").style.display = "none";
		
		document.getElementById("imgButtonBuy").style.visibility = "hidden";
		document.getElementById("imgButtonComment").style.visibility = "hidden";
		document.getElementById("taComment").onclick = function(){document.getElementById("spanErrorComments").style.visibility = "visible";};
	}
	
	if(CheckCookie("HolidayID"))
	{
		holidayID = GetCookie("HolidayID");
		//alert("holidayID: " + holidayID);
	}
	
	Http = new XMLHttpRequest();
		
	Http.open("POST", Url, true);
	params = "operation=holidayInfo" + "&HolidayID=" + holidayID + "&Nickname=" + nickname;

	//Send the proper header information along with the request
	Http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	Http.onreadystatechange = function() 
	{//Call a function when the state changes.
		if(Http.readyState == 4 && Http.status == 200) 
		{
			//alert("Http.responseText: " + Http.responseText);
			if(Http.responseText.includes("Error."))//response contains the phrase "Error."
			{
				alert(Http.responseText.substring(Http.responseText.indexOf("Error.")));
			}
			else
			{
				if(Http.responseText.includes("Success."))
				{
					var startIndex;
					var endIndex;
					var ID, HolidayName, Destinations, Days, Price, StartDate, EndDate, PicturesURL, Description, ShortDescription, VoteUpCount, VoteDownCount;
					var translatedStartDate, translatedEndDate;
					var CommentID, Comment, Nickname, HolidayID, DateTime;
					var Voted, VoteValue = "";
					var tempResponse;
					var counter;
					var multiplePictures;
					var height;
					var translatedDateTime;
					
					tempResponse = Http.responseText;
					
					Holiday = {};
					
					startIndex = tempResponse.indexOf("ID=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "ID=".length;
					ID = tempResponse.substring(startIndex, endIndex);
					//alert("ID:"+ID);
					
					startIndex = tempResponse.indexOf("HolidayName=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "HolidayName=".length;
					HolidayName = tempResponse.substring(startIndex, endIndex);
					//alert("HolidayName:"+HolidayName);
					
					startIndex = tempResponse.indexOf("Destinations=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "Destinations=".length;
					Destinations = tempResponse.substring(startIndex, endIndex);
					//alert("Destinations:"+Destinations);
					
					startIndex = tempResponse.indexOf("Days=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "Days=".length;
					Days = tempResponse.substring(startIndex, endIndex);
					//alert("Days:"+Days);
					
					startIndex = tempResponse.indexOf("Price=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "Price=".length;
					Price = tempResponse.substring(startIndex, endIndex);
					//alert("Price:"+Price);
					
					startIndex = tempResponse.indexOf("StartDate=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "StartDate=".length;
					StartDate = tempResponse.substring(startIndex, endIndex);
					//alert("StartDate:"+StartDate);
					
					startIndex = tempResponse.indexOf("EndDate=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "EndDate=".length;
					EndDate = tempResponse.substring(startIndex, endIndex);
					//alert("EndDate:"+EndDate);
					
					startIndex = tempResponse.indexOf("PicturesURL=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "PicturesURL=".length;
					PicturesURL = tempResponse.substring(startIndex, endIndex);
					//alert("PicturesURL:"+PicturesURL);
					
					startIndex = tempResponse.indexOf("Description=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "Description=".length;
					Description = tempResponse.substring(startIndex, endIndex);
					//alert("Description:"+Description);
					
					startIndex = tempResponse.indexOf("ShortDescription=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "ShortDescription=".length;
					ShortDescription = tempResponse.substring(startIndex, endIndex);
					//alert("ShortDescription:"+ShortDescription);
					
					startIndex = tempResponse.indexOf("VoteUpCount=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					startIndex += "VoteUpCount=".length;
					VoteUpCount = tempResponse.substring(startIndex, endIndex);
					//alert("VoteUpCount:"+VoteUpCount);
					
					startIndex = tempResponse.indexOf("VoteDownCount=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf(";;");
					startIndex += "VoteDownCount=".length;
					VoteDownCount = tempResponse.substring(startIndex, endIndex);
					//alert("VoteDownCount:"+VoteDownCount);
					
					//alert("tempResponse before (holiday): " + tempResponse + "\n\nendIndex: " + endIndex + "tempResponse.length: " + tempResponse.length);
					tempResponse = tempResponse.substring(endIndex);
					//alert("tempResponse after (holiday): " + tempResponse);
					
					//Holiday processing----------------------------
					Holiday.ID = ID;
					Holiday.HolidayName = HolidayName;
					Holiday.Destinations = Destinations;
					Holiday.Days = Days;
					Holiday.Price = Price;
					Holiday.StartDate = StartDate;
					Holiday.EndDate = EndDate;
					
					Holiday.PicturesURL = [];
					counter = 0;
					multiplePictures = false;
					while(PicturesURL.includes(";"))
					{
						multiplePictures = true;
						//alert("PicturesURL: " + PicturesURL);
						startIndex = 0;
						endIndex = PicturesURL.indexOf(";");
						//alert("endIndex: " + endIndex);
						if(endIndex < startIndex)
						{
							endIndex = PicturesURL.length;
						}
						Holiday.PicturesURL[counter] = "../" + PicturesURL.substring(startIndex, endIndex);
						//alert("Picture url: " + Holiday.PicturesURL[counter]);
						
						PicturesURL = PicturesURL.substring(endIndex + 1);
						counter++;
					}
					
					if(multiplePictures == false)
					{
						startIndex = 0;
						endIndex = PicturesURL.length;
						Holiday.PicturesURL[counter] = "../" + PicturesURL.substring(startIndex, endIndex);
						//alert("multiplePictures == false");
					}
					
					Holiday.Description = Description;
					Holiday.ShortDescription = ShortDescription;
					Holiday.VoteUpCount = VoteUpCount;
					Holiday.VoteDownCount = VoteDownCount;
					//alert(Holiday.HolidayName);
					//End - Holiday processing----------------------
					
					//alert("tempResponse before (comments): " + tempResponse);
					tempResponse = tempResponse.substring(tempResponse.indexOf(";;;Success.") + ";;;Success.".length);
					//alert("tempResponse after (comments): " + tempResponse);
					
					ArrayComments = [];
					while(tempResponse.includes("ID="))//there are more comments
					{
						startIndex = tempResponse.indexOf("ID=");
						endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
						startIndex += "ID=".length;
						CommentID = tempResponse.substring(startIndex, endIndex);
						//alert("CommentID: "+CommentID);
						
						startIndex = tempResponse.indexOf("Comment=");
						endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
						startIndex += "Comment=".length;
						Comment = tempResponse.substring(startIndex, endIndex);
						//alert("Comment: "+Comment);
						
						startIndex = tempResponse.indexOf("Nickname=");
						endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
						startIndex += "Nickname=".length;
						Nickname = tempResponse.substring(startIndex, endIndex);
						//alert("Nickname: "+Nickname);
						
						startIndex = tempResponse.indexOf("HolidayID=");
						endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
						startIndex += "HolidayID=".length;
						HolidayID = tempResponse.substring(startIndex, endIndex);
						//alert("HolidayID: "+HolidayID);
						
						startIndex = tempResponse.indexOf("DateTime=");
						endIndex = startIndex + tempResponse.substring(startIndex).indexOf(";;");
						startIndex += "DateTime=".length;
						DateTime = tempResponse.substring(startIndex, endIndex);
						//alert("DateTime: "+DateTime);
						
						/*Holiday.StartDate - "Tue Jun 06 2017 14:00:00 GMT+0300 (FLE Daylight Time)"
						[0-2] - Day of week
						[4-6] - Month
						[8-9] - Date
						[11-14] - Year
						[16-23] - Time
						[25-32] - Time zone
						[34-length] - Daylight time
						*/
						/*Translate datetime---------------*/
						translatedDateTime = "";
						
						translatedDateTime += DateTime.substring(8, 10) + " ";//[8-9] - Date
						switch(DateTime.substring(4, 7))//[4-6] - Month
						{
							case "Jan":
							{
								translatedDateTime += "Януари ";
								break;
							}
							case "Feb":
							{
								translatedDateTime += "Февруари ";
								break;
							}
							case "Mar":
							{
								translatedDateTime += "Март ";
								break;
							}
							case "Apr":
							{
								translatedDateTime += "Април ";
								break;
							}
							case "May":
							{
								translatedDateTime += "Май ";
								break;
							}
							case "Jun":
							{
								translatedDateTime += "Юни ";
								break;
							}
							case "Jul":
							{
								translatedDateTime += "Юли ";
								break;
							}
							case "Aug":
							{
								translatedDateTime += "Август ";
								break;
							}
							case "Sep":
							{
								translatedDateTime += "Септември ";
								break;
							}
							case "Oct":
							{
								translatedDateTime += "Октомври ";
								break;
							}
							case "Nov":
							{
								translatedDateTime += "Ноември ";
								break;
							}
							case "Dec":
							{
								translatedDateTime += "Декември ";
								break;
							}
							default:
							{
								translatedDateTime += Holiday.StartDate.substring(4, 7) + " ";//[4-6] - Month
								break;
							}
						}
						translatedDateTime += DateTime.substring(11, 15) + ", ";//[11-14] - Year
						translatedDateTime += DateTime.substring(16, 24);//[16-23] - Time
						
						//alert("tempResponse before (comments): " + tempResponse);
						tempResponse = tempResponse.substring(endIndex + 2);//+2 for the ;; delimiter
						//alert("tempResponse after (comments): " + tempResponse);
						
						ArrayComments.push({});//push an empty object in the array
						ArrayComments[ArrayComments.length - 1].ID = CommentID;
						ArrayComments[ArrayComments.length - 1].Comment = Comment;
						ArrayComments[ArrayComments.length - 1].Nickname = Nickname;
						ArrayComments[ArrayComments.length - 1].HolidayID = HolidayID;
						ArrayComments[ArrayComments.length - 1].DateTime = DateTime;
						ArrayComments[ArrayComments.length - 1].translatedDateTime = translatedDateTime;
						//alert("ArrayComments[ArrayComments.length - 1].Comment: " + ArrayComments[ArrayComments.length - 1].Comment);
					}
					
					//alert("tempResponse before (comments): " + tempResponse);
					tempResponse = tempResponse.substring(tempResponse.indexOf(";;;") + ";;;".length);
					//alert("tempResponse after (comments): " + tempResponse);
					
					startIndex = tempResponse.indexOf("Voted=");
					endIndex = startIndex + tempResponse.substring(startIndex).indexOf("&");
					if(endIndex < startIndex)
					{
						endIndex = startIndex + tempResponse.substring(startIndex).indexOf(".");
					}
					startIndex += "Voted=".length;
					Voted = tempResponse.substring(startIndex, endIndex);
					//alert("Voted: "+Voted);
					
					if(Voted == "true")
					{
						startIndex = tempResponse.indexOf("VoteValue=");
						endIndex = startIndex + tempResponse.substring(startIndex).indexOf(";;");
						if(endIndex < startIndex)
						{
							endIndex = tempResponse.length;
						}
						startIndex += "VoteValue=".length;
						VoteValue = tempResponse.substring(startIndex, endIndex);
						//alert("VoteValue: "+VoteValue);
					}
					
					Holiday.Voted = Voted;
					Holiday.VoteValue = VoteValue;
					
					//Load content on page-----------------------------
					document.getElementById("holidayTitle").innerHTML = Holiday.ShortDescription;
					document.getElementById("spanPrice").innerHTML = "<b>" + Holiday.Price + " лв</b>";
					CurrentImage = 0;
					HolidayInfo_ShowCurrentImage();
					document.getElementById("preDescription").innerHTML = Holiday.Description;
					
					/*Holiday.StartDate - "Tue Jun 06 2017 14:00:00 GMT+0300 (FLE Daylight Time)"
					[0-2] - Day of week
					[4-6] - Month
					[8-9] - Date
					[11-14] - Year
					[16-23] - Time
					[25-32] - Time zone
					[34-length] - Daylight time
					*/
					/*Translate datetime---------------*/
					translatedStartDate = "";
					translatedEndDate = "";
					
					translatedStartDate += Holiday.StartDate.substring(8, 10) + " ";//[8-9] - Date
					switch(Holiday.StartDate.substring(4, 7))//[4-6] - Month
					{
						case "Jan":
						{
							translatedStartDate += "Януари ";
							break;
						}
						case "Feb":
						{
							translatedStartDate += "Февруари ";
							break;
						}
						case "Mar":
						{
							translatedStartDate += "Март ";
							break;
						}
						case "Apr":
						{
							translatedStartDate += "Април ";
							break;
						}
						case "May":
						{
							translatedStartDate += "Май ";
							break;
						}
						case "Jun":
						{
							translatedStartDate += "Юни ";
							break;
						}
						case "Jul":
						{
							translatedStartDate += "Юли ";
							break;
						}
						case "Aug":
						{
							translatedStartDate += "Август ";
							break;
						}
						case "Sep":
						{
							translatedStartDate += "Септември ";
							break;
						}
						case "Oct":
						{
							translatedStartDate += "Октомври ";
							break;
						}
						case "Nov":
						{
							translatedStartDate += "Ноември ";
							break;
						}
						case "Dec":
						{
							translatedStartDate += "Декември ";
							break;
						}
						default:
						{
							translatedStartDate += Holiday.StartDate.substring(4, 7) + " ";//[4-6] - Month
							break;
						}
					}
					translatedStartDate += Holiday.StartDate.substring(11, 15) + ", ";//[11-14] - Year
					translatedStartDate += Holiday.StartDate.substring(16, 24);//[16-23] - Time
						
					translatedEndDate += Holiday.EndDate.substring(8, 10) + " ";//[8-9] - Date
					switch(Holiday.EndDate.substring(4, 7))//[4-6] - Month
					{
						case "Jan":
						{
							translatedEndDate += "Януари ";
							break;
						}
						case "Feb":
						{
							translatedEndDate += "Февруари ";
							break;
						}
						case "Mar":
						{
							translatedEndDate += "Март ";
							break;
						}
						case "Apr":
						{
							translatedEndDate += "Април ";
							break;
						}
						case "May":
						{
							translatedEndDate += "Май ";
							break;
						}
						case "Jun":
						{
							translatedEndDate += "Юни ";
							break;
						}
						case "Jul":
						{
							translatedEndDate += "Юли ";
							break;
						}
						case "Aug":
						{
							translatedEndDate += "Август ";
							break;
						}
						case "Sep":
						{
							translatedEndDate += "Септември ";
							break;
						}
						case "Oct":
						{
							translatedEndDate += "Октомври ";
							break;
						}
						case "Nov":
						{
							translatedEndDate += "Ноември ";
							break;
						}
						case "Dec":
						{
							translatedEndDate += "Декември ";
							break;
						}
						default:
						{
							translatedEndDate += Holiday.EndDate.substring(4, 7) + " ";//[4-6] - Month
							break;
						}
					}
					translatedEndDate += Holiday.EndDate.substring(11, 15) + ", ";//[11-14] - Year
					translatedEndDate += Holiday.EndDate.substring(16, 24);//[16-23] - Time
					/*End - Translate datetime---------*/
					document.getElementById("preTimeLimit").innerHTML = "Офертата е валидна от " + translatedStartDate + " до " + translatedEndDate + ".<br>";
					
					if(window.innerWidth > window.innerHeight)
					{
						document.getElementById("imgHoliday").style.height = (window.innerHeight * 0.7) + "px";
						document.getElementById("imgHoliday").style.width = "auto";
					}
					else
					{
						if(window.innerWidth < window.innerHeight)
						{
							document.getElementById("imgHoliday").style.width = (window.innerWidth * 0.7) + "px";
							document.getElementById("imgHoliday").style.height = "auto";
						}
					}
					
					document.getElementById("spanLikesCount").innerHTML = "&nbsp;" + Holiday.VoteUpCount + "&nbsp;";
					document.getElementById("spanDislikesCount").innerHTML = "&nbsp;" + Holiday.VoteDownCount + "&nbsp;";
					
					HolidayInfo_UpdateVote();
					
					//alert("ArrayComments.length: " + ArrayComments.length);
					document.getElementById("commentsCount").innerHTML = ArrayComments.length + " comments:";
					document.getElementById("taComment").style.width = (window.innerWidth * 0.45) + "px";;
					document.getElementById("taComment").style.height = (window.innerHeight * 0.17) + "px";
					
					//Load comments----------------------------
					mainTable =  document.getElementById("tableComments");
					mainTable.style.borderRadius = "15px";
					for(counter = 0; counter < ArrayComments.length; counter++)
					{
						tempTable = document.createElement("TABLE");
						tempTable.style.border = "3px solid darkgrey";
						tempTable.style.width = "100%";
						tempTable.style.backgroundColor = "lightgrey";
						tempTable.style.borderRadius = "15px";
						
						tempRow = tempTable.insertRow(0);
						
						tempCell = tempRow.insertCell(0);
						tempCell.innerHTML = ArrayComments[counter].Nickname;
						tempCell.style.backgroundColor = "lightgrey";
						tempCell.style.borderBottom = "3px solid darkgrey";
						tempCell.style.borderRight = "3px solid darkgrey";
						tempCell.style.width = "20%";
						tempCell.style.textAlign = "center";
						tempCell.style.borderTopLeftRadius = "15px";
						tempCell.style.borderTopRightRadius = "15px";
						
						tempCell = tempRow.insertCell(1);
						tempCell.rowSpan = "2";
						tempCell.innerHTML = ArrayComments[counter].Comment;
						tempCell.style.backgroundColor = "white";
						tempCell.style.borderTopRightRadius = "15px";
						tempCell.style.borderBottomRightRadius = "15px";
						
						tempRow = tempTable.insertRow(1);
						
						tempCell = tempRow.insertCell(0);
						tempCell.innerHTML = ArrayComments[counter].translatedDateTime;
						tempCell.style.backgroundColor = "lightgrey";
						tempCell.style.borderRight = "3px solid darkgrey";
						tempCell.style.width = "20%";
						tempCell.style.borderBottomLeftRadius = "15px";
						tempCell.style.borderBottomRightRadius = "15px";
						
						mainTable.insertRow(0).insertCell(0).appendChild(tempTable);
					}
					//End - Load comments----------------------
					//End - Load content on page-----------------------
				}
			}
		}
		//alert(Http.readyState + " " + Http.status + " " + Http.responseText + ".");
	}
	Http.send(params);
}

//--------------------------------------------------------------------------------------------------------------------------------------

function HolidayInfo_ButtonBuy_OnClick()
{
	var params;
	var nickname;
	
	nickname = GetCookie("nickname");
	
	Http = new XMLHttpRequest();
		
	Http.open("POST", Url, true);
	params = "operation=buyHoliday" + "&Description=" + Holiday.ShortDescription + "&TotalPrice=" + Holiday.Price + "&Nickname=" + nickname + "&HolidayID=" + Holiday.ID;

	//Send the proper header information along with the request
	Http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	Http.onreadystatechange = function() 
	{//Call a function when the state changes.
		if(Http.readyState == 4 && Http.status == 200) 
		{
			//alert("Http.responseText: " + Http.responseText);
			if(Http.responseText.includes("Error."))//response contains the phrase "Error."
			{
				alert(Http.responseText.substring(Http.responseText.indexOf("Error.")));
			}
			else
			{
				if(Http.responseText.includes("Success."))
				{
					alert("Holiday purchased successfully!");
				}
			}
		}
	}
	Http.send(params);
}

//--------------------------------------------------------------------------------------------------------------------------------------

function HolidayInfo_ButtonComment_OnClick()
{
	var params;
	var nickname;
	var comment;
	
	nickname = GetCookie("nickname");
	comment = document.getElementById("taComment").value;
	document.getElementById("taComment").value = "";
	//alert("comment: " + comment);
	
	if(comment != "")
	{
		Http = new XMLHttpRequest();
			
		Http.open("POST", Url, true);
		params = "operation=commentHoliday" + "&Comment=" + comment + "&Nickname=" + nickname + "&HolidayID=" + Holiday.ID;

		//Send the proper header information along with the request
		Http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		Http.onreadystatechange = function() 
		{//Call a function when the state changes.
			if(Http.readyState == 4 && Http.status == 200) 
			{
				//alert("Http.responseText: " + Http.responseText);
				if(Http.responseText.includes("Error."))//response contains the phrase "Error."
				{
					alert(Http.responseText.substring(Http.responseText.indexOf("Error.")));
				}
				else
				{
					if(Http.responseText.includes("Success."))
					{
						window.location.assign(window.location.hostname + window.location.pathname);//Refresh page
					}
				}
			}
		}
		Http.send(params);
	}
	else
	{
		alert("You must write a comment first!");
	}
}

//--------------------------------------------------------------------------------------------------------------------------------------

function HolidayInfo_OnResize()
{
	if(window.innerWidth > window.innerHeight)
	{
		document.getElementById("imgHoliday").style.height = (window.innerHeight * 0.7) + "px";
		document.getElementById("imgHoliday").style.width = "auto";
	}
	else
	{
		if(window.innerWidth < window.innerHeight)
		{
			document.getElementById("imgHoliday").style.width = (window.innerWidth * 0.7) + "px";
			document.getElementById("imgHoliday").style.height = "auto";
		}
	}
	
	document.getElementById("taComment").style.width = (window.innerWidth * 0.45) + "px";
	document.getElementById("taComment").style.height = (window.innerHeight * 0.17) + "px";
}

//--------------------------------------------------------------------------------------------------------------------------------------
function ButtonPreviousPage_OnClick()
{
	CurrentPage--;
	ShowCurrentPage();
}

//--------------------------------------------------------------------------------------------------------------------------------------

function ButtonNextPage_OnClick()
{
	CurrentPage++;
	ShowCurrentPage();
}

//End - Events-----------------------------------------------------------------------------------------------------------------------------------------------

//Cookies----------------------------------------------------------------------------------------------------------------------------------------------------
function SetCookie(cookieName, cookieValue, expireDays) 
{
    var date;
	var expires;
	var path = "/";

	date= new Date();
	
    date.setTime(date.getTime() + (expireDays*24*60*60*1000));//expire time is in miliseconds (*24*60*60*1000 converts it to days)
    expires = "expires=" + date.toUTCString();//toGMTString() is possible too
	
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=" + path;
	//alert("Cookies:" + document.cookie);
}

//--------------------------------------------------------------------------------------------------------------------------------------

function GetCookie(cookieName) 
{
    var name;
    var decodedCookie;
	var cookieArray;

	name = cookieName + "=";
	decodedCookie = decodeURIComponent(document.cookie);
    cookieArray = decodedCookie.split(';');
    for(var i = 0; i <cookieArray.length; i++) 
	{
        var cookieValue;

		cookieValue = cookieArray[i];
        while (cookieValue.charAt(0) == ' ') 
		{
            cookieValue = cookieValue.substring(1);
        }
		
        if (cookieValue.indexOf(name) == 0) 
		{
            return cookieValue.substring(name.length, cookieValue.length);
        }
    }
    return "";
}

//--------------------------------------------------------------------------------------------------------------------------------------

function CheckCookie(cookieValue) 
{
    var temp;
	
	temp = GetCookie(cookieValue);
	//alert("Temp: " + temp);
    if (temp != "") 
	{
        return true;
    } 
	else 
	{
        return false;
    }
}

//End - Cookies----------------------------------------------------------------------------------------------------------------------------------------------

//Additional functions---------------------------------------------------------------------------------------------------------------------------------------
function ShowCurrentPage()
{
	var allPages;
	var repeatCount;
	
	if(ArrayHolidays.length != 0)
	{
		if(ArrayHolidays.length % MaxHolidaysPerPage == 0)
		{
			allPages = ArrayHolidays.length / MaxHolidaysPerPage;
		}
		else
		{
			allPages = Math.trunc(ArrayHolidays.length / MaxHolidaysPerPage) + 1;
		}
		
		if(CurrentPage == allPages)//last page
		{
			repeatCount = ArrayHolidays.length % MaxHolidaysPerPage;
		}
		else
		{
			repeatCount = MaxHolidaysPerPage;
		}
		
		//alert("allPages: " + allPages + "\n" + "repeatCount: " + repeatCount);
		for(var i=0; i<repeatCount; i++)//show the holidays on the page
		{
			if(IndexPage)
			{
				document.getElementById("imgHoliday" + (i + 1)).src = ArrayHolidays[((CurrentPage-1) * MaxHolidaysPerPage) + i].PicturesURL[0];
			}
			else
			{
				document.getElementById("imgHoliday" + (i + 1)).src = "../" + ArrayHolidays[((CurrentPage-1) * MaxHolidaysPerPage) + i].PicturesURL[0];
			}
			document.getElementById("imgHoliday" + (i + 1)).style.visibility = "visible";
			document.getElementById("priceHoliday" + (i + 1)).innerHTML = ArrayHolidays[((CurrentPage-1) * MaxHolidaysPerPage) + i].Price + " лв";
			document.getElementById("priceHoliday" + (i + 1)).style.visibility = "visible";
			document.getElementById("shortDescriptionHoliday" + (i + 1)).innerHTML = ArrayHolidays[((CurrentPage-1) * MaxHolidaysPerPage) + i].ShortDescription;
			document.getElementById("shortDescriptionHoliday" + (i + 1)).style.visibility = "visible";
			/* The same as the code below with a little difference
			document.getElementById("tableHoliday" + (i + 1)).onclick = (function()
			{
				var currentI = i + 1;
				
				return function()
				{
					ProcessHoliday(currentI);
				}
			})();*/
			
			//Neater implementation
			document.getElementById("tableHoliday" + (i + 1)).onclick = function(currentI)
			{
				return function()
				{
					ProcessHoliday(currentI);
				}
			}(i + 1);/*The (i + 1) invokes the function(currentI) with the parameter being the current i, 
					triggering it to return the function in which a copied 
					value is in the closure, no longer connected to i*/
		}
		
		for(var i=repeatCount; i<MaxHolidaysPerPage; i++)//hide the unnecessary holidays on the page
		{
			document.getElementById("imgHoliday" + (i + 1)).style.visibility = "hidden";
			document.getElementById("priceHoliday" + (i + 1)).style.visibility = "hidden";
			document.getElementById("shortDescriptionHoliday" + (i + 1)).style.visibility = "hidden";
			document.getElementById("tableHoliday" + (i + 1)).onclick = function(){};
		}
		
		document.getElementById("imgPreviousPage").style.visibility = "visible";
		if(CurrentPage > 1)//there is previous page
		{
			if(IndexPage)
			{
				document.getElementById("imgPreviousPage").src = "Pictures/Buttons/ButtonArrowLeft.png";
			}
			else
			{
				document.getElementById("imgPreviousPage").src = "../Pictures/Buttons/ButtonArrowLeft.png";
			}
			document.getElementById("imgPreviousPage").onclick = ButtonPreviousPage_OnClick;
			document.getElementById("imgPreviousPage").onmouseenter = function() {ButtonPreviousPage_OnMouseEnter(this)};
			document.getElementById("imgPreviousPage").onmouseleave = function() {ButtonPreviousPage_OnMouseLeave(this)};
		}
		else
		{
			if(IndexPage)
			{
				document.getElementById("imgPreviousPage").src = "Pictures/Buttons/ButtonArrowLeft-Grey.png";
			}
			else
			{
				document.getElementById("imgPreviousPage").src = "../Pictures/Buttons/ButtonArrowLeft-Grey.png";
			}
			document.getElementById("imgPreviousPage").onclick = function (){};
			document.getElementById("imgPreviousPage").onmouseenter = function() {};
			document.getElementById("imgPreviousPage").onmouseleave = function() {};
		}
		
		document.getElementById("imgNextPage").style.visibility = "visible";
		if(CurrentPage < allPages)//there is next page
		{
			if(IndexPage)
			{
				document.getElementById("imgNextPage").src = "Pictures/Buttons/ButtonArrowRight.png";
			}
			else
			{
				document.getElementById("imgNextPage").src = "../Pictures/Buttons/ButtonArrowRight.png";
			}
			document.getElementById("imgNextPage").onclick = ButtonNextPage_OnClick;
			document.getElementById("imgNextPage").onmouseenter = function() {ButtonNextPage_OnMouseEnter(this)};
			document.getElementById("imgNextPage").onmouseleave = function() {ButtonNextPage_OnMouseLeave(this)};
		}
		else
		{
			if(IndexPage)
			{
				document.getElementById("imgNextPage").src = "Pictures/Buttons/ButtonArrowRight-Grey.png";
			}
			else
			{
				document.getElementById("imgNextPage").src = "../Pictures/Buttons/ButtonArrowRight-Grey.png";
			}
			document.getElementById("imgNextPage").onclick = function (){};
			document.getElementById("imgNextPage").onmouseenter = function() {};
			document.getElementById("imgNextPage").onmouseleave = function() {};
		}
		document.getElementById("spanCurrentPage").style.visibility = "visible";
		document.getElementById("spanCurrentPage").innerHTML = "<b>Page: " + CurrentPage + "/" + allPages + "</b>";
	}
	else
	{
		HideHolidays();
	}
}

//--------------------------------------------------------------------------------------------------------------------------------------

function HideHolidays()
{
	for(var i=0; i<MaxHolidaysPerPage; i++)//hide all holidays on the page
	{
		document.getElementById("imgHoliday" + (i + 1)).style.visibility = "hidden";
		document.getElementById("priceHoliday" + (i + 1)).style.visibility = "hidden";
		document.getElementById("shortDescriptionHoliday" + (i + 1)).style.visibility = "hidden";
	}
	
	document.getElementById("imgPreviousPage").style.visibility = "hidden";
	document.getElementById("imgNextPage").style.visibility = "hidden";
	document.getElementById("spanCurrentPage").style.visibility = "hidden";
}

//--------------------------------------------------------------------------------------------------------------------------------------

function ProcessHoliday(indexOnPage)
{
	//alert("indexOnPage: " + indexOnPage);
	var arrayIndex;
	var id;
	
	arrayIndex = ((CurrentPage-1) * MaxHolidaysPerPage) + indexOnPage - 1;//-1 because 1st array index is 0, but 1st index of holiday on page is 1
	//alert("arrayIndex: " + arrayIndex);
	id = ArrayHolidays[arrayIndex].ID;
	//alert("id: " + id);
	
	SetCookie("HolidayID", id, 7);
	
	//alert("window.location.pathname: " + window.location.pathname);
	if(window.location.pathname.includes("Index.html"))
	{
		window.location.assign(window.location.hostname + window.location.pathname.substring(0, window.location.pathname.indexOf("Index.html")) + "Web/HolidayInfo.html");//Redirrect to HolidayInfo page
	}
	else
	{
		window.location.assign(window.location.hostname + window.location.pathname.substring(0, (window.location.pathname.indexOf("Web/") + "Web/".length)) + "HolidayInfo.html");//Redirrect to HolidayInfo page
	}
}

//--------------------------------------------------------------------------------------------------------------------------------------

function HolidayInfo_ShowCurrentImage()
{
	document.getElementById("imgHoliday").src = Holiday.PicturesURL[CurrentImage];
	if(CurrentImage == Holiday.PicturesURL.length - 1)//there are no more images after
	{
		document.getElementById("imgNextImage").src = "../Pictures/Buttons/ButtonArrowRight-Grey.png";
		document.getElementById("imgNextImage").onclick = function() {};
		document.getElementById("imgNextImage").onmouseenter = function() {};
		document.getElementById("imgNextImage").onmouseleave = function() {};
	}
	else
	{
		document.getElementById("imgNextImage").src = "../Pictures/Buttons/ButtonArrowRight.png";
		document.getElementById("imgNextImage").onclick = HolidayInfo_ShowNextImage;
		document.getElementById("imgNextImage").onmouseenter = function() {ButtonNextPage_OnMouseEnter(this)};
		document.getElementById("imgNextImage").onmouseleave = function() {ButtonNextPage_OnMouseLeave(this)};
	}
	
	if(CurrentImage == 0)//there are no more images before
	{
		document.getElementById("imgPreviousImage").src = "../Pictures/Buttons/ButtonArrowLeft-Grey.png";
		document.getElementById("imgPreviousImage").onclick = function() {};
		document.getElementById("imgPreviousImage").onmouseenter = function() {};
		document.getElementById("imgPreviousImage").onmouseleave = function() {};
	}
	else
	{
		document.getElementById("imgPreviousImage").src = "../Pictures/Buttons/ButtonArrowLeft.png";
		document.getElementById("imgPreviousImage").onclick = HolidayInfo_ShowPreviousImage;
		document.getElementById("imgPreviousImage").onmouseenter = function() {ButtonPreviousPage_OnMouseEnter(this)};
		document.getElementById("imgPreviousImage").onmouseleave = function() {ButtonPreviousPage_OnMouseLeave(this)};
	}
	
	document.getElementById("spanCurrentImage").innerHTML = "Image " + (CurrentImage + 1) + " / " + Holiday.PicturesURL.length + " ";
}

//--------------------------------------------------------------------------------------------------------------------------------------

function HolidayInfo_ShowNextImage()
{
	CurrentImage++;
	HolidayInfo_ShowCurrentImage();
}

//--------------------------------------------------------------------------------------------------------------------------------------

function HolidayInfo_ShowPreviousImage()
{
	CurrentImage--;
	HolidayInfo_ShowCurrentImage();
}

//--------------------------------------------------------------------------------------------------------------------------------------

function HolidayInfo_UpdateVote()
{
	//alert("Holiday.Voted: " + Holiday.Voted);
	
	if(CheckCookie("nickname"))//user is logged in
	{
		if(Holiday.Voted == "true")
		{
			//alert("Holiday.VotedValue: " + Holiday.VoteValue);
			if(Holiday.VoteValue == 1)
			{
				document.getElementById("imgButtonLike").src = "../Pictures/Buttons/ButtonLike.png";
				document.getElementById("imgButtonLike").onclick = function() {};
				document.getElementById("imgButtonDislike").src = "../Pictures/Buttons/ButtonDislike_BW.png";
				document.getElementById("imgButtonDislike").onclick = function(){Vote(-1);};
			}
			else
			{
				if(Holiday.VoteValue == -1)
				{
					document.getElementById("imgButtonLike").src = "../Pictures/Buttons/ButtonLike_BW.png";
					document.getElementById("imgButtonLike").onclick = function(){Vote(1);};
					document.getElementById("imgButtonDislike").src = "../Pictures/Buttons/ButtonDislike.png";
					document.getElementById("imgButtonDislike").onclick = function() {};
				}
			}
			document.getElementById("imgButtonLike").onmouseenter = function() {};
			document.getElementById("imgButtonLike").onmouseleave = function() {};
			document.getElementById("imgButtonDislike").onmouseenter = function() {};
			document.getElementById("imgButtonDislike").onmouseleave = function() {};
		}
		else
		{
			if(Holiday.Voted == "false")
			{
				document.getElementById("imgButtonLike").src = "../Pictures/Buttons/ButtonLike_BW.png";
				document.getElementById("imgButtonLike").onclick = function(){Vote(1);};
				document.getElementById("imgButtonDislike").src = "../Pictures/Buttons/ButtonDislike_BW.png";
				document.getElementById("imgButtonDislike").onclick = function(){Vote(-1);};
				
				document.getElementById("imgButtonLike").onmouseenter = function() {HolidayInfo_ButtonLike_OnMouseEnter(this)};
				document.getElementById("imgButtonLike").onmouseleave = function() {HolidayInfo_ButtonLike_OnMouseLeave(this)};
				document.getElementById("imgButtonDislike").onmouseenter = function() {HolidayInfo_ButtonDislike_OnMouseEnter(this)};
				document.getElementById("imgButtonDislike").onmouseleave = function() {HolidayInfo_ButtonDislike_OnMouseLeave(this)};
			}
		}
	}
	else//user is nor logged in
	{
		document.getElementById("imgButtonLike").onclick = function(){document.getElementById("spanErrorVote").style.visibility = "visible";};
		document.getElementById("imgButtonDislike").onclick = function(){document.getElementById("spanErrorVote").style.visibility = "visible";};
	}
	
}

//--------------------------------------------------------------------------------------------------------------------------------------

function Vote(voteValue)
{
	var params;
	var holidayID;
	var nickname;
	
	holidayID = GetCookie("HolidayID");
	nickname = GetCookie("nickname");
	
	//alert("voteValue: " + voteValue);
	Http = new XMLHttpRequest();
		
	Http.open("POST", Url, true);
	if(Holiday.Voted == "false")
	{
		params = "operation=vote" + "&VoteValue=" + voteValue + "&HolidayID=" + holidayID + "&Nickname=" + nickname;
	}
	else
	{
		if(Holiday.Voted == "true")
		{
			params = "operation=changeVote" + "&VoteValue=" + voteValue + "&HolidayID=" + holidayID + "&Nickname=" + nickname;
		}
	}

	//Send the proper header information along with the request
	Http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	Http.onreadystatechange = function() 
	{//Call a function when the state changes.
		if(Http.readyState == 4 && Http.status == 200) 
		{
			//alert("Http.responseText: " + Http.responseText);
			if(Http.responseText.includes("Error."))//response contains the phrase "Error."
			{
				alert(Http.responseText.substring(Http.responseText.indexOf("Error.")));
			}
			else
			{
				if(Http.responseText.includes("Success."))//response contains the phrase "Success."
				{
					if(Holiday.Voted == "false")
					{
						Holiday.Voted = "true";
						
					}
					
					Holiday.VoteValue = voteValue;
					HolidayInfo_UpdateVote();
				}
			}
		}
	}
	Http.send(params);
}

//End - Additional functions---------------------------------------------------------------------------------------------------------------------------------
//Animations-------------------------------------------------------------------------------------------------------------------------------------------------
function ButtonHome_OnMouseEnter(button)
{
	if(window.location.pathname.includes("Index.html"))
	{
		button.src = "Pictures/Buttons/ButtonHome_H.png";
	}
	else
	{
		button.src = "../Pictures/Buttons/ButtonHome_H.png";
	}
}

//-------------------------------------------------------------------

function ButtonHome_OnMouseLeave(button)
{
	if(window.location.pathname.includes("Index.html"))
	{
		button.src = "Pictures/Buttons/ButtonHome.png";
	}
	else
	{
		button.src = "../Pictures/Buttons/ButtonHome.png";
	}
}

//-------------------------------------------------------------------------------------------------------

function ButtonSearch_OnMouseEnter(button)
{
	if(window.location.pathname.includes("Index.html"))
	{
		button.src = "Pictures/Buttons/ButtonSearch_H.png";
	}
	else
	{
		button.src = "../Pictures/Buttons/ButtonSearch_H.png";
	}
}

//-------------------------------------------------------------------

function ButtonSearch_OnMouseLeave(button)
{
	if(window.location.pathname.includes("Index.html"))
	{
		button.src = "Pictures/Buttons/ButtonSearch.png";
	}
	else
	{
		button.src = "../Pictures/Buttons/ButtonSearch.png";
	}
}

//-------------------------------------------------------------------------------------------------------

function ButtonContactUs_OnMouseEnter(button)
{
	if(window.location.pathname.includes("Index.html"))
	{
		button.src = "Pictures/Buttons/ButtonContactUs_H.png";
	}
	else
	{
		button.src = "../Pictures/Buttons/ButtonContactUs_H.png";
	}
}

//-------------------------------------------------------------------

function ButtonContactUs_OnMouseLeave(button)
{
	if(window.location.pathname.includes("Index.html"))
	{
		button.src = "Pictures/Buttons/ButtonContactUs.png";
	}
	else
	{
		button.src = "../Pictures/Buttons/ButtonContactUs.png";
	}
}

//-------------------------------------------------------------------------------------------------------

function ButtonRegister_OnMouseEnter(button)
{
	if(window.location.pathname.includes("Index.html"))
	{
		button.src = "Pictures/Buttons/ButtonRegister_H.png";
	}
	else
	{
		button.src = "../Pictures/Buttons/ButtonRegister_H.png";
	}
}

//-------------------------------------------------------------------

function ButtonRegister_OnMouseLeave(button)
{
	if(window.location.pathname.includes("Index.html"))
	{
		button.src = "Pictures/Buttons/ButtonRegister.png";
	}
	else
	{
		button.src = "../Pictures/Buttons/ButtonRegister.png";
	}
}

//-------------------------------------------------------------------------------------------------------

function ButtonLogin_OnMouseEnter(button)
{
	if(window.location.pathname.includes("Index.html"))
	{
		button.src = "Pictures/Buttons/ButtonLogIn_H.png";
	}
	else
	{
		button.src = "../Pictures/Buttons/ButtonLogIn_H.png";
	}
}

//-------------------------------------------------------------------

function ButtonLogin_OnMouseLeave(button)
{
	if(window.location.pathname.includes("Index.html"))
	{
		button.src = "Pictures/Buttons/ButtonLogIn.png";
	}
	else
	{
		button.src = "../Pictures/Buttons/ButtonLogIn.png";
	}
}

//-------------------------------------------------------------------------------------------------------

function ButtonLogout_OnMouseEnter(button)
{
	if(window.location.pathname.includes("Index.html"))
	{
		button.src = "Pictures/Buttons/ButtonLogOut_H.png";
	}
	else
	{
		button.src = "../Pictures/Buttons/ButtonLogOut_H.png";
	}
}

//-------------------------------------------------------------------

function ButtonLogout_OnMouseLeave(button)
{
	if(window.location.pathname.includes("Index.html"))
	{
		button.src = "Pictures/Buttons/ButtonLogOut.png";
	}
	else
	{
		button.src = "../Pictures/Buttons/ButtonLogOut.png";
	}
}

//-------------------------------------------------------------------------------------------------------

function ButtonPreviousPage_OnMouseEnter(button)
{
	if(window.location.pathname.includes("Index.html"))
	{
		button.src = "Pictures/Buttons/ButtonArrowLeft_H.png";
	}
	else
	{
		button.src = "../Pictures/Buttons/ButtonArrowLeft_H.png";
	}
}

//-------------------------------------------------------------------

function ButtonPreviousPage_OnMouseLeave(button)
{
	if(window.location.pathname.includes("Index.html"))
	{
		button.src = "Pictures/Buttons/ButtonArrowLeft.png";
	}
	else
	{
		button.src = "../Pictures/Buttons/ButtonArrowLeft.png";
	}
}

//-------------------------------------------------------------------------------------------------------

function ButtonNextPage_OnMouseEnter(button)
{
	if(window.location.pathname.includes("Index.html"))
	{
		button.src = "Pictures/Buttons/ButtonArrowRight_H.png";
	}
	else
	{
		button.src = "../Pictures/Buttons/ButtonArrowRight_H.png";
	}
}

//-------------------------------------------------------------------

function ButtonNextPage_OnMouseLeave(button)
{
	if(window.location.pathname.includes("Index.html"))
	{
		button.src = "Pictures/Buttons/ButtonArrowRight.png";
	}
	else
	{
		button.src = "../Pictures/Buttons/ButtonArrowRight.png";
	}
}

//-------------------------------------------------------------------------------------------------------

function HolidayInfo_ButtonBuy_OnMouseEnter(button)
{
	button.src = "../Pictures/Buttons/ButtonBuy_H.png";
}

//-------------------------------------------------------------------

function HolidayInfo_ButtonBuy_OnMouseLeave(button)
{
	button.src = "../Pictures/Buttons/ButtonBuy.png";
}

//-------------------------------------------------------------------------------------------------------

function HolidayInfo_ButtonComment_OnMouseEnter(button)
{
	button.src = "../Pictures/Buttons/ButtonComment_H.png";
}

//-------------------------------------------------------------------

function HolidayInfo_ButtonComment_OnMouseLeave(button)
{
	button.src = "../Pictures/Buttons/ButtonComment.png";
}

//-------------------------------------------------------------------------------------------------------

function HolidayInfo_ButtonLike_OnMouseEnter(button)
{
	button.src = "../Pictures/Buttons/ButtonLike.png";
}

//-------------------------------------------------------------------

function HolidayInfo_ButtonLike_OnMouseLeave(button)
{
	button.src = "../Pictures/Buttons/ButtonLike_BW.png";
}

//-------------------------------------------------------------------------------------------------------

function HolidayInfo_ButtonDislike_OnMouseEnter(button)
{
	button.src = "../Pictures/Buttons/ButtonDislike.png";
}

//-------------------------------------------------------------------

function HolidayInfo_ButtonDislike_OnMouseLeave(button)
{
	button.src = "../Pictures/Buttons/ButtonDislike_BW.png";
}

//-------------------------------------------------------------------------------------------------------
//End - Animations-------------------------------------------------------------------------------------------------------------------------------------------