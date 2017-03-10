var canvas = document.getElementById("cas");
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
var img = new Image(),
    boomDom = document.getElementById("booms"),
    missleDom = document.getElementById("missle"),
    gS = document.getElementById("gameStart"),
    gss = document.getElementById("gs-start");
window.RAF = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) { windows.setTimeout(callback, 1000 / 60); };
})();
Array.prototype.foreach = function(callback) {
    for (var i = 0; i < this.length; i++) {
        callback.apply(this[i], [i]);
    }
}
var sprites = [],
    missles = [],
    booms = [],
    badPlanNum = 30,
    point = 0,
    myplan = null,
    eatfood = null,
    foodDate = null,
    dieNum = 0;

function boom(plan) {
    for (var j = 0; j < booms.length; j++) {
        if (!booms[j].visible) {
            booms[j].left = plan.left;
            booms[j].top = plan.top;
            booms[j].visible = true;
            var audio = document.getElementsByTagName("audio");
            for (var i = 0; i < audio.length; i++) {
                if (audio[i].src.indexOf("boom") >= 0 && (audio[i].paused || audio[i].ended)) {
                    audio[i].play();
                    break;
                }
            }
            break;
        }
    }
}
var stage = {
    init: function() {
        var _this = this;
        this.loading = new Loading(datas, canvas, function() {
            gS.style.display = "block";
            canvas.className = "showBg";
            document.getElementById("bgm").play();
            gss.addEventListener("click", function() {
                gS.style.display = "none";
                _this.addElement();
            }, false)
        });
    },
    addElement: function() {
        for (var i = 0; i < 50; i++) {
            var x = Math.random() * canvas.width;
            var y = Math.random() * 2 * canvas.height - canvas.height;
            var star = new Sprite("star", starPainter, starBehavior);
            star.top = y;
            star.left = x;
            sprites.push(star);
        }
        for (var i = 0; i < badPlanNum; i++) {
            var x = Math.random() * (canvas.width - 2 * planSize().w) + planSize().w;
            var y = Math.random() * canvas.height - canvas.height;
            var badPlan = new Sprite("badPlan", badPlanPainter, badPlanBehavior);
            badPlan.top = y;
            badPlan.left = x;
            sprites.push(badPlan);
        }
        for (var i = 0; i < 400; i++) {
            var missle = new Sprite("missle", misslePainter, missleBehavior);
            missle.visible = false;
            missles.push(missle);
        }
        for (var i = 0; i < badPlanNum; i++) {
            var img = new Image();
            img.src = "/picture/explosion.png";
            var boom = new Sprite("boom", new SpriteSheetPainter(explosionCells, false, function() {
                this.visible = false;
            }, img));
            boom.visible = false;
            booms.push(boom);
        }
        eatfood = new Sprite("food", foodPainter, foodBehavior);
        eatfood.left = Math.random() * canvas.width - 30;
        eatfood.top = -30;
        eatfood.visible = false;
        sprites.push(eatfood);
        img.src = "/picture/ship.png";
        myplan = new Sprite("plan", new controllSpriteSheetPainter(planCells, img), planBehavior);
        myplan.left = canvas.width / 2;
        myplan.top = canvas.height - (planSize().h / 2 + 10);
        sprites.push(myplan);
    },
    myplanReborn: function(myplan) {
        setTimeout(function() {
            myplan.visible = true;
            myplan.left = canvas.width / 2;
            myplan.top = canvas.height - (planSize().h / 2 + 10);
            myplan.rotateAngle = 0;
            myplan.god = true;
            setTimeout(function() {
                myplan.god = false;
            }, 5000)
        }, 1000)
    },
    update: function() {
        var stage = this;
        var boomnum = 0,
            misslenum = 0;
        this.loading.loop();
        if (this.loading.getComplete()) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        missles.foreach(function() {
            var missle = this;
            sprites.foreach(function() {
                var bp = this;
                if (bp.name === "badPlan" && bp.visible && missle.visible) {
                    var juli = Math.sqrt(Math.pow(missle.left - bp.left, 2) + Math.pow(missle.top - bp.top, 2));
                    if (juli < (planSize().w / 2 + missle.width / 2) && missle.isgood) {
                        missle.visible = false;
                        bp.blood -= 50;
                        if (bp.blood <= 0) {
                            bp.visible = false;
                            point += bp.badKind;
                            boom(bp);
                        }
                    }
                }
            });
            if (missle.visible) {
                if (!missle.isgood && myplan.visible && !myplan.god) {
                    var juli = Math.sqrt(Math.pow(missle.left - myplan.left, 2) + Math.pow(missle.top - myplan.top, 2));
                    if (juli < (planSize().w / 2 + 3)) {
                        myplan.visible = false;
                        dieNum++;
                        missle.visible = false;
                        boom(myplan);
                        stage.myplanReborn(myplan);
                    }
                }
                misslenum++;
                this.paint();
            }
        });
        booms.foreach(function() {
            if (this.visible) {
                boomnum++;
                this.paint();
            }
        })
        sprites.foreach(function() {
            if (this.name === "food" && this.visible) {
                var tjuli = Math.sqrt(Math.pow(this.left - myplan.left, 2) + Math.pow(this.top - myplan.top, 2));
                if (tjuli < (myplan.width / 2 + this.width / 2)) {
                    this.visible = false;
                    switch (this.kind) {
                        case "LevelUP":
                            myplan.fireLevel = myplan.fireLevel >= 4 ? myplan.fireLevel : myplan.fireLevel + 1;
                            break;
                        case "SpeedUP":
                            myplan.firePerFrame = myplan.firePerFrame <= 10 ? 10 : myplan.firePerFrame - 10;
                            break;
                        case "God":
                            {
                                myplan.god = true;
                                setTimeout(function() {
                                    myplan.god = false;
                                }, 5000);
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
            if (this.name === "badPlan" && myplan.visible && !myplan.god) {
                var juli = Math.sqrt(Math.pow(this.left - myplan.left, 2) + Math.pow(this.top - myplan.top, 2));
                if (juli < planSize().w) {
                    myplan.visible = false;
                    dieNum++;
                    this.visible = false;
                    boom(this);
                    boom(myplan);
                    stage.myplanReborn(myplan);
                }
            }
            this.paint();
        });
        if (myplan) {
            ctx.fillStyle = "#FFF";
            ctx.font = "18px 微软雅黑";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText("level:" + (myplan.fireLevel === 4 ? "Max" : myplan.fireLevel) + "        Speed:" + ((80 - myplan.firePerFrame) === 70 ? "Max" : (80 - myplan.firePerFrame)), 0, canvas.height - 18);
            ctx.fillText("Points:" + point + "   死亡次数:" + dieNum, 0, 18);
            ctx.textAlign = "right";
            ctx.fillText("Tips:按方向键移动，按“Z”“C”建旋转战机", canvas.width - 10, 18);
            if (foodDate === null) {
                foodDate = new Date();
            } else {
                var nowFoodDate = new Date();
                if (nowFoodDate - foodDate > 1000) {
                    var creatFood = Math.random() < 0.5 ? true : false;
                    if (creatFood && !eatfood.visible) {
                        eatfood.left = Math.random() * canvas.width - 30;
                        eatfood.top = -30;
                        eatfood.kind = Math.random() > 0.7 ? "LevelUP" : (Math.random() > 0.5 ? "SpeedUP" : "God");
                        eatfood.visible = true;
                    }
                    foodDate = nowFoodDate;
                }
            }
        }
        boomDom.innerHTML = "爆炸使用率(已使用/储存总量：)" + boomnum + "/" + booms.length;
        missleDom.innerHTML = "子弹使用率(已使用/储存总量：)" + misslenum + "/" + missles.length;
    },
    loop: function() {
        var _this = this;
        this.update();
        RAF(function() {
            _this.loop();
        });
    },
    start: function() {
        this.init();
        this.loop();
    }
}
stage.start();