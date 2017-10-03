function ScrollManager()
{
    this.scrollCheck = () =>
    {
        for (let n = 0; n < this.activated.length; n++)
            if (!this.activated[n])
                if (this.objects[n].offset().top - $(window).scrollTop() <= $(window).height() * (1 - ScrollManager.offsetTop))
                {
                    this.objects[n].removeClass('hidden');
                    
                    this.animations[n]();
                    this.activated[n] = true;
                }
    }
    $(document).scroll(this.scrollCheck);
}

ScrollManager.prototype.activated  = [];
ScrollManager.prototype.animations = [];
ScrollManager.prototype.objects    = [];

ScrollManager.prototype.addSection = function(strQuery, fn)
{
    this.objects.push($(strQuery));
    this.activated.push(false);
    this.animations.push(fn);
}

ScrollManager.offsetTop = 0.4;