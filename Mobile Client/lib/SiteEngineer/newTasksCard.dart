import 'package:flutter/material.dart';
//import 'package:my_project/SiteEngineer/TaskCommentFormSiteEngineer.dart';

class TasksCard extends StatefulWidget {
  final String tasksCardName;

  const TasksCard({
    Key? key,
    required this.tasksCardName,
  }) : super(key: key);

  @override
  _TasksCardState createState() => _TasksCardState();
}

class _TasksCardState extends State<TasksCard> {
  bool rememberMe1 = false;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(2),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          // Checkbox(
          // value: widget.tasksComplete,
          //   onChanged: widget.onComplete,
          // ),
          SizedBox(
            width: 160,
            child: Text(
              widget.tasksCardName,
              maxLines: 10,
            ),
          ),
          SizedBox(
            width: 120,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                GestureDetector(
                  onTap: () {
                    setState(() {
                      rememberMe1 = !rememberMe1;
                    });
                  },
                  child: Icon(
                    rememberMe1
                        ? Icons.check_box_outlined
                        : Icons.check_box_outline_blank,
                    color: rememberMe1
                        ? const Color.fromRGBO(0, 31, 63, 1)
                        : const Color.fromRGBO(0, 31, 63, 1),
                    size: 24.0,
                  ),
                ),
                const SizedBox(width: 10), // Adjust the space between icons

                GestureDetector(
                  onTap: () {},
                  child: const Icon(
                    Icons.add_box_outlined,
                    size: 24.0,
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
