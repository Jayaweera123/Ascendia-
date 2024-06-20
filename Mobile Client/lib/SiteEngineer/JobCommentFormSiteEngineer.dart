import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:my_project/BackGround.dart';
import 'package:my_project/SiteEngineer/CommentJobs.dart';
import 'package:my_project/service.dart';
import 'package:my_project/SiteEngineer/CommentTasks.dart';
import 'package:my_project/SiteEngineer/User.dart';
import 'package:my_project/SiteEngineer/Job.dart';

class JobCommentSite extends StatefulWidget {
  //final String selectedData;// pass data from inprogress page 
  final int jobId;
  final String jobName;

   JobCommentSite({Key? key, 
   required this.jobId,
   required this.jobName
    }) : super(key: key);

  @override
  State<JobCommentSite> createState() => _ProjectSiteState();
}

  Future<List<CommentJob>> getCommentByJob(int jobId) async {
  final response = await http.get(Uri.parse("http://10.0.2.2:8080/api/v2/commentjob/job/$jobId"));
  if(response.statusCode == 200){
    final List<dynamic> jsonData = json.decode(response.body);
    print('obect future get method');
    
    return jsonData.map((commentData) => CommentJob.fromJson(commentData)).toList();
  }else{
    throw Exception('Failed to load comment10');
  }
  }


class _ProjectSiteState extends State<JobCommentSite> {
  TextEditingController searchingController = TextEditingController();
  TextEditingController controllertaskscomment1 = TextEditingController();

  late Future<Comment> displayComments;
  
 
  String projectName = 'My Project 01';
  String projectSubName = 'The Galle Techno-Park';
  String selectedValue = 'project manager';
  bool value = true; 
  String userInput = '';
  List<String> savedData = [];
  Service service = Service();

    @override
  void initState() {
    super.initState();
    jobsName = widget.jobName;
    print("object3");
  }


