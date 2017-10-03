function ScrollManager(a1, a2)
{
    for (let n = 0; n < a1.length; n++)
    {
        this.activated.push(false);
        this.objects.push($(a1[n]));
        this.animations.push(a2[n]);
    }
    
    this.scrollCheck = () =>
    {
        for (let n = 0; n < this.activated.length; n++)
            if (!this.activated[n])
            {
                if (this.objects[n].offset().top - $(window).scrollTop() <= $(window).height() * ScrollManager.offsetTop)
                {
                    this.animations[n]();
                    this.activated[n] = true;
                }
            }    
    }
    $(document).scroll(this.scrollCheck);
}

ScrollManager.prototype.activated = [];
ScrollManager.prototype.animations = [];
ScrollManager.prototype.objects = [];

ScrollManager.offsetTop = 0.6;