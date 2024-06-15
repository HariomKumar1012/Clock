const canvas = document.getElementById("myCanvas");
            const ctx = canvas.getContext("2d");
            let radius = canvas.height / 2;
            ctx.translate(radius,radius);
            radius = radius * 0.8;
            setInterval(drawClock, 1000);

            function drawClock()
            {
                drawFace(ctx, radius);
                drawNumber(ctx, radius);
                drawTime(ctx, radius);
            }

            function drawFace(ctx, radius)
            {
                const grad = ctx.createRadialGradient(0,0,radius*0.95,0,0,radius*1.05);
                grad.addColorStop(0,'darkgray');
                grad.addColorStop(0.5,'white');
                grad.addColorStop(1,'darkgray');
                ctx.beginPath();
                ctx.arc(0,0,radius,0,2*Math.PI);
                ctx.fillStyle = 'rgb(224, 138, 57)';
                ctx.fill();
                ctx.strokeStyle = grad;
                ctx.lineWidth = radius*0.1;
            
                ctx.stroke();

                //Creating the center of the clock
                ctx.beginPath();
                ctx.arc(0,0,radius*0.05,0,2*Math.PI);
                ctx.fillStyle = 'white';
                ctx.fill();
            }

            function drawNumber(ctx,radius)
            {
                ctx.font = radius*0.15 + "px arial";
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                for(let i=1;i<=12;i++)
                {
                    let angle = i * Math.PI / 6;
                    ctx.rotate(angle);
                    ctx.translate(0, -radius*0.85);
                    ctx.rotate(-angle);
                    ctx.fillText(i.toString(),0,0);
                    ctx.rotate(angle);
                    ctx.translate(0, radius*0.85);
                    ctx.rotate(-angle);
                }
            }

            function drawTime(ctx,radius)
            {
                const now = new Date();
                let hour = now.getHours();
                let minute = now.getMinutes();
                let second = now.getSeconds();

                hour = hour%12;
                //Angle covered by hours hand
                hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
                drawHand(ctx, hour, radius*0.5, radius*0.05);

                //Angle covered by minutes hand
                minute = minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
                drawHand(ctx, minute, radius*0.7, radius*0.05);

                //Angle covered by seconds hand
                second = (second*Math.PI/30);
                drawHand(ctx, second, radius*0.8, radius*0.02);
            }

            function drawHand(ctx, angle, length, width)
            {
                ctx.beginPath();
                ctx.lineWidth = width;
                ctx.lineCap = "round";
                ctx.moveTo(0,0);
                ctx.rotate(angle);
                ctx.lineTo(0,-length);
                ctx.stroke();
                ctx.rotate(-angle);
            }0