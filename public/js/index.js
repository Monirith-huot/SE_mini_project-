let internshipInfos = [];
let updatedInternshipInfo = []

document.getElementById('addRecord').addEventListener("click", addRecord);
document.getElementById('deleteAllRecord').addEventListener("click", deleteAllRecord);

document.getElementById('openToaddRecord').addEventListener("click", openToaddRecord);

document.getElementById('defaultTable').addEventListener("click", defaultTable)

document.getElementById('ascendingStuID').addEventListener("click", ascendingStuID);

document.getElementById('descendingStuID').addEventListener("click", descendingStuID);

document.getElementById('ascendingStudentName').addEventListener("click", ascendingStudentName);

document.getElementById('descendingStudentName').addEventListener('click', descendingStudentName);

document.getElementById('openSearchRecord').addEventListener("click", openSearchRecord);

document.getElementById('searchRecord').addEventListener("click", searchRecord);

document.getElementById('restartButton').addEventListener("click", restartDB);

document.getElementById('saveRecordUpdated').addEventListener("click", saveRecord);



let internshipRecord = {
    stuID : document.getElementById('stuID').value,
    stuName : document.getElementById('stuName').value,   
    vcName: document.getElementById('vcName').value,
    projectID: document.getElementById('projectID').value,
    projectName: document.getElementById('projectName').value,
}

function openToaddRecord() {
    var text = document.getElementById("popup");
    text.classList.toggle("hide");
    text.classList.toggle("show");
}

function addRecord() {

    if (stuID.value.length == 0 || stuName.value.length == 0 || vcName.value.length == 0 || projectID.value.length == 0 || projectName.value.length == 0) {
        alert("Please fill all the column")
    }


    else {

        internshipInfos.push(internshipRecord);
        console.log(internshipInfos);
        var record = {
            "id" :  stuID.value,
            "stuName" : stuName.value,
            "vcName" : vcName.value,
            "projectID" : projectID.value,
            "projectName" : projectName.value
        }
        fetch("http://localhost:3000/internshipRecord/", {
            //Post for add record
            method : "POST", //what kind of action you want to perform
            headers: {
                "Content-Type": 'application/json'
            },
            body:JSON.stringify(record) //convert JSON date to date string
        })

        alert("Data have been added successfully")


        document.forms[0].reset();
    }
    
}

function deleteAllRecord() {
    var result = confirm( "You want to delete all the records")

    if (result) {
        fetch("http://localhost:3000/internshipRecord").then((data)=>{
            data.json().then((jsonData)=>{
                for(var i = 0; i < jsonData.length; i++) {
                    console.log(jsonData[i]["id"])

                    fetch("http://localhost:3000/internshipRecord/" + jsonData[i]["id"], {
                        method:"DELETE",
                        headers:{
                            "Content-Type": "application/json",
                        }
                    }
                )}
            })
        })
    }
    
}

//default
function defaultTable() {
    fetch("http://localhost:3000/internshipRecord").then(
    res=> {
        res.json().then(
            data=>{
                console.log(data);
                if(data.length > 0) {
                    var temp = "";

                    // ----- start loop
                    data.forEach((info) => {
                        temp += "<tr>";
                        temp += "<td>" + info.id+ "</td>";
                        temp += "<td>" + info.stuName+ "</td>";
                        temp += "<td>" + info.vcName+ "</td>";
                        temp += "<td>" + info.projectID+ "</td>";
                        temp += "<td>" + info.projectName+ "</td>";
                        temp += "<td>" + "<button type='button' class='btn btn-primary' onclick='editSingleRow()' >Edit</button>" + "</td>";
                        temp += "<td>" + "<button type='button' class='btn btn-danger' onclick='deleteSingleRow(this)'>Delete</button>" + "</td>"; + "</td>";
                        temp += "</tr>";
                    })

                    // ------ close loop
                    document.getElementById("data").innerHTML = temp;
                }
            }
        )
    })
}


function ascendingStuID() {
    fetch("http://localhost:3000/internshipRecord").then (res => {
        res.json().then(
            data => {
                const sortedResponse = data.sort(function(a, b) {
                    return parseInt(a.id) - parseInt(b.id)
                });

                if(sortedResponse.length > 0) {
                    var temp = "";
                    // ----- start loop
                    sortedResponse.forEach((info) => {
                        temp += "<tr>";
                        temp += "<td>" + info.id+ "</td>";
                        temp += "<td>" + info.stuName+ "</td>";
                        temp += "<td>" + info.vcName+ "</td>";
                        temp += "<td>" + info.projectID+ "</td>";
                        temp += "<td>" + info.projectName+ "</td>";
                        temp += "<td>" + "<button type='button' class='btn btn-primary' onclick='editSingleRow()' >Edit</button>" + "</td>";
                        temp += "<td>" + "<button type='button' class='btn btn-danger' onclick='deleteSingleRow(this)'>Delete</button>" + "</td>"; + "</td>";
                        temp += "</tr>";
                    })

                    // ------ close loop
                    document.getElementById("data").innerHTML = temp;
                }
            }
        )
    })
}




