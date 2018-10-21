import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import '../Utils/Email.dart';
import 'dart:convert';
import 'package:async/async.dart';
import '../get_sent/GetData.dart';

class Emails extends StatefulWidget{
  @override
  State<StatefulWidget> createState() {
    return EmailsState();
  }









}

class EmailsState extends State<Emails>{

  var url= "https://github.com/yemistar/FreeFood/blob/master/shit.json";
  GetData data;
  List<Data> data2;
  List<ListTest> list = new List();


  fetchData() async{
    var res = await http.get(url);
    var decodedjason = jsonDecode(res.body);
    data=GetData.fromJson(decodedjason);

    setState(() {
      data2= data.data;

    });

  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Test'),

      ),
      body: ListView.builder(
          itemBuilder: (BuildContext context, int index){
             ListTest(data: data2.removeAt(index));
          }
      ),

    );
  }

}