;(g = function(level) {  

var startTime = Date.now()

//# pixel size
const N = 16

//# grid size
const W = 70
const H = 40

//# grid
var grid = []

//# player's tail
var w = []

const DEATH_BLINKS_COUNT = 4

var livesCount = (0+ 3 * DEATH_BLINKS_COUNT +0)

const CELL_COLOR = "#888"

var t = null
d = null

//# units registry
var registry = [
  //# empty
  { 
    c: "#000", 
  }, 
  //# cell
  { 
    c: CELL_COLOR, 
  }, 
  //# player
  { 
    c: "#ff0", 
    p: [0, 0], 
    m: function(p, c) { 
      with(this) {
        grid[p] = 1
        p = [(t = p[0] + d[0]) < 0 ? 0 : t > (0+ W - 1 +0) ? (0+ W - 1 +0) : t, (t = p[1] + d[1]) < 0 ? 0 : t > (0+ H - 1 +0) ? (0+ H - 1 +0) : t]
        //# fly or hedgehog
        if(grid[p] > 2) {
          livesCount--
        }
        //# empty cell
        if(grid[p] == 0) {
          //# new cell for { w }
          w.push(p)
          return
        }
        //# web cell
        if(grid[p] == 1 && w[0]) {
          if(w.join(b).match("\\b" + p + "\\b")) {
            return
          }
          with({ c: "#fff", i: 0, p: p }) {
            c = v = []
            var f = []
            var u = function(p, c) {
              if(grid[p] < 0) {
                return i
              }
              if(c[p] < 2 || c[p] == i) {
                return c[p] 
              }
              if(registry[grid[p]].d) {
                return c == f
              }
              if(grid[p]) {
                return i
              }
              c[p] = i
              c[p] = (u([p[0] + 1, p[1]], c) && u([p[0] - 1, p[1]], c)
                  && u([p[0], p[1] + 1], c) && u([p[0], p[1] - 1], c)
              )
              if(c == f) {
                return grid[p] = 1
              }
              return c[p]
            }
            //? avoid new var
            for(var i = 4; p = w[i / 4 - 1];) {
              u([p[0] + 1, p[1]], c) && u([p[0] + 1, p[1]], f)  
              ++i
              u([p[0] - 1, p[1]], c) && u([p[0] - 1, p[1]], f)  
              ++i
              u([p[0], p[1] + 1], c) && u([p[0], p[1] + 1], f)  
              ++i
              u([p[0], p[1] - 1], c) && u([p[0], p[1] - 1], f)  
              ++i
            }
          }
          w = []
        }      
      }
    }
  }
]

//# init field
p = []
for(p[1] = (0+ H +0); p[1]--;) {
  for(p[0] = (0+ W +0); p[0]--;) {
    grid[p] = 0 | Math.random() + 5e-3
  }
}  

//# walls
d = [0, 0]
for(p[0] = (0+ W +0); p[0]--;) {
  grid[[p[0], 0]] = grid[[p[0],  1]] = grid[[p[0], (0+ H - 1 +0)]] = grid[[p[0], (0+ H - 2 +0)]] = 1 
} 
for(p[1] = (0+ H +0); p[1]--;) {
  grid[[0, p[1] + d[1]]] = grid[[1, p[1] + d[1]]] = grid[[(0+ W - 1 +0), p[1] + d[1]]] = grid[[(0+ W - 2 +0), p[1] + d[1]]] = 1 
}

for(i = 0; 9 > ++i;) {
  p = [0 | Math.random() * W, 0 | Math.random() * H]
  //registry[grid[[x, p[1]]] = i + 3] = (grid[[x, p[1]]] 
  registry.push(grid[p] 
    //# hedgehog
    ? { 
      c: "#080", 
      //# old cell
      p: p, 
      m: function(p, c) {
        with(this) {
          var u = null
          //# random movement by web, but bit closer to player
          //# random movement by web, but bit closer to player
          for(grid[p] = 1; grid[u = [(t = (registry[2].p[0] - p[0] > 0 ? 1 : -1) * (0 | Math.random() * 3 - 1.3) + p[0]) < 0 ? 0 : t > (0+ W - 1 +0) ? (0+ W - 1 +0) : t, (t = (registry[2].p[1] - p[1] > 0 ? 1 : -1) * (0 | Math.random() * 3 - 1.3) + p[1]) < 0 ? 0 : t > (0+ H - 1 +0) ? (0+ H - 1 +0) : t]] - 1;) { 
          }
          p = u
        }
      }  
    }
    //# fly
    : { 
      c: "#fff", 
      d: [(0 | Math.random() * 2) * 2 - 1, (0 | Math.random() * 2) * 2 - 1], 
      p: p, 
      m: function(p, c) {
        with(this) {
          grid[p] = 0
          
          if(grid[[p[0] + d[0], p[1] + d[1]]] && grid[[p[0] + d[0], p[1]]] == 0 && grid[[p[0], p[1] + d[1]]] == 0) {
            //? try avoid { join }
            //? dont work
            if(w.join(b).match("\\b" + [p[0] + d[0], p[1] + d[1]] + "\\b")) {
              livesCount--
            }
            d[0] = -d[0]
            d[1] = -d[1]
          }
          if(grid[[p[0] + d[0], p[1]]]) {
            if(w.join(b).match("\\b" + [p[0] + d[0], p[1]] + "\\b")) {
              livesCount--
            }
            d[0] = -d[0]
          }
          if(grid[[p[0], p[1] + d[1]]]) {
            if(w.join(b).match("\\b" + [p[0], p[1] + d[1]] + "\\b")) {
              livesCount--
            }
            d[1] = -d[1]
          }
          
          p = [p[0] + d[0], p[1] + d[1]]
        }
      }  
    }
  )
}
//setInterval(s, 1e4)
onkeydown = function(p, c) {
  c = p.which - 37
  if(c >= 0 && c < 4) {
    d = [(c & 2) - 1, 0]
    if(c & 1) {
      d = [d[1], d[0]]
    }
  }
}


var loop = function(p, c) {
  if(livesCount & (0+ DEATH_BLINKS_COUNT - 1 +0)) {
    var p = []
    for(p[1] = H; p[1]--;) {
      for(p[0] = W; p[0]--;) {
        if(0) a.fillStyle = livesCount & 1 ? registry[grid[p]].c : registry[grid[p]].c
        a.fillStyle = livesCount & 1 && grid[p] == 1 ? "#f00" : registry[grid[p]].c
        a.fillRect(N * p[0], p[1] * N, N, N)
      }
    }
    --livesCount ? setTimeout(loop, 500) : g(1)
  }
  else {
    //# move
    for(var i = 1; p = registry[++i];) {
      if(0) (i == 2 || t % 3 == 0 && 2 < i) && p.m()
      p.m()
      grid[p.p] = i
    } 
    
    //# draw and calc filled area
    var filledCellsCount = 0
    var p = []
    for(p[1] = H; p[1]--;) {
      for(p[0] = W; p[0]--;) {
        (a.fillStyle = registry[grid[p]].c) == CELL_COLOR && filledCellsCount++
        a.fillRect(N * p[0], p[1] * N, N, N)
      }
    }
    
    //# render status
    a.font = "".concat(2 * N, "px monospace")
    a.fillStyle = "#f00"
    
    var filledCellsCountPercent = 0 | filledCellsCount * (0+ 100.0 / W / H +0)
    if(1) a.fillText("".concat("lvl#", level, " ", livesCount / DEATH_BLINKS_COUNT, "❤ ", 0 | (Date.now() - startTime) / 1000, "⏰ ",  filledCellsCountPercent, "/", 50 + level * 5, "%"), 4, (0+ H * N - 4 +0))
  
    if(filledCellsCountPercent >= 50 + level * 5) return g(level + 1)
    setTimeout(loop, 1000 / (15 + 2 * level))
  }
}

loop()

})(1)