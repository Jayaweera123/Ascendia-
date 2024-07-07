import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:my_project/BackGround.dart';
import 'package:my_project/SiteEngineer/inProgressSiteEngineer.dart';
//import 'package:my_project/SiteEngineer/inProgressSiteEngineer.dart';
import 'package:my_project/SiteEngineer/updateSiteEngineer.dart';
//import 'package:my_project/coponents/signupButon.dart';
//import 'package:my_project/ConstentParts.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:my_project/SiteEngineer/Task.dart';
import 'package:my_project/service.dart';
import 'package:my_project/SiteEngineer/jobAppCompletedPage.dart';

class completeSite extends StatefulWidget {
  const completeSite({Key? key}) : super(key: key);

  @override
  State<completeSite> createState() => _ProjectSiteState();
}

Future<String?> getToken() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getString('jwt_token');
}

Future<int?> getProjectId() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getInt('project_id');
}

Future<List<Task>> getAllCompletedTasks(int projectId) async {
  print("enter to the getAllProjectByToken");
  final token = await getToken();
  if (token == null) {
    throw Exception('Token not found');
  }
  print("project name");

  final response = await http.get(
    //http://10.0.2.2:8080/projects/user
    Uri.parse(
        "http://localhost:8080/supervisor/api/task/$projectId/completed"), //http://localhost:8080/api/task/api/task/$projectId/scheduled
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token',
    },
  );
  print("enter to the respones code");

  if (response.statusCode == 200) {
    final List<dynamic> jsonData = json.decode(response.body);
    return jsonData.map((taskData) => Task.fromJson(taskData)).toList();
  } else {
    throw Exception('Failed to load projects');
  }
}

class _ProjectSiteState extends State<completeSite> {
  final TextEditingController searchingcontroller = TextEditingController();
  String projectName = 'My Project 01';
  String projectSubName = 'The Galle Techno-Park';
  bool isFocused2 = false;
  final String buttonSignUp = 'Submit';
  bool rememberMeValue = false;
  final List<String> myDataList = [];

  Map<int, bool> isFocused = {};
  List<int> selectedTaskIds = [];

  Service service = Service();
  List<String> savedData = [];

  void toDoGoToNewOne() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const updateSite()),
    );
  }

  void toDoGoToNewOnecomplete() {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => inProgressSite(
            //   dataList: myDataList,

            ),
      ),
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
                                  builder: (context) => updateSite()),
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
                            /* ..............................In Progress button............................. */
                            InkWell(
                              onTap: toDoGoToNewOne,
                              child: Container(
                                  width: 108,
                                  height: 36,
                                  decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(19.0),
                                      color:
                                          const Color.fromRGBO(50, 75, 101, 1),
                                      border: Border.all(
                                        color:
                                            const Color.fromRGBO(0, 31, 63, 1),
                                        width: 1.0,
                                      )),
                                  child: const Center(
                                    child: Text(
                                      'In Progress',
                                      style: TextStyle(
                                        color: Color.fromRGBO(255, 215, 0, 1),
                                        fontSize: 16.0,
                                        fontWeight: FontWeight.bold,
                                        fontFamily: 'Inter',
                                      ),
                                      // textAlign: TextAlign.top,
                                    ),
                                  )),
                            ),

                            /* ..............................In Progress button end............................. */

/* ..............................to-do button............................. */
                            InkWell(
                              onTap: toDoGoToNewOnecomplete,
                              child: Container(
                                  width: 66,
                                  height: 36,
                                  decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(19.0),
                                      color:
                                          const Color.fromRGBO(50, 75, 101, 1),
                                      border: Border.all(
                                        color:
                                            const Color.fromRGBO(0, 31, 63, 1),
                                        width: 1.0,
                                      )),
                                  child: const Center(
                                    child: Text(
                                      'To-Do',
                                      style: TextStyle(
                                        color: Color.fromRGBO(255, 215, 0, 1),
                                        fontSize: 16.0,
                                        fontWeight: FontWeight.bold,
                                        fontFamily: 'Inter',
                                      ),
                                      // textAlign: TextAlign.top,
                                    ),
                                  )),
                            ),
                            /* ..............................to-do button end............................. */

