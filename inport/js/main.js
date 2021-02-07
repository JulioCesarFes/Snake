const s = {}
s.pi = Math.PI

$(() => {
	s.init.canvas()
	s.init.listener()
	s.init.loop()
	s.init.elements()
})

s.init = {}

s.init.canvas = function() {

	s.canvas = $('canvas')
	s.width = s.canvas.css('width')
	s.height = s.canvas.css('height')

	console.log(s.width, s.height)

	s.width = parseInt(s.width)
	s.height = parseInt(s.height)

	console.log(s.width, s.height)

	s.canvas = s.canvas[0]
	s.canvas.width = s.width
	s.canvas.height = s.height
	
	console.log(s.width, s.height)

	s.ctx = s.canvas.getContext('2d')
	
	s.ctx.fillRect(0,0,s.width,s.height)
}

s.init.listener = function() {

	s.body = $('body')

	s.body.on('keydown', function(e) {
		let key = e.keyCode
		key = s.event.keycode(key)
		s.event.keydown(key)
	})

	s.body.on('keyup', function(e) {
		let key = e.keyCode
		key = s.event.keycode(key)
		s.event.keyup(key)
	})
}

s.init.loop = function() {
	s.runing = true
	s.loop()
}


s.init.elements = function () {

	let fn = function (ctx) {
		let len = this.len
		ctx.save()
		ctx.fillStyle = 'green'
		ctx.fillRect(-len/2, len/2, len, len)
		ctx.restore()
	}

	new Cart(0, 0, 15, undefined, fn, false)
}


s.loop = function () {
	s.ctx.clearRect(0, 0, s.width, s.height)
	s.ctx.save()
	s.ctx.translate(s.width/2, s.height/2)
	s.frame()
	s.ctx.restore()
	if (s.runing) window.requestAnimationFrame(s.loop)
}

s.frame = function () {

	Cart.draw(s.ctx)
}

s.period = function () {

	Cart.period()
}

s.event = {}

s.event.keycode = function (key) {
	
	switch (key){
		case 38: key = 'up'; break;
		case 37: key = 'left'; break;
		case 39: key = 'right'; break;
		case 40: key = 'down'; break;
	}
	
	return key;
}


s.event.keydown = function (key) {
	Cart.keydown(key)
}

s.event.keyup = function (key) {
	Cart.keyup(key)
}