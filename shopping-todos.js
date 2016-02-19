Tasks = new Mongo.Collection("tasks");
 
if (Meteor.isClient) {
  // This code only runs on the client.
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });


Template.body.events({
  "submit .new-task": function (e) {
    e.preventDefault();

    var text = e.target.text.value; // Takes the text val from the input.
    //console.log(text);

    // Inserting a new task, same as typing this into the terminal when you have access to mongo.
    Tasks.insert({
      text: text, // whatever text you type.
      createdAt: new Date() // the current time.
    });

    // Clears the form.
    e.target.text.value = ""; // Sets the val to empty.
    }
  });




Template.task.events({
    "click .toggle-checked": function () {
      Tasks.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Tasks.remove(this._id);
    }
  });
}