//ID from largest to the smallest
function descendingStuID() {
    fetch("http://localhost:3000/internshipRecord").then (res => {
        res.json().then(
            data => {
                const sortedResponse = data.sort(function(a, b) {
                    return parseInt(a.id) - parseInt(b.id)
                }).reverse();

                if(sortedResponse.length > 0) {
                    var temp = "";
                    // ----- start loop
                    sortedResponse.forEach((info) => {
                        temp += "<tr>";
                        temp += "<td>" + info.id+ "</td>";
                        temp += "<td>" + info.stuName+ "</td>";
                        temp += "<td>" + info.vcName+ "</td>";
                        temp += "<td>" + info.projectID+ "</td>";
                        temp += "<td>" + info.projectName+ "</td>";
                        temp += "<td>" + "<button type='button' class='btn btn-primary' onclick='editSingleRow()' >Edit</button>" + "</td>";
                        temp += "<td>" + "<button type='button' class='btn btn-danger' onclick='deleteSingleRow(this)'>Delete</button>" + "</td>"; + "</td>";
                        temp += "</tr>";
                    })

                    // ------ close loop
                    document.getElementById("data").innerHTML = temp;
                }
            }
        )
    })
}

function ascendingStudentName() {
    fetch("http://localhost:3000/internshipRecord?_sort=stuName").then (res => {
        res.json().then(
            data => {
                console.log(data)
                if(data.length > 0) {
                    var temp = "";


                    // ----- start loop

                    data.forEach((info) => {
                        temp += "<tr>";
                        temp += "<td>" + info.id+ "</td>";
                        temp += "<td>" + info.stuName+ "</td>";
                        temp += "<td>" + info.vcName+ "</td>";
                        temp += "<td>" + info.projectID+ "</td>";
                        temp += "<td>" + info.projectName+ "</td>";
                        temp += "<td>" + "<button type='button' class='btn btn-primary' onclick='editSingleRow()' >Edit</button>" + "</td>";
                        temp += "<td>" + "<button type='button' class='btn btn-danger' onclick='deleteSingleRow(this)'>Delete</button>" + "</td>"; + "</td>";
                        temp += "</tr>";
                    })

                    // ------ close loop
                    document.getElementById("data").innerHTML = temp;
                }
            }
        )
    })
    
}

function descendingStudentName() {
    fetch("http://localhost:3000/internshipRecord?_sort=stuName&_order=desc").then (res => {
        res.json().then(
            data => {
                console.log(data)
                if(data.length > 0) {
                    var temp = "";


                    // ----- start loop

                    data.forEach((info) => {
                        temp += "<tr>";
                        temp += "<td>" + info.id+ "</td>";
                        temp += "<td>" + info.stuName+ "</td>";
                        temp += "<td>" + info.vcName+ "</td>";
                        temp += "<td>" + info.projectID+ "</td>";
                        temp += "<td>" + info.projectName+ "</td>";
                        temp += "<td>" + "<button type='button' class='btn btn-primary' onclick='editSingleRow()' >Edit</button>" + "</td>";
                        temp += "<td>" + "<button type='button' class='btn btn-danger' onclick='deleteSingleRow(this)'>Delete</button>" + "</td>"; + "</td>";
                        temp += "</tr>";
                    })

                    // ------ close loop
                    document.getElementById("data").innerHTML = temp;
                }
            }
        )
    })
}



fetch("http://localhost:3000/internshipRecord").then(
    res=> {
        res.json().then(
            data=>{
                console.log(data);
                if(data.length > 0) {
                    var temp = "";


                    // ----- start loop
                    data.forEach((info) => {
                        temp += "<tr>";
                        temp += "<td>" + info.id+ "</td>";
                        temp += "<td>" + info.stuName+ "</td>";
                        temp += "<td>" + info.vcName+ "</td>";
                        temp += "<td>" + info.projectID+ "</td>";
                        temp += "<td>" + info.projectName+ "</td>";
                        temp += "<td>" + "<button type='button' class='btn btn-primary' onclick='editSingleRow()'>Edit</button>" + "</td>";
                        temp += "<td>" + "<button type='button' class='btn btn-danger' onclick='deleteSingleRow(this)'>Delete</button>" + "</td>"; + "</td>";
                        temp += "</tr>";
                    })

                    // ------ close loop
                    document.getElementById("data").innerHTML = temp;
                }
            }
        )
    }
)

