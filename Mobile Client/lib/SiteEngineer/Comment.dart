import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;



class Comment {
  final int commentId;
  final int taskId;
  final String taskName;
  final int userId;
  final String commentText;
  final String commentDate;

  Comment({
    required this.commentId,
    required this.taskId,
    required this.taskName,
    required this.userId,
    required this.commentText,
    required this.commentDate,
  });
  factory Comment.fromJson(Map<String, dynamic> json) {
    return Comment(
      commentId: json['commentId'],
      taskId: json['taskId'],
      taskName: json['taskName'] ??'',
      userId: json['userId'],
      commentText: json['commentText']??'',
      commentDate: json['commentDate']??'',
    );
  }

    Map<String, dynamic> toJson() {
    return {
      'commentId': commentId,
      'taskId': taskId,
      'taskName': taskName,
      'userId': userId,
      'commentText': commentText,
      'commentDate': commentDate,
    };
  }

  
}