    late String jobsName;
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
                                        controller: controllertaskscomment1,
                                        onChanged: (value) {
              setState(() {
                if (value.isNotEmpty) {
      userInput = value;
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

                             //   const Padding(padding: EdgeInsets.all(5)),


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


/*
Center(
  child: SizedBox(
    height: 250,
    width: 250,
    child: SingleChildScrollView(
      child:  FutureBuilder<List<Comment>>(
      future: getAllComments(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Center(
            child: CircularProgressIndicator(),
          );
        } else if (snapshot.hasError) {
          return Center(
            child: Text('Error: ${snapshot.error}'),
          );
        } else if (snapshot.hasData) {
          final List<Comment> comments = snapshot.data!;
          return ListView.builder(
            itemCount: comments.length,
            itemBuilder: (context, index) {
              final comment = comments[index];
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
                        'Task Name: ${comment.taskName} \n Comment: ${comment.commentText}',
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
                          },
                        ),
                        IconButton(
                          icon: const Icon(Icons.delete),
                          onPressed: () {
                            // Implement your delete functionality
                          },
                        ),
                      ],
                    ),
                  ],
                ),
              );
            },
          );
        } else {
          return Center(
            child: Text('No data available'),
          );
        }
      },
    )
    ),
  ),
),
*/

Center(
  child: SizedBox(
    height: 300,
    width: 250,
    child: SingleChildScrollView(
      child: FutureBuilder<List<CommentJob>>(
        future: getCommentByJob(widget.jobId),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            print("object7");
            return CircularProgressIndicator();
          } else if (snapshot.hasError) {
            print("object9");
            return Text('Error: ${snapshot.error}');
          } else if (snapshot.hasData) {
            print("object10   new");
            final List<CommentJob> commentJobs = snapshot.data!;
            return Column(
              children: commentJobs.map((commentJob) {
                print("card on");
                print(commentJob.commentJobText);
                print("card on");
                print(commentJob.commentJobDate);
                print(commentJob.commentedJobUser);
                print(commentJob.commentJobId);
                print(commentJob.job.jobId);
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
                          'Job Name: ${widget.jobName} \nComment: ${commentJob.commentJobText}',
                          style: const TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.bold,
                            fontFamily: 'Inter',
                          ),
                        ),
                        
                        subtitle: Text(
                          'Date: ${commentJob.commentJobDate}',
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
                              _editData(commentJob.commentJobId,commentJob.job.jobName,1,widget.jobId);
                              print("object24");
                            },
                          ),
                          IconButton(
                            icon: const Icon(Icons.delete),
                            onPressed: () {
                              // Implement your delete functionality
                              print(" object delete 01");
                           _deleteData(commentJob.commentJobId);
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





/*

Center(

child:SizedBox(
  height: 250,
  width: 250,
  child: SingleChildScrollView(
        child: Column(
          children: [

            
      for (int index = 0; index < comments.length; index++)
      
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
        
        title: Text('Task Name: ${tasksName}\n${comments[index]['commentText']}',
        
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
              _editData(comments[index]['id'], index);
            },
          ),

          IconButton(
            icon:const  Icon(Icons.delete),
            onPressed: () {
              _deleteData(comments[index]['id'], index);
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
*/


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
  // Saving the comment using service

  if (userInput.isNotEmpty) {
    setState(() {
      savedData.add(userInput);
      userInput = ''; // Clear the input after saving
      print(widget.jobId);
      print(controllertaskscomment1.text);
      print("enter before to the save Comment Job ");
service.saveCommentJob(widget.jobId, 1, controllertaskscomment1.text);

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


 void _editData(int commentJobId,String jobName,int userId,int jobId) async {
  String updatedComment = ''; // Initialize the updated comment text
print("object edit 04");
  try {
    showDialog(
      
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text("Edit Comment"),
          content: TextField(
            
            controller: TextEditingController(text: updatedComment),
            onChanged: (newValue) {
setState(() {
                if (newValue.isNotEmpty) {
                  print("object edite 5");
      updatedComment = newValue;
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

                print(commentJobId);
                  await service.updateCommentJob(commentJobId, updatedComment,userId,jobId);
                print("object edite 01");
                Navigator.of(context).pop(); // Close the dialog

                print("object edite 07");
                // Update the comment text in the lis
               //   savedData[commentId] = updatedComment;
                 print("object edite 02");
                  // Call the service method to update the comment
                  
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

/*


  // Check if the index is within the bounds of the list
  if (commentId >= 0 && commentId < savedData.length) {
    // Show a dialog for editing the comment
    print("object23");
    showDialog(
      context: context,
      builder: (BuildContext context) {
        String updatedComment = savedData[commentId]; // Initialize with the current comment text
        return AlertDialog(
          title:const Text('Edit Comment'),
          content: TextField(
            controller: TextEditingController(text: updatedComment),
            onChanged: (newValue) {
              updatedComment = newValue; // Update the comment text as the user types
            },
          ),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the dialog without saving changes
              },
              child:const Text('Cancel'),
            ),
            TextButton(
              onPressed: () async {
                Navigator.of(context).pop(); // Close the dialog
                // Update the comment text in the list
                setState(() {
                  savedData[commentId] = updatedComment;
                });
                try {
                  // Call the service method to update the comment
                  await service.updateComment(commentId , updatedComment, _dateTime3.toString());
                  // Handle the result as needed
                } catch (e) {
                  // Handle error
                  print("26");
                }
              },
              child:const Text('Save'),
            ),
          ],
        );
      },
    );
  }
  print("27");
}


*/


void _deleteData(int commentJobId) async {
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
          content:const Text("Are you sure you want to delete this comment ?",
            style: TextStyle(
            color: Color.fromRGBO(50, 75, 101, 1),
            fontSize: 16.0,
            fontWeight: FontWeight.normal,
            fontFamily: 'Inter',
            )),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                     service.deleteCommentJob(commentJobId);
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
          content: Text("Failed to delete comment: $e"),          
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
  setState(() {
  if (commentJobId >= 0 && commentJobId < savedData.length) {
    savedData.removeAt(commentJobId);
  } else {
    print("Invalid commentId: $commentJobId");
  }
});
}
}


