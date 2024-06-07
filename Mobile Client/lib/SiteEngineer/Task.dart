import 'dart:async';
import 'dart:convert';
import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;



class Task {
  final Long taskId;
  final String taskName;
  final String description;
  final DateTime startDate;
  final DateTime endDate;
  final String status;
  final int projectId;

  Task({
    required this.taskId,
    required this.taskName,
    required this.description,
    required this.startDate,
    required this.endDate,
    required this.status,
    required this.projectId,
  });
  factory Task.fromJson(Map<String, dynamic> json) {
    return Task(
      taskId: json['taskId'],
      taskName: json['taskName'],
      description: json['description'] ??'',
      startDate: json['startDate'],
      endDate: json['endDate']??'',
      status: json['status']??'',
      projectId: json['projectId'],
    );
  }

    Map<String, dynamic> toJson() {
    return {
      'taskId': taskId,
      'taskName': taskName,
      'description': description,
      'startDate': startDate,
      'endDate': endDate,
      'status': status,
      'projectId': projectId,
    };
  }

  
}