function deleteSingleRow(ctl) {

    var result = confirm( "You want to delete this record ?")

    if (result) {
        $('#table').find('tr').click( function() {
            var row = $(this).find('td:first').text();
            fetch("http://localhost:3000/internshipRecord/" + row, {
                //Post for add record
                method:"DELETE",
                headers:{
                    "Content-Type": "application/json",
                },
            });
        })
    }
}

function editSingleRow() {

    var result = confirm( "You want to edit this record ?") 

    if (result) {

        $('#table').find('tr').click( function() {
            var editRow = $(this).find('td:first').text();

            var updateRecord = {
                "id" : editRow,
                "stuName" : newStuName,
                "vcName": 19,
                "projectID" : "3213421",
                "projectName" : "s12312daw"
            }

            fetch("http://localhost:3000/internshipRecord/" + editRow, {
                method:"PUT",
                headers : {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(updateRecord)
            })
        })

    }


}




function openSearchRecord() {

    var text = document.getElementById("popup1");
    text.classList.toggle("hide1");
    text.classList.toggle("show1");

}


function searchRecord() {
    var idOption = document.getElementById("idOption").selected
    var inputToSearch = document.getElementById("inputToSearch")

    var nameOption = document.getElementById("nameOption").selected

    // console.log(inputToSearch.value)
    var vcNameOption = document.getElementById("vcNameOption").selected
    var projectIDOption = document.getElementById("projectIDOption").selected
    var projectNameOption = document.getElementById("projectNameOption").selected

    if(idOption && inputToSearch.value.length > 0) {
        fetch("http://localhost:3000/internshipRecord/" + inputToSearch.value).then((data)=>{
            data.json().then((jsonData)=>{

                if (jsonData.id == undefined) {
                    alert("Your particular has not found in the database")
                }
                
                else {
                    var temp = ""
                    temp += "<tr>";
                    temp += "<td>" + jsonData.id+ "</td>";
                    temp += "<td>" + jsonData.stuName+ "</td>";
                    temp += "<td>" + jsonData.vcName+ "</td>";
                    temp += "<td>" + jsonData.projectID+ "</td>";
                    temp += "<td>" + jsonData.projectName+ "</td>";
                    temp += "<td>" + "<button type='button' class='btn btn-primary' onclick='editSingleRow()'>Edit</button>" + "</td>";
                    temp += "<td>" + "<button type='button' class='btn btn-danger' onclick='deleteSingleRow(this)'>Delete</button>" + "</td>"; + "</td>";
                    temp += "</tr>";

                    document.getElementById("data").innerHTML = temp;
                }


            })
        })
    }

    else if(nameOption && inputToSearch.value.length > 0) {
        fetch("http://localhost:3000/internshipRecord?stuName=" + inputToSearch.value).then((data)=>{
            data.json().then((jsonData)=>{

                if (jsonData[0] !=  undefined) {

                    var temp = ""
                    for (var i = 0; i < jsonData.length; i++) {
    
                        temp += "<tr>";
                        temp += "<td>" + jsonData[i]["id"]+ "</td>";
                        temp += "<td>" + jsonData[i]["stuName"] + "</td>";
                        temp += "<td>" + jsonData[i]["vcName"]+ "</td>";
                        temp += "<td>" + jsonData[i]["projectID"] + "</td>";
                        temp += "<td>" + jsonData[i]["projectName"]+ "</td>";
                        temp += "<td>" + "<button type='button' class='btn btn-primary' onclick='editSingleRow()'>Edit</button>" + "</td>";
                        temp += "<td>" + "<button type='button' class='btn btn-danger' onclick='deleteSingleRow(this)'>Delete</button>" + "</td>"; + "</td>";
                        temp += "</tr>";
    
                    }
                    document.getElementById("data").innerHTML = temp
                }


                else {
                    alert("This name is not exist in the database")
                }
            })
        })
    }

    else if( vcNameOption && inputToSearch.value.length > 0) {
        fetch("http://localhost:3000/internshipRecord?vcName=" + inputToSearch.value).then((data)=>{
            data.json().then((jsonData)=>{

                if (jsonData[0] !=  undefined) {
                    var temp = ""
                    for (var i = 0; i < jsonData.length; i++) {
    
                        temp += "<tr>";
                        temp += "<td>" + jsonData[i]["id"]+ "</td>";
                        temp += "<td>" + jsonData[i]["stuName"] + "</td>";
                        temp += "<td>" + jsonData[i]["vcName"]+ "</td>";
                        temp += "<td>" + jsonData[i]["projectID"] + "</td>";
                        temp += "<td>" + jsonData[i]["projectName"]+ "</td>";
                        temp += "<td>" + "<button type='button' class='btn btn-primary' onclick='editSingleRow()'>Edit</button>" + "</td>";
                        temp += "<td>" + "<button type='button' class='btn btn-danger' onclick='deleteSingleRow(this)'>Delete</button>" + "</td>"; + "</td>";
                        temp += "</tr>";
                    }
                    document.getElementById("data").innerHTML = temp
                }


                else {
                    alert("This VC name is not exist in the database")
                }
            })
        })
    }

    else if( projectIDOption && inputToSearch.value.length > 0) {
        fetch("http://localhost:3000/internshipRecord?projectID=" + inputToSearch.value).then((data)=>{
            data.json().then((jsonData)=>{

                if (jsonData[0] !=  undefined) {
                    var temp = ""
                    for (var i = 0; i < jsonData.length; i++) {
    
                        temp += "<tr>";
                        temp += "<td>" + jsonData[i]["id"]+ "</td>";
                        temp += "<td>" + jsonData[i]["stuName"] + "</td>";
                        temp += "<td>" + jsonData[i]["vcName"]+ "</td>";
                        temp += "<td>" + jsonData[i]["projectID"] + "</td>";
                        temp += "<td>" + jsonData[i]["projectName"]+ "</td>";
                        temp += "<td>" + "<button type='button' class='btn btn-primary' onclick='editSingleRow()'>Edit</button>" + "</td>";
                        temp += "<td>" + "<button type='button' class='btn btn-danger' onclick='deleteSingleRow(this)'>Delete</button>" + "</td>"; + "</td>";
                        temp += "</tr>";
                    }
                    document.getElementById("data").innerHTML = temp
                }


                else {
                    alert("This VC name is not exist in the database")
                }
            })
        })
    }

    else if( projectNameOption && inputToSearch.value.length > 0) {
        fetch("http://localhost:3000/internshipRecord?projectName=" + inputToSearch.value).then((data)=>{
            data.json().then((jsonData)=>{

                if (jsonData[0] !=  undefined) {
                    var temp = ""
                    for (var i = 0; i < jsonData.length; i++) {
    
                        temp += "<tr>";
                        temp += "<td>" + jsonData[i]["id"]+ "</td>";
                        temp += "<td>" + jsonData[i]["stuName"] + "</td>";
                        temp += "<td>" + jsonData[i]["vcName"]+ "</td>";
                        temp += "<td>" + jsonData[i]["projectID"] + "</td>";
                        temp += "<td>" + jsonData[i]["projectName"]+ "</td>";
                        temp += "<td>" + "<button type='button' class='btn btn-primary' onclick='editSingleRow()'>Edit</button>" + "</td>";
                        temp += "<td>" + "<button type='button' class='btn btn-danger' onclick='deleteSingleRow(this)'>Delete</button>" + "</td>"; + "</td>";
                        temp += "</tr>";
                    }
                    document.getElementById("data").innerHTML = temp
                }


                else {
                    alert("This VC name is not exist in the database")
                }
            })
        })
    }
    else {
        alert("Please input something...");
    }
}

function restartDB() {
    defaultTable()
}





function  editSingleRow() {
    var text = document.getElementById("popup3");
    text.classList.toggle("hide3");

    $('#table').find('tr').click( function() {
        var id = $(this).find('td:first').text();
        var stuName = $(this).find('td:nth-child(2)').text();
        var VCName = $(this).find('td:nth-child(3)').text();
        var projectID = $(this).find('td:nth-child(4)').text();
        var projectName = $(this).find('td:nth-child(5)').text();


        document.getElementById('stuIDUpdated').value = id,
        document.getElementById('stuNameUpdated').value = stuName, 
        document.getElementById('vcNameUpdated').value = VCName,
        document.getElementById('projectIDUpdated').value = projectID,
        document.getElementById('projectNameUpdated').value = projectName

    })
}
// function putDataToForm(id,stuName,VCName, projectID, projectName) {

//     var recordUpdated =  {
//         "id" :  id,
//         "stuName" : stuName,
//         "vcName" : VCName,
//         "projectID" : projectID,
//         "projectName" : projectName
//     }
//     document.getElementById('stuIDUpdated').value = id,
//     document.getElementById('stuNameUpdated').value = stuName, 
//     document.getElementById('vcNameUpdated').value = VCName,
//     document.getElementById('projectIDUpdated').value = projectID,
//     document.getElementById('projectNameUpdated').value = projectName

// }

function saveRecord() {
    
    var record = {
        "id" : document.getElementById('stuIDUpdated').value,
        "stuName" :     document.getElementById('stuNameUpdated').value, 
        "vcName" :     document.getElementById('vcNameUpdated').value,
        "projectID" : document.getElementById('projectIDUpdated').value,
        "projectName" :     document.getElementById('projectNameUpdated').value,
    }

    if (record["stuName"].length == 0 || record["vcName"].length == 0 || record["projectName"].length == 0) {
        alert("Please fill all the form first")
    }

    else {

        fetch("http://localhost:3000/internshipRecord/" + record.id, {
            method : "PUT", //to add new data to db
            headers : {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(record)
            }).then((data) => {
                console.log(data)
        })
    }

}




