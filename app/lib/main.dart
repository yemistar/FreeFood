import 'package:flutter/material.dart';
import './UI/list_page.dart';

import './Utils/Email.dart';

void main()=> runApp(App());

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Title',

      home: Emails(),
    );
  }
}