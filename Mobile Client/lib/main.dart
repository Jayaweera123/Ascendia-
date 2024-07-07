import 'package:flutter/material.dart';
import 'package:my_project/login.dart';
import 'package:my_project/firstPage.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const firstPage(),
      routes: {
        '/LoginPageone': (context) => const LoginPageone(),
        // Add other routes here as needed
      },
    );
  }
}
