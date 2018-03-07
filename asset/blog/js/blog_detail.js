
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
    function addLeftContent(){
        const container = new PIXI.Container();
        function addAvatar() {
            const hl = new PIXI.Sprite(resources.hexlight.texture);
            hl.width = 280;
            hl.height = 300;
            hl.anchor.set(0.5);
            return hl;
        }

        function addContent() {
            let title = new PIXI.Text(
                'JOSHUA FIELDS MILLBURN & RYAN NICODEMUS',{
                    fontFamily : 'Arial',
                    fontSize: 18,
                    fill : 'white',
                    wordWrap : true,
                    breakWords: true,
                    wordWrapWidth : 240,
                    align :  'left'
                }
            );
            title.anchor.set(0.5);
            title.y = App.screen.height / 4 ;

            let content =  new PIXI.Text(
                'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.'
                ,{
                    fontFamily : 'Arial',
                    fontSize: 11,
                    fill : 'white',
                    wordWrap : true,
                    breakWords: true,
                    wordWrapWidth : 240,
                    align :  'left'
                }
            );
            content.anchor.set(0.5);
            content.y = App.screen.height / 2.9 ;
            content.x = App.screen.width/App.screen.width;

            let contactTitle = new PIXI.Text(
                'CONTACT ME:', {
                    fontFamily : 'Arial',
                    fontSize: 18,
                    fill : 'white',
                    align :  'left',
                    wordWrap : true,
                    breakWords: true,
                    wordWrapWidth : 240,
                }
            );
            contactTitle.anchor.set(0.5);
            contactTitle.y = App.screen.height / 2.3;
            contactTitle.x = -(App.screen.width / App.screen.width) - 55 ;



            container.addChild(title);
            container.addChild(content);
            container.addChild(contactTitle)
        }
        addContent();

        function addSocialNetwork() {
                var icon = [];
                const icon1 = new PIXI.Sprite( resources.youtube.texture);
                const icon2 = new PIXI.Sprite( resources.google.texture);
                const icon3 = new PIXI.Sprite( resources.linkin.texture);
                const icon4 = new PIXI.Sprite( resources.twitter.texture);
                const icon5 = new PIXI.Sprite( resources.facebook.texture);
                icon.push(icon1,icon2,icon3,icon4,icon5);
                for(let i=0; i<icon.length ; i++){
                    icon[i].anchor.set(0.5);
                    icon[i].width = 40;
                    icon[i].height = 40;
                    icon[i].x =  (i % 5) * 50 - 100;
                    icon[i].y =  App.screen.height / 2;
                    container.addChild(icon[i]);
                }

        }
        addSocialNetwork();

        container.x = App.screen.width / 4;
        container.y = App.screen.height / 4;
        container.addChild(addAvatar());
        return container
    }
    function addRightContent(){
        const container = new PIXI.Container;
        function addRayLight() {
            for(let i=0; i<2; i++){
                const rl = new PIXI.Sprite(resources.raylight.texture);
                rl.height = App.screen.height;
                rl.x = (i % 2) * App.screen.width/1.81 + App.screen.width/2.65;
                container.addChild(rl);
            }
            let mask = new PIXI.Graphics();
            mask.y = -App.screen.height;
            container.mask = mask;
            App.stage.addChild(mask);
            App.ticker.add(function runRayLight(delta) {
                mask.beginFill(0x555555);
                mask.drawRect(App.screen.width - (container.width + 80), 0, container.width + 20, App.screen.height );
                mask.endFill();
                mask.y += 6 * delta;
                if (mask.y > 0) {
                    App.ticker.remove(runRayLight)
                }
            });
        }
        addRayLight();

        // function addShadowBox() {
        //     const sb = new PIXI.Sprite(resources.shadowBox.texture);
        //     sb.width = App.screen.width/1.82;
        //     sb.height = App.screen.height;
        //     sb.x = App.screen.width / 2.5;
        //     sb.alpha = 0;
        //     container.addChild(sb);
        //
        //     App.ticker.add(function(){
        //         sb.alpha += 0.01;
        //     })
        // }
        // addShadowBox();



        return container;
    }

    App.stage.addChild(addBackground());
    App.stage.addChild(addLeftContent());
    App.stage.addChild(addRightContent());


}



PIXI.loader
    .add('background', './asset/blog/img/blog-detail.png')
    .add('hexlight', './asset/blog/img/hexlight.png')
    .add('google','./asset/blog/img/btn_google.png')
    .add('facebook','./asset/blog/img/btn_facebook.png')
    .add('linkin','./asset/blog/img/btn_in.png')
    .add('youtube','./asset/blog/img/btn_yt.png')
    .add('twitter','./asset/blog/img/btn_twitter.png')
    .add('raylight','./asset/blog/img/ray_light.png')
    .add('shadowBox','./asset/blog/img/shadowBox.png')
    .load(onLoadComplete);