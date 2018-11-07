import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VictoryPie, VictoryChart, VictoryTheme, VictoryLegend, VictoryTooltip, VictoryAxis, VictoryArea } from 'victory';
import html2pdf from 'html2pdf.js';

import statisticActions from '../_actions/actions-statistic';
import questionActions from '../_actions/actions-question';
import answerActions from '../_actions/actions-answer';
import commentActions from '../_actions/actions-comment';

import generateDataByDate from '../scripts/generateDataByDate';
import getRandomColor from '../scripts/randomColor';

class Statistics extends Component {
  
  constructor(props){
    super(props);
    
    this.downloadStatisticsPdf = this.downloadStatisticsPdf.bind(this);
  }
  
  componentDidMount(){
    
    const {dispatch} = this.props;
    const userId = window.localStorage.getItem( 'user-id' );
    
    dispatch( statisticActions.getById( userId ) );
    dispatch( questionActions.getAllByForeanId( userId, 'user' ) );
    dispatch( answerActions.getAllByForeanId( userId, 'user' ) );
    dispatch( commentActions.getAllByForeanId( userId, 'user' ) );
  }
  
  downloadStatisticsPdf(){
    var element = document.getElementById('statisticsPdf');
    var opt = {
      margin:       1,
      filename:     this.props.user.usern + 'Statistics.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf(element, opt).set({
      pagebreak: { mode: 'avoid-all', before: '#page2el' }
    });
  }
  
  render() {
    
    const {question, answer, comment} = this.props;
    
    let userStatistics = Object;
    if( this.props.statistic.data.attributes )
      userStatistics = this.props.statistic.data.attributes;
    
    const basicUserStatistics = [
      {x: 'Total answers', y: userStatistics['number-of-answers'] - userStatistics['number-of-best-answers'], label: 'Total answers: ' + userStatistics['number-of-answers'] },
      {x: 'Best answers', y: userStatistics['number-of-best-answers'], label: 'Best answers: ' + userStatistics['number-of-best-answers']}
    ];
    
    let dataByDate = Object;
    let statisticsCharts = Object;
    if( !answer.data && !question.data && !comment.data ){
      dataByDate = generateDataByDate( [answer, question, comment, answer.concat(question.concat(comment))], ['answersByDate', 'commentsByDate', 'questionsByDate', 'totalActivityByDate']);
      
      statisticsCharts = Object.keys(dataByDate).map(data => {
        const color  = getRandomColor();
        
        var statisticTitle = data.split(/(?=[A-Z])/).join(" ");
        statisticTitle = statisticTitle[0].toUpperCase() + statisticTitle.slice(1).toLowerCase();
        
        return (
          <div key={data} className='col-md-12 mb-5 d-flex align-items-center flex-column'>
            <h2>{statisticTitle}</h2>
            
            <VictoryChart theme={VictoryTheme.material} minDomain={{ y: 0 }} height={200}>
            
              <VictoryLegend x={200} y={20} orientation="horizontal" gutter={20}
                data={[{ name: data, symbol: { fill: color, type: "square" } }]}
              />
              
              <VictoryAxis
                style={{ axis: { stroke: 'black' },
                  axisLabel: { fontSize: 20 },
                  ticks: { stroke: "grey", size: 5 },
                  tickLabels: { fontSize: 10, padding: 1, angle:45, verticalAnchor: "middle", textAnchor:'start' }
                }}
              />
              
              <VictoryAxis dependentAxis={true} orientation="left"
                style={{ axis: { stroke: 'black' },
                  axisLabel: { fontSize: 20 },
                  ticks: { stroke: "grey", size: 5 },
                  tickLabels: { fontSize: 10, padding: 1}
                }}
              />
              
              <VictoryArea x='date' y='posts' interpolation="linear" sortKey="date"
                style={{data: { stroke: color, fill: color }, parent: { border: "1px solid #ccc"}}}
                data={dataByDate[data]}
              />
              
            </VictoryChart>
            
          </div>
        );
      });
    }
    
    return (
      <div>
        <div className='panel' id='statisticsPdf'>
          <h1 className='text-center my-3 py-3'>Statistics of {this.props.user.usern}</h1>
          <p className='px-5 mx-5'>
            This are the statistics of the user {this.props.user.usern} with name {this.props.user.name}, 
            to download this statistics in pdf format click the button at the end of the page
          </p>
          <div className='row'>
            <div className='col-md-6 mb-5 d-flex align-items-center flex-column'>
              <h2 className='my-5'>Points</h2>
              {userStatistics.points}
            </div>
            <div className='col-md-6 mb-5 d-flex align-items-center flex-column'>
              <h2 className='my-5'>Questions</h2>
              {userStatistics['number-of-questions']}
            </div>
            <div className='col-md-12 d-flex align-items-center flex-column'>
              <h2>Answers</h2>
              
              <VictoryChart theme={VictoryTheme.material} domain={{x: [-1000, 1000], y: [0, 100]}} height={200}>
              
                <VictoryLegend x={50} y={0} gutter={20} orientation="horizontal"
                  style={{ title: { fontSize: 20 } }}
                  data={[ { name: "Total answers" }, { name: "Best answers" } ]}
                />
                
                <VictoryAxis tickFormat={() => ''} style={{ axis: {stroke: "none"} }} />
                
                <VictoryPie labelComponent={<VictoryTooltip/>}
                  style={{data: { stroke: 'yellow', fill: 'yellow' }, parent: { border: "1px solid #ccc"}}}
                  data={basicUserStatistics}
                />
                
              </VictoryChart>
              
            </div>
          </div>
          
          <div className='row' id='page2el'>
            {statisticsCharts}
          </div>
        </div>
        
        <div className='text-center'>
          <button className='btn btn-warning' onClick={this.downloadStatisticsPdf} >Download statistics PDF</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps( state ){
  const {statistic, question, answer, comment} = state;
  return {
    statistic,
    question,
    answer, 
    comment
  };
}

export default connect(mapStateToProps)(Statistics);