var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var toDoItems = [];

var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

//Object array
function initializeSchedule(){
    // console.log(toDoItems);

//Time block function
$timeBlocks.each(function(){
    var $thisBlock = $(this);
    var $thisBlockHr = parseInt($thisBlock.attr("data-hour"));

    var todoObj = {
        hour: $thisBlockHr,
        text: "",
    }
    toDoItems.push(todoObj);
});

//Saving array to local storage
localStorage.setItem("todos", JSON.stringify(toDoItems));
//console.log(toDoItems);
}

//Formatting timeblock colors
function setUpTimeBlocks(){
    $timeBlocks.each(function(){
        var $thisBlock = $(this);
        var $thisBlockHr = parseInt($thisBlock.attr("data-hour"));

        if ($thisBlockHr == currentHour){
            $thisBlock.addClass("present").removeClass("past future");
        }
        if($thisBlockHr < currentHour) {
            $thisBlock.addClass("past").removeClass("present future");
        }
        if ($thisBlockHr > currentHour) {
            $thisBlock.addClass("future").removeClass("past present");
        }
});
}

function renderSchedule(){

    toDoItems = localStorage.getItem("todos");
    toDoItems = JSON.parse(toDoItems);

    for (var i = 0; i < toDoItems.length; i++){
        var itemHour = toDoItems[i].hour;
        var itemText = toDoItems[i].text;

        $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
    }

    console.log(toDoItems);
}

function saveHandler(){
    var $thisBlock = $(this).parent();
  
    var hourToUpdate = $(this).parent().attr("data-hour");
    var itemToAdd = (($(this).parent()).children("textarea")).val();
  
    //see which item we need to update based on the hour of the button clicked matching
    for (var j = 0; j < toDoItems.length; j++){
      if (toDoItems[j].hour == hourToUpdate){
     
        toDoItems[j].text = itemToAdd;
      }
    }
    localStorage.setItem("todos", JSON.stringify(toDoItems));
    renderSchedule();
  }
  
  // when the document loads
  $(document).ready(function(){
  

    setUpTimeBlocks();
    if(!localStorage.getItem("todos")){
     
      initializeSchedule();
    } 
  
    
    $currentDay.text(currentDate);
  

    renderSchedule();
    $scheduleArea.on("click", "button", saveHandler);
    
  });