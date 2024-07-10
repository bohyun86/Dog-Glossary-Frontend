function main() {
    document.querySelector('#button-random-dog').addEventListener('click', randomClick)
    document.querySelector('#button-show-breed').addEventListener('click', breedClick)
    document.querySelector('#button-show-sub-breed').addEventListener('click', subBreedClick)
    document.querySelector('#button-show-all').addEventListener('click', getAllBreeds)
}

async function randomClick() {
    let response = await fetch('https://dog.ceo/api/breeds/image/random')
    const data = await response.json()
    document.querySelector('#content').innerHTML = `<img src="${data.message}">`
}

async function breedClick() {
    try {
        let response = await fetch(`https://dog.ceo/api/breed/${document.querySelector('#input-breed').value}/images/random`.toLowerCase())

        if (response.ok) {
            const data = await response.json()
            document.querySelector('#content').innerHTML = `<img src="${data.message}">`
        } else {
            document.querySelector('#content').innerHTML = `<p>Breed not found!</p>`
        }
    } catch (e) {
        console.log(e)
    }
}

async function subBreedClick() {
    try {
        const breedName = document.querySelector('#input-breed').value.toLowerCase();
        const response = await fetch(`https://dog.ceo/api/breeds/list/all`);

        if (response.ok) {
            const data = await response.json();
            if (breedName in data.message) {
                if (data.message[breedName].length !== 0) {
                    document.querySelector("#content").innerHTML = "<ol></ol>";
                    for (let subBreed of data.message[breedName]) {
                        let li = document.createElement("li");
                        li.textContent = subBreed;
                        document.querySelector("#content ol").appendChild(li);

                    }
                } else {
                    document.querySelector('#content').innerHTML = `<p>No sub-breeds found!</p>`
                }
            } else {
                document.querySelector('#content').innerHTML = `<p>Breed not found!</p>`
            }
        }

    } catch (e) {
        console.log(e)
    }
}

async function getAllBreeds() {
    try {
        const response = await fetch(`https://dog.ceo/api/breeds/list/all`);

        if (response.ok) {
            const data = await response.json();
            document.querySelector("#content").innerHTML = "<ol></ol>";
            for (let breed in data.message) {
                let li = document.createElement("li");
                li.textContent = breed;
                document.querySelector("#content ol").appendChild(li);
                if (data.message[breed].length !== 0) {
                    const ul = document.createElement("ul");
                    ul.style.listStyleType = "circle";
                    li.appendChild(ul);
                    for (let subBreed of data.message[breed]) {
                        let li = document.createElement("li");
                        li.textContent = subBreed;
                        ul.appendChild(li);
                    }
                }
            }
        }
    } catch (e) {
        console.log(e)
    }
}

main();