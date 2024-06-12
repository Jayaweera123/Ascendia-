import 'dart:async';
import 'dart:convert';
import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;



class Task {
  final int taskId;
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
      taskId: (json['taskId'] ?? 0) as int, // Provide a default value if taskId is null
      taskName: json['taskName'] ?? '',
      description: json['description'] ?? '',
      startDate: DateTime.parse(json['startDate'] ?? DateTime.now().toIso8601String()),
      endDate: DateTime.parse(json['endDate'] ?? DateTime.now().toIso8601String()),
      status: json['status'] ?? '',
      projectId: (json['projectId'] ?? 0) as int, // Provide a default value if projectId is null
    );
  }

    Map<String, dynamic> toJson() {
    return {
      'taskId': taskId,
      'taskName': taskName,
      'description': description,
      'startDate': startDate.toIso8601String(),
      'endDate': endDate.toIso8601String(),
      'status': status,
      'project':  {
            'projectId': projectId,
    },
    };
  }

  
}




