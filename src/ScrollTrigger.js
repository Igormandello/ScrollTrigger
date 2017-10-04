function ScrollManager()
{
    this.scrollCheck = () =>
    {
        for (let n = 0; n < this.activated.length; n++)
            if (this.objects[n].returnable)
              if (this.activated[n])
              {
                if (this.objects[n].object.offset().top + this.objects[n].object.height() - $(window).scrollTop() > 0)
                {
                  this.activated[n] = false;
                  this.animations[n](this.activated[n]);
                }    
              }  
              else
              {
                if (this.objects[n].object.offset().top + this.objects[n].object.height() - $(window).scrollTop() < 0)
                {
                    this.activated[n] = true;
                    this.animations[n](this.activated[n]);
                }
              }
            else if (!this.activated[n])
                if (this.objects[n].object.offset().top - $(window).scrollTop() <= $(window).height() * (1 - ScrollManager.offsetTop))
                {
                    this.objects[n].object.removeClass('hidden');
                    
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
    this.objects.push({object: $(strQuery), returnable: false});
    this.activated.push(false);
    this.animations.push(fn);
}

ScrollManager.prototype.addReturnableSection = function(strQuery, fn)
{
    this.objects.push({object: $(strQuery), returnable: true});
    this.activated.push(false);
    this.animations.push(fn);
}

ScrollManager.offsetTop = 0.4;