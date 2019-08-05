let dragging = null;
let workbench = [];

let recipes = {};
let unlocked = ["🔥", "💧", "🌫️", "🌎"];

const remove = (draggable) => {
  if (draggable != null) {
    $.when(draggable.hide()).then(() => {
       workbench = workbench.filter(obj => obj.is(":visible"));
    });
    draggable.remove();
  }
}

const doesCollide = (objA, objB) => {
  let foo = Math.hypot(parseFloat(objA.css("left")) - parseFloat(objB.css("left")), parseFloat(objA.css("top")) - parseFloat(objB.css("top")));
  return foo < objA.width() / Math.sqrt(2);
}

const spawnDraggable = (contents, x, y) => {
  draggable = $(`<span class="draggable">${contents}</span>`);
  draggable.appendTo("#workbench");
  draggable.css("left", x - $(draggable).width() / 2);
  draggable.css("top", y - $(draggable).height() / 2);
  workbench.push(draggable);
  return draggable;
}

$(document).ready(() => {

  $.getJSON("emojialchemy.json", (data) => {
    recipes = data;
  });

  $("#workbench").on("touchstart mousedown", (event) => { // Click
    if ($(event.target).hasClass("draggable")) {
      dragging = $(event.target);
    } else if ($(event.target).hasClass("dragspawn")) {
      dragging = spawnDraggable($(event.target).text(), event.clientX, event.clientY);
    }
  });

  $("#workbench").on("touchmove mousemove", (event) => { // Drag
    event.preventDefault();
    if (dragging != null) {
      dragging.css("left", event.clientX - dragging.width() / 2);
      dragging.css("top", event.clientY - dragging.height() / 2);
    }
  });

  $("#workbench").on("touchend mouseup", (event) => {   //Release
    if (dragging != null) {
      if (event.clientX >= $("#toolbox").position().left &&
          event.clientX <= $("#toolbox").position().left + $("#toolbox").width() &&
          event.clientY <= $("#toolbox").position().top + $("#toolbox").height() &&
          event.clientY >= $("#toolbox").position().top) {
          remove(dragging);
      }

      dragging.hide();
      let ingredients = workbench.filter(obj => obj.is(":visible"));
      if (ingredients.length > 0)
      $.each(ingredients, (index) => {
        let recipe = dragging.text() + ingredients[index].text();
        if (!(recipe in recipes)) {
          recipe = ingredients[index].text() + dragging.text()
          if (!(recipe in recipes)) return;
        }
        if (doesCollide(dragging, ingredients[index])) {
          spawnDraggable(recipes[recipe], event.clientX, event.clientY);
          remove(dragging);
          remove(ingredients[index]);
          if (!unlocked.includes(recipes[recipe])) {
            unlocked.push(recipes[recipe]);
            $("#elements").append(`<span class="col dragspawn">${recipes[recipe]}</span>`)
          }
        }
      });
      dragging.show();
      dragging = null;
    }
  });
});
