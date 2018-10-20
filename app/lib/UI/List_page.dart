import 'package:flutter/material.dart';


class ListTest extends StatelessWidget{
  final food='Pizza';
  final club='Yemi club';
  final time= ' Some time';

  @override
  Widget build(BuildContext context) {
    return list2();
  }

  Widget list( String Ftype, String Cname, String TandD){

    return Column(
      children: <Widget>[
        Padding(
          padding: EdgeInsets.only(top: 5.0),
        ),
        Text(Ftype,textDirection: TextDirection.ltr,overflow: TextOverflow.fade,style: tsyle_food,),
        Text(Cname,textDirection: TextDirection.ltr,overflow: TextOverflow.fade,style: tsyle_club,),
        Expanded(
            child: Text(TandD,textDirection: TextDirection.ltr,overflow: TextOverflow.fade,style: tsyle_club,)
        )

      ],
    );
  }

  Widget list2(){
    return Container(
      height: 90.0,
      padding: EdgeInsets.only(left: 10.0,right: 10.0),

      child: Card(
        elevation: 3.0,
        child: Row(
          children: <Widget>[

            Icon(Icons.local_pizza,
              size: 50.0,
            ),

            Padding(
              padding: EdgeInsets.only(left: 10.0),

            ),

            list(food, club, time)

          ],
        ),

      ),

    );
  }
 var tsyle_food = TextStyle(
   color: Colors.black,
   fontSize: 20.0,
   fontWeight: FontWeight.bold

 );
  var tsyle_club =TextStyle(
    color: Colors.grey,
    fontSize: 15.0,
    fontStyle: FontStyle.normal

  );
 static Widget  SeconR(){
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: <Widget>[
        DandT(),
        Text('Some Location'),
        foodL()
      ],
    );
  }
  static Widget foodL(){
    return Card(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: <Widget>[
          Card(elevation: 5.0,child: Text('Hello'),),
          Card(elevation: 5.0,child: Text('Hello'),),
          Card(elevation: 5.0,child: Text('Hello'),)
        ],
      ),
    );
  }

  static Widget DandT(){
    return Row(
      children: <Widget>[
        Text('Date'),
        Padding(
          padding: EdgeInsets.only(left: 5.0,right: 5.0),
        ),
        Text('Time')
      ],
    );
  }

  Widget Costum_divider(){
    return Container(
      height: 20.0,
      width: 2.0,
      color: Colors.red,
      margin: const EdgeInsets.only(left: 5.0, right: 5.0),
    );
  }
  Widget all2(){
   return Container(
     child: Card(
       child: Row(

         children: <Widget>[
           Card(
             elevation: 0.0,
             child: Icon(Icons.local_pizza,size: 20.0,),

           ),

           SeconR()

         ],
       ),
     ),
   );

  }
}

class blocks{
  static Widget  SeconR(){
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: <Widget>[
        DandT(),
        Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            Padding(
              padding: EdgeInsets.only(left: 10.0),
            ),
            Icon(
              Icons.place,
              size: 16.0,
              color: Colors.black,
            ),
            Text('Pearson',style: Tstyle.SubHeader,textAlign: TextAlign.left,),

          ],
        ),
        foodL()
      ],
    );
  }
  static Widget foodL(){
    return Card(
      elevation: 0.0,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: <Widget>[
          Expanded(child: Container(
            child: Center(child: Text('pizza',style: Tstyle.SubHeader,)),

          foregroundDecoration: BoxDecoration(
            border: Border.all(color: Colors.black,width: 2.0,
            ),
            borderRadius: BorderRadius.all(Radius.elliptical(10.0, 10.0)),

          ) ,

          )
          ),
          
          Expanded(child: Card(elevation: 1.0,child: Center(child: Text('apples',style: Tstyle.SubHeader)),)),
          
          Expanded(child: Card(elevation: 1.0,child: Center(child: Text('snacks',style: Tstyle.SubHeader)),))
        ],
      ),
    );
  }
 static Widget Costum_divider(){
    return Container(
      height: 20.0,
      width: 2.0,
      color: Colors.black,
      margin: const EdgeInsets.only(left: 5.0, right: 5.0),
    );
  }
  static Widget DandT(){
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: <Widget>[
        Text('Mon, sep 20',style: Tstyle.SubHeader,),
        Costum_divider(),
        Text('6:45pm - 7:45pm',style: Tstyle.SubHeader,)
      ],
    );
  }



 static Widget all2(){
    return Container(
      height: 100.0,
      child: Card(
        child: Row(

          children: <Widget>[
            Card(
              elevation: 0.0,
              child: Icon(Icons.local_pizza,size: 70.0,),

            ),

            Expanded(child: SeconR())

          ],
        ),
      ),
    );

  }


}
class Tstyle{
  static var Header= TextStyle(
    fontStyle: FontStyle.normal,
    fontWeight: FontWeight.bold,
    fontSize: 30.0,
    color: Colors.black

  );

  static var SubHeader = TextStyle(
      fontStyle: FontStyle.normal,
      fontWeight: FontWeight.normal,
      fontSize: 20.0,
      color: Colors.black

  );
  static var smallText = TextStyle(
      fontStyle: FontStyle.normal,
      fontWeight: FontWeight.normal,
      fontSize: 15.0,
      color: Colors.black


  );
}