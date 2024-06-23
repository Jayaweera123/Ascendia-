import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:my_project/SiteEngineer/Job.dart';
import 'package:my_project/SiteEngineer/User.dart';

class CommentJob {
  final int commentJobId;
  final Job job;
  final User commentedJobUser;
  final DateTime commentJobDate;
  final String commentJobText; 

  CommentJob({
    required this.commentJobId,
    required this.job,
    required this.commentedJobUser,  
    required this.commentJobDate,
    required this.commentJobText
    
  });
  factory CommentJob.fromJson(Map<String, dynamic> json) {
    return CommentJob(
      commentJobId: (json['commentId']??0)as int,
      job: Job.fromJson(json['task']??{}),
      commentedJobUser: User.fromJson(json['commentedUser']??{}),
      commentJobDate: DateTime.parse(json['commentDate']??DateTime.now().toIso8601String()),
      commentJobText: json['commentText']??'',
      
    );
  }

    Map<String, dynamic> toJson() {
    return {
      'commentJobId': commentJobId,
      'job':job.toJson(),
      'commentedJobUser':commentedJobUser.toJson(),
      'commentJobDate': commentJobDate.toIso8601String(),
      'commentJobText': commentJobText

    };
  } 
}




