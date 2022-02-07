const express = require('express');
var axios = require('axios');
//var data = JSON.stringify({"first_name":"Todd","last_name":"Brannon","username":"tbrannon","email_address":"todd@nowhere.com","password":"password1234"});
const prettyjson = require('prettyjson');
const router = express.Router();

var request = require('request');

const database = require("../../config/database");
const database2 = require("../../config/database2");

// Main landing page GET route ............................................................................................
// ........................................................................................................................
router.get("/", (req, res) => {
  res.render("landing", {
      title: "Splunk Core Implementation Prerequisite Checker",
  });
});



// STEP 1
// create function to delete all records from enrollmentrefresh
function deleteEventsAndEnrollments() {
	// set variable to the query string
	let sql_delete_events_and_enrollments = database.sql1;

	// execute the query
	database.pool.query(sql_delete_events_and_enrollments, (err, results, fields) => {
		if (err) console.log(err.message);
			console.log("This should be 1st!");
	});
}

// STEP 2
// create function to get learndot events and enrollments and insert into enrollmentsrefresh table
function get_learndot_events_enrollments() {
	// 2a. create the query and set to variable
	let sql_get_events_and_enrollments = database.sql2;

	// database.pool.query(sql_get_events_and_enrollments, (err, result) => {
	// 	if(err) console.log(err.message);
	// 	else console.log(result);
	// })

	// 2b. execute the SELECT query
	database.pool.query(sql_get_events_and_enrollments, (err, rows, results) => {
		// console.log("rows:" + JSON.stringify(rows))
		// 2c. Assign results of query to variables to insert into subsequent INSERT query (inserting into table: enrollmentrefresh)
		for(i=1; i <= Object.keys(rows).length; i++){
			if(rows[i] != undefined){
				for(var i in rows) {
					var event_id = JSON.stringify(rows[i].event_id)
					var start_time = JSON.stringify(rows[i].startTime)
					var email = JSON.stringify(rows[i].email)
					var enrollment_id = JSON.stringify(rows[i].enrollment_id)
					var firstname = JSON.stringify(rows[i].firstName)
					var lastname = JSON.stringify(rows[i].lastName)
					var status = JSON.stringify(rows[i].status)
					var locationname = JSON.stringify(rows[i].name)
					var contactid = JSON.stringify(rows[i].contact_id)
					var score = JSON.stringify(rows[i].score)
					// var urlname = JSON.stringify(rows[i].urlName)
					// var urlname = urlname.replace('"\\"', '')
					var records = [event_id, start_time, email, enrollment_id, firstname, lastname, status, locationname, contactid, score]


					var sql_insert_enrollments_and_events = database.sql3;

				database.pool.query(sql_insert_enrollments_and_events, [records], (err, result, fields) => {
					if (err) {
						console.log("Failed to insert records into enrollmentrefresh!!!")
						console.log(err.message)
						// res.sendStatus(500)
						return
					}
					console.log(result);
					// console.log("Number of rows affected : " + result.affectedRows);
    				// console.log("Number of records affected with warning : " + result.warningCount);
    				// console.log("Message from MySQL Server : " + result.message);
					// res.end()
				})
				}				
			}	
		}
	})
}
 // STEP 3
function deleteFromELRPrereqs() {
	// create the DELETE query and set to variable
	let sql_delete_events_and_enrollments = database2.sql4;

	// execute the DELETE query
	database2.pool.query(sql_delete_events_and_enrollments, (err, results, fields) => {
		if (err) {
			console.log("Failed to delete records from tb_elr_prereqs!!!")
			console.log(err)
			res.sendStatus(500)
			return
		}
		console.log("Deleted the existing data from the tb_elr_prereqs table");
		// res.end()
	})
}

function deleteFromELRResults() {
	// create the DELETE query and set to variable
	let sql_delete_tb_elr_results = database.sql8;

	// execute the DELETE query
	database.pool.query(sql_delete_tb_elr_results, (err, results, fields) => {
		if (err) {
			console.log("Failed to delete records from tb_elr_prereqs!!!")
			console.log(err)
			res.sendStatus(500)
			return
		}
		console.log("Deleted the existing data from the tb_elr_results table");
		// res.end()
	})
}

// STEP 4
// create a function to select emails from enrollmentrefresh table and use as criteria in SELECT from eLearningRecords table
// then take the results from the eLearningRecords table and insert into tb_elr_prereqs table
function get_elearningrecords(){
	var sql_getemails = database.sql5;

    // execute the query
    database.pool.query(sql_getemails, (err, rows, results)=>{
		// console.log("getting the emails from enrollmentrefresh table")
		// console.log("sql_getemails" + Object.keys(rows).length)
        for(i=1;i <= Object.keys(rows).length; i++){
            if(rows[i] != undefined){
                for(var i in rows){
                    var email = JSON.stringify(rows[i].email)
					var email = email.replace('"\\"', '')
					var email = email.replace('\\""', '')

					var records2 = [email]

					// console.log(email)
                    const sql_getelr = database2.sql6;

                    database2.pool.query(sql_getelr, [records2], (err, rows, results)=>{
						var rowcount = Object.keys(rows).length
						if(rowcount > 0){
							for(j=1; j<=rowcount; j++){
								if(rows[j] != undefined){
									for(var j in rows){
										var el_email = JSON.stringify(rows[j].email)
										var el_email = el_email.replace('"\\"', '')
										var el_email = el_email.replace('\\""', '')
										var el_coursename = JSON.stringify(rows[j].courseName)
										var el_regid = JSON.stringify(rows[j].registrationID)
										// console.log("j - " + j + " - email:" + el_email + " - coursename: " + el_coursename + " - reg_id: " + el_regid + ";")
										// console.log(el_email, el_coursename)
										var records3 = [el_email, el_coursename, el_regid]
            							// Query to insert results from sql_get_events_and_enrollments into the enrollmentsrefresh table
                                    	var sql_insert_elr_results = 
                                    	    database.sql7;
											
                                    	// console.log("sql_insert_elr_prereqs: " + sql_insert_elr_prereqs)

										database.pool.query(sql_insert_elr_results, [records3], (err, rows, results) => {
											if(err){
												console.log(err)
												
												return
											} else {
												console.log("inserted records into tb_elr_results")
												// res.end()
											}									
										})
										}
									}									
								}								
							}							
                    })					
                }				
            }			
        }	
    })	
}

function console2() {
	console.log("This should be 2nd!")
}
									

// res.render("splunku_enrollments", {
// title: "Splunk Core Implementation Prerequisite Checker",

async function fnAsync() {
	await deleteEventsAndEnrollments();
	await get_learndot_events_enrollments();
	// deleteFromELRPrereqs();
	await deleteFromELRResults();
	get_elearningrecords();
}

router.get("/prereqcheck", (req, res) => {
	fnAsync();
	res.send("Success!!")
});

module.exports = router;