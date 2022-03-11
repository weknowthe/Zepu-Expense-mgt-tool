"use strict";

//To Play Sound
//Instructions - Please install these before running the prog

//sudo apt-get install libasound2-dev
//npm install --save speaker lame

//Console color change
const chalk = require("colors");

var fs = require("fs");
var lame = require("lame");
var Speaker = require("speaker");
//var soundTrack = 'sounds/1.mp3';
// var s1 = "sounds/s1.mp3";
// var s2 = "sounds/s2.mp3";
// var s3 = "sounds/s3.mp3";
// var s4 = "sounds/s4.mp3";
// var s5 = "sounds/s5.mp3";
// var s6 = "sounds/s6.mp3";
// var s7 = "sounds/s7.mp3";
// var s8 = "sounds/s8.mp3";
// var s9 = "sounds/s9.mp3";
// var s10 = "sounds/s10.mp3";
// var s11 = "sounds/s11.mp3";
// var s12 = "sounds/s12.mp3";
// //var s13 = "sounds/s13.mp3";
// var s14 = "sounds/s14.mp3";
// var s15 = "sounds/s15.mp3";
// var s16 = "sounds/s16.mp3";
// var s17 = "sounds/s17.mp3";

function playSound(CompId, soundTrk) {
  //console.log("CompId "+CompId + " "+"SoundTrack "+soundTrk);

  var soundTrack = "";

  if (CompId == "comp1" && soundTrk == "s4") {
    soundTrack = "sounds/s1-4.mp3";
  } else if (CompId == "comp1" && soundTrk == "s9") {
    soundTrack = "sounds/s1-9.mp3";
  } else if (CompId == "comp1" && soundTrk == "s11") {
    soundTrack = "sounds/s1-11.mp3";
  } else if (CompId == "comp1" && soundTrk == "s12") {
    soundTrack = "sounds/s1-12.mp3";
  } else if (CompId == "comp2" && soundTrk == "s4") {
    soundTrack = "sounds/s2-4.mp3";
  } else if (CompId == "comp2" && soundTrk == "s9") {
    soundTrack = "sounds/s2-9.mp3";
  } else if (CompId == "comp2" && soundTrk == "s11") {
    soundTrack = "sounds/s2-11.mp3";
  } else if (CompId == "comp2" && soundTrk == "s12") {
    soundTrack = "sounds/s2-12.mp3";
  } else if (CompId == "comp3" && soundTrk == "s4") {
    soundTrack = "sounds/s3-4.mp3";
  } else if (CompId == "comp3" && soundTrk == "s9") {
    soundTrack = "sounds/s3-9.mp3";
  } else if (CompId == "comp3" && soundTrk == "s11") {
    soundTrack = "sounds/s3-11.mp3";
  } else if (CompId == "comp3" && soundTrk == "s12") {
    soundTrack = "sounds/s3-12.mp3";
  } else if (CompId == "comp4" && soundTrk == "s4") {
    soundTrack = "sounds/s4-4.mp3";
  } else if (CompId == "comp4" && soundTrk == "s9") {
    soundTrack = "sounds/s4-9.mp3";
  } else if (CompId == "comp4" && soundTrk == "s11") {
    soundTrack = "sounds/s4-11.mp3";
  } else if (CompId == "comp4" && soundTrk == "s12") {
    soundTrack = "sounds/s4-12.mp3";
  } else if (CompId == "none" && soundTrk == "s5") {
    soundTrack = "sounds/s5.mp3";
  } else if (CompId == "none" && soundTrk == "s7") {
    soundTrack = "sounds/s7.mp3";
  } else {
    soundTrack = "sounds/s5.mp3";
  }

  fs.createReadStream(soundTrack)
    .pipe(new lame.Decoder())
    .on("format", function(format) {
      this.pipe(new Speaker(format));
    });
}

//For Firebase
var admin = require("firebase-admin");
const r = require("array-gpio");
var serviceAccount = require("./serviceAccountKey.json");
var getOptions = {
  source: "cache"
};

var now = "";

//For RFID
var HID = require("node-hid");
const EventEmitter = require("events");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var lockerId = "lck00001";
var AvblComps = [];

//-----Fix Error---------------------------
const settings = { timestampsInSnapshots: true };
admin.firestore().settings(settings);
//-----Fix Error---------------------------
var db = admin.firestore();

//Firebase DB update begins

