export default class Room{
    constructor(index, id, title, description, north=0, south=0, east=0, west=0, x, y){
        this.width = 40
        this.height = 40
        
        
        this.x = x * this.width * 1.125
        this.y = y * this.height * 1.125
        
        this.id = id
        this.title = title
        this.description = description
        this.n_to = north
        this.s_to = south
        this.e_to = east
        this.w_to = west
    }

    draw(ctx, current_room, path) {
        // console.log(current_room)
        let isCurrent = this.title === current_room ? true : false;
        ctx.fillStyle = 'purple'
        if(path.indexOf(this.id) !== -1) ctx.fillStyle = 'gray'
        if(isCurrent) ctx.fillStyle = 'yellow';
        
        ctx.fillRect(this.x, this.y, this.width, this.height)

        // And room id as text in the box
        // ctx.font = "14px Arial"
        // ctx.fillStyle= 'white'
        // if(isCurrent) ctx.fillStyle = 'black'
        // ctx.fillText(this.id, this.x + 5, this.y + 15)
    }
}