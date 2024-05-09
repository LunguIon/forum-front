export const initializeConstellations = (canvas: HTMLCanvasElement, ballColor? : string, lineColor? : string, shapeColorRGBValues? : string, reactOnClick? : boolean) => {
    // CONSTELATIONS:
    
    //if you resize the page below this values the actual canvas 
    //programtically will remain of this size, you will just not see it 
    const MIN_WIDTH_OF_CANVAS = 1000;
    const MIN_HEIGHT_OF_CANVAS = 500;

    //max number of particles in an array 
    const MAX_NUMER_OF_ENTITIES_PER_ARRAY = 65;
    
    //number of layer(specific arrays of dots that will interact with each other)
    const NUMBER_OF_ARRAYS = 3;

    //size of circles
    const MIN_SIZE = 1.5;
    const MAX_SIZE = 5;

    //lenght of lines
    const MIN_LENGHT = 40;
    const MAX_LENGHT = 150;

    //thickness of lines
    const LINE_THIKNESS = 0.4;

    //color
    const BALL_COLOR = ballColor || "#6366f1";
    const LINE_COLOR = lineColor || "#6366f1";

    //initial speed of spreading of shapes n >= MIN_SPEED_POSIBLE
    let CONST_SPEED = 0.2;

    let SPEED_LEFT = 0.15;
    let SPEED_RIGHT = 0.15; 
    let SPEED_UP = -0.5;
    let SPEED_DOWN = 0.5; 

    const MIN_SPEED_POSSIBLE = 0.01;

    //make CONST_SPEED to null for individualt speed to take effect
    if(CONST_SPEED != null){
        SPEED_LEFT = CONST_SPEED;
        SPEED_RIGHT = CONST_SPEED;
        SPEED_UP = CONST_SPEED;
        SPEED_DOWN = CONST_SPEED;
    }

    //speed of shape Decay
    const MIN_SPEED_OF_DECAY = 0.00001;
    const MAX_SPEED_OF_DECAY = 0.0001;

    //min size of shapes until regenerating
    const MIN_SIZE_DECAY = 0.1;

    // radius around mouse that will make shapes move aside
    const RADIUS_AROUND_MOUSE = 150;

    //atraction force around mouse (high number = low attraction) n >= 1
    //default 165 
    const ATTRACTION_FORCE = 120;

    //how faster will shapes decay around mouse
    const SPEED_OF_DECAY_INCREASE_AROUD_MOUSE = 50;


    //maximum opacity of the regions created between shapes 0 < n < 1
    const MAX_SHAPE_OPACITY = 1;

    //color of shapes of the geions as rgb values
    const COLOR_OF_SHAPES = shapeColorRGBValues || "99, 102, 241";

    //the glabal opacicity of the whole canvas 0 < n < 1
    const GLOBAL_OPACITY_OF_SPAHES = 0.9;


    //Every array will have it's elements smoller and smoller 
    //this coeficent determines how much strong is the shrinking of elements
    //(make -1 to desable) n >= 0 
    const COEFICIENT_OF_SMOLNESS = 1.5;

    //bouse of the boerders or teleport to the other border
    let BOUNCE = true;

    //on resized refresh all shapes
    const SHAPE_RESIZE_REFRESH = false;

    //how fast will the shapes disperse when you click (the higher - the slower) 
    //(make this -1 to for the shapes to attract to the mouse, instead of disperse) n >= 1 
    //default 35
    const CLICK_PROPULTION = 35;

    //max click propultion speed
    const MAX_CLICK_PROPUTION_SPEED = 0.5;

    //click propultion radius
    const CLICK_PROPULTION_RADIUS = RADIUS_AROUND_MOUSE * 1.5;
    


    
    //INITIALIZATION
    let w : number, width : number, h : number, height : number;
    let ctx : any  = canvas.getContext("2d");

    function resize(){
        if(canvas.getBoundingClientRect().width > MIN_WIDTH_OF_CANVAS){
            width = w = canvas.getBoundingClientRect().width;
        } else{
            width = w = MIN_WIDTH_OF_CANVAS;
        }
        
        if(canvas.getBoundingClientRect().height > MIN_HEIGHT_OF_CANVAS){
            height = h = canvas.getBoundingClientRect().height
        }else{
            height = h = MIN_HEIGHT_OF_CANVAS;
        }

        canvas.width = canvas.getBoundingClientRect().width;
        canvas.height = canvas.getBoundingClientRect().height;

        // console.log("resize: " + w + " : " + h + ".");
    }
    resize();
    window.addEventListener('resize', resize, false);

    function dist(x1 : number, y1 : number, x2 : number, y2 : number) {
        x2 -= x1; 
        y2 -= y1;
        return Math.sqrt((x2*x2) + (y2*y2));
    }

    function getRandom(min : number, max : number) {
        return Math.random() * (max - min) + min;
    }

    // Number.prototype.between = function(a : number, b : number) {
    //     var 
    //     min = Math.min.apply(Math, [a, b]),
    //     max = Math.max.apply(Math, [a, b]);
    //     return this > min && this < max;
    // };

    function isNumberBetween(value: number, a: number, b: number): boolean {
        const min = Math.min(a, b);
        const max = Math.max(a, b);
        return value > min && value < max;
    }

    function getRandomArgument(arg1 : number, arg2 : number) {
        const randomIndex = Math.floor(Math.random() * 2);
        return randomIndex === 0 ? arg1 : arg2;
    }


    setTimeout(function(){
        
        //other global objects
        const mainArray : any = [];
        ctx.globalAlpha = GLOBAL_OPACITY_OF_SPAHES;
        let mouse : any = {
            x: 0,
            y: 0
        }


        //the actual code
        window.addEventListener('resize',
            function(){
                ctx.globalAlpha = GLOBAL_OPACITY_OF_SPAHES;
                if(SHAPE_RESIZE_REFRESH){
                    init();
                }
            }
        )

        window.addEventListener('mousemove', 
            function(event){
                mouse.x = event.clientX - canvas.getBoundingClientRect().left;
                mouse.y = event.clientY - canvas.getBoundingClientRect().top;
                // console.log(mouse.x + " " + mouse.y);
        });

        let clicklistener : boolean = true;
        if(reactOnClick != undefined){
            clicklistener = reactOnClick;
        }
        if(clicklistener){
            window.addEventListener('click', 
                function(event){
                    
                    // console.log("cick: " + mouse.x + " : " + mouse.y);
                        for(let j = 0; j < NUMBER_OF_ARRAYS; j ++){
                            for(let i = 0; i < mainArray[j].length; i++){
                            let shape = mainArray[j][i];
    
                            if(CLICK_PROPULTION <= -1){
                                if(shape.distance < RADIUS_AROUND_MOUSE * 20){
                                
                                    if(Math.sign(shape.speedX) != Math.sign(shape.dx)) 
                                        shape.speedX = -shape.speedX;
                                
                                    if(Math.sign(shape.speedY) != Math.sign(shape.dy)) 
                                        shape.speedY = -shape.speedY;
                                
                                    if(isNumberBetween(shape.x, mouse.x+20, mouse.x-20))
                                        shape.speedX = 0;
                                
                                    if(isNumberBetween(shape.y, mouse.y+20, mouse.y-20))
                                        shape.speedY = 0;
                            
                                }
                            } else {
                                if(shape.distance < CLICK_PROPULTION_RADIUS){
                                    let forceDirectionX = shape.dx / shape.distance;
                                    let forceDirectionY = shape.dy / shape.distance;
    
                                    let force = (CLICK_PROPULTION_RADIUS - shape.distance) / (CLICK_PROPULTION_RADIUS);
    
                                    let dirX = - (forceDirectionX * force * shape.lineLengh) / CLICK_PROPULTION;
                                    let dirY = - (forceDirectionY * force * shape.lineLengh) / CLICK_PROPULTION;
    
                                    if(shape.distance < RADIUS_AROUND_MOUSE * 2 + shape.size){
                                        if(dirX < -MAX_CLICK_PROPUTION_SPEED || dirX > MAX_CLICK_PROPUTION_SPEED){
                                            if(Math.sign(dirX) == -1) 
                                                shape.speedX = -MAX_CLICK_PROPUTION_SPEED;
                                            else 
                                                shape.speedX = MAX_CLICK_PROPUTION_SPEED; 
                                        }
                                        if(dirY < -MAX_CLICK_PROPUTION_SPEED || dirY > MAX_CLICK_PROPUTION_SPEED){
                                            if(Math.sign(dirY) == -1)
                                                 shape.speedY = -MAX_CLICK_PROPUTION_SPEED;
                                            else 
                                                shape.speedY = MAX_CLICK_PROPUTION_SPEED; 
                                        }    
                                    }
                                }
                            }
                        }
                    }
                    
            });
        }


        class Shape{
            x: number
            y: number
            size : number
            speedX : number
            speedY : number
            lineLengh : number
            speedOfDecay : number
            color : any
            secondaryColor : any
            distance : any
            dx : any
            dy : any
            dirX : any
            dirY : any
            
            constructor(options : any){
                this.x = getRandom(1, w);
                this.y = getRandom(1, h);

                let min_size, max_size, min_speed_of_decay, max_speed_of_decay;

                try{        min_size = options.min_size;}
                catch(e){   min_size = MIN_SIZE;}

                try{        max_size = options.max_size;}
                catch(e){   max_size = MAX_SIZE;}


                this.size = getRandom(min_size, max_size);

                    // this.speedX=getRandom(-SPEED_LEFT, SPEED_RIGHT);
                this.speedX = getRandomArgument(getRandom(-SPEED_LEFT, -MIN_SPEED_POSSIBLE), getRandom(MIN_SPEED_POSSIBLE, SPEED_RIGHT));
                    // this.speedY=getRandom(-SPEED_UP, SPEED_DOWN);
                this.speedY = getRandomArgument(getRandom(-SPEED_UP, -MIN_SPEED_POSSIBLE), getRandom(MIN_SPEED_POSSIBLE, SPEED_DOWN));

            
                
                //todo: maybe adding density
                this.lineLengh = getRandom(MIN_LENGHT, MAX_LENGHT);

                try{        min_speed_of_decay = options.min_speed_of_decay;}
                catch(e){   min_speed_of_decay = MIN_SPEED_OF_DECAY}

                try{        max_speed_of_decay = options.max_speed_of_decay;}
                catch(e){   max_speed_of_decay = MAX_SPEED_OF_DECAY}

                this.speedOfDecay = getRandom(min_speed_of_decay, max_speed_of_decay);

                this.color = BALL_COLOR;

                try{        this.secondaryColor = options.secondaryColor; }
                catch(e){   this.secondaryColor = null} 
            
            }


            update(){
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.hypot(dx, dy);

                this.distance = distance;
                this.dx = dx;
                this.dy = dy;

                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;

                //the closer the stronger the pull
                let force = (RADIUS_AROUND_MOUSE - distance) / RADIUS_AROUND_MOUSE;
                if(force < 0) force = 0;

                this.dirX = (forceDirectionX * force * this.lineLengh) / ATTRACTION_FORCE;
                this.dirY = (forceDirectionY * force * this.lineLengh) / ATTRACTION_FORCE;

                if(distance < RADIUS_AROUND_MOUSE + this.size){
                    this.size -= this.speedOfDecay * SPEED_OF_DECAY_INCREASE_AROUD_MOUSE;

                    this.x += this.dirX + this.speedX;
                    this.y += this.dirY + this.speedY;

                    //event horizon radius
                    if(distance < 1 + this.size){
                        this.size = MIN_SIZE_DECAY;
                    }
                }
                else{
                    this.x += this.speedX;
                    this.y += this.speedY;
                }
                
                this.size -= this.speedOfDecay;
            }

            draw(){
                ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                ctx.closePath();
            }
        }


        function drawConections(i : number, arr : any){
            for (let j = i+1; j < arr.length; j++) {
                let shape1 = arr[i];
                let shape2 = arr[j];
                let distance_1_2 = dist(shape1.x, shape1.y, shape2.x, shape2.y);

                //draw conections
                if (distance_1_2 <= shape2.lineLengh) {
                    ctx.beginPath();
                        ctx.strokeStyle = LINE_COLOR;
                        ctx.lineWidth = (1 - distance_1_2/shape2.lineLengh)*LINE_THIKNESS;
                        ctx.moveTo(shape1.x, shape1.y);
                        ctx.lineTo(shape2.x, shape2.y);
                        ctx.stroke();
                    ctx.closePath();

                    //draw shapes in between 3 points
                    for(let t = j+1; t < arr.length; t++){
                        let shape3 = arr[t];
                        let distance_2_3 = dist(shape2.x, shape2.y, shape3.x, shape3.y);
                        let distance_1_3 = dist(shape1.x, shape1.y, shape3.x, shape3.y);
                        if(distance_2_3 <= shape3.lineLengh && distance_1_3 <= shape3.lineLengh){
                            ctx.beginPath();
                                let normalisedShapeOpacity = 1 - Math.max(distance_1_2/shape2.lineLengh, distance_2_3/shape3.lineLengh, distance_1_3/shape3.lineLengh);
                                let normalisedMaxShapeOpacity = 1 - MAX_SHAPE_OPACITY;
                                // if(shape3.secondaryColor == null) {
                                    ctx.fillStyle = "rgba("+ COLOR_OF_SHAPES +","+ (normalisedShapeOpacity - normalisedMaxShapeOpacity) +")";
                                // } else{
                                //     ctx.fillStyle = "rgba("+ SECONDARY_COLOR +","+ (normalisedShapeOpacity - normalisedMaxShapeOpacity) +")";
                                // }
                                ctx.moveTo(shape1.x, shape1.y);
                                ctx.lineTo(shape2.x, shape2.y);
                                ctx.lineTo(shape3.x, shape3.y);
                                ctx.fill();
                            ctx.closePath();
                        }
                    }
                }
                
            }
        }

        function drawShapes(arr : any, arrIndex : number){
            let shapesToRemove = [];

            for (let i = 0; i < arr.length; i++) {
                arr[i].update();
                arr[i].draw();
                drawConections(i, arr);

                if(BOUNCE == false){
                    if(arr[i].x >= w) arr[i].x = 1;
                    if(arr[i].x <= 0) arr[i].x = w-1;

                    if(arr[i].y >= h) arr[i].y = 1;
                    if(arr[i].y <= 0) arr[i].y = h-1;
                } else{
                    if (arr[i].x >= w || arr[i].x <= 0) {
                        arr[i].speedX = -arr[i].speedX;
                    }

                    if (arr[i].y >= h || arr[i].y <= 0) {
                        arr[i].speedY = -arr[i].speedY;
                    }
                }

                if (arr[i].x >= w + 2 || arr[i].x <= -2 ||
                    arr[i].y >= h + 2 || arr[i].y <= -2 ||
                    arr[i].size <= MIN_SIZE_DECAY) {
                    shapesToRemove.push(i);
                }
            }

            for (let i = shapesToRemove.length - 1; i >= 0; i--) {
                arr.splice(shapesToRemove[i], 1);
                arr.push(
                    new Shape({
                        min_size: (MIN_SIZE/arrIndex), 
                        max_size: (MAX_SIZE/arrIndex),
                        min_speed_of_decay: (MIN_SPEED_OF_DECAY/arrIndex),
                        max_speed_of_decay: (MAX_SPEED_OF_DECAY/arrIndex)})
                    );
            }
        }


        function init(){
            mainArray.splice(0, mainArray.length);
            for(let i = 0; i < NUMBER_OF_ARRAYS; i++){
                let arr : any = [];
                mainArray.push(arr);
            }

            for(let i = 0; i < NUMBER_OF_ARRAYS; i++){
                let index;

                if(COEFICIENT_OF_SMOLNESS <= -1) 
                    index = 1;
                else 
                    index = i + 1 + COEFICIENT_OF_SMOLNESS;

                let min_size = MIN_SIZE / index;
                let max_size = MAX_SIZE / index;
                let min_speed_of_decay = MIN_SPEED_OF_DECAY / index;
                let max_speed_of_decay = MAX_SPEED_OF_DECAY / index;

                for(let j = 0; j < MAX_NUMER_OF_ENTITIES_PER_ARRAY; j++){
                    mainArray[i].push(
                        new Shape({
                            min_size: (min_size), 
                            max_size: (max_size), 
                            min_speed_of_decay: (min_speed_of_decay), 
                            max_speed_of_decay: (max_speed_of_decay) })
                        );
                }
            }
            // console.log(mainArray);
        } 
        init();

        function animate(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            for(let i = 0; i < NUMBER_OF_ARRAYS; i++){
                let index;
                if(COEFICIENT_OF_SMOLNESS <= -1) 
                    index = 1;
                else 
                    index = i + 1 + COEFICIENT_OF_SMOLNESS;

                drawShapes(mainArray[i], index);
            }
            requestAnimationFrame(animate);
        }
        animate();

    }, 1);

}


