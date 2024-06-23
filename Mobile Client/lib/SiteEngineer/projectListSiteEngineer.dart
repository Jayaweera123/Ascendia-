import 'package:flutter/material.dart';
import 'package:my_project/BackGround.dart';
import 'package:my_project/SiteEngineer/tasksSiteEngineer.dart';
//import 'package:my_project/ConstentParts.dart';

class projectList extends StatefulWidget {
  const projectList({Key? key}) : super(key: key);

  @override
  State<projectList> createState() => _ProjectSiteState();
}

class _ProjectSiteState extends State<projectList> {
  final TextEditingController searchingcontroller = TextEditingController();
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
            
                            child:const Text(
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
                    ]
                    ),



Container(
  height: 630,
  width:300,
  color: Colors.lightBlue,
  child: Column(
    children: [
           Container(
            height: 90,
            width: 280,
            decoration:const BoxDecoration(
              color: Colors.red,
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(40.0),
                topRight: Radius.circular(40.0),
              ),
            ),
          ),

Container(
            height: 70,
            width: 280,
            color: Colors.yellow,
child:Center(
            child:const Text('Project Name ''-'' Project ID'
            ,style: TextStyle(
              fontSize: 20,
              
              
            ),
            
            
            ),  
          ),
)

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

