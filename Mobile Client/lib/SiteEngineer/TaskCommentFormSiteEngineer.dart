import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:my_project/BackGround.dart';
import 'package:my_project/service.dart';
import 'package:my_project/SiteEngineer/CommentTasks.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:my_project/SiteEngineer/inprogressSiteEngineer.dart';

class TaskCommentSite extends StatefulWidget {
  final int taskId;
  final String taskName;

  TaskCommentSite({Key? key, required this.taskId, required this.taskName})
      : super(key: key);

  @override
  State<TaskCommentSite> createState() => _ProjectSiteState();
}

Future<String?> getToken() async {
  final prefs = await SharedPreferences.getInstance();

  return prefs.getString('jwt_token');
}

Future<List<Comment>> getCommentByTask(int taskId) async {
  print("enter to the getCommentByTask");
  print("taskID: $taskId *************");
  final token = await getToken();
  if (token == null) {
    throw Exception('Token not found');
  }
  print(token);
  print("project getCommentByTask out");
  final response = await http.get(
    Uri.parse("http://localhost:8080/sengineer/comment/task/$taskId"),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token',
    },
  );
  print("project getCommentByTask out end point");
  if (response.statusCode == 200) {
    final List<dynamic> jsonData = json.decode(response.body);
    print('obect future get method');

    return jsonData
        .map((commentData) => Comment.fromJson(commentData))
        .toList();
  } else {
    throw Exception('Failed to load comment10');
  }
}

class _ProjectSiteState extends State<TaskCommentSite> {
  TextEditingController searchingController = TextEditingController();
  TextEditingController controllertaskscomment1 = TextEditingController();

  late Future<Comment> displayComments;

  String projectName = 'My Project 01';
  String projectSubName = 'The Galle Techno-Park';
  String selectedValue = 'project manager';
  bool value = true;
  String userInput = '';
  List<String> savedData = [];
  Service service = Service();

  @override
  void initState() {
    super.initState();
    tasksName = widget.taskName;
    print("object3");
  }

  late String tasksName;
  DateTime _dateTime3 = DateTime.now();

