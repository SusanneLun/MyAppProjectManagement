import React from 'react';
// import { AnyChart } from 'anychart-react.min.js'

const Quadrant = () => {

    anychart.onDocumentReady(function() {
      // The data used in this sample can be obtained from the CDN
      // https://cdn.anychart.com/samples/quadrant-charts/bi-services-comparison/data.json
      anychart.data.loadJsonFile('https://cdn.anychart.com/samples/quadrant-charts/bi-services-comparison/data.json', function(data) {

        var $tooltip = $("<div class='custom-tooltip'>" +
          "<h1></h1" + "><div class='subtitle'></div>" +
          "<p class='description'></p>" +
          "</div>");

        var companies_data = data;
        var dataSet = anychart.data.set(companies_data);

        // create quadrant chart
        var chart = anychart.quadrant();

        // set chart padding
        chart.padding(35);

        // create marker series
        var markers = chart.marker(dataSet);
        // set labels settings
        markers.labels()
          .enabled(true)
          .fontFamily('Arial')
          .fontColor('#546e7a')
          .position('right')
          .anchor('left-center')
          .offsetX(5)
          .offsetY(0)
          .format('{%Name}');
        // disabled tooltip
        markers.tooltip(false);

        // set quarters settings
        chart.quarters({
          rightTop: {
            title: {
              text: 'LEADERS',
              fontColor: '#ff8f00',
              padding: 10
            }
          },
          rightBottom: {
            title: {
              text: 'VISIONARIES',
              fontColor: '#ff8f00',
              padding: 10
            }
          },
          leftTop: {
            title: {
              text: 'CHALLENGERS',
              fontColor: '#ff8f00',
              padding: 10
            }
          },
          leftBottom: {
            title: {
              text: 'NICHE PLAYERS',
              fontColor: '#ff8f00',
              padding: 10
            }
          }
        });

        // create first label in the lower-left quarter
        chart.quarters().leftBottom().label(0)
          .enabled(true)
          .useHtml(true)
          .rotation(-90)
          .position('left-bottom')
          .anchor('left-center')
          .offsetX(-20)
          .text('Power to Perform &#8594;');

        // create second label in the lower-left quarter
        chart.quarters().leftBottom().label(1)
          .enabled(true)
          .useHtml(true)
          .position('left-bottom')
          .anchor('left-center')
          .offsetY(20)
          .text('Entirety of Representation &#8594;');

        // set chart container id
        chart.container('container');
        // initiate chart drawing
        chart.draw();

        // add custom tooltip to chart container
        chart.listen('chartDraw', function() {
          var $container = $(this.container().getStage().container());

          $container.append($tooltip);
        });

        // event for mouse over a point
        chart.listen('pointMouseMove', function(e) {
          var clientX = e.originalEvent['offsetX'];
          var clientY = e.originalEvent['offsetY'];
          var delta = 35;

          // prevent tooltip from leaving the screen
          var left = clientX - $tooltip.width() / 2;
          if (left + $tooltip.width() > chart.container().width())
            left = chart.container().width() - $tooltip.width();
          if (left < 0)
            left = 0;

          // move tooltip
          $tooltip.css({
            'left': left,
            'top': clientY - delta - $tooltip.height()
          });

          // show tooltip
          $tooltip.show();
        });

        // event for mouse leaving point
        chart.listen('pointMouseOut', function() {
          // hide tooltip
          $tooltip.hide();
        });

        // event for point hover
        chart.listen('pointsHover', function(e) {
          var item = stakeholder.data[e.currentPoint.index];
          putDataInTooltip(item);
        });

        // Place data for hovered point in custom tooltip
        function putDataInTooltip(item) {
          var description = '';
          var link_to_logo = 'https://cdn.anychart.com/images/quadrant-chart/';

          $('.custom-tooltip h1').html(item['name'] + '<img class="img"/>');
          $('.custom-tooltip .subtitle').html(item['description_short']);
          $('.custom-tooltip .img').attr('src', link_to_logo + item['logo']);

          if (item['founded']) {
            description += '<b>Founded: </b>' + item['founded'] + '<br/>';
          }
          if (item['headquarters']) {
            description += '<b>Headquarters: </b>' + item['headquarters'] + '<br/>';
          }
          if (item['description']) {
            description += '<br/>' + item['description'];
          }

          $('.custom-tooltip .description').html(description);
        }
      });
    });
    return (
      <div id="container" style="width: 700px; height: 700px;"></div>
    )


}


export default Quadrant;
