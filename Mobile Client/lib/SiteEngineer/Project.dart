import 'dart:async';
import 'dart:convert';
//import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class Project {
  final int projectId;
  final String projectName;
  final String projectType;
  final String projectDescription;
  final String projectStatus;
  final DateTime createdDate;
  final DateTime endDate;
  final int pmId;
  final String image;

  Project({
    required this.projectId,
    required this.projectName,
    required this.projectType,
    required this.projectDescription,
    required this.projectStatus,
    required this.createdDate,
    required this.endDate,
    required this.pmId,
    required this.image,
  });

  factory Project.fromJson(Map<String, dynamic> json) {
    return Project(
      projectId: (json['projectId']??0)as int,
      projectName: json['projectName']??'',
      projectType: json['projectType']??'',
      projectDescription: json['projectDescription']??'',
      projectStatus: json['projectStatus']??'',
      createdDate: DateTime.parse(json['createdDate']??DateTime.now().toIso8601String()),
      endDate: DateTime.parse(json['endDate']??DateTime.now().toIso8601String()),
      pmId: (json['pmId']??0)as int,
      image: json['image']??'',
    );
  }
  Map<String, dynamic> toJson() => {
    'projectId': projectId,
    'projectName': projectName,
    'projectType': projectType,
    'projectDescription': projectDescription,
    'projectStatus': projectStatus,
    'createdDate': createdDate.toIso8601String(),
    'endDate': endDate.toIso8601String(),
    'pmId': pmId,
    'image': image,
  };

}