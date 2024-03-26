import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:my_project/BackGround.dart';
//import 'package:http/http.dart' as http;

class TaskCommentSite extends StatefulWidget {
  final String selectedData;// pass data from inprogress page 
List<String> dataListcomment=[];
   TaskCommentSite({Key? key, required this.selectedData, }) : super(key: key);

  @override
  State<TaskCommentSite> createState() => _ProjectSiteState();
}

class _ProjectSiteState extends State<TaskCommentSite> {
  TextEditingController searchingController = TextEditingController();
  TextEditingController controllertaskscomment1 = TextEditingController();
  
 
  String projectName = 'My Project 01';
  String projectSubName = 'The Galle Techno-Park';
  String selectedValue = 'project manager';
  bool value = true; 
  String userInput = '';
  List<String> savedData = [];


late String tasksName;
  @override
  void initState() {
    super.initState();
    tasksName = widget.selectedData.toString();
  }

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
                            Row(
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
                                        controller: controllertaskscomment1,
                                        onChanged: (value) {
              setState(() {
                userInput = value;
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
    onPressed: _showDatePicker3,
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          value
              ? '${_dateTime3.year}/${_dateTime3.month}/${_dateTime3.day}'
              : ' DD / MM / YYYY ',
          style: TextStyle(
            color: Color.fromRGBO(50, 75, 101, 1),
            fontSize: 14.0,
            fontWeight: FontWeight.w500,
            fontFamily: 'Inter',
          ),
        ),

         Icon(
          Icons.calendar_month,
          color: Color.fromRGBO(50, 75, 101, 1),
          ),
        
      ],
    ),
    color:  Color.fromRGBO(255, 243, 178, 1),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(8.0),
      side: BorderSide(
        color: Color.fromRGBO(50, 75, 101, 1),
        width: 1.0,
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

child:SizedBox(
  height: 250,
  width: 250,
  child: SingleChildScrollView(
        child: Column(
          children: [
      for (int index = 0; index < savedData.length; index++)
        Card(
  //elevation: 8,
  margin:const  EdgeInsets.all(5),
  color:const  Color.fromRGBO(255, 227, 76, 1),
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(12),
    side:const BorderSide(
      color: Colors.black,
      width: 1.0,
    )
    
  ),
  child: Column(
   mainAxisSize: MainAxisSize.min,
    children: [
      
      ListTile(
        
        title: Text('Task Name: ${tasksName}\n${savedData[index]}',
          style:const  TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.bold,
            fontFamily: 'Inter',
          ),
        ),
        subtitle: Text(_dateTime3.toString(),
          style:const  TextStyle(
            fontSize: 14,
            color:  Color.fromARGB(255, 103, 102, 102),
            fontFamily: 'Inter',
          ),
        ),
        
      ),
      Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          IconButton(
            icon:const  Icon(Icons.edit),
            onPressed: () {
              _editData(index);
            },
          ),

          IconButton(
            icon:const  Icon(Icons.delete),
            onPressed: () {
              _deleteData(index);
            },
          ),
        ],
      ),
    ],
  ),
),

    ],
        ),
      ),
),
  
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
  if (userInput.isNotEmpty) {
    setState(() {
      savedData.add(userInput);
      userInput = ''; // Clear the input after saving
      controllertaskscomment1.clear(); // Clear the TextEditingController
  _dateTime3 = DateTime.now();    });
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
  ),

const Padding(padding: EdgeInsets.all(3)),

SizedBox(
    width: 110,
    height: 37,

    child: ElevatedButton(
      onPressed: () {
        
  if (controllertaskscomment1.text.isNotEmpty) {
    setState(() {
      savedData.add(controllertaskscomment1.text);
      controllertaskscomment1.clear(); // Reset the TextField
    });
  }
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
void _editData(int index) {
  // Check if the index is within the bounds of the list
  if (index >= 0 && index < savedData.length) {
    setState(() {
      userInput = savedData[index]; // Set userInput to the data at the selected index
      savedData.removeAt(index); // Remove the data from the list (you may adjust this based on your requirements)
      controllertaskscomment1.text = userInput; // Set the text of the controllertaskscomment1 to userInput
    });
  }
}
  void _deleteData(int index) {
    // Implement the delete functionality
    setState(() {
      savedData.removeAt(index);
    });
  }
}



