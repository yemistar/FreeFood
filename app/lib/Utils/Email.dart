import 'package:flutter/material.dart';

import '../get_sent/GetData.dart';


class ListTest extends StatelessWidget{

 final Data data;
   Entities entities;
   String date;
   String time;
   String place;

  ListTest({@required this.data}){
    this.entities=this.data.entities;
    this.date= entities.dates.removeAt(0);
    this.time= entities.times.removeAt(0);
    this.place= entities.locations.removeAt(0);
  }






  static Widget Costum_divider(){
    return Container(
      height: 20.0,
      width: 2.0,
      color: Colors.red,
      margin: const EdgeInsets.only(left: 5.0, right: 5.0),
    );
  }


  Widget dateAndtime(){
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: <Widget>[
        Text(date,style: Tstyle.SubHeader,),
        Costum_divider(),
        Text(time,style: Tstyle.SubHeader,)
      ],
    );
  }

   Widget foodL(){
    return Card(
      elevation: 0.0,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,

        children: <Widget>[
          Container(
            child: Center(child: Padding(
              padding: const EdgeInsets.all(5.0),
              child: Text('pizza',style: Tstyle.SubHeader,),
            )),

            foregroundDecoration: BoxDecoration(
              border: Border.all(color: Colors.black,width: 2.0,
              ),
              borderRadius: BorderRadius.all(Radius.elliptical(5.0, 5.0)),

            ) ,

          ),

          Container(
            child: Center(child: Padding(
              padding: const EdgeInsets.all(5.0),
              child: Text('apples',style: Tstyle.SubHeader,),
            )),

            foregroundDecoration: BoxDecoration(
              border: Border.all(color: Colors.black,width: 2.0,
              ),
              borderRadius: BorderRadius.all(Radius.elliptical(5.0, 5.0)),

            ) ,

          ),

          Container(
            child: Center(child: Padding(
              padding: const EdgeInsets.all(5.0),
              child: Text('Snacks',style: Tstyle.SubHeader,),
            )),

            foregroundDecoration: BoxDecoration(
              border: Border.all(color: Colors.black,width: 2.0,
              ),
              borderRadius: BorderRadius.all(Radius.elliptical(5.0, 5.0)),

            ) ,

          ),
        ],
      ),
    );
  }

   Widget  rightPart(){
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: <Widget>[
        dateAndtime(),
        Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            Padding(
              padding: EdgeInsets.only(left: 10.0),
            ),
            Icon(
              Icons.place,
              size: 15.0,
              color: Colors.red,
            ),

            Text(place,style: Tstyle.SubHeader,textAlign: TextAlign.left,),

          ],
        ),

        foodL()
      ],
    );
  }

  Widget allCombined(){
    return InkWell(
      child: Container(
        height: 100.0,
        child: Card(
          child: Row(

            children: <Widget>[
              Card(
                elevation: 0.0,
                child: Icon(Icons.local_pizza,size: 50.0,),

              ),

              Expanded(child: rightPart())

            ],
          ),
        ),


      ),
      onTap: ((){
        return data;
      }),
    );

  }


  @override
  Widget build(BuildContext context) {
    return allCombined();
  }


}


class blocks{

  static Widget date_N_time(){
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: <Widget>[
        Text('Mon, sep 20',style: Tstyle.SubHeader,),
        Costum_divider(),
        Text('6:45pm - 7:45pm',style: Tstyle.SubHeader,)
      ],
    );
  }

  static Widget  rightPart(){
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: <Widget>[
        date_N_time(),
        Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            Padding(
              padding: EdgeInsets.only(left: 10.0),
            ),
            Icon(
              Icons.place,
              size: 15.0,
              color: Colors.red,
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
          Container(
            child: Center(child: Padding(
              padding: const EdgeInsets.all(5.0),
              child: Text('pizza',style: Tstyle.SubHeader,),
            )),

          foregroundDecoration: BoxDecoration(
            border: Border.all(color: Colors.black,width: 2.0,
            ),
            borderRadius: BorderRadius.all(Radius.elliptical(5.0, 5.0)),

          ) ,

          ),

          Container(
            child: Center(child: Padding(
              padding: const EdgeInsets.all(5.0),
              child: Text('apples',style: Tstyle.SubHeader,),
            )),

            foregroundDecoration: BoxDecoration(
              border: Border.all(color: Colors.black,width: 2.0,
              ),
              borderRadius: BorderRadius.all(Radius.elliptical(5.0, 5.0)),

            ) ,

          ),

          Container(
            child: Center(child: Padding(
              padding: const EdgeInsets.all(5.0),
              child: Text('Snacks',style: Tstyle.SubHeader,),
            )),

            foregroundDecoration: BoxDecoration(
              border: Border.all(color: Colors.black,width: 2.0,
              ),
              borderRadius: BorderRadius.all(Radius.elliptical(5.0, 5.0)),

            ) ,

          ),
        ],
      ),
    );
  }

 static Widget Costum_divider(){
    return Container(
      height: 20.0,
      width: 2.0,
      color: Colors.red,
      margin: const EdgeInsets.only(left: 5.0, right: 5.0),
    );
  }




 static Widget allCombined(){
    return Container(
      height: 100.0,
      child: Card(
        child: Row(

          children: <Widget>[
            Card(
              elevation: 0.0,
              child: Icon(Icons.local_pizza,size: 50.0,),

            ),

            Expanded(child: rightPart())

          ],
        ),
      ),
    );

  }




 static Widget list( String Ftype, String Cname, String TandD){

    return Expanded(
      child: Column(
        children: <Widget>[
          Padding(
            padding: EdgeInsets.only(top: 7.0),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
              Text(Ftype,textDirection: TextDirection.ltr,overflow: TextOverflow.fade,style: Tstyle.SubHeader,),
            ],
          ),

          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
              Text(Cname,textDirection: TextDirection.ltr,overflow: TextOverflow.fade,style: Tstyle.tsyle_club,),
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
             // Text(TandD,textDirection: TextDirection.ltr,overflow: TextOverflow.fade,style: Tstyle.tsyle_club,),
            ],
          )

        ],
      ),
    );
  }

 static Widget list2(){
    return Container(
      height: 100.0,
      padding: EdgeInsets.only(left: 9.0,right: 9.0),

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

            list('Pizza', 'Yemi', 'Mon, sep 4')

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
    fontSize: 20.0,
    color: Colors.red

  );

  static var SubHeader = TextStyle(
      fontStyle: FontStyle.normal,
      fontWeight: FontWeight.normal,
      fontSize: 15.0,
      color: Colors.black

  );
  static var smallText = TextStyle(
      fontStyle: FontStyle.normal,
      fontWeight: FontWeight.normal,
      fontSize: 15.0,
      color: Colors.red


  );

 static var tsyle_food = TextStyle(
      color: Colors.red,
      fontSize: 10.0,
      fontWeight: FontWeight.bold

  );
 static var tsyle_club =TextStyle(
      color: Colors.red,
      fontSize: 10.0,
      fontStyle: FontStyle.normal


  );
}