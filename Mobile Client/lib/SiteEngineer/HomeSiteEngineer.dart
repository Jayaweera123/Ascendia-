import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:my_project/BackGround.dart';
import 'package:my_project/SiteEngineer/tasksSiteEngineer.dart';
//import 'package:my_project/ConstentParts.dart';
import 'package:my_project/SiteEngineer/projectListSiteEngineer.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'package:my_project/SiteEngineer/Project.dart';

class HomeSite extends StatefulWidget {
  const HomeSite({Key? key}) : super(key: key);

  @override
  State<HomeSite> createState() => _ProjectSiteState();
}

class _ProjectSiteState extends State<HomeSite> {
  final TextEditingController searchingcontroller = TextEditingController();
  String projectName = 'My Project 01';
  String projectSubName = 'The Galle Techno-Park';
  bool isFocused2 = false;

  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('jwt_token');
  }

  Future<List<Project>> getAllProjectByToken() async {
    print("enter to the getAllProjectByToken");
    final token = await getToken();
    if (token == null) {
      throw Exception('Token not found');
    }
    print("project name");

    final response = await http.get(
      Uri.parse("http://localhost:8080/projects/user"),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
    );
    print("enter to the respones code");

    if (response.statusCode == 200) {
      final List<dynamic> jsonData = json.decode(response.body);
      return jsonData
          .map((projectData) => Project.fromJson(projectData))
          .toList();
    } else {
      throw Exception('Failed to load projects');
    }
  }

  void homeToTasks() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const tasksSite()),
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
                                  builder: (context) => projectList()),
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
                            decoration: const BoxDecoration(),
                            child: Text(
                              projectName,
                              style: const TextStyle(
                                color: Color.fromRGBO(50, 75, 101, 1),
                                fontSize: 20.0,
                                fontWeight: FontWeight.bold,
                                fontFamily: 'Inter',
                              ),
                            ),
                          ),
                          Text(
                            projectSubName,
                            style: const TextStyle(
                              color: Color.fromRGBO(102, 120, 139, 1),
                              fontSize: 13.0,
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Inter',
                            ),
                          ),
                        ],
                      )
                    ]),
                    Center(
                      child: SizedBox(
                        height: 550,
                        width: 300,
                        child: SingleChildScrollView(
                          child: FutureBuilder<List<Project>>(
                            future: getAllProjectByToken(),
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
                                final List<Project> projects = snapshot.data!;
                                return Column(
                                  children: projects.map((project) {
                                    //   updateStatus(task.taskId);
                                    return Card(
                                      margin: const EdgeInsets.all(5),
                                      color: Color.fromARGB(255, 255, 255, 255),
                                      child: Column(
                                        children: [
                                          ListTile(
                                            title: Text(
                                              project.projectName,
                                              style: const TextStyle(
                                                fontSize: 17,
                                                fontWeight: FontWeight.bold,
                                                fontFamily: 'Inter',
                                              ),
                                            ),
                                            subtitle: Column(
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.start,
                                              children: [
                                                const SizedBox(height: 10),
                                                Image.network(
                                                  'http://localhost:8080/${project.image}', // Adjust the path as needed
                                                  height: 150,
                                                  width: double.infinity,
                                                  fit: BoxFit.cover,
                                                ),
                                                const SizedBox(height: 20),
                                                Text(
                                                  project.projectDescription,
                                                  style: const TextStyle(
                                                    fontSize: 13,
                                                    color: Colors.black,
                                                  ),
                                                ),
                                                const SizedBox(height: 5),
                                                Text(
                                                  '\nStart Date: ${project.createdDate.year}-0${project.createdDate.month}-0${project.createdDate.day}',
                                                  style: const TextStyle(
                                                    fontSize: 15,
                                                    fontWeight: FontWeight.bold,
                                                    color: Colors.black,
                                                  ),
                                                ),
                                                Text(
                                                  'End Date: ${project.endDate.year}-0${project.endDate.month}-0${project.endDate.day}',
                                                  style: const TextStyle(
                                                    fontSize: 15,
                                                    fontWeight: FontWeight.bold,
                                                    color: Colors.black,
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ),
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
                    SizedBox(
                      width: 250,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          Container(
                            color: const Color.fromARGB(255, 255, 255, 255),
                            child: Column(
                              children: [
                                Image.asset(
                                  'asset/house.png',
                                  width: 45.0, // Set the width as needed
                                  height: 45.0, // Set the height as needed
                                  fit: BoxFit.cover, // Set the height as needed
                                  color: const Color.fromRGBO(0, 31, 63, 1),
                                ),
                                const Text(
                                  'Home',
                                  style: TextStyle(
                                    fontFamily: 'Inter',
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                    color: Color.fromRGBO(0, 31, 63, 1),
                                  ),
                                )
                              ],
                            ),
                          ),
                          InkWell(
                            onTap: homeToTasks,
                            child: Container(
                              color: const Color.fromARGB(255, 255, 255, 255),
                              child: Column(
                                children: [
                                  Image.asset(
                                    'asset/tasks.png',
                                    width: 45.0, // Set the width as needed
                                    height: 45.0, // Set the height as needed
                                    fit: BoxFit
                                        .cover, // Set the height as needed
                                    color:
                                        const Color.fromRGBO(154, 162, 167, 1),
                                  ),
                                  const Text(
                                    'Tasks',
                                    style: TextStyle(
                                      fontFamily: 'Inter',
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                      color: Color.fromRGBO(154, 162, 167, 1),
                                    ),
                                  )
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                )),
          ],
        ),
      ),
    );
  }
}