function dbUpdate(isDoorOpen) {
  var compartmentData = {
    isDoorOpen: isDoorOpen
  };
  db.collection("compartment")
    .doc("fEZpA9XkhK4zh9RGEoKQ")
    .update(compartmentData)
    .then(ref => {
      console.log("DoorStatus updated in db successfully");
      return "promise";
    })
    .catch(err => {
      console.log("Error ", err);
    });
}

///isDoorOpen


//Firebase DB update ends

//Compartment Update Function Begin

function compUpdate(compId, lockerId, compData) {
  db.collection("compartment")
    .where("compartmentId", "==", compId)
    .where("isActive", "==", true)
    .where("lockerId", "==", lockerId)
    .get()
    .then(snapshot => {
      if (snapshot.size > 0) {
        snapshot.forEach(docx => {
          db.collection("compartment")
            .doc(docx.id)
            .update(compData)
            .then(ref => {
              console.log(
                "Command sent to the compartment as " + JSON.stringify(compData)
              );
            })
            .catch(err => {
              console.log("Error ", err);
            });

          //console.log("Compartment Found with Id as "+docx.data().compartmentId+" ||\n" + docx.id);
          return true;
        });
      } else {
        //console.log("Compartment Not Found.");
        return false;
      }
    })
    .catch(err => {
      console.log("Error getting documents", err);
      return false;
    });
}

//Compartment Update Function End

//transaction add & update begin

function transactionAdd(RFID_No, txnData) {
  db.collection("transactions")
    .doc(RFID_No)
    .collection("swipes")
    .add(txnData)
    .then(ref => {
      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      console.log("SWIPED, creating a new transaction " + ref.id);
      // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");
      //Play Sound
      //   playSound(s1);
    })
    .catch(err => {
      console.log("Error Capturing SWIPS ", err);
      return false;
    });
}

function transactionUpdate(RFID_No, docid, txnData) {
  db.collection("transactions")
    .doc(RFID_No)
    .collection("swipes")
    .doc(docid)
    .update(txnData)
    .then(ref => {
      console.log(
        JSON.stringify(txnData) + " has been updated in db successfully"
      );

      //Play Sound
      //   playSound(s2);
      return true;
    })
    .catch(err => {
      console.log("Error ", err);
    });
}
//transaction add & update end

//Find AVBL compartment begin

function findAVBLComp(lockerId) {
  //console.log("Find AVBL compartment begin ");
  return new Promise(ret => {
    db.collection("compartment")
      .where("lockerId", "==", lockerId)
      .where("isAvailable", "==", "yes")
      .limit(1)
      .get()
      .then(snapshot => {
        if (snapshot.size > 0) {
          snapshot.forEach(doc => {
            //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            console.log(
              "FOUND, An available compartment as " +
                doc.data().compartmentId.white.bold
            );
            // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");
            //Play Sound
            //       playSound(s3);

            //Putting a compartment on hold

            db.collection("compartment")
              .doc(doc.id).update({ isAvailable: "hold",entryTime: Math.abs(new Date().getTime())})              
              .then(ref => {
                //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                console.log(
                  "BLOCKING COMPARTMENT, " +
                    doc.data().compartmentId.white.bold +
                    " is under booking process, put on hold."
                );
                //  console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");

                //Play Sound
                playSound(doc.data().compartmentId, "s4");

                ret(doc.data().compartmentId);
              })
              .catch(err => {
                console.log("Error ", err);
              });
          });
        } else {
          //console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

	      db.collection("compartment")
	      .where("lockerId", "==", lockerId)
	      .where("isAvailable", "==", "hold")	                 
	      .get()
	      .then(snapshot => {
	        if (snapshot.size > 0) {
		  var isUpdatedOnce = true;
	          snapshot.forEach(doc => {           
			  //console.log("compartment data " + JSON.stringify(doc.data()));	
		          //console.log("doc.data().isDoorOpen   " + doc.data().entryTime);
			  var timeDifference = Math.abs(new Date().getTime() - doc.data().entryTime);
			  var diffInMins = timeDifference / (1000 * 60);
			  //console.log("diffInMins is " + diffInMins);
  			  if(diffInMins > 3 && isUpdatedOnce){
				isUpdatedOnce = false;
			    console.log("FOUND, An available compartment as " + doc.data().compartmentId.white.bold );
		            db.collection("compartment")
		              .doc(doc.id)
		              .update({ isAvailable: "hold",entryTime: Math.abs(new Date().getTime()) })
		              .then(ref => {                
		                console.log("BLOCKING COMPARTMENT, " + doc.data().compartmentId.white.bold +" is under booking process, put on hold." );
		                playSound(doc.data().compartmentId, "s4");
		                ret(doc.data().compartmentId);
		              })
		              .catch(err => {
		                console.log("Error ", err);
		              });
				}
				else {
			          console.log("SORRY, all compartments are occupied.");
			          playSound("none", "s5");
			          ret(false);
	        		}
  
				    });
			        } else {
			          console.log("SORRY, all compartments are occupied.");
			          playSound("none", "s5");
	          ret(false);
	        }
	      })
	      .catch(err => {
	        //console.log("locker dosen't exist");
	        console.log("Error getting documents", err);
	        ret(false);
	      });		
          ///---vinodconsole.log("SORRY, all compartments are occupied.");
          // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");
          //Play Sound
          ///---vinodplaySound("none", "s5");
          ///---vinodret(false);
        }
      })
      .catch(err => {
        //console.log("locker dosen't exist");
        console.log("Error getting documents", err);
        ret(false);
      });
  });
}
//Find AVBL comaprtment end

