import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:my_project/BackGround.dart';
import 'package:my_project/SiteEngineer/Task.dart';
//import 'package:my_project/SiteEngineer/JobCommentFormSiteEngineer.dart';
import 'package:my_project/SiteEngineer/jobAddFormSiteEngineer.dart';
//import 'package:my_project/SiteEngineer/inProgressSiteEngineer.dart';
//import 'package:my_project/coponents/signupButon.dart';
//import 'package:my_project/ConstentParts.dart';
import 'package:http/http.dart' as http;
import 'package:my_project/SiteEngineer/Job.dart';
import 'package:my_project/service.dart';
import 'package:my_project/SiteEngineer/updatingJobForm.dart';


class JobAddSite extends StatefulWidget {
  const JobAddSite({Key? key}) : super(key: key);

  @override
  State<JobAddSite> createState() => _ProjectSiteState();
}

Future<List<Job>> getAllJobs() async {
  final response = await http.get(Uri.parse("http://10.0.2.2:8080/api/job/allJobs"));
  if(response.statusCode == 200){
    final List<dynamic> jsonData = json.decode(response.body);
    return jsonData.map((jobData) => Job.fromJson(jobData)).toList();
  }else{
    throw Exception('Failed to load comment10');
  }
  }





class _ProjectSiteState extends State<JobAddSite> {
  final TextEditingController searchingcontroller = TextEditingController();
  String projectName = 'My Project 01';
  String projectSubName = 'The Galle Techno-Park';
  bool isFocused2 = false;
    final String buttonSignUp='Submit';
    Service service = Service();

//create new job form

