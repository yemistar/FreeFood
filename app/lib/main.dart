import 'package:flutter/material.dart';

import './Utils/Email.dart';

void main()=> runApp(Login());



class Login extends StatelessWidget{




  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title:'Test' ,
      home: Scaffold(
        appBar: AppBar( title: Text('Hello'),),
        body: Center(
          child: ListTest(),
        ),
      ),
    );
  }




}