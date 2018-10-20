import 'package:flutter/material.dart';

import './UI/List_page.dart';

void main()=> runApp(Login());

class Login extends StatelessWidget{

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title:'Test' ,
      home: Scaffold(
        appBar: AppBar( title: Text('Test'),),
        body: Center(
          child: blocks.all2(),
        ),
      ),
    );
  }




}