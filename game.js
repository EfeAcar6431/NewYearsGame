// Game State
let gameState = {
    players: [],
    impostorIndex: -1,
    currentCharacter: null,
    currentPlayerIndex: 0,
    votes: {},
    selectedCategory: null,
    mostVotedPlayer: null
};

// Character dataset cache
let characterDataset = [];
let categoriesLoaded = false;

// Available categories from CharacterCodex dataset
const MEDIA_TYPES = [
    { id: 'all', name: 'All Categories', icon: '🎲' },
    { id: 'Anime', name: 'Anime', icon: '🎌' },
    { id: 'Movies', name: 'Movies', icon: '🎬' },
    { id: 'TV Shows', name: 'TV Shows', icon: '📺' },
    { id: 'Video Games', name: 'Video Games', icon: '🎮' },
    { id: 'Comic Books', name: 'Comic Books', icon: '💥' },
    { id: 'Novels', name: 'Novels', icon: '📚' },
    { id: 'Manga', name: 'Manga', icon: '📖' },
    { id: 'Fairy Tales', name: 'Fairy Tales', icon: '🧚' },
    { id: 'Mythology', name: 'Mythology', icon: '⚡' },
    { id: 'Cartoons', name: 'Cartoons', icon: '🖍️' },
    { id: 'Webcomics', name: 'Webcomics', icon: '🌐' },
    { id: 'Plays', name: 'Plays', icon: '🎭' },
    { id: 'Musicals', name: 'Musicals', icon: '🎵' }
];