//Firebase RFID DB search begins

async function isRFIDValidAndActive(rfidId) {
  return new Promise(ret => {
    db.collection("user")
      .where("rfid", "==", rfidId)
      .where("isActive", "==", true)
      .get()
      .then(snapshot => {
        if (snapshot.size > 0) {
          snapshot.forEach(doc => {
            ret(true);
            console.log(
              "RFID Found. Tagged to User - ".cyan +
                "|| ".cyan +
                doc.data().name.white.bold +
                " ||".cyan
            );
            console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");
            //Play Sound
            //playSound(s6);

            ret(true);
          });
        } else {
          console.log("RFID Not Found.");
          //Play Sound
          //playSound(s7);
          ret(false);
        }
      })
      .catch(err => {
        console.log("Error getting documents", err);
        ret(false);
      });
  });
}

//Firebase RFID DB search ends

async function txnCheck(rfid) {
  var query = db.collection("transactions/rfid");
  query.get().then(querySnapshot => {
    querySnapshot.forEach(document => {
      document.ref
        .collection("swipes")
        .get()
        .then(querySnapshot => {
          if (querySnapshot.size > 0) {
            querySnapshot.forEach(doc => {
              ret(true);
              console.log("\n");
            });
          } else {
            console.log("Transaction Not Found.");
            ret(false);
          }
        });
    });
  });
}

function getCompartmetList(lockerId) {
  return new Promise(ret => {
    db.collection("compartment")
      .where("lockerId", "==", lockerId)
      .get()
      .then(snapshot => {
        if (snapshot.size > 0) {
          snapshot.forEach(doc => {
            console.log(
              "Found an available compartment. Details as follows - " +
                doc.data().compartmentId
            );
            //ret(doc.id);
            ret(doc.data().compartmentId);
          });
        } else {
          console.log("Sorry, all compartments are occupied.");
          ret(false);
        }
      })
      .catch(err => {
        console.log("Error getting documents", err);
        ret(false);
      });
  }).then(function(result) {
    return result;
  });
}