/* ..............................Completed button............................. */

                            Container(
                                width: 101,
                                height: 36,
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(19.0),
                                    color: const Color.fromRGBO(255, 215, 0, 1),
                                    border: Border.all(
                                      color: const Color.fromRGBO(0, 31, 63, 1),
                                      width: 1.0,
                                    )),
                                child: const Center(
                                  child: Text(
                                    'Completed',
                                    style: TextStyle(
                                      color: Color.fromRGBO(50, 75, 101, 1),
                                      fontSize: 16.0,
                                      fontWeight: FontWeight.bold,
                                      fontFamily: 'Inter',
                                    ),
                                    // textAlign: TextAlign.top,
                                  ),
                                ))
                            /* ..............................Completed button end............................. */
                          ],
                        )),
                    const Padding(padding: EdgeInsets.all(10)),
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
                          child: FutureBuilder<List<Task>>(
                            future: getAllCompletedTasks(1),
                            builder: (context, snapshot) {
                              if (snapshot.connectionState ==
                                  ConnectionState.waiting) {
                                print("object   7");
                                return CircularProgressIndicator();
                              } else if (snapshot.hasError) {
                                print("object  9");
                                return Text('Error: ${snapshot.error}');
                              } else if (snapshot.hasData) {
                                print("object10");
                                final List<Task> tasks = snapshot.data!;
                                return Column(
                                  children: tasks.map((task) {
                                    // updateStatus(task.taskId);
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
                                                '${task.taskName}',
                                                style: const TextStyle(
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.bold,
                                                  fontFamily: 'Inter',
                                                ),
                                              ),
                                              onTap: () {
                                                Navigator.push(
                                                  context,
                                                  MaterialPageRoute(
                                                    builder: (context) =>
                                                        jobAppCompletedPage(
                                                      taskId: task.taskId,
                                                      taskName: task.taskName,
                                                    ),
                                                  ),
                                                );
                                              },
                                            ),
                                          ),
                                          Row(
                                              mainAxisSize: MainAxisSize.min,
                                              children: [
                                                GestureDetector(
                                                  onTap: () {
                                                    setState(() {
                                                      if (isFocused[
                                                              task.taskId] ==
                                                          true) {
                                                        isFocused[task.taskId] =
                                                            false;
                                                        selectedTaskIds.remove(
                                                            task.taskId);
                                                      } else {
                                                        isFocused[task.taskId] =
                                                            true;
                                                        selectedTaskIds
                                                            .add(task.taskId);
                                                      }
                                                    });
                                                  },
                                                  child: Icon(
                                                    (isFocused[task.taskId] ??
                                                            false)
                                                        ? Icons
                                                            .check_box_outlined
                                                        : Icons
                                                            .check_box_outline_blank, // Change icon based on isChecked
                                                  ),
                                                ),
                                                const Padding(
                                                    padding:
                                                        EdgeInsets.all(19)),
                                                GestureDetector(
                                                  onTap: () {},
                                                  child: const Icon(
                                                    Icons.add_box_outlined,
                                                    size: 24.0,
                                                  ),
                                                ),
                                                const Padding(
                                                    padding:
                                                        EdgeInsets.all(10)),
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
                    const Padding(padding: EdgeInsets.all(9)),
                    Center(
                      child: SizedBox(
                        width: 284,
                        height: 42,
                        child: ElevatedButton(
                          onPressed: selectedTaskIds.isNotEmpty
                              ? () async {
                                  for (int taskId in selectedTaskIds) {
                                    showDialog(
                                      context: context,
                                      builder: (BuildContext context) {
                                        return AlertDialog(
                                          title: const Text('Warning'),
                                          content: const Text(
                                              'Are you sure this is Incomplete?'),
                                          actions: <Widget>[
                                            TextButton(
                                              child: const Text('Cancel'),
                                              onPressed: () {
                                                Navigator.of(context)
                                                    .pop(); // Close the dialog
                                              },
                                            ),
                                            TextButton(
                                              child: const Text('OK'),
                                              onPressed: () {
                                                Navigator.of(context)
                                                    .pop(); // Close the first dialog

                                                // Show the success dialog
                                                showDialog(
                                                  context: context,
                                                  builder:
                                                      (BuildContext context) {
                                                    return AlertDialog(
                                                      title:
                                                          const Text('Success'),
                                                      content: const Text(
                                                          'Task is moved to in-progress list successfully!'),
                                                      actions: <Widget>[
                                                        TextButton(
                                                          child:
                                                              const Text('OK'),
                                                          onPressed: () {
                                                            service
                                                                .updateCompletedToInprogress(
                                                                    taskId);
                                                            Navigator.of(
                                                                    context)
                                                                .pop(); // Close the second dialog
                                                          },
                                                        ),
                                                      ],
                                                    );
                                                  },
                                                );
                                              },
                                            ),
                                          ],
                                        );
                                      },
                                    );
                                  }
                                  // Clear selectedTaskIds after execution if needed
                                  selectedTaskIds.clear();
                                }
                              : null,
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
                            'Reverse',
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

  void updateStatus(int taskId) async {
    await service.updateTaskStatus(taskId);
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

  void _deleteData(int taskId) async {
    print(taskId);
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
            content: const Text("Are you sure you want to delete this task ?",
                style: TextStyle(
                  color: Color.fromRGBO(50, 75, 101, 1),
                  fontSize: 16.0,
                  fontWeight: FontWeight.normal,
                  fontFamily: 'Inter',
                )),
            actions: <Widget>[
              TextButton(
                onPressed: () {
                  service.deleteTask(taskId);
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