// Large fallback character list (used when API fails due to CORS on local files)
const fallbackCharacters = [
    // Movies (50+)
    { name: "Harry Potter", source: "Harry Potter", media_type: "Movies" },
    { name: "Hermione Granger", source: "Harry Potter", media_type: "Movies" },
    { name: "Ron Weasley", source: "Harry Potter", media_type: "Movies" },
    { name: "Dumbledore", source: "Harry Potter", media_type: "Movies" },
    { name: "Voldemort", source: "Harry Potter", media_type: "Movies" },
    { name: "Snape", source: "Harry Potter", media_type: "Movies" },
    { name: "Darth Vader", source: "Star Wars", media_type: "Movies" },
    { name: "Luke Skywalker", source: "Star Wars", media_type: "Movies" },
    { name: "Princess Leia", source: "Star Wars", media_type: "Movies" },
    { name: "Han Solo", source: "Star Wars", media_type: "Movies" },
    { name: "Yoda", source: "Star Wars", media_type: "Movies" },
    { name: "Obi-Wan Kenobi", source: "Star Wars", media_type: "Movies" },
    { name: "Chewbacca", source: "Star Wars", media_type: "Movies" },
    { name: "Kylo Ren", source: "Star Wars", media_type: "Movies" },
    { name: "Shrek", source: "Shrek", media_type: "Movies" },
    { name: "Donkey", source: "Shrek", media_type: "Movies" },
    { name: "Fiona", source: "Shrek", media_type: "Movies" },
    { name: "Elsa", source: "Frozen", media_type: "Movies" },
    { name: "Anna", source: "Frozen", media_type: "Movies" },
    { name: "Olaf", source: "Frozen", media_type: "Movies" },
    { name: "Simba", source: "The Lion King", media_type: "Movies" },
    { name: "Mufasa", source: "The Lion King", media_type: "Movies" },
    { name: "Scar", source: "The Lion King", media_type: "Movies" },
    { name: "Timon", source: "The Lion King", media_type: "Movies" },
    { name: "Pumbaa", source: "The Lion King", media_type: "Movies" },
    { name: "Jack Sparrow", source: "Pirates of the Caribbean", media_type: "Movies" },
    { name: "Gandalf", source: "Lord of the Rings", media_type: "Movies" },
    { name: "Frodo Baggins", source: "Lord of the Rings", media_type: "Movies" },
    { name: "Aragorn", source: "Lord of the Rings", media_type: "Movies" },
    { name: "Legolas", source: "Lord of the Rings", media_type: "Movies" },
    { name: "Gollum", source: "Lord of the Rings", media_type: "Movies" },
    { name: "Neo", source: "The Matrix", media_type: "Movies" },
    { name: "Morpheus", source: "The Matrix", media_type: "Movies" },
    { name: "Trinity", source: "The Matrix", media_type: "Movies" },
    { name: "John Wick", source: "John Wick", media_type: "Movies" },
    { name: "Forrest Gump", source: "Forrest Gump", media_type: "Movies" },
    { name: "The Terminator", source: "Terminator", media_type: "Movies" },
    { name: "Indiana Jones", source: "Indiana Jones", media_type: "Movies" },
    { name: "E.T.", source: "E.T.", media_type: "Movies" },
    { name: "Woody", source: "Toy Story", media_type: "Movies" },
    { name: "Buzz Lightyear", source: "Toy Story", media_type: "Movies" },
    { name: "Nemo", source: "Finding Nemo", media_type: "Movies" },
    { name: "Dory", source: "Finding Nemo", media_type: "Movies" },
    { name: "Lightning McQueen", source: "Cars", media_type: "Movies" },
    { name: "WALL-E", source: "WALL-E", media_type: "Movies" },
    { name: "Ratatouille", source: "Ratatouille", media_type: "Movies" },
    { name: "Po", source: "Kung Fu Panda", media_type: "Movies" },
    { name: "Moana", source: "Moana", media_type: "Movies" },
    { name: "Maui", source: "Moana", media_type: "Movies" },
    { name: "Rapunzel", source: "Tangled", media_type: "Movies" },
    { name: "Jack Skellington", source: "Nightmare Before Christmas", media_type: "Movies" },
    
    // Anime (40+)
    { name: "Naruto Uzumaki", source: "Naruto", media_type: "Anime" },
    { name: "Sasuke Uchiha", source: "Naruto", media_type: "Anime" },
    { name: "Sakura Haruno", source: "Naruto", media_type: "Anime" },
    { name: "Kakashi Hatake", source: "Naruto", media_type: "Anime" },
    { name: "Itachi Uchiha", source: "Naruto", media_type: "Anime" },
    { name: "Goku", source: "Dragon Ball Z", media_type: "Anime" },
    { name: "Vegeta", source: "Dragon Ball Z", media_type: "Anime" },
    { name: "Gohan", source: "Dragon Ball Z", media_type: "Anime" },
    { name: "Piccolo", source: "Dragon Ball Z", media_type: "Anime" },
    { name: "Frieza", source: "Dragon Ball Z", media_type: "Anime" },
    { name: "Sailor Moon", source: "Sailor Moon", media_type: "Anime" },
    { name: "Tuxedo Mask", source: "Sailor Moon", media_type: "Anime" },
    { name: "Eren Yeager", source: "Attack on Titan", media_type: "Anime" },
    { name: "Mikasa Ackerman", source: "Attack on Titan", media_type: "Anime" },
    { name: "Levi Ackerman", source: "Attack on Titan", media_type: "Anime" },
    { name: "Light Yagami", source: "Death Note", media_type: "Anime" },
    { name: "L", source: "Death Note", media_type: "Anime" },
    { name: "Ryuk", source: "Death Note", media_type: "Anime" },
    { name: "Spike Spiegel", source: "Cowboy Bebop", media_type: "Anime" },
    { name: "Edward Elric", source: "Fullmetal Alchemist", media_type: "Anime" },
    { name: "Alphonse Elric", source: "Fullmetal Alchemist", media_type: "Anime" },
    { name: "Gon Freecss", source: "Hunter x Hunter", media_type: "Anime" },
    { name: "Killua Zoldyck", source: "Hunter x Hunter", media_type: "Anime" },
    { name: "Saitama", source: "One Punch Man", media_type: "Anime" },
    { name: "Genos", source: "One Punch Man", media_type: "Anime" },
    { name: "Tanjiro Kamado", source: "Demon Slayer", media_type: "Anime" },
    { name: "Nezuko Kamado", source: "Demon Slayer", media_type: "Anime" },
    { name: "Zenitsu Agatsuma", source: "Demon Slayer", media_type: "Anime" },
    { name: "Izuku Midoriya", source: "My Hero Academia", media_type: "Anime" },
    { name: "All Might", source: "My Hero Academia", media_type: "Anime" },
    { name: "Bakugo", source: "My Hero Academia", media_type: "Anime" },
    { name: "Todoroki", source: "My Hero Academia", media_type: "Anime" },
    { name: "Lelouch", source: "Code Geass", media_type: "Anime" },
    { name: "Ichigo Kurosaki", source: "Bleach", media_type: "Anime" },
    { name: "Rukia Kuchiki", source: "Bleach", media_type: "Anime" },
    { name: "Totoro", source: "My Neighbor Totoro", media_type: "Anime" },
    { name: "Spirited Away Chihiro", source: "Spirited Away", media_type: "Anime" },
    { name: "No-Face", source: "Spirited Away", media_type: "Anime" },
    { name: "Howl", source: "Howl's Moving Castle", media_type: "Anime" },
    { name: "Mob", source: "Mob Psycho 100", media_type: "Anime" },
    
    // TV Shows (40+)
    { name: "Walter White", source: "Breaking Bad", media_type: "TV Shows" },
    { name: "Jesse Pinkman", source: "Breaking Bad", media_type: "TV Shows" },
    { name: "Saul Goodman", source: "Breaking Bad", media_type: "TV Shows" },
    { name: "Jon Snow", source: "Game of Thrones", media_type: "TV Shows" },
    { name: "Daenerys Targaryen", source: "Game of Thrones", media_type: "TV Shows" },
    { name: "Tyrion Lannister", source: "Game of Thrones", media_type: "TV Shows" },
    { name: "Cersei Lannister", source: "Game of Thrones", media_type: "TV Shows" },
    { name: "Arya Stark", source: "Game of Thrones", media_type: "TV Shows" },
    { name: "The Night King", source: "Game of Thrones", media_type: "TV Shows" },
    { name: "Eleven", source: "Stranger Things", media_type: "TV Shows" },
    { name: "Dustin Henderson", source: "Stranger Things", media_type: "TV Shows" },
    { name: "Hopper", source: "Stranger Things", media_type: "TV Shows" },
    { name: "Demogorgon", source: "Stranger Things", media_type: "TV Shows" },
    { name: "Michael Scott", source: "The Office", media_type: "TV Shows" },
    { name: "Dwight Schrute", source: "The Office", media_type: "TV Shows" },
    { name: "Jim Halpert", source: "The Office", media_type: "TV Shows" },
    { name: "Ross Geller", source: "Friends", media_type: "TV Shows" },
    { name: "Rachel Green", source: "Friends", media_type: "TV Shows" },
    { name: "Chandler Bing", source: "Friends", media_type: "TV Shows" },
    { name: "Joey Tribbiani", source: "Friends", media_type: "TV Shows" },
    { name: "Phoebe Buffay", source: "Friends", media_type: "TV Shows" },
    { name: "Sheldon Cooper", source: "Big Bang Theory", media_type: "TV Shows" },
    { name: "Barney Stinson", source: "How I Met Your Mother", media_type: "TV Shows" },
    { name: "Dexter Morgan", source: "Dexter", media_type: "TV Shows" },
    { name: "Rick Grimes", source: "The Walking Dead", media_type: "TV Shows" },
    { name: "Daryl Dixon", source: "The Walking Dead", media_type: "TV Shows" },
    { name: "Ted Lasso", source: "Ted Lasso", media_type: "TV Shows" },
    { name: "Tommy Shelby", source: "Peaky Blinders", media_type: "TV Shows" },
    { name: "The Mandalorian", source: "The Mandalorian", media_type: "TV Shows" },
    { name: "Baby Yoda", source: "The Mandalorian", media_type: "TV Shows" },
    { name: "Geralt of Rivia", source: "The Witcher", media_type: "TV Shows" },
    { name: "Yennefer", source: "The Witcher", media_type: "TV Shows" },
    { name: "Wednesday Addams", source: "Wednesday", media_type: "TV Shows" },
    { name: "Squid Game Player 456", source: "Squid Game", media_type: "TV Shows" },
    { name: "Pablo Escobar", source: "Narcos", media_type: "TV Shows" },
    { name: "Ragnar Lothbrok", source: "Vikings", media_type: "TV Shows" },
    { name: "The Doctor", source: "Doctor Who", media_type: "TV Shows" },
    { name: "Sherlock Holmes", source: "Sherlock BBC", media_type: "TV Shows" },
    { name: "Mr. Bean", source: "Mr. Bean", media_type: "TV Shows" },
    { name: "SpongeBob", source: "SpongeBob SquarePants", media_type: "TV Shows" },
    
    // Video Games (40+)
    { name: "Mario", source: "Super Mario", media_type: "Video Games" },
    { name: "Luigi", source: "Super Mario", media_type: "Video Games" },
    { name: "Princess Peach", source: "Super Mario", media_type: "Video Games" },
    { name: "Bowser", source: "Super Mario", media_type: "Video Games" },
    { name: "Yoshi", source: "Super Mario", media_type: "Video Games" },
    { name: "Link", source: "The Legend of Zelda", media_type: "Video Games" },
    { name: "Zelda", source: "The Legend of Zelda", media_type: "Video Games" },
    { name: "Ganondorf", source: "The Legend of Zelda", media_type: "Video Games" },
    { name: "Pikachu", source: "Pokémon", media_type: "Video Games" },
    { name: "Charizard", source: "Pokémon", media_type: "Video Games" },
    { name: "Mewtwo", source: "Pokémon", media_type: "Video Games" },
    { name: "Ash Ketchum", source: "Pokémon", media_type: "Video Games" },
    { name: "Eevee", source: "Pokémon", media_type: "Video Games" },
    { name: "Master Chief", source: "Halo", media_type: "Video Games" },
    { name: "Cortana", source: "Halo", media_type: "Video Games" },
    { name: "Kratos", source: "God of War", media_type: "Video Games" },
    { name: "Atreus", source: "God of War", media_type: "Video Games" },
    { name: "Sonic", source: "Sonic the Hedgehog", media_type: "Video Games" },
    { name: "Tails", source: "Sonic the Hedgehog", media_type: "Video Games" },
    { name: "Knuckles", source: "Sonic the Hedgehog", media_type: "Video Games" },
    { name: "Dr. Eggman", source: "Sonic the Hedgehog", media_type: "Video Games" },
    { name: "Lara Croft", source: "Tomb Raider", media_type: "Video Games" },
    { name: "Nathan Drake", source: "Uncharted", media_type: "Video Games" },
    { name: "Joel", source: "The Last of Us", media_type: "Video Games" },
    { name: "Ellie", source: "The Last of Us", media_type: "Video Games" },
    { name: "Cloud Strife", source: "Final Fantasy VII", media_type: "Video Games" },
    { name: "Sephiroth", source: "Final Fantasy VII", media_type: "Video Games" },
    { name: "Tifa Lockhart", source: "Final Fantasy VII", media_type: "Video Games" },
    { name: "Solid Snake", source: "Metal Gear Solid", media_type: "Video Games" },
    { name: "Steve", source: "Minecraft", media_type: "Video Games" },
    { name: "Creeper", source: "Minecraft", media_type: "Video Games" },
    { name: "Pac-Man", source: "Pac-Man", media_type: "Video Games" },
    { name: "Donkey Kong", source: "Donkey Kong", media_type: "Video Games" },
    { name: "Crash Bandicoot", source: "Crash Bandicoot", media_type: "Video Games" },
    { name: "Spyro", source: "Spyro the Dragon", media_type: "Video Games" },
    { name: "Kirby", source: "Kirby", media_type: "Video Games" },
    { name: "Samus Aran", source: "Metroid", media_type: "Video Games" },
    { name: "Arthur Morgan", source: "Red Dead Redemption", media_type: "Video Games" },
    { name: "CJ", source: "GTA San Andreas", media_type: "Video Games" },
    { name: "Trevor Phillips", source: "GTA V", media_type: "Video Games" },
    
    // Comic Books (30+)
    { name: "Batman", source: "DC Comics", media_type: "Comic Books" },
    { name: "Superman", source: "DC Comics", media_type: "Comic Books" },
    { name: "Wonder Woman", source: "DC Comics", media_type: "Comic Books" },
    { name: "The Flash", source: "DC Comics", media_type: "Comic Books" },
    { name: "Aquaman", source: "DC Comics", media_type: "Comic Books" },
    { name: "The Joker", source: "DC Comics", media_type: "Comic Books" },
    { name: "Harley Quinn", source: "DC Comics", media_type: "Comic Books" },
    { name: "Catwoman", source: "DC Comics", media_type: "Comic Books" },
    { name: "Robin", source: "DC Comics", media_type: "Comic Books" },
    { name: "Green Lantern", source: "DC Comics", media_type: "Comic Books" },
    { name: "Iron Man", source: "Marvel Comics", media_type: "Comic Books" },
    { name: "Spider-Man", source: "Marvel Comics", media_type: "Comic Books" },
    { name: "Captain America", source: "Marvel Comics", media_type: "Comic Books" },
    { name: "Thor", source: "Marvel Comics", media_type: "Comic Books" },
    { name: "Hulk", source: "Marvel Comics", media_type: "Comic Books" },
    { name: "Black Widow", source: "Marvel Comics", media_type: "Comic Books" },
    { name: "Thanos", source: "Marvel Comics", media_type: "Comic Books" },
    { name: "Loki", source: "Marvel Comics", media_type: "Comic Books" },
    { name: "Wolverine", source: "Marvel Comics", media_type: "Comic Books" },
    { name: "Deadpool", source: "Marvel Comics", media_type: "Comic Books" },
    { name: "Black Panther", source: "Marvel Comics", media_type: "Comic Books" },
    { name: "Doctor Strange", source: "Marvel Comics", media_type: "Comic Books" },
    { name: "Scarlet Witch", source: "Marvel Comics", media_type: "Comic Books" },
    { name: "Groot", source: "Marvel Comics", media_type: "Comic Books" },
    { name: "Rocket Raccoon", source: "Marvel Comics", media_type: "Comic Books" },
    { name: "Venom", source: "Marvel Comics", media_type: "Comic Books" },
    { name: "Magneto", source: "Marvel Comics", media_type: "Comic Books" },
    { name: "Professor X", source: "Marvel Comics", media_type: "Comic Books" },
    { name: "Mystique", source: "Marvel Comics", media_type: "Comic Books" },
    { name: "Storm", source: "Marvel Comics", media_type: "Comic Books" },
    
    // Manga (20+)
    { name: "Luffy", source: "One Piece", media_type: "Manga" },
    { name: "Zoro", source: "One Piece", media_type: "Manga" },
    { name: "Nami", source: "One Piece", media_type: "Manga" },
    { name: "Sanji", source: "One Piece", media_type: "Manga" },
    { name: "Ace", source: "One Piece", media_type: "Manga" },
    { name: "Guts", source: "Berserk", media_type: "Manga" },
    { name: "Griffith", source: "Berserk", media_type: "Manga" },
    { name: "Astro Boy", source: "Astro Boy", media_type: "Manga" },
    { name: "Doraemon", source: "Doraemon", media_type: "Manga" },
    { name: "Kenshin Himura", source: "Rurouni Kenshin", media_type: "Manga" },
    { name: "Gintoki Sakata", source: "Gintama", media_type: "Manga" },
    { name: "Yusuke Urameshi", source: "Yu Yu Hakusho", media_type: "Manga" },
    { name: "Jotaro Kujo", source: "JoJo's Bizarre Adventure", media_type: "Manga" },
    { name: "Dio Brando", source: "JoJo's Bizarre Adventure", media_type: "Manga" },
    { name: "Seto Kaiba", source: "Yu-Gi-Oh!", media_type: "Manga" },
    { name: "Yugi Muto", source: "Yu-Gi-Oh!", media_type: "Manga" },
    { name: "Kaneki Ken", source: "Tokyo Ghoul", media_type: "Manga" },
    { name: "Gojo Satoru", source: "Jujutsu Kaisen", media_type: "Manga" },
    { name: "Itadori Yuji", source: "Jujutsu Kaisen", media_type: "Manga" },
    { name: "Asta", source: "Black Clover", media_type: "Manga" },
    
    // Cartoons (20+)
    { name: "SpongeBob SquarePants", source: "SpongeBob", media_type: "Cartoons" },
    { name: "Patrick Star", source: "SpongeBob", media_type: "Cartoons" },
    { name: "Squidward", source: "SpongeBob", media_type: "Cartoons" },
    { name: "Mickey Mouse", source: "Disney", media_type: "Cartoons" },
    { name: "Donald Duck", source: "Disney", media_type: "Cartoons" },
    { name: "Goofy", source: "Disney", media_type: "Cartoons" },
    { name: "Bugs Bunny", source: "Looney Tunes", media_type: "Cartoons" },
    { name: "Daffy Duck", source: "Looney Tunes", media_type: "Cartoons" },
    { name: "Tweety", source: "Looney Tunes", media_type: "Cartoons" },
    { name: "Tom", source: "Tom and Jerry", media_type: "Cartoons" },
    { name: "Jerry", source: "Tom and Jerry", media_type: "Cartoons" },
    { name: "Scooby-Doo", source: "Scooby-Doo", media_type: "Cartoons" },
    { name: "Shaggy", source: "Scooby-Doo", media_type: "Cartoons" },
    { name: "Dexter", source: "Dexter's Laboratory", media_type: "Cartoons" },
    { name: "Johnny Bravo", source: "Johnny Bravo", media_type: "Cartoons" },
    { name: "The Powerpuff Girls", source: "Powerpuff Girls", media_type: "Cartoons" },
    { name: "Courage", source: "Courage the Cowardly Dog", media_type: "Cartoons" },
    { name: "Finn", source: "Adventure Time", media_type: "Cartoons" },
    { name: "Jake", source: "Adventure Time", media_type: "Cartoons" },
    { name: "Rick Sanchez", source: "Rick and Morty", media_type: "Cartoons" },
    { name: "Morty Smith", source: "Rick and Morty", media_type: "Cartoons" },
    
    // Fairy Tales (15+)
    { name: "Cinderella", source: "Cinderella", media_type: "Fairy Tales" },
    { name: "Snow White", source: "Snow White", media_type: "Fairy Tales" },
    { name: "Sleeping Beauty", source: "Sleeping Beauty", media_type: "Fairy Tales" },
    { name: "Little Red Riding Hood", source: "Little Red Riding Hood", media_type: "Fairy Tales" },
    { name: "The Big Bad Wolf", source: "Three Little Pigs", media_type: "Fairy Tales" },
    { name: "Hansel", source: "Hansel and Gretel", media_type: "Fairy Tales" },
    { name: "Gretel", source: "Hansel and Gretel", media_type: "Fairy Tales" },
    { name: "Rapunzel", source: "Rapunzel", media_type: "Fairy Tales" },
    { name: "The Little Mermaid", source: "The Little Mermaid", media_type: "Fairy Tales" },
    { name: "Peter Pan", source: "Peter Pan", media_type: "Fairy Tales" },
    { name: "Tinker Bell", source: "Peter Pan", media_type: "Fairy Tales" },
    { name: "Captain Hook", source: "Peter Pan", media_type: "Fairy Tales" },
    { name: "Alice", source: "Alice in Wonderland", media_type: "Fairy Tales" },
    { name: "The Mad Hatter", source: "Alice in Wonderland", media_type: "Fairy Tales" },
    { name: "Pinocchio", source: "Pinocchio", media_type: "Fairy Tales" },
    
    // Mythology (15+)
    { name: "Zeus", source: "Greek Mythology", media_type: "Mythology" },
    { name: "Poseidon", source: "Greek Mythology", media_type: "Mythology" },
    { name: "Hades", source: "Greek Mythology", media_type: "Mythology" },
    { name: "Athena", source: "Greek Mythology", media_type: "Mythology" },
    { name: "Apollo", source: "Greek Mythology", media_type: "Mythology" },
    { name: "Hercules", source: "Greek Mythology", media_type: "Mythology" },
    { name: "Perseus", source: "Greek Mythology", media_type: "Mythology" },
    { name: "Medusa", source: "Greek Mythology", media_type: "Mythology" },
    { name: "Thor", source: "Norse Mythology", media_type: "Mythology" },
    { name: "Odin", source: "Norse Mythology", media_type: "Mythology" },
    { name: "Loki", source: "Norse Mythology", media_type: "Mythology" },
    { name: "Anubis", source: "Egyptian Mythology", media_type: "Mythology" },
    { name: "Ra", source: "Egyptian Mythology", media_type: "Mythology" },
    { name: "Osiris", source: "Egyptian Mythology", media_type: "Mythology" },
    { name: "King Arthur", source: "Arthurian Legend", media_type: "Mythology" },
    
    // Novels (15+)
    { name: "Sherlock Holmes", source: "Sherlock Holmes", media_type: "Novels" },
    { name: "Dr. Watson", source: "Sherlock Holmes", media_type: "Novels" },
    { name: "Dracula", source: "Dracula", media_type: "Novels" },
    { name: "Frankenstein's Monster", source: "Frankenstein", media_type: "Novels" },
    { name: "Elizabeth Bennet", source: "Pride and Prejudice", media_type: "Novels" },
    { name: "Mr. Darcy", source: "Pride and Prejudice", media_type: "Novels" },
    { name: "Jay Gatsby", source: "The Great Gatsby", media_type: "Novels" },
    { name: "Atticus Finch", source: "To Kill a Mockingbird", media_type: "Novels" },
    { name: "Holden Caulfield", source: "Catcher in the Rye", media_type: "Novels" },
    { name: "Katniss Everdeen", source: "The Hunger Games", media_type: "Novels" },
    { name: "Peeta Mellark", source: "The Hunger Games", media_type: "Novels" },
    { name: "Bilbo Baggins", source: "The Hobbit", media_type: "Novels" },
    { name: "Percy Jackson", source: "Percy Jackson", media_type: "Novels" },
    { name: "Annabeth Chase", source: "Percy Jackson", media_type: "Novels" },
    { name: "James Bond", source: "James Bond", media_type: "Novels" },
    
    // Plays (10+)
    { name: "Romeo", source: "Romeo and Juliet", media_type: "Plays" },
    { name: "Juliet", source: "Romeo and Juliet", media_type: "Plays" },
    { name: "Hamlet", source: "Hamlet", media_type: "Plays" },
    { name: "Macbeth", source: "Macbeth", media_type: "Plays" },
    { name: "Lady Macbeth", source: "Macbeth", media_type: "Plays" },
    { name: "Othello", source: "Othello", media_type: "Plays" },
    { name: "King Lear", source: "King Lear", media_type: "Plays" },
    { name: "Oedipus", source: "Oedipus Rex", media_type: "Plays" },
    { name: "Willy Loman", source: "Death of a Salesman", media_type: "Plays" },
    { name: "Stanley Kowalski", source: "A Streetcar Named Desire", media_type: "Plays" },
    
    // Musicals (10+)
    { name: "Phantom of the Opera", source: "Phantom of the Opera", media_type: "Musicals" },
    { name: "Christine Daaé", source: "Phantom of the Opera", media_type: "Musicals" },
    { name: "Jean Valjean", source: "Les Misérables", media_type: "Musicals" },
    { name: "Javert", source: "Les Misérables", media_type: "Musicals" },
    { name: "Elphaba", source: "Wicked", media_type: "Musicals" },
    { name: "Glinda", source: "Wicked", media_type: "Musicals" },
    { name: "Alexander Hamilton", source: "Hamilton", media_type: "Musicals" },
    { name: "Aaron Burr", source: "Hamilton", media_type: "Musicals" },
    { name: "Sweeney Todd", source: "Sweeney Todd", media_type: "Musicals" },
    { name: "Maria", source: "West Side Story", media_type: "Musicals" },
    { name: "Danny Zuko", source: "Grease", media_type: "Musicals" },
    { name: "Sandy", source: "Grease", media_type: "Musicals" }
];

