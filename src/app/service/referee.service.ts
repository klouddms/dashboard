import * as _ from 'lodash';
import * as moment from 'moment'

export class RefereeService {

  datas = {
      "count": 2,
      "start": 0,
      "limit": 20,
      "name": "refs",
      "items": [
          {
              "version": "1",
              "links": [
                  {
                      "method": "GET",
                      "rel": "self",
                      "href": "http://localhost:8080/silbo/refs/402880835859475c01585947a8ed0000",
                      "uri": "/silbo/refs/402880835859475c01585947a8ed0000",
                      "responseType": "application/vnd.silbo.referee"
                  },
                  {
                      "method": "PUT",
                      "rel": "update",
                      "href": "http://localhost:8080/silbo/refs/402880835859475c01585947a8ed0000",
                      "uri": "/silbo/refs/402880835859475c01585947a8ed0000",
                      "type": "application/vnd.silbo.referee",
                      "responseType": "application/vnd.silbo.referee"
                  },
                  {
                      "method": "DELETE",
                      "rel": "delete",
                      "href": "http://localhost:8080/silbo/refs/402880835859475c01585947a8ed0000",
                      "uri": "/silbo/refs/402880835859475c01585947a8ed0000"
                  },
                  {
                      "method": "GET",
                      "rel": "rating",
                      "href": "http://localhost:8080/silbo/refs/402880835859475c01585947a8ed0000/rating",
                      "uri": "/silbo/refs/402880835859475c01585947a8ed0000/rating",
                      "responseType": "application/json"
                  },
                  {
                      "method": "GET",
                      "rel": "status",
                      "href": "http://localhost:8080/silbo/refs/402880835859475c01585947a8ed0000/status",
                      "uri": "/silbo/refs/402880835859475c01585947a8ed0000/status",
                      "responseType": "application/json"
                  },
                  {
                      "method": "GET",
                      "rel": "up",
                      "href": "/silbo/refs",
                      "uri": "/silbo/refs",
                      "responseType": "application/vnd.silbo.collection",
                      "itemType": "application/vnd.silbo.referee"
                  }
              ],
              "creationTimeStamp": "2016-11-12 16:03 PM UTC",
              "modifiedTimeStamp": "2016-11-12 16:03 PM UTC",
              "createdBy": "padorn",
              "lastModifiedBy": "padorn",
              "id": "402880835859475c01585947a8ed0000",
              "firstName": "Mark",
              "lastName": "Meyers",
              "street1": "121 apple lane",
              "street2": "Unit 432",
              "city": "Raleigh",
              "state": "NC",
              "postal": "3421",
              "email": "mm@gmail.com",
              "email2": "mm@hotmail.com",
              "mobilePhone": "612-333-2111",
              "contactNumber": "555-553-111",
              "status": "Assigned",
              "rating": 2
          },
          {
              "version": "1",
              "links": [
                  {
                      "method": "GET",
                      "rel": "self",
                      "href": "http://localhost:8080/silbo/refs/402880835859475c01585947b8960001",
                      "uri": "/silbo/refs/402880835859475c01585947b8960001",
                      "responseType": "application/vnd.silbo.referee"
                  },
                  {
                      "method": "PUT",
                      "rel": "update",
                      "href": "http://localhost:8080/silbo/refs/402880835859475c01585947b8960001",
                      "uri": "/silbo/refs/402880835859475c01585947b8960001",
                      "type": "application/vnd.silbo.referee",
                      "responseType": "application/vnd.silbo.referee"
                  },
                  {
                      "method": "DELETE",
                      "rel": "delete",
                      "href": "http://localhost:8080/silbo/refs/402880835859475c01585947b8960001",
                      "uri": "/silbo/refs/402880835859475c01585947b8960001"
                  },
                  {
                      "method": "GET",
                      "rel": "rating",
                      "href": "http://localhost:8080/silbo/refs/402880835859475c01585947b8960001/rating",
                      "uri": "/silbo/refs/402880835859475c01585947b8960001/rating",
                      "responseType": "application/json"
                  },
                  {
                      "method": "GET",
                      "rel": "status",
                      "href": "http://localhost:8080/silbo/refs/402880835859475c01585947b8960001/status",
                      "uri": "/silbo/refs/402880835859475c01585947b8960001/status",
                      "responseType": "application/json"
                  },
                  {
                      "method": "GET",
                      "rel": "up",
                      "href": "/silbo/refs",
                      "uri": "/silbo/refs",
                      "responseType": "application/vnd.silbo.collection",
                      "itemType": "application/vnd.silbo.referee"
                  }
              ],
              "creationTimeStamp": "2016-11-12 16:03 PM UTC",
              "modifiedTimeStamp": "2016-11-12 16:03 PM UTC",
              "createdBy": "padorn",
              "lastModifiedBy": "padorn",
              "id": "402880835859475c01585947b8960001",
              "firstName": "John",
              "lastName": "Smith",
              "street1": "43 Crab St",
              "street2": "",
              "city": "Garner",
              "state": "NC",
              "postal": "8888",
              "email": "mm@gmail.com",
              "email2": "mm@hotmail.com",
              "mobilePhone": "433-333-2111",
              "contactNumber": "555-553-111",
              "status": "Free",
              "rating": 5
          }
      ]
  }

  getRefereeJsonDataMed() {
    return this.datas.items;
  }

  getCountEvaluationMed(evaluationInfoParam){
    let refereeTemp = this.getRefereeJsonDataMed(), countValTemp = 0;
    _.forEach(refereeTemp, (r) => {
      countValTemp += (_.filter(evaluationInfoParam, (o) => { return o.refId == r.id})).length;
    })
    return countValTemp;
  }

  getCountGamesMed(gameInfoParam){
    let refereeTemp = this.getRefereeJsonDataMed(), countValTemp = 0;
    _.forEach(refereeTemp, (r) => {
      countValTemp += (_.filter(gameInfoParam, (o) => { return _.includes(o.refs, r.id)})).length;
    });
    return countValTemp;
  }

  getTabDatabyTabName(tabNameParam, genderParam, gameInfoParam){
    let dataTemp = [], allRefereeDataTemp = this.getRefereeJsonDataMed();
    if(tabNameParam == 'all'){
      dataTemp = this.getRefereeJsonDataMed();
    }else{
      _.forEach((_.concat(_.map(_.filter(gameInfoParam, (o) => { return tabNameParam == o.sport && (genderParam == null ? true : o.gender == genderParam )}), 'refs'))), (p)=>{
          dataTemp.push(_.find(allRefereeDataTemp, (a) => { return a.id == p}));
      });
    }
    return dataTemp;
  }
}