function getAvblCompartment(lockerId, RFID_No) {
  //console.log("Inside getAVBLCOMP ");

  return new Promise(ret => {
    var query = db
      .collection("transactions")
      .doc(RFID_No)
      .collection("swipes")
      //.where("LockerId", '==', lockerId)
      .orderBy("EntryTime", "desc")
      .limit(1);

    query
      .get()
      .then(snapshot1 => {
        if (snapshot1.size > 0) {
          snapshot1.forEach(doc1 => {
            if (
              doc1.data().LockerId == lockerId &&
              (doc1.data().BookingTime == "" || doc1.data().ExitTime == "")
            ) {
              // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
              console.log(
                "FOUND, Last booked compartment as " +
                  doc1.data().CompId.white.bold +
                  " id " +
                  doc1.id
              );
              // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");
              ret(doc1.data().CompId);
            } else {
              // console.log(" Inside Else 1 " );
              ret(findAVBLComp(lockerId));

              // db.collection('compartment')
              //     .where('lockerId', '==', lockerId)
              //     .where('isAvailable', '==', "yes").limit(1)
              // .get()
              //     .then(snapshot => {
              //         if(snapshot.size>0){
              //             snapshot.forEach(doc => {

              //    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
              //    console.log("FOUND X, An available compartment as "+ doc.data().compartmentId);
              //      console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");

              // //Putting a compartment on hold

              // db.collection("compartment").doc(doc.id).update({"isAvailable" : "hold"}).then(ref => {
              //        console.log("compartment "+ doc.data().compartmentId +" under booking process, put on hold.");
              //        //return true;
              //       })
              //       .catch(err => {
              //        console.log("Error ",err);
              // });

              //                ret(doc.data().compartmentId);
              //             });
              //         }else{
              //        console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
              //                 console.log("SORRY, all compartments are occupied.");
              //               console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");
              //       ret(false);
              //         }
              //          }).catch(err => {
              //              console.log("locker dosen't exist");
              //              console.log('Error getting documents', err);
              //              ret(false);

              //         });
            }
          });
        } else {
          //console.log(" Inside Else 2 " );
          ret(findAVBLComp(lockerId));

          //     db.collection('compartment')
          //         .where('lockerId', '==', lockerId)
          //         .where('isAvailable', '==', "yes").limit(1)
          // .get()
          //         .then(snapshot => {
          //             if(snapshot.size>0){
          //                 snapshot.forEach(doc => {

          //     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
          //     console.log("FOUND Y An available compartment as "+ doc.data().compartmentId);
          //   console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");

          // //Putting a compartment on hold

          // db.collection("compartment").doc(doc.id).update({"isAvailable" : "hold"}).then(ref => {
          //        console.log("compartment "+ doc.data().compartmentId +" under booking process, put on hold.");
          //        //return true;
          //       })
          //       .catch(err => {
          //        console.log("Error ",err);
          //   });

          //                 ret(doc.data().compartmentId);
          //                 });
          //             }
          //             else{
          //        console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
          //                 console.log("SORRY, all compartments are occupied.");
          //                 console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");
          //        ret(false);
          //             }
          //             })
          //             .catch(err => {
          //                 console.log("locker dosen't exist");
          //                 console.log('Error getting documents', err);
          //                 ret(false);

          //            });
        }
      })
      .then(function(result) {
        //console.log(" Result " + result);
        return result;
      });
  });
}

// Checking available compartments end

//Check available compartment begin

function checkCompartmentAvailablity(lockerId, compartmentId) {
  //console.log("lockerId, compartmentId >" +lockerId + " "+ compartmentId);

  return (
    db
      .collection("compartment")
      .where("compartmentId", "==", compartmentId)
      .where("lockerId", "==", lockerId)
      .where("isAvailable", "==", "yes")
      // .doc(compartmentId)
      .get()
      .then(snapshot => {
        if (snapshot.size > 0) {
          snapshot.forEach(doc => {
            console.log(
              "CCA compartment available > " + doc.data().compartmentId
            );
          });

          return true;
        } else if (snapshot.size <= 0) {
          console.log(compartmentId + " > No such compartment found.");
          return false;
        }
        //else{

        //console.log("CCA compartment is not available.");
        //  return(false);
        //}
      })
      .catch(err => {
        console.log("Error getting documents", err);
        return false;
      })
  );
}
//Check available compartment end
//Unlock available compartment Start