let countdownInterval = null;

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    updatePlayerInputs();
    loadGameHistory();
});

// Adjust player count
function adjustPlayers(delta) {
    const input = document.getElementById('player-count');
    let value = parseInt(input.value) + delta;
    value = Math.max(3, Math.min(12, value));
    input.value = value;
    updatePlayerInputs();
}

// Update player name inputs based on count
function updatePlayerInputs() {
    const count = parseInt(document.getElementById('player-count').value);
    const container = document.getElementById('player-names');
    container.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const div = document.createElement('div');
        div.className = 'player-name-input';
        div.innerHTML = `
            <span>P${i + 1}</span>
            <input type="text" placeholder="Player ${i + 1}" id="player-${i}">
        `;
        container.appendChild(div);
    }
}

// Go to category selection
async function goToCategory() {
    const count = parseInt(document.getElementById('player-count').value);
    gameState.players = [];
    
    // Collect player names
    for (let i = 0; i < count; i++) {
        const input = document.getElementById(`player-${i}`);
        const name = input.value.trim() || `Player ${i + 1}`;
        gameState.players.push(name);
    }
    
    showScreen('category-screen');
    
    // Load categories and characters
    if (!categoriesLoaded) {
        await loadCharacterDataset();
    }
    
    renderCategories();
}

