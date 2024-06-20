import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:my_project/SiteEngineer/Project.dart';
    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private Long taskId;
    // @Column(nullable = false, length = 100)
    // private String taskName;
    // @Column(nullable = false, length = 1000)
    // private String description;
    // @Column
    // private LocalDate startDate;
    // @Column(nullable = false)
    // private LocalDate endDate;

    // @Column(nullable = false)
    // private LocalDate createdDate;

    // @Column(name = "current_status")
    // private String status;

    // @Column(name = "previous_status")
    // private String prevStatus;

    // @Column(nullable = false)
    // private boolean completed;

    // /*@Column(name = "task_status")
    // @Enumerated(EnumType.STRING)
    // private TaskStatus taskStatus;*/

    // @ManyToOne
    // @JoinColumn(name = "project_id", nullable = false, referencedColumnName = "projectId")
    // private Project project;


class Task {
  final int taskId;
  final String taskName;
  final String description;
  final DateTime startDate;
  final DateTime endDate;
  final DateTime createdDate;
  final String status;
  final String prevStatus;
  final bool completed;
  final Project project;

  Task({
    required this.taskId,
    required this.taskName,
    required this.description,
    required this.startDate,
    required this.endDate,
    required this.createdDate,
    required this.status,
    required this.prevStatus,
    required this.project,
    required this.completed
  });
  factory Task.fromJson(Map<String, dynamic> json) {
    return Task(
      taskId: (json['taskId'] ?? 0) as int, // Provide a default value if taskId is null
      taskName: json['taskName'] ?? '',
      description: json['description'] ?? '',
      startDate: DateTime.parse(json['startDate'] ?? DateTime.now().toIso8601String()),
      endDate: DateTime.parse(json['endDate'] ?? DateTime.now().toIso8601String()),
      createdDate: DateTime.parse(json['createdDate'] ?? DateTime.now().toIso8601String()),
      status: json['status'] ?? '',
      prevStatus: json['prevStatus'] ?? '',
      completed: json['completed'] ?? false,
      project: Project.fromJson(json['projectId']??{}), // Provide a default value if projectId is null
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
      'project': project.toJson(),
    };
  }

  
}




