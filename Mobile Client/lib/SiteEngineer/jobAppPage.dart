import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:my_project/BackGround.dart';
import 'package:my_project/SiteEngineer/CompleteSiteEngineer.dart';
import 'package:my_project/SiteEngineer/Job.dart';
import 'package:my_project/SiteEngineer/Task.dart';
import 'package:my_project/SiteEngineer/TaskCommentFormSiteEngineer.dart';
import 'package:my_project/SiteEngineer/updateSiteEngineer.dart';
import 'package:my_project/SiteEngineer/HomeSiteEngineer.dart';
import 'package:my_project/SiteEngineer/updatingJobForm.dart';
import 'package:my_project/service.dart';
import 'package:my_project/SiteEngineer/Task.dart';
import 'package:my_project/SiteEngineer/JobCommentFormSiteEngineer.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:my_project/SiteEngineer/inprogressSiteEngineer.dart';

class jobAppPage extends StatefulWidget {
  final int taskId;
  final String taskName;

  jobAppPage({Key? key, required this.taskId, required this.taskName})
      : super(key: key);

  @override
  _DisplayDataPageState createState() => _DisplayDataPageState();
}

Future<String?> getToken() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getString('jwt_token');
}

Future<List<Job>> getJobsByTasks(int taskId) async {
  //http://10.0.2.2:8080/api/job/api/task/19/jobs

  print("enter to the getJobsByTasks");
  final token = await getToken();
  if (token == null) {
    throw Exception('Token not found');
  }
  print("project name in ");

  final response = await http.get(
    Uri.parse("http://localhost:8080/senginner/task/$taskId/jobs"),
    headers: {
      //http://localhost:8080/api/task/all
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token',
    },
  );
  if (response.statusCode == 200) {
    final List<dynamic> jsonData = json.decode(response.body);
    return jsonData.map((jobData) => Job.fromJson(jobData)).toList();
  } else {
    throw Exception('Failed to load comment10');
  }
}

class _DisplayDataPageState extends State<jobAppPage> {
  //List<bool> rememberMeList = List.generate(100, (index) => false); // Assuming a maximum of 100 items
  Map<int, bool> isFocused = {};
  final TextEditingController searchingcontroller = TextEditingController();
  final TextEditingController controller5 = TextEditingController();
  String projectName = 'My Project 01';
  String projectSubName = 'The Galle Techno-Park';
  Service service = Service();
  List<String> savedData = [];