// Load character dataset from Hugging Face
async function loadCharacterDataset() {
    const loadingEl = document.getElementById('category-loading');
    loadingEl.style.display = 'flex';
    
    try {
        // Fetch from Hugging Face datasets API
        // Using the rows endpoint with pagination
        const response = await fetch(
            'https://datasets-server.huggingface.co/rows?dataset=NousResearch/CharacterCodex&config=default&split=train&offset=0&length=1000'
        );
        
        if (response.ok) {
            const data = await response.json();
            if (data.rows && data.rows.length > 0) {
                characterDataset = data.rows.map(row => ({
                    name: row.row.character_name,
                    source: row.row.media_source,
                    media_type: row.row.media_type,
                    genre: row.row.genre,
                    description: row.row.description
                }));
                
                // Fetch more rows for variety
                const response2 = await fetch(
                    'https://datasets-server.huggingface.co/rows?dataset=NousResearch/CharacterCodex&config=default&split=train&offset=1000&length=1000'
                );
                if (response2.ok) {
                    const data2 = await response2.json();
                    if (data2.rows) {
                        characterDataset = characterDataset.concat(data2.rows.map(row => ({
                            name: row.row.character_name,
                            source: row.row.media_source,
                            media_type: row.row.media_type,
                            genre: row.row.genre,
                            description: row.row.description
                        })));
                    }
                }
                
                categoriesLoaded = true;
                console.log(`Loaded ${characterDataset.length} characters from CharacterCodex`);
            }
        }
    } catch (e) {
        console.log('Failed to load CharacterCodex, using fallback:', e);
        characterDataset = fallbackCharacters;
        categoriesLoaded = true;
    }
    
    loadingEl.style.display = 'none';
    
    // If dataset is empty, use fallback
    if (characterDataset.length === 0) {
        characterDataset = fallbackCharacters;
    }
}

