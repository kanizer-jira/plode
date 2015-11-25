define([
    'jquery'
    ,'underscore'
    ,'backbone'
    ,'velocity'
    ,'applogic'
    ,'collections/projects'
    ,'text!template/projects/grid_item.html'
],
function($, _, Backbone, Velocity, APP, ProjectsCollection, template) {

    var ProjectGridView = Backbone.View.extend({

        el: '#content'

        ,initialize: function(params) {
            if(params) this.ids = params.ids;
            this.$el.append("<div id='project-grid'></div>");
            this.$grid = this.$el.find("#project-grid");
            this.$grid.css({ "display": "none" });
            this.$grid.append("<div id='project-grid-badges'></div>");
            this.$badges = this.$el.find("#project-grid-badges");
            this.thumbsIdList = [];

            this.destroyEvents();
        }

        ,render: function() {
            this.collection = new ProjectsCollection();
            this.thumbSequence = 0;
            this.collection.forEach(this.addOne, this);

            // DRAW TAGS
            var tags = APP.data.tags;
            var that = this;
            _.each(tags, function(tag) {
                var $badge = $("<div class='plode-badge'>" + tag + "</div>");

                if(that.ids) {
                    // FILTER RESULT SET
                    if($.inArray(tag, that.ids) > -1) $badge.addClass("active");
                } else {
                    $badge.addClass("active");
                }
                that.$badges.append($badge[0]);
            });

            this.$grid.fadeIn(200);
        }

        ,addOne: function(thumbModel, ind) {
            var that = this;
            var view;

            if(this.ids){
                _.each(that.ids, function(id) {
                    // FILTER RESULT SET
                    if($.inArray(id, thumbModel.tags) > -1 // TAG MATCHES FILTER ID
                        && $.inArray(thumbModel.id, that.thumbsIdList) == -1) { // VIEW DOESN'T ALREADY EXIST
                        view = new ThumbView({model: thumbModel, ind: that.thumbSequence});
                        view.render();
                        that.thumbSequence++;

                        // CREATE LIST OF EXISTING THUMBS
                        that.thumbsIdList.push(thumbModel.id);

                        // APPEND CORRECT GRID CLASS
                        that.$grid.append(view.el);
                    }
                });
            } else {
                view = new ThumbView({model: thumbModel, ind: that.thumbSequence});
                view.render();
                that.thumbSequence++;

                // APPEND CORRECT GRID CLASS
                this.$grid.append(view.el);
            }
        }

        ,events: {
            "click #project-grid-badges>.plode-badge" : "onBadgeClick"
        }

        ,onBadgeClick: function(e){
            APP.log("click: ", e.currentTarget);
            var active = [];
            this.$badges.find(".plode-badge.active").each(function(){
                var tag = $(this).html();
                active.push(tag);
            });

            var $badge = $(e.currentTarget);
            var id = $badge.html();
            var re = new RegExp(",", "g");
            var s;
            var ind = $.inArray(id, active);

            if(!$badge.hasClass("active")) {
                if(ind == -1) active.push(id);
            } else {
                if(ind > -1) active.splice(ind, 1);
            }

            var s = active.toString().replace(re, "+");
            this.$grid.fadeOut(100, function() {
                $(this).remove();
                var path = (s == "") ? "projects" : "projects/" + s;
                APP.instances.mainRouter.navigate(path, {trigger: true});
            });
        }

        ,destroyEvents: function() {
            //COMPLETELY UNBIND THE VIEW
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        }

    });

    var ThumbView = Backbone.View.extend({

        className: "grid-item-column"

        ,initialize:  function(options) {
            this.model = options.model;
            this.ind = options.ind;
        }

        ,render: function() {
            // Compile the template using Underscores micro-templating
            var compiledTemplate = _.template( template, this.model);
            this.$el.html(compiledTemplate);
            this.$el.attr("thumb-id", this.model.id);

            this.$img = this.$el.find(".thumb-image")
                .load(this.onImageLoaded.bind(this));
            this.$overlayWrapper = this.$el.find(".grid-item-overlay");
            this.$bg = this.$el.find(".grid-item-overlay-bg");
            this.$label = this.$el.find(".grid-item-label-wrapper");
            this.$move = this.$el.find(".move");
            this.$text = this.$el.find(".grid-item-label");
            this.$longDesc = this.$el.find(".long-description");
            this.$tagsWrapper = this.$el.find(".grid-item-tags");
            // this.$badges = this.$el.find(".plode-badge");
            this.$arrow = this.$el.find('.grid-item-arrow');
            this.$arrowLrg = this.$el.find('.arrow-lrg');

            // ADD SPINNER
            this.$pinwheel = this.$el.find(".pinwheel");
            this.pinwheelObj = APP.showPinwheel(this.$pinwheel);

            // reference for animation queue
            this.$allEls = [
                this.$bg,
                this.$label,
                this.$tagsWrapper
            ];

            // // set band color
            // this.$bg.css({ backgroundColor: this.model.color });
            // this.$badges.css({ backgroundColor: this.model.color });

            // animate in
            var delay = this.ind * 100;
            this.$el.css({ opacity: 0 })
            .velocity({ opacity: 1 }, {
                duration: 300,
                delay: delay,
                easing: 'easeOutQuad'
            });

            delay += 200;
            this.$bg.css({
                height: 0,
                bottom: ThumbView.redbandHeight/2,
            })
            .velocity({
                height: ThumbView.redbandHeight,
                bottom: 0
            }, {
                duration: 150,
                delay: delay
            });

            this.$label.css('opacity', 0).velocity({ opacity: 1 }, {
                duration: 100,
                delay: delay + 50
            });
        }

        ,events: {
            "mouseenter"  : "onItemOver"
            ,"mouseleave" : "onItemOut"
            ,"click"      : "onItemClick"
        }

        ,onImageLoaded: function() {
            this.pinwheelObj.stop();
            // TODO - ADD SOME KIND OF FADE IN FROM A GREY BG
        }

        ,onItemOver: function() {
            this.stopAnimation();

            // hide label & arrow
            this.$arrow.css({ display: 'none' });
            this.$label.velocity({ opacity: 0 }, { duration: 50 });

            // hide band
            this.$bg.velocity({
                height: 0,
                bottom: ThumbView.redbandHeight/2
            }, {
                duration: 100,
                complete: function() {
                    this.$bg.css({
                        width: '100%',
                        height: '100%',
                        bottom: 0,
                        opacity: 0,
                        backgroundColor: '#000'
                    });

                    this.$overlayWrapper.css({ margin: 0 });

                    // show large label
                    this.$text
                        .css({ padding: '5% 10%'})
                        .find('span').css('font-size', '2em');

                    this.$longDesc.css('display', 'block');

                    this.$label.css({ top: 20 });;

                    this.$tagsWrapper.css({
                        height: 'auto',
                        paddingTop: 5,
                    });

                }.bind(this)
            });

            this.$label.velocity({ opacity: 1 }, {
                duration: 200,
                delay: 50
            });
            this.$tagsWrapper.velocity({ opacity: 1 }, {
                duration: 200,
                delay: 50
            });
            this.$bg.velocity({ opacity: 0.6 }, {
                duration: 200,
                delay: 50
            });
        }

        ,onItemOut: function() {
            this.stopAnimation();

            // hide label and bg
            if(this.$bg.css('opacity') !== '0.7') {
                this.$bg.velocity({ opacity: 0 }, 100);
                this.$label.velocity({ opacity: 0 }, 100);
            }
            this.$tagsWrapper.velocity({
                paddingTop: 0,
                opacity: 0
            }, {
                duration: 100,
                complete: function() {
                    // reposition label strip
                    this.$bg.css({
                        height: 0,
                        bottom: ThumbView.redbandHeight/2,
                        backgroundColor: 'red'
                    });
                    this.$text
                        .css({ padding: '0 10px'})
                        .find('span').css('font-size', '1em');
                    this.$overlayWrapper.css({ margin: 5 });
                    this.$tagsWrapper.css({ height: 0 });
                    this.$longDesc.css('display', 'none');
                    this.$label.css('top', 'auto');
                    this.$arrow.css({ display: 'table-cell' });
                }.bind(this)
            });

            // fade red bar
            this.$bg.velocity({
                display: 'block',
                height: ThumbView.redbandHeight,
                bottom: 0,
                opacity: 0.7
            }, {
                duration: 100,
                delay: 50
            });

            this.$label.velocity({ opacity: 1 }, {
                duration: 100,
                delay: 100
            });
        }

        ,onItemClick: function(e) {
            var id = $(e.currentTarget).attr("thumb-id");
            this.$el.fadeOut(100, function(){
                APP.instances.mainRouter.navigate("detail/" + id, {trigger: true});
            });
        }

        ,stopAnimation: function() {
            _.each(this.$allEls, function(el) { el.velocity('stop'); });
        }

    }, {
        // Set class level constants
        redbandHeight: 30 // match with css static height attr
    });


    // Our module now returns our view
    return ProjectGridView;
});