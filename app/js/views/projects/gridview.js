define([
    'jquery'
    ,'underscore'
    ,'backbone'
    ,'velocity'
    ,'tweenmax'
    ,'applogic'
    ,'views/global/pinwheel'
    ,'collections/projects'
    ,'text!template/global/blurb.html'
    ,'text!template/projects/grid_item.html'
],
function($, _, Backbone, Velocity, TweenMax, APP, Pinwheel, ProjectsCollection, blurb, template) {

    var ProjectGridView = Backbone.View.extend({

        el: '#content'

        ,initialize: function(params) {

            if(params) this.ids = params.ids;

            var blurbTemplate = _.template(blurb);
            this.$el.append("<div id='project-grid'></div>");
            this.$grid = this.$el.find("#project-grid");
            this.$grid.css({ "display": "none" });
            this.$grid.append(blurbTemplate);
            this.$grid.append("<div id='project-grid-badges'></div>");
            this.$badges = this.$el.find("#project-grid-badges");
            this.thumbsIdList = [];

            this.destroyEvents();
            this.render();
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
            console.log("click: ", e.currentTarget);
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
            this.tl = new window.TimelineLite();
            this.animationDefined = false;
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
            this.$title = this.$text.find(".label");
            this.$longDesc = this.$el.find(".long-description");
            this.$tagsWrapper = this.$el.find(".grid-item-tags");
            // this.$badges = this.$el.find(".plode-badge");
            this.$arrow = this.$el.find('.grid-item-arrow');
            this.$arrowLrg = this.$el.find('.arrow-lrg');

            // ADD SPINNER
            this.pinwheelObj = new Pinwheel(this.$el.find(".pinwheel")[0]);

            // reference for animation queue
            this.$allEls = [
                this.$bg,
                this.$label,
                this.$tagsWrapper
            ];

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

            var ref = this;
            this.$label.css('opacity', 0).velocity({ opacity: 1 }, {
                duration: 100,
                delay: delay + 50,
                complete: function() {
                    ref.ready = true;
                }
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
            if(this.ready) {
                if(this.animationDefined) {
                    this.tl.play();
                } else {
                    // hide band
                    this.tl.to(this.$arrow, 0.01, { opacity: 0, delay: 0.2 })
                        .to(this.$label, 0.05, { opacity: 0 })
                        .to(this.$bg, 0.1, {
                            height: 0,
                            bottom: ThumbView.redbandHeight/2
                        })

                        // format overlay as card
                        .call(function() {
                            this.$bg[0].removeAttribute('style');
                            this.$bg.toggleClass('card-format')
                            this.$text.toggleClass('card-format');
                            this.$longDesc.toggleClass('card-format');
                            this.$overlayWrapper.toggleClass('card-format');
                            this.$label.toggleClass('card-format');
                            this.$tagsWrapper.toggleClass('card-format');
                        }.bind(this))

                        // transition card in
                        .addLabel('in')
                        .to(this.$label, 0.2, {opacity: 1}, 'in')
                        .to(this.$tagsWrapper, 0.2, {opacity: 1}, 'in')
                        .to(this.$bg, 0.2, {opacity: 0.7}, 'in');

                    this.animationDefined = true;
                }
            }
        }

        ,onItemOut: function() {
            if(this.ready && this.animationDefined) {
                this.tl.pause().reverse();
            }
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
        redbandHeight: 30, // match with css static height attr
        colorOff: '#666',
        colorHighlight: '#00b2af',
        colorText: 'white'
    });


    // Our module now returns our view
    return ProjectGridView;
});