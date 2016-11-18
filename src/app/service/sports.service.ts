import * as _ from 'lodash';

export class SportsBaseMethod{
  getTabDataBySubMenuMed(leagueDataParam, subMenuNameParam, gender) {
    if(gender != null){
      return _.map(_.filter(leagueDataParam, (o) => { return o.sport == subMenuNameParam && o.gender == gender }), (o) => { return _.pick(o, ['id', 'name']) });
    }else{
      return _.map(_.filter(leagueDataParam, (o) => { return o.sport == subMenuNameParam }), (o) => { return _.pick(o, ['id', 'name']) });
    }
  }

  getRecentTableDataByTabMed(tabNameAndIdParam, gameDataParam, refereeDataParam, gender) {
    let dataTemp = [];
    _.forEach(gameDataParam, (p) => {
      if (p.leagueId != tabNameAndIdParam.id ) return;
      if (p.status != 'completed') return;
      if (gender != null && gender != p.gender) return;
      dataTemp.push({
        id: tabNameAndIdParam.id,
        name: tabNameAndIdParam.name,
        gameId: p.id,
        home: p.homeTeam,
        away: p.awayTeam,
        referee1: _.join(_.pick(_.find(refereeDataParam, (r) => {return r.id == p.refs[0]}), ['firstName', 'lastName']), ' '),
        referee2: _.join(_.pick(_.find(refereeDataParam, (r) => {return r.id == p.refs[1]}), ['firstName', 'lastName']), ' '),
        rating: '3'
      });
    });
    return dataTemp;
  }

  getUpcomingTableDataByTabMed(tabNameAndIdParam, gameDataParam, locationDataParam, gender) {
    let dataTemp = [];
    _.forEach(gameDataParam, (p) => {
      if (p.leagueId != tabNameAndIdParam.id ) return;
      if (gender != null && gender != p.gender) return;
      if (p.status != 'scheduled') return;
      dataTemp.push({
        id: tabNameAndIdParam.id,
        name: tabNameAndIdParam.name,
        gameId: p.id,
        home: p.homeTeam,
        away: p.awayTeam,
        location: _.pick(_.find(locationDataParam, (r) => {return r.id == p.locationId}), 'name'),
        time: p.gameDate
      });
    });
    return dataTemp;
  }

  getFeedbackDataMed(tabNameAndIdParam, evaluationDataParam, gender){
    let dataTemp = [];
    _.forEach(evaluationDataParam, (e) => {
      if(e.leagueId != tabNameAndIdParam.id) return;

      dataTemp.push(e.feedback);
    })
    return _.join(dataTemp, '\b');
  }

  getPieChartDataMed(tabNameAndIdParam, evaluationDataParam, gender){
    return  _.map(_.countBy(_.filter(evaluationDataParam, (e) => {return e.leagueId == tabNameAndIdParam.id}), (o) => { return o.sentiment}), (value, prop) => {
      return { key: prop, y: value };
    });
  }

  getRowForGameDetailMed(gameDataParam, gameIdParam){
    let singleGameTemp = _.find(gameDataParam, (o) => { return o.id == gameIdParam });

    return [
      singleGameTemp.name,
      singleGameTemp.homeTeam,
      singleGameTemp.awayTeam
    ];
  }

  getRowForPieChartMed(evaluationDataParam, gameIdParam){
    return  _.map(_.countBy(_.filter(evaluationDataParam, (e) => {return e.gameId == gameIdParam}), (o) => { return o.sentiment}), (value, prop) => {
      return { key: prop, y: value };
    });
  }

  getRowForFirstTableMed(gameDataParam, refereeDataParam, gameIdParam){
    let singleGameTemp = _.find(gameDataParam, (o) => { return o.id == gameIdParam }), dataTemp = [];
    _.forEach(singleGameTemp.refs, (o) => {
      let singleRefereeTemp = _.find(refereeDataParam, (p) => { return p.id == o });
      dataTemp.push({
        name: `${singleRefereeTemp.firstName} ${singleRefereeTemp.lastName}`,
        rating: singleRefereeTemp.rating
      })
    });
    return dataTemp;
  }

  getRowForSecondTableMed(evaluationDataParam, userDataParam, gameIdParam){
    let dataTemp = [];
    _.forEach(evaluationDataParam, (e) => {
      if(e.gameId != gameIdParam) return;

      let singleUserTemp = _.find(userDataParam, (u) => { return u.id == e.userId });

      dataTemp.push({
        commenter: `${singleUserTemp.firstName} ${singleUserTemp.lastName}`,
        feedback: e.feedback,
        sentiment: e.sentiment,
        contact: e.contact,
        respond: '',
        respond1: ''
      })
    })
    return dataTemp;
  }
}
