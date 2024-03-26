import 'package:flutter/material.dart';
import 'package:my_project/BackGround.dart';
import 'package:my_project/SiteEngineer/tasksSiteEngineer.dart';
//import 'package:my_project/ConstentParts.dart';

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

  void homeToTasks (){
     Navigator.push(
      context,
      MaterialPageRoute(builder: (context) =>const tasksSite()),
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
                    ]
                    ),



SizedBox(
  height: 550,
  //Color:Colors.brown,
  child: Column(
    children: [
      Container(
        // Content for the first container
      ),
      Container(
        // Content for the second container
      ),
    ],
  ),
),


SizedBox(
  width: 250,

child:Row(
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
                          color:const  Color.fromRGBO(0, 31, 63, 1),
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

     child:Container(
     color: const Color.fromARGB(255, 255, 255, 255),
      child: Column(
        children: [
          Image.asset(
                          'asset/tasks.png',
                          width: 45.0, // Set the width as needed
                          height: 45.0, // Set the height as needed
                          fit: BoxFit.cover, // Set the height as needed
                          color:const  Color.fromRGBO(154, 162, 167, 1),
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
                )
                ),


          ],
        ),
      ),
    );
  }
}

