define(function () {
    function BaseModel(title, subtitle) {
        this.title = title;
        this.subtitle = subtitle;
    }

    BaseModel.prototype.getTitle = function() {
        return this.title;
    };

    BaseModel.prototype.getSubtitle = function() {
        return this.subtitle;
    };

    BaseModel.prototype.getContentData = function() {
        return this.contentData;
    };

    BaseModel.prototype.setContentData = function(content) {
        this.contentData = content;
    };

    return BaseModel;
});
