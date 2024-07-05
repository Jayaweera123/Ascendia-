import 'dart:io';
import 'package:flutter/material.dart';
import 'package:my_project/SiteEngineer/HomeSiteEngineer.dart';

class CustomCard extends StatelessWidget {
  final String projectName;
  final String projectDescription;
  final String imageUrl;
  final int projectId;
  final int userID;

  const CustomCard(
      {Key? key,
      required this.projectName,
      required this.projectDescription,
      required this.imageUrl,
      required this.userID,
      required this.projectId})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        // Implement navigation to project details page if needed
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => HomeSite()),
        );
      },
      child: Column(
        children: [
          Container(
            height: 90,
            width: 280,
            decoration: const BoxDecoration(
              color: Colors.red,
              border: Border(
                bottom: BorderSide(width: 1.0, color: Colors.black),
              ),
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(40.0),
                topRight: Radius.circular(40.0),
              ),
            ),
            child: ClipRRect(
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(40.0),
                topRight: Radius.circular(40.0),
              ),
              child: Image.asset(
                'asset/project.jpg',
                width: 50.0, // Set the width as needed
                height: 50.0, // Set the height as needed
                fit: BoxFit.cover, // Set the height as needed
              ),
            ),
          ),
          Container(
            height: 70,
            width: 280,
            color: const Color.fromRGBO(255, 215, 0, 1),
            child: Column(
              children: [
                Container(
                  height: 70,
                  width: 260,
                  color: const Color.fromRGBO(255, 215, 0, 1),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        projectName,
                        style: const TextStyle(
                          fontSize: 19,
                          fontWeight: FontWeight.bold,
                          fontFamily: 'Inter',
                        ),
                      ),
                      Text(
                        projectName, // You can add a parameter for subtitle if needed
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w500,
                          fontFamily: 'Inter',
                        ),
                      ),
                      const Padding(padding: EdgeInsets.all(2)),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
