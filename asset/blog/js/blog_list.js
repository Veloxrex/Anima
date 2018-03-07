import 'pixi.js'

const App = new PIXI.Application(window.screen.width, window.screen.height, {autoResize: true});
document.body.appendChild(App.view);

function onLoadComplete(Loader, resources) {
    function addBackground() {
        const bg = new PIXI.Sprite(resources.background.texture);
        bg.width = App.screen.width;
        bg.height = App.screen.height;
        return bg;
    }

    function addList() {
        const container = new PIXI.Container();

        function createList() {
            for (let i = 0; i < 16; i++) {
                const hl = new PIXI.Sprite(resources.hexlight.texture);
                hl.width = 150;
                hl.height = 150;

                hl.anchor.set(0.5);
                hl.x = (i % 4) * (App.screen.width / 4);
                hl.y = Math.floor(i / 4) * (App.screen.height / 3);
                hl.interactive = true;
                hl.buttonMode = true;
                container.x = App.screen.width - container.width;
                container.y = container.height / 3;
                container.addChild(hl);
            }
        }

        createList();

        function content() {
            let contentList = [
                'HOW TO MAKE A GOOD BLOGGER 27/10/2017',
                'HOW TO MAKE A GOOD BLOGGER 27/10/2018',
                'HOW TO MAKE A GOOD BLOGGER 27/10/2019',
                'HOW TO MAKE A GOOD BLOGGER 27/10/20110',
                'HOW TO MAKE A GOOD BLOGGER 27/10/2011',
                'HOW TO MAKE A GOOD BLOGGER 27/10/2012',
                'HOW TO MAKE A GOOD BLOGGER 27/10/2013',
                'HOW TO MAKE A GOOD BLOGGER 27/10/2017',
                'HOW TO MAKE A GOOD BLOGGER 27/10/2017',
                'HOW TO MAKE A GOOD BLOGGER 27/10/2017',
                'HOW TO MAKE A GOOD BLOGGER 27/10/2017',
                'HOW TO MAKE A GOOD BLOGGER 27/10/2017',
                'HOW TO MAKE A GOOD BLOGGER 27/10/2017',
                'HOW TO MAKE A GOOD BLOGGER 27/10/2017',
                'HOW TO MAKE A GOOD BLOGGER 27/10/2017',
                'HOW TO MAKE A GOOD BLOGGER 27/10/2017'

            ];
            for(let a=0; a<container.children.length; a++) {
                let contentCard = new PIXI.Text(
                    contentList[a], {
                        fontFamily : 'Arial',
                        fontSize: 60,
                        fill : 'white',
                        wordWrap : true,
                        breakWords: true,
                        wordWrapWidth : 600,
                        align :  'center'

                    }
                );
                contentCard.x = -container.width / 5;
                contentCard.y = container.height / 3;
                container.children[a].addChild(contentCard);
            }


        }

        content();

        let mask = new PIXI.Graphics();
        mask.beginFill(0x555555);
        mask.drawRect(App.screen.width - (container.width + 80), App.screen.height - container.height / 1.8, container.width + 20, container.height );
        mask.endFill();
        container.mask = mask;
        App.stage.addChild(mask);

        var drag = false;
        createDragAndDropFor(container);

        function createDragAndDropFor(target) {
            target.interactive = true;
            target.on("mousedown", function (e) {
                drag = target;
            });
            target.on("mouseup", function (e) {
                drag = false;
            });
            target.on("mouseout", function (e) {
                drag = false;
            });
            target.on("mousemove", function (e) {
                if (drag) {
                    drag.position.y += e.data.originalEvent.movementY;
                }
            })
        }

        return container;
    }

    function addLogoButton() {
        const lg = new PIXI.Sprite(resources.logo.texture);
        lg.width = 140;
        lg.height = 140;
        lg.anchor.set(0.5);
        lg.x = App.screen.width / 2;
        lg.y = App.screen.height / 10;
        lg.interactive = true;
        lg.buttonMode = true;
        lg.alpha = 0;
        App.ticker.add(function () {
            lg.alpha += 0.009;
        });
        return lg;


    }


    function addTimeLine() {
        const tl = new PIXI.Sprite(resources.timeline.texture);
        tl.width = 800;
        tl.height = 150;
        tl.anchor.set(0.5);
        tl.x = App.screen.width / 2;
        tl.y = App.screen.height / 8;
        return tl;
    }

    function addContentTimeLine() {
        const container = new PIXI.Container();

        let content = [
            '2016','2015','2014'
        ];
        for(let i=0 ; i<=content.length ; i++ ){
            let contentTimeline = new PIXI.Text(
                content[i], {
                    fontFamily : 'Arial',
                    fontSize: 29,
                    fill : 'white',
                    wordWrap : true,
                    breakWords: true,
                    wordWrapWidth : 600,
                    align :  'center'
                }
            );

            contentTimeline.anchor.set(0.5);
            contentTimeline.x = (i % 3) * 250;
            contentTimeline.y = App.screen.height / 5.2;
            container.x = App.screen.width / 3.2;
            container.addChild(contentTimeline);
        }
        let mask = new PIXI.Graphics();
        mask.beginFill(0x555555);
        mask.drawRect(App.screen.width / 4, 130, App.screen.width / 2, container.height);
        mask.endFill();
        container.mask = mask;
        App.stage.addChild(mask);

        var drag = false;
        createDragAndDropFor(container);

        function createDragAndDropFor(target) {
            target.interactive = true;
            target.on("mousedown", function (e) {
                drag = target;
            });
            target.on("mouseup", function (e) {
                drag = false;
            });
            target.on("mouseout", function (e) {
                drag = false;
            });
            target.on("mousemove", function (e) {
                if (drag) {
                    drag.position.x += e.data.originalEvent.movementX;
                }
            })
        }

        return container;
    }
    App.stage.addChild(addBackground());
    App.stage.addChild(addList());
    App.stage.addChild(addTimeLine());
    App.stage.addChild(addLogoButton());
    App.stage.addChild(addContentTimeLine())

}

PIXI.loader
    .add('background', './asset/blog/img/blog-list.png')
    .add('hexlight', './asset/blog/img/hexlight.png')
    .add('logo', './asset/blog/img/logo.png')
    .add('timeline','./asset/blog/img/timeline.png')
    .load(onLoadComplete);