  void _showDatePicker3() {
    showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2024),
      lastDate: DateTime(2100),
    ).then((value3) {
      setState(() {
        _dateTime3 = value3!;
      });
    });
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
                  Row(
                    children: [
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
                                  builder: (context) => inProgressSite()),
                            );
                          },
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
                        ],
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      const SizedBox(
                        width: 50,
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            color: const Color.fromARGB(255, 255, 255, 255),
                            child: Text(
                              '$projectName- Comment',
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
                      ),
                    ],
                  ),
                  const Padding(padding: EdgeInsets.all(7)),
                  Column(
                    children: [
                      Container(
                          width: 284,
                          height: 580,
                          decoration: BoxDecoration(
                            color: const Color.fromRGBO(255, 215, 0, 1),
                            borderRadius: BorderRadius.circular(19),
                            border: Border.all(
                              color: Colors.black,
                              width: 1.0,
                            ),
                          ),
                          child: Column(children: [
                            Center(
                              child: Container(
                                width: 255,
                                height: 560,
                                decoration: BoxDecoration(
                                  color: const Color.fromRGBO(255, 215, 0, 1),
                                  borderRadius: BorderRadius.circular(19),
                                  border: Border.all(
                                    color: const Color.fromRGBO(255, 215, 0, 1),
                                    width: 1.0,
                                  ),
                                ),
                                child: Column(
                                  children: [
                                    const Padding(padding: EdgeInsets.all(10)),
                                    Row(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          'Task name: $tasksName ',
                                          style: const TextStyle(
                                            color:
                                                Color.fromRGBO(50, 75, 101, 1),
                                            fontSize: 16.0,
                                            fontWeight: FontWeight.bold,
                                            fontFamily: 'Inter',
                                          ),
                                        ),
                                      ],
                                    ),
                                    const Padding(padding: EdgeInsets.all(3)),
                                    const Row(
                                      children: [
                                        Text(
                                          'Comment:',
                                          textAlign: TextAlign.start,
                                          style: TextStyle(
                                            color:
                                                Color.fromRGBO(50, 75, 101, 1),
                                            fontSize: 16.0,
                                            fontWeight: FontWeight.bold,
                                            fontFamily: 'Inter',
                                          ),
                                        ),
                                      ],
                                    ),
                                    const Padding(padding: EdgeInsets.all(3)),
                                    Column(
                                      children: [
                                        Row(
                                          children: [
                                            SizedBox(
                                              width:
                                                  250, // Adjust the width as needed
                                              height:
                                                  80, // Adjust the height as needed
                                              child: TextField(
                                                controller:
                                                    controllertaskscomment1,
                                                onChanged: (value) {
                                                  setState(() {
                                                    if (value.isNotEmpty) {
                                                      userInput = value;
                                                    } else {
                                                      // Handle empty value here, if needed
                                                    }
                                                  });
                                                },
                                                maxLines: 10,
                                                decoration: InputDecoration(
                                                  filled: true,
                                                  fillColor:
                                                      const Color.fromRGBO(
                                                          255, 243, 178, 1),
                                                  border: OutlineInputBorder(
                                                    borderRadius:
                                                        BorderRadius.circular(
                                                            6.0),
                                                    borderSide:
                                                        const BorderSide(
                                                      color: Color.fromRGBO(
                                                          255, 243, 178, 1),
                                                    ),
                                                  ),
                                                  focusedBorder:
                                                      OutlineInputBorder(
                                                    borderRadius:
                                                        BorderRadius.circular(
                                                            6.0),
                                                    borderSide:
                                                        const BorderSide(
                                                      color: Color.fromRGBO(
                                                          50, 75, 101, 1),
                                                    ),
                                                  ),
                                                  labelStyle: const TextStyle(
                                                    fontSize: 12,
                                                    fontFamily: 'Inter',
                                                    color: Color.fromRGBO(
                                                        255, 243, 178, 1),
                                                  ),
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),

                                        //   const Padding(padding: EdgeInsets.all(5)),

                                        const Padding(
                                            padding: EdgeInsets.all(5)),
                                        const Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.start,
                                          children: [
                                            Text(
                                              'Previous Comments:',
                                              style: TextStyle(
                                                color: Color.fromRGBO(
                                                    50, 75, 101, 1),
                                                fontSize: 16.0,
                                                fontWeight: FontWeight.bold,
                                                fontFamily: 'Inter',
                                              ),
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                    const Padding(padding: EdgeInsets.all(5)),
                                    Column(
                                      children: [
                                        Center(
                                          child: SizedBox(
                                            height: 300,
                                            width: 250,
                                            child: SingleChildScrollView(
                                              child:
                                                  FutureBuilder<List<Comment>>(
                                                future: getCommentByTask(
                                                    widget.taskId),
                                                builder: (context, snapshot) {
                                                  if (snapshot
                                                          .connectionState ==
                                                      ConnectionState.waiting) {
                                                    print("object comment 7");
                                                    return CircularProgressIndicator();
                                                  } else if (snapshot
                                                      .hasError) {
                                                    print("object comment 9");
                                                    return Text(
                                                        'Error: ${snapshot.error}');
                                                  } else if (snapshot.hasData) {
                                                    print("object 10   new");
                                                    final List<Comment>
                                                        comments =
                                                        snapshot.data!;
                                                    return Column(
                                                      children: comments
                                                          .map((comment) {
                                                        print("card on");
                                                        return Card(
                                                          margin:
                                                              const EdgeInsets
                                                                  .all(5),
                                                          color: const Color
                                                              .fromRGBO(
                                                              255, 227, 76, 1),
                                                          shape:
                                                              RoundedRectangleBorder(
                                                            borderRadius:
                                                                BorderRadius
                                                                    .circular(
                                                                        12),
                                                            side:
                                                                const BorderSide(
                                                              color:
                                                                  Colors.black,
                                                              width: 1.0,
                                                            ),
                                                          ),
                                                          child: Column(
                                                            mainAxisSize:
                                                                MainAxisSize
                                                                    .min,
                                                            children: [
                                                              ListTile(
                                                                title: Text(
                                                                  'Task Name: ${widget.taskName} \nComment: ${comment.commentText}',
                                                                  style:
                                                                      const TextStyle(
                                                                    fontSize:
                                                                        15,
                                                                    fontWeight:
                                                                        FontWeight
                                                                            .bold,
                                                                    fontFamily:
                                                                        'Inter',
                                                                  ),
                                                                ),
                                                                subtitle: Text(
                                                                  'Date: ${comment.commentDate}',
                                                                  style:
                                                                      const TextStyle(
                                                                    fontSize:
                                                                        14,
                                                                    color: Color
                                                                        .fromARGB(
                                                                            255,
                                                                            103,
                                                                            102,
                                                                            102),
                                                                    fontFamily:
                                                                        'Inter',
                                                                  ),
                                                                ),
                                                              ),
                                                              Row(
                                                                mainAxisAlignment:
                                                                    MainAxisAlignment
                                                                        .end,
                                                                children: [
                                                                  IconButton(
                                                                    icon: const Icon(
                                                                        Icons
                                                                            .edit),
                                                                    onPressed:
                                                                        () {
                                                                      // Implement your edit functionality
                                                                      print(
                                                                          "object25");
                                                                      _editData(
                                                                          comment
                                                                              .commentId,
                                                                          comment
                                                                              .task
                                                                              .taskName,
                                                                          1,
                                                                          widget
                                                                              .taskId);
                                                                      print(
                                                                          "object24");
                                                                    },
                                                                  ),
                                                                  IconButton(
                                                                    icon: const Icon(
                                                                        Icons
                                                                            .delete),
                                                                    onPressed:
                                                                        () {
                                                                      // Implement your delete functionality
                                                                      print(
                                                                          " object delete 01");
                                                                      _deleteData(
                                                                          comment
                                                                              .commentId);
                                                                      print(
                                                                          "object delete 02");
                                                                    },
                                                                  ),
                                                                ],
                                                              ),
                                                            ],
                                                          ),
                                                        );
                                                      }).toList(),
                                                    );
                                                  } else {
                                                    return Text(
                                                        'No data available');
                                                  }
                                                },
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                    const Padding(padding: EdgeInsets.all(10)),
                                    Row(
                                      mainAxisAlignment: MainAxisAlignment.end,
                                      children: [
                                        SizedBox(
                                            width: 90,
                                            height: 37,
                                            child: ElevatedButton(
                                              onPressed: () {
                                                // Saving the comment using service

                                                if (userInput.isNotEmpty) {
                                                  setState(() {
                                                    savedData.add(userInput);
                                                    userInput =
                                                        ''; // Clear the input after saving
                                                    print(widget.taskId);
                                                    print(
                                                        controllertaskscomment1
                                                            .text);
                                                    service.saveComment(
                                                        widget.taskId,
                                                        controllertaskscomment1
                                                            .text,
                                                        1);

                                                    showDialog(
                                                      context: context,
                                                      builder: (context) =>
                                                          AlertDialog(
                                                        title: Text(
                                                            'Comment Submitted'),
                                                        content: Text(
                                                            'Your comment has been successfully submitted.'),
                                                        actions: [
                                                          TextButton(
                                                            onPressed: () {
                                                              Navigator.of(
                                                                      context)
                                                                  .pop();
                                                            },
                                                            child: Text('OK'),
                                                          ),
                                                        ],
                                                      ),
                                                    );

                                                    controllertaskscomment1
                                                        .clear(); // Clear the TextEditingController
                                                    _dateTime3 = DateTime
                                                        .now(); // Update dateTime
                                                  });
                                                } else {
                                                  // Handle the case when userInput is empty
                                                  showDialog(
                                                    context: context,
                                                    builder:
                                                        (BuildContext context) {
                                                      return AlertDialog(
                                                        title: Text('Error'),
                                                        content: Text(
                                                            'Please enter some data before saving.'),
                                                        actions: [
                                                          TextButton(
                                                            onPressed: () {
                                                              Navigator.of(
                                                                      context)
                                                                  .pop(); // Close the dialog
                                                            },
                                                            child: Text('OK'),
                                                          ),
                                                        ],
                                                      );
                                                    },
                                                  );
                                                }
                                              },
                                              style: ElevatedButton.styleFrom(
                                                primary: const Color.fromRGBO(
                                                    16,
                                                    0,
                                                    63,
                                                    1), // Background color
                                                onPrimary: const Color.fromARGB(
                                                    255,
                                                    255,
                                                    255,
                                                    255), // Text color
                                                shape: RoundedRectangleBorder(
                                                  borderRadius:
                                                      BorderRadius.circular(
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
                                            )),
                                        const Padding(
                                            padding: EdgeInsets.all(3)),
                                        SizedBox(
                                            width: 110,
                                            height: 37,
                                            child: ElevatedButton(
                                              onPressed: () {
                                                if (controllertaskscomment1
                                                    .text.isNotEmpty) {
                                                  setState(() {
                                                    savedData.add(
                                                        controllertaskscomment1
                                                            .text);
                                                    controllertaskscomment1
                                                        .clear(); // Reset the TextField
                                                  });
                                                }
                                              },
                                              style: ElevatedButton.styleFrom(
                                                primary: const Color.fromRGBO(
                                                    16,
                                                    0,
                                                    63,
                                                    1), // Background color
                                                onPrimary: const Color.fromARGB(
                                                    255,
                                                    255,
                                                    255,
                                                    255), // Text color
                                                shape: RoundedRectangleBorder(
                                                  borderRadius:
                                                      BorderRadius.circular(
                                                          75.0), // Rounded corners
                                                ),
                                                // padding:const EdgeInsets.symmetric(horizontal: 20, vertical: 16), // Adjust size here
                                              ),
                                              child: const Text(
                                                'Cancel',
                                                style: TextStyle(
                                                  fontSize: 19,
                                                  fontFamily: 'Intel',
                                                  fontWeight: FontWeight.bold,
                                                ),
                                              ),
                                            ))
                                      ],
                                    )
                                  ],
                                ),
                              ),
                            )
                          ]))
                    ],
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }

  void _editData(int commentId, String taskName, int userId, int taskId) async {
    String updatedComment = ''; // Initialize the updated comment text
    print("object edit 04");
    try {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text("Edit Comment"),
            content: TextField(
              controller: TextEditingController(text: updatedComment),
              onChanged: (newValue) {
                setState(() {
                  if (newValue.isNotEmpty) {
                    print("object edite 5");
                    updatedComment = newValue;
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
                  print(commentId);
                  await service.updateComment(
                      commentId, updatedComment, userId, taskId);
                  print("object edite 01");
                  Navigator.of(context).pop(); // Close the dialog

                  print("object edite 07");
                  // Update the comment text in the lis
                  //   savedData[commentId] = updatedComment;
                  print("object edite 02");
                  // Call the service method to update the comment

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

  void _deleteData(int commentId) async {
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
            content:
                const Text("Are you sure you want to delete this comment ?",
                    style: TextStyle(
                      color: Color.fromRGBO(50, 75, 101, 1),
                      fontSize: 16.0,
                      fontWeight: FontWeight.normal,
                      fontFamily: 'Inter',
                    )),
            actions: <Widget>[
              TextButton(
                onPressed: () {
                  service.deleteComment(commentId);
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
            content: Text("Failed to delete comment: $e"),
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
    setState(() {
      if (commentId >= 0 && commentId < savedData.length) {
        savedData.removeAt(commentId);
      } else {
        print("Invalid commentId: $commentId");
      }
    });
  }
}
