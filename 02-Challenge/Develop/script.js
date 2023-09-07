$(function () {
  // Display the current date in the header
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  // Function to update the time block styles (past, present, future)
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Load saved events from local storage and set textarea values
  function loadSavedEvents() {
    $(".time-block").each(function () {
      var blockId = $(this).attr("id");
      var savedEvent = localStorage.getItem(blockId);

      if (savedEvent !== null) {
        $(this).find("textarea").val(savedEvent);
      }
    });
  }

  // Generate time blocks from 9am to 5pm
  for (var hour = 9; hour <= 17; hour++) {
    var timeBlock = $("<div>")
      .attr("id", "hour-" + hour)
      .addClass("row time-block")
      .appendTo("#time-blocks-container");

    var hourText = $("<div>")
      .addClass("col-2 col-md-1 hour text-center py-3")
      .text(hour + "AM")
      .appendTo(timeBlock);

    var descriptionTextarea = $("<textarea>")
      .addClass("col-8 col-md-10 description")
      .attr("rows", "3")
      .appendTo(timeBlock);

    var saveButton = $("<button>")
      .addClass("btn saveBtn col-2 col-md-1")
      .attr("aria-label", "save")
      .html('<i class="fas fa-save" aria-hidden="true"></i>')
      .appendTo(timeBlock);
  }

  // Click event listener for the save buttons
  $(".saveBtn").on("click", function () {
    var blockId = $(this).closest(".time-block").attr("id");
    var eventText = $(this).siblings(".description").val();

    localStorage.setItem(blockId, eventText);
  });

  // Initial function calls
  updateTimeBlocks();
  loadSavedEvents();
});