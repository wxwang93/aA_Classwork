class FollowToggle {
    constructor(el, options) {
        this.$el = $(el);
        this.userId = this.$el.data('userId') || options.userId;
        this.followState = (this.$el.data('followState') || options.followState);
        debugger;
        this.render();
        this.$el.on('click', this.clickHandler(bind).this);
    }

    clickHandler(event) {
        const followToggle = this;
        event.preventDefault();
        if () {

        } else if {

        }
    }

    render() {
        switch (this.followState) {
            case 'followed':
                this.$el.prop('disabled', false);
                this.$el.html('Unfollow!');
                break;
            case 'unfollowed':
                this.$el.prop('disabled', false);
                this.$el.html('Follow!')
        }
    }
}

module.exports = FollowToggle;