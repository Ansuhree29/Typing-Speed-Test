const paragraphs = [
    "The vibrant cityscape buzzed with life as the sun dipped below the skyline, casting a fiery orange glow across the horizon. People hurried along the sidewalks, their laughter mingling with the distant honking of cars. Each corner held a story, a blend of cultures interwoven into the tapestry of the urban landscape. The aroma of street food tantalized taste buds, promising a culinary adventure at every turn",
    "As the waves crashed against the shore, the rhythmic melody of the sea echoed tranquility. Seagulls soared overhead, their cries carried by the salty breeze. The sand, a canvas for footprints, bore witness to the playful dance of children and the leisurely strolls of couples hand in hand. Shells and pebbles decorated the shoreline, tiny treasures waiting to be discovered by curious beachcombers",
    "In the heart of the forest, ancient trees stood tall, their branches reaching towards the heavens. The air was thick with the scent of earth and foliage, and a symphony of rustling leaves and chirping birds filled the canopy. Sunlight filtered through the dense foliage, dappling the forest floor with patches of light. Nature's quiet whispers seemed to hold secrets of a world untouched by time",
    "High in the mountains, where the air was crisp and thin, a sense of awe enveloped the surroundings. Majestic peaks stretched towards infinity, their snow-capped tips glistening in the sunlight. Rivers snaked through valleys, carving paths that spoke of resilience and determination. Here, amidst the rugged terrain, one could feel both insignificant and deeply connected to the grandeur of nature",
    "Amidst the bustle of a bustling marketplace, vendors displayed their wares with fervor. Colors clashed and melded in a kaleidoscope of goods—spices, textiles, and trinkets from distant lands. Bargaining voices rose and fell, creating a symphony of haggling while the aroma of exotic spices intermingled with the cacophony of sounds, painting an unforgettable sensory experience",
    "The library stood as a sanctuary of knowledge, its shelves lined with books that whispered tales of centuries past. The musty scent of old paper lingered in the air, inviting readers to delve into worlds unknown. Sunlight filtered through stained glass windows, casting a spectrum of colors upon the quiet study tables. In this haven of learning, silence held a profound reverence for the wisdom contained within the pages",
    "The city at night transformed into a canvas of neon lights and electric energy. Skyscrapers soared into the sky, their facades illuminated in a mesmerizing display of modernity. Streets came alive with the pulse of nightlife, music spilling out from clubs and bars, inviting revelers to join the celebration of urban existence. The city skyline, a constellation of architectural marvels, told stories of ambition and progress against the backdrop of a starry night",
    "Deep in the countryside, where fields stretched to meet the horizon, a quiet serenity enveloped the landscape. Rolling hills swayed with the breeze, a sea of golden crops dancing in unison. Farmhouses dotted the scenery, their quaint charm a testament to simpler living. The symphony of chirping crickets and distant cattle lowing painted a portrait of rustic tranquility untouched by the chaos of the world beyond",
    "On the edge of a cliff, overlooking an endless expanse of ocean, a solitary figure stood, lost in contemplation. The crashing waves below echoed the constant rhythm of life, while seagulls glided effortlessly on the sea breeze. The salty air carried a sense of freedom, a reminder that amidst life's uncertainties, nature's constancy provided solace and perspective",
    "Within the confines of a bustling kitchen, chefs orchestrated a culinary ballet. A symphony of sizzling pans and chopping knives created a harmony that resonated with passion and precision. Aromas intertwined, creating a medley that promised an exquisite dining experience. Amidst the organized chaos, culinary mastery unfolded, turning raw ingredients into works of art that delighted both palate and soul",
    "The library stood as a sanctuary of knowledge, its shelves lined with books that whispered tales of centuries past. The musty scent of old paper lingered in the air, inviting readers to delve into worlds unknown. Sunlight filtered through stained glass windows, casting a spectrum of colors upon the quiet study tables. In this haven of learning, silence held a profound reverence for the wisdom contained within the pages",
    "The city at night transformed into a canvas of neon lights and electric energy. Skyscrapers soared into the sky, their facades illuminated in a mesmerizing display of modernity. Streets came alive with the pulse of nightlife, music spilling out from clubs and bars, inviting revelers to join the celebration of urban existence. The city skyline, a constellation of architectural marvels, told stories of ambition and progress against the backdrop of a starry night",
    "Deep in the countryside, where fields stretched to meet the horizon, a quiet serenity enveloped the landscape. Rolling hills swayed with the breeze, a sea of golden crops dancing in unison. Farmhouses dotted the scenery, their quaint charm a testament to simpler living. The symphony of chirping crickets and distant cattle lowing painted a portrait of rustic tranquility untouched by the chaos of the world beyond",
    "On the edge of a cliff, overlooking an endless expanse of ocean, a solitary figure stood, lost in contemplation. The crashing waves below echoed the constant rhythm of life, while seagulls glided effortlessly on the sea breeze. The salty air carried a sense of freedom, a reminder that amidst life's uncertainties, nature's constancy provided solace and perspective",
    "Within the confines of a bustling kitchen, chefs orchestrated a culinary ballet. A symphony of sizzling pans and chopping knives created a harmony that resonated with passion and precision. Aromas intertwined, creating a medley that promised an exquisite dining experience. Amidst the organized chaos, culinary mastery unfolded, turning raw ingredients into works of art that delighted both palate and soul"
  ];
  const typingText = document.querySelector(".typing-text p");
  const inpField = document.querySelector(".wrapper .input-field");
  const tryAgainBtn = document.querySelector(".content button");
  const timeTag = document.querySelector(".time span b");
  const mistakeTag = document.querySelector(".mistake span");
  const wpmTag = document.querySelector(".wpm span");
  const cpmTag = document.querySelector(".cpm span");
  
  let timer;
  let maxTime = 60;
  let timeLeft = maxTime;
  let charIndex = (mistakes = isTyping = 0);
  
  function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach((char) => {
      console.log(char);
      let span = <span>${char}</span>;
      typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
  }
  
  function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
      if (!isTyping) {
        timer = setInterval(initTimer, 1000);
        isTyping = true;
      }
      if (typedChar == null) {
        if (charIndex > 0) {
          charIndex--;
          if (characters[charIndex].classList.contains("incorrect")) {
            mistakes--;
          }
          characters[charIndex].classList.remove("correct", "incorrect");
        }
      } else {
        if (characters[charIndex].innerText == typedChar) {
          characters[charIndex].classList.add("correct");
        } else {
          mistakes++;
          characters[charIndex].classList.add("incorrect");
        }
        charIndex++;
      }
      characters.forEach((span) => span.classList.remove("active"));
      characters[charIndex].classList.add("active");
  
      let wpm = Math.round(
        ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
      );
      wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
  
      wpmTag.innerText = wpm;
      mistakeTag.innerText = mistakes;
      cpmTag.innerText = charIndex - mistakes;
    } else {
      clearInterval(timer);
      inpField.value = "";
    }
  }
  
  function initTimer() {
    if (timeLeft > 0) {
      timeLeft--;
      timeTag.innerText = timeLeft;
      let wpm = Math.round(
        ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
      );
      wpmTag.innerText = wpm;
    } else {
      clearInterval(timer);
    }
  }
  
  function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
  }
  
  loadParagraph();
  inpField.addEventListener("input", initTyping);
  tryAgainBtn.addEventListener("click", resetGame);