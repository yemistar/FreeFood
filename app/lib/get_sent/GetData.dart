class GetData {
  List<Data> data;

  GetData({this.data});

  GetData.fromJson(Map<String, dynamic> json) {
    if (json['data'] != null) {
      data = new List<Data>();
      json['data'].forEach((v) {
        data.add(new Data.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.data != null) {
      data['data'] = this.data.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Data {
  Entities entities;
  String id;
  List<String> labelIds;
  String mimeType;
  String raw;
  String subject;

  Data(
      {this.entities,
        this.id,
        this.labelIds,
        this.mimeType,
        this.raw,
        this.subject});

  Data.fromJson(Map<String, dynamic> json) {
    entities = json['entities'] != null
        ? new Entities.fromJson(json['entities'])
        : null;
    id = json['id'];
    labelIds = json['labelIds'].cast<String>();
    mimeType = json['mimeType'];
    raw = json['raw'];
    subject = json['subject'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.entities != null) {
      data['entities'] = this.entities.toJson();
    }
    data['id'] = this.id;
    data['labelIds'] = this.labelIds;
    data['mimeType'] = this.mimeType;
    data['raw'] = this.raw;
    data['subject'] = this.subject;
    return data;
  }


}

class Entities {
  List<String> dates;
  List<String> foods;
  List<String> times;
  List<String> locations;

  Entities({this.dates, this.foods, this.times, this.locations});

  Entities.fromJson(Map<String, dynamic> json) {
    dates = json['dates'].cast<String>();
    foods = json['foods'].cast<String>();
    times = json['times'].cast<String>();
    locations = json['locations'].cast<String>();
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['dates'] = this.dates;
    data['foods'] = this.foods;
    data['times'] = this.times;
    data['locations'] = this.locations;
    return data;
  }
}