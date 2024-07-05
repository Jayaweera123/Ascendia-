//import 'dart:js';

import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:convert';
import 'dart:math';
import 'package:http/http.dart' as http;
import 'package:my_project/SiteEngineer/CommentTasks.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Service{

void showAlert(BuildContext context, String title, String content) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        title: Text(title),
        content: Text(content),
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





  Future<void> storeToken(String token) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString('jwt_token', token);
}

Future<String?> getToken() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getString('jwt_token');
}

Future<void> saveComment(int taskId, String commentText, int userID) async {

  final Map<String, dynamic> data = {
    'task': {
      'taskId': taskId,
    },
    'commentedUser': {
      'userID': userID,
    },
    'commentText': commentText,
  };

  try {
    final token = await getToken();
    if (token == null) {
      throw Exception('Token not found');
    }
    print('Task ID: $taskId');
    print('User ID: $userID');
    print('Comment Text: $commentText');
    final response = await http.post(
      Uri.parse('http://localhost:8080/sengineer/comment/sengineer/comment/createComment'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: json.encode(data),
    );
    if (response.statusCode == 201) {

      print('Data sent successfully');
    } else {
      print('Error from server: ${response.body}');
      throw Exception('Failed to send data: ${response.statusCode}');
    }
  } catch (error) {
    print('Error: $error');
  }
}


Future<void> updateComment(int commentId, String CommentText, int userID, int taskId) async {
  try {


        final token = await getToken();
    if (token == null) {
      throw Exception('Token not found');
    }

print(commentId);
      print(taskId);
      print('userId');
      print(userID);
      print('userId');
      print(CommentText);

    final response = await http.put(
      Uri.parse('http://localhost:8080/sengineer/comment/$commentId'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: json.encode({

    'task': {
      'taskId': taskId,
    },
    'commentedUser':{
      'userID':userID,
    },   
    'commentText':CommentText,
        }),
    );

    if (response.statusCode == 200) {
      // Successfully updated the comment

      print('Comment updated successfully');
    } else {
      // Failed to update the comment
      throw Exception('Failed to update comment');
    }
  } catch (e) {
    // Handle error
    print('Error updating comment: $e');
  }
}

 /* 
  // Update an existing comment in the backend
Future<Comment> updateComment(int commentId, String updatedComment) async {


  print("new ob");
  // Create a map containing the updated comment data
  Map<String, dynamic> updatedData = {
    'commentText': updatedComment,
  };

print(" new 01");
  final response = await http.put(
    Uri.parse('http://10.0.2.2:8080/api/v2/comment/$commentId'), // Adjust the URI as needed
    headers: {'Content-Type': 'application/json'},
    body: json.encode(updatedData),
  );

print(" new 02");
  if (response.statusCode == 200) {
    return Comment.fromJson(json.decode(response.body));
  } else {
    throw Exception('Failed to update comment');
  }
}

*/

    // Delete a comment from the backend
Future<void> deleteComment(int commentId) async {
  try {
    print("Attempting to delete comment: $commentId");
    // Get the token
    final token = await getToken();
    if (token == null) {
      throw Exception('Token not found');
    }
    // Make the DELETE request with authorization
    final response = await http.delete(
      Uri.parse('http://localhost:8080/sengineer/comment/delete/$commentId'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );
    if (response.statusCode == 200) {
      print("Comment deleted successfully");
    } else {
      throw Exception('Failed to delete comment');
    }
  } catch (e) {
    // Handle error
    print('Error deleting comment: $e');
  }
}


Future<void> saveTask(String taskName, String description, DateTime startDate, DateTime endDate, int projectId) async {
  final Map<String, dynamic> data = {
    'taskName': taskName,
    'description': description,
    'startDate': startDate.toIso8601String(),
    'endDate': endDate.toIso8601String(),
    'project': {
      'projectId': projectId,
    },
  };

  print("Task Data:");
  print("Task Name: $taskName");
  print("Description: $description");
  print("Start Date: $startDate");
  print("End Date: $endDate");
  print("Project ID: $projectId");

  try {
    final token = await getToken();
    if (token == null) {
      throw Exception('Token not found');
    }

    final response = await http.post(
      Uri.parse('http://localhost:8080/sengineer/task/add'),//http://localhost:8080/sengineer/task/add
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: json.encode(data),
    );

    if (response.statusCode == 201) {
      print('Task added successfully');
    } else {
      print("Server responded with status code ${response.statusCode}");
      print("Response body: ${response.body}");
      throw Exception("Failed to add task");
    }
  } catch (error) {
    print('Error adding task: $error');
  }
}

Future<void> updateTask(int taskId, String taskName, String description,DateTime startDate,DateTime endDate,int projectId) async {
 
final Map<String, dynamic> data = {
        'taskName': taskName,
        'description': description,
        'startDate': startDate.toIso8601String(),
        'endDate': endDate.toIso8601String(),
        'project': {
          'projectId': projectId,
        },
      };
  try {
    final token = await getToken();
    if (token == null) {
      throw Exception('Token not found');
    }

    final response = await http.put(
      Uri.parse('http://localhost:8080/sengineer/$taskId/edit'),//http://10.0.2.2:8080/api/task//{taskId}/edit
      headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',},              // http://10.0.2.2:8080/api/v2/comment/$commentId
      body: json.encode(data),
    );

    print("Response status: ${response.statusCode}");
    print("Response body: ${response.body}");

    if (response.statusCode == 200) {
      // Successfully updated the comment
      print('Comment updated successfully');
    } else {
      // Failed to update the comment
      print('Failed to update comment: ${response.body}');
      throw Exception('Failed to update comment');
    }
  } catch (e) {
    // Handle error
    print('Error updating comment: $e');
  }
}





// Future<void> deleteComment(int commentId) async {
//   try {
//     print("Attempting to delete comment: $commentId");
//     // Get the token
//     final token = await getToken();
//     if (token == null) {
//       throw Exception('Token not found');
//     }
//     // Make the DELETE request with authorization
//     final response = await http.delete(
//       Uri.parse('http://10.0.2.2:8080/sengineer/comment/delete/$commentId'),
//       headers: {
//         'Authorization': 'Bearer $token',
//         'Content-Type': 'application/json',
//       },
//     );
//     if (response.statusCode == 200) {
//       print("Comment deleted successfully");
//     } else {
//       throw Exception('Failed to delete comment');
//     }
//   } catch (e) {
//     // Handle error
//     print('Error deleting comment: $e');
//   }
// }








  Future<void> deleteTask(int taskId) async {
  try {
    print("Attempting to delete comment: $taskId");
    // Get the token
    final token = await getToken();
    if (token == null) {
      throw Exception('Token not found');
    }
    // Make the DELETE request with authorization
    print("object  21");
    final response = await http.delete(Uri.parse('http://localhost:8080/sengineer/task/$taskId'),
          headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );
      if (response.statusCode == 200) {
      print("Comment deleted successfully");
    } else {
      throw Exception('Failed to delete comment');
    }
  } catch (e) {
    // Handle error
    print('Error deleting comment: $e');
  }
}



 Future<void> CreateJobs(String jobName, String description,DateTime startDate,DateTime endDate,int taskId) async {
    final Map<String, dynamic> data = {
      'jobName': jobName,
    'description': description,
    'startDate': startDate.toIso8601String(),
    'endDate': endDate.toIso8601String(),
    'task': {
      'taskId': taskId,
    },     
  };

  try {
    final token = await getToken();
    if (token == null) {
      throw Exception('Token not found');
    }
      final response = await http.post(
        Uri.parse('http://localhost:8080/senginner/createJob'),        //http://10.0.2.2:8080/api/job/createJob
        headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',},          //http://10.0.2.2:8080/api/task/all
        body: json.encode(data),
      );
      print("object 05");
      if (response.statusCode == 201) {
        print('Data sent successfully');
      } else {
        print("exception 01");
        throw Exception("Failed to send data");
      }
    } catch (error) {
      print("error 01");
      print('Error: $error');
    }
  }




Future<void> updateJob(int jobId, String jobName, String description,DateTime startDate,DateTime endDate,int taskId) async {

final Map<String, dynamic> data = {
        'jobName':jobName,
        'description':description,
        'startDate':startDate.toIso8601String(),
        'endDate':endDate.toIso8601String(),
        'task':{
          'taskId':taskId,
        } 
      };

  try {
    final token = await getToken();
    if (token == null) {
      throw Exception('Token not found');
    }
    final response = await http.put(
      Uri.parse('http://localhost:8080/senginner/$jobId'),
        headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',},            
      body: json.encode(data),
    );

    print("Response status: ${response.statusCode}");
    print("Response body: ${response.body}");

    if (response.statusCode == 200) {
      // Successfully updated the comment
      print('Comment updated successfully');
    } else {
      // Failed to update the comment
      print('Failed to update comment: ${response.body}');
      throw Exception('Failed to update comment');
    }
  } catch (e) {
    // Handle error
    print('Error updating comment: $e');
  }
}


  Future<void> deleteJob(int jobId) async {

      try {
    print("Attempting to delete comment: $jobId");
    // Get the token
    final token = await getToken();
    if (token == null) {
      throw Exception('Token not found');
    }
    // Make the DELETE request with authorization

    final response = await http.delete(Uri.parse('http://localhost:8080/senginner/$jobId'),
          headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );
      if (response.statusCode == 200) {
      print("Comment deleted successfully");
    } else {
      throw Exception('Failed to delete comment');
    }
  } catch (e) {
    // Handle error
    print('Error deleting comment: $e');
  }
}
  
 Future<void> saveCommentJob(int jobId, int userID,String commentJobText) async {
    final Map<String, dynamic> data = {
    'job': {
      'jobId': jobId,
    },
    'commentedJobUser':{
      'userID':userID,
    },    
    'commentJobText': commentJobText,
  };
    try {
    final token = await getToken();
    if (token == null) {
      throw Exception('Token not found');
    }

      print(jobId);
      print(userID);
      print(commentJobText);
      final response = await http.post(
        Uri.parse('http://localhost:8080/sengineer/commentJob/sengineer/comment/createJobComment'),
        headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',},            
      body: json.encode(data),
    );

    print("Response status: ${response.statusCode}");
    print("Response body: ${response.body}");
      print("in the commentJob save");

      if (response.statusCode == 201) {
        print('Data sent successfully');
      } else {
        print("new error server");
        throw Exception(response.body);
     //   print(response.body);
      }
    } catch (error) {
      print('Error: $error');
    }
  }



  
Future<void> updateCommentJob(int commentJobId, String CommentJobText, int userID, int jobId) async {
  try {
   final token = await getToken();
    if (token == null) {
      throw Exception('Token not found');
    }
print(commentJobId);
      print(jobId);
      print('userId');
      print(userID);
      print('userId');
      print(CommentJobText);

    final response = await http.put(
      Uri.parse('http://localhost:8080/sengineer/commentJob/$commentJobId'),
      headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',},      
      body: json.encode({
    'job': {
      'jobId': jobId,
    },
    'commentedJobUser':{
      'userID':userID,
    },   
    'commentJobText':CommentJobText,
        }),
    );

    if (response.statusCode == 200) {
      // Successfully updated the comment
      print('Comment updated successfully');
    } else {
      // Failed to update the comment
      throw Exception('Failed to update comment');
    }
  } catch (e) {
    // Handle error
    print('Error updating comment: $e');
  }
}


    // Delete a comment from the backend
  Future<void> deleteCommentJob(int commentjobId) async {
 try {
       print("Attempting to delete comment: $commentjobId");
    // Get the token
    final token = await getToken();
    if (token == null) {
      throw Exception('Token not found');
    }
    print("object  21");
    print("delect comment job :");
    print(commentjobId);
    final response = await http.delete(Uri.parse('http://localhost:8080/sengineer/commentJob/delete/$commentjobId'),
    headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      );
    if (response.statusCode == 200) {
      print("Comment deleted successfully");
    } else {
      throw Exception('Failed to delete comment');
    }
  } catch (e) {
    // Handle error
    print('Error deleting comment: $e');
  }
}




Future<void> updateTaskStatus(int taskId) async {
  try {
    final token = await getToken();
    if (token == null) {
      throw Exception('Token not found');
    }

    print('Task ID: $taskId');

    final response = await http.put(
      Uri.parse('http://localhost:8080/sengineer/$taskId/status'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: json.encode({
        'task': {
          'taskId': taskId,
        },
      }),
    );

    if (response.statusCode == 200) {
      print('Task status updated successfully');
    } else {
      print('Error from server: ${response.body}');
      throw Exception('Failed to update task status: ${response.statusCode}');
    }
  } catch (e) {
    print('Error updating task status: $e');
  }
}




Future<void> updateTaskStatusAsInProgress (int taskId) async {
  try {
    final token = await getToken();
    if (token == null) {
      throw Exception('Token not found');
    }

    print('Task ID: $taskId');

    final response = await http.put(
      Uri.parse('http://localhost:8080/sengineer/$taskId/mark-as-ongoing'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: json.encode({
        'task': {
          'taskId': taskId,
        },
      }),
    );

    if (response.statusCode == 200) {
      print('Task status updated successfully');
    } else {
      print('Error from server: ${response.body}');
      throw Exception('Failed to update task status: ${response.statusCode}');
    }
  } catch (e) {
    print('Error updating task status: $e');
  }
}





  
Future<void> updateInprogresToCompleted(int taskId) async {
  try {
   final token = await getToken();
    if (token == null) {
      throw Exception('Token not found');
    }
print(taskId);
    final response = await http.put(
      Uri.parse('http://localhost:8080/sengineer/$taskId/mark-as-done'),
      headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',},      
      body: json.encode({
       'task': {
          'taskId': taskId,
        },
        }),
    );

    if (response.statusCode == 200) {
      // Successfully updated the comment
      print('Comment updated successfully');
    } else {
      // Failed to update the comment
      throw Exception('Failed to update comment');
    }
  } catch (e) {
    // Handle error
    print('Error updating comment: $e');
  }
}


  
Future<void> updateCompletedToInprogress(int taskId) async {
  try {
   final token = await getToken();
    if (token == null) {
      throw Exception('Token not found');
    }
print(taskId);
    final response = await http.put(
      Uri.parse('http://localhost:8080/sengineer/$taskId/mark-as-undone'),
      headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',},      
      body: json.encode({
       'task': {
          'taskId': taskId,
        },
        }),
    );

    if (response.statusCode == 200) {
      // Successfully updated the comment
      print('Comment updated successfully');
    } else {
      // Failed to update the comment
      throw Exception('Failed to update comment');
    }
  } catch (e) {
    // Handle error
    print('Error updating comment: $e');
  }
}

////

}
