import 'package:flutter/material.dart';
import 'package:my_project/BackGround.dart';
//import 'package:my_project/ConstentParts.dart';

class ProjectSite extends StatefulWidget {
  const ProjectSite({Key? key}) : super(key: key);

  @override
  State<ProjectSite> createState() => _ProjectSiteState();
}

class _ProjectSiteState extends State<ProjectSite> {
  final TextEditingController searchingcontroller = TextEditingController();
  String projectName = 'My Project 01';
  String projectSubName = 'The Galle Techno-Park';
  bool isFocused2 = false;
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
            SizedBox(
              
                height: 190,
             
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    const Padding(padding: EdgeInsets.only(top: 35)),
                    Row(children: [
                      const SizedBox(
                        width: 35,
                      ),
                      Container(
                        
                        alignment: Alignment.topLeft,
                        child: const Icon(
                          Icons.arrow_back,
                          color: Color.fromRGBO(0, 31, 63, 1),
                          size: 30,
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
                        children: [
                          Container(
                            decoration: const BoxDecoration(),
                            child: const Text(
                        'My Projects',
                        style: TextStyle(
                          color: Color.fromRGBO(0, 31, 63, 1),
                          fontSize: 24.0,
                          fontWeight: FontWeight.bold,
                          fontFamily: 'Inter',
                        ),
                        textAlign: TextAlign.start,
                      ),
                          ),
                        
                        ],
                      )
                    ]),




   Column(
                    children: [
                      const Padding(
                        padding: EdgeInsets.all(2),
                      ),
                      SizedBox(
                        height: 50,
                        width: 284,
                        child: TextField(
                          controller: searchingcontroller,
                          onChanged: (value2) {
                            if (value2.isNotEmpty) {
                              setState(() {
                                isFocused2 = true;
                              });
                            } else {
                              setState(() {
                                isFocused2 = false;
                              });
                            }
                          },
                          decoration: InputDecoration(
                            labelText: 'Searching',
                            prefixIcon: IconButton(
                              icon: Icon(
                                Icons.search,
                                color: isFocused2
                                    ? const Color.fromRGBO(0, 31, 63, 1)
                                    : const Color.fromRGBO(154, 162, 167, 1),
                              ),
                              onPressed: () {
                                // Handle the search icon press here
                                // You can add your logic or navigation code
                              },
                            ),
                            filled: true,
                            fillColor: const Color.fromRGBO(238, 240, 240, 1),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(18.0),
                              borderSide: BorderSide(
                                color: isFocused2
                                    ? const Color.fromRGBO(0, 31, 63, 1)
                                    : const Color.fromRGBO(154, 162, 167, 1),
                              ),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(18.0),
                              borderSide: BorderSide(
                                color: isFocused2
                                    ? const Color.fromRGBO(0, 31, 63, 1)
                                    : const Color.fromRGBO(154, 162, 167, 1),
                              ),
                            ),
                            labelStyle: TextStyle(
                              fontSize: 20,
                              fontFamily: 'Inter',
                              color: isFocused2
                                  ? const Color.fromRGBO(0, 31, 63, 1)
                                  : const Color.fromRGBO(154, 162, 167, 1),
                            ),
                          ),
                        ),
                      ),
                    ],
                  )





                  ],
                )
                )
          ],
        ),
      ),
    );
  }
}