// Render category buttons
function renderCategories() {
    const container = document.getElementById('category-list');
    container.innerHTML = '';
    
    // Get available categories from loaded data
    const availableTypes = new Set(characterDataset.map(c => c.media_type));
    
    MEDIA_TYPES.forEach(type => {
        // Only show categories that have characters (except 'all')
        if (type.id !== 'all' && !availableTypes.has(type.id)) {
            return;
        }
        
        const count = type.id === 'all' 
            ? characterDataset.length 
            : characterDataset.filter(c => c.media_type === type.id).length;
        
        if (count === 0 && type.id !== 'all') return;
        
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.dataset.category = type.id;
        btn.innerHTML = `
            <span class="category-icon">${type.icon}</span>
            <span class="category-name">${type.name}</span>
            <span class="category-count">${count} characters</span>
        `;
        btn.onclick = () => selectCategory(type.id);
        container.appendChild(btn);
    });
}

// Select a category
function selectCategory(categoryId) {
    // Remove selection from all buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Select the clicked button
    const selectedBtn = document.querySelector(`.category-btn[data-category="${categoryId}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('selected');
    }
    
    gameState.selectedCategory = categoryId;
    
    // Enable start button
    document.getElementById('start-game-btn').disabled = false;
}

// Start the game
async function startGame() {
    if (!gameState.selectedCategory) {
        alert('Please select a category first!');
        return;
    }
    
    // Select random impostor with better randomness
    // Use crypto API for better randomness if available, fallback to Math.random
    let randomValue;
    if (window.crypto && window.crypto.getRandomValues) {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        randomValue = array[0] / (0xFFFFFFFF + 1);
    } else {
        randomValue = Math.random();
    }
    gameState.impostorIndex = Math.floor(randomValue * gameState.players.length);
    
    // Debug log to verify randomness
    console.log(`Impostor selected: Player ${gameState.impostorIndex + 1} (${gameState.players[gameState.impostorIndex]}) out of ${gameState.players.length} players`);
    
    // Get character from selected category
    gameState.currentCharacter = getRandomCharacter(gameState.selectedCategory);
    
    // Reset game state
    gameState.currentPlayerIndex = 0;
    gameState.votes = {};
    gameState.mostVotedPlayer = null;
    
    // Update current category display
    const categoryName = MEDIA_TYPES.find(t => t.id === gameState.selectedCategory)?.name || 'All';
    document.getElementById('current-category-name').textContent = categoryName;
    
    // Show reveal screen for first player
    showScreen('reveal-screen');
    updateRevealScreen();
}

// Get random character from dataset
function getRandomCharacter(category) {
    let pool = characterDataset;
    
    if (category && category !== 'all') {
        pool = characterDataset.filter(c => c.media_type === category);
    }
    
    if (pool.length === 0) {
        pool = fallbackCharacters;
        if (category && category !== 'all') {
            pool = fallbackCharacters.filter(c => c.media_type === category);
        }
    }
    
    if (pool.length === 0) {
        pool = fallbackCharacters;
    }
    
    const char = pool[Math.floor(Math.random() * pool.length)];
    
    return {
        name: char.name,
        source: char.source || char.media_source || 'Unknown',
        media_type: char.media_type,
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(char.name)}&backgroundColor=random`
    };
}

