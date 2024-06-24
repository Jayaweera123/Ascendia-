import 'dart:async';
import 'package:flutter/material.dart';
import 'package:my_project/BackGround.dart';
import 'package:my_project/service.dart';
import 'package:my_project/SiteEngineer/Task.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:my_project/service.dart';
import 'package:my_project/SiteEngineer/JobAddSiteEngineer.dart';
//import 'package:my_project/sampleCode.dart';


//import 'package:my_project/coponents/dateSet.dart';
//import 'package:my_project/coponents/dateSet.dart';


class JobbAddFormSite extends StatefulWidget {
  const JobbAddFormSite({Key? key}) : super(key: key);

  @override
  State<JobbAddFormSite> createState() => _ProjectSiteState();
}


Future<List<Task>> getAllTasks() async {
  final response = await http.get(Uri.parse("http://localhost:8080/api/task/all"));
  if (response.statusCode == 200) {
    final List<dynamic> jsonData = json.decode(response.body);
    return jsonData.map((taskData) => Task.fromJson(taskData)).toList();
  } else {
    throw Exception('Failed to load tasks');
  }
}






class _ProjectSiteState extends State<JobbAddFormSite> {
  final TextEditingController searchingController = TextEditingController();
  final TextEditingController jobFormName = TextEditingController();
  final TextEditingController jobFormDescription = TextEditingController();
  //TextEditingController _datacontroller = TextEditingController();
  String projectName = 'My Project 01';
  String projectSubName = 'The Galle Techno-Park';
  String userInputTask = '';

  bool value = true; 
  Service service = Service();

  DateTime _dateTime1 = DateTime.now();
  DateTime _dateTime2 = DateTime.now();

  List<Task> tasks = [];
  Task? selectedTask;

  @override
  void initState() {
    super.initState();
    fetchTasks();
  }

  Future<void> fetchTasks() async {
    try {
      List<Task> fetchedTasks = await getAllTasks();
      setState(() {
        tasks = fetchedTasks;
        if (tasks.isNotEmpty) {
          selectedTask = tasks[0];
        }
      });
    } catch (e) {
      print('Failed to fetch tasks: $e');
    }
  }



  

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
                                Container(
                                   height: 35,
                                    decoration: BoxDecoration(
                          color: const Color.fromRGBO(255, 243, 178, 1),
                          borderRadius: BorderRadius.circular(6.0),
                          border: Border.all(
                            color: Colors.black,
                            width: 1.0,
                          ),
                        ),
                        
                        child: DropdownButton<Task>(
                                            value: selectedTask,
                                            icon: const Icon(Icons.arrow_drop_down),
                                            iconSize: 24,
                                            elevation: 16,
                                            style: const TextStyle(color: Colors.black,fontSize: 16.0),
                                            onChanged: (Task? newValue) {
                                              setState(() {
                                                selectedTask = newValue;
                                              });
                                            },
                                            items: tasks.map((Task task) {
                                              return DropdownMenuItem<Task>(
                                                value: task,
                                                child: Container(
                                                  child: Text(
                                                    task.taskName,
                                                    textAlign: TextAlign.center,
                                                  ),
                                                ),
                                              );
                                            }).toList(),
                                          ),
                                        ),
                                      ],
                                    ),
const Padding(padding: EdgeInsets.all(3)),





Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                const Text(
                                  'Job name:',
                                  style: TextStyle(
                                    color: Color.fromRGBO(50, 75, 101, 1),
                                    fontSize: 16.0,
                                    fontWeight: FontWeight.bold,
                                    fontFamily: 'Inter',
                                  ),
                                ),
                                SizedBox(
                                  width: 170, // Adjust the width as needed
                                  height: 35, // Adjust the height as needed
                                  child: TextFormField(
                                    textAlignVertical: TextAlignVertical.center,
                                    controller: jobFormName,
                                    onChanged: (value) {
              setState(() {
                if (value.isNotEmpty) {
      userInputTask = value;
    } else {
      // Handle empty value here, if needed
    }
              });
            },
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
                                          color:Color.fromRGBO(50, 75, 101, 1),
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
                                      child: TextFormField(
                                        controller: jobFormDescription,
                                        onChanged: (value) {
              setState(() {
                if (value.isNotEmpty) {
      userInputTask = value;
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
                                              color:Color.fromRGBO(50, 75, 101, 1),
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
   
SizedBox(
  width: 168,
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

                                const Padding(padding: EdgeInsets.all(5)),
                                
                              ],
                            ),

const Padding(padding: EdgeInsets.all(20)),
Row(
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


      print("object 03");



      DateTime startDate = _dateTime1; // Assuming _dateTime1 is your start date
      DateTime endDate = _dateTime2; // Assuming _dateTime2 is your end date

      service.CreateJobs(jobFormName.text,jobFormDescription.text,startDate,endDate,selectedTask!.taskId);
      print("object 02");
      print(startDate);
      print(endDate);

      _dateTime1 = DateTime.now(); // Update dateTime
      _dateTime2 = DateTime.now();
      Navigator.push(
      context,
      MaterialPageRoute(builder: (context) =>const JobAddSite()),
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
  } 









        print(jobFormName);
        print(jobFormDescription);
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


