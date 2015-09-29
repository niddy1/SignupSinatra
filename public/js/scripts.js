console.log('we good');

//model
var User = Backbone.Model.extend({});

//collection
var UserCollection = Backbone.Collection.extend({
  model: User,
   url: '/api/users'
});

//views

//render a single view

var UserView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, 'change', this.render);
  },
  tagname: 'div',
  className: 'user',
  template: _.template( $('#user-template').html() ),
  render: function(){
    this.$el.empty();

    var html = this.template( this.model.toJSON() );
    var $html = $(html)
    this.$el.append($html);
  },
  events:{
    'click button.remove':'removeUser'
  },
  removeUser: function(){
    this.model.destroy();
    this.$el.remove();
  }
});

var UserListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    this.$el.empty();
    var users = this.collection.models;
    var $view;
    for (var i = 0; i < users.length; i++) {
      $view = new UserView({model: users[i] })
      $view.render();
      this.$el.append($view.$el);
    }
  }
});

//
// var lichard = new User({firstname: 'leroy', lastname: "walker", email: 'hi'})
// var lichardPainter = new UserView({
//   model: lichard
// });

var users = new UserCollection();
var usersPainter = new UserListView({
  collection: users,
  el: $('#users-list')
});

users.fetch();

$('.signup-form').on('submit', function(e){
 e.preventDefault();
 var data = $(this).serializeJSON();
 var emailfield = $('#email-form').val();
 var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 if(emailfield.match(mailformat))  {
   users.create(data.user);
   //clears form/border after success
   $("#email-form").val("")
   $("#firstname-form").val("")
   $("#lastname-form").val("")

   $("#email-form").css({"border": "none"});
 }  else  {
       $("#email-form").css({"border": "1px solid red"});
        alert("Not a valid email");
 // $('#email').css({'border': '1px solid red'});
 // return false;
 }


// $('.signup-form').on('submit', function(e){
//   e.preventDefault();
//   //checking to make sure email has both . and @
  // if ($("#email-form").val().indexOf("@") != -1 &&
  //   $("#email-form").val().indexOf(".") != -1){
//     var data = $(this).serializeJSON();
//     console.log(data);
//     users.create(data.user);
//     //clears form/border after success
//     $("#email-form").val("")
//     $("#firstname-form").val("")
//     $("#lastname-form").val("")
//
//     $("#email-form").css({"border": "none"});
//
//
//   } else {
//     $("#email-form").css({"border": "1px solid red"});
//
//       alert("Not a valid email");
//
//   }

});
