import 'package:flutter/material.dart';
import 'package:my_project/BackGround.dart';

class LoginPageone extends StatefulWidget {
  const LoginPageone({Key? key}) : super(key: key);

  @override
  State<LoginPageone> createState() => NameState();
}

class NameState extends State<LoginPageone> {

  final TextEditingController usernameController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  bool isFocused1 = false;
   bool isFocused2 = false;
   bool rememberMe = false;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Stack(
          children:[
            // Custom background widget
           const background(), // Assuming BackGround is your custom background widget


/* ..............white radius squire................ */
            // Your existing content
            Flexible(
              child: ListView(
              physics:const NeverScrollableScrollPhysics(),
               shrinkWrap: false,
                children: [
                  // Your content goes here
                  Center(
                    child: Container(
                      height: 691,
                      width: 322,
                      decoration: BoxDecoration(
                        color: const Color.fromARGB(255, 255, 255, 255),
                        borderRadius: BorderRadius.circular(41),
                        border: Border.all(
                          color: Colors.black,
                          width: 1.0,
                        ),
                      ),
                      // Additional styling if needed
                    ),
                  ),
                ],
              ),
            ),

/* ........................................... */   


/* ............login to your account ......... */   
         // Positioned widget should be placed here

  const Positioned(
   top: 169,
     left: 60,
    child: Text(
      'Login to your \nAccount',
      style: TextStyle(
        color: Color.fromRGBO(0, 31, 63, 1),
        fontWeight: FontWeight.w900,
        fontFamily: 'Inter',
        fontSize: 36,
      ),
    ),
  ),


/* ...................................... */   





/* .................user name enter.................... */

Stack(
  children: [
    Positioned(
      top: 327,
      left: 0,
      right: 0,
      child: Center(
        child: SizedBox(
          height: 52,
          width: 284,
          child: TextField(
            controller: usernameController,
            onChanged: (value1) {
             if (value1.isNotEmpty) {
          setState(() {
            isFocused1 = true;
          });
        } else {
          setState(() {
            isFocused2 = false;
          });
        }
      },
        
            decoration: InputDecoration(
              labelText: 'Username',
              prefixIcon:Icon(
              Icons.email_rounded,
              color:isFocused1 ? const Color.fromRGBO(0, 31, 63, 1) : const Color.fromRGBO(154, 162, 167, 1),
          ),
              filled: true,
              fillColor:const Color.fromRGBO(238, 240, 240, 1),
              border: OutlineInputBorder( 
      borderRadius: BorderRadius.circular(18.0),
      borderSide:const BorderSide(color: Color.fromRGBO(154, 162, 167, 1), )
     // Set your desired border radius
    ),
focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(18.0),
            borderSide: BorderSide(
             color: isFocused1 ? const Color.fromRGBO(0, 31, 63, 1) : const Color.fromRGBO(154, 162, 167, 1),
            ),
),

              labelStyle:TextStyle(
                fontSize: 20,
                fontFamily: 'Inter',
                color: isFocused1 ? const Color.fromRGBO(0, 31, 63, 1) : const Color.fromRGBO(154, 162, 167, 1),
              ),
            ),
          ),
        ),
      ),
    ),
    // Other widgets in the Stack if needed
  ],
),

/* .................................... */

/* .................password enter.................... */
Positioned(
  top: 396,
  left: 0,
  right: 0,
  child: Center(
    child: SizedBox(
      height: 52,
      width: 284,
      child: TextField(
        controller: passwordController,
        obscureText: true,
        onChanged: (value2) {
             if (value2.isNotEmpty) {
          setState(() {
            isFocused2 = true;
          });
        } else {
          setState(() {
            isFocused2 = false;
          });
        }
      },
        decoration: InputDecoration(
          labelText: 'Password',
          prefixIcon: Icon(
            Icons.lock,
            color: isFocused2 ? const Color.fromRGBO(255, 215, 0, 1) : const Color.fromRGBO(154, 162, 167, 1),
          ),
          filled: true,
          fillColor: isFocused2 ? const Color.fromRGBO(255, 247, 204, 1) : const Color.fromRGBO(238, 240, 240, 1),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(18.0),
            borderSide: BorderSide(
              color: isFocused2 ? const Color.fromRGBO(255, 215, 0, 1) : const Color.fromRGBO(154, 162, 167, 1),
          ),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(18.0),
            borderSide: BorderSide(
             color: isFocused2 ? const Color.fromRGBO(255, 215, 0, 1) : const Color.fromRGBO(154, 162, 167, 1),
            ),
          ),
          labelStyle: TextStyle(
            fontSize: 20,
            fontFamily: 'Inter',
            color: isFocused2 ? const Color.fromRGBO(255, 215, 0, 1) : const Color.fromRGBO(154, 162, 167, 1),
          ),
        ),
      ),
    ),
  ),
),
/* .................................... */









/* ............remember me ......... */   

