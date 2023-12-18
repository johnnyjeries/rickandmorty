document.addEventListener('DOMContentLoaded', function () {
    // Make the API request using Fetch
    fetch('https://rickandmortyapi.com/api')
        .then(response => response.json())
        .then(data => {
            // Log the data to the console
            console.log(data);

            // Access specific resources (e.g., characters, locations, episodes)
            // Modify this based on the structure of the API response
            if (data.characters) {
                // Make another request to the characters endpoint
                fetch(data.characters)
                    .then(response => response.json())
                    .then(charactersData => {
                        // Log characters data to the console
                        console.log(charactersData);
                        // Manipulate the DOM or perform other actions with charactersData
                        displayCharacters(charactersData);
                    })
                    .catch(error => {
                        console.error('Error fetching characters data:', error);
                    });
            }

            // Add more logic for other resources if needed

        })
        .catch(error => {
            console.error('Error fetching API information:', error);
        });

    // Function to display characters on the DOM
    function displayCharacters(charactersData) {
        // Get the container element where you want to display the characters
        const container = document.getElementById('rick-and-morty-container');
        const rowElement = document.getElementById('row-div');


        // Check if the container element exists
        if (!container) {
            console.error('Container element not found.');
            return;
        }

        // Iterate through charactersData and create HTML content
        charactersData.results.forEach(character => {
            const characterHtml = `
                <div class="character col-md-4 col-lg-4 col-sm-6" style="min-height:400px;">
                    <h3>${character.name}</h3>
                    <p>Status: ${character.status}</p>
                    <p>Species: ${character.species}</p>
                    <img src="${character.image}" alt="${character.name}"/>
                    <!-- Add more information as needed -->
                </div>
            `;

            // Create a temporary container element
            const tempContainer = document.createElement('div');
            // tempContainer.classList.add('row');  // Add the 'row' class
            tempContainer.innerHTML = characterHtml;

            // Append the first child of the temporary container to the main container
            rowElement.appendChild(tempContainer);
        });
    }
});
