import 'package:flutter/material.dart';
import 'package:my_project/BackGround.dart';
import 'package:my_project/SiteEngineer/HomeSiteEngineer.dart';
import 'package:my_project/SiteEngineer/JobAddSiteEngineer.dart';
import 'package:my_project/SiteEngineer/projectListSiteEngineer.dart';
import 'package:my_project/SiteEngineer/updateSiteEngineer.dart';
import 'package:my_project/login.dart';
//import 'package:my_project/ConstentParts.dart';

class tasksSite extends StatefulWidget {
  const tasksSite({Key? key}) : super(key: key);

  @override
  State<tasksSite> createState() => _ProjectSiteState();
}

class _ProjectSiteState extends State<tasksSite> {
  final TextEditingController searchingcontroller = TextEditingController();
  String projectName = 'My Project 01';
  String projectSubName = 'The Galle Techno-Park';
  bool isFocused2 = false;
  void newTasksFormGo() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) =>const JobAddSite()),
    );
  }
void newUpadatesFormGo(){
Navigator.push(
      context,
      MaterialPageRoute(builder: (context) =>const updateSite(
      )),
    );

}
void logingPageGo(){
Navigator.push(
      context,
      MaterialPageRoute(builder: (context) =>const LoginPageone()),
    );

}

//LoginPageone
void taskGoToHome (){
  Navigator.push(
      context,
      MaterialPageRoute(builder: (context) =>const HomeSite(

        
      )),
    );
}
void projectListGo (){
}

//projectList


  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        resizeToAvoidBottomInset: false,
        body: Stack(
        
          children: [
            const background(), // Assuming Background is a widget from BackGround.dart

            Center(
              child: Container(
                height: 730,
                width: 334,
                decoration: BoxDecoration(
                  color: const Color.fromARGB(255, 255, 255, 255),
                  borderRadius: BorderRadius.circular(41),
                  border: Border.all(
                    color: Colors.black,
                    width: 1.0,
                  ),
                ),
              ),
            ),


            Container(

                height: 800,
                decoration: const BoxDecoration(),
            
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
            
                  children: [
                    const Padding(padding: EdgeInsets.only(top: 35)),
            
                    Row(children: [
                      const SizedBox(
                        width: 35,
                      ),
            
                      Container(
                        decoration: const BoxDecoration(),
                        alignment: Alignment.topLeft,
                        child: IconButton(
                          icon: const Icon(
                            Icons.arrow_back,
                            color: Color.fromRGBO(0, 31, 63, 1),
                            size: 30,
                          ),
                          onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (context) => HomeSite()),
                            );
                          },
                        ),
                      ),
            
                      Row(
                        children: [
                        Image.asset(
                          'asset/campany logo.jpg',
                          width: 50.0, // Set the width as needed
                          height: 50.0, // Set the height as needed
                          fit: BoxFit.cover, // Set the height as needed
                        ),
                      ]),
                    ]
                    ),
            
                    Row(children: [
                      const SizedBox(
                        width: 50,
                      ),
            
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
            
                       
                          
            Container(
              color:const Color.fromARGB(255, 255, 255, 255),
          
                           child:Text(
                              '$projectName- Tasks',
                              style: const TextStyle(
                                color: Color.fromRGBO(50, 75, 101, 1),
                                fontSize: 20.0,
                                fontWeight: FontWeight.bold,
                                fontFamily: 'Inter',
                              ),
                            ),
                          ),
            Container(
              color:const Color.fromARGB(255, 255, 255, 255),
           
                          child:Text(
                            projectSubName,
                            style: const TextStyle(
                              color: Color.fromRGBO(102, 120, 139, 1),
                              fontSize: 13.0,
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Inter',                              
                            ),
                            textAlign: TextAlign.left,
                          ),
 ),

                        ],
                      )
                    ]
                    ),



SizedBox(
  height: 550,
 
  child: Column(
    children: [

const Padding(padding: EdgeInsets.all(25)),  


InkWell(
  onTap: newTasksFormGo,
      child:Container(
        width: 287,
        height:57,
        decoration: BoxDecoration(
          
            borderRadius: BorderRadius.circular(19.0),
            color:const Color.fromRGBO(255, 215, 0, 1),
            border: Border.all(
              color: const Color.fromRGBO(0, 31, 63, 1),
              width: 1.5,
            )
          ),
child:const Center(
           child:Text(
            'Jobs',
            style: TextStyle(
              fontFamily: 'Inter',
              fontSize: 16,
              fontWeight:FontWeight.bold,
              color:  Color.fromRGBO(50, 75, 101, 1),
            ),
          ),
)

        ),
),


       const Padding(padding: EdgeInsets.all(19)),

       InkWell(
  onTap: newUpadatesFormGo,
child:Container(
        width: 287,
        height:57,
        decoration: BoxDecoration(
          
            borderRadius: BorderRadius.circular(19.0),
            color:const Color.fromRGBO(255, 215, 0, 1),
            border: Border.all(
              color: const Color.fromRGBO(0, 31, 63, 1),
              width: 1.5,
            )
          ),
child:const Center(
           child:Text(
            'Update Progress',
            style: TextStyle(
              fontFamily: 'Inter',
              fontSize: 16,
              fontWeight:FontWeight.bold,
              color:  Color.fromRGBO(50, 75, 101, 1),
            ),
          ),
)

        ),

       ),

     const Padding(padding: EdgeInsets.all(19)),


        ]// Content for the first container
      ),
    
      ),
    





SizedBox(
  width: 250,

child:Row(
  mainAxisAlignment: MainAxisAlignment.spaceAround,
  children: [

InkWell(
  onTap: taskGoToHome,

    child:Container(
      color: const Color.fromARGB(255, 255, 255, 255),
      child: Column(
        children: [
          Image.asset(
                          'asset/house.png',
                          width: 45.0, // Set the width as needed
                          height: 45.0, // Set the height as needed
                          fit: BoxFit.cover, // Set the height as needed
                          color:const Color.fromRGBO(154, 162, 167, 1),
                        ),
            const Text(
              'Home',
              style: TextStyle(
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: FontWeight.bold,
                color: Color.fromRGBO(154, 162, 167, 1),
              ),
            )
        ],
      ),
    ),
),


     Container(
     color: const Color.fromARGB(255, 255, 255, 255),
      child: Column(
        children: [
          Image.asset(
                          'asset/tasks.png',
                          width: 45.0, // Set the width as needed
                          height: 45.0, // Set the height as needed
                          fit: BoxFit.cover, // Set the height as needed
                          color:const Color.fromRGBO(0, 31, 63, 1),
                        ),
            const Text(
              'Tasks',
              style: TextStyle(
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: FontWeight.bold,
                color: Color.fromRGBO(0, 31, 63, 1),
              ),
            )
        ],
      ),
    ),
  ],
),

),

                  ],
                )
                ),


          ],
        ),
      ),
    );
  }
}