// Update reveal screen with current player info
function updateRevealScreen() {
    const playerNum = document.querySelector('.player-number');
    const playerName = document.querySelector('.player-name');
    
    playerNum.textContent = `Player ${gameState.currentPlayerIndex + 1} of ${gameState.players.length}`;
    playerName.textContent = gameState.players[gameState.currentPlayerIndex];
}

// Reveal the role
function revealRole() {
    const roleDisplay = document.getElementById('role-display');
    const isImpostor = gameState.currentPlayerIndex === gameState.impostorIndex;
    
    if (isImpostor) {
        const categoryName = MEDIA_TYPES.find(t => t.id === gameState.selectedCategory)?.name || 'All';
        roleDisplay.innerHTML = `
            <div class="role-card impostor">
                <div class="role-label">You are the</div>
                <div class="role-title">IMPOSTOR</div>
                <div style="font-size: 4rem; margin: 20px 0;">🎭</div>
                <p class="impostor-hint">You don't know the character. Try to blend in!</p>
                <p class="category-hint">Category: <strong>${categoryName}</strong></p>
            </div>
        `;
    } else {
        roleDisplay.innerHTML = `
            <div class="role-card crewmate">
                <div class="role-label">The character is</div>
                <img class="character-image" src="${gameState.currentCharacter.image}" alt="${gameState.currentCharacter.name}" onerror="this.src='https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(gameState.currentCharacter.name)}'">
                <div class="character-name">${gameState.currentCharacter.name}</div>
                <div class="character-source">from ${gameState.currentCharacter.source}</div>
            </div>
        `;
    }
    
    showScreen('role-screen');
    startCountdown();
}

