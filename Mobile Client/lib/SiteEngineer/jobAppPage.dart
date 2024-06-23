import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:my_project/BackGround.dart';
import 'package:my_project/SiteEngineer/CompleteSiteEngineer.dart';
import 'package:my_project/SiteEngineer/Job.dart';
import 'package:my_project/SiteEngineer/Task.dart';
import 'package:my_project/SiteEngineer/TaskCommentFormSiteEngineer.dart';
import 'package:my_project/SiteEngineer/updateSiteEngineer.dart';
import 'package:my_project/SiteEngineer/HomeSiteEngineer.dart';
import 'package:my_project/SiteEngineer/updatingTaskForm.dart';
import 'package:my_project/service.dart';
import 'package:my_project/SiteEngineer/Task.dart';
import 'package:my_project/SiteEngineer/JobCommentFormSiteEngineer.dart';



class jobAppPage extends StatefulWidget {  
 final int taskId;
 final String taskName;
 //final String taskStatus;

  jobAppPage({
    Key? key,
    required this.taskId,
    required this.taskName
  //  required this.taskStatus
  
  }) : super(key: key);

  @override
  _DisplayDataPageState createState() => _DisplayDataPageState();
}

Future<List<Job>> getJobsByTasks(int taskId) async {//http://10.0.2.2:8080/api/job/api/task/19/jobs
  final response = await http.get(Uri.parse("http://10.0.2.2:8080/api/job/api/task/$taskId/jobs"));
  if(response.statusCode == 200){
    final List<dynamic> jsonData = json.decode(response.body);
    return jsonData.map((jobData) => Job.fromJson(jobData)).toList();
  }else{
    throw Exception('Failed to load comment10');
  }
  }


/*
Future<List<Job>> getAllJobs() async {
  final response = await http.get(Uri.parse("http://10.0.2.2:8080/api/job/allJobs"));
  if(response.statusCode == 200){
    final List<dynamic> jsonData = json.decode(response.body);
    return jsonData.map((jobData) => Job.fromJson(jobData)).toList();
  }else{
    throw Exception('Failed to load comment10');
  }
  }

*/






class _DisplayDataPageState extends State<jobAppPage> {
  //List<bool> rememberMeList = List.generate(100, (index) => false); // Assuming a maximum of 100 items
Map<int, bool> isFocused = {};
  final TextEditingController searchingcontroller = TextEditingController();
   final TextEditingController controller5 = TextEditingController();
  String projectName = 'My Project 01';
  String projectSubName = 'The Galle Techno-Park';
  Service service = Service();
    List<String> savedData = [];

     
  

     
    void toDoGoToNewOne(){
      Navigator.push(
      context,
      MaterialPageRoute(builder: (context) =>const updateSite()),
    );
    }

    void inprogressGoToComplete(){
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) =>const completeSite()),
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
                              '$projectName',
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
    const Padding(padding: EdgeInsets.all(7)),
SizedBox(
  width: 290,
child:Row(
mainAxisAlignment:MainAxisAlignment.spaceBetween, 
  children: [
/* ..............................In Progress button end............................. */

/* ..............................to-do button............................. */

Container(
  width: 92,
  height: 46,
   decoration: BoxDecoration(
            
          
            borderRadius: BorderRadius.circular(19.0),
            color:const Color.fromRGBO(0, 31, 63, 1),
            border: Border.all(
              color: const Color.fromRGBO(0, 31, 63, 1),
              width: 1.0,
            )
          ),

          child: Center(
child:Text(
                    "To-Do"  ,   // widget.taskStatus,
                            style:const TextStyle(
                              color: Color.fromARGB(255, 255, 255, 255),
                              fontSize: 20.0,
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Inter',                              
                            ),
                           // textAlign: TextAlign.top,
                          ),
)
           ),


Container(
  child:Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
Text("Task Name",
    style: TextStyle(
                              color: Color.fromRGBO(0, 31, 63, 1),
                              fontSize: 14.0,
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Inter',                              
                            ),

),
Text(
  widget.taskName,

style: TextStyle(
                              color: Color.fromRGBO(0, 31, 63, 1),
                              fontSize: 18.0,
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Inter',                              
                            ),

),




    ],
  ),
)




 /* ..............................to-do button end............................. */


],)
),

const Padding(padding: EdgeInsets.all(2)),

