import 'dart:async';
import 'dart:convert';
import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;



class Job{
  final int jobId;
  final String jobName;
  final String description;
  final DateTime startDate;
  final DateTime endDate;
  final String status;
  final bool isDone;
  final int taskId;

  Job({
    required this.jobId,
    required this.jobName,
    required this.description,
    required this.startDate,
    required this.endDate,
    required this.status,
    required this.isDone,
    required this.taskId});

  factory Job.fromJson(Map<String, dynamic> json) {
    return Job(
      jobId: (json['jobId']??0)as int,
      jobName: json['jobName']??'',
      description: json['description']??'',
      startDate: DateTime.parse(json['startDate']??DateTime.now().toIso8601String()),
      endDate: DateTime.parse(json['endDate']??DateTime.now().toIso8601String()),
      status: json['status']??'',
      isDone: json['isDone'] ?? false, // Default to false if not present
      taskId: (json['taskId']??0)as int,
    );
  }
Map<String, dynamic> toJson() {
  return {
    'jobId': jobId,
    'jobName': jobName,
    'description': description,
    'startDate': startDate.toIso8601String(),
    'endDate': endDate.toIso8601String(),
    'status': status,
    'isDone': isDone,
    'task':{
      'taskId': taskId,
      },   
  };
}


}