// Start auto-hide countdown
function startCountdown() {
    let seconds = 10;
    const countdownEl = document.getElementById('countdown');
    const timerProgress = document.querySelector('.timer-progress');
    
    // Reset animation
    timerProgress.style.animation = 'none';
    timerProgress.offsetHeight; // Trigger reflow
    timerProgress.style.animation = 'timerCountdown 10s linear forwards';
    
    countdownEl.textContent = seconds;
    
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    countdownInterval = setInterval(() => {
        seconds--;
        countdownEl.textContent = seconds;
        
        if (seconds <= 0) {
            clearInterval(countdownInterval);
            hideRole();
        }
    }, 1000);
}

// Hide the role and show cover screen
function hideRole() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    
    gameState.currentPlayerIndex++;
    
    if (gameState.currentPlayerIndex >= gameState.players.length) {
        // All players have seen their roles
        showScreen('done-screen');
    } else {
        // Show cover screen for next player
        document.getElementById('next-player').textContent = gameState.players[gameState.currentPlayerIndex];
        showScreen('cover-screen');
    }
}

// Move to next player
function nextPlayer() {
    showScreen('reveal-screen');
    updateRevealScreen();
}

// Show voting screen
function showVoting() {
    const container = document.getElementById('voting-players');
    container.innerHTML = '';
    
    gameState.players.forEach((player, index) => {
        const btn = document.createElement('button');
        btn.className = 'vote-btn';
        btn.textContent = player;
        btn.onclick = () => castVote(index);
        container.appendChild(btn);
    });
    
    document.getElementById('vote-results').classList.add('hidden');
    showScreen('voting-screen');
}