SizedBox(
  width: 284,
  //Color:Colors.amber,
  child:Row(   
mainAxisAlignment: MainAxisAlignment.end,
    children:[

Container(
              color:const Color.fromARGB(255, 255, 255, 255),
          
                           child:const Text(
                              'Done',
                              style: TextStyle(
                                color: Color.fromRGBO(102, 120, 139, 1),
                                fontSize: 14.0,
                                fontWeight: FontWeight.bold,
                                fontFamily: 'Inter',
                              ),
                            ),
                          ),


const Padding(padding: EdgeInsets.all(10),),
Container(
              color:const Color.fromARGB(255, 255, 255, 255),
          
                           child:const Text(
                              'Comment',
                              style: TextStyle(
                                color: Color.fromRGBO(102, 120, 139, 1),
                                fontSize: 14.0,
                                fontWeight: FontWeight.bold,
                                fontFamily: 'Inter',
                              ),
                            ),
                          )

  ])
),
   







/*
Center(
  child: SizedBox(
    height: 250,
    width: 250,
    child: SingleChildScrollView(
      child: FutureBuilder<List<Task>>(
        future: getAllTasks(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            print("object7");
            return CircularProgressIndicator();
          } else if (snapshot.hasError) {
            print("object9");
            return Text('Error: ${snapshot.error}');
          } else if (snapshot.hasData) {
            print("object10");
            final List<Task> tasks = snapshot.data!;
            return Column(
              children: tasks.map((task) {
                return Card(
                  margin: const EdgeInsets.all(5),
                  color: const Color.fromRGBO(255, 227, 76, 1),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                    side: const BorderSide(
                      color: Colors.black,
                      width: 1.0,
                    ),
                  ),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      ListTile(
                        title: Text(
                          'Task Name: ${comment.taskName} \nComment: ${comment.commentText}',
                          style: const TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.bold,
                            fontFamily: 'Inter',
                          ),
                        ),
                        
                        subtitle: Text(
                          'Date: ${comment.commentDate}',
                          style: const TextStyle(
                            fontSize: 14,
                            color: Color.fromARGB(255, 103, 102, 102),
                            fontFamily: 'Inter',
                          ),
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          IconButton(
                            icon: const Icon(Icons.edit),
                            onPressed: () {
                              // Implement your edit functionality
                              print("object25");
                              _editData(comment.commentId,comment.taskName,comment.commentDate,comment.userId,comment.taskId);
                              print("object24");
                            },
                          ),
                          IconButton(
                            icon: const Icon(Icons.delete),
                            onPressed: () {
                              // Implement your delete functionality
                              print(" object delete 01");
                           _deleteData( comment.commentId);
                           print("object delete 02");
                           
                            },
                          ),
                        ],
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



*/

