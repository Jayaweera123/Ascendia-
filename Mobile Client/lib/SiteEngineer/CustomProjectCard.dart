import 'dart:io';
import 'package:flutter/material.dart';
import 'package:my_project/SiteEngineer/HomeSiteEngineer.dart';

class CustomCard extends StatelessWidget {
  final String projectName;
  final String projectDescription;
  final String imageUrl;

  const CustomCard({
    Key? key,
    required this.projectName,
    required this.projectDescription,
    required this.imageUrl,
  }) : super(key: key);



  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        // Implement navigation to project details page if needed
        Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => HomeSite(


      )),
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
              child:Image.file(
                File(imageUrl),
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) {
                  return const Center(child: Icon(Icons.error
                  ,size: 20,));
                },
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
                      Text(
                        projectDescription,
                        style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w400,
                          fontFamily: 'Inter',
                        ),
                      ),
                      
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