function openCompartment(lockerId, compartmentData, txnData, RFID_No) {
  //console.log("Inside open Comp > "+ lockerId +"  "+compartmentData + " RFID_No "+RFID_No+" txnData "+txnData);

  var query = db
    .collection("transactions")
    .doc(RFID_No)
    .collection("swipes")
    .orderBy("EntryTime", "desc")
    .limit(1);
  return new Promise(ret => {
    return query.get(getOptions).then(snapshot1 => {
      if (snapshot1.size > 0) {
        snapshot1.forEach(doc1 => {
          var timeDifference = Math.abs(
            new Date().getTime() - doc1.data().EntryTime
          );
          var diffInHrs = timeDifference / (1000 * 3600);
          var diffInMins = timeDifference / (1000 * 60);

          var bookingTime = doc1.data().BookingTime;
          var exitTime = doc1.data().ExitTime;
          var compId = doc1.data().CompId;
          var entryTime = doc1.data().EntryTime;

          // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
          console.log(
            "SWIPED, Last one at " +
              diffInHrs.toString().substr(0, 5) +
              " hours before or " +
              diffInMins.toString().substr(0, 5) +
              " mins before. Doc Id - " +
              doc1.id
          );
          // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");
          //Play Sound
          //  playSound(s8);

          if (bookingTime == "" && exitTime == "") {
            if (parseInt(diffInMins) <= 3) {
			
	      if(true){
		  
		
		 //Lock the compartment
		  var txnData = { BookingTime: now };
		  ret(transactionUpdate(RFID_No, doc1.id, txnData));

              console.log("LOCKING, compartment with id " + compId.white.bold);
              // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");
              //Play Sound
              playSound(compId, "s9");

              var compData = { isAvailable: "no", isLocked: true };

              //derive doc id from comp name

              db.collection("compartment")
                .where("compartmentId", "==", compId)
                .where("isActive", "==", true)
                .get()
                .then(snapshot => {
                  if (snapshot.size > 0) {
                    snapshot.forEach(docx => {
                      db.collection("compartment")
                        .doc(docx.id)
                        .update(compData)
                        .then(ref => {
                          console.log(
                            "COMPARTMENT OCCUPIED. Command sent to the compartment as " +
                              JSON.stringify(compData)
                          );
                          //Play Sound
                          //    playSound(s10);
                        })
                        .catch(err => {
                          console.log("Error ", err);
                        });

                      //console.log("Compartment Found with Id as "+docx.data().compartmentId+" ||\n" + docx.id);
                      ret(true);
                    });
                  } else {
                    //console.log("Compartment Not Found.");
                    ret(false);
                  }
                })
                .catch(err => {
                  console.log("Error getting documents", err);
                  ret(false);
				});
			}	
            } else {
              //console.log("iffInMins > 3 bookingTime == && exitTime == ");

			  //update booking time
			  
			  if(true){
              var txnData = {
                BookingTime: "NOT BOOKED",
                ExitTime: "NOT BOOKED"
              };
              ret(transactionUpdate(RFID_No, doc1.id, txnData));

              // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
              console.log(
                "NOT BOOKED, Releasing compartment with id " +
                  doc1.data().CompId.white.bold
              );
              // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");
              //Play Sound
              playSound(doc1.data().CompId, "s11");

              var compData = { isAvailable: "yes", isLocked: true };
              ret(compUpdate(compId, lockerId, compData));

            }
		}
            //}else if(parseInt(diffInMins) > 3 && exitTime == "" && bookingTime != ""){
          } else if (exitTime == "" && bookingTime != "") {
            //console.log("exitTime ==  && bookingTime != ");
            //update exit time

            //console.log("Inside Exit Time ");

            var txnData = { ExitTime: now };
            ret(transactionUpdate(RFID_No, doc1.id, txnData));

            //Open Compartment
            // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            console.log("UNLOCKING, compartment with id " + compId.white.bold);
            //     console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");
            //Play Sound
            playSound(compId, "s12");
            var compData1 = { isAvailable: "yes", isLocked: false };

            //derive doc id from comp name
            ret(compUpdate(compId, lockerId, compData1));

          } else if (exitTime != "" && bookingTime != "") {
            //console.log(" exitTime != && bookingTime != of " + doc1.id);
            // Get New Available Compartment
            getAvblCompartment(lockerId, RFID_No)
              .then(function(resp1) {
                if (resp1) {
                  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                  console.log(
                    "UNLOCKING, compartment with id " + resp1.white.bold
                  );
                  //   console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");
                  //Play Sound
                  //       playSound(s12);
                  var compData1 = { isAvailable: "hold", isLocked: false };

                  //derive doc id from comp name
                  ret(compUpdate(resp1, lockerId, compData1));

                  var txnData = {
                    LockerId: lockerId,
                    EntryTime: now,
                    CompId: resp1,
                    BookingTime: "",
                    ExitTime: ""
                  };
                  ret(transactionAdd(RFID_No, txnData));

                } else {
                  console("CAN'T BOOK, SORRY!");
                  //Play Sound
                  //    playSound(s14);
                }
              })
              .catch(err => {
                ///console.log(" 2 Error in finding a new available compartment. ",err);
                return false;
              });
          } else {
            console.log(
              "SWIPE Z EntryTime " +
                EntryTime +
                " BookingTime " +
                BookingTime +
                " ExitTime " +
                ExitTime +
                " diffInMins " +
                diffInMins
            );

            // Get New Available Compartment
            getAvblCompartment(lockerId, RFID_No)
              .then(function(resp1) {
                if (resp1) {
                  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                  console.log(
                    "UNLOCKING, compartment with id " + resp1.white.bold
                  );
                  // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");
                  //Play Sound
                  //     playSound(s15);
                  var compData1 = { isAvailable: "hold", isLocked: false };

                  //derive doc id from comp name
                  ret(compUpdate(resp1, lockerId, compData1));
                  var txnData = {
                    LockerId: lockerId,
                    EntryTime: now,
                    CompId: resp1,
                    BookingTime: "",
                    ExitTime: ""
                  };
                  ret(transactionAdd(RFID_No, lockerId, resp1));
                } else {
                  console.log("CAN'T BOOK, SORRY!");
                  //Play Sound
                  // playSound(s14);
                }
              })
              .catch(err => {
                ////console.log("Error in finding a new available compartment. ", err );
                return false;
              });
          }
        });
      } else {
        // Get New Available Compartment
        getAvblCompartment(lockerId, RFID_No)
          .then(function(resp1) {
            if (resp1) {
              //     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
              console.log("UNLOCKING, compartment with id " + resp1.white.bold);
              //     console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");
              //Play Sound
              //   playSound(s15);
              var compData1 = { isAvailable: "hold", isLocked: false };

              //derive doc id from comp name
              ret(compUpdate(resp1, lockerId, compData1));

              db.collection("transactions")
                .doc(RFID_No)
                .collection("swipes")
                .add({
                  LockerId: lockerId,
                  EntryTime: now,
                  CompId: resp1,
                  BookingTime: "",
                  ExitTime: ""
                })
                .then(ref => {
                  //    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                  console.log(
                    "FIRST TIME SWIPED, creating a new transaction " + ref.id
                  );
                  //   console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");
                  //Play Sound
                  //     playSound(s16);
                })
                .catch(err => {
                  console.log("Error Capturing SWIPES ", err);
                  return false;
                });
            } else {
              console.log("CAN'T BOOK, SORRY!");
              //Play Sound
              //    playSound(s14);
            }
          })
          .catch(err => {
            ///console.log("1 Error in finding a new available compartment. ", err );
            return false;
          });
      }
    });
  });
}