// Cast a vote
function castVote(playerIndex) {
    const buttons = document.querySelectorAll('.vote-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    buttons[playerIndex].classList.add('selected');
    
    // Count vote
    const playerName = gameState.players[playerIndex];
    gameState.votes[playerName] = (gameState.votes[playerName] || 0) + 1;
    
    // Show results
    updateVoteResults();
}

// Update vote results display
function updateVoteResults() {
    const resultsContainer = document.getElementById('vote-results');
    const resultsList = document.getElementById('results-list');
    
    resultsList.innerHTML = '';
    
    // Sort players by vote count
    const sortedPlayers = [...gameState.players].sort((a, b) => {
        return (gameState.votes[b] || 0) - (gameState.votes[a] || 0);
    });
    
    // Track who has the most votes
    gameState.mostVotedPlayer = sortedPlayers[0];
    
    sortedPlayers.forEach(player => {
        const count = gameState.votes[player] || 0;
        const div = document.createElement('div');
        div.className = 'vote-result-item';
        div.innerHTML = `
            <span>${player}</span>
            <span class="vote-count">${count} vote${count !== 1 ? 's' : ''}</span>
        `;
        resultsList.appendChild(div);
    });
    
    resultsContainer.classList.remove('hidden');
}

// Reveal who the impostor was
function revealImpostor() {
    const impostorName = gameState.players[gameState.impostorIndex];
    document.getElementById('impostor-name').textContent = impostorName;
    document.getElementById('final-character').textContent = gameState.currentCharacter.name;
    document.getElementById('final-source').textContent = `from ${gameState.currentCharacter.source}`;
    
    // Determine if impostor was caught
    const impostorCaught = gameState.mostVotedPlayer === impostorName;
    const resultEl = document.getElementById('game-result');
    
    if (impostorCaught) {
        resultEl.innerHTML = `
            <div class="result-badge crew-win">
                <span class="result-icon">✅</span>
                <span class="result-text">CREW WINS!</span>
            </div>
            <p class="result-detail">The impostor was found!</p>
        `;
    } else {
        resultEl.innerHTML = `
            <div class="result-badge impostor-win">
                <span class="result-icon">🎭</span>
                <span class="result-text">IMPOSTOR WINS!</span>
            </div>
            <p class="result-detail">The impostor escaped detection!</p>
        `;
    }
    
    // Save game to history
    saveGameToHistory(impostorCaught);
    
    showScreen('impostor-reveal-screen');
}

// Save game to history
function saveGameToHistory(crewWon) {
    const history = JSON.parse(localStorage.getItem('impostorGameHistory') || '[]');
    
    const impostorName = gameState.players[gameState.impostorIndex];
    
    const gameRecord = {
        id: Date.now(),
        date: new Date().toISOString(),
        players: [...gameState.players],
        impostor: impostorName,
        character: gameState.currentCharacter.name,
        source: gameState.currentCharacter.source,
        category: gameState.selectedCategory,
        crewWon: crewWon,
        mostVoted: gameState.mostVotedPlayer
    };
    
    history.unshift(gameRecord); // Add to beginning
    
    // Keep only last 50 games
    if (history.length > 50) {
        history.pop();
    }
    
    localStorage.setItem('impostorGameHistory', JSON.stringify(history));
    
    // Update player stats
    updatePlayerStats(crewWon, impostorName);
}

// Update individual player statistics
function updatePlayerStats(crewWon, impostorName) {
    const playerStats = JSON.parse(localStorage.getItem('impostorPlayerStats') || '{}');
    
    gameState.players.forEach(playerName => {
        if (!playerStats[playerName]) {
            playerStats[playerName] = {
                gamesPlayed: 0,
                winsAsImpostor: 0,
                winsAsCrew: 0,
                timesImpostor: 0
            };
        }
        
        const stats = playerStats[playerName];
        stats.gamesPlayed++;
        
        const isImpostor = playerName === impostorName;
        
        if (isImpostor) {
            stats.timesImpostor++;
            if (!crewWon) {
                stats.winsAsImpostor++;
            }
        } else {
            if (crewWon) {
                stats.winsAsCrew++;
            }
        }
    });
    
    localStorage.setItem('impostorPlayerStats', JSON.stringify(playerStats));
}

// Get player stats
function getPlayerStats() {
    return JSON.parse(localStorage.getItem('impostorPlayerStats') || '{}');
}

// Load game history
function loadGameHistory() {
    updateScoreboardStats();
}

// Show scoreboard
function showScoreboard() {
    updateScoreboardStats();
    renderPlayerLeaderboard();
    renderGameHistory();
    showScreen('scoreboard-screen');
}

// Update scoreboard statistics
function updateScoreboardStats() {
    const history = JSON.parse(localStorage.getItem('impostorGameHistory') || '[]');
    
    const totalGames = history.length;
    const crewWins = history.filter(g => g.crewWon).length;
    const impostorWins = totalGames - crewWins;
    
    document.getElementById('total-games').textContent = totalGames;
    document.getElementById('crew-wins').textContent = crewWins;
    document.getElementById('impostor-wins').textContent = impostorWins;
}

// Render player leaderboard
function renderPlayerLeaderboard() {
    const playerStats = getPlayerStats();
    const container = document.getElementById('player-leaderboard');
    
    if (!container) return;
    
    const players = Object.entries(playerStats).map(([name, stats]) => ({
        name,
        ...stats,
        totalWins: stats.winsAsImpostor + stats.winsAsCrew,
        winRate: stats.gamesPlayed > 0 
            ? Math.round(((stats.winsAsImpostor + stats.winsAsCrew) / stats.gamesPlayed) * 100) 
            : 0
    }));
    
    // Sort by total wins, then by win rate
    players.sort((a, b) => {
        if (b.totalWins !== a.totalWins) return b.totalWins - a.totalWins;
        return b.winRate - a.winRate;
    });
    
    if (players.length === 0) {
        container.innerHTML = '<p class="no-history">No player stats yet!</p>';
        return;
    }
    
    container.innerHTML = players.map((player, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
        
        return `
            <div class="player-stat-card ${index < 3 ? 'top-player' : ''}">
                <div class="player-rank">
                    <span class="rank-medal">${medal}</span>
                    <span class="rank-number">#${index + 1}</span>
                </div>
                <div class="player-info">
                    <div class="player-stat-name">${player.name}</div>
                    <div class="player-stat-details">
                        <span class="stat-pill">🎮 ${player.gamesPlayed} games</span>
                        <span class="stat-pill win-rate">${player.winRate}% wins</span>
                    </div>
                </div>
                <div class="player-wins">
                    <div class="win-breakdown">
                        <span class="crew-stat" title="Wins as Crew">✅ ${player.winsAsCrew}</span>
                        <span class="impostor-stat" title="Wins as Impostor">🎭 ${player.winsAsImpostor}</span>
                    </div>
                    <div class="total-wins">${player.totalWins} wins</div>
                </div>
            </div>
        `;
    }).join('');
}

// Render game history
function renderGameHistory() {
    const history = JSON.parse(localStorage.getItem('impostorGameHistory') || '[]');
    const container = document.getElementById('game-history');
    
    if (history.length === 0) {
        container.innerHTML = '<p class="no-history">No games played yet!</p>';
        return;
    }
    
    container.innerHTML = history.slice(0, 20).map(game => {
        const date = new Date(game.date);
        const dateStr = date.toLocaleDateString();
        const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        return `
            <div class="history-item ${game.crewWon ? 'crew-victory' : 'impostor-victory'}">
                <div class="history-header">
                    <span class="history-date">${dateStr} ${timeStr}</span>
                    <span class="history-result">${game.crewWon ? '✅ Crew Won' : '🎭 Impostor Won'}</span>
                </div>
                <div class="history-details">
                    <div><strong>Character:</strong> ${game.character}</div>
                    <div><strong>Impostor:</strong> ${game.impostor}</div>
                    <div><strong>Players:</strong> ${game.players.length}</div>
                </div>
            </div>
        `;
    }).join('');
}

// Clear game history
function clearHistory() {
    if (confirm('Are you sure you want to clear all game history and player stats?')) {
        localStorage.removeItem('impostorGameHistory');
        localStorage.removeItem('impostorPlayerStats');
        updateScoreboardStats();
        renderPlayerLeaderboard();
        renderGameHistory();
    }
}

// Go back to done screen
function backToDone() {
    showScreen('done-screen');
}

// Reset and start new game
function resetGame() {
    gameState = {
        players: gameState.players, // Keep players
        impostorIndex: -1,
        currentCharacter: null,
        currentPlayerIndex: 0,
        votes: {},
        selectedCategory: null,
        mostVotedPlayer: null
    };
    
    // Reset category selection
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.getElementById('start-game-btn').disabled = true;
    
    showScreen('category-screen');
}

// Show a specific screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}
