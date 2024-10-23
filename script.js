const flightTypeSelect = document.querySelector("#flight-type");
const arrivalTimeInput = document.querySelector("#arrival-time");
const maximumGroundTime = document.querySelector("#maximum-ground-time");

// Function to calculate maximum ground time
function calculateMaximumGroundTime(row) {
  const flightType = flightTypeSelect.value;
  const arrivalTime = arrivalTimeInput.value;

  let maximumTime;
  if (flightType === "Vuelo directo") {
    maximumTime = 115; //"1 hour and 55 minutes";
  } else if (flightType === "Vuelo indirecto") {
    maximumTime = 105; //"1 hour and 45 minutes";
  } else {
    maximumTime = "N/A";
  }

  // Calculate the next departure time
  const nextDepartureTime = new Date();
  nextDepartureTime.setHours(arrivalTime.split(":")[0]);
  nextDepartureTime.setMinutes(arrivalTime.split(":")[1]);
  nextDepartureTime.setHours(nextDepartureTime.getHours() + 1);
  nextDepartureTime.setMinutes(
    nextDepartureTime.getMinutes() + (maximumTime - 60)
  );

  // Format the next departure time

  const hours = nextDepartureTime.getHours().toString().padStart(2, "0");
  const minutes = nextDepartureTime.getMinutes().toString().padStart(2, "0");
  const nextDepartureTimeFormatted = `${hours}:${minutes}`;

  return { maximumTime, nextDepartureTimeFormatted };
}

function addRowToResultTable(result) {
  const tableBody = document.querySelector("#result-table tbody");

  const existingRow = tableBody.querySelector("tr");
  if (existingRow) {
    existingRow.remove();
  }

  const newRow = document.createElement("tr");
  newRow.innerHTML = `
  <td>${result.arrivalTime}</td>
  <td>${result.flightType}</td>
  <td>${result.maximumTime} minutos</td>
  <td>Salida: ${result.nextDepartureTime} horas</td>
  <td><button>X</button></td>
 `;
  newRow.classList.add("fade-in");

  tableBody.appendChild(newRow);

  const deleteButtons = document.querySelectorAll(
    "#result-table td:last-child button"
  );

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const row = button.closest("tr");
      row.classList.add("removing");
      setTimeout(() => {
        row.remove();
      }, 500);
    });
  });
}

const addRowBtn = document.querySelector("#add-row-btn");

addRowBtn.addEventListener("click", () => {
  const flightType = flightTypeSelect.value;
  if (flightType === "") {
    alert("Por favor, selecciona un tipo de vuelo.");
    return;
  }

  const result = calculateMaximumGroundTime();
  const arrivalTime = arrivalTimeInput.value;
  const arrivalTime24 = `${arrivalTime.split(":")[0]}:${
    arrivalTime.split(":")[1]
  }`;
  addRowToResultTable({
    arrivalTime: arrivalTime24,
    flightType: flightTypeSelect.value,
    maximumTime: result.maximumTime,
    nextDepartureTime: result.nextDepartureTimeFormatted,
  });
});
