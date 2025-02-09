document.addEventListener("DOMContentLoaded", function () {
    const characters = document.querySelectorAll(".img-character img");
    const lockedCharacters = ["lyra", "selene", "finn"]; // Karakter yang terkunci
    
    characters.forEach(character => {
        const characterName = character.alt.toLowerCase();
        
        if (lockedCharacters.includes(characterName)) {
            character.style.opacity = "0.5"; // Menandai karakter terkunci
            character.style.cursor = "not-allowed";
            character.addEventListener("click", function () {
                alert("Karakter ini terkunci!");
            });
        } else {
            character.style.cursor = "pointer";
            character.addEventListener("click", function () {
                window.location.href = `../html/kaelMission.html?character=${characterName}`;
            });
        }
    });
});