  void newJobFormGo() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) =>const JobbAddFormSite()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        resizeToAvoidBottomInset: false,
        body: Stack(
        
          children: [
            const background(), // Assuming Background is a widget from BackGround.dart

            Center(
              child: Container(
                height: 730,
                width: 334,
                decoration: BoxDecoration(
                  color: const Color.fromARGB(255, 255, 255, 255),
                  borderRadius: BorderRadius.circular(41),
                  border: Border.all(
                    color: Colors.black,
                    width: 1.0,
                  ),
                ),
              ),
            ),

            Container(

                height: 800,
                decoration: const BoxDecoration(),
            
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
            
                  children: [
                    const Padding(padding: EdgeInsets.only(top: 35)),
            
                    Row(children: [
                      const SizedBox(
                        width: 35,
                      ),
            
                      Container(
                        decoration: const BoxDecoration(
                            //color: Color.fromARGB(255, 114, 89, 13),
                            ),
                        alignment: Alignment.topLeft,
            
                        child: const Icon(
                          Icons.arrow_back,
                          color: Color.fromRGBO(0, 31, 63, 1),
                          size: 30,
                        ),
                      ),
            
                      Row(
                        children: [
                        Image.asset(
                          'asset/campany logo.jpg',
                          width: 50.0, // Set the width as needed
                          height: 50.0, // Set the height as needed
                          fit: BoxFit.cover, // Set the height as needed
                        ),
                      ]),
                    ]
                    ),
            
                    Row(children: [
                      const SizedBox(
                        width: 50,
                      ),
            
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                              
            Container(
              color:const Color.fromARGB(255, 255, 255, 255),
          
                           child:Text(
                              '$projectName- Tasks',
                              style: const TextStyle(
                                color: Color.fromRGBO(50, 75, 101, 1),
                                fontSize: 20.0,
                                fontWeight: FontWeight.bold,
                                fontFamily: 'Inter',
                              ),
                            ),
                          ),
            Container(
              color:const Color.fromARGB(255, 255, 255, 255),
           
                          child:Text(
                            projectSubName,
                            style: const TextStyle(
                              color: Color.fromRGBO(102, 120, 139, 1),
                              fontSize: 13.0,
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Inter',                              
                            ),
                            textAlign: TextAlign.left,
                          ),
 ),

                        ],
                      )
                    ]
                    ),

    const Padding(padding: EdgeInsets.all(2)),
InkWell(
  onTap: newJobFormGo, // Your function to handle the button press
  child:const SizedBox(
    width: 284,
    height: 30,
    child: Row(
      children: [
         Row(
          children: [
            Icon(
              Icons.add_circle_outlined,
              color: Color.fromRGBO(50, 75, 101, 1),
              size: 30,
            ),
            SizedBox(width: 8),
            Text(
              'Add Jobs',
              style: TextStyle(
                color: Color.fromRGBO(50, 75, 101, 1),
                fontWeight: FontWeight.bold,
                fontSize: 20.0,
                fontFamily: 'Inter',
              ),
            ),
          ],
        ),
      ],
    ),
  ),
),


const Padding(padding: EdgeInsets.all(3)),

Container(

  color: Colors.amber,
  width:284,
  height:550,
      child: SingleChildScrollView(
      child: FutureBuilder<List<Job>>(
        future: getAllJobs(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            print("object7");
            return CircularProgressIndicator();
          } else if (snapshot.hasError) {
            print("object9");
            return Text('Error: ${snapshot.error}');
          } else if (snapshot.hasData) {
            print("object10");
            final List<Job> jobs = snapshot.data!;
            return Column(
              children: jobs.map((job) {
                return Card(
  margin: const EdgeInsets.all(5),
  color: const Color.fromRGBO(255, 227, 76, 1),
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(12),
    side: const BorderSide(
      color: Colors.black,
      width: 1.0,
    ),
  ),
  child: Column(
    children: [
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: ListTile(
              title: Text(
                'Task Name: ${job.task.taskName}\nJob Name: ${job.jobName}',
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  fontFamily: 'Inter',
                ),
              ),
            ),
          ),
          PopupMenuButton<String>(
            onSelected: (String value) {
              if (value == 'Delete') {
                // Implement delete functionality
                _deleteData( job.jobId);
              } else if (value == 'Edit') {
                // Implement edit functionality         
              
                                    Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                        builder: (context) => UpdatingJobForm(
                                          jobId:job.jobId,
                                          jobName: job.jobName,
                                          description: job.description,
                                          startDate: job.startDate,
                                          endDate: job.endDate,
                                          task: job.task,
                                        ),
                                      ),
                                    );

              }
            },
            itemBuilder: (BuildContext context) => <PopupMenuEntry<String>>[
              const PopupMenuItem<String>(
                value: 'Delete',
                child: Text('Delete'),
              ),
              const PopupMenuItem<String>(
                value: 'Edit',
                child: Text('Edit'),
              ),
            ],
          ),
        ],
      ),
      Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
        child: Text(
          job.description,
          style: const TextStyle(
            color: Color.fromRGBO(50, 75, 101, 1),
            fontSize: 12,
            fontWeight: FontWeight.bold,
            fontFamily: 'Inter',
          ),
        ),
      ),


      Padding(
        padding: const EdgeInsets.symmetric( vertical: 8.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            Text(
              '${job.startDate.year}-${job.startDate.month}-${job.startDate.day}',               //'${_dateTime2.year}/${_dateTime2.month}/${_dateTime2.day}'
              style: const TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.bold,
                fontFamily: 'Inter',
              ),
            ),
            const SizedBox(width: 16),
            Text(
              '${job.endDate.year}-${job.endDate.month}-${job.endDate.day}',
              style: const TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.bold,
                fontFamily: 'Inter',
              ),
            ),
        
    ]
      ),
      )

    ],
  ),
);

              }).toList(),
            );
          } else {
            return Text('No data available');
          }
        },
      ),
    ),
),


                  ],
                )
                ),

          ],
        ),
      ),
    );
  }

void _deleteData(int jobId) async {
  print(jobId);
  try {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title:const Text("Warrning",
            style: TextStyle(
            color: Color.fromRGBO(50, 75, 101, 1),
            fontSize: 24.0,
            fontWeight: FontWeight.bold,
            fontFamily: 'Inter',
            ),
          ),
          content:const Text("Are you sure you want to delete this task ?",
            style: TextStyle(
            color: Color.fromRGBO(50, 75, 101, 1),
            fontSize: 16.0,
            fontWeight: FontWeight.normal,
            fontFamily: 'Inter',
            )),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                     service.deleteJob(jobId);
                Navigator.of(context).pop(    );
              },
              child:const Text("OK"),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child:const Text("Cancel"),
            ),
          ],

        );
      },
    );
    // Call the deleteComment method with the appropriate comment ID
 

    // Handle the result, for example
  } catch (e) {
    // Handle error, for example:
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title:const Text("Error"),
          content: Text("Failed to delete task: $e"),          
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text("OK"),
            ),
          ],
        );
      },
    );
  }
 
}







}