 Positioned(
  top: 466,
  left: 0,
  right: 0,
  child: Center(
    child: Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
           Row(
            children: [ 
              GestureDetector(
          onTap: () {
            setState(() {
              rememberMe = !rememberMe;
            });
          },
          child: Icon(
            rememberMe ? Icons.check_box_outlined : Icons.check_box_outline_blank,
            color: rememberMe ?const Color.fromRGBO(0, 31, 63, 1) : const Color.fromRGBO(0, 31, 63, 1),
            size: 24.0, // Adjust the size based on your preference
          ),
        ),

        
              const Text(
                'Remember me',
                style: TextStyle(
                  color: Color.fromRGBO(0, 31, 63, 1),
                  fontWeight: FontWeight.w900,
                  fontFamily: 'Inter',
                  fontSize: 13,
                ),
              ),
            ],
          ),
        
      ],
    ),
  ),
),




/* ...................sing up................... */   





Positioned(
  top: 501,
  left: 0,
  right: 0,

  child:Center(
  child: SizedBox(
    width: 284,
    height: 42,

    child: ElevatedButton(
      onPressed: () {
        // Perform login logic here
        String username = usernameController.text;
        String password = passwordController.text;
        print('Username: $username, Password: $password , remember buttor: $isFocused2');
      },
      style: ElevatedButton.styleFrom(
        primary: const Color.fromRGBO(0, 31, 63, 1), // Background color
        onPrimary:const Color.fromARGB(255, 255, 255, 255), // Text color
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(75.0), // Rounded corners
        ),
       // padding:const EdgeInsets.symmetric(horizontal: 20, vertical: 16), // Adjust size here
      ),

      child:const Text(
        'Sign Up',
        style: TextStyle(
          fontSize: 19,
          fontFamily: 'Intel',
          fontWeight: FontWeight.bold,
        ),
      ),
)
  )
    ),
  ),


/* .....................................................................*/
 



/* ............forget ......... */   

  const Positioned(
  top: 559,
  left: 0,
  right: 0,
  child: Center(
    child: Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
     // Add some space between the checkbox and text
        Text(
          'Forgot the password?',
          style: TextStyle(
            color: Color.fromRGBO(255, 215, 0, 1),
            fontWeight: FontWeight.w600,
            fontFamily: 'Inter',
            fontSize: 13,
          ),
        ),
      ],
    ),
  ),
),


/* ...................................... */   

/* ............help ......... */   

  const Positioned(
  top: 633,
  left: 0,
  right: 0,
  child: Center(
    child: Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
     // Add some space between the checkbox and text
        Text(
          'Don’t have an account?',
          style: TextStyle(
            color: Color.fromRGBO(154, 162, 167, 1),
            fontWeight: FontWeight.w600,
            fontFamily: 'Inter',
            fontSize: 15,
          ),
        ),
        
Text(
          ' Help',
          style: TextStyle(
            color: Color.fromRGBO(255, 215, 0, 1),
            fontWeight: FontWeight.w600,
            fontFamily: 'Inter',
            fontSize: 15,
          ),
        ),

      
      ],
    ),
  ),
),


/* ...................................... */   

          ],
        ),
      ),
    );
  }
}
