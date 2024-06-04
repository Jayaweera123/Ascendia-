import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:my_project/SiteEngineer/Comment.dart';
class Service{


 Future<void> saveComment(int taskId, int userId, String taskName, String commentText, String commentDate) async {
    final Map<String, dynamic> data = {
    'taskId': taskId,
    'userId': userId,
    'taskName': taskName,
    'commentText': commentText,
    'commentDate': commentDate,
  };
    try {
      final response = await http.post(
        Uri.parse('http://10.0.2.2:8080/api/v2/comment/createComment'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(data),
      );
      if (response.statusCode == 201) {
        print('Data sent successfully');
      } else {
        throw Exception('Failed to send data');
      }
    } catch (error) {
      print('Error: $error');
    }
  }


Future<void> updateComment(int commentId, String updatedCommentText, String commentDate, String taskName, int userId, int taskId) async {
  try {
    final response = await http.put(
      Uri.parse('http://10.0.2.2:8080/api/v2/comment/$commentId'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'commentText': updatedCommentText,
        'commentDate': commentDate,
        'taskName': taskName,
        'userId': userId,
        'taskId': taskId
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
    print("object  21");
    final response = await http.delete(Uri.parse('http://10.0.2.2:8080/api/v2/comment/$commentId'));
    print("object21");
    if (response.statusCode != 200) {
      throw Exception('Failed to delete comment');
    }
  }



 Future<void> saveTask(String taskName, String description,DateTime startDate,DateTime endDate,int projectId) async {
    final Map<String, dynamic> data = {
      'taskName': taskName,
      'description': description,
      'startDate': startDate,
      'endDate': endDate,
      'projectId': projectId
      
  };
    try {
      final response = await http.post(
        Uri.parse('http://10.0.2.2:8080//api/task'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(data),
      );
      if (response.statusCode == 201) {
        print('Data sent successfully');
      } else {
        throw Exception('Failed to send data');
      }
    } catch (error) {
      print('Error: $error');
    }
  }


  //static const String _baseUrl = 'http://10.0.2.2:8080//api/project/all';

  static Future<List<String>> fetchTaskNames() async {
    final response = await http.get(Uri.parse('http://10.0.2.2:8080/api/task/all'));

    if (response.statusCode == 200) {
      List<dynamic> data = json.decode(response.body);
      return List<String>.from(data);
    } else {
      throw Exception('Failed to load task names');
    }
  }


}
