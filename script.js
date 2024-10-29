const flightTypeSelect = document.querySelector("#flight-type");
const arrivalTimeInput = document.querySelector("#arrival-time");
const addRowBtn = document.querySelector("#add-row-btn");

function calculateMaximumGroundTime(flightType, arrivalTime) {
  let maximumTime;
  if (flightType === "Vuelo directo") {
    maximumTime = 105; // 1 hora y 45 minutos
  } else if (flightType === "Vuelo indirecto") {
    maximumTime = 115; // 1 hora y 55 minutos
  } else {
    return { maximumTime: "N/A", nextDepartureTimeFormatted: "N/A" };
  }

  const [hours, minutes] = arrivalTime.split(":").map(Number);
  const nextDepartureTime = new Date();
  nextDepartureTime.setHours(hours, minutes + maximumTime);

  const nextDepartureTimeFormatted = `${nextDepartureTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${nextDepartureTime
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return { maximumTime, nextDepartureTimeFormatted };
}

function addRowToResultTable(result) {
  const tableBody = document.querySelector("#result-table tbody");

  // Remove existing row
  const existingRow = tableBody.querySelector("tr");
  if (existingRow) {
    existingRow.remove();
  }

  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${result.arrivalTime}</td>
    <td>${result.flightType}</td>
    <td>${result.maximumTime} minutos</td>
    <td>${result.nextDepartureTime} horas</td>
    <td><button class="delete-btn">x</button></td>
  `;
  newRow.classList.add("fade-in");
  tableBody.appendChild(newRow);
}

document.querySelector("#result-table").addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const row = event.target.closest("tr");
    row.classList.add("removing");
    setTimeout(() => {
      row.remove();
    }, 500);
  }
});

addRowBtn.addEventListener("click", () => {
  const flightType = flightTypeSelect.value;
  const arrivalTime = arrivalTimeInput.value;

  if (!flightType) {
    alert("Por favor, selecciona un tipo de vuelo.");
    return;
  }

  const result = calculateMaximumGroundTime(flightType, arrivalTime);
  const arrivalTime24 = arrivalTime; // Asumir que el formato ya es correcto
  addRowToResultTable({
    arrivalTime: arrivalTime24,
    flightType: flightType,
    maximumTime: result.maximumTime,
    nextDepartureTime: result.nextDepartureTimeFormatted,
  });
});
