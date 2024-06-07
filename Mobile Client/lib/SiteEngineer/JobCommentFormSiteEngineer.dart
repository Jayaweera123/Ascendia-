import 'package:flutter/material.dart';
import 'package:my_project/BackGround.dart';
import 'package:my_project/sampleCode.dart';


//import 'package:my_project/coponents/dateSet.dart';
//import 'package:my_project/coponents/dateSet.dart';


class JobCommentSite extends StatefulWidget {
  const JobCommentSite({Key? key}) : super(key: key);

  @override
  State<JobCommentSite> createState() => _ProjectSiteState();
}

class _ProjectSiteState extends State<JobCommentSite> {
  final TextEditingController searchingController = TextEditingController();
 // TextEditingController _datacontroller = TextEditingController();
  String projectName = 'My Project 01';
  String projectSubName = 'The Galle Techno-Park';
  String selectedValue = 'project manager';
  String tasksName = 'Punchlist completion';
    String jobsName = 'Site Inspection';

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

child:Column(
  children: [


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
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                 
                                 Text(
                                  'Task name: $tasksName ',
                                  style: const TextStyle(
                                    color: Color.fromRGBO(50, 75, 101, 1),
                                    fontSize: 16.0,
                                    fontWeight: FontWeight.bold,
                                    fontFamily: 'Inter',
                                  ),
                                ),

                               Text(
                                  'Job name: $jobsName ',
                                  style: const TextStyle(
                                    color: Color.fromRGBO(50, 75, 101, 1),
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
                                    color: Color.fromRGBO(50, 75, 101, 1),
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
                                      width: 250, // Adjust the width as needed
                                      height:80, // Adjust the height as needed
                                      child: TextField(
                                        maxLines: 10,
                                        decoration: InputDecoration(
                                          filled: true,
                                          fillColor: const Color.fromRGBO(
                                              255, 243, 178, 1),
                                          border: OutlineInputBorder(
                                            borderRadius:
                                                BorderRadius.circular(6.0),
                                            borderSide: const BorderSide(
                                              color: Color.fromRGBO(
                                                  255, 243, 178, 1),
                                            ),
                                          ),
                                          focusedBorder: OutlineInputBorder(
                                            borderRadius:
                                                BorderRadius.circular(6.0),
                                            borderSide: const BorderSide(
                                              color: Color.fromRGBO(
                                                  255, 243, 178, 1),
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

                                const Padding(padding: EdgeInsets.all(5)),

                                   const Row(
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: [
                                        Text(
                                      'Close Date:',
                                      style: TextStyle(
                                        color: Color.fromRGBO(50, 75, 101, 1),
                                        fontSize: 16.0,
                                        fontWeight: FontWeight.bold,
                                        fontFamily: 'Inter',
                                      ),
                                    ),

// Provide a suitable width
   
SizedBox(
  width: 168,
  height: 35,
  child: DatePickerApp(),
)
        
      
    



 
                                  ],
                                ),

                                const Padding(padding: EdgeInsets.all(5)),
                                const Row(
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: [
                                     Text(
                                      'Previous Comments:',
                                      style: TextStyle(
                                        color: Color.fromRGBO(50, 75, 101, 1),
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

Column(children: [

Center(
  child:Container(
                      width: 255,
                        height: 230,
                        decoration: BoxDecoration(
                          color: const Color.fromRGBO(255, 243, 178, 1),
                          borderRadius: BorderRadius.circular(19),
                          border: Border.all(
                            color: const Color.fromRGBO(255, 215, 0, 1),
                            width: 1.0,
                          ),
                        ),
  )
)



],),

const Padding(padding: EdgeInsets.all(10)),

Row(
  mainAxisAlignment: MainAxisAlignment.end,
  children: [
SizedBox(
    width: 85,
    height: 37,

    child: ElevatedButton(
      onPressed: () {
        // Perform login logic here
     },
      style: ElevatedButton.styleFrom(
        primary: const Color.fromRGBO(16, 0, 63, 1), // Background color
        onPrimary:const Color.fromARGB(255, 255, 255, 255), // Text color
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(75.0), // Rounded corners
        ),
       // padding:const EdgeInsets.symmetric(horizontal: 20, vertical: 16), // Adjust size here
      ),

      child:const Text(
        'Add',
        style: TextStyle(
          fontSize: 19,
          fontFamily: 'Intel',
          fontWeight: FontWeight.bold,
        ),
      ),
)
  ),

const Padding(padding: EdgeInsets.all(3)),

SizedBox(
    width: 110,
    height: 37,

    child: ElevatedButton(
      onPressed: () {
        // Perform login logic here
     },
      style: ElevatedButton.styleFrom(
        primary: const Color.fromRGBO(16, 0, 63, 1), // Background color
        onPrimary:const Color.fromARGB(255, 255, 255, 255), // Text color
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(75.0), // Rounded corners
        ),
       // padding:const EdgeInsets.symmetric(horizontal: 20, vertical: 16), // Adjust size here
      ),

      child:const Text(
        'Cancel',
        style: TextStyle(
          fontSize: 19,
          fontFamily: 'Intel',
          fontWeight: FontWeight.bold,
        ),
      ),
)
  )



  ],
)


                          ],
                        ),

                      ),
 )
  ]
)
 )
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

}


