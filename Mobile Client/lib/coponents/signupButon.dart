import 'package:flutter/material.dart';

class SignButtonCustom extends StatelessWidget {
  const SignButtonCustom({Key? key, required this.buttonSignUp}) : super(key: key);

  final String buttonSignUp;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SizedBox(
          width: 284,
          height: 42,
          child: ElevatedButton(
            onPressed: () {
              // Perform login logic here
            },
            style: ElevatedButton.styleFrom(
              primary: const Color.fromRGBO(0, 31, 63, 1), // Background color
              onPrimary: const Color.fromARGB(255, 255, 255, 255), // Text color
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(75.0), // Rounded corners
              ),
            ),
            child: Text(
              buttonSignUp,
              style:const  TextStyle(
                fontSize: 19,
                fontFamily: 'Intel',
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
