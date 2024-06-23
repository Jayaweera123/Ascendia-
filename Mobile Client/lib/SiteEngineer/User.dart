import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;


class User{
    final int userID;
    final String firstName;
    final String lastName;
    final String designation;
    final String department;
    final String username;
    final String password;
    final String email;
    final String phoneNumber;
    final DateTime addedDate;
    final String profilePicUrl;
    final bool availability; // Flag indicating availability
    final bool active;

User({
    required this.userID,
    required this.firstName,
    required this.lastName,
    required this.designation,
    required this.department,
    required this.username,
    required this.password,
    required this.email,
    required this.phoneNumber,
    required this.addedDate,
    required this.profilePicUrl,
    required this.availability,
    required this.active

});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      userID: (json['userID']??0)as int,
      firstName: json['firstName']??'',
      lastName: json['lastName']??'',
      designation: json['destination']??'',
      department: json['department']??'',
      username: json['username']??'',
      password: json['password']??'',
      email: json['email']??'',
      phoneNumber: json['phoneNumber']??'',
      addedDate: DateTime.parse(json['addedDate']??DateTime.now().toIso8601String()),
      profilePicUrl:json['profilePicUrl']??'',
      availability:json['availability']??false ,
      active: json['active']??false
    );
  }

Map<String, dynamic> toJson() {
  return {
    'userID':userID,
    'firstName':firstName,
    'lastName':lastName,
    'destination':designation,
    'department':department,
    'username':username,
    'password':password,
    'email':email,
    'phoneNumber':phoneNumber,
    'addedDate':addedDate.toIso8601String(),
    'profilePicUrl':profilePicUrl,
    'availability':availability,
    'active':active
  };
}



}