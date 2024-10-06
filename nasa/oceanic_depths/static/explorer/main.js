window.onload = function() {
    const canvas = document.getElementById('mapCanvas');
    const ctx = canvas.getContext('2d');
    const oceanSound = document.getElementById('oceanSound');
    const torch = document.getElementById('torch'); 

    let soundStarted = false;
    let currentCreature = null; 
    let creaturePosition = null; 

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function fillBackground() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    resizeCanvas();
    fillBackground();

    window.addEventListener('resize', function() {
        resizeCanvas();
        fillBackground();
        redrawCreature(); 
    });


    document.addEventListener('mousemove', function(e) {
        torch.style.left = e.pageX - 40 + 'px';
        torch.style.top = e.pageY - 40 + 'px';
    });

    canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
    
        fillBackground();
    
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, 100, 0, Math.PI * 2, false); 
        ctx.clip(); 
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        ctx.restore();
    
        if (currentCreature && creaturePosition) {
            redrawCreature(); 
        }
    });


    function redrawCreature() {
        if (currentCreature && creaturePosition) {
            const creatureImage = currentCreature.image;
            const radius = 50; 

            if (creatureImage.complete) {
                ctx.save(); 
                ctx.beginPath();
                ctx.arc(creaturePosition.x, creaturePosition.y, radius, 0, Math.PI * 2, false); // Define the circular path
                ctx.closePath();
                ctx.clip(); 

                ctx.drawImage(creatureImage, creaturePosition.x - radius, creaturePosition.y - radius, radius * 2, radius * 2);

                ctx.restore();
            }
        }
    }


    // Click event to reveal a random creature and start the sound
    canvas.addEventListener('click', function(e) {
        if (!soundStarted) {
            oceanSound.play(); // Start the sound on first click
            soundStarted = true;
        }

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        fillBackground();

        const creature = getRandomCreature();
        creaturePosition = { x: x, y: y }; 

        const creatureImage = new Image();
        creatureImage.src = creature.imgSrc;
        currentCreature = {
            imgSrc: creature.imgSrc,
            image: creatureImage 
        };

        creatureImage.onload = function() {
            redrawCreature();
        };

        showTooltip(e.pageX, e.pageY, creature.name, creature.description);
    });


    function showTooltip(x, y, name, description) {
        const tooltip = document.getElementById('tooltip');
        tooltip.style.left = (x + 60) + 'px'; 
        tooltip.style.top = y + 'px';
        tooltip.innerHTML = `<strong>${name}</strong><br>${description}`;
        tooltip.style.display = 'block';
    }

    function getRandomCreature() {
        const creatures = [
            {
                imgSrc: '/static/explorer/Sulfolobus-solfataricus.jpg',
                name: 'Sulfolobus solfataricus',
                description: 'A thermoacidophilic archaeon found in hot springs and volcanic environments.'
            },
            {
                imgSrc: '/static/explorer/Methanocaldococcus-jannaschii.jpg',
                name: 'Methanocaldococcus jannaschii',
                description: 'A methanogenic archaeon that produces methane from carbon dioxide and hydrogen.'
            },
            {
                imgSrc: '/static/explorer/Thermoproteus-tenax.jpg',
                name: 'Thermoproteus tenax',
                description: 'A hyperthermophilic archaeon that thrives in extreme heat.'
            },
            {
                imgSrc: '/static/explorer/Beggiatoa-spp.jpg',
                name: 'Beggiatoa spp',
                description: 'Filamentous bacteria that oxidize hydrogen sulfide in anoxic environments.'
            },
            {
                imgSrc: '/static/explorer/Deinococcus-radiodurans.jpg',
                name: 'Deinococcus radiodurans',
                description: 'Referred to as the "world\'s toughest bacterium" due to its ability to survive doses of radiation that would be lethal to most forms of life.'
            },
        ];

        const index = Math.floor(Math.random() * creatures.length);
        return creatures[index];
    }
};
