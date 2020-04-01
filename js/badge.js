
var editor; // use a global for the submit and return data rendering in the examples

$(document).ready(function() {

  editor = new $.fn.dataTable.Editor( {
    ajax: {
      url : "controller/editor-badge.php",
      type: "POST"
    },
    table: "#table_badge",
    fields: [
      { label: "Date", name: "badgeplanning.date"  },
      { label: "id_user", name: "badgeplanning.id_user"  },
      { label: "validation", name: "badgeplanning.validation"  },
      { label: "comments", name: "badgeplanning.comments"  }
    ]
  } );

  // Setup - add a text input to each footer cell
  $('#table_badge tfoot th').each( function (i) {
    var title = $('#table_badge thead th').eq( $(this).index() ).text();
    $(this).html( '<input type="text" placeholder="'+title+'" data-index="'+i+'" style="width:100%;"/>' );
  } );



  var table = $('#table_badge').DataTable( {
    ajax: {
      url : "controller/editor-badge.php",
      type: "POST"
    },
    order: [[ 1, "desc" ],[2,"asc"]],
    columns: [
      {  data: null,
        render: function ( data, type, row ) {
          day=new Date(data.badgeplanning.date);
          Date.prototype.getWeek = function() {
            var onejan = new Date(this.getFullYear(),0,1);
            //return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
            return Math.ceil((((this - onejan) / 86400000) + onejan.getDay())/7);
          }
          return day.getWeek();
        }
      },
      { data: "badgeplanning.date" },
      {  data: null,
        render: function ( data, type, row ) {
          day=new Date(data.badgeplanning.date);
          var tab_jour=new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
          return tab_jour[day.getDay()];
        }
      },
      { data: "techniciens.technicien" },
      { data: null,
        render: function ( data, type, row ) {
          var date=data.badgeplanning.in1;
          if (date) {
            return date.split(' ')[1];
          }
          return "";
        }
      },
      { data: null,
        render: function ( data, type, row ) {
          var date=data.badgeplanning.out1;
          if (date) {
            return date.split(' ')[1];
          }
          return "";
        }
      },
      { data: null,
        render: function ( data, type, row ) {
          var date=data.badgeplanning.in2;
          if (date) {
            return date.split(' ')[1];
          }
          return "";
        }
      },
      { data: null,
        render: function ( data, type, row ) {
          var date=data.badgeplanning.out2;
          if (date) {
            return date.split(' ')[1];
          }
          return "";
        }
      },
      { data: null,
        render: function (data,type,row) {

          var diff2=0;
          var diff1=0;
          in1=new Date(data.badgeplanning.in1);
          out1=new Date(data.badgeplanning.out1);
          in2=new Date(data.badgeplanning.in2);
          out2=new Date(data.badgeplanning.out2);

          if (data.badgeplanning.out2) {
            diff2=out2-in2;
          }
          if (data.badgeplanning.out1) {
            diff1=out1-in1;
          }
          date=new Date(diff2+diff1);

          var hours = date.getUTCHours();
          // Minutes part from the timestamp
          var minutes = "0" + date.getUTCMinutes();
          // Seconds part from the timestamp
          var seconds = "0" + date.getUTCSeconds();

          // Will display time in 10:30:23 format
          var formattedTime = hours + ':' + minutes.substr(-2);

          return formattedTime;
        }
      },
      { data: null,
        render: function (data,type,row) {

          var diff2=0;
          var diff1=0;
          in1=new Date(data.badgeplanning.in1);
          out1=new Date(data.badgeplanning.out1);
          in2=new Date(data.badgeplanning.in2);
          out2=new Date(data.badgeplanning.out2);
          var resthours=$('#resthours').attr('data-value');

          if (data.badgeplanning.out2) {
            diff2=out2-in2-resthours*1000*3600/2;
          }
          if (data.badgeplanning.out1) {
            diff1=out1-in1-resthours*1000*3600/2;
          }
          date=new Date(diff2+diff1);

          var hours = date.getUTCHours();
          // Minutes part from the timestamp
          var minutes = "0" + date.getUTCMinutes();
          // Seconds part from the timestamp
          var seconds = "0" + date.getUTCSeconds();

          // Will display time in 10:30:23 format
          //var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
          var formattedTime = hours + ':' + minutes.substr(-2);

          return formattedTime;
        }
      },
      { data: null,
        render: function (data,type,row) {

          var diff2=0;
          var diff1=0;
          in1=new Date(data.badgeplanning.in1);
          out1=new Date(data.badgeplanning.out1);
          in2=new Date(data.badgeplanning.in2);
          out2=new Date(data.badgeplanning.out2);
          var dayhours=$('#dayhours').attr('data-value');
          var resthours=$('#resthours').attr('data-value');
          malus=0;

          if (data.badgeplanning.out2) {
            diff2=out2-in2;
          }
          if (data.badgeplanning.out1) {
            diff1=out1-in1;
          }

          if((diff2+diff1)/1000 < dayhours*3600) {
            diff=Math.max(diff2+diff1-resthours*1000*3600,0);
          }
          else if ((diff2+diff1)/1000 >= dayhours*3600 && (diff2+diff1)/1000 <= dayhours*3600+resthours*3600) {
            diff=dayhours*3600*1000;
          }
          else {
            diff=diff2+diff1-resthours*1000*3600;
          }

          date=new Date(diff);

          var hours = date.getUTCHours();
          // Minutes part from the timestamp
          var minutes = "0" + date.getUTCMinutes();
          // Seconds part from the timestamp
          var seconds = "0" + date.getUTCSeconds();

          // Will display time in 10:30:23 format
          var formattedTime = hours + ':' + minutes.substr(-2) ;

          return formattedTime;
        }
      },
      { data: "badgeplanning.validation" },
      { data: "badgeplanning.quantity" },
      { data: null,
        render: function (data,type,row) {
          return null;
        }
      },
      { data: "t2.technicien" }
    ],
    scrollY: '65vh',
    scrollCollapse: true,
    paging: false,
    fixedColumns:   {leftColumns: 3},
    autoFill: {
      columns: [11, 13],
      editor:  editor
    },
    keys: {
      columns: [11, 13],
      editor:  editor
    },
    select: {
      style:    'os',
      blurable: true
    }
  } );


  table
  .column( '11' )
  .search( '^$', true, false )
  .draw();


  $('#container').css('display', 'block');
  table.columns.adjust().draw();

  // Filter event handler
  $( table.table().container() ).on( 'keyup', 'tfoot input', function () {
    table
    .column( $(this).data('index') )
    .search( this.value )
    .draw();
  } );

  //table.columns.adjust().draw();


} );



//Selon le navigateur utilisé, on detecte le style de transition utilisé
function whichTransitionEvent(){
  var t,
  el = document.createElement("fakeelement");

  var transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  }

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}

var transitionEvent = whichTransitionEvent();

//On retracte le tbl des jobs, et une fois retracté, on redessine le tableau history
$("#wrapper").addClass("toggled");
$("#wrapper").one(transitionEvent,
  function(event) {
    $('#table_listeFlagQualite').DataTable().draw();
  });
