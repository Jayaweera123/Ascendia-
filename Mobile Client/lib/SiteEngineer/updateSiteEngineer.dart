import 'package:flutter/material.dart';
import 'package:my_project/BackGround.dart';
import 'package:my_project/SiteEngineer/CompleteSiteEngineer.dart';
import 'package:my_project/SiteEngineer/inProgressSiteEngineer.dart';
import 'package:my_project/SiteEngineer/tasksAddFormSiteEngineer.dart';
//import 'package:my_project/coponents/signupButon.dart';
//import 'package:my_project/ConstentParts.dart';

class updateSite extends StatefulWidget {
  
  const updateSite({Key? key}) : super(key: key);
  

  @override
  State<updateSite> createState() => _ProjectSiteState();
}

class _ProjectSiteState extends State<updateSite> {
  final TextEditingController searchingcontroller = TextEditingController();
  final TextEditingController controller5 = TextEditingController();

  String projectName = 'My Project 01';
  String projectSubName = 'The Galle Techno-Park';
  bool isFocused2 = false;
    final String buttonSignUp='Submit';
    List<String> dataList = [];

    void inProgressGoToNew() {
  Navigator.push(
    context,
    MaterialPageRoute(
      builder: (context) => inProgressSite(
        dataList: dataList,
      ),
    ),
  );
}


    void newTaskGoToForm(){
      Navigator.push(
      context,
      MaterialPageRoute(builder: (context) =>  TaskAddSite(
        onTaskAdded: (newTask) {
          // Add your task added logic here
        },
      ),
      
      ),
    );
    }

    void toDoGoComplete(){
          Navigator.push(
      context,
      MaterialPageRoute(builder: (context) =>const completeSite()),
          ); 
    }

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
                        decoration: const BoxDecoration(
                            //color: Color.fromARGB(255, 114, 89, 13),
                            ),
                        alignment: Alignment.topLeft,
            
                        child: const Icon(
                          Icons.arrow_back,
                          color: Color.fromRGBO(0, 31, 63, 1),
                          size: 30,
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
                              '$projectName- Update',
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

    const Padding(padding: EdgeInsets.all(7)),

SizedBox(
  width: 290,

child:Row(

mainAxisAlignment:MainAxisAlignment.spaceBetween,
  
  children: [
                   
/* ..............................In Progress button............................. */
InkWell(

child:Container(
  width: 108,
  height: 36,
   decoration: BoxDecoration(
          
            borderRadius: BorderRadius.circular(19.0),
            color: const Color.fromRGBO(255, 215, 0, 1),
            border: Border.all(
              color: const Color.fromRGBO(0, 31, 63, 1),
              width: 1.0,
            )
          ),
          child:const Center(
child:Text(
                          'In Progress',
                            style: TextStyle(
                              
                              color:  Color.fromRGBO(50, 75, 101, 1),
                              fontSize: 16.0,
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Inter',                              
                            ),
                           // textAlign: TextAlign.top,
                          ),
)
           ),
),
 /* ..............................In Progress button end............................. */

/* ..............................to-do button............................. */

InkWell(
 onTap: inProgressGoToNew,
child:Container(
  width: 66,
  height: 36,
   decoration: BoxDecoration(
          
            borderRadius: BorderRadius.circular(19.0),
            color:  const Color.fromRGBO(50, 75, 101, 1),
            border: Border.all(
              color: const Color.fromRGBO(0, 31, 63, 1),
              width: 1.0,
            )
          ),
          child:const Center(
child:Text(
                          'To-Do',
                            style: TextStyle(
                              
                              color:  Color.fromRGBO(255, 215, 0, 1),
                              fontSize: 16.0,
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Inter',                              
                            ),
                           // textAlign: TextAlign.top,
                          ),
)
           ),
),

 /* ..............................to-do button end............................. */


/* ..............................Completed button............................. */
InkWell(
  onTap:toDoGoComplete,
  child:Container(
  width: 101,
  height: 36,
   decoration: BoxDecoration(
          
            borderRadius: BorderRadius.circular(19.0),
            color:const  Color.fromRGBO(50, 75, 101, 1),
            border: Border.all(
              color: const Color.fromRGBO(0, 31, 63, 1),
              width: 1.0,
            )
          ),
          child:const Center(
child:Text(
                          'Completed',
                            style: TextStyle(
                              
                              color:Color.fromRGBO(255, 215, 0, 1),
                              fontSize: 16.0,
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Inter',                              
                            ),
                           // textAlign: TextAlign.top,
                          ),
)
           ),
)
 /* ..............................Completed button end............................. */


],)



),

const Padding(padding: EdgeInsets.all(10)),

SizedBox(
  width: 284,
  //Color:Colors.amber,
  child:Row(

    
mainAxisAlignment: MainAxisAlignment.end,
    children:[

Container(
              color:const Color.fromARGB(255, 255, 255, 255),
          
                           child:const Text(
                              'Done',
                              style: TextStyle(
                                color: Color.fromRGBO(102, 120, 139, 1),
                                fontSize: 14.0,
                                fontWeight: FontWeight.bold,
                                fontFamily: 'Inter',
                              ),
                            ),
                          ),


const Padding(padding: EdgeInsets.all(10),),
Container(
              color:const Color.fromARGB(255, 255, 255, 255),
          
                           child:const Text(
                              'Comment',
                              style: TextStyle(
                                color: Color.fromRGBO(102, 120, 139, 1),
                                fontSize: 14.0,
                                fontWeight: FontWeight.bold,
                                fontFamily: 'Inter',
                              ),
                            ),
                          )

  ])
),


Container(

  color: Colors.amber,
  width:284,
  height:400,
  child:const Column(
children: [




],
  ),

),





const Padding(padding: EdgeInsets.all(5)),

InkWell(
  onTap:newTaskGoToForm,
child:const SizedBox(
  width:284,
  height:30,
  child: Row(
children: [
  Icon(Icons.add_circle_outlined,
  color: Color.fromRGBO(50, 75, 101, 1),
  size: 30,
  ),
  
  Text(
       'Add Tasks',
        style: TextStyle(
        color: Color.fromRGBO(50, 75, 101, 1),
         fontSize: 20.0,
         fontWeight: FontWeight.bold,
          fontFamily: 'Inter',
           ),
          ),


],
  ),
),
),

const Padding(padding: EdgeInsets.all(10)),

Center(
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


                  ],
                )
                ),


          ],
        ),
      ),
    );
  }
}