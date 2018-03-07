import 'pixi.js';

const App = new PIXI.Application(window.screen.width, window.screen.height, {
    autoResize: true
});
document.body.appendChild(App.view);

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function onLoadComplete(loader, resources) {

    //function to Add Background
    function addBackground({autoResize = false}) {
        const bg = new PIXI.extras.TilingSprite(resources.background.texture, window.innerWidth, window.innerHeight);
        bg.width = window.innerWidth;
        bg.height = window.innerHeight;
        return bg;
    }

    //function to Add texture layer
    function addDust() {
        const video = new PIXI.VideoBaseTexture(resources.dust.data);
        const texture = new PIXI.Texture(video);
        const dust = new PIXI.Sprite(texture);

        video.source.loop = true;

        video.width = window.screen.width;
        video.height = window.screen.height;
        video.alpha = 0.8;
        dust.blendMode = PIXI.BLEND_MODES.SCREEN;
        return dust;
    }

    //function to Add Curve Light
    function addCurveLight() {
        const container = new PIXI.Container();
        container.x = App.screen.width / 8;
        container.y = App.screen.height / 2;
        // container.skew.y = 10

        let cl = new PIXI.Sprite(resources.curvelight.texture);
        cl.height = App.screen.height;
        cl.y = -App.screen.height / 2;

        let thing = new PIXI.Graphics();
        App.stage.addChild(thing);
        thing.y = -App.screen.height;
        thing.lineStyle(0);

        container.mask = thing;

        let count = 0;


        App.ticker.add(function runCurveLight(delta) {
            thing.clear();
            thing.beginFill(0x555555);
            thing.drawRect(App.screen.width / 8, 0, 220, App.screen.height)
            thing.endFill()
            // thing.moveTo(-120, -App.screen.height);
            // thing.lineTo(120, -App.screen.height);
            // thing.lineTo(120, App.screen.height);
            // thing.lineTo(-120, App.screen.height);
            thing.y += 6 * delta;
            if (thing.y >= 0) {
                App.ticker.remove(runCurveLight)
            }
        });

        container.addChild(cl);
        return container;
    }

    //function to Add carusel vertical slider
    function addHexLight() {
        const container = new PIXI.Container();
        // console.log(container);
        function createSLider(){
            let yCenterBefore = App.screen.height / 2;
            // console.log(yCenterBefore)
            // console.log(yCenter)
            for (let i = 0; i < 3; i++) {
                let hl = new PIXI.Sprite(resources.hexlight.texture);
                hl.width = 150;
                hl.height = 150;
                hl.x = App.screen.width / 6;
                hl.y = (i / 3) * 700;
                hl.anchor.set(0.5);
                hl.interactive = true;
                hl.buttonMode = true;

                container.x = App.screen.width /10 ;
                container.y = (App.screen.height - container.height) / 3.5;
                container.addChild(hl);
                // console.log(container.children[i].position.y)
                hl.alpha = 0;

            }





            let mask = new PIXI.Graphics();
            mask.beginFill(0x555555);
            mask.drawRect(App.screen.width / 6, 40, App.screen.width, container.height);
            mask.endFill();
            container.mask = mask;
            App.stage.addChild(mask);

            let target = new PIXI.Point();

            createDragAndDropFor(container);

            App.ticker.add(function () {
                for(let a=0 ; a<container.children.length; a++){
                    container.children[a].alpha += 0.007;
                }
            });
        }
        createSLider();

        function content() {
            let Title1 = new PIXI.Text(
                "HOW TO CREATE A BLOG: VIDEO",
                {
                    fontFamily : 'Arial',
                    fontSize: 70,
                    fill : "white",
                });
            Title1.x = container.width*2;
            Title1.y = -container.height/3;

            let Author1 = new PIXI.Text("JOSHUA FEILDS MILLBURN",{
                fontFamily : 'Arial',
                fontSize: 50,
                fill : "white"
            });
            Author1.x = container.width*2;
            Author1.y = -container.height/6;

            let Content1 = new PIXI.Text("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",{
                fontFamily : 'Arial',
                fontSize: 40,
                fill : "white",
                wordWrap : true,
                wordWrapWidth : 2000
            });
            Content1.x = container.width*2;
            Content1.y = -container.height/18;


            let Title2 = new PIXI.Text(
                "HOW TO CREATE A BLOG: VIDEO",
                {
                    fontFamily : 'Arial',
                    fontSize: 70,
                    fill : "white",
                });
            Title2.x = container.width*2;
            Title2.y = -container.height/3;

            let Author2 = new PIXI.Text("JOSHUA FEILDS MILLBURN",{
                fontFamily : 'Arial',
                fontSize: 50,
                fill : "white"
            });
            Author2.x = container.width*2;
            Author2.y = -container.height/6;

            let Content2 = new PIXI.Text("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",{
                fontFamily : 'Arial',
                fontSize: 40,
                fill : "white",
                wordWrap : true,
                wordWrapWidth : 2000
            });
            Content2.x = container.width*2;
            Content2.y = -container.height/18;

            let Title3 = new PIXI.Text(
                "HOW TO CREATE A BLOG: VIDEO",
                {
                    fontFamily : 'Arial',
                    fontSize: 70,
                    fill : "white",
                });
            Title3.x = container.width*2;
            Title3.y = -container.height/3;

            let Author3 = new PIXI.Text("JOSHUA FEILDS MILLBURN",{
                fontFamily : 'Arial',
                fontSize: 50,
                fill : "white"
            });
            Author3.x = container.width*2;
            Author3.y = -container.height/6;

            let Content3 = new PIXI.Text("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",{
                fontFamily : 'Arial',
                fontSize: 40,
                fill : "white",
                wordWrap : true,
                wordWrapWidth : 2000
            });
            Content3.x = container.width*2;
            Content3.y = -container.height/18;


            container.children[0].addChild(Title1,Author1,Content1);
            container.children[1].addChild(Title2,Author2,Content2);
            container.children[2].addChild(Title3,Author3,Content3);

        }
        content();

        function createDragAndDropFor(target) {
            let drag = false;
            let yChildClick= []; //to let position of children in container when click
            let yClick;

            target.interactive = true;
            target.on("mousedown", function (e) {
                drag = target;
                if(drag){
                    yClick = e.data.global.y; //to let position of mouse when click
                    // console.log('first mouse click',yClick)
                }

                for (let k = 0; k < container.children.length; k++) {
                    let childrenPositionBefore = container.children[k].position.y;
                    // console.log(childrenPositionBefore)
                    yChildClick.push(childrenPositionBefore); //vi tri cua child luc dau
                }
            });
            target.on("mouseup", function (e) {
                drag = false;
            });
            target.on("mouseout", function (e) {
                drag = false;
            });
            target.on("mousemove", function (e) {
                if (drag) {
                    let yMouseUpdate = e.data.global.y; //to let the position of mouse after moving
                    // console.log('new mouse click',yMouseUpdate)
                    for (let j = 0; j < container.children.length; j++) {
                        let yChildNew = yChildClick[j] + (yMouseUpdate - yClick) ;
                        let yCenter = container.height /2;
                        // console.log('vi tri con luc sau',yChildNew);
                        let deltaSizeScale = (Math.abs(yChildNew - yCenter) * 0.4) / yCenter;
                        // drag.position.y += e.data.originalEvent.movementY  ;
                        drag.children[j].position.y += e.data.originalEvent.movementY  ;
                        // console.log(yChildNew[0])
                        // console.log(drag.position.y)
                        //     if(yMouseUpdate - yClick >= 0){
                        //         drag.position.y = yChildNew;
                        //     }else{
                        //         drag.position.y -= yChildNew;
                        //     }


                        // console.log(e.data)

                    }


                }
            })
        }
        return container;
    }

    //function to Add masking shadow
    function addShadowArea() {
        const mask = new PIXI.Sprite(resources.mask.texture);
        mask.width = App.screen.width;
        mask.height = App.screen.height;
        mask.alpha = 0;
        mask.x = App.screen.width / 7;
        mask.scale.x = 1.7;

        App.ticker.add(function () {
            mask.alpha += 0.008;
        });
        return mask;

    }

    App.stage.addChild(addBackground({autoResize: true}));
    // App.stage.addChild(addDust());
    App.stage.addChild(addShadowArea());
    App.stage.addChild(addCurveLight());
    App.stage.addChild(addHexLight());

}


PIXI.loader
    .add('background', './asset/blog/img/blog-10recent.png')
    .add('dust', './asset/blog/video/Dust.mp4')
    .add('curvelight', './asset/blog/img/curvelight.png')
    .add('mask', './asset/blog/img/shadowArea.png')
    .add('hexlight', './asset/blog/img/hexlight.png')
    .add('shadowArea', './asset/blog/img/shadowArea.png')
    .add('OtherBlog','./asset/blog/img/Other-blog.png')
    .load(onLoadComplete);


