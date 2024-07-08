import 'package:flutter/material.dart';

class background extends StatelessWidget {
  const background({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: CustomPaint(
          child: CustomPaint(
            painter: CustomShapePainter(
              topLeft1: const Offset(0, 0),
              topRight1: const Offset(302.5, 0),
              bottomLeft1: const Offset(0, 435), //navy blue rectangle

              topLeft3: const Offset(0, 572),
              topRight3: const Offset(394, 0),
              bottomLeft3: const Offset(0, 735),
              bottomRight3: const Offset(394, 170.35), // wigth color squire

              topLeft2: const Offset(0, 435),
              topRight2: const Offset(394, -135.5),
              bottomLeft2: const Offset(-1, 876),
              bottomRight2: const Offset(394, 310), // yellow color squire

              topLeft4: const Offset(52, 800),
              topRight4: const Offset(397, 305),
              bottomLeft4: const Offset(397, 800),
              //bottomRight4: Offset(360, 210),// gray color squire
            ),
            child: const SizedBox(
              height: 300,
              width: 300,
            ),
          ),
        ),
      ),
    );
  }
}

class CustomShapePainter extends CustomPainter {
  final Offset topLeft1;
  final Offset topRight1;
  final Offset bottomLeft1;

  final Offset topLeft2;
  final Offset topRight2;
  final Offset bottomLeft2;
  final Offset bottomRight2;

  final Offset topLeft3;
  final Offset topRight3;
  final Offset bottomLeft3;
  final Offset bottomRight3;

  final Offset topLeft4;
  final Offset topRight4;
  final Offset bottomLeft4;
  // final Offset bottomRight4;

  CustomShapePainter({
    required this.topLeft1,
    required this.topRight1,
    required this.bottomLeft1,
    required this.topLeft2,
    required this.topRight2,
    required this.bottomLeft2,
    required this.bottomRight2,
    required this.topLeft3,
    required this.topRight3,
    required this.bottomLeft3,
    required this.bottomRight3,
    required this.topLeft4,
    required this.topRight4,
    required this.bottomLeft4,
    //required this.bottomRight4,
  });

  @override
  void paint(Canvas canvas, Size size) {
    Paint paint1 = Paint()..color = const Color.fromRGBO(0, 31, 63, 1);
    Paint paint3 = Paint()..color = const Color.fromARGB(255, 255, 255, 255);
    Paint paint2 = Paint()..color = const Color.fromRGBO(255, 215, 0, 1);
    Paint paint4 = Paint()..color = const Color.fromRGBO(54, 69, 79, 1);

    // Draw a custom shape with adjustable points
    Path path1 = Path()
      ..moveTo(topLeft1.dx, topLeft1.dy)
      ..lineTo(topRight1.dx, topRight1.dy)
//      ..lineTo(bottomRight.dx, bottomRight.dy)
      ..lineTo(bottomLeft1.dx, bottomLeft1.dy)
      ..close();

    Path path3 = Path()
      ..moveTo(topLeft3.dx, topLeft3.dy)
      ..lineTo(topRight3.dx, topRight3.dy)
      ..lineTo(bottomRight3.dx, bottomRight3.dy)
      ..lineTo(bottomLeft3.dx, bottomLeft3.dy)
      ..close();

    Path path2 = Path()
      ..moveTo(topLeft2.dx, topLeft2.dy)
      ..lineTo(topRight2.dx, topRight2.dy)
      ..lineTo(bottomRight2.dx, bottomRight2.dy)
      ..lineTo(bottomLeft2.dx, bottomLeft2.dy)
      ..close();

    Path path4 = Path()
      ..moveTo(topLeft4.dx, topLeft4.dy)
      ..lineTo(topRight4.dx, topRight4.dy)
      // ..lineTo(bottomRight4.dx, bottomRight4.dy)
      ..lineTo(bottomLeft4.dx, bottomLeft4.dy)
      ..close();

    canvas.drawPath(path1, paint1);
    canvas.drawPath(path2, paint2);
    canvas.drawPath(path3, paint3);
    canvas.drawPath(path4, paint4);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    return false;
  }
}
