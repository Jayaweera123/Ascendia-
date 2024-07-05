import 'package:flutter/material.dart';
import 'package:my_project/BackGround.dart';
import 'package:my_project/SiteEngineer/Project.dart';
import 'package:my_project/SiteEngineer/User.dart';
import 'package:my_project/SiteEngineer/tasksSiteEngineer.dart';
import 'package:my_project/login.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:my_project/SiteEngineer/CustomProjectCard.dart'; // Import the CustomCard widget
import 'package:my_project/SiteEngineer/User.dart';

class projectList extends StatefulWidget {
  final String? token;

  projectList({this.token}); // Make token optional
  @override
  State<projectList> createState() => _ProjectSiteState();
}

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
    return jsonData.map((projectData) => Project.fromJson(projectData)).toList();
  } else {
    throw Exception('Failed to load projects');
  }
}

class _ProjectSiteState extends State<projectList> {
  final TextEditingController searchingcontroller = TextEditingController();
  bool isFocused2 = false;

  void homeToTasks(BuildContext context) {
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

                  Row(
                    children: [
                      const SizedBox(width: 35),

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
                              MaterialPageRoute(builder: (context) => LoginPageone()),
                            );
                          },
                        ),
                      ),

                      Image.asset(
                        'asset/campany logo.jpg',
                        width: 50.0,
                        height: 50.0,
                        fit: BoxFit.cover,
                      ),
                    ],
                  ),

                  Row(
                    children: [
                      const SizedBox(width: 50),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            decoration: const BoxDecoration(),
                            child: const Text(
                              'My Projects',
                              style: TextStyle(
                                color: Color.fromRGBO(50, 75, 101, 1),
                                fontSize: 20.0,
                                fontWeight: FontWeight.bold,
                                fontFamily: 'Inter',
                              ),
                            ),
                          ),
                        ],
                      )
                    ],
                  ),
const Padding(padding: EdgeInsets.all(10)),  
                  Container(
                    height: 630,
                    width: 300,
                    child: SingleChildScrollView(
                      child: FutureBuilder<List<Project>>(
                        future: getAllProjectByToken(),
                        builder: (context, snapshot) {
                          if (snapshot.connectionState == ConnectionState.waiting) {
                            return const CircularProgressIndicator();
                          } else if (snapshot.hasError) {
                            return Text('Error: ${snapshot.error}');
                          } else if (snapshot.hasData) {
                            final List<Project> projects = snapshot.data!;
                            return Column(
                              children: projects.map((project) {
                                print(project.projectName);
                                print(project.image);
                                print(project.projectDescription);
                                return CustomCard(
                                  userID:project.projectManager.userID,
                                  projectId:project.projectId,
                                  projectName: project.projectName,
                                  projectDescription: project.projectDescription,
                                  imageUrl: project.image, // Update as per your project model
                                );
                              }).toList(),
                            );
                          } else {
                            return const Text('No data available');
                          }
                        },
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
