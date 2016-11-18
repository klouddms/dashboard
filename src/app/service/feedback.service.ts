import * as _ from 'lodash';
import * as moment from 'moment'

export class FeedbackBaseMethod {
  getRecentDataMed(userInfoParam, gameInfoParam, evaluationInfoParam, tabParam, sport, gender) {
    let dataTemp = [];
    evaluationInfoParam.forEach((evalIter) => {
      if(tabParam != 'all'){
        if(tabParam != evalIter.sentiment) return;
      }

      let gameTemp = _.find(gameInfoParam, (o) => { return o.id == evalIter.gameId; }),
        userTemp = _.find(userInfoParam, (o) => { return o.id == evalIter.userId; });

      if (gameTemp.status != 'completed') return;
      if (sport != null && sport != gameTemp.sport) return;
      if (gender != null && gender != gameTemp.gender) return;

      dataTemp.push({
        id: evalIter.id,
        game: gameTemp.name,
        sport: gameTemp.sport,
        date: moment(gameTemp.creationTimeStamp).subtract(10, 'days').calendar(),
        commenter: `${userTemp.firstName} ${userTemp.lastName}`,
        feedback: evalIter.feedback,
        sentiment: evalIter.sentiment,
        contact: evalIter.contact,
        respond: userTemp.email
      })
    });
    return dataTemp;
  }

  getUpcompingDataMed(gameInfoParam, tabParam, sport, gender) {
    let dataTemp = [],
      filterUpcomingDataTemp = _.filter(gameInfoParam, (o) => { return o.status == "scheduled" });

    _.forEach(filterUpcomingDataTemp, (gameIter) => {
      if (sport != null && sport != gameIter.sport) return;
      if (gender != null && gender != gameIter.gender) return;

      dataTemp.push({
        game: gameIter.name,
        sport: gameIter.sport,
        date: moment(gameIter.creationTimeStamp).subtract(10, 'days').calendar(),
      })
    })
    return dataTemp;
  }

  getPieChartDataMed(evaluationInfoParam, tabParam, sport, gender) {
    let dataTemp;
    if(sport != null){
      let temp = _.filter(evaluationInfoParam, (o) => { return o.sport == sport })
      evaluationInfoParam = temp;
    }
    if(tabParam == 'all'){
      dataTemp = _.countBy(evaluationInfoParam, (o) => { return o.sentiment });
    }else{
      dataTemp = _.countBy(_.filter(evaluationInfoParam , (o) => { return o.sentiment == tabParam }), (o) => { return o.sentiment });
    }
    return _.map(dataTemp, (value, prop) => {
      return { key: prop, y: value };
    });
  }

  getRowForEvaluationDataMed(evaluationInfoParam, evaluationIdParam){
    return _.find(evaluationInfoParam, (o) => { return o.id == evaluationIdParam } );
  }

  getRowForUserTableDataMed(userInfoParam, evaluationInfoParam){
    let singleUserTemp = _.find(userInfoParam, (o) => { return o.id == evaluationInfoParam.id});
    if(singleUserTemp == undefined){
      return {
        picture: '',
        name: '',
        email: '',
        phone: '',
        fellowup: ''
      }
    }else{
      return {
        picture: singleUserTemp.picture,
        name: `${singleUserTemp.firstName} ${singleUserTemp.lastName}`,
        email: singleUserTemp.email,
        phone: singleUserTemp.phone,
        fellowup: evaluationInfoParam.contact
      }
    }
  }

  getRowForGameTableDataMed(gameInfoParam, evaluationInfoParam){
    return _.find(gameInfoParam, (o) => { return o.id == evaluationInfoParam.id });
  }

  getRowForRefereeTableDataMed(refereeInfoParam, evaluationCurDataParam){
    let singleRefereeTemp = _.find(refereeInfoParam, (o) => { o.id == evaluationCurDataParam.refId });
    if(singleRefereeTemp == undefined){
      return {
        picture: '',
        name: '',
        email: '',
        contact: '',
        rating: ''
      }
    }else{
      return {
        picture: '',
        name: `${singleRefereeTemp.firstName} ${singleRefereeTemp.lastName}`,
        email: singleRefereeTemp.email,
        contact: singleRefereeTemp.contactNumber,
        rating: singleRefereeTemp.rating
      }
    }
  }
}
