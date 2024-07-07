import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:my_project/SiteEngineer/Task.dart';
import 'package:my_project/SiteEngineer/User.dart';

class Comment {
  final int commentId;
  final String commentText;
  final DateTime commentDate;
  final Task task;
  final User commentedUser;

  Comment({
    required this.commentId,
    required this.commentText,
    required this.commentDate,
    required this.task,
    required this.commentedUser,
  });
  factory Comment.fromJson(Map<String, dynamic> json) {
    return Comment(
      commentId: (json['commentId']??0)as int,
      //      startDate: DateTime.parse(json['startDate'] ?? DateTime.now().toIso8601String()),
      commentText: json['commentText']??'',
      commentDate: DateTime.parse(json['commentDate']??DateTime.now().toIso8601String()),
      task: Task.fromJson(json['task']??{}),
      commentedUser: User.fromJson(json['commentedUser']??{}),
    );
  }

    Map<String, dynamic> toJson() {
    return {
      'commentId': commentId,
      'commentText': commentText,
      'commentDate': commentDate.toIso8601String(),
      'task':task.toJson(),
      'commentedUser':commentedUser.toJson()

    };
  }

  
}




