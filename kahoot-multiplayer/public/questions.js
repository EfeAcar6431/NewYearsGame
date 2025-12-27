// Questions Database
const questions = {
  general: [
    {
      q: "What is the largest planet in our solar system?",
      answers: ["Jupiter", "Saturn", "Neptune", "Mars"],
      correct: 0,
    },
    {
      q: "How many continents are there on Earth?",
      answers: ["5", "6", "7", "8"],
      correct: 2,
    },
    {
      q: "What is the chemical symbol for gold?",
      answers: ["Go", "Au", "Ag", "Gd"],
      correct: 1,
    },
    {
      q: "Which animal is known as the 'King of the Jungle'?",
      answers: ["Tiger", "Elephant", "Lion", "Gorilla"],
      correct: 2,
    },
    {
      q: "What is the smallest country in the world?",
      answers: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
      correct: 1,
    },
    {
      q: "How many bones are in the adult human body?",
      answers: ["186", "206", "226", "246"],
      correct: 1,
    },
    {
      q: "What is the hardest natural substance on Earth?",
      answers: ["Gold", "Iron", "Diamond", "Platinum"],
      correct: 2,
    },
    {
      q: "Which planet is known as the Red Planet?",
      answers: ["Venus", "Mars", "Jupiter", "Mercury"],
      correct: 1,
    },
    {
      q: "What is the largest ocean on Earth?",
      answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
      correct: 3,
    },
    {
      q: "How many colors are in a rainbow?",
      answers: ["5", "6", "7", "8"],
      correct: 2,
    },
    {
      q: "What is the capital of Japan?",
      answers: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
      correct: 2,
    },
    {
      q: "Which gas do plants absorb from the atmosphere?",
      answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      correct: 2,
    },
    {
      q: "What is the fastest land animal?",
      answers: ["Lion", "Cheetah", "Gazelle", "Horse"],
      correct: 1,
    },
    {
      q: "How many days are in a leap year?",
      answers: ["364", "365", "366", "367"],
      correct: 2,
    },
    {
      q: "What is the largest mammal in the world?",
      answers: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      correct: 1,
    },
    {
      q: "Which element has the chemical symbol 'O'?",
      answers: ["Gold", "Osmium", "Oxygen", "Oganesson"],
      correct: 2,
    },
    {
      q: "What is the main ingredient in guacamole?",
      answers: ["Tomato", "Onion", "Avocado", "Lime"],
      correct: 2,
    },
    {
      q: "How many strings does a standard guitar have?",
      answers: ["4", "5", "6", "7"],
      correct: 2,
    },
    {
      q: "What is the largest desert in the world?",
      answers: ["Sahara", "Arabian", "Gobi", "Antarctic"],
      correct: 3,
    },
    {
      q: "Which country invented pizza?",
      answers: ["France", "Spain", "Italy", "Greece"],
      correct: 2,
    },
  ],
  movies: [
    {
      q: "Who directed 'Titanic' and 'Avatar'?",
      answers: [
        "Steven Spielberg",
        "James Cameron",
        "Christopher Nolan",
        "Ridley Scott",
      ],
      correct: 1,
    },
    {
      q: "What is the highest-grossing film of all time?",
      answers: ["Avengers: Endgame", "Avatar", "Titanic", "Star Wars"],
      correct: 1,
    },
    {
      q: "Which actor played Jack in 'Titanic'?",
      answers: ["Brad Pitt", "Tom Cruise", "Leonardo DiCaprio", "Johnny Depp"],
      correct: 2,
    },
    {
      q: "In which movie does the quote 'I'll be back' originate?",
      answers: ["Terminator", "Predator", "Total Recall", "Commando"],
      correct: 0,
    },
    {
      q: "What is the name of the wizarding school in Harry Potter?",
      answers: ["Durmstrang", "Beauxbatons", "Hogwarts", "Ilvermorny"],
      correct: 2,
    },
    {
      q: "Who played Iron Man in the Marvel Cinematic Universe?",
      answers: [
        "Chris Evans",
        "Chris Hemsworth",
        "Robert Downey Jr.",
        "Mark Ruffalo",
      ],
      correct: 2,
    },
    {
      q: "What year was the first 'Toy Story' released?",
      answers: ["1993", "1995", "1997", "1999"],
      correct: 1,
    },
    {
      q: "Which film features the song 'Let It Go'?",
      answers: ["Tangled", "Moana", "Frozen", "Brave"],
      correct: 2,
    },
    {
      q: "Who directed 'The Dark Knight'?",
      answers: [
        "Zack Snyder",
        "Christopher Nolan",
        "Tim Burton",
        "Matt Reeves",
      ],
      correct: 1,
    },
    {
      q: "What is the name of Batman's butler?",
      answers: ["Alfred", "Jarvis", "Geoffrey", "Winston"],
      correct: 0,
    },
    {
      q: "In 'The Lion King', what is Simba's father's name?",
      answers: ["Scar", "Mufasa", "Rafiki", "Zazu"],
      correct: 1,
    },
    {
      q: "Which movie features a character named 'Forrest Gump'?",
      answers: ["Cast Away", "The Green Mile", "Forrest Gump", "Big"],
      correct: 2,
    },
    {
      q: "What color is Shrek?",
      answers: ["Blue", "Red", "Green", "Purple"],
      correct: 2,
    },
    {
      q: "Who plays Captain Jack Sparrow?",
      answers: ["Orlando Bloom", "Johnny Depp", "Jude Law", "Colin Farrell"],
      correct: 1,
    },
    {
      q: "What is the name of the kingdom in 'Frozen'?",
      answers: ["Arendelle", "Corona", "Agrabah", "Atlantica"],
      correct: 0,
    },
    {
      q: "Which 'Avengers' movie features Thanos collecting all Infinity Stones?",
      answers: ["Age of Ultron", "Infinity War", "Endgame", "Civil War"],
      correct: 1,
    },
    {
      q: "What animal is Pumba in 'The Lion King'?",
      answers: ["Meerkat", "Warthog", "Hyena", "Mandrill"],
      correct: 1,
    },
    {
      q: "Who directed 'Jurassic Park'?",
      answers: [
        "George Lucas",
        "James Cameron",
        "Steven Spielberg",
        "Peter Jackson",
      ],
      correct: 2,
    },
    {
      q: "What is the main character's name in 'Finding Nemo'?",
      answers: ["Dory", "Marlin", "Nemo", "Gill"],
      correct: 2,
    },
    {
      q: "In which year was 'The Matrix' released?",
      answers: ["1997", "1998", "1999", "2000"],
      correct: 2,
    },
  ],
  science: [
    {
      q: "What is the chemical formula for water?",
      answers: ["CO2", "H2O", "NaCl", "O2"],
      correct: 1,
    },
    {
      q: "What planet is closest to the Sun?",
      answers: ["Venus", "Earth", "Mercury", "Mars"],
      correct: 2,
    },
    {
      q: "What is the speed of light?",
      answers: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "200,000 km/s"],
      correct: 0,
    },
    {
      q: "What is the powerhouse of the cell?",
      answers: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Body"],
      correct: 2,
    },
    {
      q: "How many elements are in the periodic table?",
      answers: ["108", "112", "118", "126"],
      correct: 2,
    },
    {
      q: "What gas makes up most of Earth's atmosphere?",
      answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correct: 2,
    },
    {
      q: "What is the atomic number of Carbon?",
      answers: ["4", "6", "8", "12"],
      correct: 1,
    },
    {
      q: "What is the study of earthquakes called?",
      answers: ["Geology", "Seismology", "Volcanology", "Meteorology"],
      correct: 1,
    },
    {
      q: "What is the boiling point of water in Celsius?",
      answers: ["90°C", "100°C", "110°C", "120°C"],
      correct: 1,
    },
    {
      q: "What type of blood cells fight infection?",
      answers: ["Red blood cells", "White blood cells", "Platelets", "Plasma"],
      correct: 1,
    },
    {
      q: "What is the largest organ in the human body?",
      answers: ["Heart", "Liver", "Brain", "Skin"],
      correct: 3,
    },
    {
      q: "What planet has the most moons?",
      answers: ["Jupiter", "Saturn", "Uranus", "Neptune"],
      correct: 1,
    },
    {
      q: "What is the chemical symbol for Iron?",
      answers: ["Ir", "In", "Fe", "I"],
      correct: 2,
    },
    {
      q: "How long does light from the Sun take to reach Earth?",
      answers: ["4 minutes", "8 minutes", "12 minutes", "16 minutes"],
      correct: 1,
    },
    {
      q: "What is the study of fungi called?",
      answers: ["Botany", "Mycology", "Zoology", "Virology"],
      correct: 1,
    },
    {
      q: "What is absolute zero in Celsius?",
      answers: ["-173°C", "-273°C", "-373°C", "-473°C"],
      correct: 1,
    },
    {
      q: "What is the most abundant element in the universe?",
      answers: ["Oxygen", "Carbon", "Hydrogen", "Helium"],
      correct: 2,
    },
    {
      q: "How many chromosomes do humans have?",
      answers: ["23", "46", "48", "52"],
      correct: 1,
    },
    {
      q: "What is the SI unit of force?",
      answers: ["Joule", "Watt", "Newton", "Pascal"],
      correct: 2,
    },
    {
      q: "What type of rock is formed from cooled lava?",
      answers: ["Sedimentary", "Metamorphic", "Igneous", "Mineral"],
      correct: 2,
    },
  ],
  geography: [
    {
      q: "What is the capital of Australia?",
      answers: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correct: 2,
    },
    {
      q: "Which river is the longest in the world?",
      answers: ["Amazon", "Nile", "Mississippi", "Yangtze"],
      correct: 1,
    },
    {
      q: "What is the largest country by land area?",
      answers: ["China", "USA", "Canada", "Russia"],
      correct: 3,
    },
    {
      q: "Which country has the most islands?",
      answers: ["Indonesia", "Philippines", "Sweden", "Japan"],
      correct: 2,
    },
    {
      q: "What is the deepest ocean trench?",
      answers: [
        "Java Trench",
        "Puerto Rico Trench",
        "Mariana Trench",
        "Tonga Trench",
      ],
      correct: 2,
    },
    {
      q: "Which African country was formerly known as Abyssinia?",
      answers: ["Egypt", "Ethiopia", "Kenya", "Sudan"],
      correct: 1,
    },
    {
      q: "What is the smallest US state by area?",
      answers: ["Delaware", "Connecticut", "Rhode Island", "Vermont"],
      correct: 2,
    },
    {
      q: "Mount Everest is located in which mountain range?",
      answers: ["Alps", "Andes", "Rockies", "Himalayas"],
      correct: 3,
    },
    {
      q: "What is the capital of Canada?",
      answers: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
      correct: 3,
    },
    {
      q: "Which country is known as the Land of the Rising Sun?",
      answers: ["China", "Korea", "Japan", "Thailand"],
      correct: 2,
    },
    {
      q: "What is the longest river in Europe?",
      answers: ["Danube", "Rhine", "Volga", "Seine"],
      correct: 2,
    },
    {
      q: "Which desert is the largest hot desert in the world?",
      answers: ["Arabian", "Gobi", "Kalahari", "Sahara"],
      correct: 3,
    },
    {
      q: "What is the capital of Brazil?",
      answers: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
      correct: 2,
    },
    {
      q: "Which country has the longest coastline?",
      answers: ["Russia", "Australia", "Indonesia", "Canada"],
      correct: 3,
    },
    {
      q: "What is the highest waterfall in the world?",
      answers: [
        "Niagara Falls",
        "Victoria Falls",
        "Angel Falls",
        "Iguazu Falls",
      ],
      correct: 2,
    },
    {
      q: "Which European country is shaped like a boot?",
      answers: ["Spain", "Greece", "Italy", "Portugal"],
      correct: 2,
    },
    {
      q: "What is the capital of Egypt?",
      answers: ["Alexandria", "Giza", "Cairo", "Luxor"],
      correct: 2,
    },
    {
      q: "Which ocean is the saltiest?",
      answers: ["Pacific", "Atlantic", "Indian", "Arctic"],
      correct: 1,
    },
    {
      q: "What is the largest lake in Africa?",
      answers: ["Lake Tanganyika", "Lake Malawi", "Lake Victoria", "Lake Chad"],
      correct: 2,
    },
    {
      q: "Which country is home to the Great Barrier Reef?",
      answers: ["New Zealand", "Indonesia", "Australia", "Philippines"],
      correct: 2,
    },
  ],
  sports: [
    {
      q: "How many players are on a soccer team?",
      answers: ["9", "10", "11", "12"],
      correct: 2,
    },
    {
      q: "Which country won the 2018 FIFA World Cup?",
      answers: ["Brazil", "Germany", "France", "Argentina"],
      correct: 2,
    },
    {
      q: "How many rings are on the Olympic flag?",
      answers: ["4", "5", "6", "7"],
      correct: 1,
    },
    {
      q: "In which sport would you perform a slam dunk?",
      answers: ["Volleyball", "Basketball", "Tennis", "Baseball"],
      correct: 1,
    },
    {
      q: "What is the national sport of Japan?",
      answers: ["Karate", "Judo", "Sumo", "Kendo"],
      correct: 2,
    },
    {
      q: "How many points is a touchdown worth in American football?",
      answers: ["4", "5", "6", "7"],
      correct: 2,
    },
    {
      q: "Which tennis tournament is played on grass?",
      answers: ["US Open", "French Open", "Australian Open", "Wimbledon"],
      correct: 3,
    },
    {
      q: "In golf, what is one under par called?",
      answers: ["Eagle", "Birdie", "Bogey", "Albatross"],
      correct: 1,
    },
    {
      q: "How long is an Olympic swimming pool?",
      answers: ["25 meters", "50 meters", "75 meters", "100 meters"],
      correct: 1,
    },
    {
      q: "Which country invented cricket?",
      answers: ["Australia", "India", "England", "South Africa"],
      correct: 2,
    },
    {
      q: "How many holes are on a standard golf course?",
      answers: ["9", "14", "18", "21"],
      correct: 2,
    },
    {
      q: "What sport is known as 'the beautiful game'?",
      answers: ["Basketball", "Soccer", "Tennis", "Golf"],
      correct: 1,
    },
    {
      q: "In which city were the first modern Olympics held?",
      answers: ["Paris", "London", "Athens", "Rome"],
      correct: 2,
    },
    {
      q: "How many sets do men play in a Grand Slam tennis final?",
      answers: ["3", "4", "5", "6"],
      correct: 2,
    },
    {
      q: "What is the diameter of a basketball hoop in inches?",
      answers: ["16", "18", "20", "22"],
      correct: 1,
    },
    {
      q: "Which sport uses a shuttlecock?",
      answers: ["Tennis", "Squash", "Badminton", "Racquetball"],
      correct: 2,
    },
    {
      q: "How many players are on a baseball team on the field?",
      answers: ["8", "9", "10", "11"],
      correct: 1,
    },
    {
      q: "What is the maximum break in snooker?",
      answers: ["137", "147", "155", "167"],
      correct: 1,
    },
    {
      q: "Which country has won the most Olympic gold medals?",
      answers: ["China", "Russia", "USA", "Great Britain"],
      correct: 2,
    },
    {
      q: "In what sport would you find a pommel horse?",
      answers: ["Wrestling", "Gymnastics", "Equestrian", "Boxing"],
      correct: 1,
    },
  ],
  music: [
    {
      q: "Which band performed 'Bohemian Rhapsody'?",
      answers: ["The Beatles", "Led Zeppelin", "Queen", "Pink Floyd"],
      correct: 2,
    },
    {
      q: "What instrument has 88 keys?",
      answers: ["Guitar", "Violin", "Piano", "Organ"],
      correct: 2,
    },
    {
      q: "Who is known as the 'King of Pop'?",
      answers: [
        "Elvis Presley",
        "Michael Jackson",
        "Prince",
        "Freddie Mercury",
      ],
      correct: 1,
    },
    {
      q: "Which country does K-Pop originate from?",
      answers: ["Japan", "China", "South Korea", "Taiwan"],
      correct: 2,
    },
    {
      q: "How many strings does a standard violin have?",
      answers: ["3", "4", "5", "6"],
      correct: 1,
    },
    {
      q: "Which singer's real name is Stefani Joanne Angelina Germanotta?",
      answers: ["Beyoncé", "Lady Gaga", "Rihanna", "Katy Perry"],
      correct: 1,
    },
    {
      q: "What is the name of Taylor Swift's first album?",
      answers: ["Fearless", "Taylor Swift", "Speak Now", "Red"],
      correct: 1,
    },
    {
      q: "Which instrument is Yo-Yo Ma famous for playing?",
      answers: ["Violin", "Piano", "Cello", "Flute"],
      correct: 2,
    },
    {
      q: "What band was Freddie Mercury the lead singer of?",
      answers: ["The Rolling Stones", "Queen", "Aerosmith", "Kiss"],
      correct: 1,
    },
    {
      q: "Which female artist sang 'Hello' in 2015?",
      answers: ["Adele", "Taylor Swift", "Beyoncé", "Rihanna"],
      correct: 0,
    },
    {
      q: "What is the highest male singing voice?",
      answers: ["Bass", "Baritone", "Tenor", "Countertenor"],
      correct: 3,
    },
    {
      q: "Which band performed 'Stairway to Heaven'?",
      answers: ["Pink Floyd", "The Who", "Led Zeppelin", "Deep Purple"],
      correct: 2,
    },
    {
      q: "How many members were in the Spice Girls?",
      answers: ["4", "5", "6", "7"],
      correct: 1,
    },
    {
      q: "What genre of music did Bob Marley primarily perform?",
      answers: ["Jazz", "Reggae", "Blues", "Soul"],
      correct: 1,
    },
    {
      q: "Which classical composer was deaf?",
      answers: ["Mozart", "Bach", "Beethoven", "Chopin"],
      correct: 2,
    },
    {
      q: "What is the name of BTS's fan army?",
      answers: ["Blinks", "Army", "Once", "Exo-L"],
      correct: 1,
    },
    {
      q: "Which instrument does a DJ typically use?",
      answers: ["Guitar", "Drums", "Turntables", "Keyboard"],
      correct: 2,
    },
    {
      q: "Who sang 'Shape of You'?",
      answers: ["Justin Bieber", "Ed Sheeran", "Bruno Mars", "The Weeknd"],
      correct: 1,
    },
    {
      q: "What year did The Beatles break up?",
      answers: ["1968", "1970", "1972", "1974"],
      correct: 1,
    },
    {
      q: "Which instrument is bigger: viola or violin?",
      answers: ["Viola", "Violin", "Same size", "Depends on type"],
      correct: 0,
    },
  ],
  history: [
    {
      q: "In which year did World War II end?",
      answers: ["1943", "1944", "1945", "1946"],
      correct: 2,
    },
    {
      q: "Who was the first President of the United States?",
      answers: [
        "Thomas Jefferson",
        "John Adams",
        "George Washington",
        "Benjamin Franklin",
      ],
      correct: 2,
    },
    {
      q: "Which ancient wonder was located in Egypt?",
      answers: [
        "Colossus of Rhodes",
        "Hanging Gardens",
        "Great Pyramid",
        "Lighthouse of Alexandria",
      ],
      correct: 2,
    },
    {
      q: "What year did the Titanic sink?",
      answers: ["1910", "1912", "1914", "1916"],
      correct: 1,
    },
    {
      q: "Who painted the Mona Lisa?",
      answers: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Donatello"],
      correct: 2,
    },
    {
      q: "Which empire built the Colosseum?",
      answers: ["Greek", "Roman", "Persian", "Ottoman"],
      correct: 1,
    },
    {
      q: "What was the name of the ship on which the Pilgrims sailed to America?",
      answers: ["Santa Maria", "Mayflower", "Endeavour", "Victoria"],
      correct: 1,
    },
    {
      q: "Who discovered America in 1492?",
      answers: [
        "Amerigo Vespucci",
        "Christopher Columbus",
        "Leif Erikson",
        "Ferdinand Magellan",
      ],
      correct: 1,
    },
    {
      q: "In which year did the Berlin Wall fall?",
      answers: ["1987", "1988", "1989", "1990"],
      correct: 2,
    },
    {
      q: "Who was the first woman to fly solo across the Atlantic?",
      answers: [
        "Bessie Coleman",
        "Amelia Earhart",
        "Harriet Quimby",
        "Jacqueline Cochran",
      ],
      correct: 1,
    },
    {
      q: "Which civilization built Machu Picchu?",
      answers: ["Aztec", "Maya", "Inca", "Olmec"],
      correct: 2,
    },
    {
      q: "What year did the French Revolution begin?",
      answers: ["1776", "1789", "1799", "1804"],
      correct: 1,
    },
    {
      q: "Who was the first man to walk on the moon?",
      answers: [
        "Buzz Aldrin",
        "Neil Armstrong",
        "Michael Collins",
        "Yuri Gagarin",
      ],
      correct: 1,
    },
    {
      q: "Which queen ruled England for 63 years until 1901?",
      answers: ["Elizabeth I", "Victoria", "Anne", "Mary"],
      correct: 1,
    },
    {
      q: "What was the name of the atomic bomb dropped on Hiroshima?",
      answers: ["Fat Man", "Little Boy", "Trinity", "Gadget"],
      correct: 1,
    },
    {
      q: "Which country was ruled by Shoguns?",
      answers: ["China", "Korea", "Japan", "Vietnam"],
      correct: 2,
    },
    {
      q: "In what year did the American Civil War begin?",
      answers: ["1859", "1861", "1863", "1865"],
      correct: 1,
    },
    {
      q: "Who wrote the 'I Have a Dream' speech?",
      answers: [
        "Malcolm X",
        "Martin Luther King Jr.",
        "Rosa Parks",
        "John Lewis",
      ],
      correct: 1,
    },
    {
      q: "What ancient city was buried by Mount Vesuvius?",
      answers: ["Rome", "Athens", "Pompeii", "Carthage"],
      correct: 2,
    },
    {
      q: "Which war was fought between the North and South in America?",
      answers: [
        "Revolutionary War",
        "War of 1812",
        "Civil War",
        "Spanish-American War",
      ],
      correct: 2,
    },
  ],
  gaming: [
    {
      q: "What is the best-selling video game of all time?",
      answers: ["Tetris", "Minecraft", "GTA V", "Wii Sports"],
      correct: 1,
    },
    {
      q: "In which game would you find characters like Mario and Luigi?",
      answers: ["Sonic", "Super Mario Bros", "Zelda", "Donkey Kong"],
      correct: 1,
    },
    {
      q: "What is the name of the main character in 'The Legend of Zelda'?",
      answers: ["Zelda", "Link", "Ganondorf", "Epona"],
      correct: 1,
    },
    {
      q: "Which company created Pokémon?",
      answers: ["Sony", "Microsoft", "Nintendo", "Sega"],
      correct: 2,
    },
    {
      q: "In Fortnite, what is the name of the in-game currency?",
      answers: ["Robux", "V-Bucks", "Gold", "Gems"],
      correct: 1,
    },
    {
      q: "What year was the original PlayStation released?",
      answers: ["1992", "1994", "1996", "1998"],
      correct: 1,
    },
    {
      q: "Which game features a battle royale on an island?",
      answers: ["Call of Duty", "Fortnite", "Halo", "Destiny"],
      correct: 1,
    },
    {
      q: "What is the name of the bird in Angry Birds?",
      answers: ["Red", "Angry", "Chuck", "Bird"],
      correct: 0,
    },
    {
      q: "In Minecraft, what do you need to defeat the Ender Dragon?",
      answers: [
        "Diamond Sword",
        "Eyes of Ender",
        "Enchanted Bow",
        "All of the above",
      ],
      correct: 3,
    },
    {
      q: "Which game features a character named Master Chief?",
      answers: ["Destiny", "Gears of War", "Halo", "Call of Duty"],
      correct: 2,
    },
    {
      q: "What color is Pac-Man?",
      answers: ["Red", "Blue", "Yellow", "Green"],
      correct: 2,
    },
    {
      q: "In Among Us, what is the maximum number of impostors?",
      answers: ["1", "2", "3", "4"],
      correct: 2,
    },
    {
      q: "Which company makes the Xbox?",
      answers: ["Sony", "Nintendo", "Microsoft", "Sega"],
      correct: 2,
    },
    {
      q: "What is the main character's name in God of War (2018)?",
      answers: ["Zeus", "Ares", "Kratos", "Hercules"],
      correct: 2,
    },
    {
      q: "In which game do you catch creatures in Poké Balls?",
      answers: ["Digimon", "Pokémon", "Monster Hunter", "Yo-Kai Watch"],
      correct: 1,
    },
    {
      q: "What is the highest score possible in a single game of Pac-Man?",
      answers: ["1,000,000", "3,333,360", "5,000,000", "9,999,999"],
      correct: 1,
    },
    {
      q: "Which game features the character Lara Croft?",
      answers: ["Uncharted", "Tomb Raider", "Assassin's Creed", "Far Cry"],
      correct: 1,
    },
    {
      q: "What year was Roblox released?",
      answers: ["2004", "2006", "2008", "2010"],
      correct: 1,
    },
    {
      q: "In Super Smash Bros, which character says 'Falcon Punch'?",
      answers: ["Fox", "Captain Falcon", "Falco", "Ganondorf"],
      correct: 1,
    },
    {
      q: "What is the name of the ghost that chases Pac-Man?",
      answers: ["Blinky", "Spooky", "Ghosty", "Shadow"],
      correct: 0,
    },
  ],
  food: [
    {
      q: "What is the main ingredient in hummus?",
      answers: ["Lentils", "Black beans", "Chickpeas", "Kidney beans"],
      correct: 2,
    },
    {
      q: "Which country is the origin of sushi?",
      answers: ["China", "Korea", "Japan", "Thailand"],
      correct: 2,
    },
    {
      q: "What type of pasta is shaped like little ears?",
      answers: ["Penne", "Orecchiette", "Farfalle", "Rigatoni"],
      correct: 1,
    },
    {
      q: "What is the most expensive spice in the world by weight?",
      answers: ["Vanilla", "Cardamom", "Saffron", "Cinnamon"],
      correct: 2,
    },
    {
      q: "Which fruit is known as the 'king of fruits'?",
      answers: ["Mango", "Durian", "Jackfruit", "Pineapple"],
      correct: 1,
    },
    {
      q: "What is the main ingredient in traditional pesto?",
      answers: ["Parsley", "Basil", "Cilantro", "Mint"],
      correct: 1,
    },
    {
      q: "Which country invented croissants?",
      answers: ["France", "Austria", "Italy", "Belgium"],
      correct: 1,
    },
    {
      q: "What gives bread its rise?",
      answers: ["Baking soda", "Salt", "Yeast", "Sugar"],
      correct: 2,
    },
    {
      q: "What is the world's most popular fruit?",
      answers: ["Apple", "Banana", "Orange", "Mango"],
      correct: 1,
    },
    {
      q: "Which nut is used to make marzipan?",
      answers: ["Walnut", "Cashew", "Almond", "Pistachio"],
      correct: 2,
    },
    {
      q: "What type of food is Gorgonzola?",
      answers: ["Pasta", "Cheese", "Meat", "Bread"],
      correct: 1,
    },
    {
      q: "Which vitamin is abundant in oranges?",
      answers: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
      correct: 2,
    },
    {
      q: "What is the main ingredient in falafel?",
      answers: ["Meat", "Chickpeas", "Rice", "Wheat"],
      correct: 1,
    },
    {
      q: "Which country is famous for paella?",
      answers: ["Italy", "Portugal", "Spain", "Mexico"],
      correct: 2,
    },
    {
      q: "What does 'al dente' mean in cooking?",
      answers: ["Well done", "Raw", "Firm to the bite", "Soft"],
      correct: 2,
    },
    {
      q: "What is the hottest chili pepper in the world?",
      answers: ["Ghost Pepper", "Habanero", "Carolina Reaper", "Scotch Bonnet"],
      correct: 2,
    },
    {
      q: "Which cheese is traditionally used on pizza?",
      answers: ["Cheddar", "Gouda", "Mozzarella", "Parmesan"],
      correct: 2,
    },
    {
      q: "What is wasabi made from?",
      answers: ["Ginger", "Japanese horseradish", "Green onion", "Seaweed"],
      correct: 1,
    },
    {
      q: "Which country is the largest producer of coffee?",
      answers: ["Colombia", "Vietnam", "Brazil", "Ethiopia"],
      correct: 2,
    },
    {
      q: "What is the main ingredient in tofu?",
      answers: ["Rice", "Wheat", "Soybeans", "Corn"],
      correct: 2,
    },
  ],
};