Center(
  child: SizedBox(
    height: 560,
    width: 300,
    child: SingleChildScrollView(
      child: FutureBuilder<List<Job>>(
        future: getJobsByTasks( widget.taskId),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            print("object7");
            return CircularProgressIndicator();
          } else if (snapshot.hasError) {
            print("object9");
            return Text('Error: ${snapshot.error}');
          } else if (snapshot.hasData) {
            print("object10");
            final List<Job> jobs = snapshot.data!;
            return Column(
              children: jobs.map((job) {
                return Card(
                  margin: const EdgeInsets.all(5),
                  color: const Color.fromRGBO(255, 227, 76, 1),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                    side: const BorderSide(
                      color: Colors.black,
                      width: 1.0,
                    ),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Expanded(
                        child: ListTile(
                          title: Text(
                            '${job.jobName}',
                            style: const TextStyle(
                              fontSize: 15,
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Inter',
                            ),
                          ),

                        onTap: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) => HomeSite(),
                                    ),
                                  );
                                },
                        ),
                      ),

                      Row(
                        mainAxisSize: MainAxisSize.min,
                               children: [
   
        const Padding(padding: EdgeInsets.all(19)),
          GestureDetector(
            onTap: () {
              // Add your navigation logic here

               Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) =>  JobCommentSite(
                      jobId:job.jobId,
                      jobName:job.jobName
                  ),
                ),
              );
            
            },
            child: const Icon(
              Icons.add_box_outlined,
              size: 24.0,
            ),
          ),

const Padding(padding: EdgeInsets.all(0)),
PopupMenuButton<String>(
                                onSelected: (String value) {
                                  if (value == 'Delete') {
                              //   _deleteData( task.taskId);
                                  } else if (value == 'Edit') {
/*
                                    Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                        builder: (context) => UpdatingTaskForm(
                                          taskId:task.taskId,
                                          taskName:task.taskName,
                                          description:task.description,
                                          startDate:task.startDate,
                                          endDate:task.endDate,
                                          projectId:task.projectId
                                        ),
                                      ),
                                    );
                              */
                                  }
                                },
                                itemBuilder: (BuildContext context) => <PopupMenuEntry<String>>[
                                  const PopupMenuItem<String>(
                                    value: 'Delete',
                                    child: Text('Delete'),
                                  ),
                                  const PopupMenuItem<String>(
                                    value: 'Edit',
                                    child: Text('Edit'),
                                  ),
                                ],
                              ),

                               ]
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








/*


SizedBox(
  height: 450,
  width: 330,
  child: SingleChildScrollView(
        child: Column(
          children: [
  for (int index = 0; index < widget.dataList.length; index++) ...[
    ListTile(
      title: Text(' ${index + 1}. ${widget.dataList[index]}'),
      trailing: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          GestureDetector(
            onTap: () {
              setState(() {
                rememberMeList[index] = !rememberMeList[index];
              
              });
              
            },
            child: Icon(
              rememberMeList[index]
                  ? Icons.check_box_outlined
                  : Icons.check_box_outline_blank,
              color: rememberMeList[index]
                  ? const Color.fromRGBO(0, 31, 63, 1)
                  : const Color.fromRGBO(0, 31, 63, 1),
              size: 24.0,
            ),
          ),
        const Padding(padding: EdgeInsets.all(19)),
          GestureDetector(
            onTap: () {
              // Add your navigation logic here
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) =>  TaskCommentSite(
                    selectedData: widget.dataList[index],
                  ),
                ),
              );
            },
            child: const Icon(
              Icons.add_box_outlined,
              size: 24.0,
            ),
          ),

const Padding(padding: EdgeInsets.all(0)),
PopupMenuButton<String>(
                                onSelected: (String value) {
                                  if (value == 'Delete') {
                                    _deleteItem(index);
                                  } else if (value == 'Edit') {
                                    _editItem(index);
                                  }
                                },
                                itemBuilder: (BuildContext context) => <PopupMenuEntry<String>>[
                                  const PopupMenuItem<String>(
                                    value: 'Delete',
                                    child: Text('Delete'),
                                  ),
                                  const PopupMenuItem<String>(
                                    value: 'Edit',
                                    child: Text('Edit'),
                                  ),
                                ],
                              ),



        ],
      ),
    ), 
  ],
],
        ),
      ),
),


*/



                  ],
                )
                ),
          ],
        ),
      ),
    );
  }




 void _editData(int taskId,String taskName,String description,DateTime startDate,DateTime endDate,int projectId) async {
  String updatedTask = ''; // Initialize the updated comment text
print("object edit 04");
  try {
    showDialog(
      
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text("Edit Comment"),
          content: TextField(
            
            controller: TextEditingController(text: updatedTask),
            onChanged: (newValue) {
setState(() {
                if (newValue.isNotEmpty) {
                  print("object edite 5");
      updatedTask = newValue;
      print("object edite 6");
    } else {
      // Handle empty value here, if needed
    }
              });
            },
          ),
          actions: <Widget>[
            TextButton(
              onPressed: () async {
                print("object edite 01");
                Navigator.of(context).pop(); // Close the dialog
                  // Call the service method to update the comment
                  print(taskId);
                  await service.updateTask(taskId, updatedTask, description,startDate,endDate,projectId);
                  // Handle the result as needed
                  print("object edite 03");
                
              },
              child:const Text('Update'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text("Cancel"),
            ),
          ],
        );
      },
    );
  } catch (e) {
    // Handle error
    print(e.toString());
  }
}










void _deleteData(int taskId) async {
  print(taskId);
  try {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title:const Text("Warrning",
            style: TextStyle(
            color: Color.fromRGBO(50, 75, 101, 1),
            fontSize: 24.0,
            fontWeight: FontWeight.bold,
            fontFamily: 'Inter',
            ),
          ),
          content:const Text("Are you sure you want to delete this task ?",
            style: TextStyle(
            color: Color.fromRGBO(50, 75, 101, 1),
            fontSize: 16.0,
            fontWeight: FontWeight.normal,
            fontFamily: 'Inter',
            )),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                     service.deleteTask(taskId);
                Navigator.of(context).pop(    );
              },
              child:const Text("OK"),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child:const Text("Cancel"),
            ),
          ],

        );
      },
    );
    // Call the deleteComment method with the appropriate comment ID
 

    // Handle the result, for example
  } catch (e) {
    // Handle error, for example:
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title:const Text("Error"),
          content: Text("Failed to delete task: $e"),          
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text("OK"),
            ),
          ],
        );
      },
    );
  }
 
}


  
}