//Unlock available compartment End

//RFID Processing begins

class USBProvider extends EventEmitter {
  constructor() {
    super();
    var self = this;
    this.onerror = function(e) {
      console.log("error: " + e);
    };
    this.getDeviceHandle = function() {
      return deviceHandle;
    };

    var SCAN_INTERVAL = 2000; // scan every 2 secs
    var VENDOR_ID = 0x8ff; // default vendor id
    var deviceHandle = null; // stores our handle
    var deviceRecord = null; // stores device record
    var stopKey = null; // to stop polling (if needed)

    // This will be called repeatedly by poll(), below
    function cycle() {
      var deviceFound = false;
      HID.devices().forEach(function(device, index, records) {
        //console.log("This device - "+device.vendorId, device.productId);

        deviceFound = device.vendorId == VENDOR_ID;

        if (device.vendorId == VENDOR_ID && deviceRecord == null) {
          deviceRecord = device;
          try {
            // Try to connect.
            deviceHandle = new HID.HID(device.vendorId, device.productId);

            deviceHandle.on("error", self.onerror);

            self.emit("usbconnect", deviceHandle);

            console.log("usbprovider: RFID Reader connected");
          } catch (e) {
            self.onerror("Exception caught:\n" + e);
            self.emit("usbexception", device);
          }
        } // if

        if (index == records.length - 1 && !deviceFound) {
          // HANDLE DISCONNECT EVENT
          if (deviceRecord != null) {
            deviceRecord = deviceHandle = null; // nullify record
            // self.ondisconnect();
            self.emit("usbdisconnect");

            console.log("usbprovider: RFID Reader disconnected");
          } // if
        } // if
      }); // forEach
    } // cycle

    this.poll = function() {
      this.stopKey = setInterval(cycle, SCAN_INTERVAL);
    };
  }
}
// Allow other modules to use this one:
module.exports = USBProvider;

// First, instantiate the provider
var usb = new USBProvider();

var deviceHandle = null; // We will store the device handle here

