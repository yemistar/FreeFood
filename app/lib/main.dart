import 'package:flutter/material.dart';

import './UI/List_page.dart';

void main()=> runApp(Login());



class Login extends StatelessWidget{




  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title:'Test' ,
      home: Scaffold(
        appBar: AppBar( title: Text('Hello'),),
        body: Center(
          child: ListTest(food: "Pizza",
          club: "Yemi club",
          time: "6pm",
          date: "mon sep 20",
          place: "Pearson",
          icon: Icons.local_pizza,),
        ),
      ),
    );
  }




}