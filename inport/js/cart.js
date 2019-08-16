class Cart{

	constructor (x, y, len, parent, draw_fn, follow) {
		this.data = {}

		this.x = x
		this.y = y
		this.len = len
		this.parent = parent
		this.draw_fn = draw_fn
		this.follow = follow
		

		this.velocity = 0.5
		this.aceleration = 0.1
		this.max_velocity = 10
		this.min_velocity = 0.5
		this.walking = 0

		this.angle = 0 
		this.rotating = 0
		this.angle_increase = (Math.PI/90)
		this.min_angle = 0
		this.max_angle = Math.PI * 2


		this.class = Cart
		this.class.push(this)
	}
	set x (value) {
		if (typeof value == 'number') {
			this.data.x = parseInt(value);
		} else {
			this.data.x = 0;
		}
	}
	set y (value) {
		if (typeof value == 'number') {
			this.data.y = parseInt(value);
		} else {
			this.data.y = 0;
		}
	}
	set len (value) {
		if (typeof value == 'number') {
			this.data.len = parseInt(value);
		} else {
			this.data.len = 0;
		}
	}
	set parent (value) {
		if (typeof value == 'number') {
			value = parseInt(value)
			if(this.class.isInstance(value)){
				this.data.parent = valuev
			}
		} else {
			this.data.parent = undefined;
		}
	}
	set draw_fn (value) {
		if (typeof value == 'function') {
			this.data.draw_fn = value;
		} else {
			this.data.draw_fn = function (ctx) {
				let len = this.len
				ctx.save()
				ctx.beginPath()
				ctx.arc(0, 0, len, 0, 2 * Math.PI)
				ctx.moveTo(len, 0)
				ctx.lineTo(2*len, 0)
				ctx.stroke()
				ctx.restore()
			}
		}
	}
	set follow (value) {
		if (typeof value == 'boolean') {
			this.data.follow = value
		}
		this.data.follow = false
	}

	draw (ctx) {
		ctx.save()

		ctx.translate(this.data.x, this.data.y)
		
		ctx.rotate(this.angle)

		this.data.draw_fn(ctx)
		
		ctx.restore()

		this.rotate()

		this.walk()
	}

	keydown (key) {
		switch (key) {
			case 'up': this.walking = 1; break;
			case 'down': this.walking = -2; break;
			case 'left': this.rotating = -1; break;
			case 'right': this.rotating = 1; break;
		}
	}

	keyup (key) {
		switch (key) {
			case 'up': this.walking = -1; break;
			case 'down': this.walking = -1; break;
			case 'left': this.rotating = 0; break;
			case 'right': this.rotating = 0; break;
		}
	}

	rotate () {
		s.ang = this.angle + this.rotating * this.angle_increase
		
		// if (s.ang > this.max_angle) s.ang = this.min_angle
		// if (s.ang < this.min_angle) s.ang = this.max_angle

		this.angle = s.ang 
	}

	walk () {
		s.vel = this.velocity + this.walking * this.aceleration
		
		if (s.vel > this.max_velocity) s.vel = this.max_velocity
		if (s.vel < this.min_velocity) s.vel = this.min_velocity

		this.velocity = s.vel 

		this.data.x += (this.velocity * Math.cos(this.angle))

		this.data.y += (this.velocity * Math.sin(this.angle))


		// console.log(Math.sin(this.angle), Math.cos(this.angle))
		console.log(this.data.x, this.data.y)

	}

	static isInstance (int) { return (typeof this.data.instances[int] == 'object') }

	static push (cart) {
		if (typeof this.data == 'undefined'){
			this.data = [];
		}
		return this.data.push(cart)
	}

	static draw (ctx) {
		
		if (typeof this.data == 'undefined'){
			this.data = [];
		}
		for (var i = 0; i < this.data.length; i++) {
			this.data[i].draw(ctx)
		}
	}

	static keydown (key) {
		
		if (typeof this.data == 'undefined'){
			this.data = [];
		}
		for (var i = 0; i < this.data.length; i++) {
			this.data[i].keydown(key)
		}
	}

	static keyup (key) {
		
		if (typeof this.data == 'undefined'){
			this.data = [];
		}
		for (var i = 0; i < this.data.length; i++) {
			this.data[i].keyup(key)
		}
	}
}