// Stores the RFID id as it reconstructs from the stream.
var Buffs = "";
var RFID_No = "";
var keymap = {
  "04": "A",
  "05": "B",
  "06": "C",
  "07": "D",
  "08": "E",
  "09": "F",
  "0a": "G",
  "0b": "H",
  "0c": "I",
  "0d": "J",
  "0e": "K",
  "0f": "L",
  "10": "M",
  "11": "N",
  "12": "O",
  "13": "P",
  "14": "Q",
  "15": "R",
  "16": "S",
  "17": "T",
  "18": "U",
  "19": "V",
  "1a": "W",
  "1b": "X",
  "1c": "Y",
  "1d": "Z",
  "1e": "1",
  "1f": "2",
  "20": "3",
  "21": "4",
  "22": "5",
  "23": "6",
  "24": "7",
  "25": "8",
  "26": "9",
  "27": "0",
  "28": "",
  "00": "",
  "\r": "",
  "(": "",
  "": ""
};
var buffsCount = 0;

// Set up a connection handler. Inside it, set the data handler.
usb.on("usbconnect", function(h) {
  //console.log("Inside Usb on");

  deviceHandle = h; // cache the handle

  // set up a data handler (for reading data)
  deviceHandle.on("data", data => {
    //console.log("data "+data.toString());
    //console.log("Inside device handle");

    buffsCount += 1;
    var Buf = Buffer.from([data[2]]);
    //console.log("Buf "+Buf.toString('ascii'));

    Buffs += keymap[Buf.toString("hex")];
    //console.log("Buffs "+Buffs);
    //console.log("buffsCount "+buffsCount);

    // do something with data...

    if (buffsCount == 22) {
      // when the buffer is in the right lenght do something with it

      RFID_No = Buffs;
      Buffs = "";
      buffsCount = 0;
      Buf = "";

      now = admin.firestore.Timestamp.now().toMillis();
      console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      console.log("RFID Card Detected as >> " + RFID_No);

      //console.log("buffsCount "+buffsCount);

      //Update Firebase
      //dbUpdate(false);

      //Validate RFID
      isRFIDValidAndActive(RFID_No).then(function(stat) {
        //console.log("Inside RFID validation");

        //check available compartments

        // var compId = getCompartmetList(lockerId);
        //getAvblCompartment(lockerId,RFID_No).then(function(resp1){

        // if(resp1){
        // console.log("Response from getAvblCompartment "+resp1);
        if (stat) {
          var compartmentData = { isAvailable: "hold", isLocked: false };
          //var txnData = {"LockerId":lockerId,"EntryTime" : now, "CompId" :resp1,"BookingTime" : "","ExitTime" : ""}
          var txnData = {
            LockerId: lockerId,
            EntryTime: now,
            BookingTime: "",
            ExitTime: ""
          };
          //add compartment id received from resp1
          openCompartment(lockerId, compartmentData, txnData, RFID_No).then(
            function(res2) {
              //Play Sound
              // playSound(s1);
              //TODO
              //Bring document id of the available compartment.
              //console.log("resp2 inside getAVBLComp >"+res2);

              //console.log("Response from openCompartment "+resp1);

              if (res2) {
                //console.log("Unlocking Compartment was successful.");
              } else {
                //console.log("Opening Compartment " + compartmentToBeOpened + " failed.");
              }

              //});
            }
          );
          //     }else{
          // console.log("CAN'T BOOK, SORRY!");
          // }
        } else {
          console.log("SORRY, This card is not registered with us.".red.bold);
          playSound("none", "s7");
        }
        var compartmentToBeOpened = "";
        var compartmentArray = "";
        var stopFor = false;

        //Unlock Available Compartment

        // });
      });
    }
  });
});

//RFID Processing ends

//call RFID polling loop
usb.poll();
















 await isCompOnHold(compId);


async function isCompOnHold(compId) {
    return new Promise(ret => {
        db.collection("compartment")
            .where("compartmentId", "==", compId)
            .get()
            .then(snapshot => {
            if (snapshot.size > 0) {
                snapshot.forEach(doc => {
                console.log("Found an compartment and it's details as follows - " + JSON.stringify(doc.data()));
               
                var isAvailable = doc.data().isAvailable;
                console.log("isAvailable value for "+compId +" is " + isAvailable);
                    if(isAvailable == 'hold'){                       
                        console.log("I m in if loop ");
                        ret(true);
                    }else {ret(false);}
                });
            } 
            })
            .catch(err => {
            console.log("Error getting documents", err);
            ret(false);
            });
        });
    }


//https://jsonplaceholder.typicode.com/todos/1

axios.get('https://jsonplaceholder.typicode.com/todos/1')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });















