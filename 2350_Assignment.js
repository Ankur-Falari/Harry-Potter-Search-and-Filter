const APIDataList = document.getElementById('APIDataList');
const searchBar = document.getElementById('searchBar');

let HPChar=[];
let HPSpells=[];
let HPStudent=[];
let HPStaff=[];

function changeSlide(offset) {
    const carousel = document.querySelector("[data_carousel]");
    const slides = carousel.querySelector("[data_slides]");
    const activeSlide = slides.querySelector("[data_active]");
    const slideElements = slides.querySelectorAll(":scope > *");
    let newIndex = [...slideElements].indexOf(activeSlide) + offset;
    if (newIndex < 0){
        newIndex = slideElements.length - 1;
    }
    if (newIndex >= slideElements.length){
        newIndex = 0;
    }
    activeSlide.removeAttribute("data_active");
    slideElements[newIndex].setAttribute("data_active", true);
}

setInterval(() => {changeSlide(1);}, 5000);

const loadCharacters = async () => {
    try {
        const res = await fetch('https://hp-api.onrender.com/api/characters');
        HPChar = await res.json();
        displayChar(HPChar);
    } catch (err) {
        console.log(err);
    }
};

const loadStudents = async () => {
    try {
        const res = await fetch('https://hp-api.onrender.com/api/characters/students');
        HPStudent = await res.json();
        displayChar(HPStudent);
    } catch (err) {
        console.log(err);
    }
};

const loadStaff = async () => {
    try {
        const res = await fetch('https://hp-api.onrender.com/api/characters/staff');
        HPStaff = await res.json();
        displayChar(HPStaff);
    } catch (err) {
        console.log(err);
    }
};

const loadSpells = async () => {
    try {
        const res = await fetch('https://hp-api.onrender.com/api/spells');
        HPSpells = await res.json();
        displaySpells(HPSpells);
    } catch (err) {
        console.log(err);
    }
};

const displayChar = (char) => {
    const htmlString = char
        .map((character) => {
            let imageSrc;
            if (character.image) {
                imageSrc = character.image;
            } else {
                imageSrc = "JPEG_Corruption.jpg";
            }
            return `<li class="character">
                        <h2>${character.name}</h2>
                        <img src="${imageSrc}" class="img"></img>
                        <p>House: ${character.house}</p>
                        <p>Gender: ${character.gender}</p>
                        <p>Species: ${character.species}</p>
                    </li>`;
        })
        .join('');
    APIDataList.innerHTML = htmlString;
};

const displaySpells = (spells) => {
    const htmlString = spells
        .map((spell) => {
            return `
            <li class="spell">
                <h2>${spell.name}</h2>
                <p>Description: ${spell.description}</p>
            </li>`;
        })
        .join('');
    APIDataList.innerHTML = htmlString;
};

document.getElementById('button_search').addEventListener('click', FilteredResult);

function FilteredResult() {
    const FilteredVal = document.querySelector('.filter_class').value;

    if (FilteredVal === '1') {
        loadCharacters();
        function searchCharacters() {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredCharacters = HPChar.filter(character => {
        return (
            character.name.toLowerCase().includes(searchTerm) ||
            character.house.toLowerCase().includes(searchTerm) ||
            character.gender.toLowerCase().includes(searchTerm) ||
            character.species.toLowerCase().includes(searchTerm)
        );
    });
    displayChar(filteredCharacters);
}
searchBar.addEventListener('input', searchCharacters);
    } else if (FilteredVal === '2') {
        loadSpells();
        function searchSpells() {
            const searchTerm = searchBar.value.toLowerCase();
            const filteredSpells = HPSpells.filter(spell => {
                return (
                    spell.name.toLowerCase().includes(searchTerm)
                );
            });
            displaySpells(filteredSpells);
        }
        searchBar.addEventListener('input', searchSpells);
    } else if (FilteredVal === '3') {
        loadStudents();
        function searchCharacters() {
            const searchTerm = searchBar.value.toLowerCase();
            const filteredCharacters = HPStudent.filter(character => {
                return (
                    character.name.toLowerCase().includes(searchTerm) ||
                    character.house.toLowerCase().includes(searchTerm) ||
                    character.gender.toLowerCase().includes(searchTerm) ||
                    character.species.toLowerCase().includes(searchTerm)
                );
            });
            displayChar(filteredCharacters);
        }
        searchBar.addEventListener('input', searchCharacters);
    } else if (FilteredVal === '4') {
        loadStaff();
        function searchCharacters() {
            const searchTerm = searchBar.value.toLowerCase();
            const filteredCharacters = HPStaff.filter(character => {
                return (
                    character.name.toLowerCase().includes(searchTerm) ||
                    character.house.toLowerCase().includes(searchTerm) ||
                    character.gender.toLowerCase().includes(searchTerm) ||
                    character.species.toLowerCase().includes(searchTerm)
                );
            });
            displayChar(filteredCharacters);
        }
        searchBar.addEventListener('input', searchCharacters);
    } else if (FilteredVal === '0') {
        APIDataList.innerHTML = '';
    }
}









