
    const todoList = document.getElementById('todoList');
    const todoInput = document.getElementById('todoInput');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function renderTodos() {
      todoList.innerHTML = '';
      todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${todo}</span>
          <button class="delete-btn" onclick="deleteTodo(${index})">✕</button>`;
        todoList.appendChild(li);
      });
    }

    function addTodo() {
      const task = todoInput.value.trim();
      if (task !== '') {
        todos.push(task);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
        todoInput.value = '';
      }
    }

    function deleteTodo(index) {
      todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    }

    // Initial render
    renderTodos();


    const apiKey = "813aa0bd7609441405436003c99bc5c0";

    async function getWeather() {
      const city = document.getElementById('cityInput').value.trim();
      const resultDiv = document.getElementById('weatherResult');

      if (!city) {
        resultDiv.innerHTML = "Please enter a city.";
        return;
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
          resultDiv.innerHTML = "City not found.";
          return;
        }

        const weather = data.weather[0];
        const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

        resultDiv.innerHTML = `
          <div>${data.name}, ${data.sys.country}</div>
          <div>🌡️ ${data.main.temp}°C</div>
          <div>${weather.main} - ${weather.description}</div>
          <img class="weather-icon" src="${iconUrl}" alt="${weather.description}">
        `;
      } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "Error fetching weather.";
      }
    }