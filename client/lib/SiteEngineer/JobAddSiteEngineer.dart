import 'package:flutter/material.dart';
import 'package:my_project/BackGround.dart';
//import 'package:my_project/SiteEngineer/JobCommentFormSiteEngineer.dart';
import 'package:my_project/SiteEngineer/jobAddFormSiteEngineer.dart';
//import 'package:my_project/SiteEngineer/inProgressSiteEngineer.dart';
//import 'package:my_project/coponents/signupButon.dart';
//import 'package:my_project/ConstentParts.dart';

class JobAddSite extends StatefulWidget {
  const JobAddSite({Key? key}) : super(key: key);

  @override
  State<JobAddSite> createState() => _ProjectSiteState();
}

class _ProjectSiteState extends State<JobAddSite> {
  final TextEditingController searchingcontroller = TextEditingController();
  String projectName = 'My Project 01';
  String projectSubName = 'The Galle Techno-Park';
  bool isFocused2 = false;
    final String buttonSignUp='Submit';

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
  child:const Column(
children: [

],
  ),
),

const Padding(padding: EdgeInsets.all(10)),

                  ],
                )
                ),

          ],
        ),
      ),
    );
  }
}
