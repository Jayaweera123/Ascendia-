import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:my_project/BackGround.dart';
import 'package:my_project/SiteEngineer/inProgressSiteEngineer.dart';
import 'package:my_project/service.dart';
import 'package:my_project/SiteEngineer/Task.dart';



class TaskAddSite extends StatefulWidget {  
   TaskAddSite({Key? key, required this.onTaskAdded }) : super(key: key);
   final void Function(Map<String, dynamic>) onTaskAdded;


  @override
  State<TaskAddSite> createState() => _ProjectSiteState();
}

class _ProjectSiteState extends State<TaskAddSite> {
  TextEditingController controller1 = TextEditingController();
  TextEditingController _descriptionController = TextEditingController();
 List<String> dataList=[] ;

  String projectName = 'My Project 01';
  String projectSubName = 'The Galle Techno-Park';
  String selectedValue = 'project manager';
  bool value = true; 
   String userInputTask = '';
  List<String> savedDataTask = [];
  Service service = Service();
  

  DateTime _dateTime1 = DateTime.now();
  DateTime _dateTime2 = DateTime.now();

  void _showDatePicker1(){
    showDatePicker(
      context: context,
      initialDate:DateTime.now() , 
      firstDate:DateTime (2024), 
      lastDate: DateTime(2100),
      ).then((value1) {
        setState(() {
          _dateTime1 = value1 ! ;
        });
      });
  }

void _showDatePicker2(){
    showDatePicker(
      context: context,
      initialDate:DateTime.now() , 
      firstDate:DateTime (2024), 
      lastDate: DateTime(2100),
      ).then((value2) {
        setState(() {
          _dateTime2 = value2 ! ;
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
                            Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                const Text(
                                  'Task name:',
                                  style: TextStyle(
                                    color: Color.fromRGBO(50, 75, 101, 1),
                                    fontSize: 16.0,
                                    fontWeight: FontWeight.bold,
                                    fontFamily: 'Inter',
                                  ),
                                ),
                                SizedBox(
                                  width: 163, // Adjust the width as needed
                                  height: 35, // Adjust the height as needed
                                  child: TextField(
                                    controller:controller1 ,
                                    
                                    onChanged: (value) {
              setState(() {
                if (value.isNotEmpty) {
      userInputTask = value;
    } else {
      // Handle empty value here, if needed
    }
              });
            },
             textAlignVertical: TextAlignVertical.center,
                                    decoration: InputDecoration(
                                      contentPadding:
                                          const EdgeInsets.symmetric(
                                              horizontal: 10),
                                      filled: true,
                                      fillColor: const Color.fromRGBO(
                                          255, 243, 178, 1),
                                      border: OutlineInputBorder(
                                        borderRadius:
                                            BorderRadius.circular(6.0),
                                        borderSide: const BorderSide(
                                          color:
                                              Color.fromRGBO(255, 243, 178, 1),
                                        ),
                                      ),
                                      focusedBorder: OutlineInputBorder(
                                        borderRadius:
                                            BorderRadius.circular(6.0),
                                        borderSide: const BorderSide(
                                          color:
                                              Color.fromRGBO(50, 75, 101, 1),
                                        ),
                                      ),
                                      labelStyle: const TextStyle(
                                        fontSize: 12,
                                        fontFamily: 'Inter',
                                        color: Color.fromRGBO(255, 243, 178, 1),
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
const Padding(padding: EdgeInsets.all(3)),
                            const Row(
                            
                              children: [
                                
                                Text(
                                  'Description:',
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
                                      height:250, // Adjust the height as needed
                                      child: TextField(
                                      controller:_descriptionController,

onChanged: (value) {
              setState(() {
                if (value.isNotEmpty) {
      userInputTask= value;
    } else {
      // Handle empty value here, if needed
    }
              });
            },

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
                                              color: Color.fromRGBO(50, 75, 101, 1),
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
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: [
                                    const Text(
                                      'Start Date:',
                                      style: TextStyle(
                                        color: Color.fromRGBO(50, 75, 101, 1),
                                        fontSize: 16.0,
                                        fontWeight: FontWeight.bold,
                                        fontFamily: 'Inter',
                                      ),
                                    ),
                                    SizedBox(
  width: 170,
  height: 35,
  child: MaterialButton(
    
    onPressed: _showDatePicker1,
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          value
              ? '${_dateTime1.year}/${_dateTime1.month}/${_dateTime1.day}'
              : ' DD / MM / YYYY ',
          style: TextStyle(
            color: Color.fromRGBO(50, 75, 101, 1),
            fontSize: 14.0,
            fontWeight: FontWeight.w500,
            fontFamily: 'Inter',
          ),
        ),
        const Icon(
          Icons.calendar_month,
          color: Color.fromRGBO(50, 75, 101, 1),
          ),
        
      ],
    ),
    color: const Color.fromRGBO(255, 243, 178, 1),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(8.0),
      side: const BorderSide(
        color: Color.fromRGBO(50, 75, 101, 1),
        width: 1.0,
      ),
    ),
  ),
),

                                  ],
                                ),

                                const Padding(padding: EdgeInsets.all(5)),

                                    Row(
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: [
                                        const Text(
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
  width: 165,
  height: 35,
  child: MaterialButton(
    onPressed: _showDatePicker2,
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          value
              ? '${_dateTime2.year}/${_dateTime2.month}/${_dateTime2.day}'
              : ' DD / MM / YYYY ',
          style: TextStyle(
            color: Color.fromRGBO(50, 75, 101, 1),
            fontSize: 14.0,
            fontWeight: FontWeight.w500,
            fontFamily: 'Inter',
          ),
        ),
        const Icon(
          Icons.calendar_month,
          color: Color.fromRGBO(50, 75, 101, 1),
          ),
        
      ],
    ),
    color: const Color.fromRGBO(255, 243, 178, 1),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(8.0),
      side: const BorderSide(
        color: Color.fromRGBO(50, 75, 101, 1),
        width: 1.0,
      ),
    ),
  ),
),

                                  ],
                                ),
                              ],
                            ),

const Padding(padding: EdgeInsets.all(45)),
Center(
child: Row(
  mainAxisAlignment: MainAxisAlignment.end,
  children: [
SizedBox(
    width: 110,
    height: 37,

    child: ElevatedButton(





      onPressed: () {

print("object 04");
  // Saving the comment using service

  if (userInputTask.isNotEmpty) {
    setState(() {
     // savedDataTask.add(userInputTask);
     // userInputTask = ''; // Clear the input after saving
      print("object 03");



      DateTime startDate = _dateTime1; // Assuming _dateTime1 is your start date
      DateTime endDate = _dateTime2; // Assuming _dateTime2 is your end date

      service.saveTask(controller1.text,_descriptionController.text,startDate,endDate,1);
      print("object 02");
      print(startDate);
      print(endDate);

      controller1.clear(); // Clear the TextEditingController
      _descriptionController.clear();
      _dateTime1 = DateTime.now(); // Update dateTime
      _dateTime2 = DateTime.now();
      Navigator.push(
      context,
      MaterialPageRoute(builder: (context) =>const inProgressSite(dataList: [],)),
     );
    });
  } else {
    // Handle the case when userInput is empty
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Error'),
          content: Text('Please enter some data before saving.'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the dialog
              },
              child: Text('OK'),
            ),
          ],
        );
      },
    );
  }          // Add your task added logic here
        },











//       onPressed: () {
//         _addTask();
//                 // Add entered data to the list
//                 setState(() {
//                   dataList.add(controller1.text);
//                 });
//                 // Clear the text field
//              // controller1.clear();
//  Navigator.push(
//                   context,
//                   MaterialPageRoute(
//                     builder: (context) => inProgressSite(
//                       dataList: dataList,
//                     ),
//                   ),
//                 );

//               },
















      style: ElevatedButton.styleFrom(
        primary: const Color.fromRGBO(16, 0, 63, 1), // Background color
        onPrimary:const Color.fromARGB(255, 255, 255, 255), // Text color
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(75.0), // Rounded corners
        ),
       // padding:const EdgeInsets.symmetric(horizontal: 20, vertical: 16), // Adjust size here
      ),

      child:const Text(
        'Create',
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


//new added =============================================================

/*
    child: ElevatedButton(
      onPressed: () {
  // Saving the comment using service

  if (userInput.isNotEmpty) {
    setState(() {
      savedData.add(userInput);
      userInput = ''; // Clear the input after saving
service.saveComment(3, 1, tasksName, controllertaskscomment1.text, _dateTime3.toString());

      controllertaskscomment1.clear(); // Clear the TextEditingController
      _dateTime3 = DateTime.now(); // Update dateTime
    });
  } else {
    // Handle the case when userInput is empty
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Error'),
          content: Text('Please enter some data before saving.'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the dialog
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
        primary: const Color.fromRGBO(16, 0, 63, 1), // Background color
        onPrimary:const Color.fromARGB(255, 255, 255, 255), // Text color
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(75.0), // Rounded corners
        ),
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

*/

// ended



    child: ElevatedButton(
      
      onPressed: () {
        // Add your task added logic here


        },
      
                  
      
      style: ElevatedButton.styleFrom(
        primary: const Color.fromRGBO(16, 0, 63, 1), // Background color
        onPrimary:const Color.fromARGB(255, 255, 255, 255), // Text color
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(75.0), // Rounded corners
        ),
       
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

  void _addTask() {
    final String name = controller1.text;
    final String description = _descriptionController.text;

    if (name.isNotEmpty) {
      final Map<String, dynamic> newTask = {
        'name': name,
        'description': description,
        'startDate': _dateTime1,
        'closingDate': _dateTime2,
      };
      widget.onTaskAdded(newTask);
    }
  }
}