  void toDoGoToNewOne() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const updateSite()),
    );
  }

  void inprogressGoToComplete() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const completeSite()),
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
                        decoration: const BoxDecoration(),
                        alignment: Alignment.topLeft,
                        child: IconButton(
                          icon: const Icon(
                            Icons.arrow_back,
                            color: Color.fromRGBO(0, 31, 63, 1),
                            size: 30,
                          ),
                          onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => const inProgressSite()),
                            );
                          },
                        ),
                      ),
                      Row(children: [
                        Image.asset(
                          'asset/campany logo.jpg',
                          width: 50.0, // Set the width as needed
                          height: 50.0, // Set the height as needed
                          fit: BoxFit.cover, // Set the height as needed
                        ),
                      ]),
                    ]),
                    Row(children: [
                      const SizedBox(
                        width: 50,
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            color: const Color.fromARGB(255, 255, 255, 255),
                            child: Text(
                              '$projectName',
                              style: const TextStyle(
                                color: Color.fromRGBO(50, 75, 101, 1),
                                fontSize: 20.0,
                                fontWeight: FontWeight.bold,
                                fontFamily: 'Inter',
                              ),
                            ),
                          ),
                          Container(
                            color: const Color.fromARGB(255, 255, 255, 255),
                            child: Text(
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
                    ]),
                    const Padding(padding: EdgeInsets.all(7)),
                    SizedBox(
                        width: 290,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
/* ..............................In Progress button end............................. */

/* ..............................to-do button............................. */

                            Container(
                                width: 92,
                                height: 46,
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(19.0),
                                    color: const Color.fromRGBO(0, 31, 63, 1),
                                    border: Border.all(
                                      color: const Color.fromRGBO(0, 31, 63, 1),
                                      width: 1.0,
                                    )),
                                child: const Center(
                                  child: Text(
                                    'To-Do',
                                    style: TextStyle(
                                      color: Color.fromARGB(255, 255, 255, 255),
                                      fontSize: 20.0,
                                      fontWeight: FontWeight.bold,
                                      fontFamily: 'Inter',
                                    ),
                                    // textAlign: TextAlign.top,
                                  ),
                                )),
                            Container(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    "Task Name",
                                    style: TextStyle(
                                      color: Color.fromRGBO(0, 31, 63, 1),
                                      fontSize: 14.0,
                                      fontWeight: FontWeight.bold,
                                      fontFamily: 'Inter',
                                    ),
                                  ),
                                  Text(
                                    widget.taskName,
                                    style: TextStyle(
                                      color: Color.fromRGBO(0, 31, 63, 1),
                                      fontSize: 18.0,
                                      fontWeight: FontWeight.bold,
                                      fontFamily: 'Inter',
                                    ),
                                  ),
                                ],
                              ),
                            )

                            /* ..............................to-do button end............................. */
                          ],
                        )),
                    const Padding(padding: EdgeInsets.all(2)),
                    SizedBox(
                        width: 284,
                        //Color:Colors.amber,
                        child: Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              Container(
                                color: const Color.fromARGB(255, 255, 255, 255),
                                child: const Text(
                                  'Done',
                                  style: TextStyle(
                                    color: Color.fromRGBO(102, 120, 139, 1),
                                    fontSize: 14.0,
                                    fontWeight: FontWeight.bold,
                                    fontFamily: 'Inter',
                                  ),
                                ),
                              ),
                              const Padding(
                                padding: EdgeInsets.all(10),
                              ),
                              Container(
                                color: const Color.fromARGB(255, 255, 255, 255),
                                child: const Text(
                                  'Comment',
                                  style: TextStyle(
                                    color: Color.fromRGBO(102, 120, 139, 1),
                                    fontSize: 14.0,
                                    fontWeight: FontWeight.bold,
                                    fontFamily: 'Inter',
                                  ),
                                ),
                              )
                            ])),
                    Center(
                      child: SizedBox(
                        height: 450,
                        width: 300,
                        child: SingleChildScrollView(
                          child: FutureBuilder<List<Job>>(
                            future: getJobsByTasks(widget.taskId),
                            builder: (context, snapshot) {
                              if (snapshot.connectionState ==
                                  ConnectionState.waiting) {
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
                                      color:
                                          const Color.fromRGBO(255, 227, 76, 1),
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(12),
                                        side: const BorderSide(
                                          color: Colors.black,
                                          width: 1.0,
                                        ),
                                      ),
                                      child: Row(
                                        mainAxisSize: MainAxisSize.min,
                                        children: [
                                          Expanded(
                                            child: ListTile(
                                              title: Text(
                                                '${job.jobName}',
                                                style: const TextStyle(
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.bold,
                                                  fontFamily: 'Inter',
                                                ),
                                              ),
                                            ),
                                          ),
                                          Row(
                                              mainAxisSize: MainAxisSize.min,
                                              children: [
                                                const Padding(
                                                    padding:
                                                        EdgeInsets.all(19)),
                                                GestureDetector(
                                                  onTap: () {
                                                    // Add your navigation logic here

                                                    Navigator.push(
                                                      context,
                                                      MaterialPageRoute(
                                                        builder: (context) =>
                                                            JobCommentSite(
                                                                jobId:
                                                                    job.jobId,
                                                                jobName: job
                                                                    .jobName),
                                                      ),
                                                    );
                                                  },
                                                  child: const Icon(
                                                    Icons.add_box_outlined,
                                                    size: 24.0,
                                                  ),
                                                ),
                                                const Padding(
                                                    padding: EdgeInsets.all(0)),
                                                PopupMenuButton<String>(
                                                  onSelected: (String value) {
                                                    if (value == 'Delete') {
                                                      _deleteData(job.jobId);
                                                    } else if (value ==
                                                        'Edit') {
                                                      Navigator.push(
                                                        context,
                                                        MaterialPageRoute(
                                                          builder: (context) =>
                                                              UpdatingJobForm(
                                                            jobId: job.jobId,
                                                            jobName:
                                                                job.jobName,
                                                            description:
                                                                job.description,
                                                            startDate:
                                                                job.startDate,
                                                            endDate:
                                                                job.endDate,
                                                            task: job.task,
                                                          ),
                                                        ),
                                                      );
                                                    }
                                                  },
                                                  itemBuilder: (BuildContext
                                                          context) =>
                                                      <PopupMenuEntry<String>>[
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
                                              ]),
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
                    ),
                    const Padding(padding: EdgeInsets.all(10)),
                    Center(
                      child: SizedBox(
                        width: 284,
                        height: 42,
                        child: ElevatedButton(
                          onPressed: () {},
                          style: ElevatedButton.styleFrom(
                            primary: const Color.fromRGBO(
                                0, 31, 63, 1), // Background color
                            onPrimary: const Color.fromARGB(
                                255, 255, 255, 255), // Text color
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(
                                  75.0), // Rounded corners
                            ),
                          ),
                          child: const Text(
                            'Add',
                            style: TextStyle(
                              fontSize: 19,
                              fontFamily: 'Intel',
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                )),
          ],
        ),
      ),
    );
  }

  void _editData(int taskId, String taskName, String description,
      DateTime startDate, DateTime endDate, int projectId) async {
    String updatedTask = ''; // Initialize the updated comment text
    print("object edit 04");
    try {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text("Edit Comment"),
            content: TextField(
              controller: TextEditingController(text: updatedTask),
              onChanged: (newValue) {
                setState(() {
                  if (newValue.isNotEmpty) {
                    print("object edite 5");
                    updatedTask = newValue;
                    print("object edite 6");
                  } else {
                    // Handle empty value here, if needed
                  }
                });
              },
            ),
            actions: <Widget>[
              TextButton(
                onPressed: () async {
                  print("object edite 01");
                  Navigator.of(context).pop(); // Close the dialog
                  // Call the service method to update the comment
                  print(taskId);
                  await service.updateTask(taskId, updatedTask, description,
                      startDate, endDate, projectId);
                  // Handle the result as needed
                  print("object edite 03");
                },
                child: const Text('Update'),
              ),
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: const Text("Cancel"),
              ),
            ],
          );
        },
      );
    } catch (e) {
      // Handle error
      print(e.toString());
    }
  }

  void _deleteData(int jobId) async {
    print(jobId);
    try {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text(
              "Warrning",
              style: TextStyle(
                color: Color.fromRGBO(50, 75, 101, 1),
                fontSize: 24.0,
                fontWeight: FontWeight.bold,
                fontFamily: 'Inter',
              ),
            ),
            content: const Text("Are you sure you want to delete this Job ?",
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

                  AlertDialog(
                    icon: const Icon(Icons.delete_outlined),
                    content:
                        const Text("Are you sure you want to delete this Job ?",
                            style: TextStyle(
                              color: Color.fromRGBO(50, 75, 101, 1),
                              fontSize: 16.0,
                              fontWeight: FontWeight.normal,
                              fontFamily: 'Inter',
                            )),
                    actions: <Widget>[
                      TextButton(
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                        child: const Text("OK"),
                      ),
                    ],
                  );

                  Navigator.of(context).pop();
                },
                child: const Text("OK"),
              ),
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: const Text("Cancel"),
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
            title: const Text("Error"),
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
