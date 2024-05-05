$(document).ready(function () {
    const data = {
        "questions": [
            {
                "id": 1,
                "question": "How are you doing today?",
                "responses": [
                    {
                        "response": "Feeling Great",
                        "foodOptions": ["Pasta Carbonara"]
                    },
                    {
                        "response": "Just Okay",
                        "foodOptions": ["Chicken Caesar Salad"]
                    },
                    {
                        "response": "Not in Good Mood",
                        "foodOptions": ["Fish and Chips"]
                    },
                    {
                        "response": "Rather Not Say",
                        "foodOptions": ["Bread and Coffee"]
                    }
                ]
            },
            {
                "id": 2,
                "question": "Are you feeling Spicy?",
                "responses": [
                    {
                        "response": "Very Spicy",
                        "foodOptions": ["Grilled Salmon"]
                    },
                    {
                        "response": "Just Normal",
                        "foodOptions": ["Cheeseburger"]
                    },
                    {
                        "response": "Not Spicy",
                        "foodOptions": ["Macaroni and Cheese"]
                    },
                    {
                        "response": "Any is Okay",
                        "foodOptions": ["Pizza Lampun"]
                    }
                ]
            },
            {
                "id": 3,
                "question": "Would you prefer Salty Food?",
                "responses": [
                    {
                        "response": "Very Salty",
                        "foodOptions": ["Pizza Margherita"]
                    },
                    {
                        "response": "Just Normal",
                        "foodOptions": ["Veggie Wrap"]
                    },
                    {
                        "response": "Not Salty",
                        "foodOptions": ["Chicken and Chips"]
                    },
                    {
                        "response": "Any is Okay",
                        "foodOptions": ["Macaroni and Cheese"]
                    }
                ]
            },

            {
                "id": 4,
                "question": "What Kind of Drink would you like?",
                "responses": [
                    {
                        "response": "Water",
                        "foodOptions": ["Suomen Drink"]
                    },
                    {
                        "response": "Sofy Drink",
                        "foodOptions": ["Coca Cola"]
                    },
                    {
                        "response": "Beer",
                        "foodOptions": ["SS Beer"]
                    },
                    {
                        "response": "Alcoholic",
                        "foodOptions": ["Lion Heart"]
                    }
                ]
            },
        ],

    };


    let selectedResponses = [];

    function displayQuestion() {
        if (selectedResponses.length < data.questions.length) {
            const currentQuestion = data.questions[selectedResponses.length];
            $('#question').html(`<p>${currentQuestion.question}</p>`);
            $('#options').empty();

            currentQuestion.responses.forEach(response => {
                const btn = $('<button>').addClass('option-btn').text(response.response);
                btn.on('click', function () {
                    handleResponseClick(response);
                });
                $('#options').append(btn);
            });
        } else {
            displaySuggestions();
        }
    }

    function handleResponseClick(response) {
        selectedResponses.push(response);
        console.log(selectedResponses);
        console.log(selectedResponses.length);
        console.log(data.questions.length);
        if (selectedResponses.length === data.questions.length) {
            displaySuggestions();
        } else {
            displayQuestion();
        }
    }

    function displaySuggestions() {
        $('#suggestions').show(); // Show the suggestions div
        $('#question-container').hide(); // Hide the question container
        $('#suggestion-list').empty();

        // Combine all food options from the selected responses
        const allFoodOptions = selectedResponses.flatMap(response => response.foodOptions);

        // Get the first food option name
        const firstFoodOption = allFoodOptions[0];

        // Generate the image source based on the first food option name
        const imagePath = `images/food/${firstFoodOption.toLowerCase().replace(/\s/g, '')}.jpg`;

        // Append the image to the DOM
        $('#foodimg').append(`<img src="${imagePath}" class="foodimg" alt="${firstFoodOption}">`);

        // Remove duplicates from the combined list
        const uniqueFoodOptions = [...new Set(allFoodOptions)];

        // Display the combined food options as suggestions
        const suggestions = uniqueFoodOptions.map(foodOption => `<li>${foodOption}</li>`);
        $('#suggestion-list').html(suggestions);
    }

    displayQuestion();
});